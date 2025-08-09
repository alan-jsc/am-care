import { useState, useEffect } from "react";

interface Breakpoint {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  width: number;
  height: number;
}

interface TouchTarget {
  minSize: number;
  spacing: number;
}

const BREAKPOINTS = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1440,
} as const;

const TOUCH_TARGETS = {
  mobile: { minSize: 44, spacing: 8 },
  tablet: { minSize: 44, spacing: 12 },
  desktop: { minSize: 32, spacing: 16 },
} as const;

export const useResponsive = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setBreakpoint({
        isMobile: width < BREAKPOINTS.tablet,
        isTablet: width >= BREAKPOINTS.tablet && width < BREAKPOINTS.desktop,
        isDesktop:
          width >= BREAKPOINTS.desktop && width < BREAKPOINTS.largeDesktop,
        isLargeDesktop: width >= BREAKPOINTS.largeDesktop,
        width,
        height,
      });
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    window.addEventListener("orientationchange", updateBreakpoint);

    return () => {
      window.removeEventListener("resize", updateBreakpoint);
      window.removeEventListener("orientationchange", updateBreakpoint);
    };
  }, []);

  return breakpoint;
};

export const useTouchTargets = (): TouchTarget => {
  const { isMobile, isTablet } = useResponsive();

  if (isMobile) {
    return TOUCH_TARGETS.mobile;
  }

  if (isTablet) {
    return TOUCH_TARGETS.tablet;
  }

  return TOUCH_TARGETS.desktop;
};

export const useContainerQuery = (
  ref: React.RefObject<HTMLElement>,
  minWidth: number
): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setMatches(entry.contentRect.width >= minWidth);
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref, minWidth]);

  return matches;
};

export const useOrientation = (): "portrait" | "landscape" => {
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    window.innerHeight > window.innerWidth ? "portrait" : "landscape"
  );

  useEffect(() => {
    const updateOrientation = () => {
      setOrientation(
        window.innerHeight > window.innerWidth ? "portrait" : "landscape"
      );
    };

    window.addEventListener("resize", updateOrientation);
    window.addEventListener("orientationchange", updateOrientation);

    return () => {
      window.removeEventListener("resize", updateOrientation);
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, []);

  return orientation;
};

export const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
};
