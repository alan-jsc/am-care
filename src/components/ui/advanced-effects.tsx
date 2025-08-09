import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-responsive";

// Parallax component
interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  disabled?: boolean;
}

const Parallax = React.forwardRef<HTMLDivElement, ParallaxProps>(
  ({ children, speed = 0.5, className, disabled = false, ...props }, ref) => {
    const [offset, setOffset] = useState(0);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
      if (disabled || prefersReducedMotion) return;

      const handleScroll = () => {
        const scrolled = window.pageYOffset;
        setOffset(scrolled * speed);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, [speed, disabled, prefersReducedMotion]);

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        style={{
          transform:
            disabled || prefersReducedMotion
              ? "none"
              : `translateY(${offset}px)`,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Parallax.displayName = "Parallax";

// Gradient animation component
interface GradientAnimationProps {
  children: React.ReactNode;
  className?: string;
  variant?: "flow" | "pulse" | "wave" | "radial";
  duration?: number;
  colors?: string[];
}

const GradientAnimation = React.forwardRef<
  HTMLDivElement,
  GradientAnimationProps
>(
  (
    {
      children,
      className,
      variant = "flow",
      duration = 3000,
      colors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"],
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();

    const getAnimationClasses = () => {
      if (prefersReducedMotion) return "";

      const baseClasses = "bg-gradient-to-r";

      switch (variant) {
        case "flow":
          return cn(
            baseClasses,
            "animate-gradient-flow",
            "from-blue-500 via-purple-500 to-cyan-500"
          );
        case "pulse":
          return cn(
            baseClasses,
            "animate-gradient-pulse",
            "from-blue-500 to-purple-500"
          );
        case "wave":
          return cn(
            baseClasses,
            "animate-gradient-wave",
            "from-blue-500 via-indigo-500 to-purple-500"
          );
        case "radial":
          return cn(
            "bg-gradient-radial",
            "animate-gradient-radial",
            "from-blue-500 via-purple-500 to-transparent"
          );
        default:
          return "";
      }
    };

    return (
      <div
        ref={ref}
        className={cn(getAnimationClasses(), className)}
        style={{
          animationDuration: `${duration}ms`,
          backgroundSize: variant === "radial" ? "400% 400%" : "200% 200%",
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GradientAnimation.displayName = "GradientAnimation";

// Particle effect component
interface ParticleEffectProps {
  children: React.ReactNode;
  className?: string;
  particleCount?: number;
  disabled?: boolean;
}

const ParticleEffect = React.forwardRef<HTMLDivElement, ParticleEffectProps>(
  (
    { children, className, particleCount = 50, disabled = false, ...props },
    ref
  ) => {
    const [particles, setParticles] = useState<
      Array<{ id: number; x: number; y: number; size: number; speed: number }>
    >([]);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
      if (disabled || prefersReducedMotion) return;

      const generateParticles = () => {
        const newParticles = Array.from({ length: particleCount }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 2 + 1,
        }));
        setParticles(newParticles);
      };

      generateParticles();
    }, [particleCount, disabled, prefersReducedMotion]);

    if (disabled || prefersReducedMotion) {
      return (
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        {/* Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.speed}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

ParticleEffect.displayName = "ParticleEffect";

// Glassmorphism component
interface GlassmorphismProps {
  children: React.ReactNode;
  className?: string;
  blur?: "sm" | "md" | "lg" | "xl";
  opacity?: number;
  border?: boolean;
}

const Glassmorphism = React.forwardRef<HTMLDivElement, GlassmorphismProps>(
  (
    {
      children,
      className,
      blur = "md",
      opacity = 0.8,
      border = true,
      ...props
    },
    ref
  ) => {
    const blurClasses = {
      sm: "backdrop-blur-sm",
      md: "backdrop-blur-md",
      lg: "backdrop-blur-lg",
      xl: "backdrop-blur-xl",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "bg-white/80",
          blurClasses[blur],
          border && "border border-white/20",
          "rounded-xl shadow-lg",
          className
        )}
        style={{ backgroundColor: `rgba(255, 255, 255, ${opacity})` }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Glassmorphism.displayName = "Glassmorphism";

// Floating elements component
interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "rotate";
  duration?: number;
  delay?: number;
}

const FloatingElement = React.forwardRef<HTMLDivElement, FloatingElementProps>(
  (
    {
      children,
      className,
      direction = "up",
      duration = 3000,
      delay = 0,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();

    const getAnimationClass = () => {
      if (prefersReducedMotion) return "";

      const animations = {
        up: "animate-float-up",
        down: "animate-float-down",
        left: "animate-float-left",
        right: "animate-float-right",
        rotate: "animate-float-rotate",
      };

      return animations[direction];
    };

    return (
      <div
        ref={ref}
        className={cn(getAnimationClass(), className)}
        style={{
          animationDuration: `${duration}ms`,
          animationDelay: `${delay}ms`,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FloatingElement.displayName = "FloatingElement";

// Scroll-triggered animation component
interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  animation?:
    | "fadeIn"
    | "slideUp"
    | "slideLeft"
    | "slideRight"
    | "scaleIn"
    | "rotateIn";
  threshold?: number;
  delay?: number;
  duration?: number;
}

const ScrollAnimation = React.forwardRef<HTMLDivElement, ScrollAnimationProps>(
  (
    {
      children,
      className,
      animation = "fadeIn",
      threshold = 0.1,
      delay = 0,
      duration = 600,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
      if (prefersReducedMotion) {
        setIsVisible(true);
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold }
      );

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => observer.disconnect();
    }, [threshold, prefersReducedMotion]);

    const getAnimationClasses = () => {
      if (prefersReducedMotion) return "";

      const baseClasses = "transition-all duration-600 ease-out";

      const animationClasses = {
        fadeIn: "opacity-0 translate-y-4",
        slideUp: "opacity-0 translate-y-8",
        slideLeft: "opacity-0 translate-x-8",
        slideRight: "opacity-0 -translate-x-8",
        scaleIn: "opacity-0 scale-95",
        rotateIn: "opacity-0 rotate-12 scale-95",
      };

      return cn(
        baseClasses,
        animationClasses[animation],
        isVisible &&
          "opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0"
      );
    };

    return (
      <div
        ref={(node) => {
          elementRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn(getAnimationClasses(), className)}
        style={{
          transitionDelay: `${delay}ms`,
          transitionDuration: `${duration}ms`,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ScrollAnimation.displayName = "ScrollAnimation";

// Background pattern component
interface BackgroundPatternProps {
  children: React.ReactNode;
  className?: string;
  pattern?: "dots" | "grid" | "waves" | "circles" | "hexagons";
  opacity?: number;
  size?: number;
}

const BackgroundPattern = React.forwardRef<
  HTMLDivElement,
  BackgroundPatternProps
>(
  (
    {
      children,
      className,
      pattern = "dots",
      opacity = 0.1,
      size = 20,
      ...props
    },
    ref
  ) => {
    const getPatternStyles = () => {
      const patterns = {
        dots: `radial-gradient(circle, currentColor ${
          size / 4
        }px, transparent ${size / 4}px)`,
        grid: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
        waves: `repeating-linear-gradient(45deg, transparent, transparent ${size}px, currentColor ${size}px, currentColor ${
          size * 2
        }px)`,
        circles: `radial-gradient(circle at 50% 50%, currentColor 2px, transparent 2px)`,
        hexagons: `radial-gradient(circle at 50% 50%, currentColor 1px, transparent 1px)`,
      };

      return {
        backgroundImage: patterns[pattern],
        backgroundSize: `${size}px ${size}px`,
        opacity,
      };
    };

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        {/* Pattern background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={getPatternStyles()}
        />

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

BackgroundPattern.displayName = "BackgroundPattern";

export {
  Parallax,
  GradientAnimation,
  ParticleEffect,
  Glassmorphism,
  FloatingElement,
  ScrollAnimation,
  BackgroundPattern,
};
