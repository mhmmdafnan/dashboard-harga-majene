import React from "react";

export default function ValueContainer({ title, value }) {
  const formatValue = (val) => {
    if (!val) return "-";

    // Hapus koma ribuan → "13,360.06" jadi "13360.06"
    const cleaned = String(val).replace(/,/g, "");
    const num = Number(cleaned);

    if (isNaN(num)) return "-";

    if (title?.toLowerCase().includes("harga")) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(num);
    }

    // untuk inflasi/IHK biar rapih
    return num.toFixed(2);
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl pb-6 mb-6">
      {/* Judul card */}
      <p className="text-md px-4 py-2">{title ? title : "-"}</p>

      {/* Nilai rata tengah */}
      <div className="flex items-center justify-center text-4xl font-bold px-10 w-60">
        {formatValue(value)}
      </div>
    </div>
  );
}
