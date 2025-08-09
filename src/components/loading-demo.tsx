import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonAvatar,
  SkeletonButton,
  LoadingSpinner,
  ProgressBar,
  LoadingOverlay,
  ServiceCardSkeleton,
  TestimonialSkeleton,
  ContactFormSkeleton,
  HeroSkeleton,
  PageTransition,
  ProgressiveLoading,
} from "@/components/ui";
import {
  useLoadingState,
  useProgressiveLoading,
} from "@/hooks/use-loading-state";

export function LoadingDemo() {
  const [overlayLoading, setOverlayLoading] = useState(false);
  const [pageTransitionLoading, setPageTransitionLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const loadingState = useLoadingState({
    onSuccess: (data) => console.log("Success:", data),
    onError: (error) => console.error("Error:", error),
  });

  const progressiveLoading = useProgressiveLoading([
    { name: "Initializing", description: "Setting up the application..." },
    { name: "Loading Data", description: "Fetching content from server..." },
    { name: "Processing", description: "Processing and validating data..." },
    { name: "Finalizing", description: "Completing setup..." },
  ]);

  const simulateAsyncOperation = async () => {
    await loadingState.execute(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return { message: "Operation completed successfully!" };
    });
  };

  const simulateProgressiveLoading = () => {
    progressiveLoading.startLoading();

    const stages = [0, 1, 2, 3];
    stages.forEach((stage, index) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          // 90% success rate
          progressiveLoading.completeStage(stage);
        } else {
          progressiveLoading.failStage(new Error("Failed to complete stage"));
        }
      }, (index + 1) * 1000);
    });
  };

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const simulateOverlay = () => {
    setOverlayLoading(true);
    setTimeout(() => setOverlayLoading(false), 3000);
  };

  const simulatePageTransition = () => {
    setPageTransitionLoading(true);
    setTimeout(() => setPageTransitionLoading(false), 2000);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Loading States Demo</h1>
        <p className="text-muted-foreground">
          Comprehensive showcase of loading components and skeleton states
        </p>
      </div>

      <Tabs defaultValue="skeletons" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="skeletons">Skeletons</TabsTrigger>
          <TabsTrigger value="spinners">Spinners</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="overlays">Overlays</TabsTrigger>
          <TabsTrigger value="transitions">Transitions</TabsTrigger>
        </TabsList>

        <TabsContent value="skeletons" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Skeletons</CardTitle>
                <CardDescription>Simple skeleton components</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-8 w-1/2" />
                <div className="flex items-center space-x-2">
                  <SkeletonAvatar size="sm" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shimmer Effects</CardTitle>
                <CardDescription>
                  Skeletons with shimmer animation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" variant="shimmer" />
                <Skeleton className="h-4 w-3/4" variant="shimmer" />
                <Skeleton className="h-8 w-1/2" variant="shimmer" />
                <SkeletonAvatar size="md" variant="shimmer" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Text Skeletons</CardTitle>
                <CardDescription>Multi-line text placeholders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <SkeletonText lines={1} />
                <SkeletonText lines={3} />
                <SkeletonText lines={2} variant="shimmer" />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Card Skeleton</CardTitle>
                <CardDescription>
                  Loading state for service cards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ServiceCardSkeleton />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Testimonial Skeleton</CardTitle>
                <CardDescription>
                  Loading state for testimonials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TestimonialSkeleton />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Hero Section Skeleton</CardTitle>
              <CardDescription>Loading state for hero sections</CardDescription>
            </CardHeader>
            <CardContent>
              <HeroSkeleton />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Form Skeleton</CardTitle>
              <CardDescription>Loading state for contact forms</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactFormSkeleton />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="spinners" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Default Spinner</CardTitle>
                <CardDescription>Classic spinning loader</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center h-32">
                <LoadingSpinner size="lg" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dots Spinner</CardTitle>
                <CardDescription>Animated dots loader</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center h-32">
                <LoadingSpinner variant="dots" size="lg" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pulse Spinner</CardTitle>
                <CardDescription>Pulsing glow effect</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center h-32">
                <LoadingSpinner variant="pulse" size="lg" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Async Operation</CardTitle>
              <CardDescription>
                Loading state with async operation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={simulateAsyncOperation}
                disabled={loadingState.isLoading}
              >
                {loadingState.isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Loading...
                  </>
                ) : (
                  "Start Operation"
                )}
              </Button>
              {loadingState.error && (
                <p className="text-destructive text-sm">
                  {loadingState.error.message}
                </p>
              )}
              {loadingState.data && (
                <p className="text-success text-sm">
                  {loadingState.data.message}
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Progress Bars</CardTitle>
                <CardDescription>Different progress bar styles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Default</label>
                  <ProgressBar value={progress} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Gradient</label>
                  <ProgressBar value={progress} variant="gradient" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Striped</label>
                  <ProgressBar value={progress} variant="striped" />
                </div>
                <Button onClick={simulateProgress}>Simulate Progress</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progressive Loading</CardTitle>
                <CardDescription>Multi-stage loading process</CardDescription>
              </CardHeader>
              <CardContent>
                {progressiveLoading.isLoading ? (
                  <ProgressiveLoading
                    stages={[
                      {
                        name: "Initializing",
                        description: "Setting up the application...",
                      },
                      {
                        name: "Loading Data",
                        description: "Fetching content from server...",
                      },
                      {
                        name: "Processing",
                        description: "Processing and validating data...",
                      },
                      {
                        name: "Finalizing",
                        description: "Completing setup...",
                      },
                    ]}
                    currentStage={progressiveLoading.currentStage}
                    progress={progressiveLoading.progress}
                    error={progressiveLoading.error}
                  />
                ) : (
                  <div className="text-center py-8">
                    <Button onClick={simulateProgressiveLoading}>
                      Start Progressive Loading
                    </Button>
                    {progressiveLoading.error && (
                      <p className="text-destructive text-sm mt-2">
                        {progressiveLoading.error.message}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="overlays" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Loading Overlay</CardTitle>
              <CardDescription>Overlay loading states</CardDescription>
            </CardHeader>
            <CardContent>
              <LoadingOverlay
                isLoading={overlayLoading}
                text="Processing your request..."
                backdrop="blur"
              >
                <div className="p-8 bg-muted/50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Sample Content</h3>
                  <p className="text-muted-foreground mb-4">
                    This content will be overlaid with a loading state when the
                    button is clicked.
                  </p>
                  <Button onClick={simulateOverlay} disabled={overlayLoading}>
                    Show Loading Overlay
                  </Button>
                </div>
              </LoadingOverlay>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transitions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Page Transitions</CardTitle>
              <CardDescription>Smooth page loading transitions</CardDescription>
            </CardHeader>
            <CardContent>
              <PageTransition
                isLoading={pageTransitionLoading}
                variant="fade"
                loadingText="Loading page content..."
              >
                <div className="p-8 bg-muted/50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Page Content</h3>
                  <p className="text-muted-foreground mb-4">
                    This content will fade out and show a loading state during
                    transitions.
                  </p>
                  <Button
                    onClick={simulatePageTransition}
                    disabled={pageTransitionLoading}
                  >
                    Simulate Page Transition
                  </Button>
                </div>
              </PageTransition>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
