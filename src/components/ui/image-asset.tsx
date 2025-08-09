import React, { forwardRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ResponsiveImageProps } from "@/types/image";
import { useImageLoader } from "@/hooks/use-image-loader";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import {
  getOptimizedImageUrl,
  generateBlurPlaceholder,
  DEFAULT_FALLBACK_IMAGES,
} from "@/lib/image-utils";

interface ImageAssetProps extends ResponsiveImageProps {
  aspectRatio?: "square" | "video" | "portrait" | "landscape" | number;
  showPlaceholder?: boolean;
  blurDataURL?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  overlay?: boolean;
  overlayContent?: React.ReactNode;
}

const ImageAsset = forwardRef<HTMLDivElement, ImageAssetProps>(
  (
    {
      src,
      alt,
      width,
      height,
      className,
      placeholder,
      fallbackSrc = DEFAULT_FALLBACK_IMAGES.healthcare,
      lazy = true,
      quality = 80,
      sizes,
      priority = false,
      aspectRatio,
      showPlaceholder = true,
      blurDataURL,
      objectFit = "cover",
      rounded = "md",
      shadow = "none",
      overlay = false,
      overlayContent,
      onLoad,
      onError,
      ...props
    },
    ref
  ) => {
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const { elementRef, hasIntersected } = useIntersectionObserver({
      triggerOnce: true,
      threshold: 0.1,
      rootMargin: "50px",
    });

    // Optimize image URL for WebP support
    const optimizedSrc = getOptimizedImageUrl(src, quality);

    // Use image loader hook
    const { isLoading, isLoaded, hasError, currentSrc, startLoading, retry } =
      useImageLoader(optimizedSrc, {
        fallbackSrc,
        lazy: lazy && !priority,
      });

    // Start loading when element is in view (for lazy loading)
    useEffect(() => {
      if (lazy && !priority && hasIntersected && !isLoaded) {
        startLoading();
      }
    }, [lazy, priority, hasIntersected, isLoaded, startLoading]);

    // Start loading immediately if not lazy or priority
    useEffect(() => {
      if (!lazy || priority) {
        startLoading();
      }
    }, [lazy, priority, startLoading]);

    // Generate blur placeholder if not provided
    const placeholderSrc =
      blurDataURL ||
      (showPlaceholder ? generateBlurPlaceholder(40, 30) : undefined);

    // Aspect ratio classes
    const aspectRatioClasses = {
      square: "aspect-square",
      video: "aspect-video",
      portrait: "aspect-[3/4]",
      landscape: "aspect-[4/3]",
    };

    // Rounded classes
    const roundedClasses = {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    };

    // Shadow classes
    const shadowClasses = {
      none: "",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
    };

    // Object fit classes
    const objectFitClasses = {
      cover: "object-cover",
      contain: "object-contain",
      fill: "object-fill",
      none: "object-none",
      "scale-down": "object-scale-down",
    };

    const containerClasses = cn(
      "relative overflow-hidden bg-gray-100 dark:bg-gray-800",
      typeof aspectRatio === "string" ? aspectRatioClasses[aspectRatio] : "",
      roundedClasses[rounded],
      shadowClasses[shadow],
      className
    );

    const imageClasses = cn(
      "w-full h-full transition-all duration-300",
      objectFitClasses[objectFit],
      isLoading ? "opacity-0" : "opacity-100",
      isLoaded && !hasError ? "scale-100" : "scale-105"
    );

    const placeholderClasses = cn(
      "absolute inset-0 w-full h-full transition-opacity duration-300",
      objectFitClasses[objectFit],
      isLoaded ? "opacity-0" : "opacity-100"
    );

    // Custom aspect ratio style
    const customAspectRatio =
      typeof aspectRatio === "number"
        ? { aspectRatio: aspectRatio.toString() }
        : {};

    return (
      <div
        ref={(node) => {
          elementRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={containerClasses}
        style={customAspectRatio}
        {...props}
      >
        {/* Blur placeholder */}
        {showPlaceholder && placeholderSrc && (
          <img
            src={placeholderSrc}
            alt=""
            className={placeholderClasses}
            aria-hidden="true"
          />
        )}

        {/* Loading skeleton */}
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse" />
        )}

        {/* Main image */}
        <img
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className={imageClasses}
          onLoad={() => {
            onLoad?.();
          }}
          onError={() => {
            onError?.();
          }}
          loading={lazy && !priority ? "lazy" : "eager"}
        />

        {/* Error state with retry button */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            <svg
              className="w-8 h-8 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-xs text-center mb-2">Image failed to load</p>
            <button
              onClick={retry}
              className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Overlay content */}
        {overlay && overlayContent && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            {overlayContent}
          </div>
        )}
      </div>
    );
  }
);

ImageAsset.displayName = "ImageAsset";

export { ImageAsset };
