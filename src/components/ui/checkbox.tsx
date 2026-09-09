import { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Checkbox({ label, className = "", ...props }: CheckboxProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        className={`
          h-4 w-4 rounded border-slate-300 text-blue-600
          focus:ring-2 focus:ring-blue-100
          disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      />
      {label && <span className="text-sm text-slate-700">{label}</span>}
    </label>
  );
}
