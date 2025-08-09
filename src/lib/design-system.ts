/**
 * Design System Utilities
 * Provides easy access to design tokens and utility functions
 */

import { designTokens } from "./design-tokens";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Enhanced cn utility with design system awareness
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Color utilities
export const getColorValue = (colorPath: string) => {
  const paths = colorPath.split(".");
  let value: any = designTokens.colors;

  for (const path of paths) {
    value = value?.[path];
  }

  return value;
};

// Spacing utilities
export const getSpacing = (key: keyof typeof designTokens.spacing) => {
  return designTokens.spacing[key];
};

// Typography utilities
export const getFontSize = (
  key: keyof typeof designTokens.typography.fontSize
) => {
  return designTokens.typography.fontSize[key];
};

// Animation utilities
export const getAnimationDuration = (
  key: keyof typeof designTokens.animation.duration
) => {
  return designTokens.animation.duration[key];
};

export const getAnimationEasing = (
  key: keyof typeof designTokens.animation.easing
) => {
  return designTokens.animation.easing[key];
};

// Breakpoint utilities
export const getBreakpoint = (key: keyof typeof designTokens.screens) => {
  return designTokens.screens[key];
};

// Healthcare-specific color combinations
export const healthcareColorCombinations = {
  primary: {
    background: "bg-primary-50",
    text: "text-primary-900",
    border: "border-primary-200",
    accent: "bg-primary-600 text-white",
  },
  secondary: {
    background: "bg-secondary-50",
    text: "text-secondary-900",
    border: "border-secondary-200",
    accent: "bg-secondary-600 text-white",
  },
  success: {
    background: "bg-success-50",
    text: "text-success-900",
    border: "border-success-200",
    accent: "bg-success-600 text-white",
  },
  warning: {
    background: "bg-warning-50",
    text: "text-warning-900",
    border: "border-warning-200",
    accent: "bg-warning-600 text-white",
  },
  error: {
    background: "bg-error-50",
    text: "text-error-900",
    border: "border-error-200",
    accent: "bg-error-600 text-white",
  },
} as const;

// Component variant utilities
export const createVariants = <
  T extends Record<string, Record<string, string>>
>(
  variants: T
) => {
  return (variant: keyof T, size?: string) => {
    const variantClasses = variants[variant];
    if (!variantClasses) return "";

    if (size && variantClasses[size]) {
      return variantClasses[size];
    }

    return variantClasses.default || "";
  };
};

// Healthcare-specific button variants
export const buttonVariants = createVariants({
  primary: {
    default:
      "healthcare-button-primary px-6 py-3 rounded-lg font-medium transition-all duration-medium hover:shadow-glow",
    sm: "healthcare-button-primary px-4 py-2 rounded-md font-medium transition-all duration-medium hover:shadow-glow text-sm",
    lg: "healthcare-button-primary px-8 py-4 rounded-xl font-medium transition-all duration-medium hover:shadow-glow text-lg",
  },
  secondary: {
    default:
      "healthcare-button-secondary px-6 py-3 rounded-lg font-medium transition-all duration-medium hover:shadow-glow-secondary",
    sm: "healthcare-button-secondary px-4 py-2 rounded-md font-medium transition-all duration-medium hover:shadow-glow-secondary text-sm",
    lg: "healthcare-button-secondary px-8 py-4 rounded-xl font-medium transition-all duration-medium hover:shadow-glow-secondary text-lg",
  },
  outline: {
    default:
      "border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-medium",
    sm: "border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-4 py-2 rounded-md font-medium transition-all duration-medium text-sm",
    lg: "border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-8 py-4 rounded-xl font-medium transition-all duration-medium text-lg",
  },
  ghost: {
    default:
      "text-primary-600 hover:bg-primary-50 px-6 py-3 rounded-lg font-medium transition-all duration-medium",
    sm: "text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-md font-medium transition-all duration-medium text-sm",
    lg: "text-primary-600 hover:bg-primary-50 px-8 py-4 rounded-xl font-medium transition-all duration-medium text-lg",
  },
});

// Healthcare-specific card variants
export const cardVariants = createVariants({
  default: {
    default: "healthcare-card p-6",
    sm: "healthcare-card p-4",
    lg: "healthcare-card p-8",
  },
  elevated: {
    default: "healthcare-card healthcare-card-hover p-6",
    sm: "healthcare-card healthcare-card-hover p-4",
    lg: "healthcare-card healthcare-card-hover p-8",
  },
  glass: {
    default: "glass rounded-lg p-6 border",
    sm: "glass rounded-lg p-4 border",
    lg: "glass rounded-xl p-8 border",
  },
});

// Responsive utilities
export const responsiveClasses = {
  container: "container mx-auto px-4 sm:px-6 lg:px-8",
  grid: {
    cols1: "grid grid-cols-1",
    cols2: "grid grid-cols-1 md:grid-cols-2",
    cols3: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    cols4: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  },
  flex: {
    center: "flex items-center justify-center",
    between: "flex items-center justify-between",
    start: "flex items-center justify-start",
    end: "flex items-center justify-end",
  },
  text: {
    center: "text-center",
    left: "text-left",
    right: "text-right",
    responsive: "text-center md:text-left",
  },
} as const;

// Animation presets
export const animationPresets = {
  fadeIn: "animate-fade-in",
  slideUp: "animate-slide-up",
  scaleIn: "animate-scale-in",
  shimmer: "animate-shimmer",
  pulseGlow: "animate-pulse-glow",

  // With delays
  fadeInDelay100: "animate-fade-in animate-delay-100",
  fadeInDelay200: "animate-fade-in animate-delay-200",
  fadeInDelay300: "animate-fade-in animate-delay-300",

  slideUpDelay100: "animate-slide-up animate-delay-100",
  slideUpDelay200: "animate-slide-up animate-delay-200",
  slideUpDelay300: "animate-slide-up animate-delay-300",
} as const;

// Accessibility utilities
export const a11yClasses = {
  srOnly: "sr-only",
  focusVisible:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  touchTarget: "touch-target",
  skipLink:
    "absolute -top-full left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md focus:top-4 transition-all",
} as const;

// Export all utilities (removed duplicate exports)
export { designTokens };
