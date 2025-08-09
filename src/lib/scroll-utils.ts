/**
 * Scroll utilities for smooth navigation and section scrolling
 */

/**
 * Smoothly scroll to a section by ID
 * @param sectionId - The ID of the section to scroll to
 * @param offset - Optional offset from the top (default: 80px for header)
 * @param behavior - Scroll behavior ('smooth' or 'auto')
 */
export function scrollToSection(
  sectionId: string,
  offset: number = 80,
  behavior: ScrollBehavior = "smooth"
): void {
  const element = document.getElementById(sectionId);
  if (!element) {
    console.warn(`Element with ID "${sectionId}" not found`);
    return;
  }

  const elementPosition =
    element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior,
  });
}

/**
 * Scroll to top of page
 * @param behavior - Scroll behavior ('smooth' or 'auto')
 */
export function scrollToTop(behavior: ScrollBehavior = "smooth"): void {
  window.scrollTo({
    top: 0,
    behavior,
  });
}

/**
 * Get current scroll position
 */
export function getScrollPosition(): { x: number; y: number } {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop,
  };
}

/**
 * Check if element is in viewport
 * @param element - The element to check
 * @param threshold - Percentage of element that should be visible (0-1)
 */
export function isElementInViewport(
  element: HTMLElement,
  threshold: number = 0.1
): boolean {
  const rect = element.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const verticalVisible =
    rect.top + rect.height * threshold < windowHeight &&
    rect.bottom - rect.height * threshold > 0;
  const horizontalVisible =
    rect.left + rect.width * threshold < windowWidth &&
    rect.right - rect.width * threshold > 0;

  return verticalVisible && horizontalVisible;
}

/**
 * Throttle function for scroll events
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
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
 * Debounce function for scroll events
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
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
