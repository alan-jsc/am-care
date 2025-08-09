import React, { Suspense, lazy, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Lazy loading wrapper with loading state
interface LazyComponentProps {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  fallback?: React.ReactNode;
  className?: string;
}

const LazyComponent = ({
  component: Component,
  fallback,
  className,
}: LazyComponentProps) => {
  return (
    <Suspense fallback={fallback || <DefaultLoadingFallback />}>
      <Component />
    </Suspense>
  );
};

// Default loading fallback component
const DefaultLoadingFallback = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

// Image lazy loading component
interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage = React.forwardRef<HTMLImageElement, LazyImageProps>(
  ({ src, alt, className, placeholder, onLoad, onError, ...props }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
      setIsLoaded(true);
      onLoad?.();
    };

    const handleError = () => {
      setHasError(true);
      onError?.();
    };

    return (
      <div className={cn("relative overflow-hidden", className)}>
        {/* Placeholder */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse">
            {placeholder && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                {placeholder}
              </div>
            )}
          </div>
        )}

        {/* Error fallback */}
        {hasError && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-gray-400 text-sm">Image failed to load</div>
          </div>
        )}

        {/* Actual image */}
        <img
          ref={ref}
          src={src}
          alt={alt}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          {...props}
        />
      </div>
    );
  }
);

LazyImage.displayName = "LazyImage";

// Performance monitoring component
interface PerformanceMonitorProps {
  children: React.ReactNode;
  onMetrics?: (metrics: PerformanceMetrics) => void;
}

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
}

const PerformanceMonitor = ({
  children,
  onMetrics,
}: PerformanceMonitorProps) => {
  useEffect(() => {
    if (typeof window === "undefined" || !window.performance) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();

      entries.forEach((entry) => {
        if (
          entry.entryType === "paint" &&
          entry.name === "first-contentful-paint"
        ) {
          const metrics: PerformanceMetrics = {
            fcp: entry.startTime,
            lcp: 0,
            fid: 0,
            cls: 0,
          };

          // Measure LCP
          const lcpObserver = new PerformanceObserver((list) => {
            const lcpEntries = list.getEntries();
            const lastEntry = lcpEntries[lcpEntries.length - 1];
            if (lastEntry) {
              metrics.lcp = lastEntry.startTime;
              onMetrics?.(metrics);
            }
          });

          lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
        }
      });
    });

    observer.observe({ entryTypes: ["paint"] });

    return () => {
      observer.disconnect();
    };
  }, [onMetrics]);

  return <>{children}</>;
};

// Resource preloader
interface ResourcePreloaderProps {
  resources: Array<{
    href: string;
    as: "script" | "style" | "image" | "font";
    type?: string;
  }>;
}

const ResourcePreloader = ({ resources }: ResourcePreloaderProps) => {
  useEffect(() => {
    resources.forEach((resource) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = resource.href;
      link.as = resource.as;
      if (resource.type) {
        link.type = resource.type;
      }
      document.head.appendChild(link);
    });
  }, [resources]);

  return null;
};

// Critical CSS inliner
interface CriticalCSSProps {
  css: string;
}

const CriticalCSS = ({ css }: CriticalCSSProps) => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [css]);

  return null;
};

// Service worker registration
const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registered:", registration);
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  }
};

// Performance optimization hook
export const usePerformanceOptimization = () => {
  const [isOptimized, setIsOptimized] = useState(false);

  useEffect(() => {
    // Register service worker
    registerServiceWorker();

    // Preload critical resources
    const criticalResources = [
      { href: "/fonts/inter-var.woff2", as: "font", type: "font/woff2" },
      { href: "/images/hero-bg.webp", as: "image" },
    ];

    criticalResources.forEach((resource) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = resource.href;
      link.as = resource.as;
      if (resource.type) {
        link.type = resource.type;
      }
      document.head.appendChild(link);
    });

    setIsOptimized(true);
  }, []);

  return { isOptimized };
};

// Bundle analyzer component (for development)
interface BundleAnalyzerProps {
  children: React.ReactNode;
}

const BundleAnalyzer = ({ children }: BundleAnalyzerProps) => {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // Log bundle size information
      console.log("Bundle Analyzer: Component tree rendered");
    }
  }, []);

  return <>{children}</>;
};

export {
  LazyComponent,
  LazyImage,
  PerformanceMonitor,
  ResourcePreloader,
  CriticalCSS,
  BundleAnalyzer,
};
