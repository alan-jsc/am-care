import React, { forwardRef } from "react";
import { ImageAsset } from "./image-asset";
import { ResponsiveImageProps as BaseResponsiveImageProps } from "@/types/image";
import { generateResponsiveSizes } from "@/lib/image-utils";

interface ResponsiveImageConfig {
  breakpoints: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  defaultSizes: string;
}

const defaultConfig: ResponsiveImageConfig = {
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  defaultSizes:
    "(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",
};

interface ResponsiveImageProps extends BaseResponsiveImageProps {
  config?: Partial<ResponsiveImageConfig>;
  aspectRatio?: "square" | "video" | "portrait" | "landscape" | number;
  breakpointSizes?: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
}

const ResponsiveImage = forwardRef<HTMLDivElement, ResponsiveImageProps>(
  (
    { src, alt, config = {}, breakpointSizes, sizes: customSizes, ...props },
    ref
  ) => {
    const mergedConfig = { ...defaultConfig, ...config };

    // Generate responsive image URLs
    const responsiveSizes = generateResponsiveSizes(src);

    // Build sizes attribute for responsive images
    const buildSizesAttribute = (): string => {
      if (customSizes) return customSizes;

      if (breakpointSizes) {
        const sizeQueries = [];

        if (breakpointSizes.sm) {
          sizeQueries.push(
            `(max-width: ${mergedConfig.breakpoints.sm}px) ${breakpointSizes.sm}`
          );
        }
        if (breakpointSizes.md) {
          sizeQueries.push(
            `(max-width: ${mergedConfig.breakpoints.md}px) ${breakpointSizes.md}`
          );
        }
        if (breakpointSizes.lg) {
          sizeQueries.push(
            `(max-width: ${mergedConfig.breakpoints.lg}px) ${breakpointSizes.lg}`
          );
        }
        if (breakpointSizes.xl) {
          sizeQueries.push(
            `(max-width: ${mergedConfig.breakpoints.xl}px) ${breakpointSizes.xl}`
          );
        }

        // Add default size
        sizeQueries.push("100vw");

        return sizeQueries.join(", ");
      }

      return mergedConfig.defaultSizes;
    };

    // Build srcSet for different screen densities
    const buildSrcSet = (): string => {
      const srcSetEntries = [
        `${responsiveSizes.small} 400w`,
        `${responsiveSizes.medium} 800w`,
        `${responsiveSizes.large} 1200w`,
      ];

      return srcSetEntries.join(", ");
    };

    return (
      <ImageAsset
        ref={ref}
        src={src}
        alt={alt}
        sizes={buildSizesAttribute()}
        {...props}
      />
    );
  }
);

ResponsiveImage.displayName = "ResponsiveImage";

export { ResponsiveImage };
export type { ResponsiveImageConfig };
