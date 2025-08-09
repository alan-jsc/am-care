import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Focus trap component for modals and dialogs
interface FocusTrapProps {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}

const FocusTrap = React.forwardRef<HTMLDivElement, FocusTrapProps>(
  ({ children, active = true, className, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [focusableElements, setFocusableElements] = useState<HTMLElement[]>(
      []
    );

    useEffect(() => {
      if (!active || !containerRef.current) return;

      const container = containerRef.current;
      const elements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;

      setFocusableElements(Array.from(elements));

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key !== "Tab") return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [active, focusableElements]);

    return (
      <div ref={containerRef} className={className} {...props}>
        {children}
      </div>
    );
  }
);

FocusTrap.displayName = "FocusTrap";

// Skip link component for keyboard navigation
interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const SkipLink = React.forwardRef<HTMLAnchorElement, SkipLinkProps>(
  ({ href, children, className, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          "absolute -top-10 left-6 bg-blue-600 text-white px-4 py-2 rounded-md",
          "focus:top-4 focus:z-50 transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);

SkipLink.displayName = "SkipLink";

// Screen reader only text
interface ScreenReaderOnlyProps {
  children: React.ReactNode;
  className?: string;
}

const ScreenReaderOnly = React.forwardRef<
  HTMLSpanElement,
  ScreenReaderOnlyProps
>(({ children, className, ...props }, ref) => {
  return (
    <span ref={ref} className={cn("sr-only", className)} {...props}>
      {children}
    </span>
  );
});

ScreenReaderOnly.displayName = "ScreenReaderOnly";

// Live region for dynamic content updates
interface LiveRegionProps {
  children: React.ReactNode;
  className?: string;
  "aria-live"?: "polite" | "assertive" | "off";
  "aria-atomic"?: boolean;
}

const LiveRegion = React.forwardRef<HTMLDivElement, LiveRegionProps>(
  (
    {
      children,
      className,
      "aria-live": ariaLive = "polite",
      "aria-atomic": ariaAtomic = true,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("sr-only", className)}
        aria-live={ariaLive}
        aria-atomic={ariaAtomic}
        {...props}
      >
        {children}
      </div>
    );
  }
);

LiveRegion.displayName = "LiveRegion";

// Accessible button component
interface AccessibleButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-expanded"?: boolean;
  "aria-pressed"?: boolean;
  role?: string;
}

const AccessibleButton = React.forwardRef<
  HTMLButtonElement,
  AccessibleButtonProps
>(
  (
    {
      children,
      className,
      onClick,
      disabled = false,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedby,
      "aria-expanded": ariaExpanded,
      "aria-pressed": ariaPressed,
      role,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          "min-h-[44px] min-w-[44px]",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        aria-expanded={ariaExpanded}
        aria-pressed={ariaPressed}
        role={role}
        {...props}
      >
        {children}
      </button>
    );
  }
);

AccessibleButton.displayName = "AccessibleButton";

// Accessible form field wrapper
interface AccessibleFieldProps {
  children: React.ReactNode;
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  description?: string;
  className?: string;
}

const AccessibleField = React.forwardRef<HTMLDivElement, AccessibleFieldProps>(
  (
    {
      children,
      label,
      id,
      required = false,
      error,
      description,
      className,
      ...props
    },
    ref
  ) => {
    const errorId = `${id}-error`;
    const descriptionId = `${id}-description`;

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {description && (
          <div id={descriptionId} className="text-sm text-gray-500">
            {description}
          </div>
        )}

        <div>
          {React.cloneElement(children as React.ReactElement, {
            id,
            "aria-describedby": error
              ? errorId
              : description
              ? descriptionId
              : undefined,
            "aria-invalid": error ? "true" : undefined,
            required,
          })}
        </div>

        {error && (
          <div id={errorId} className="text-sm text-red-600" role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);

AccessibleField.displayName = "AccessibleField";

// High contrast mode support
interface HighContrastProps {
  children: React.ReactNode;
  className?: string;
}

const HighContrast = React.forwardRef<HTMLDivElement, HighContrastProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "high-contrast:bg-white high-contrast:text-black",
          "high-contrast:border-2 high-contrast:border-black",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

HighContrast.displayName = "HighContrast";

// Reduced motion support
interface ReducedMotionProps {
  children: React.ReactNode;
  className?: string;
  motionClassName?: string;
}

const ReducedMotion = React.forwardRef<HTMLDivElement, ReducedMotionProps>(
  ({ children, className, motionClassName, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "motion-reduce:transition-none motion-reduce:animate-none",
          motionClassName,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ReducedMotion.displayName = "ReducedMotion";

// Accessibility hook for managing focus
export const useAccessibility = () => {
  const [isKeyboardNavigating, setIsKeyboardNavigating] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        setIsKeyboardNavigating(true);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardNavigating(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return { isKeyboardNavigating };
};

// Accessibility utilities
export const accessibilityUtils = {
  // Generate unique ID for ARIA relationships
  generateId: (prefix: string = "id") =>
    `${prefix}-${Math.random().toString(36).substr(2, 9)}`,

  // Check if element is focusable
  isFocusable: (element: HTMLElement) => {
    const tabIndex = element.getAttribute("tabindex");
    const disabled = element.hasAttribute("disabled");
    const hidden = element.hasAttribute("hidden");

    return (
      !disabled &&
      !hidden &&
      (tabIndex !== "-1" ||
        element.tagName === "BUTTON" ||
        element.tagName === "A")
    );
  },

  // Get all focusable elements within a container
  getFocusableElements: (container: HTMLElement) => {
    const elements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    return Array.from(elements).filter((element) =>
      accessibilityUtils.isFocusable(element)
    );
  },

  // Announce to screen readers
  announce: (message: string, priority: "polite" | "assertive" = "polite") => {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", priority);
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },
};

export {
  FocusTrap,
  SkipLink,
  ScreenReaderOnly,
  LiveRegion,
  AccessibleButton,
  AccessibleField,
  HighContrast,
  ReducedMotion,
};
