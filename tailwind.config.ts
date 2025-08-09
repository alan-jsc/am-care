import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssAspectRatio from "@tailwindcss/aspect-ratio";
import tailwindcssContainerQueries from "@tailwindcss/container-queries";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Custom color palette based on design tokens
      colors: {
        // Base system colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Primary colors - Healthcare blue
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },

        // Secondary colors - Healthcare teal
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e",
        },

        // Success colors
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
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

        // Warning colors
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },

        // Error/Destructive colors
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        error: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a",
        },

        // Neutral colors
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
          mint: "hsl(var(--healthcare-mint))",
          sky: "hsl(var(--healthcare-sky))",
          lavender: "hsl(var(--healthcare-lavender))",
          coral: "hsl(var(--healthcare-coral))",
        },

        // System colors
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },

      // Enhanced font family with Inter and system font fallbacks
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Fira Sans",
          "Droid Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "Consolas",
          "Monaco",
          "monospace",
        ],
      },

      // Enhanced font sizes with fluid scaling and semantic line heights
      fontSize: {
        // Legacy sizes for compatibility
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],

        // Fluid typography sizes using CSS custom properties
        "display-2xl": [
          "var(--font-size-display-2xl)",
          { lineHeight: "var(--line-height-display)" },
        ],
        "display-xl": [
          "var(--font-size-display-xl)",
          { lineHeight: "var(--line-height-display)" },
        ],
        "display-lg": [
          "var(--font-size-display-lg)",
          { lineHeight: "var(--line-height-display)" },
        ],
        "display-md": [
          "var(--font-size-display-md)",
          { lineHeight: "var(--line-height-display)" },
        ],
        "display-sm": [
          "var(--font-size-display-sm)",
          { lineHeight: "var(--line-height-display)" },
        ],

        "heading-xl": [
          "var(--font-size-heading-xl)",
          { lineHeight: "var(--line-height-heading)" },
        ],
        "heading-lg": [
          "var(--font-size-heading-lg)",
          { lineHeight: "var(--line-height-heading)" },
        ],
        "heading-md": [
          "var(--font-size-heading-md)",
          { lineHeight: "var(--line-height-heading)" },
        ],
        "heading-sm": [
          "var(--font-size-heading-sm)",
          { lineHeight: "var(--line-height-heading)" },
        ],
        "heading-xs": [
          "var(--font-size-heading-xs)",
          { lineHeight: "var(--line-height-heading)" },
        ],

        "body-xl": [
          "var(--font-size-body-xl)",
          { lineHeight: "var(--line-height-body)" },
        ],
        "body-lg": [
          "var(--font-size-body-lg)",
          { lineHeight: "var(--line-height-body)" },
        ],
        "body-md": [
          "var(--font-size-body-md)",
          { lineHeight: "var(--line-height-body)" },
        ],
        "body-sm": [
          "var(--font-size-body-sm)",
          { lineHeight: "var(--line-height-body)" },
        ],
        "body-xs": [
          "var(--font-size-body-xs)",
          { lineHeight: "var(--line-height-body)" },
        ],

        caption: [
          "var(--font-size-caption)",
          { lineHeight: "var(--line-height-caption)" },
        ],
      },

      // Enhanced line heights for better readability
      lineHeight: {
        none: "1",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",

        // Semantic line heights
        display: "var(--line-height-display)",
        heading: "var(--line-height-heading)",
        body: "var(--line-height-body)",
        caption: "var(--line-height-caption)",
      },

      // Enhanced letter spacing
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",

        // Semantic letter spacing
        display: "var(--letter-spacing-display)",
        heading: "var(--letter-spacing-heading)",
        body: "var(--letter-spacing-body)",
        caption: "var(--letter-spacing-caption)",
      },

      // Enhanced spacing scale
      spacing: {
        "0.5": "0.125rem",
        "1.5": "0.375rem",
        "2.5": "0.625rem",
        "3.5": "0.875rem",
        "18": "4.5rem",
        "88": "22rem",
        "100": "25rem",
        "112": "28rem",
        "128": "32rem",
      },

      // Enhanced border radius
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "3xl": "1.5rem",
      },

      // Enhanced box shadows
      boxShadow: {
        glow: "var(--shadow-glow)",
        "glow-secondary": "var(--shadow-glow-secondary)",
        "card-hover": "var(--shadow-card-hover)",
      },

      // Enhanced breakpoints
      screens: {
        xs: "320px",
        mobile: "320px",
        tablet: "768px",
        desktop: "1024px",
        "large-desktop": "1440px",
      },

      // Animation durations
      transitionDuration: {
        fast: "var(--duration-fast)",
        medium: "var(--duration-medium)",
        slow: "var(--duration-slow)",
      },

      // Animation timing functions
      transitionTimingFunction: {
        "ease-out": "var(--ease-out)",
        "ease-in": "var(--ease-in)",
        "ease-in-out": "var(--ease-in-out)",
        bounce: "var(--ease-bounce)",
        spring: "var(--ease-spring)",
      },

      // Enhanced keyframes
      keyframes: {
        // Existing keyframes
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },

        // New healthcare-focused keyframes
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
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgb(59 130 246 / 0.1)" },
          "50%": { boxShadow: "0 0 30px rgb(59 130 246 / 0.2)" },
        },
      },

      // Enhanced animations
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in var(--duration-medium) var(--ease-out)",
        "slide-up": "slide-up var(--duration-medium) var(--ease-out)",
        "scale-in": "scale-in var(--duration-fast) var(--ease-out)",
        shimmer: "shimmer 2s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    tailwindcssAspectRatio,
    tailwindcssContainerQueries,
  ],
} satisfies Config;
