import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ children, className = "", hover = false, ...props }: CardProps) {
  return (
    <div
      className={`
        rounded-xl border border-slate-200 bg-white shadow-sm
        ${hover ? "hover:shadow-md transition-shadow" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
