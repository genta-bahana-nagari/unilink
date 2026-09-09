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
  ({ 
    className, 
    variant = "default", 
    size = "default", 
    isLoading = false,
    children,
    disabled,
    ...props 
  }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2";

    const variants = {
      default: "bg-brand-600 text-white hover:bg-brand-700 shadow-sm hover:shadow-md",
      outline: "border border-border bg-card hover:bg-muted text-foreground",
      ghost: "hover:bg-muted text-foreground hover:text-brand-600",
      destructive: "bg-danger text-white hover:bg-red-700 shadow-sm hover:shadow-md",
      success: "bg-success text-white hover:bg-green-700 shadow-sm hover:shadow-md",
      warning: "bg-warning text-white hover:bg-yellow-600 shadow-sm hover:shadow-md",
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
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          isLoading && "opacity-70 cursor-wait",
          className
        )}
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