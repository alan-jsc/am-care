# Animation Framework Documentation

## Overview

This animation framework provides a comprehensive set of tools for creating smooth, accessible animations in React applications. It includes scroll-triggered animations, hover effects, and accessibility features that respect user preferences.

## Features

- 🎯 **Scroll-triggered animations** using IntersectionObserver
- 🎨 **Multiple animation types** (fade, slide, scale)
- ♿ **Accessibility compliant** with prefers-reduced-motion support
- ⚡ **Performance optimized** with debouncing and throttling
- 🔧 **Highly configurable** timing and easing options
- 📱 **Mobile-friendly** with touch-optimized interactions

## Quick Start

### Basic Usage

```tsx
import { FadeIn, SlideUp, ScaleIn } from "@/components/ui/animated";

function MyComponent() {
  return (
    <div>
      <FadeIn>
        <h1>This fades in when scrolled into view</h1>
      </FadeIn>

      <SlideUp delay={200}>
        <p>This slides up with a 200ms delay</p>
      </SlideUp>

      <ScaleIn duration={500}>
        <div>This scales in over 500ms</div>
      </ScaleIn>
    </div>
  );
}
```

### Staggered Animations

```tsx
import { StaggeredContainer } from "@/components/ui/animated";

function ServiceList() {
  const services = ["Service 1", "Service 2", "Service 3"];

  return (
    <StaggeredContainer type="slideUp" staggerDelay={150}>
      {services.map((service) => (
        <div key={service} className="service-card">
          {service}
        </div>
      ))}
    </StaggeredContainer>
  );
}
```

## Components

### Animated Components

#### `<Animated>`

Generic wrapper component for any animation type.

**Props:**

- `type`: Animation type ('fadeIn', 'slideUp', 'slideDown', 'slideLeft', 'slideRight', 'scaleIn', 'scaleOut')
- `delay`: Delay before animation starts (ms)
- `duration`: Animation duration (ms)
- `threshold`: Intersection threshold (0-1)
- `triggerOnce`: Whether to animate only once
- `className`: Additional CSS classes
- `as`: HTML element type (default: 'div')

#### `<FadeIn>`, `<SlideUp>`, `<SlideDown>`, `<SlideLeft>`, `<SlideRight>`, `<ScaleIn>`

Pre-configured animation components for common effects.

#### `<StaggeredContainer>`

Container for creating staggered animations across multiple children.

**Props:**

- `type`: Animation type for all children
- `staggerDelay`: Delay between each child animation (ms)
- `className`: Container CSS classes
- `as`: Container HTML element type

#### `<HoverAnimated>`

Combines scroll animations with hover effects.

**Props:**

- All `Animated` props plus:
- `hoverScale`: Scale factor on hover (default: 1.05)
- `hoverOpacity`: Opacity on hover (default: 1)

## Hooks

### `useScrollAnimation(options)`

Core hook for scroll-triggered animations.

**Options:**

```tsx
interface UseScrollAnimationOptions {
  type: AnimationType;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  duration?: number;
  disabled?: boolean;
}
```

**Returns:**

```tsx
interface ScrollAnimationReturn {
  elementRef: React.RefObject<HTMLElement>;
  isVisible: boolean;
  animationClasses: string;
  style: React.CSSProperties;
}
```

### `useReducedMotion()`

Detects user's motion preferences.

```tsx
const prefersReducedMotion = useReducedMotion();
```

### `useConditionalAnimation(animatedValue, staticValue)`

Conditionally applies animations based on user preferences.

```tsx
const className = useConditionalAnimation("animate-bounce", "static-class");
```

### `useAnimationDuration(duration)`

Returns animation duration or 0 if user prefers reduced motion.

```tsx
const duration = useAnimationDuration(300); // 300ms or 0ms
```

## Configuration

### Animation Types

- `fadeIn`: Opacity transition from 0 to 1
- `slideUp`: Slide from bottom with fade
- `slideDown`: Slide from top with fade
- `slideLeft`: Slide from right with fade
- `slideRight`: Slide from left with fade
- `scaleIn`: Scale from 0.95 to 1 with fade
- `scaleOut`: Scale from 1 to 0.95 with fade

### Timing Presets

```tsx
import { ANIMATION_DURATIONS } from "@/lib/animation-config";

// Available durations
ANIMATION_DURATIONS.fast; // 150ms - Hover states, buttons
ANIMATION_DURATIONS.medium; // 300ms - Cards, modals
ANIMATION_DURATIONS.slow; // 500ms - Page transitions
```

### Easing Functions

```tsx
import { EASING_FUNCTIONS } from "@/lib/animation-config";

// Available easing functions
("ease"); // Standard ease
("ease-in"); // Slow start
("ease-out"); // Slow end
("ease-in-out"); // Slow start and end
("linear"); // Constant speed
("spring"); // Bouncy spring effect
("bounce"); // Bounce effect
```

## Accessibility

### Reduced Motion Support

The framework automatically respects the user's `prefers-reduced-motion` setting:

- When enabled, animations are disabled and elements appear in their final state
- No JavaScript changes needed - handled automatically
- Maintains full functionality without animations

### Best Practices

1. **Always provide fallbacks**: Ensure content is accessible without animations
2. **Use semantic HTML**: Animations enhance but don't replace proper markup
3. **Test with reduced motion**: Verify functionality with animations disabled
4. **Avoid seizure triggers**: Keep animations smooth and avoid rapid flashing

## Performance

### Optimization Features

- **IntersectionObserver**: Efficient viewport detection
- **will-change optimization**: Automatic GPU acceleration hints
- **Debounced scroll events**: Prevents excessive calculations
- **Conditional rendering**: Only animates visible elements

### Performance Tips

1. **Use transform and opacity**: Most performant CSS properties
2. **Avoid animating layout properties**: width, height, margin, padding
3. **Limit concurrent animations**: Stagger complex animations
4. **Clean up observers**: Automatic cleanup on unmount

## Examples

### Hero Section Animation

```tsx
function HeroSection() {
  return (
    <section className="hero">
      <FadeIn>
        <h1 className="hero-title">Welcome to ICare</h1>
      </FadeIn>

      <SlideUp delay={300}>
        <p className="hero-subtitle">Professional healthcare services</p>
      </SlideUp>

      <SlideUp delay={600}>
        <button className="cta-button">Get Started</button>
      </SlideUp>
    </section>
  );
}
```

### Service Cards with Stagger

```tsx
function ServiceCards({ services }) {
  return (
    <StaggeredContainer
      type="slideUp"
      staggerDelay={100}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {services.map((service) => (
        <HoverAnimated key={service.id} hoverScale={1.05}>
          <div className="service-card">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        </HoverAnimated>
      ))}
    </StaggeredContainer>
  );
}
```

### Custom Animation Configuration

```tsx
import { createAnimationConfig } from "@/lib/animation-config";

function CustomAnimatedComponent() {
  const customConfig = createAnimationConfig("slideUp", {
    duration: 800,
    delay: 200,
    easing: "spring",
    threshold: 0.3,
  });

  const { elementRef, animationClasses, style } =
    useScrollAnimation(customConfig);

  return (
    <div ref={elementRef} className={animationClasses} style={style}>
      Custom animated content
    </div>
  );
}
```

## Browser Support

- **Modern browsers**: Chrome 51+, Firefox 55+, Safari 12.1+, Edge 15+
- **IntersectionObserver**: Polyfill available for older browsers
- **CSS Transitions**: Supported in all target browsers
- **prefers-reduced-motion**: Graceful fallback for unsupported browsers

## Troubleshooting

### Common Issues

1. **Animations not triggering**

   - Check if element is in viewport
   - Verify threshold and rootMargin settings
   - Ensure IntersectionObserver is supported

2. **Performance issues**

   - Reduce number of concurrent animations
   - Use transform/opacity instead of layout properties
   - Check for memory leaks in long-running animations

3. **Accessibility concerns**
   - Test with prefers-reduced-motion enabled
   - Ensure content is readable without animations
   - Verify keyboard navigation still works

### Debug Mode

Enable debug logging:

```tsx
// Add to your component for debugging
useEffect(() => {
  console.log("Animation state:", { isVisible, hasIntersected });
}, [isVisible, hasIntersected]);
```

## Migration Guide

### From CSS Animations

Replace CSS keyframe animations with component-based animations:

```tsx
// Before (CSS)
.fade-in {
  animation: fadeIn 0.3s ease-out;
}

// After (React)
<FadeIn duration={300}>
  <div>Content</div>
</FadeIn>
```

### From Other Libraries

The API is designed to be familiar to users of Framer Motion and other animation libraries:

```tsx
// Framer Motion style
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>

// Our framework
<SlideUp duration={300}>
  <div>Content</div>
</SlideUp>
```
