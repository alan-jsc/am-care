/**
 * Animation Configuration System
 * Provides timing, easing presets, and animation types for consistent animations
 */

export type AnimationType =
  | "fadeIn"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scaleIn"
  | "scaleOut";

export type EasingFunction =
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "linear"
  | "spring"
  | "bounce";

export interface AnimationConfig {
  type: AnimationType;
  duration: number;
  delay?: number;
  easing: EasingFunction;
  trigger: "scroll" | "hover" | "click" | "load";
  threshold?: number; // For scroll triggers
}

// Timing presets based on design document
export const ANIMATION_DURATIONS = {
  fast: 150, // Hover states, button interactions
  medium: 300, // Card animations, modal transitions
  slow: 500, // Page transitions, complex animations
} as const;

// Easing function mappings to CSS values
export const EASING_FUNCTIONS: Record<EasingFunction, string> = {
  ease: "ease",
  "ease-in": "ease-in",
  "ease-out": "ease-out",
  "ease-in-out": "ease-in-out",
  linear: "linear",
  spring: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
} as const;

// Default animation configurations
export const DEFAULT_ANIMATIONS: Record<
  AnimationType,
  Omit<AnimationConfig, "type">
> = {
  fadeIn: {
    duration: ANIMATION_DURATIONS.medium,
    easing: "ease-out",
    trigger: "scroll",
    threshold: 0.1,
  },
  slideUp: {
    duration: ANIMATION_DURATIONS.medium,
    easing: "ease-out",
    trigger: "scroll",
    threshold: 0.1,
  },
  slideDown: {
    duration: ANIMATION_DURATIONS.medium,
    easing: "ease-out",
    trigger: "scroll",
    threshold: 0.1,
  },
  slideLeft: {
    duration: ANIMATION_DURATIONS.medium,
    easing: "ease-out",
    trigger: "scroll",
    threshold: 0.1,
  },
  slideRight: {
    duration: ANIMATION_DURATIONS.medium,
    easing: "ease-out",
    trigger: "scroll",
    threshold: 0.1,
  },
  scaleIn: {
    duration: ANIMATION_DURATIONS.medium,
    easing: "spring",
    trigger: "scroll",
    threshold: 0.1,
  },
  scaleOut: {
    duration: ANIMATION_DURATIONS.fast,
    easing: "ease-in",
    trigger: "hover",
  },
} as const;

// CSS class mappings for animations
export const ANIMATION_CLASSES: Record<
  AnimationType,
  { initial: string; animate: string }
> = {
  fadeIn: {
    initial: "opacity-0",
    animate: "opacity-100",
  },
  slideUp: {
    initial: "opacity-0 translate-y-8",
    animate: "opacity-100 translate-y-0",
  },
  slideDown: {
    initial: "opacity-0 -translate-y-8",
    animate: "opacity-100 translate-y-0",
  },
  slideLeft: {
    initial: "opacity-0 translate-x-8",
    animate: "opacity-100 translate-x-0",
  },
  slideRight: {
    initial: "opacity-0 -translate-x-8",
    animate: "opacity-100 translate-x-0",
  },
  scaleIn: {
    initial: "opacity-0 scale-95",
    animate: "opacity-100 scale-100",
  },
  scaleOut: {
    initial: "opacity-100 scale-100",
    animate: "opacity-0 scale-95",
  },
} as const;

/**
 * Utility function to create animation configuration
 */
export function createAnimationConfig(
  type: AnimationType,
  overrides?: Partial<Omit<AnimationConfig, "type">>
): AnimationConfig {
  return {
    type,
    ...DEFAULT_ANIMATIONS[type],
    ...overrides,
  };
}

/**
 * Utility function to get CSS transition string
 */
export function getTransitionString(config: AnimationConfig): string {
  const { duration, easing, delay = 0 } = config;
  const easingValue = EASING_FUNCTIONS[easing];
  return `all ${duration}ms ${easingValue} ${delay}ms`;
}
