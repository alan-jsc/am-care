import React from "react";
import { ResponsiveContainer } from "@/components/ui/responsive-container";
import { useResponsive, useTouchTargets } from "@/hooks/use-responsive";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const ResponsiveTestDemo = () => {
  const breakpoint = useResponsive();
  const touchTargets = useTouchTargets();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <ResponsiveContainer className="space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Responsive Design Test
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test responsive design across different breakpoints and ensure touch
            targets meet accessibility standards.
          </p>
        </div>

        {/* Current Breakpoint Display */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                Current Breakpoint
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-blue-50">
                <div className="text-2xl font-bold text-blue-600">
                  {breakpoint.width}
                </div>
                <div className="text-sm text-gray-600">Width (px)</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-green-50">
                <div className="text-2xl font-bold text-green-600">
                  {breakpoint.height}
                </div>
                <div className="text-sm text-gray-600">Height (px)</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-purple-50">
                <div className="text-2xl font-bold text-purple-600">
                  {touchTargets.minSize}
                </div>
                <div className="text-sm text-gray-600">
                  Min Touch Target (px)
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-orange-50">
                <div className="text-2xl font-bold text-orange-600">
                  {touchTargets.spacing}
                </div>
                <div className="text-sm text-gray-600">Spacing (px)</div>
              </div>
            </div>

            {/* Breakpoint Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div
                className={`p-3 rounded-lg text-center text-sm font-medium ${
                  breakpoint.isMobile
                    ? "bg-blue-100 text-blue-800 border-2 border-blue-300"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Mobile
              </div>
              <div
                className={`p-3 rounded-lg text-center text-sm font-medium ${
                  breakpoint.isTablet
                    ? "bg-green-100 text-green-800 border-2 border-green-300"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Tablet
              </div>
              <div
                className={`p-3 rounded-lg text-center text-sm font-medium ${
                  breakpoint.isDesktop
                    ? "bg-purple-100 text-purple-800 border-2 border-purple-300"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Desktop
              </div>
              <div
                className={`p-3 rounded-lg text-center text-sm font-medium ${
                  breakpoint.isLargeDesktop
                    ? "bg-orange-100 text-orange-800 border-2 border-orange-300"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Large Desktop
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Touch Target Test */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Touch Target Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Small Button - Should be minimum 44px */}
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700">Small Button</h3>
                <Button
                  size="sm"
                  className="min-h-[44px] min-w-[44px]"
                  onClick={() => alert("Small button clicked!")}
                >
                  Click me
                </Button>
              </div>

              {/* Medium Button */}
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700">Medium Button</h3>
                <Button
                  className="min-h-[44px]"
                  onClick={() => alert("Medium button clicked!")}
                >
                  Click me
                </Button>
              </div>

              {/* Large Button */}
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700">Large Button</h3>
                <Button
                  size="lg"
                  className="min-h-[44px]"
                  onClick={() => alert("Large button clicked!")}
                >
                  Click me
                </Button>
              </div>
            </div>

            {/* Spacing Test */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Spacing Test</h3>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className="min-h-[44px] min-w-[44px]"
                    onClick={() => alert(`Button ${i} clicked!`)}
                  >
                    {i}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Responsive Grid Test */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Responsive Grid Test</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 hover:border-blue-300 transition-colors"
                >
                  <div className="text-lg font-semibold text-blue-800">
                    Item {i + 1}
                  </div>
                  <div className="text-sm text-blue-600 mt-1">
                    Responsive grid item
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Typography Test */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Typography Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Responsive Heading 1
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
                Responsive Heading 2
              </h2>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-700">
                Responsive Heading 3
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                This is a responsive paragraph that scales appropriately across
                different screen sizes. The text should remain readable and
                well-spaced on all devices.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Container Query Test */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Container Query Test</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Narrow Container</h3>
                <div className="max-w-sm p-4 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-sm text-gray-600">
                    This container is narrow and should show mobile-optimized
                    content.
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Wide Container</h3>
                <div className="max-w-md p-4 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-sm text-gray-600">
                    This container is wider and can show more detailed content.
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </ResponsiveContainer>
    </div>
  );
};
