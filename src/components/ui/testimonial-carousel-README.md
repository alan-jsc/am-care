# Testimonial Carousel Component

A modern, interactive testimonial carousel component built with React and TypeScript. Features smooth animations, touch/swipe support, auto-play functionality, and full accessibility compliance.

## Features

- ✨ **Smooth Infinite Scroll**: Seamless transitions between testimonials
- 📱 **Touch/Swipe Support**: Native mobile gestures for navigation
- ⏯️ **Auto-play with Pause**: Automatic progression with hover pause
- 🌟 **Animated Rating Stars**: Dynamic star animations with stagger effects
- ♿ **Accessibility Compliant**: Full keyboard navigation and screen reader support
- 🎨 **Customizable Design**: Multiple variants and styling options
- 📱 **Responsive**: Optimized for all screen sizes
- ⚡ **Performance Optimized**: Respects `prefers-reduced-motion` settings

## Usage

### Basic Usage

```tsx
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";
import { Testimonial } from "@/types/testimonial";

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "John Doe",
    role: "Customer",
    company: "Example Corp",
    avatar: "https://example.com/avatar.jpg",
    content: "Great service and excellent support!",
    rating: 5,
    date: "2024-01-15",
  },
  // ... more testimonials
];

function MyComponent() {
  return (
    <TestimonialCarousel
      testimonials={testimonials}
      autoPlay={true}
      showDots={true}
      showArrows={true}
    />
  );
}
```

### Advanced Configuration

```tsx
<TestimonialCarousel
  testimonials={testimonials}
  autoPlay={true}
  autoPlayInterval={4000}
  showDots={true}
  showArrows={true}
  slidesToShow={1}
  infinite={true}
  pauseOnHover={true}
  className="max-w-4xl mx-auto"
/>
```

## Props

| Prop               | Type            | Default      | Description                             |
| ------------------ | --------------- | ------------ | --------------------------------------- |
| `testimonials`     | `Testimonial[]` | **Required** | Array of testimonial objects            |
| `autoPlay`         | `boolean`       | `true`       | Enable automatic slide progression      |
| `autoPlayInterval` | `number`        | `5000`       | Time between slides in milliseconds     |
| `showDots`         | `boolean`       | `true`       | Show dot indicators                     |
| `showArrows`       | `boolean`       | `true`       | Show navigation arrows                  |
| `slidesToShow`     | `number`        | `1`          | Number of slides to show simultaneously |
| `infinite`         | `boolean`       | `true`       | Enable infinite loop                    |
| `pauseOnHover`     | `boolean`       | `true`       | Pause auto-play on hover                |
| `className`        | `string`        | `undefined`  | Additional CSS classes                  |

## Testimonial Data Structure

```typescript
interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar?: string;
  content: string;
  rating: number; // 1-5 stars
  date?: string;
}
```

## Navigation Methods

### Keyboard Navigation

- **Arrow Left/Right**: Navigate between slides
- **Tab**: Focus navigation elements
- **Enter/Space**: Activate focused buttons

### Touch/Swipe Gestures

- **Swipe Left**: Next slide
- **Swipe Right**: Previous slide
- **Configurable threshold**: Minimum swipe distance (default: 50px)

### Mouse Interaction

- **Click arrows**: Navigate slides
- **Click dots**: Jump to specific slide
- **Hover**: Pause auto-play (if enabled)

## Accessibility Features

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Visible focus indicators
- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **Semantic HTML**: Proper heading hierarchy and structure

## Styling & Customization

### CSS Classes

The component uses Tailwind CSS classes and can be customized through:

- **Custom className**: Pass additional classes via `className` prop
- **CSS Variables**: Override design tokens
- **Tailwind Utilities**: Use utility classes for spacing, colors, etc.

### Animation Customization

```tsx
// Disable animations for users who prefer reduced motion
const prefersReducedMotion = useReducedMotion();

<TestimonialCarousel
  testimonials={testimonials}
  // Animations automatically disabled if user prefers reduced motion
/>;
```

## Performance Considerations

- **Lazy Loading**: Avatar images are loaded lazily
- **Optimized Animations**: Uses `transform` and `opacity` for smooth performance
- **Memory Management**: Proper cleanup of event listeners and timers
- **Reduced Motion**: Respects accessibility preferences

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Touch Events**: Full support for touch and pointer events

## Examples

### Minimal Configuration

```tsx
<TestimonialCarousel
  testimonials={testimonials}
  autoPlay={false}
  showDots={false}
  showArrows={false}
/>
```

### Auto-play with Custom Timing

```tsx
<TestimonialCarousel
  testimonials={testimonials}
  autoPlay={true}
  autoPlayInterval={3000}
  pauseOnHover={true}
/>
```

### Non-infinite Carousel

```tsx
<TestimonialCarousel
  testimonials={testimonials}
  infinite={false}
  showArrows={true}
/>
```

## Integration with Existing Components

The testimonial carousel integrates seamlessly with:

- **Image Management System**: Uses optimized image loading
- **Animation Framework**: Leverages existing animation utilities
- **Design System**: Follows established design tokens
- **Theme Provider**: Supports light/dark themes

## Testing

The component includes comprehensive tests covering:

- **Rendering**: Proper display of testimonials and controls
- **Navigation**: Arrow clicks, dot navigation, keyboard controls
- **Auto-play**: Timer functionality and pause behavior
- **Touch Events**: Swipe gesture handling
- **Accessibility**: Screen reader compatibility and keyboard navigation

Run tests with:

```bash
npm test testimonial-carousel.test.tsx
```

## Dependencies

- **React 18+**: Core framework
- **TypeScript**: Type safety
- **Lucide React**: Icons (ChevronLeft, ChevronRight, Star)
- **Tailwind CSS**: Styling
- **Custom Hooks**: Touch handling and reduced motion detection

## Related Components

- **ServiceCard**: For service testimonials
- **ImageAsset**: For optimized avatar loading
- **Animated**: For scroll-triggered animations
- **HeroSection**: For landing page integration
