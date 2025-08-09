import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  Body,
  Caption,
} from "@/components/ui/typography";
import { Check, Star, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export interface ServiceCardProps {
  title: string;
  description: string;
  image?: string;
  features: string[];
  price?: string;
  badge?: string;
  variant?: "default" | "featured" | "compact";
  hoverEffect?: "lift" | "glow" | "scale";
  className?: string;
  onButtonClick?: () => void;
  buttonText?: string;
  rating?: number;
  showRating?: boolean;
}

const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  (
    {
      title,
      description,
      image,
      features,
      price,
      badge,
      variant = "default",
      hoverEffect = "lift",
      className,
      onButtonClick,
      buttonText = "Xem chi tiết",
      rating = 5,
      showRating = false,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const cardVariants = {
      default: "bg-white/80 backdrop-blur-sm border border-gray-200/50",
      featured:
        "bg-gradient-to-br from-blue-50/90 to-indigo-50/90 backdrop-blur-sm border-2 border-gradient-to-r from-blue-400 to-indigo-500 relative overflow-hidden",
      compact: "bg-white/70 backdrop-blur-sm border border-gray-100/50",
    };

    const hoverEffects = {
      lift: "hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-blue-500/20",
      glow: "hover:shadow-2xl hover:shadow-blue-500/30 hover:border-blue-300/50",
      scale: "hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/20",
    };

    const sizeVariants = {
      default: "p-4 sm:p-6",
      featured: "p-6 sm:p-8",
      compact: "p-3 sm:p-4",
    };

    return (
      <Card
        ref={ref}
        className={cn(
          "group relative transition-all duration-500 ease-out cursor-pointer",
          "transform-gpu will-change-transform",
          cardVariants[variant],
          hoverEffects[hoverEffect],
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* Featured variant gradient border effect */}
        {variant === "featured" && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute top-2 right-2 z-10">
            <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg transform transition-transform duration-300">
              {badge}
            </div>
          </div>
        )}

        {/* Image Section */}
        {image && (
          <div
            className={cn(
              "relative overflow-hidden rounded-lg mb-3 sm:mb-4",
              variant === "compact" ? "h-24 sm:h-32" : "h-40 sm:h-48"
            )}
          >
            <img
              src={image}
              alt={title}
              className={cn(
                "w-full h-full object-cover transition-all duration-700 ease-out",
                "group-hover:scale-110 group-hover:brightness-110"
              )}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Price overlay */}
            {price && (
              <div className="absolute top-3 left-3">
                <div className="bg-white/90 backdrop-blur-sm text-blue-600 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  {price}
                </div>
              </div>
            )}
          </div>
        )}

        <CardContent className={cn(sizeVariants[variant])}>
          {/* Header */}
          <div className="mb-3 sm:mb-4">
            <CardTitle
              className={cn(
                "!text-gray-700 group-hover:text-blue-600 transition-colors duration-300",
                variant === "featured" && "text-heading-lg",
                variant === "compact" && "text-heading-sm"
              )}
            >
              {title}
            </CardTitle>

            {/* Rating */}
            {showRating && (
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4 transition-colors duration-300",
                      i < rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    )}
                  />
                ))}
                <Caption className="text-contrast-muted ml-1">
                  ({rating}/5)
                </Caption>
              </div>
            )}

            <CardDescription
              className={cn(variant === "compact" && "text-body-sm")}
            >
              {description}
            </CardDescription>
          </div>

          {/* Features List */}
          {features.length > 0 && (
            <div className="mb-4 sm:mb-6">
              <div className="space-y-1.5 sm:space-y-2">
                {features
                  .slice(0, variant === "compact" ? 3 : features.length)
                  .map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start group/feature"
                      style={{
                        animationDelay: isHovered ? `${idx * 100}ms` : "0ms",
                      }}
                    >
                      <div className="flex-shrink-0 mr-2 sm:mr-3 mt-0.5">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center transform group-hover/feature:scale-110 transition-transform duration-200">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                        </div>
                      </div>
                      <Body
                        size={variant === "compact" ? "sm" : "md"}
                        className="text-contrast-secondary group-hover/feature:text-contrast-primary transition-colors duration-200"
                      >
                        {feature}
                      </Body>
                    </div>
                  ))}
              </div>

              {/* Show more indicator for compact variant */}
              {variant === "compact" && features.length > 3 && (
                <Caption className="text-primary-600 mt-2 font-medium">
                  +{features.length - 3} tính năng khác
                </Caption>
              )}
            </div>
          )}

          {/* Action Button */}
          <Button
            onClick={onButtonClick}
            className={cn(
              "w-full group/button relative overflow-hidden min-h-[44px]",
              "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
              "transform transition-all duration-300 ease-out",
              "hover:shadow-lg hover:shadow-blue-500/30",
              variant === "featured" &&
                "py-3 sm:py-4 text-base sm:text-lg font-semibold",
              variant === "compact" && "py-2.5 sm:py-3 text-sm sm:text-base",
              variant === "default" && "py-2.5 sm:py-3 text-sm sm:text-base"
            )}
          >
            {/* Button background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />

            <span className="relative text-white flex items-center justify-center gap-2">
              {buttonText}
              <ArrowRight
                className={cn(
                  "transition-transform duration-300 group-hover/button:translate-x-1",
                  variant === "compact" ? "w-4 h-4" : "w-5 h-5"
                )}
              />
            </span>
          </Button>
        </CardContent>

        {/* Glassmorphism shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
      </Card>
    );
  }
);

ServiceCard.displayName = "ServiceCard";

export { ServiceCard };
