import React from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-responsive";

interface MicroInteractionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "lift" | "glow" | "scale" | "slide" | "rotate" | "none";
  intensity?: "subtle" | "medium" | "strong";
  disabled?: boolean;
}

const MicroInteraction = React.forwardRef<
  HTMLDivElement,
  MicroInteractionProps
>(
  (
    {
      children,
      className,
      variant = "lift",
      intensity = "medium",
      disabled = false,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();

    const getVariantClasses = () => {
      if (disabled || prefersReducedMotion) return "";

      const baseClasses = "transition-all duration-200 ease-out";

      switch (variant) {
        case "lift":
          return cn(baseClasses, "hover:transform hover:-translate-y-1", {
            "hover:shadow-md": intensity === "subtle",
            "hover:shadow-lg": intensity === "medium",
            "hover:shadow-xl": intensity === "strong",
          });
        case "glow":
          return cn(baseClasses, "hover:shadow-lg", {
            "hover:shadow-blue-500/25": intensity === "subtle",
            "hover:shadow-blue-500/50": intensity === "medium",
            "hover:shadow-blue-500/75": intensity === "strong",
          });
        case "scale":
          return cn(baseClasses, "hover:transform", {
            "hover:scale-105": intensity === "subtle",
            "hover:scale-110": intensity === "medium",
            "hover:scale-125": intensity === "strong",
          });
        case "slide":
          return cn(baseClasses, "hover:transform hover:translate-x-1");
        case "rotate":
          return cn(baseClasses, "hover:transform hover:rotate-1");
        default:
          return "";
      }
    };

    return (
      <div ref={ref} className={cn(getVariantClasses(), className)} {...props}>
        {children}
      </div>
    );
  }
);

MicroInteraction.displayName = "MicroInteraction";

// Button with enhanced micro-interactions
interface InteractiveButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const InteractiveButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveButtonProps
>(
  (
    {
      children,
      className,
      variant = "default",
      size = "md",
      loading = false,
      disabled = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();

    const getButtonClasses = () => {
      const baseClasses =
        "relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[44px]";

      const sizeClasses = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2.5 text-base",
        lg: "px-6 py-3 text-lg",
      };

      const variantClasses = {
        default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        outline:
          "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
        ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
        gradient:
          "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500",
      };

      return cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        !disabled &&
          !prefersReducedMotion &&
          "hover:transform hover:scale-105 active:scale-95",
        disabled && "opacity-50 cursor-not-allowed",
        className
      );
    };

    return (
      <button
        ref={ref}
        className={getButtonClasses()}
        disabled={disabled || loading}
        onClick={onClick}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <span className={loading ? "opacity-0" : ""}>{children}</span>
      </button>
    );
  }
);

InteractiveButton.displayName = "InteractiveButton";

// Card with hover effects
interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "glass" | "gradient";
  hoverEffect?: "lift" | "glow" | "scale" | "none";
}

const InteractiveCard = React.forwardRef<HTMLDivElement, InteractiveCardProps>(
  (
    {
      children,
      className,
      variant = "default",
      hoverEffect = "lift",
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();

    const getCardClasses = () => {
      const baseClasses = "rounded-xl transition-all duration-300 ease-out";

      const variantClasses = {
        default: "bg-white border border-gray-200 shadow-sm",
        elevated: "bg-white shadow-md border-0",
        glass: "bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg",
        gradient:
          "bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200",
      };

      const hoverClasses = !prefersReducedMotion
        ? {
            lift: "hover:transform hover:-translate-y-2 hover:shadow-xl",
            glow: "hover:shadow-lg hover:shadow-blue-500/25",
            scale: "hover:transform hover:scale-105",
            none: "",
          }[hoverEffect]
        : "";

      return cn(baseClasses, variantClasses[variant], hoverClasses, className);
    };

    return (
      <div ref={ref} className={getCardClasses()} {...props}>
        {children}
      </div>
    );
  }
);

InteractiveCard.displayName = "InteractiveCard";

// Text with hover effects
interface InteractiveTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: "link" | "highlight" | "gradient";
  hoverEffect?: "underline" | "color" | "scale" | "none";
}

const InteractiveText = React.forwardRef<HTMLSpanElement, InteractiveTextProps>(
  (
    {
      children,
      className,
      variant = "link",
      hoverEffect = "underline",
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();

    const getTextClasses = () => {
      const baseClasses = "transition-all duration-200 ease-out cursor-pointer";

      const variantClasses = {
        link: "text-blue-600 hover:text-blue-700",
        highlight: "text-gray-700 hover:text-blue-600",
        gradient:
          "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent",
      };

      const hoverClasses = !prefersReducedMotion
        ? {
            underline: "hover:underline",
            color: "hover:text-blue-600",
            scale: "hover:transform hover:scale-105",
            none: "",
          }[hoverEffect]
        : "";

      return cn(baseClasses, variantClasses[variant], hoverClasses, className);
    };

    return (
      <span ref={ref} className={getTextClasses()} {...props}>
        {children}
      </span>
    );
  }
);

InteractiveText.displayName = "InteractiveText";

export {
  MicroInteraction,
  InteractiveButton,
  InteractiveCard,
  InteractiveText,
};
