"use client";
import Select from "react-select";

export default function FilterSelect({ filter, options, onChange }) {
  const selectOptions = options.map((item) => ({
    value: item,
    label: item,
  }));

  return (
    <Select
      options={selectOptions}
      onChange={(e) => onChange(e.value)}
      placeholder={`Pilih ${filter}...`}
      isSearchable
      className="w-64"
    />
  );
}
