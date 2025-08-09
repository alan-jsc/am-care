import { cn } from "@/lib/utils";
import { forwardRef, useEffect, useState } from "react";
import { LoadingSpinner, ProgressBar } from "./loading-states";

interface PageTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  progress?: number;
  variant?: "fade" | "slide" | "scale";
  showProgress?: boolean;
  loadingText?: string;
}

const PageTransition = forwardRef<HTMLDivElement, PageTransitionProps>(
  (
    {
      className,
      isLoading,
      progress,
      variant = "fade",
      showProgress = false,
      loadingText = "Loading...",
      children,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(!isLoading);
    const [showLoader, setShowLoader] = useState(isLoading);

    useEffect(() => {
      if (isLoading) {
        setShowLoader(true);
        setIsVisible(false);
      } else {
        // Delay hiding loader to allow for smooth transition
        const timer = setTimeout(() => {
          setShowLoader(false);
          setIsVisible(true);
        }, 150);
        return () => clearTimeout(timer);
      }
    }, [isLoading]);

    const variantClasses = {
      fade: {
        enter: "opacity-0",
        enterActive: "opacity-100 transition-opacity duration-300 ease-out",
        exit: "opacity-100",
        exitActive: "opacity-0 transition-opacity duration-150 ease-in",
      },
      slide: {
        enter: "translate-y-4 opacity-0",
        enterActive:
          "translate-y-0 opacity-100 transition-all duration-300 ease-out",
        exit: "translate-y-0 opacity-100",
        exitActive:
          "translate-y-4 opacity-0 transition-all duration-150 ease-in",
      },
      scale: {
        enter: "scale-95 opacity-0",
        enterActive:
          "scale-100 opacity-100 transition-all duration-300 ease-out",
        exit: "scale-100 opacity-100",
        exitActive: "scale-95 opacity-0 transition-all duration-150 ease-in",
      },
    };

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        {/* Loading overlay */}
        {showLoader && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-4 p-8">
              <LoadingSpinner size="lg" />
              <p className="text-sm text-muted-foreground animate-pulse">
                {loadingText}
              </p>
              {showProgress && typeof progress === "number" && (
                <div className="w-64">
                  <ProgressBar value={progress} variant="gradient" />
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    {Math.round(progress)}%
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div
          className={cn(
            isVisible
              ? `${variantClasses[variant].enter} ${variantClasses[variant].enterActive}`
              : `${variantClasses[variant].exit} ${variantClasses[variant].exitActive}`
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);

PageTransition.displayName = "PageTransition";

// Route-based page transition wrapper
interface RouteTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  pathname: string;
  variant?: "fade" | "slide" | "scale";
}

const RouteTransition = forwardRef<HTMLDivElement, RouteTransitionProps>(
  ({ className, pathname, variant = "fade", children, ...props }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentPath, setCurrentPath] = useState(pathname);

    useEffect(() => {
      if (pathname !== currentPath) {
        setIsLoading(true);

        // Simulate loading time for smooth transition
        const timer = setTimeout(() => {
          setCurrentPath(pathname);
          setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
      }
    }, [pathname, currentPath]);

    return (
      <PageTransition
        ref={ref}
        className={className}
        isLoading={isLoading}
        variant={variant}
        {...props}
      >
        {children}
      </PageTransition>
    );
  }
);

RouteTransition.displayName = "RouteTransition";

// Progressive loading component for multi-stage operations
interface ProgressiveLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  stages: { name: string; description?: string }[];
  currentStage: number;
  progress: number;
  error?: Error | null;
}

const ProgressiveLoading = forwardRef<HTMLDivElement, ProgressiveLoadingProps>(
  ({ className, stages, currentStage, progress, error, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-6 p-8", className)} {...props}>
        <div className="text-center space-y-2">
          <LoadingSpinner size="lg" />
          <h3 className="text-lg font-semibold">
            {error
              ? "Loading Failed"
              : stages[currentStage]?.name || "Loading..."}
          </h3>
          {stages[currentStage]?.description && !error && (
            <p className="text-sm text-muted-foreground">
              {stages[currentStage].description}
            </p>
          )}
          {error && <p className="text-sm text-destructive">{error.message}</p>}
        </div>

        <div className="space-y-2">
          <ProgressBar
            value={progress}
            variant={error ? "default" : "gradient"}
            className={error ? "opacity-50" : ""}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              Step {currentStage + 1} of {stages.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        <div className="space-y-2">
          {stages.map((stage, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center space-x-2 text-sm",
                index < currentStage && "text-success",
                index === currentStage && "text-primary",
                index > currentStage && "text-muted-foreground"
              )}
            >
              <div
                className={cn(
                  "h-2 w-2 rounded-full",
                  index < currentStage && "bg-success",
                  index === currentStage && "bg-primary animate-pulse",
                  index > currentStage && "bg-muted"
                )}
              />
              <span>{stage.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

ProgressiveLoading.displayName = "ProgressiveLoading";

export { PageTransition, RouteTransition, ProgressiveLoading };
