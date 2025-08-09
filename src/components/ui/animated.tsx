import React from "react";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";
import { AnimationType } from "../../lib/animation-config";
import { cn } from "../../lib/utils";

interface AnimatedProps {
  children: React.ReactNode;
  type?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Generic animated wrapper component
 */
export function Animated({
  children,
  type = "fadeIn",
  delay = 0,
  duration,
  threshold = 0.1,
  triggerOnce = true,
  className,
  as: Component = "div",
}: AnimatedProps) {
  const { elementRef, animationClasses, style } = useScrollAnimation({
    type,
    delay,
    duration,
    threshold,
    triggerOnce,
  });

  return (
    <Component
      ref={elementRef as any}
      className={cn(animationClasses, className)}
      style={style}
    >
      {children}
    </Component>
  );
}

/**
 * Fade-in animation component
 */
export function FadeIn(props: Omit<AnimatedProps, "type">) {
  return <Animated {...props} type="fadeIn" />;
}

/**
 * Slide-up animation component
 */
export function SlideUp(props: Omit<AnimatedProps, "type">) {
  return <Animated {...props} type="slideUp" />;
}

/**
 * Slide-down animation component
 */
export function SlideDown(props: Omit<AnimatedProps, "type">) {
  return <Animated {...props} type="slideDown" />;
}

/**
 * Slide-left animation component
 */
export function SlideLeft(props: Omit<AnimatedProps, "type">) {
  return <Animated {...props} type="slideLeft" />;
}

/**
 * Slide-right animation component
 */
export function SlideRight(props: Omit<AnimatedProps, "type">) {
  return <Animated {...props} type="slideRight" />;
}

/**
 * Scale-in animation component
 */
export function ScaleIn(props: Omit<AnimatedProps, "type">) {
  return <Animated {...props} type="scaleIn" />;
}

/**
 * Staggered animation container for lists
 */
interface StaggeredContainerProps {
  children: React.ReactNode;
  type?: AnimationType;
  staggerDelay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function StaggeredContainer({
  children,
  type = "slideUp",
  staggerDelay = 100,
  className,
  as: Component = "div",
}: StaggeredContainerProps) {
  const childrenArray = React.Children.toArray(children);

  return (
    <Component className={className}>
      {childrenArray.map((child, index) => (
        <Animated
          key={index}
          type={type}
          delay={index * staggerDelay}
          triggerOnce={true}
        >
          {child}
        </Animated>
      ))}
    </Component>
  );
}

/**
 * Animation wrapper with hover effects
 */
interface HoverAnimatedProps extends AnimatedProps {
  hoverScale?: number;
  hoverOpacity?: number;
}

export function HoverAnimated({
  children,
  hoverScale = 1.05,
  hoverOpacity = 1,
  className,
  ...animatedProps
}: HoverAnimatedProps) {
  return (
    <Animated
      {...animatedProps}
      className={cn(
        "transition-transform duration-200 ease-out hover:scale-105",
        className
      )}
      style={
        {
          ...animatedProps,
          "--hover-scale": hoverScale,
          "--hover-opacity": hoverOpacity,
        } as React.CSSProperties
      }
    >
      {children}
    </Animated>
  );
}
