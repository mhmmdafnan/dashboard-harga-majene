import React from "react";

export default function ValueContainer({ title, value }) {
  return (
    <>
      <div className="bg-gradient-to-b from-[#EBE389] to-[#FF9B00] shadow-md rounded-4xl pb-6 mb-6">
        {/* Judul card */}
        <p className="text-md px-4 py-2">{title ? title : "-"}</p>

        {/* Nilai rata tengah */}
        <div className="flex items-center justify-center text-4xl font-bold px-10 w-60">
          {value ? value : "-"} %
        </div>
      </div>
    </>
  );
}
