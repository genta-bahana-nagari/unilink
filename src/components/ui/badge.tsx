import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "outline";
  size?: "sm" | "default" | "lg";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
      default: "bg-slate-100 text-slate-700",
      success: "bg-green-100 text-green-700",
      warning: "bg-yellow-100 text-yellow-700",
      danger: "bg-red-100 text-red-700",
      info: "bg-blue-100 text-blue-700",
      outline: "border border-slate-200 text-slate-700 bg-transparent",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      default: "px-2.5 py-0.5 text-xs",
      lg: "px-3 py-1 text-sm",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full font-medium transition-colors",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";