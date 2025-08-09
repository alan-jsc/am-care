import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTouchSwipe } from "@/hooks/use-touch-swipe";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Testimonial, TestimonialCarouselProps } from "@/types/testimonial";

const TestimonialCard: React.FC<{
  testimonial: Testimonial;
  isActive: boolean;
  className?: string;
}> = ({ testimonial, isActive, className }) => {
  const prefersReducedMotion = useReducedMotion();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={cn(
          "w-4 h-4 transition-all duration-300",
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
          !prefersReducedMotion && isActive && "animate-pulse"
        )}
        style={{
          animationDelay: !prefersReducedMotion ? `${index * 100}ms` : "0ms",
        }}
      />
    ));
  };

  return (
    <div
      className={cn(
        "bg-white rounded-xl p-4 sm:p-6 border border-gray-100",
        "transition-all duration-500 ease-out",
        isActive ? "opacity-100 scale-100" : "opacity-60 scale-95",
        className
      )}
    >
      <div className="flex items-center gap-1 mb-3 sm:mb-4">
        {renderStars(testimonial.rating)}
      </div>

      <blockquote className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
        "{testimonial.content}"
      </blockquote>

      <div className="flex items-center gap-3 sm:gap-4">
        {testimonial.avatar && (
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">
            {testimonial.name}
          </div>
          <div className="text-xs sm:text-sm text-gray-600 truncate">
            {testimonial.role}
            {testimonial.company && ` at ${testimonial.company}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  autoPlay = true,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  slidesToShow = 1,
  infinite = true,
  pauseOnHover = true,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const totalSlides = testimonials.length;
  const maxIndex = infinite ? totalSlides : totalSlides - slidesToShow;

  // Navigation functions
  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;

      setIsTransitioning(true);
      setCurrentIndex(index);

      setTimeout(
        () => {
          setIsTransitioning(false);
        },
        prefersReducedMotion ? 0 : 500
      );
    },
    [isTransitioning, prefersReducedMotion]
  );

  const nextSlide = useCallback(() => {
    if (infinite) {
      goToSlide((currentIndex + 1) % totalSlides);
    } else if (currentIndex < maxIndex - 1) {
      goToSlide(currentIndex + 1);
    }
  }, [currentIndex, totalSlides, maxIndex, infinite, goToSlide]);

  const prevSlide = useCallback(() => {
    if (infinite) {
      goToSlide(currentIndex === 0 ? totalSlides - 1 : currentIndex - 1);
    } else if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  }, [currentIndex, totalSlides, infinite, goToSlide]);

  // Touch/swipe support
  const { attachSwipeListeners } = useTouchSwipe({
    onSwipeLeft: nextSlide,
    onSwipeRight: prevSlide,
    threshold: 50,
  });

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return;

    intervalRef.current = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, nextSlide, autoPlayInterval, prefersReducedMotion]);

  // Pause on hover
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsPlaying(false);
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover && autoPlay) {
      setIsPlaying(true);
    }
  }, [pauseOnHover, autoPlay]);

  // Attach swipe listeners
  useEffect(() => {
    const cleanup = attachSwipeListeners(carouselRef.current);
    return cleanup;
  }, [attachSwipeListeners]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div
      className={cn("relative w-full", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={carouselRef}
      role="region"
      aria-label="Customer testimonials carousel"
    >
      {/* Main carousel container */}
      <div className="relative overflow-hidden">
        <div
          className={cn(
            "flex transition-transform duration-500 ease-out",
            prefersReducedMotion && "transition-none"
          )}
          style={{
            transform: `translateX(-${(currentIndex * 100) / slidesToShow}%)`,
            width: `${(totalSlides * 100) / slidesToShow}%`,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0 px-4"
              style={{ width: `${100 / totalSlides}%` }}
            >
              <TestimonialCard
                testimonial={testimonial}
                isActive={index === currentIndex}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      {showArrows && totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            disabled={!infinite && currentIndex === 0}
            className={cn(
              "absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10",
              "w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg border border-gray-200",
              "flex items-center justify-center min-h-[44px] min-w-[44px]",
              "transition-all duration-200 ease-out",
              "hover:bg-gray-50 hover:shadow-xl hover:scale-110",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            )}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            disabled={!infinite && currentIndex >= maxIndex - 1}
            className={cn(
              "absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10",
              "w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg border border-gray-200",
              "flex items-center justify-center min-h-[44px] min-w-[44px]",
              "transition-all duration-200 ease-out",
              "hover:bg-gray-50 hover:shadow-xl hover:scale-110",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            )}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {showDots && totalSlides > 1 && (
        <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
          {Array.from({ length: totalSlides }, (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ease-out min-h-[44px] min-w-[44px] flex items-center justify-center",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            >
              <span
                className={cn(
                  "w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full",
                  index === currentIndex
                    ? "bg-blue-600 w-6 sm:w-8"
                    : "bg-blue-300"
                )}
              />
            </button>
          ))}
        </div>
      )}

      {/* Play/Pause button for auto-play */}
      {autoPlay && (
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={cn(
            "absolute top-4 right-4 z-10",
            "w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm",
            "flex items-center justify-center",
            "transition-all duration-200 ease-out",
            "hover:bg-white hover:shadow-lg",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          )}
          aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
        >
          <div
            className={cn(
              "w-3 h-3",
              isPlaying
                ? "border-l-2 border-r-2 border-gray-600"
                : "border-l-4 border-l-gray-600 border-y-2 border-y-transparent"
            )}
          />
        </button>
      )}
    </div>
  );
};
