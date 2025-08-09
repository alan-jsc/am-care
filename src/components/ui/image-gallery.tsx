import React, { useState } from "react";
import { ImageAsset } from "./image-asset";
import { cn } from "@/lib/utils";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  thumbnail?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  aspectRatio?: "square" | "video" | "portrait" | "landscape";
  showCaptions?: boolean;
  lightbox?: boolean;
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  columns = 3,
  gap = "md",
  aspectRatio = "square",
  showCaptions = false,
  lightbox = false,
  className,
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  const gapClasses = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  };

  const handleImageClick = (image: GalleryImage) => {
    if (lightbox) {
      setSelectedImage(image);
    }
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div
        className={cn(
          "grid",
          columnClasses[columns],
          gapClasses[gap],
          className
        )}
      >
        {images.map((image) => (
          <div key={image.id} className="group">
            <ImageAsset
              src={image.thumbnail || image.src}
              alt={image.alt}
              aspectRatio={aspectRatio}
              className={cn(
                "transition-transform duration-300",
                lightbox && "cursor-pointer hover:scale-105"
              )}
              onClick={() => handleImageClick(image)}
              overlay={lightbox}
              overlayContent={
                <div className="text-white text-center">
                  <svg
                    className="w-8 h-8 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                  <span className="text-sm">View Full Size</span>
                </div>
              }
            />
            {showCaptions && image.caption && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
                {image.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightbox && selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <ImageAsset
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] object-contain"
              objectFit="contain"
              showPlaceholder={true}
            />

            {selectedImage.caption && (
              <p className="mt-4 text-white text-center text-lg">
                {selectedImage.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export { ImageGallery };
export type { GalleryImage, ImageGalleryProps };
