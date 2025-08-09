import { useEffect, useState } from "react";

/**
 * Hook to detect and respond to user's motion preferences
 * Respects prefers-reduced-motion media query for accessibility
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Add event listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook to conditionally apply animations based on user preferences
 */
export function useConditionalAnimation<T>(
  animatedValue: T,
  staticValue: T
): T {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ? staticValue : animatedValue;
}

/**
 * Hook to get animation duration based on user preferences
 * Returns 0 if user prefers reduced motion
 */
export function useAnimationDuration(duration: number): number {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ? 0 : duration;
}
