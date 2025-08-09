import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { ImageAsset } from "./image-asset";
import { Display, Body, Caption } from "./typography";
import { ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";
import { useReducedMotion } from "../../hooks/use-reduced-motion";

interface StatisticProps {
  value: string;
  label: string;
  delay?: number;
}

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  ctaButtons?: Array<{
    text: string;
    variant?: "default" | "outline";
    href?: string;
    onClick?: () => void;
  }>;
  statistics?: StatisticProps[];
  showParallax?: boolean;
  className?: string;
}

// Animated counter component for statistics
function AnimatedCounter({ value, label, delay = 0 }: StatisticProps) {
  const [count, setCount] = useState(0);
  const { elementRef, isVisible } = useScrollAnimation({
    type: "fadeIn",
    delay,
    threshold: 0.3,
  });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isVisible || prefersReducedMotion) {
      // If reduced motion is preferred, show final value immediately
      const finalValue = parseInt(value.replace(/\D/g, ""));
      setCount(finalValue);
      return;
    }

    const finalValue = parseInt(value.replace(/\D/g, ""));
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 FPS
    const increment = finalValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= finalValue) {
        setCount(finalValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value, prefersReducedMotion]);

  const displayValue = value.includes("+") ? `${count}+` : count.toString();

  return (
    <div
      ref={elementRef}
      className="flex items-center space-x-2 sm:space-x-3 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 sm:px-4 sm:py-3 border border-white/20 min-h-[44px]"
    >
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
        <span className="font-bold text-white text-xs sm:text-sm">
          {displayValue}
        </span>
      </div>
      <Caption className="text-white/90 font-medium text-xs sm:text-sm leading-tight">
        {label}
      </Caption>
    </div>
  );
}

// Floating elements for background decoration
function FloatingElements() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating circles */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full animate-float-slow" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-blue-300/10 rounded-full animate-float-medium" />
      <div className="absolute bottom-32 left-20 w-12 h-12 bg-white/8 rounded-full animate-float-fast" />
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-200/5 rounded-full animate-float-slow" />

      {/* Floating plus signs */}
      <div className="absolute top-32 right-40 text-white/10 text-2xl animate-float-medium">
        +
      </div>
      <div className="absolute bottom-40 left-40 text-white/10 text-xl animate-float-fast">
        +
      </div>
    </div>
  );
}

export function HeroSection({
  title,
  subtitle,
  backgroundImage,
  backgroundVideo,
  ctaButtons = [],
  statistics = [],
  showParallax = true,
  className,
}: HeroSectionProps) {
  const [scrollY, setScrollY] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Parallax scroll effect
  useEffect(() => {
    if (!showParallax || prefersReducedMotion) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showParallax, prefersReducedMotion]);

  // Animation hooks for text elements
  const titleAnimation = useScrollAnimation({
    type: "slideUp",
    delay: 200,
    threshold: 0.2,
  });

  const subtitleAnimation = useScrollAnimation({
    type: "slideUp",
    delay: 400,
    threshold: 0.2,
  });

  const ctaAnimation = useScrollAnimation({
    type: "slideUp",
    delay: 600,
    threshold: 0.2,
  });

  const imageAnimation = useScrollAnimation({
    type: "fadeIn",
    delay: 800,
    threshold: 0.2,
  });

  // Parallax transform
  const parallaxTransform =
    showParallax && !prefersReducedMotion
      ? `translateY(${scrollY * 0.5}px)`
      : undefined;

  return (
    <section className={cn("relative overflow-hidden", className)}>
      {/* Background with parallax effect */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: parallaxTransform }}
      >
        {/* Background Video */}
        {backgroundVideo && (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        )}

        {/* Background Image */}
        {backgroundImage && !backgroundVideo && (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}

        {/* Gradient Overlay with blend modes */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-blue-700/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-transparent to-transparent" />
      </div>

      {/* Floating Elements */}
      <FloatingElements />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Text Content */}
            <div className="max-w-xl lg:max-w-2xl">
              {/* Animated Title */}
              <Display
                size="2xl"
                ref={titleAnimation.elementRef}
                className={cn(
                  "mb-4 sm:mb-6 text-white text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
                  titleAnimation.animationClasses
                )}
                style={titleAnimation.style}
              >
                {title.split(" ").map((word, index) => (
                  <span
                    key={index}
                    className="inline-block mr-3"
                    style={{
                      animationDelay: `${200 + index * 100}ms`,
                    }}
                  >
                    {word}
                  </span>
                ))}
              </Display>

              {/* Animated Subtitle */}
              <Body
                size="xl"
                ref={subtitleAnimation.elementRef}
                className={cn(
                  "mb-6 sm:mb-8 text-white/90 text-pretty text-base sm:text-lg md:text-xl lg:text-2xl",
                  subtitleAnimation.animationClasses
                )}
                style={subtitleAnimation.style}
              >
                {subtitle}
              </Body>

              {/* Animated CTA Buttons */}
              <div
                ref={ctaAnimation.elementRef}
                className={cn(
                  "flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12",
                  ctaAnimation.animationClasses
                )}
                style={ctaAnimation.style}
              >
                {ctaButtons.map((button, index) => (
                  <Button
                    key={index}
                    variant={button.variant || "default"}
                    size="lg"
                    className={cn(
                      "group relative overflow-hidden min-h-[44px] min-w-[44px] px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-medium",
                      button.variant === "outline"
                        ? "border-white text-white hover:bg-white hover:text-blue-700 backdrop-blur-sm bg-white/10"
                        : "bg-white text-blue-700 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    )}
                    onClick={button.onClick}
                    style={{
                      animationDelay: `${600 + index * 100}ms`,
                    }}
                  >
                    <span className="relative z-10 flex items-center">
                      {button.text}
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    {/* Button hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </Button>
                ))}
              </div>

              {/* Animated Statistics */}
              {statistics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
                  {statistics.map((stat, index) => (
                    <AnimatedCounter
                      key={index}
                      value={stat.value}
                      label={stat.label}
                      delay={800 + index * 200}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Hero Image */}
            <div className="hidden lg:block xl:block">
              <div
                ref={imageAnimation.elementRef}
                className={cn("relative", imageAnimation.animationClasses)}
                style={imageAnimation.style}
              >
                {backgroundImage && (
                  <ImageAsset
                    src={backgroundImage}
                    alt="WeCare247 - Dịch vụ chăm sóc chuyên nghiệp"
                    aspectRatio="landscape"
                    rounded="lg"
                    shadow="2xl"
                    priority={true}
                    className="max-w-full transform hover:scale-105 transition-transform duration-500"
                  />
                )}

                {/* Decorative elements around image */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full backdrop-blur-sm border border-white/20" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-300/20 rounded-full backdrop-blur-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
