# Design Document

## Overview

Tài liệu thiết kế này mô tả cách nâng cấp giao diện trang web WeCare247 để trở nên hiện đại, đẹp mắt và thông minh hơn. Thiết kế sẽ tập trung vào việc cải thiện trải nghiệm người dùng (UX), tối ưu hóa giao diện người dùng (UI), và bổ sung các tính năng tương tác hiện đại trong khi vẫn duy trì tính chuyên nghiệp phù hợp với lĩnh vực chăm sóc sức khỏe.

## Architecture

### Design System Foundation

**Color Palette:**

- Primary: Blue gradient (#2563eb to #1d4ed8) - Tạo cảm giác tin cậy và chuyên nghiệp
- Secondary: Teal (#14b8a6) - Màu phụ cho các accent và highlights
- Success: Green (#10b981) - Cho các trạng thái thành công
- Warning: Amber (#f59e0b) - Cho các cảnh báo
- Error: Red (#ef4444) - Cho các lỗi
- Neutral: Gray scale (#f8fafc to #1e293b) - Cho text và backgrounds

**Typography Scale:**

- Font Family: Inter (primary), system fonts (fallback)
- Heading Scale: 3xl (30px), 2xl (24px), xl (20px), lg (18px)
- Body Scale: base (16px), sm (14px), xs (12px)
- Line Heights: Relaxed (1.6) cho body text, tight (1.2) cho headings

**Spacing System:**

- Base unit: 4px
- Scale: 1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96

**Breakpoints:**

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1439px
- Large Desktop: 1440px+

### Animation Framework

**Transition Timing:**

- Fast: 150ms - Hover states, button interactions
- Medium: 300ms - Card animations, modal transitions
- Slow: 500ms - Page transitions, complex animations

**Easing Functions:**

- ease-out: Hover effects, button states
- ease-in-out: Modal animations, page transitions
- spring: Micro-interactions, loading states

## Components and Interfaces

### Enhanced Navigation System

**Header Component Redesign:**

```typescript
interface HeaderProps {
  variant?: "default" | "transparent" | "solid";
  showCTA?: boolean;
  sticky?: boolean;
}
```

**Features:**

- Glassmorphism effect khi scroll
- Smooth scroll-to-section navigation
- Enhanced mobile hamburger menu với slide animations
- CTA button với gradient background
- Logo animation on hover
- Search functionality (future enhancement)

### Hero Section Enhancement

**Hero Component:**

```typescript
interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  ctaButtons: CTAButton[];
  showStats?: boolean;
  parallaxEffect?: boolean;
}
```

**Features:**

- Parallax scrolling background
- Animated text reveal với stagger effect
- Floating elements animation
- Video background support
- Interactive statistics counters
- Gradient overlay với blend modes

### Card System Redesign

**Service Card Component:**

```typescript
interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  features: string[];
  price?: string;
  badge?: string;
  variant?: "default" | "featured" | "compact";
  hoverEffect?: "lift" | "glow" | "scale";
}
```

**Features:**

- Hover effects với 3D transforms
- Gradient borders và shadows
- Image lazy loading với blur-up effect
- Micro-interactions cho buttons
- Progress indicators cho features
- Glassmorphism backgrounds

### Testimonial Carousel

**Testimonial Component:**

```typescript
interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
  slidesToShow?: number;
  infinite?: boolean;
}
```

**Features:**

- Smooth infinite scroll
- Touch/swipe support
- Auto-play với pause on hover
- Fade transitions giữa slides
- Rating stars animation
- Avatar loading states

### Form Components Enhancement

**Contact Form:**

```typescript
interface ContactFormProps {
  variant?: "inline" | "modal" | "page";
  showValidation?: boolean;
  submitAnimation?: boolean;
  fields: FormField[];
}
```

**Features:**

- Real-time validation với smooth error states
- Loading states với skeleton UI
- Success animations
- Multi-step form support
- File upload với drag-and-drop
- Auto-save functionality

## Data Models

### Image Management System

```typescript
interface ImageAsset {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  format: "webp" | "jpg" | "png";
  placeholder: string; // Base64 blur placeholder
  sizes: {
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
  };
}
```

### Animation Configuration

```typescript
interface AnimationConfig {
  type: "fadeIn" | "slideUp" | "scaleIn" | "parallax";
  duration: number;
  delay?: number;
  easing: string;
  trigger: "scroll" | "hover" | "click" | "load";
  threshold?: number; // For scroll triggers
}
```

### Theme Configuration

```typescript
interface ThemeConfig {
  colors: ColorPalette;
  typography: TypographyScale;
  spacing: SpacingScale;
  shadows: ShadowScale;
  borderRadius: BorderRadiusScale;
  animations: AnimationPresets;
}
```

## Error Handling

### Image Loading Fallbacks

**Strategy:**

1. Show blur placeholder immediately
2. Load WebP format first, fallback to JPG
3. If loading fails, show default healthcare image
4. Implement retry mechanism với exponential backoff
5. Log errors for monitoring

### Animation Performance

**Optimization:**

1. Use `will-change` property cho animated elements
2. Prefer `transform` và `opacity` cho animations
3. Implement `prefers-reduced-motion` support
4. Debounce scroll events
5. Use `IntersectionObserver` cho scroll-triggered animations

### Responsive Breakpoint Handling

**Approach:**

1. Mobile-first design approach
2. Progressive enhancement cho larger screens
3. Flexible grid system với CSS Grid và Flexbox
4. Container queries cho component-level responsiveness
5. Fluid typography với clamp() functions

## Testing Strategy

### Visual Regression Testing

**Tools & Approach:**

- Chromatic cho component-level visual testing
- Percy cho full-page screenshots
- Manual testing trên real devices
- Accessibility testing với axe-core
- Performance testing với Lighthouse

### Animation Testing

**Test Cases:**

1. Animation performance trên low-end devices
2. Reduced motion preferences compliance
3. Animation timing và easing accuracy
4. Memory leaks trong long-running animations
5. Touch interactions trên mobile devices

### Cross-browser Compatibility

**Target Browsers:**

- Chrome 90+ (Primary)
- Safari 14+ (iOS support)
- Firefox 88+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

**Testing Matrix:**

- Desktop: Windows, macOS, Linux
- Mobile: iOS 14+, Android 10+
- Tablet: iPad, Android tablets

### Performance Benchmarks

**Metrics:**

- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms
- Time to Interactive (TTI): < 3.5s

**Optimization Strategies:**

1. Image optimization với next-gen formats
2. Code splitting và lazy loading
3. Critical CSS inlining
4. Resource preloading
5. Service worker caching

## Implementation Phases

### Phase 1: Foundation & Core Components

- Design system setup
- Enhanced Header/Footer
- Basic animation framework
- Image optimization system

### Phase 2: Page Enhancements

- Hero section redesign
- Service cards enhancement
- Testimonial carousel
- Contact forms improvement

### Phase 3: Advanced Features

- Scroll animations
- Micro-interactions
- Performance optimizations
- Accessibility improvements

### Phase 4: Polish & Testing

- Cross-browser testing
- Performance auditing
- User acceptance testing
- Final optimizations

## Accessibility Considerations

### WCAG 2.1 AA Compliance

**Requirements:**

- Color contrast ratio ≥ 4.5:1 cho normal text
- Color contrast ratio ≥ 3:1 cho large text
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators
- Alternative text cho images

### Motion & Animation

**Considerations:**

- Respect `prefers-reduced-motion` setting
- Provide pause controls cho auto-playing content
- Avoid seizure-inducing animations
- Ensure animations don't interfere với screen readers

### Touch Targets

**Standards:**

- Minimum 44px × 44px touch targets
- Adequate spacing giữa interactive elements
- Hover states adaptation cho touch devices
- Gesture support cho mobile interactions
