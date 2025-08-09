import React from "react";
import { ImageAsset } from "./ui/image-asset";
import { ResponsiveImage } from "./ui/responsive-image";
import { ImageGallery, GalleryImage } from "./ui/image-gallery";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";

const ImageManagementDemo: React.FC = () => {
  // Sample gallery images
  const galleryImages: GalleryImage[] = [
    {
      id: "1",
      src: "/images/Healthcare.jpg",
      alt: "Healthcare Services",
      caption: "Professional healthcare services with modern equipment",
    },
    {
      id: "2",
      src: "/images/Community.jpg",
      alt: "Community Care",
      caption: "Community-focused care and support programs",
    },
    {
      id: "3",
      src: "/images/Healthcare.jpg",
      alt: "Medical Team",
      caption: "Experienced medical professionals",
    },
    {
      id: "4",
      src: "/images/Community.jpg",
      alt: "Patient Care",
      caption: "Personalized patient care approach",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Enhanced Image Management System
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Demonstrating lazy loading, WebP support, blur placeholders, fallback
          handling, and responsive image sizing across multiple breakpoints.
        </p>
      </div>

      {/* Basic Image Asset Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Basic Image Assets
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Standard Image
                <Badge variant="secondary">Lazy Loading</Badge>
              </CardTitle>
              <CardDescription>
                Basic image with lazy loading and blur placeholder
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImageAsset
                src="/images/Healthcare.jpg"
                alt="Healthcare Services"
                aspectRatio="video"
                className="w-full"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Priority Image
                <Badge variant="default">No Lazy</Badge>
              </CardTitle>
              <CardDescription>
                Priority image that loads immediately
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImageAsset
                src="/images/Community.jpg"
                alt="Community Care"
                aspectRatio="video"
                priority={true}
                className="w-full"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Error Handling
                <Badge variant="destructive">Fallback</Badge>
              </CardTitle>
              <CardDescription>
                Image with broken URL showing fallback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImageAsset
                src="/images/nonexistent.jpg"
                alt="Broken Image"
                aspectRatio="video"
                className="w-full"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Aspect Ratio Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Aspect Ratio Variations
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Square
            </h3>
            <ImageAsset
              src="/images/Healthcare.jpg"
              alt="Square aspect ratio"
              aspectRatio="square"
              rounded="lg"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Video (16:9)
            </h3>
            <ImageAsset
              src="/images/Community.jpg"
              alt="Video aspect ratio"
              aspectRatio="video"
              rounded="lg"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Portrait (3:4)
            </h3>
            <ImageAsset
              src="/images/Healthcare.jpg"
              alt="Portrait aspect ratio"
              aspectRatio="portrait"
              rounded="lg"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Landscape (4:3)
            </h3>
            <ImageAsset
              src="/images/Community.jpg"
              alt="Landscape aspect ratio"
              aspectRatio="landscape"
              rounded="lg"
            />
          </div>
        </div>
      </section>

      {/* Responsive Image Example */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Responsive Images
        </h2>

        <Card>
          <CardHeader>
            <CardTitle>Multi-Breakpoint Responsive Image</CardTitle>
            <CardDescription>
              This image adapts to different screen sizes with optimized loading
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveImage
              src="/images/Healthcare.jpg"
              alt="Responsive healthcare image"
              aspectRatio="video"
              breakpointSizes={{
                sm: "100vw",
                md: "50vw",
                lg: "33vw",
                xl: "25vw",
              }}
              className="w-full"
            />
          </CardContent>
        </Card>
      </section>

      {/* Image Gallery */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Image Gallery with Lightbox
        </h2>

        <Card>
          <CardHeader>
            <CardTitle>Interactive Gallery</CardTitle>
            <CardDescription>
              Click on any image to view it in full size with lightbox
              functionality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageGallery
              images={galleryImages}
              columns={2}
              gap="md"
              aspectRatio="video"
              showCaptions={true}
              lightbox={true}
            />
          </CardContent>
        </Card>
      </section>

      {/* Styling Variations */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Styling Variations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Rounded & Shadow</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageAsset
                src="/images/Healthcare.jpg"
                alt="Rounded with shadow"
                aspectRatio="square"
                rounded="xl"
                shadow="lg"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Circular</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ImageAsset
                src="/images/Community.jpg"
                alt="Circular image"
                aspectRatio="square"
                rounded="full"
                shadow="md"
                className="w-32 h-32"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>With Overlay</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageAsset
                src="/images/Healthcare.jpg"
                alt="Image with overlay"
                aspectRatio="square"
                rounded="lg"
                overlay={true}
                overlayContent={
                  <div className="text-white text-center">
                    <h3 className="text-lg font-semibold mb-2">Healthcare</h3>
                    <p className="text-sm">Professional medical services</p>
                  </div>
                }
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Performance Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Performance Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Feature Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    ✓
                  </Badge>
                  Lazy loading with Intersection Observer
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    ✓
                  </Badge>
                  WebP format support with fallbacks
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    ✓
                  </Badge>
                  Blur placeholder for smooth loading
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    ✓
                  </Badge>
                  Automatic retry on load failure
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    ✓
                  </Badge>
                  Responsive sizing with breakpoints
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    ✓
                  </Badge>
                  Accessibility compliant
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Loading States</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse rounded-lg" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Shimmer loading effect while images load
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export { ImageManagementDemo };
