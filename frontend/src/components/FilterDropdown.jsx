import { useState } from "react";

export default function FilterDropdown({
  label,
  options,
  selected,
  onChange,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-48">
      {/* Label */}
      <label className="text-xs text-gray-500 mb-1 block">
        {label}
      </label>

      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:border-gray-400 focus:outline-none"
      >
        <span>{selected}</span>
        <span className="text-gray-400">▾</span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-sm">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                selected === option ? "bg-gray-50 font-medium" : ""
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
