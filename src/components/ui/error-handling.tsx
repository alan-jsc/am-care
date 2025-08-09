import React, { Component, ReactNode, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  RefreshCw,
  Wifi,
  WifiOff,
  Image as ImageIcon,
} from "lucide-react";

// Error boundary component
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
    this.props.onError?.(error, errorInfo);

    // Log error for monitoring
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onRetry={() =>
            this.setState({
              hasError: false,
              error: undefined,
              errorInfo: undefined,
            })
          }
        />
      );
    }

    return this.props.children;
  }
}

// Default error fallback component
interface ErrorFallbackProps {
  error?: Error;
  errorInfo?: React.ErrorInfo;
  onRetry?: () => void;
  className?: string;
}

const ErrorFallback = React.forwardRef<HTMLDivElement, ErrorFallbackProps>(
  ({ error, errorInfo, onRetry, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center p-8 text-center",
          "bg-red-50 border border-red-200 rounded-lg",
          className
        )}
        {...props}
      >
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-red-800 mb-2">
          Đã xảy ra lỗi
        </h2>
        <p className="text-red-600 mb-4 max-w-md">
          Rất tiếc, đã xảy ra lỗi không mong muốn. Vui lòng thử lại hoặc liên hệ
          hỗ trợ nếu vấn đề vẫn tiếp tục.
        </p>

        {process.env.NODE_ENV === "development" && error && (
          <details className="text-left w-full max-w-md mb-4">
            <summary className="cursor-pointer text-sm text-red-600 font-medium">
              Chi tiết lỗi (Chỉ hiển thị trong môi trường phát triển)
            </summary>
            <pre className="mt-2 text-xs text-red-700 bg-red-100 p-2 rounded overflow-auto">
              {error.toString()}
              {errorInfo?.componentStack}
            </pre>
          </details>
        )}

        <div className="flex gap-3">
          <Button onClick={onRetry} className="bg-red-600 hover:bg-red-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Thử lại
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Tải lại trang
          </Button>
        </div>
      </div>
    );
  }
);

ErrorFallback.displayName = "ErrorFallback";

// Network status component
interface NetworkStatusProps {
  children: ReactNode;
  fallback?: ReactNode;
}

const NetworkStatus = ({ children, fallback }: NetworkStatusProps) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    if (fallback) return <>{fallback}</>;

    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-yellow-50 border border-yellow-200 rounded-lg">
        <WifiOff className="h-12 w-12 text-yellow-500 mb-4" />
        <h2 className="text-xl font-semibold text-yellow-800 mb-2">
          Không có kết nối mạng
        </h2>
        <p className="text-yellow-600 mb-4">
          Vui lòng kiểm tra kết nối internet của bạn và thử lại.
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="bg-yellow-600 hover:bg-yellow-700"
        >
          <Wifi className="h-4 w-4 mr-2" />
          Thử lại
        </Button>
      </div>
    );
  }

  return <>{children}</>;
};

// Image error fallback component
interface ImageErrorFallbackProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  onError?: () => void;
}

const ImageErrorFallback = React.forwardRef<
  HTMLImageElement,
  ImageErrorFallbackProps
>(({ src, alt, fallbackSrc, className, onError, ...props }, ref) => {
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleError = () => {
    if (!hasError && fallbackSrc) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
      onError?.();
    }
  };

  if (hasError && !fallbackSrc) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center bg-gray-100 rounded-lg",
          "text-gray-500 border-2 border-dashed border-gray-300",
          className
        )}
        {...props}
      >
        <ImageIcon className="h-8 w-8 mb-2" />
        <span className="text-sm">Không thể tải hình ảnh</span>
      </div>
    );
  }

  return (
    <img
      ref={ref}
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
});

ImageErrorFallback.displayName = "ImageErrorFallback";

// Retry mechanism hook
interface RetryConfig {
  maxAttempts: number;
  delay: number;
  backoffMultiplier: number;
}

export const useRetry = (
  config: RetryConfig = { maxAttempts: 3, delay: 1000, backoffMultiplier: 2 }
) => {
  const [attempts, setAttempts] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  const retry = async (operation: () => Promise<any>) => {
    setIsRetrying(true);

    for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
      try {
        setAttempts(attempt);
        const result = await operation();
        setIsRetrying(false);
        return result;
      } catch (error) {
        if (attempt === config.maxAttempts) {
          setIsRetrying(false);
          throw error;
        }

        // Wait before next attempt with exponential backoff
        const delay =
          config.delay * Math.pow(config.backoffMultiplier, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  };

  const reset = () => {
    setAttempts(0);
    setIsRetrying(false);
  };

  return { retry, attempts, isRetrying, reset };
};

// Async operation wrapper with error handling
interface AsyncOperationProps {
  operation: () => Promise<any>;
  children: (result: any, isLoading: boolean, error: Error | null) => ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error) => void;
}

const AsyncOperation = ({
  operation,
  children,
  fallback,
  onError,
}: AsyncOperationProps) => {
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { retry, attempts, isRetrying } = useRetry();

  const executeOperation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await retry(operation);
      setResult(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    executeOperation();
  }, []);

  if (error && fallback) {
    return <>{fallback}</>;
  }

  return <>{children(result, isLoading || isRetrying, error)}</>;
};

// Error logging utility
export const errorLogger = {
  log: (error: Error, context?: Record<string, any>) => {
    console.error("Application Error:", {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      context,
    });

    // In production, you would send this to an error monitoring service
    if (process.env.NODE_ENV === "production") {
      // Example: Sentry.captureException(error, { extra: context });
    }
  },

  logAsync: async (error: Error, context?: Record<string, any>) => {
    errorLogger.log(error, context);

    // Simulate sending to monitoring service
    try {
      await fetch("/api/error-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: error.message, context }),
      });
    } catch (e) {
      console.error("Failed to send error log:", e);
    }
  },
};

export {
  ErrorBoundary,
  ErrorFallback,
  NetworkStatus,
  ImageErrorFallback,
  AsyncOperation,
};
