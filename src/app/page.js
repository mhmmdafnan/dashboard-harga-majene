"use client";
import { useEffect, useState } from "react";
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

const KomoditasSelect = dynamic(() => import("@/components/KomoditasSelect"), {
  ssr: false,
});

export function transformData(data) {
  const result = [];

  for (const key in data) {
    if (/^[A-Za-z]{3}-\d{2}$/.test(key)) {
      const cleanValue = data[key].trim();
      if (cleanValue !== "-" && cleanValue !== "") {
        result.push({
          bulan: key,
          harga: parseFloat(cleanValue),
        });
      }
    }
  }

  const months = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  return result.sort((a, b) => {
    const [ma, ya] = a.bulan.split("-");
    const [mb, yb] = b.bulan.split("-");
    return new Date(+`20${ya}`, months[ma]) - new Date(+`20${yb}`, months[mb]);
  });
}

export default function Dashboard() {
  const [komoditas, setKomoditas] = useState([]);
  const [data, setData] = useState([]);

  const handleLoad = async () => {
    const res = await fetch(`/api/sheet?nama=BERAS`);
    const result = await res.json();
    setData(result);
  };

  const getKomoditas = async () => {
    const res = await fetch(`/api/getKomoditas`);
    const result = await res.json();
    setKomoditas(result);
    // console.log("Komoditas:", result);
    // setData(result);
  };

  const selectKomoditasHandle = async (selectedOption) => {
    console.log("Selected komoditas:", selectedOption);
    const res = await fetch(`/api/sheet?nama=${selectedOption}`);
    const result = await res.json();
    setData(transformData(result));
    console.log("Filtered data:", result);
  };

  useEffect(() => {
    handleLoad();
    getKomoditas();
    // console.log("Data loaded:", data);
  }, []);
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard Komoditas</h1>

      <div className="flex space-x-4">
        <KomoditasSelect
          options={komoditas}
          onChange={(value) => selectKomoditasHandle(value)}
        />
      </div>

      {/* Chart */}
      <div className="">
        <h2 className="text-xl font-semibold">Grafik Harga Komoditas</h2>
        <p className="text-sm text-gray-500">
          Pilih komoditas untuk melihat grafik harga.
        </p>
        {data.length > 0 && (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bulan" />
              <YAxis domain={["dataMin - 10", "dataMax + 10"]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="harga"
                strokeWidth={10}
                stroke="#8884d8"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
