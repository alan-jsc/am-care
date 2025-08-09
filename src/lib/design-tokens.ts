/**
 * Design Tokens for ICare Modern UI Enhancement
 * Based on requirements 6.1, 6.2, 6.3 from the spec
 */

// Color Palette - Healthcare focused with modern gradients
export const colors = {
  // Primary - Blue gradient for trust and professionalism
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6", // Base primary
    600: "#2563eb", // Primary gradient start
    700: "#1d4ed8", // Primary gradient end
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554",
  },

  // Secondary - Teal for accents and highlights
  secondary: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6", // Base secondary
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
    950: "#042f2e",
  },

  // Success - Green for positive states
  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16",
  },

  // Warning - Amber for warnings
  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b", // Base warning
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03",
  },

  // Error - Red for error states
  error: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444", // Base error
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a",
  },

  // Neutral - Gray scale for text and backgrounds
  neutral: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  },

  // Healthcare specific colors
  healthcare: {
    mint: "#10b981",
    sky: "#0ea5e9",
    lavender: "#8b5cf6",
    coral: "#f97316",
  },
} as const;

// Typography Scale - Inter font with healthcare-appropriate hierarchy
export const typography = {
  fontFamily: {
    sans: [
      "Inter",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "sans-serif",
    ],
    mono: ["JetBrains Mono", "Fira Code", "Consolas", "Monaco", "monospace"],
  },

  fontSize: {
    // Body text sizes
    xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
    sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
    base: ["1rem", { lineHeight: "1.5rem" }], // 16px
    lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px

    // Heading sizes
    xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
    "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
    "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
    "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px
    "5xl": ["3rem", { lineHeight: "1" }], // 48px
    "6xl": ["3.75rem", { lineHeight: "1" }], // 60px
  },

  fontWeight: {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },

  lineHeight: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },

  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
} as const;

// Spacing System - 4px base unit scale
export const spacing = {
  px: "1px",
  0: "0px",
  0.5: "0.125rem", // 2px
  1: "0.25rem", // 4px - base unit
  1.5: "0.375rem", // 6px
  2: "0.5rem", // 8px
  2.5: "0.625rem", // 10px
  3: "0.75rem", // 12px
  3.5: "0.875rem", // 14px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  7: "1.75rem", // 28px
  8: "2rem", // 32px
  9: "2.25rem", // 36px
  10: "2.5rem", // 40px
  11: "2.75rem", // 44px
  12: "3rem", // 48px
  14: "3.5rem", // 56px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
  28: "7rem", // 112px
  32: "8rem", // 128px
  36: "9rem", // 144px
  40: "10rem", // 160px
  44: "11rem", // 176px
  48: "12rem", // 192px
  52: "13rem", // 208px
  56: "14rem", // 224px
  60: "15rem", // 240px
  64: "16rem", // 256px
  72: "18rem", // 288px
  80: "20rem", // 320px
  96: "24rem", // 384px
} as const;

// Border Radius Scale
export const borderRadius = {
  none: "0px",
  sm: "0.125rem", // 2px
  DEFAULT: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  "3xl": "1.5rem", // 24px
  full: "9999px",
} as const;

// Shadow Scale - Healthcare appropriate shadows
export const boxShadow = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  none: "0 0 #0000",

  // Custom healthcare shadows
  glow: "0 0 20px rgb(59 130 246 / 0.15)",
  "glow-secondary": "0 0 20px rgb(20 184 166 / 0.15)",
  "card-hover": "0 20px 40px -12px rgb(0 0 0 / 0.15)",
} as const;

// Breakpoints - Mobile-first approach
export const screens = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",

  // Custom healthcare breakpoints
  mobile: "320px",
  tablet: "768px",
  desktop: "1024px",
  "large-desktop": "1440px",
} as const;

// Animation Timing and Easing
export const animation = {
  duration: {
    fast: "150ms",
    medium: "300ms",
    slow: "500ms",
    slower: "750ms",
    slowest: "1000ms",
  },

  easing: {
    "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
    "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
    "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },

  keyframes: {
    "fade-in": {
      "0%": { opacity: "0" },
      "100%": { opacity: "1" },
    },
    "slide-up": {
      "0%": { transform: "translateY(20px)", opacity: "0" },
      "100%": { transform: "translateY(0)", opacity: "1" },
    },
    "scale-in": {
      "0%": { transform: "scale(0.95)", opacity: "0" },
      "100%": { transform: "scale(1)", opacity: "1" },
    },
    shimmer: {
      "0%": { transform: "translateX(-100%)" },
      "100%": { transform: "translateX(100%)" },
    },
  },
} as const;

// Z-index Scale
export const zIndex = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// Export all tokens as a single object for easy access
export const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  boxShadow,
  screens,
  animation,
  zIndex,
} as const;

export type DesignTokens = typeof designTokens;
