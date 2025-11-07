import React from "react";

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}

export const Select: React.FC<SelectProps> = ({ value, onChange, options }) => {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="border border-neutral-300 rounded-xl px-3 py-2 bg-white text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
