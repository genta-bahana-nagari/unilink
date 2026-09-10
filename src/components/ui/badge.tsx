import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "outline";
  size?: "sm" | "default" | "lg";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
      default: "bg-black text-white",
      success: "bg-black text-white",
      warning: "bg-neutral-300 text-black dark:bg-neutral-600 dark:text-white",
      danger: "bg-black text-white border border-white",
      info: "bg-black text-white",
      outline: "border border-black bg-transparent text-foreground",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      default: "px-2.5 py-0.5 text-xs",
      lg: "px-3 py-1 text-sm",
    };

    return (
      <span
        ref={ref}
        className={cn("inline-flex items-center rounded-full font-medium transition-colors", variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";
