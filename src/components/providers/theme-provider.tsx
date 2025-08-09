/**
 * Enhanced Theme Provider for WeCare247 Design System
 * Manages theme state and provides design tokens to components
 */

import React from "react";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "system";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  enableSystemTheme?: boolean;
  enableSmoothTransitions?: boolean;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: "light" | "dark";
  isSystemTheme: boolean;
  toggleTheme: () => void;
  cycleTheme: () => void;
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  actualTheme: "light",
  isSystemTheme: false,
  toggleTheme: () => null,
  cycleTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "wecare247-ui-theme",
  enableSystemTheme = true,
  enableSmoothTransitions = true,
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;

    const stored = localStorage.getItem(storageKey) as Theme;
    return stored || defaultTheme;
  });

  const [actualTheme, setActualTheme] = useState<"light" | "dark">("light");
  const [isSystemTheme, setIsSystemTheme] = useState(false);

  // Apply theme to document
  const applyTheme = useCallback(
    (newTheme: Theme) => {
      const root = window.document.documentElement;

      // Remove existing theme classes
      root.classList.remove("light", "dark");

      let resolvedTheme: "light" | "dark";
      let isSystem = false;

      if (newTheme === "system" && enableSystemTheme) {
        resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        isSystem = true;
      } else {
        resolvedTheme = newTheme as "light" | "dark";
        isSystem = false;
      }

      // Add smooth transitions if enabled
      if (enableSmoothTransitions) {
        root.classList.add("transition-colors", "duration-300");
      }

      // Apply theme class
      root.classList.add(resolvedTheme);

      // Update state
      setActualTheme(resolvedTheme);
      setIsSystemTheme(isSystem);

      // Update CSS custom properties for theme
      updateThemeColors(resolvedTheme);
    },
    [enableSystemTheme, enableSmoothTransitions]
  );

  // Update CSS custom properties for theme colors
  const updateThemeColors = useCallback((theme: "light" | "dark") => {
    const root = window.document.documentElement;

    const colors = {
      light: {
        "--background": "0 0% 100%",
        "--foreground": "222.2 84% 4.9%",
        "--card": "0 0% 100%",
        "--card-foreground": "222.2 84% 4.9%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "222.2 84% 4.9%",
        "--primary": "221.2 83.2% 53.3%",
        "--primary-foreground": "210 40% 98%",
        "--secondary": "210 40% 96%",
        "--secondary-foreground": "222.2 84% 4.9%",
        "--muted": "210 40% 96%",
        "--muted-foreground": "215.4 16.3% 46.9%",
        "--accent": "210 40% 96%",
        "--accent-foreground": "222.2 84% 4.9%",
        "--destructive": "0 84.2% 60.2%",
        "--destructive-foreground": "210 40% 98%",
        "--border": "214.3 31.8% 91.4%",
        "--input": "214.3 31.8% 91.4%",
        "--ring": "221.2 83.2% 53.3%",
        "--radius": "0.5rem",
      },
      dark: {
        "--background": "222.2 84% 4.9%",
        "--foreground": "210 40% 98%",
        "--card": "222.2 84% 4.9%",
        "--card-foreground": "210 40% 98%",
        "--popover": "222.2 84% 4.9%",
        "--popover-foreground": "210 40% 98%",
        "--primary": "217.2 91.2% 59.8%",
        "--primary-foreground": "222.2 84% 4.9%",
        "--secondary": "217.2 32.6% 17.5%",
        "--secondary-foreground": "210 40% 98%",
        "--muted": "217.2 32.6% 17.5%",
        "--muted-foreground": "215 20.2% 65.1%",
        "--accent": "217.2 32.6% 17.5%",
        "--accent-foreground": "210 40% 98%",
        "--destructive": "0 62.8% 30.6%",
        "--destructive-foreground": "210 40% 98%",
        "--border": "217.2 32.6% 17.5%",
        "--input": "217.2 32.6% 17.5%",
        "--ring": "224.3 76.3% 94.1%",
        "--radius": "0.5rem",
      },
    };

    const themeColors = colors[theme];
    Object.entries(themeColors).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }, []);

  // Set theme with persistence
  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      localStorage.setItem(storageKey, newTheme);
      applyTheme(newTheme);
    },
    [storageKey, applyTheme]
  );

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    const newTheme = actualTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }, [actualTheme, setTheme]);

  // Cycle through themes: light -> dark -> system
  const cycleTheme = useCallback(() => {
    const themes: Theme[] = ["light", "dark", "system"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  }, [theme, setTheme]);

  // Initialize theme on mount
  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== "system" || !enableSystemTheme) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      applyTheme("system");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, enableSystemTheme, applyTheme]);

  // Prevent flash of unstyled content
  useEffect(() => {
    const root = window.document.documentElement;
    root.style.colorScheme = actualTheme;
  }, [actualTheme]);

  const value: ThemeProviderState = {
    theme,
    setTheme,
    actualTheme,
    isSystemTheme,
    toggleTheme,
    cycleTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

// Theme toggle component
interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
  variant?: "button" | "icon" | "switch";
}

export const ThemeToggle = React.forwardRef<
  HTMLButtonElement,
  ThemeToggleProps
>(({ className, showLabel = false, variant = "button", ...props }, ref) => {
  const { theme, toggleTheme, cycleTheme, isSystemTheme } = useTheme();

  const getThemeIcon = () => {
    if (isSystemTheme) {
      return (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      );
    }

    return theme === "dark" ? (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ) : (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    );
  };

  if (variant === "icon") {
    return (
      <button
        ref={ref}
        onClick={toggleTheme}
        className={cn(
          "p-2 rounded-lg transition-colors duration-200",
          "hover:bg-gray-100 dark:hover:bg-gray-800",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          className
        )}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        {...props}
      >
        {getThemeIcon()}
      </button>
    );
  }

  if (variant === "switch") {
    return (
      <button
        ref={ref}
        onClick={cycleTheme}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200",
          "bg-gray-200 dark:bg-gray-700",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          className
        )}
        role="switch"
        aria-checked={theme === "dark"}
        aria-label="Toggle theme"
        {...props}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200",
            theme === "dark" ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
    );
  }

  return (
    <button
      ref={ref}
      onClick={toggleTheme}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-2 rounded-lg",
        "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
        "transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        className
      )}
      {...props}
    >
      {getThemeIcon()}
      {showLabel && (
        <span className="text-sm font-medium">
          {isSystemTheme ? "System" : theme === "dark" ? "Light" : "Dark"}
        </span>
      )}
    </button>
  );
});

ThemeToggle.displayName = "ThemeToggle";
