/**
 * Responsive Design Utilities
 * Provides utilities for responsive design optimization including container queries,
 * touch target validation, and breakpoint management
 */

// Breakpoint definitions matching Tailwind config
export const breakpoints = {
  xs: 320,
  mobile: 320,
  sm: 640,
  tablet: 768,
  md: 768,
  lg: 1024,
  desktop: 1024,
  xl: 1280,
  "2xl": 1536,
  "large-desktop": 1440,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * Check if current viewport matches a breakpoint
 */
export function matchesBreakpoint(breakpoint: Breakpoint): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth >= breakpoints[breakpoint];
}

/**
 * Get current breakpoint
 */
export function getCurrentBreakpoint(): Breakpoint {
  if (typeof window === "undefined") return "xs";

  const width = window.innerWidth;

  if (width >= breakpoints["2xl"]) return "2xl";
  if (width >= breakpoints.xl) return "xl";
  if (width >= breakpoints.lg) return "lg";
  if (width >= breakpoints.md) return "md";
  if (width >= breakpoints.sm) return "sm";
  return "xs";
}

/**
 * Touch target size validation (minimum 44px as per WCAG guidelines)
 */
export const MINIMUM_TOUCH_TARGET_SIZE = 44;

export function validateTouchTarget(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.width >= MINIMUM_TOUCH_TARGET_SIZE &&
    rect.height >= MINIMUM_TOUCH_TARGET_SIZE
  );
}

/**
 * Container query utilities
 */
export interface ContainerQueryOptions {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}

export function createContainerQuery(
  container: HTMLElement,
  options: ContainerQueryOptions,
  callback: (matches: boolean) => void
): () => void {
  if (!window.ResizeObserver) {
    console.warn("ResizeObserver not supported");
    return () => {};
  }

  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect;

      let matches = true;

      if (options.minWidth && width < options.minWidth) matches = false;
      if (options.maxWidth && width > options.maxWidth) matches = false;
      if (options.minHeight && height < options.minHeight) matches = false;
      if (options.maxHeight && height > options.maxHeight) matches = false;

      callback(matches);
    }
  });

  observer.observe(container);

  return () => observer.disconnect();
}

/**
 * Responsive text scaling utilities
 */
export function getResponsiveTextSize(
  baseSize: number,
  scaleFactor = 0.8
): string {
  const currentBp = getCurrentBreakpoint();

  switch (currentBp) {
    case "xs":
    case "mobile":
      return `${baseSize * scaleFactor}px`;
    case "sm":
      return `${baseSize * (scaleFactor + 0.1)}px`;
    case "md":
    case "tablet":
      return `${baseSize * (scaleFactor + 0.15)}px`;
    default:
      return `${baseSize}px`;
  }
}

/**
 * Responsive spacing utilities
 */
export function getResponsiveSpacing(baseSpacing: number): string {
  const currentBp = getCurrentBreakpoint();

  switch (currentBp) {
    case "xs":
    case "mobile":
      return `${baseSpacing * 0.75}rem`;
    case "sm":
      return `${baseSpacing * 0.875}rem`;
    default:
      return `${baseSpacing}rem`;
  }
}

/**
 * Mobile-first media query generator
 */
export function generateMediaQuery(breakpoint: Breakpoint): string {
  return `@media (min-width: ${breakpoints[breakpoint]}px)`;
}

/**
 * Check if device supports hover
 */
export function supportsHover(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover)").matches;
}

/**
 * Check if device prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Responsive image sizing utilities
 */
export interface ResponsiveImageSizes {
  mobile: string;
  tablet: string;
  desktop: string;
}

export function generateResponsiveImageSizes(
  sizes: ResponsiveImageSizes
): string {
  return `(max-width: ${breakpoints.sm}px) ${sizes.mobile}, (max-width: ${breakpoints.lg}px) ${sizes.tablet}, ${sizes.desktop}`;
}

/**
 * Touch-friendly interaction utilities
 */
export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

/**
 * Viewport utilities
 */
export function getViewportSize(): { width: number; height: number } {
  if (typeof window === "undefined") return { width: 0, height: 0 };

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

/**
 * Safe area utilities for mobile devices
 */
export function getSafeAreaInsets(): {
  top: number;
  right: number;
  bottom: number;
  left: number;
} {
  if (
    typeof window === "undefined" ||
    !CSS.supports("padding", "env(safe-area-inset-top)")
  ) {
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }

  const computedStyle = getComputedStyle(document.documentElement);

  return {
    top:
      parseInt(computedStyle.getPropertyValue("env(safe-area-inset-top)")) || 0,
    right:
      parseInt(computedStyle.getPropertyValue("env(safe-area-inset-right)")) ||
      0,
    bottom:
      parseInt(computedStyle.getPropertyValue("env(safe-area-inset-bottom)")) ||
      0,
    left:
      parseInt(computedStyle.getPropertyValue("env(safe-area-inset-left)")) ||
      0,
  };
}

/**
 * Responsive grid utilities
 */
export function getResponsiveGridColumns(
  mobile: number,
  tablet: number,
  desktop: number
): string {
  const currentBp = getCurrentBreakpoint();

  if (currentBp === "xs" || currentBp === "mobile")
    return `repeat(${mobile}, 1fr)`;
  if (currentBp === "sm" || currentBp === "md" || currentBp === "tablet")
    return `repeat(${tablet}, 1fr)`;
  return `repeat(${desktop}, 1fr)`;
}

/**
 * Accessibility utilities for responsive design
 */
export function ensureMinimumTouchTargets(): void {
  if (typeof document === "undefined") return;

  const interactiveElements = document.querySelectorAll(
    'button, a, input, select, textarea, [role="button"], [tabindex]'
  );

  interactiveElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    if (!validateTouchTarget(htmlElement)) {
      console.warn("Element does not meet minimum touch target size:", element);
    }
  });
}

/**
 * Responsive font loading utilities
 */
export function loadResponsiveFonts(): void {
  if (typeof document === "undefined") return;

  const currentBp = getCurrentBreakpoint();

  // Load different font weights based on screen size
  if (currentBp === "xs" || currentBp === "mobile") {
    // Load only essential font weights for mobile
    document.documentElement.style.setProperty("--font-weight-normal", "400");
    document.documentElement.style.setProperty("--font-weight-medium", "500");
    document.documentElement.style.setProperty("--font-weight-bold", "600");
  } else {
    // Load full font weights for larger screens
    document.documentElement.style.setProperty("--font-weight-normal", "400");
    document.documentElement.style.setProperty("--font-weight-medium", "500");
    document.documentElement.style.setProperty("--font-weight-semibold", "600");
    document.documentElement.style.setProperty("--font-weight-bold", "700");
  }
}
