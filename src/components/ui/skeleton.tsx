import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "shimmer" | "pulse";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "default", rounded = "md", ...props }, ref) => {
    const baseClasses = "bg-muted relative overflow-hidden";

    const variantClasses = {
      default: "animate-pulse",
      shimmer:
        "animate-pulse before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
      pulse: "animate-pulse-glow",
    };

    const roundedClasses = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          roundedClasses[rounded],
          className
        )}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

// Specialized skeleton components
const SkeletonText = forwardRef<
  HTMLDivElement,
  SkeletonProps & { lines?: number }
>(({ lines = 1, className, ...props }, ref) => {
  if (lines === 1) {
    return (
      <Skeleton ref={ref} className={cn("h-4 w-full", className)} {...props} />
    );
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          ref={i === 0 ? ref : undefined}
          className={cn("h-4", i === lines - 1 ? "w-3/4" : "w-full", className)}
          {...props}
        />
      ))}
    </div>
  );
});

SkeletonText.displayName = "SkeletonText";

const SkeletonCard = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-4 p-4", className)}>
      <Skeleton className="h-48 w-full" {...props} />
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" {...props} />
        <SkeletonText lines={2} {...props} />
      </div>
      <div className="flex space-x-2">
        <Skeleton className="h-8 w-20" {...props} />
        <Skeleton className="h-8 w-16" {...props} />
      </div>
    </div>
  )
);

SkeletonCard.displayName = "SkeletonCard";

const SkeletonAvatar = forwardRef<
  HTMLDivElement,
  SkeletonProps & { size?: "sm" | "md" | "lg" }
>(({ size = "md", className, ...props }, ref) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <Skeleton
      ref={ref}
      rounded="full"
      className={cn(sizeClasses[size], className)}
      {...props}
    />
  );
});

SkeletonAvatar.displayName = "SkeletonAvatar";

const SkeletonButton = forwardRef<
  HTMLDivElement,
  SkeletonProps & { size?: "sm" | "md" | "lg" }
>(({ size = "md", className, ...props }, ref) => {
  const sizeClasses = {
    sm: "h-8 w-16",
    md: "h-10 w-20",
    lg: "h-12 w-24",
  };

  return (
    <Skeleton
      ref={ref}
      className={cn(sizeClasses[size], className)}
      {...props}
    />
  );
});

SkeletonButton.displayName = "SkeletonButton";

export { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar, SkeletonButton };
