import {
  AnimationType,
  AnimationConfig,
  EASING_FUNCTIONS,
} from "./animation-config";

/**
 * Animation utility functions for common animation tasks
 */

/**
 * Creates a CSS transition string from animation config
 */
export function createTransition(config: AnimationConfig): string {
  const { duration, easing, delay = 0 } = config;
  const easingValue = EASING_FUNCTIONS[easing];
  return `all ${duration}ms ${easingValue} ${delay}ms`;
}

/**
 * Creates CSS keyframes for custom animations
 */
export function createKeyframes(
  name: string,
  keyframes: Record<string, React.CSSProperties>
): string {
  const keyframeRules = Object.entries(keyframes)
    .map(([key, styles]) => {
      const styleString = Object.entries(styles)
        .map(
          ([prop, value]) =>
            `${prop.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value}`
        )
        .join("; ");
      return `${key} { ${styleString} }`;
    })
    .join(" ");

  return `@keyframes ${name} { ${keyframeRules} }`;
}

/**
 * Debounce function for scroll events
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function for performance-critical animations
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Request animation frame wrapper for smooth animations
 */
export function requestAnimationFramePromise(): Promise<number> {
  return new Promise((resolve) => {
    requestAnimationFrame(resolve);
  });
}

/**
 * Utility to check if animations should be enabled
 */
export function shouldEnableAnimations(): boolean {
  if (typeof window === "undefined") return false;

  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  return !mediaQuery.matches;
}

/**
 * Utility to get optimal animation duration based on distance
 */
export function getOptimalDuration(
  distance: number,
  baseSpeed: number = 0.5
): number {
  // Calculate duration based on distance (pixels) and speed (pixels per ms)
  const duration = Math.max(200, Math.min(800, distance * baseSpeed));
  return Math.round(duration);
}

/**
 * Utility to create staggered delays for multiple elements
 */
export function createStaggeredDelays(
  count: number,
  baseDelay: number = 100
): number[] {
  return Array.from({ length: count }, (_, index) => index * baseDelay);
}

/**
 * Utility to interpolate between two values
 */
export function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}

/**
 * Easing functions for custom animations
 */
export const easingFunctions = {
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInQuart: (t: number) => t * t * t * t,
  easeOutQuart: (t: number) => 1 - --t * t * t * t,
  easeInOutQuart: (t: number) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  easeInQuint: (t: number) => t * t * t * t * t,
  easeOutQuint: (t: number) => 1 + --t * t * t * t * t,
  easeInOutQuint: (t: number) =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
};

/**
 * Animation performance utilities
 */
export const animationPerformance = {
  /**
   * Optimize element for animations by setting will-change
   */
  optimizeForAnimation: (
    element: HTMLElement,
    properties: string[] = ["transform", "opacity"]
  ) => {
    element.style.willChange = properties.join(", ");
  },

  /**
   * Clean up animation optimizations
   */
  cleanupOptimization: (element: HTMLElement) => {
    element.style.willChange = "auto";
  },

  /**
   * Check if element is in viewport for performance optimization
   */
  isInViewport: (element: HTMLElement, threshold: number = 0): boolean => {
    const rect = element.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth;

    return (
      rect.top >= -threshold &&
      rect.left >= -threshold &&
      rect.bottom <= windowHeight + threshold &&
      rect.right <= windowWidth + threshold
    );
  },
};

/**
 * CSS-in-JS animation styles generator
 */
export function generateAnimationStyles(
  type: AnimationType,
  config: AnimationConfig
) {
  const baseStyles: React.CSSProperties = {
    transition: createTransition(config),
  };

  const animationStyles: Record<
    AnimationType,
    {
      initial: React.CSSProperties;
      animate: React.CSSProperties;
    }
  > = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    slideUp: {
      initial: { opacity: 0, transform: "translateY(32px)" },
      animate: { opacity: 1, transform: "translateY(0)" },
    },
    slideDown: {
      initial: { opacity: 0, transform: "translateY(-32px)" },
      animate: { opacity: 1, transform: "translateY(0)" },
    },
    slideLeft: {
      initial: { opacity: 0, transform: "translateX(32px)" },
      animate: { opacity: 1, transform: "translateX(0)" },
    },
    slideRight: {
      initial: { opacity: 0, transform: "translateX(-32px)" },
      animate: { opacity: 1, transform: "translateX(0)" },
    },
    scaleIn: {
      initial: { opacity: 0, transform: "scale(0.95)" },
      animate: { opacity: 1, transform: "scale(1)" },
    },
    scaleOut: {
      initial: { opacity: 1, transform: "scale(1)" },
      animate: { opacity: 0, transform: "scale(0.95)" },
    },
  };

  return {
    ...baseStyles,
    ...animationStyles[type],
  };
}
