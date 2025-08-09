# Loading States and Skeleton Components

A comprehensive loading states system for the WeCare247 application, providing smooth user experiences during data loading and async operations.

## Overview

This system includes:

- **Skeleton Components**: Placeholder components that mimic the structure of content while loading
- **Loading Spinners**: Various animated loading indicators
- **Progress Bars**: Visual progress indicators for operations with known duration
- **Loading Overlays**: Full-screen or component-level loading states
- **Page Transitions**: Smooth transitions between different application states
- **Loading State Hooks**: React hooks for managing async operations and loading states

## Components

### Skeleton Components

#### Basic Skeleton

```tsx
import { Skeleton } from '@/components/ui/skeleton';

// Basic skeleton with different variants
<Skeleton className="h-4 w-full" />
<Skeleton className="h-4 w-3/4" variant="shimmer" />
<Skeleton className="h-8 w-1/2" variant="pulse" />
```

#### Specialized Skeletons

```tsx
import {
  SkeletonText,
  SkeletonCard,
  SkeletonAvatar,
  SkeletonButton
} from '@/components/ui/skeleton';

// Multi-line text skeleton
<SkeletonText lines={3} />

// Card-like skeleton
<SkeletonCard />

// Avatar skeleton with different sizes
<SkeletonAvatar size="lg" />

// Button skeleton
<SkeletonButton size="md" />
```

#### Content-Specific Skeletons

```tsx
import {
  ServiceCardSkeleton,
  TestimonialSkeleton,
  ContactFormSkeleton,
  HeroSkeleton
} from '@/components/ui/loading-states';

// Service card loading state
<ServiceCardSkeleton />

// Testimonial loading state
<TestimonialSkeleton />

// Contact form loading state
<ContactFormSkeleton />

// Hero section loading state
<HeroSkeleton />
```

### Loading Spinners

```tsx
import { LoadingSpinner } from '@/components/ui/loading-states';

// Default spinning loader
<LoadingSpinner size="lg" />

// Animated dots
<LoadingSpinner variant="dots" size="md" />

// Pulsing glow effect
<LoadingSpinner variant="pulse" size="sm" />
```

### Progress Bars

```tsx
import { ProgressBar } from '@/components/ui/loading-states';

// Basic progress bar
<ProgressBar value={50} max={100} />

// Gradient progress bar
<ProgressBar value={75} variant="gradient" />

// Striped animated progress bar
<ProgressBar value={25} variant="striped" />
```

### Loading Overlays

```tsx
import { LoadingOverlay } from '@/components/ui/loading-states';

// Basic overlay
<LoadingOverlay isLoading={isLoading} text="Loading...">
  <YourContent />
</LoadingOverlay>

// Blur backdrop overlay
<LoadingOverlay
  isLoading={isLoading}
  backdrop="blur"
  text="Processing your request..."
>
  <YourContent />
</LoadingOverlay>
```

### Page Transitions

```tsx
import { PageTransition, RouteTransition } from '@/components/ui/page-transition';

// Manual page transition
<PageTransition
  isLoading={isLoading}
  variant="fade"
  loadingText="Loading page..."
>
  <PageContent />
</PageTransition>

// Route-based transition
<RouteTransition pathname={location.pathname} variant="slide">
  <Routes>
    {/* Your routes */}
  </Routes>
</RouteTransition>
```

### Progressive Loading

```tsx
import { ProgressiveLoading } from "@/components/ui/page-transition";

const stages = [
  { name: "Initializing", description: "Setting up..." },
  { name: "Loading Data", description: "Fetching content..." },
  { name: "Processing", description: "Processing data..." },
  { name: "Finalizing", description: "Completing setup..." },
];

<ProgressiveLoading
  stages={stages}
  currentStage={currentStage}
  progress={progress}
  error={error}
/>;
```

## Hooks

### useLoadingState

Manages loading state for async operations with automatic error handling and abort support.

```tsx
import { useLoadingState } from "@/hooks/use-loading-state";

function MyComponent() {
  const loadingState = useLoadingState({
    onSuccess: (data) => console.log("Success:", data),
    onError: (error) => console.error("Error:", error),
  });

  const handleSubmit = async () => {
    await loadingState.execute(async (signal) => {
      const response = await fetch("/api/data", { signal });
      return response.json();
    });
  };

  return (
    <div>
      <button onClick={handleSubmit} disabled={loadingState.isLoading}>
        {loadingState.isLoading ? "Loading..." : "Submit"}
      </button>
      {loadingState.error && <p>Error: {loadingState.error.message}</p>}
      {loadingState.data && <p>Success: {loadingState.data.message}</p>}
    </div>
  );
}
```

### useMultipleLoadingStates

Manages multiple independent loading states.

```tsx
import { useMultipleLoadingStates } from "@/hooks/use-loading-state";

function MyComponent() {
  const loadingStates = useMultipleLoadingStates();

  const loadUserData = async () => {
    loadingStates.setLoading("user", true);
    try {
      const userData = await fetchUserData();
      loadingStates.setData("user", userData);
    } catch (error) {
      loadingStates.setError("user", error);
    }
  };

  const loadPostsData = async () => {
    loadingStates.setLoading("posts", true);
    try {
      const postsData = await fetchPostsData();
      loadingStates.setData("posts", postsData);
    } catch (error) {
      loadingStates.setError("posts", error);
    }
  };

  return (
    <div>
      <div>
        User:{" "}
        {loadingStates.getState("user").isLoading ? "Loading..." : "Loaded"}
      </div>
      <div>
        Posts:{" "}
        {loadingStates.getState("posts").isLoading ? "Loading..." : "Loaded"}
      </div>
      <div>Any loading: {loadingStates.isAnyLoading() ? "Yes" : "No"}</div>
    </div>
  );
}
```

### useProgressiveLoading

Manages multi-stage loading processes with progress tracking.

```tsx
import { useProgressiveLoading } from "@/hooks/use-loading-state";

function MyComponent() {
  const progressiveLoading = useProgressiveLoading([
    "Initializing",
    "Loading Data",
    "Processing",
    "Finalizing",
  ]);

  const startProcess = async () => {
    progressiveLoading.startLoading();

    try {
      // Stage 0: Initialize
      await initialize();
      progressiveLoading.completeStage(0);

      // Stage 1: Load data
      await loadData();
      progressiveLoading.completeStage(1);

      // Stage 2: Process
      await processData();
      progressiveLoading.completeStage(2);

      // Stage 3: Finalize
      await finalize();
      progressiveLoading.completeStage(3);
    } catch (error) {
      progressiveLoading.failStage(error);
    }
  };

  return (
    <div>
      <button onClick={startProcess} disabled={progressiveLoading.isLoading}>
        Start Process
      </button>
      <div>Progress: {progressiveLoading.progress}%</div>
      <div>Current Stage: {progressiveLoading.currentStageName}</div>
    </div>
  );
}
```

## Styling and Customization

### CSS Custom Properties

The loading components use CSS custom properties for consistent theming:

```css
:root {
  /* Animation durations */
  --duration-fast: 150ms;
  --duration-medium: 300ms;
  --duration-slow: 500ms;

  /* Easing functions */
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Tailwind Animations

Custom animations defined in `tailwind.config.ts`:

```typescript
keyframes: {
  shimmer: {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' },
  },
  'pulse-glow': {
    '0%, 100%': { boxShadow: '0 0 20px rgb(59 130 246 / 0.1)' },
    '50%': { boxShadow: '0 0 30px rgb(59 130 246 / 0.2)' },
  },
},
animation: {
  shimmer: 'shimmer 2s linear infinite',
  'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
}
```

## Accessibility

### Screen Reader Support

- Loading states are properly announced to screen readers
- ARIA labels and roles are used appropriately
- Loading text is provided for context

### Reduced Motion Support

All animations respect the `prefers-reduced-motion` setting:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-shimmer,
  .animate-pulse,
  .animate-spin {
    animation: none;
  }
}
```

### Keyboard Navigation

- Loading overlays don't interfere with keyboard navigation
- Focus management is maintained during loading states
- Interactive elements remain accessible

## Performance Considerations

### Optimization Strategies

1. **Lazy Loading**: Components are loaded only when needed
2. **Memoization**: Expensive calculations are memoized
3. **Abort Controllers**: Network requests can be cancelled
4. **Efficient Animations**: Use `transform` and `opacity` for smooth animations
5. **Memory Management**: Cleanup timers and event listeners

### Best Practices

1. **Use appropriate skeleton variants**: Choose between pulse, shimmer, or default based on content type
2. **Provide meaningful loading text**: Help users understand what's happening
3. **Handle errors gracefully**: Always provide error states and recovery options
4. **Respect user preferences**: Support reduced motion and accessibility settings
5. **Test on slow networks**: Ensure loading states work well on slow connections

## Examples

### Service Card with Loading State

```tsx
import { ServiceCard } from "@/components/ui/service-card";
import { ServiceCardSkeleton } from "@/components/ui/loading-states";
import { useLoadingState } from "@/hooks/use-loading-state";

function ServiceList() {
  const { isLoading, data, execute } = useLoadingState();

  useEffect(() => {
    execute(async () => {
      const response = await fetch("/api/services");
      return response.json();
    });
  }, [execute]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ServiceCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.map((service) => (
        <ServiceCard key={service.id} {...service} />
      ))}
    </div>
  );
}
```

### Form with Loading States

```tsx
import { ContactForm } from "@/components/ui/contact-form";
import { LoadingOverlay } from "@/components/ui/loading-states";
import { useLoadingState } from "@/hooks/use-loading-state";

function ContactPage() {
  const submitState = useLoadingState({
    onSuccess: () => toast.success("Message sent successfully!"),
    onError: (error) => toast.error(error.message),
  });

  const handleSubmit = async (data) => {
    await submitState.execute(async () => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      return response.json();
    });
  };

  return (
    <LoadingOverlay
      isLoading={submitState.isLoading}
      text="Sending your message..."
      backdrop="blur"
    >
      <ContactForm onSubmit={handleSubmit} />
    </LoadingOverlay>
  );
}
```

## Demo

Visit `/loading-demo` to see all loading components in action with interactive examples and customization options.
