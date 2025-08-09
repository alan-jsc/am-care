import React from "react";
import { cn } from "@/lib/utils";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "narrow" | "wide" | "full";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const ResponsiveContainer = React.forwardRef<
  HTMLDivElement,
  ResponsiveContainerProps
>(
  (
    {
      children,
      className,
      variant = "default",
      padding = "md",
      maxWidth = "xl",
      ...props
    },
    ref
  ) => {
    const containerClasses = cn(
      // Base container styles
      "w-full mx-auto",

      // Variant-specific styles
      {
        container: variant === "default",
        "max-w-sm": variant === "narrow",
        "max-w-7xl": variant === "wide",
        "w-full": variant === "full",
      },

      // Padding variants
      {
        "px-0": padding === "none",
        "px-4 sm:px-6": padding === "sm",
        "px-4 sm:px-6 lg:px-8": padding === "md",
        "px-4 sm:px-6 lg:px-8 xl:px-12": padding === "lg",
        "px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16": padding === "xl",
      },

      // Max width constraints
      {
        "max-w-sm": maxWidth === "sm",
        "max-w-md": maxWidth === "md",
        "max-w-lg": maxWidth === "lg",
        "max-w-xl": maxWidth === "xl",
        "max-w-2xl": maxWidth === "2xl",
        "max-w-full": maxWidth === "full",
      },

      // Container query support
      "@container",

      className
    );

    return (
      <div ref={ref} className={containerClasses} {...props}>
        {children}
      </div>
    );
  }
);

ResponsiveContainer.displayName = "ResponsiveContainer";

export { ResponsiveContainer };
