/**
 * Typography Component
 * Provides semantic typography components with responsive scaling,
 * proper hierarchy, and WCAG AA contrast compliance
 * Requirements: 6.1, 6.2, 6.3, 6.4
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import { typographyClasses, type TypographyProps } from "@/lib/typography";

// Main Typography component
export const Typography = React.forwardRef<
  HTMLElement,
  TypographyProps & React.HTMLAttributes<HTMLElement>
>(({ variant = "body-md", as = "p", className, children, ...props }, ref) => {
  const Component = as as keyof JSX.IntrinsicElements;

  return React.createElement(
    Component,
    {
      ref,
      className: cn(typographyClasses[variant], className),
      ...props,
    },
    children
  );
});

Typography.displayName = "Typography";

// Semantic typography components for better developer experience
export const Display = React.forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, "variant" | "as"> & {
    size?: "2xl" | "xl" | "lg" | "md" | "sm";
    gradient?: boolean;
  } & React.HTMLAttributes<HTMLHeadingElement>
>(({ size = "lg", gradient = false, className, children, ...props }, ref) => {
  const variant = `display-${size}` as keyof typeof typographyClasses;

  return (
    <h1
      ref={ref}
      className={cn(
        typographyClasses[variant],
        gradient &&
          "bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
});

Display.displayName = "Display";

export const Heading = React.forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, "variant"> & {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    size?: "xl" | "lg" | "md" | "sm" | "xs";
    gradient?: boolean;
  } & React.HTMLAttributes<HTMLHeadingElement>
>(
  (
    { level = 2, size = "lg", gradient = false, className, children, ...props },
    ref
  ) => {
    const Component = `h${level}` as keyof JSX.IntrinsicElements;
    const variant = `heading-${size}` as keyof typeof typographyClasses;

    return React.createElement(
      Component,
      {
        ref,
        className: cn(
          typographyClasses[variant],
          gradient &&
            "bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent",
          className
        ),
        ...props,
      },
      children
    );
  }
);

Heading.displayName = "Heading";

export const Body = React.forwardRef<
  HTMLParagraphElement,
  Omit<TypographyProps, "variant" | "as"> & {
    size?: "xl" | "lg" | "md" | "sm" | "xs";
    lead?: boolean;
    muted?: boolean;
  } & React.HTMLAttributes<HTMLParagraphElement>
>(
  (
    { size = "md", lead = false, muted = false, className, children, ...props },
    ref
  ) => {
    let variant: keyof typeof typographyClasses;

    if (lead) {
      variant = "lead";
    } else if (muted) {
      variant = "muted";
    } else {
      variant = `body-${size}` as keyof typeof typographyClasses;
    }

    return (
      <p
        ref={ref}
        className={cn(typographyClasses[variant], className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

Body.displayName = "Body";

export const Caption = React.forwardRef<
  HTMLSpanElement,
  Omit<TypographyProps, "variant" | "as"> &
    React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(typographyClasses.caption, className)}
      {...props}
    >
      {children}
    </span>
  );
});

Caption.displayName = "Caption";

// Specialized components for common use cases
export const PageTitle = React.forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, "variant" | "as"> & {
    gradient?: boolean;
  } & React.HTMLAttributes<HTMLHeadingElement>
>(({ gradient = false, className, children, ...props }, ref) => {
  return (
    <h1
      ref={ref}
      className={cn(
        typographyClasses["display-lg"],
        gradient &&
          "bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent",
        "mb-4",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
});

PageTitle.displayName = "PageTitle";

export const SectionTitle = React.forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, "variant" | "as"> & {
    gradient?: boolean;
  } & React.HTMLAttributes<HTMLHeadingElement>
>(({ gradient = false, className, children, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className={cn(
        typographyClasses["heading-xl"],
        gradient &&
          "bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent",
        "mb-6",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
});

SectionTitle.displayName = "SectionTitle";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, "variant" | "as"> &
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn(typographyClasses["heading-md"], "mb-2", className)}
      {...props}
    >
      {children}
    </h3>
  );
});

CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  Omit<TypographyProps, "variant" | "as"> &
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(typographyClasses["body-md"], "mb-4", className)}
      {...props}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = "CardDescription";

// Accessibility-focused components
export const ScreenReaderOnly = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => {
  return (
    <span ref={ref} className={cn("sr-only", className)} {...props}>
      {children}
    </span>
  );
});

ScreenReaderOnly.displayName = "ScreenReaderOnly";

// Link component with proper contrast
export const Link = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: "primary" | "secondary" | "muted";
    underline?: boolean;
  }
>(
  (
    { variant = "primary", underline = true, className, children, ...props },
    ref
  ) => {
    const variants = {
      primary:
        "text-primary-700 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300",
      secondary:
        "text-secondary-700 hover:text-secondary-800 dark:text-secondary-400 dark:hover:text-secondary-300",
      muted:
        "text-neutral-600 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300",
    };

    return (
      <a
        ref={ref}
        className={cn(
          "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          variants[variant],
          underline && "underline underline-offset-4 hover:underline-offset-2",
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";

// List components with proper spacing
export const List = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement> & {
    ordered?: boolean;
    spacing?: "tight" | "normal" | "loose";
  }
>(
  (
    { ordered = false, spacing = "normal", className, children, ...props },
    ref
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Component: any = ordered ? "ol" : "ul";
    const spacingClasses = {
      tight: "space-y-1",
      normal: "space-y-2",
      loose: "space-y-4",
    };

    return (
      <Component
        ref={ref}
        className={cn(
          "list-disc list-inside",
          ordered && "list-decimal",
          spacingClasses[spacing],
          typographyClasses["body-md"],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

List.displayName = "List";

export const ListItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, children, ...props }, ref) => {
  return (
    <li ref={ref} className={cn("leading-relaxed", className)} {...props}>
      {children}
    </li>
  );
});

ListItem.displayName = "ListItem";

// Blockquote component
export const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  React.HTMLAttributes<HTMLQuoteElement>
>(({ className, children, ...props }, ref) => {
  return (
    <blockquote
      ref={ref}
      className={cn(
        "border-l-4 border-primary-200 pl-6 italic",
        typographyClasses["body-lg"],
        "text-neutral-600 dark:text-neutral-300",
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  );
});

Blockquote.displayName = "Blockquote";

// Export default
export default Typography;
