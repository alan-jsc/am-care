import { useRef, useCallback, useEffect } from "react";

interface TouchSwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  preventDefaultTouchmoveEvent?: boolean;
}

interface TouchPosition {
  x: number;
  y: number;
}

export function useTouchSwipe(options: TouchSwipeOptions) {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold = 50,
    preventDefaultTouchmoveEvent = false,
  } = options;

  const touchStartPos = useRef<TouchPosition | null>(null);
  const touchEndPos = useRef<TouchPosition | null>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    touchStartPos.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (preventDefaultTouchmoveEvent) {
        e.preventDefault();
      }
    },
    [preventDefaultTouchmoveEvent]
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!touchStartPos.current) return;

      const touch = e.changedTouches[0];
      touchEndPos.current = {
        x: touch.clientX,
        y: touch.clientY,
      };

      const deltaX = touchEndPos.current.x - touchStartPos.current.x;
      const deltaY = touchEndPos.current.y - touchStartPos.current.y;

      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      // Determine if it's a horizontal or vertical swipe
      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (absDeltaX > threshold) {
          if (deltaX > 0) {
            onSwipeRight?.();
          } else {
            onSwipeLeft?.();
          }
        }
      } else {
        // Vertical swipe
        if (absDeltaY > threshold) {
          if (deltaY > 0) {
            onSwipeDown?.();
          } else {
            onSwipeUp?.();
          }
        }
      }

      // Reset positions
      touchStartPos.current = null;
      touchEndPos.current = null;
    },
    [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold]
  );

  const attachSwipeListeners = useCallback(
    (element: HTMLElement | null) => {
      if (!element) return;

      element.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      element.addEventListener("touchmove", handleTouchMove, {
        passive: !preventDefaultTouchmoveEvent,
      });
      element.addEventListener("touchend", handleTouchEnd, { passive: true });

      return () => {
        element.removeEventListener("touchstart", handleTouchStart);
        element.removeEventListener("touchmove", handleTouchMove);
        element.removeEventListener("touchend", handleTouchEnd);
      };
    },
    [handleTouchStart, handleTouchMove, handleTouchEnd]
  );

  return { attachSwipeListeners };
}
