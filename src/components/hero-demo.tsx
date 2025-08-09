import React from "react";
import { HeroSection } from "./ui/hero-section";

/**
 * Demo component showcasing the enhanced Hero Section features
 */
export function HeroDemo() {
  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold mb-4">Enhanced Hero Section Demo</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          This demo showcases the new Hero Section with parallax scrolling,
          animated text reveals, floating elements, interactive statistics
          counters, and gradient overlay system.
        </p>
      </div>

      {/* Main Hero Section */}
      <HeroSection
        title="Dịch vụ chăm sóc chuyên nghiệp"
        subtitle="WeCare247 cung cấp dịch vụ chăm sóc chất lượng cao cho người già, người bệnh và trẻ em với đội ngũ chăm sóc viên chuyên nghiệp, tận tâm."
        backgroundImage="/images/Healthcare.jpg"
        ctaButtons={[
          {
            text: "Đặt dịch vụ ngay",
            variant: "default",
            onClick: () => alert("Đặt dịch vụ clicked!"),
          },
          {
            text: "Tìm hiểu thêm",
            variant: "outline",
            onClick: () => alert("Tìm hiểu thêm clicked!"),
          },
        ]}
        statistics={[
          { value: "10+", label: "Năm kinh nghiệm" },
          { value: "500+", label: "Chăm sóc viên" },
          { value: "5000+", label: "Khách hàng" },
          { value: "20+", label: "Tỉnh thành" },
        ]}
        showParallax={true}
      />

      {/* Features Showcase */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎭</span>
            </div>
            <h3 className="font-semibold mb-2">Parallax Scrolling</h3>
            <p className="text-sm text-gray-600">
              Background moves at different speed for depth effect
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="font-semibold mb-2">Animated Text Reveal</h3>
            <p className="text-sm text-gray-600">
              Staggered word-by-word animation on scroll
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎈</span>
            </div>
            <h3 className="font-semibold mb-2">Floating Elements</h3>
            <p className="text-sm text-gray-600">
              Subtle floating animations in background
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="font-semibold mb-2">Interactive Counters</h3>
            <p className="text-sm text-gray-600">
              Animated statistics that count up on scroll
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Additional Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Gradient Overlay System</h4>
              <p className="text-sm text-gray-600">
                Multiple gradient layers with blend modes for better text
                readability
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Accessibility Support</h4>
              <p className="text-sm text-gray-600">
                Respects prefers-reduced-motion and provides keyboard navigation
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-2">Performance Optimized</h4>
              <p className="text-sm text-gray-600">
                Efficient scroll handling and animation cleanup
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
