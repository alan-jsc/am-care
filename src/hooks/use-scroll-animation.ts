import { useEffect, useState } from "react";
import { useIntersectionObserver } from "./use-intersection-observer";
import {
  AnimationType,
  AnimationConfig,
  createAnimationConfig,
  ANIMATION_CLASSES,
} from "../lib/animation-config";

interface UseScrollAnimationOptions {
  type: AnimationType;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  duration?: number;
  disabled?: boolean; // For prefers-reduced-motion
}

interface ScrollAnimationReturn {
  elementRef: React.RefObject<HTMLElement>;
  isVisible: boolean;
  animationClasses: string;
  style: React.CSSProperties;
}

/**
 * Enhanced scroll-triggered animation hook
 * Combines IntersectionObserver with animation configuration system
 */
export function useScrollAnimation(
  options: UseScrollAnimationOptions
): ScrollAnimationReturn {
  const {
    type,
    threshold = 0.1,
    rootMargin = "50px",
    triggerOnce = true,
    delay = 0,
    duration,
    disabled = false,
  } = options;

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const { elementRef, isIntersecting, hasIntersected } =
    useIntersectionObserver({
      threshold,
      rootMargin,
      triggerOnce,
    });

  // Determine if animation should be disabled
  const shouldDisableAnimation = disabled || prefersReducedMotion;

  // Get animation configuration
  const config = createAnimationConfig(type, { duration, delay });
  const animationClasses = ANIMATION_CLASSES[type];

  // Determine visibility state
  const isVisible = triggerOnce ? hasIntersected : isIntersecting;

  // Generate CSS classes
  const classes = shouldDisableAnimation
    ? animationClasses.animate // Skip animation, show final state
    : isVisible
    ? `${animationClasses.animate} transition-all`
    : `${animationClasses.initial} transition-all`;

  // Generate inline styles for timing
  const style: React.CSSProperties = shouldDisableAnimation
    ? {}
    : {
        transitionDuration: `${config.duration}ms`,
        transitionDelay: `${config.delay || 0}ms`,
        transitionTimingFunction:
          config.easing === "spring"
            ? "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
            : config.easing,
      };

  return {
    elementRef,
    isVisible,
    animationClasses: classes,
    style,
  };
}

/**
 * Hook for staggered animations (useful for lists)
 */
export function useStaggeredAnimation(
  count: number,
  options: Omit<UseScrollAnimationOptions, "delay">
) {
  const baseDelay = 100; // Base delay between items

  return Array.from({ length: count }, (_, index) =>
    useScrollAnimation({
      ...options,
      delay: index * baseDelay,
    })
  );
}
