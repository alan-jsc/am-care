import React from "react";
import {
  FadeIn,
  SlideUp,
  SlideDown,
  SlideLeft,
  SlideRight,
  ScaleIn,
  StaggeredContainer,
  HoverAnimated,
} from "./ui/animated";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

/**
 * Demo component showcasing the animation framework
 */
export function AnimationDemo() {
  const demoItems = [
    { title: "Service 1", description: "Healthcare consulting" },
    { title: "Service 2", description: "Medical training" },
    { title: "Service 3", description: "Community support" },
    { title: "Service 4", description: "Digital health" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header Section */}
        <FadeIn className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Animation Framework Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Showcasing scroll-triggered animations with accessibility support
          </p>
        </FadeIn>

        {/* Basic Animations */}
        <section className="space-y-8">
          <SlideUp>
            <h2 className="text-3xl font-semibold text-gray-800 text-center">
              Basic Animations
            </h2>
          </SlideUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FadeIn delay={100}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Fade In</CardTitle>
                  <CardDescription>Smooth opacity transition</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    This card fades in when it enters the viewport.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <SlideUp delay={200}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Slide Up</CardTitle>
                  <CardDescription>Upward motion with fade</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    This card slides up from below with a fade effect.
                  </p>
                </CardContent>
              </Card>
            </SlideUp>

            <SlideLeft delay={300}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Slide Left</CardTitle>
                  <CardDescription>Horizontal motion</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    This card slides in from the right side.
                  </p>
                </CardContent>
              </Card>
            </SlideLeft>

            <ScaleIn delay={400}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Scale In</CardTitle>
                  <CardDescription>Scale with spring easing</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    This card scales up with a spring animation.
                  </p>
                </CardContent>
              </Card>
            </ScaleIn>
          </div>
        </section>

        {/* Staggered Animation */}
        <section className="space-y-8">
          <SlideUp>
            <h2 className="text-3xl font-semibold text-gray-800 text-center">
              Staggered Animations
            </h2>
          </SlideUp>

          <StaggeredContainer
            type="slideUp"
            staggerDelay={150}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {demoItems.map((item, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Each card animates in sequence with a staggered delay.
                  </p>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </StaggeredContainer>
        </section>

        {/* Hover Animations */}
        <section className="space-y-8">
          <SlideUp>
            <h2 className="text-3xl font-semibold text-gray-800 text-center">
              Interactive Hover Effects
            </h2>
          </SlideUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <HoverAnimated hoverScale={1.05}>
              <Card className="h-full cursor-pointer">
                <CardHeader>
                  <CardTitle>Hover to Scale</CardTitle>
                  <CardDescription>Subtle scale on hover</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    This card scales slightly when you hover over it.
                  </p>
                </CardContent>
              </Card>
            </HoverAnimated>

            <HoverAnimated hoverScale={1.02}>
              <Card className="h-full cursor-pointer">
                <CardHeader>
                  <CardTitle>Gentle Hover</CardTitle>
                  <CardDescription>Minimal scale effect</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    This card has a more subtle hover effect.
                  </p>
                </CardContent>
              </Card>
            </HoverAnimated>

            <HoverAnimated hoverScale={1.08}>
              <Card className="h-full cursor-pointer">
                <CardHeader>
                  <CardTitle>Pronounced Hover</CardTitle>
                  <CardDescription>More noticeable scale</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    This card has a more pronounced hover effect.
                  </p>
                </CardContent>
              </Card>
            </HoverAnimated>
          </div>
        </section>

        {/* Accessibility Notice */}
        <FadeIn>
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">
                Accessibility Built-in
              </CardTitle>
              <CardDescription className="text-green-700">
                Respects user preferences for reduced motion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-700">
                All animations automatically respect the user's
                "prefers-reduced-motion" setting. Users who prefer reduced
                motion will see the final state without animations, ensuring
                accessibility compliance.
              </p>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Direction Variations */}
        <section className="space-y-8">
          <SlideUp>
            <h2 className="text-3xl font-semibold text-gray-800 text-center">
              Directional Animations
            </h2>
          </SlideUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SlideUp>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  ↑
                </div>
                <p className="text-sm font-medium">Slide Up</p>
              </div>
            </SlideUp>

            <SlideDown>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  ↓
                </div>
                <p className="text-sm font-medium">Slide Down</p>
              </div>
            </SlideDown>

            <SlideLeft>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  ←
                </div>
                <p className="text-sm font-medium">Slide Left</p>
              </div>
            </SlideLeft>

            <SlideRight>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  →
                </div>
                <p className="text-sm font-medium">Slide Right</p>
              </div>
            </SlideRight>
          </div>
        </section>
      </div>
    </div>
  );
}
