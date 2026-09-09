import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: string[];
  error?: string;
  placeholder?: string;
}

export function Select({
  label,
  options,
  error,
  placeholder = "Select an option",
  className = "",
  ...props
}: SelectProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-slate-700">{label}</label>
      )}
      <select
        className={`
          w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5
          text-sm outline-none transition
          focus:border-blue-500 focus:ring-2 focus:ring-blue-100
          disabled:bg-slate-50 disabled:text-slate-400
          ${error ? "border-red-500 focus:border-red-500 focus:ring-red-100" : ""}
          ${className}
        `}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
