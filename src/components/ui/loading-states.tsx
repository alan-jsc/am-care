import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonAvatar,
} from "./skeleton";

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "dots" | "pulse";
}

const LoadingSpinner = forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size = "md", variant = "default", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
    };

    if (variant === "dots") {
      return (
        <div ref={ref} className={cn("flex space-x-1", className)} {...props}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "rounded-full bg-primary animate-pulse",
                size === "sm"
                  ? "h-2 w-2"
                  : size === "md"
                  ? "h-3 w-3"
                  : "h-4 w-4"
              )}
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1.4s",
              }}
            />
          ))}
        </div>
      );
    }

    if (variant === "pulse") {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-full bg-primary animate-pulse-glow",
            sizeClasses[size],
            className
          )}
          {...props}
        />
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "animate-spin rounded-full border-2 border-muted border-t-primary",
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

LoadingSpinner.displayName = "LoadingSpinner";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: "default" | "gradient" | "striped";
  size?: "sm" | "md" | "lg";
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      variant = "default",
      size = "md",
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const sizeClasses = {
      sm: "h-1",
      md: "h-2",
      lg: "h-3",
    };

    const variantClasses = {
      default: "bg-primary",
      gradient: "bg-gradient-to-r from-primary to-secondary",
      striped:
        "bg-primary bg-[length:1rem_1rem] bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)]",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full bg-muted rounded-full overflow-hidden",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "h-full transition-all duration-300 ease-out",
            variantClasses[variant],
            variant === "striped" && "animate-pulse"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  }
);

ProgressBar.displayName = "ProgressBar";

interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  spinner?: boolean;
  text?: string;
  backdrop?: "light" | "dark" | "blur";
}

const LoadingOverlay = forwardRef<HTMLDivElement, LoadingOverlayProps>(
  (
    {
      className,
      isLoading,
      spinner = true,
      text,
      backdrop = "light",
      children,
      ...props
    },
    ref
  ) => {
    if (!isLoading) {
      return <>{children}</>;
    }

    const backdropClasses = {
      light: "bg-background/80",
      dark: "bg-background/90",
      blur: "bg-background/60 backdrop-blur-sm",
    };

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        {children}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center z-50",
            backdropClasses[backdrop]
          )}
        >
          <div className="flex flex-col items-center space-y-2">
            {spinner && <LoadingSpinner size="lg" />}
            {text && (
              <p className="text-sm text-muted-foreground animate-pulse">
                {text}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

LoadingOverlay.displayName = "LoadingOverlay";

// Specialized loading components for different content types
const ServiceCardSkeleton = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("border rounded-lg p-6 space-y-4", className)}
    {...props}
  >
    <Skeleton className="h-48 w-full" variant="shimmer" />
    <div className="space-y-2">
      <Skeleton className="h-6 w-3/4" />
      <SkeletonText lines={3} />
    </div>
    <div className="flex items-center space-x-2">
      <Skeleton className="h-4 w-4" rounded="full" />
      <Skeleton className="h-4 w-20" />
    </div>
    <div className="flex space-x-2">
      <Skeleton className="h-10 w-24" />
      <Skeleton className="h-10 w-20" />
    </div>
  </div>
));

ServiceCardSkeleton.displayName = "ServiceCardSkeleton";

const TestimonialSkeleton = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 space-y-4", className)} {...props}>
    <SkeletonText lines={3} />
    <div className="flex items-center space-x-3">
      <SkeletonAvatar size="md" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
    <div className="flex space-x-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-4" />
      ))}
    </div>
  </div>
));

TestimonialSkeleton.displayName = "TestimonialSkeleton";

const ContactFormSkeleton = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-4", className)} {...props}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-12" />
      <Skeleton className="h-10 w-full" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-24 w-full" />
    </div>
    <Skeleton className="h-10 w-32" />
  </div>
));

ContactFormSkeleton.displayName = "ContactFormSkeleton";

const HeroSkeleton = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-6 text-center py-20", className)}
    {...props}
  >
    <div className="space-y-4">
      <Skeleton className="h-12 w-3/4 mx-auto" />
      <Skeleton className="h-8 w-1/2 mx-auto" />
    </div>
    <SkeletonText lines={2} className="max-w-2xl mx-auto" />
    <div className="flex justify-center space-x-4">
      <Skeleton className="h-12 w-32" />
      <Skeleton className="h-12 w-28" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="text-center space-y-2">
          <Skeleton className="h-8 w-16 mx-auto" />
          <Skeleton className="h-4 w-24 mx-auto" />
        </div>
      ))}
    </div>
  </div>
));

HeroSkeleton.displayName = "HeroSkeleton";

export {
  LoadingSpinner,
  ProgressBar,
  LoadingOverlay,
  ServiceCardSkeleton,
  TestimonialSkeleton,
  ContactFormSkeleton,
  HeroSkeleton,
};
