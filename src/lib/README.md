# WeCare247 Design System

## Overview

This design system provides a comprehensive foundation for building modern, accessible healthcare applications. It includes design tokens, utility functions, and pre-built component variants that ensure consistency across the application.

## Features

### 🎨 Design Tokens

- **Color Palette**: Healthcare-focused colors with primary blue, secondary teal, and semantic colors
- **Typography**: Inter font family with responsive scaling and proper line heights
- **Spacing**: 4px-based spacing system for consistent layouts
- **Shadows**: Custom healthcare-appropriate shadows including glow effects
- **Animations**: Smooth transitions with healthcare-friendly timing

### 🌙 Theme Support

- Light and dark theme support
- System theme detection
- Persistent theme preferences
- CSS custom properties for easy theming

### ♿ Accessibility

- WCAG 2.1 AA compliant color contrasts
- Proper focus indicators
- Reduced motion support
- Touch-friendly target sizes (44px minimum)
- Screen reader support

### 📱 Responsive Design

- Mobile-first approach
- Flexible breakpoint system
- Container queries support
- Responsive typography utilities

## Usage

### Basic Setup

```tsx
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn, buttonVariants } from "@/lib/design-system";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### Using Design Tokens

```tsx
import { designTokens } from "@/lib/design-tokens";

// Access colors
const primaryColor = designTokens.colors.primary[600];

// Access spacing
const spacing = designTokens.spacing[4];

// Access typography
const fontSize = designTokens.typography.fontSize.lg;
```

### Using Utility Functions

```tsx
import { cn, buttonVariants, cardVariants } from "@/lib/design-system";

function MyComponent() {
  return (
    <div className={cn(cardVariants("elevated", "default"))}>
      <button className={buttonVariants("primary", "lg")}>Click me</button>
    </div>
  );
}
```

### Custom CSS Classes

The design system provides several utility classes:

```css
/* Healthcare-specific gradients */
.healthcare-gradient
.healthcare-gradient-secondary

/* Card styles */
.healthcare-card
.healthcare-card-hover

/* Button styles */
.healthcare-button-primary
.healthcare-button-secondary

/* Text gradients */
.healthcare-text-gradient

/* Glassmorphism effects */
.glass
.glass-dark

/* Animation utilities */
.animate-on-scroll
.shimmer

/* Shadow utilities */
.healthcare-shadow-glow
.healthcare-shadow-glow-secondary;
```

## Component Variants

### Button Variants

```tsx
// Primary buttons
buttonVariants("primary", "sm"); // Small primary button
buttonVariants("primary", "default"); // Default primary button
buttonVariants("primary", "lg"); // Large primary button

// Secondary buttons
buttonVariants("secondary", "sm");
buttonVariants("secondary", "default");
buttonVariants("secondary", "lg");

// Outline buttons
buttonVariants("outline", "sm");
buttonVariants("outline", "default");
buttonVariants("outline", "lg");

// Ghost buttons
buttonVariants("ghost", "sm");
buttonVariants("ghost", "default");
buttonVariants("ghost", "lg");
```

### Card Variants

```tsx
// Basic cards
cardVariants("default", "sm"); // Small default card
cardVariants("default", "default"); // Default card
cardVariants("default", "lg"); // Large default card

// Elevated cards (with hover effects)
cardVariants("elevated", "sm");
cardVariants("elevated", "default");
cardVariants("elevated", "lg");

// Glass cards (glassmorphism effect)
cardVariants("glass", "sm");
cardVariants("glass", "default");
cardVariants("glass", "lg");
```

## Animation Presets

```tsx
import { animationPresets } from "@/lib/design-system";

// Basic animations
animationPresets.fadeIn;
animationPresets.slideUp;
animationPresets.scaleIn;
animationPresets.shimmer;
animationPresets.pulseGlow;

// Delayed animations
animationPresets.fadeInDelay100;
animationPresets.slideUpDelay200;
animationPresets.scaleInDelay300;
```

## Color System

### Primary Colors (Healthcare Blue)

- `primary-50` to `primary-950`
- Used for main actions, links, and brand elements

### Secondary Colors (Healthcare Teal)

- `secondary-50` to `secondary-950`
- Used for accents and secondary actions

### Semantic Colors

- **Success**: `success-50` to `success-950` (Green)
- **Warning**: `warning-50` to `warning-950` (Amber)
- **Error**: `error-50` to `error-950` (Red)

### Healthcare Specific Colors

- `healthcare-mint`: Calming mint green
- `healthcare-sky`: Professional sky blue
- `healthcare-lavender`: Soothing lavender
- `healthcare-coral`: Warm coral accent

### Neutral Colors

- `neutral-50` to `neutral-950`
- Used for text, backgrounds, and borders

## Typography Scale

### Font Sizes

- `text-xs` (12px) - Small labels, captions
- `text-sm` (14px) - Secondary text
- `text-base` (16px) - Body text
- `text-lg` (18px) - Large body text
- `text-xl` (20px) - Small headings
- `text-2xl` (24px) - Medium headings
- `text-3xl` (30px) - Large headings
- `text-4xl` (36px) - Extra large headings
- `text-5xl` (48px) - Display text
- `text-6xl` (60px) - Hero text

### Responsive Typography

- `text-responsive-xs` to `text-responsive-3xl`
- Automatically scales on different screen sizes

## Spacing System

Based on 4px increments:

- `0.5` (2px), `1` (4px), `1.5` (6px), `2` (8px)
- `3` (12px), `4` (16px), `6` (24px), `8` (32px)
- `12` (48px), `16` (64px), `20` (80px), `24` (96px)

## Breakpoints

- `xs`: 320px (Extra small devices)
- `sm`: 640px (Small devices)
- `md`: 768px (Medium devices)
- `lg`: 1024px (Large devices)
- `xl`: 1280px (Extra large devices)
- `2xl`: 1536px (2X large devices)

### Healthcare-specific breakpoints

- `mobile`: 320px
- `tablet`: 768px
- `desktop`: 1024px
- `large-desktop`: 1440px

## Testing the Design System

Visit `/design-system` in your application to see a comprehensive demo of all design system components and utilities.

## Best Practices

1. **Use semantic colors**: Choose colors based on meaning (primary, secondary, success, etc.)
2. **Maintain consistency**: Use the provided variants instead of custom styles
3. **Consider accessibility**: Always check color contrast and provide focus indicators
4. **Test responsiveness**: Ensure components work across all breakpoints
5. **Respect motion preferences**: Animations automatically respect `prefers-reduced-motion`

## Contributing

When adding new components or utilities:

1. Follow the existing naming conventions
2. Ensure accessibility compliance
3. Add responsive variants when appropriate
4. Document new additions in this README
5. Test across all themes and breakpoints
