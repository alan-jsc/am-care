/**
 * Image utilities for enhanced image management
 */

// Check if browser supports WebP format
export const supportsWebP = (): boolean => {
  if (typeof window === "undefined") return false;

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;

  return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
};

// Generate a blur placeholder from image dimensions
export const generateBlurPlaceholder = (
  width: number = 40,
  height: number = 40
): string => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;

  if (!ctx) return "";

  // Create a simple gradient placeholder
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#f3f4f6");
  gradient.addColorStop(0.5, "#e5e7eb");
  gradient.addColorStop(1, "#d1d5db");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL("image/jpeg", 0.1);
};

// Convert image URL to WebP if supported
export const getOptimizedImageUrl = (
  url: string,
  quality: number = 80
): string => {
  if (!url) return "";

  // If it's already a WebP or external URL, return as is
  if (url.includes(".webp") || url.startsWith("http")) {
    return url;
  }

  // For local images, we'll assume they exist in both formats
  // In a real implementation, you'd check if WebP version exists
  const webpSupported = supportsWebP();

  if (webpSupported && !url.includes(".webp")) {
    // Replace extension with .webp
    const webpUrl = url.replace(/\.(jpg|jpeg|png)$/i, ".webp");
    return webpUrl;
  }

  return url;
};

// Generate responsive image sizes
export const generateResponsiveSizes = (
  baseUrl: string
): {
  thumbnail: string;
  small: string;
  medium: string;
  large: string;
} => {
  const getResizedUrl = (url: string, size: string) => {
    // In a real implementation, you'd use a service like Cloudinary or similar
    // For now, we'll return the original URL with size hints
    return url.replace(/\.(jpg|jpeg|png|webp)$/i, `_${size}.$1`);
  };

  return {
    thumbnail: getResizedUrl(baseUrl, "150w"),
    small: getResizedUrl(baseUrl, "400w"),
    medium: getResizedUrl(baseUrl, "800w"),
    large: getResizedUrl(baseUrl, "1200w"),
  };
};

// Get appropriate image size based on container width
export const getAppropriateImageSize = (
  containerWidth: number,
  sizes: { thumbnail: string; small: string; medium: string; large: string }
): string => {
  if (containerWidth <= 150) return sizes.thumbnail;
  if (containerWidth <= 400) return sizes.small;
  if (containerWidth <= 800) return sizes.medium;
  return sizes.large;
};

// Default fallback images for different contexts
export const DEFAULT_FALLBACK_IMAGES = {
  healthcare: "/images/Healthcare.jpg",
  community: "/images/Community.jpg",
  placeholder:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwTDE3NSAxMjVIMjI1TDIwMCAxNTBaIiBmaWxsPSIjOUI5QkEwIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwTDE3NSAxNzVIMjI1TDIwMCAxNTBaIiBmaWxsPSIjOUI5QkEwIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5QkEwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pgo8L3N2Zz4K",
};

// Retry mechanism for failed image loads
export const createImageRetryLoader = (
  src: string,
  maxRetries: number = 3,
  retryDelay: number = 1000
): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    let retryCount = 0;

    const attemptLoad = () => {
      const img = new Image();

      img.onload = () => resolve(img);

      img.onerror = () => {
        retryCount++;
        if (retryCount < maxRetries) {
          setTimeout(attemptLoad, retryDelay * retryCount);
        } else {
          reject(
            new Error(
              `Failed to load image after ${maxRetries} attempts: ${src}`
            )
          );
        }
      };

      img.src = src;
    };

    attemptLoad();
  });
};
