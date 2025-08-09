export interface ImageAsset {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  format?: "webp" | "jpg" | "png" | "avif";
  placeholder?: string; // Base64 blur placeholder
  sizes?: {
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
  };
}

export interface ImageLoadState {
  isLoading: boolean;
  isLoaded: boolean;
  hasError: boolean;
  retryCount: number;
}

export interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  fallbackSrc?: string;
  lazy?: boolean;
  quality?: number;
  sizes?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}
