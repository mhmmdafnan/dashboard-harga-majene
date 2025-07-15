"use client";
import Select from "react-select";

export default function KomoditasSelect({ options, onChange }) {
  const selectOptions = options.map((item) => ({
    value: item,
    label: item,
  }));

  return (
    <Select
      options={selectOptions}
      onChange={(e) => onChange(e.value)}
      placeholder="Pilih komoditas..."
      isSearchable
      className="w-64"
    />
  );
}
