import { useState, useEffect, useCallback } from "react";
import { ImageLoadState } from "@/types/image";
import {
  createImageRetryLoader,
  DEFAULT_FALLBACK_IMAGES,
} from "@/lib/image-utils";

interface UseImageLoaderOptions {
  fallbackSrc?: string;
  maxRetries?: number;
  retryDelay?: number;
  lazy?: boolean;
}

export const useImageLoader = (
  src: string,
  options: UseImageLoaderOptions = {}
) => {
  const {
    fallbackSrc = DEFAULT_FALLBACK_IMAGES.placeholder,
    maxRetries = 3,
    retryDelay = 1000,
    lazy = true,
  } = options;

  const [loadState, setLoadState] = useState<ImageLoadState>({
    isLoading: !lazy, // Start loading immediately if not lazy
    isLoaded: false,
    hasError: false,
    retryCount: 0,
  });

  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [shouldLoad, setShouldLoad] = useState(!lazy);

  const loadImage = useCallback(async () => {
    if (!src || loadState.isLoaded) return;

    setLoadState((prev) => ({
      ...prev,
      isLoading: true,
      hasError: false,
    }));

    try {
      await createImageRetryLoader(src, maxRetries, retryDelay);

      setLoadState((prev) => ({
        ...prev,
        isLoading: false,
        isLoaded: true,
        hasError: false,
      }));

      setCurrentSrc(src);
    } catch (error) {
      console.warn("Image failed to load, using fallback:", error);

      setLoadState((prev) => ({
        ...prev,
        isLoading: false,
        isLoaded: true, // Consider fallback as "loaded"
        hasError: true,
        retryCount: prev.retryCount + 1,
      }));

      setCurrentSrc(fallbackSrc);
    }
  }, [src, fallbackSrc, maxRetries, retryDelay, loadState.isLoaded]);

  const startLoading = useCallback(() => {
    setShouldLoad(true);
  }, []);

  const retry = useCallback(() => {
    setLoadState((prev) => ({
      ...prev,
      isLoading: false,
      isLoaded: false,
      hasError: false,
      retryCount: 0,
    }));
    setCurrentSrc(src);
    loadImage();
  }, [src, loadImage]);

  useEffect(() => {
    if (shouldLoad && src) {
      loadImage();
    }
  }, [shouldLoad, src, loadImage]);

  // Reset state when src changes
  useEffect(() => {
    setLoadState({
      isLoading: !lazy,
      isLoaded: false,
      hasError: false,
      retryCount: 0,
    });
    setCurrentSrc(src);
    setShouldLoad(!lazy);
  }, [src, lazy]);

  return {
    ...loadState,
    currentSrc,
    startLoading,
    retry,
  };
};
