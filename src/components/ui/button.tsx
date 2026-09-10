"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { FiLoader } from "react-icons/fi";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive" | "success" | "warning";
  size?: "default" | "sm" | "lg" | "icon" | "xl";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2";

    const variants = {
      default: "bg-black text-white hover:bg-neutral-800 shadow-sm hover:shadow-md",
      outline: "border border-black bg-transparent hover:bg-black text-foreground hover:text-white",
      ghost: "hover:bg-muted text-foreground hover:text-black",
      destructive: "bg-red-600 text-white hover:bg-red-700 shadow-sm hover:shadow-md",
      success: "bg-black text-white hover:bg-neutral-800 shadow-sm hover:shadow-md",
      warning: "bg-neutral-800 text-white hover:bg-black shadow-sm hover:shadow-md",
    };

    const sizes = {
      default: "px-4 py-2 text-sm",
      sm: "px-3 py-1.5 text-xs",
      lg: "px-6 py-3 text-base",
      xl: "px-8 py-4 text-lg",
      icon: "w-10 h-10",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], isLoading && "opacity-70 cursor-wait", className)}
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <FiLoader className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" />
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";
