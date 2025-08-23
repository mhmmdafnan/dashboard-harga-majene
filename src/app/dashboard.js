"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import dynamic from "next/dynamic";
import Header from "./header";

const FilterSelect = dynamic(() => import("@/components/FilterSelect"), {
  ssr: false,
});

const ValueContainer = dynamic(() => import("@/components/valueContainer"), {
  ssr: false,
});

// export function transformData(data) {
//   const result = [];

//   for (const key in data) {
//     if (/^[A-Za-z]{3}-\d{2}$/.test(key)) {
//       const cleanValue = data[key].trim();
//       if (cleanValue !== "-" && cleanValue !== "") {
//         result.push({
//           bulan: key,
//           harga: parseFloat(cleanValue),
//         });
//       }
//     }
//   }

//   const months = {
//     Jan: 0,
//     Feb: 1,
//     Mar: 2,
//     Apr: 3,
//     May: 4,
//     Jun: 5,
//     Jul: 6,
//     Aug: 7,
//     Sep: 8,
//     Oct: 9,
//     Nov: 10,
//     Dec: 11,
//   };

//   return result.sort((a, b) => {
//     const [ma, ya] = a.bulan.split("-");
//     const [mb, yb] = b.bulan.split("-");
//     return new Date(+`20${ya}`, months[ma]) - new Date(+`20${yb}`, months[mb]);
//   });
// }

export default function Dashboard() {
  const [komoditas, setKomoditas] = useState([]);
  const [valueYoY, setValueYoY] = useState();
  const [valueMtM, setValueMtM] = useState();
  const [valueYtD, setValueYtD] = useState();
  const [valueIHK, setValueIHK] = useState();
  const [valueHarga, setValueHarga] = useState();
  const [tahun, setTahun] = useState([]);
  const [bulan, setBulan] = useState([]);
  const [selectedKomoditas, setSelectedKomoditas] = useState();
  const [selectedTahun, setSelectedTahun] = useState();
  const [selectedBulan, setSelectedBulan] = useState();
  const [data, setData] = useState([]);
  const [dataGraph, setDataGraph] = useState([]);

  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  let titleHeader = "";
  let content = [];
  if (page === "harga") {
    titleHeader = "Dashboard Harga";
    content = [
      { title: "Harga", value: valueHarga },
      { title: "Inflasi M-to-M", value: valueMtM },
    ];
  } else if (page === "ihk") {
    titleHeader = "Dashboard IHK";
    content = [
      { title: "IHK", value: valueIHK },
      { title: "Inflasi M-to-M", value: valueMtM },
    ];
  } else {
    // fallback kalau bukan harga/ihk
    titleHeader = "Halaman Utama Dashboard";
    content = [
      { title: "Inflasi M-to-M", value: valueMtM },
      { title: "Inflasi Y-to-D", value: valueYtD },
      { title: "Inflasi Y-on-Y", value: valueYoY },
    ];
  }

  const handleLoad = async () => {
    const res = await fetch(`/api/sheet`);
    const result = await res.json();
    setData(result.filtered);
    setDataGraph(result.graph);
  };

  const getFilters = async () => {
    const res = await fetch(`/api/getFilter`);
    const result = await res.json();
    // console.log(result);

    setKomoditas(result.komoditas);
    setTahun(result.tahun);
    setBulan(result.bulan);
    // console.log("Komoditas:", result);
    // setData(result);
  };

  const selectFilterHandle = async () => {
    const res = await fetch(
      `/api/sheet?nama=${selectedKomoditas}&tahun=${selectedTahun}&bulan=${selectedBulan}`
    );
    const result = await res.json();
    setData(result.filtered);
    setDataGraph(result.graph);
    setValueIHK(result.filtered["IHK"]);
    setValueHarga(result.filtered["Harga"]);
    setValueMtM(result.filtered["Inflasi MtM"]);
    setValueYoY(result.filtered["Inflasi YoY"]);
    setValueYtD(result.filtered["Inflasi YtD"]);
  };

  useEffect(() => {
    handleLoad();
    getFilters();
    // console.log("Data loaded:", dataGraph);
  }, []);

  return (
    <>
      <Header />
      <div className="p-6 space-y-4 max-w-7xl min-h-screen mx-auto">
        <h1 className="text-2xl font-bold">{titleHeader}</h1>

        <div className="bg-white shadow-md rounded-2xl p-6 flex space-x-4">
          <FilterSelect
            filter="Komoditas"
            options={komoditas}
            onChange={(value) => setSelectedKomoditas(value)}
          />
          <FilterSelect
            filter="Tahun"
            options={tahun}
            onChange={(value) => setSelectedTahun(value)}
          />
          <FilterSelect
            filter="Bulan"
            options={bulan}
            onChange={(value) => setSelectedBulan(value)}
          />
          <button
            onClick={() => selectFilterHandle()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Tampilkan
          </button>
        </div>

        {/* Nilai Inflasi dll */}
        <div className="w-full flex justify-center items-center py-4">
          <div className={`grid gap-x-20 ${page? "grid-cols-2" : "grid-cols-3"}`}>
            {content.map((item, idx) => (
              <ValueContainer key={idx} title={item.title} value={item.value} />
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-2">Grafik Harga Komoditas</h2>
          <p className="text-sm text-gray-500 mb-4">
            Pilih komoditas untuk melihat grafik harga per bulan.
          </p>
          {dataGraph?.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={dataGraph}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="Bulan" tick={{ fontSize: 12 }} />
                <YAxis
                  domain={["dataMin - 10", "dataMax + 10"]}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey={
                    page === "ihk"
                      ? "IHK"
                      : page === "harga"
                      ? "Harga"
                      : "Inflasi MtM"
                  }
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#2563eb" }}
                  activeDot={{ r: 6, stroke: "#1d4ed8", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400">Belum ada data yang ditampilkan.</p>
          )}
        </div>
      </div>
    </>
  );
}
