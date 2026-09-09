import { cn } from "@/lib/utils";
import React, { forwardRef, useState } from "react";
import Image from "next/image";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, fallback, size = "md", className, ...props }, ref) => {
    const [hasError, setHasError] = useState(false);
    
    const sizes = {
      sm: "h-8 w-8 text-xs",
      md: "h-10 w-10 text-sm",
      lg: "h-12 w-12 text-base",
      xl: "h-16 w-16 text-xl",
    };

    const initials = fallback 
      ? fallback.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      : "U";

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center font-semibold text-blue-600 flex-shrink-0 overflow-hidden",
          sizes[size],
          className
        )}
        {...props}
      >
        {src && !hasError ? (
          <Image
            src={src}
            alt={alt || "Avatar"}
            className="w-full h-full object-cover"
            width={100}
            height={100}
            onError={() => setHasError(true)}
          />
        ) : (
          <span className="text-inherit font-semibold">{initials}</span>
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  className?: string;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, max = 3, className, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const visibleChildren = childrenArray.slice(0, max);
    const remaining = childrenArray.length - max;

    return (
      <div
        ref={ref}
        className={cn("flex -space-x-2", className)}
        {...props}
      >
        {visibleChildren}
        {remaining > 0 && (
          <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600 border-2 border-white">
            +{remaining}
          </div>
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";