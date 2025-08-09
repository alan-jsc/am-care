/**
 * Design System Demo Component
 * Showcases the implemented design tokens and components
 */

import {
  buttonVariants,
  cardVariants,
  cn,
  animationPresets,
} from "@/lib/design-system";
import { useTheme } from "./providers/theme-provider";

export function DesignSystemDemo() {
  const { theme, setTheme, actualTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-6xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="healthcare-text-gradient">WeCare247 Design System</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive design system built for healthcare applications with
            modern UI components and accessibility in mind.
          </p>

          {/* Theme Toggle */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setTheme("light")}
              className={cn(
                "px-3 py-1 rounded-md text-sm transition-colors",
                theme === "light"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              Light
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={cn(
                "px-3 py-1 rounded-md text-sm transition-colors",
                theme === "dark"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              Dark
            </button>
            <button
              onClick={() => setTheme("system")}
              className={cn(
                "px-3 py-1 rounded-md text-sm transition-colors",
                theme === "system"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              System
            </button>
          </div>
          <p className="text-sm text-muted-foreground">
            Current theme: {theme} (resolved: {actualTheme})
          </p>
        </div>

        {/* Color Palette */}
        <section className="space-y-6">
          <h2>Color Palette</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Primary Colors */}
            <div className={cn(cardVariants("default", "default"))}>
              <h3 className="mb-4">Primary</h3>
              <div className="space-y-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                  (shade) => (
                    <div key={shade} className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-md bg-primary-${shade}`}
                      />
                      <span className="text-sm font-mono">primary-{shade}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Secondary Colors */}
            <div className={cn(cardVariants("default", "default"))}>
              <h3 className="mb-4">Secondary</h3>
              <div className="space-y-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                  (shade) => (
                    <div key={shade} className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-md bg-secondary-${shade}`}
                      />
                      <span className="text-sm font-mono">
                        secondary-{shade}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Healthcare Colors */}
            <div className={cn(cardVariants("default", "default"))}>
              <h3 className="mb-4">Healthcare</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-healthcare-mint" />
                  <span className="text-sm font-mono">healthcare-mint</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-healthcare-sky" />
                  <span className="text-sm font-mono">healthcare-sky</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-healthcare-lavender" />
                  <span className="text-sm font-mono">healthcare-lavender</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-healthcare-coral" />
                  <span className="text-sm font-mono">healthcare-coral</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <h2>Typography</h2>
          <div className={cn(cardVariants("default", "default"), "space-y-4")}>
            <h1>Heading 1 - The quick brown fox</h1>
            <h2>Heading 2 - The quick brown fox</h2>
            <h3>Heading 3 - The quick brown fox</h3>
            <h4>Heading 4 - The quick brown fox</h4>
            <h5>Heading 5 - The quick brown fox</h5>
            <h6>Heading 6 - The quick brown fox</h6>
            <p className="text-lg">
              Large paragraph text - The quick brown fox jumps over the lazy
              dog.
            </p>
            <p>
              Regular paragraph text - The quick brown fox jumps over the lazy
              dog.
            </p>
            <p className="text-sm">
              Small paragraph text - The quick brown fox jumps over the lazy
              dog.
            </p>
            <p className="text-xs">
              Extra small text - The quick brown fox jumps over the lazy dog.
            </p>
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-6">
          <h2>Buttons</h2>
          <div className={cn(cardVariants("default", "default"), "space-y-6")}>
            <div className="space-y-4">
              <h4>Primary Buttons</h4>
              <div className="flex flex-wrap gap-4">
                <button className={buttonVariants("primary", "sm")}>
                  Small
                </button>
                <button className={buttonVariants("primary", "default")}>
                  Default
                </button>
                <button className={buttonVariants("primary", "lg")}>
                  Large
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h4>Secondary Buttons</h4>
              <div className="flex flex-wrap gap-4">
                <button className={buttonVariants("secondary", "sm")}>
                  Small
                </button>
                <button className={buttonVariants("secondary", "default")}>
                  Default
                </button>
                <button className={buttonVariants("secondary", "lg")}>
                  Large
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h4>Outline Buttons</h4>
              <div className="flex flex-wrap gap-4">
                <button className={buttonVariants("outline", "sm")}>
                  Small
                </button>
                <button className={buttonVariants("outline", "default")}>
                  Default
                </button>
                <button className={buttonVariants("outline", "lg")}>
                  Large
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h4>Ghost Buttons</h4>
              <div className="flex flex-wrap gap-4">
                <button className={buttonVariants("ghost", "sm")}>Small</button>
                <button className={buttonVariants("ghost", "default")}>
                  Default
                </button>
                <button className={buttonVariants("ghost", "lg")}>Large</button>
              </div>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-6">
          <h2>Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={cardVariants("default", "default")}>
              <h4 className="mb-2">Default Card</h4>
              <p className="text-muted-foreground">
                This is a default card with basic styling.
              </p>
            </div>

            <div className={cardVariants("elevated", "default")}>
              <h4 className="mb-2">Elevated Card</h4>
              <p className="text-muted-foreground">
                This card has hover effects and elevation.
              </p>
            </div>

            <div className={cardVariants("glass", "default")}>
              <h4 className="mb-2">Glass Card</h4>
              <p className="text-muted-foreground">
                This card uses glassmorphism effects.
              </p>
            </div>
          </div>
        </section>

        {/* Animations */}
        <section className="space-y-6">
          <h2>Animations</h2>
          <div className={cn(cardVariants("default", "default"), "space-y-4")}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className={cn(
                  "p-4 bg-primary-50 rounded-lg",
                  animationPresets.fadeIn
                )}
              >
                <h5>Fade In</h5>
                <p className="text-sm text-muted-foreground">animate-fade-in</p>
              </div>

              <div
                className={cn(
                  "p-4 bg-secondary-50 rounded-lg",
                  animationPresets.slideUp
                )}
              >
                <h5>Slide Up</h5>
                <p className="text-sm text-muted-foreground">
                  animate-slide-up
                </p>
              </div>

              <div
                className={cn(
                  "p-4 bg-success-50 rounded-lg",
                  animationPresets.scaleIn
                )}
              >
                <h5>Scale In</h5>
                <p className="text-sm text-muted-foreground">
                  animate-scale-in
                </p>
              </div>
            </div>

            <div className="p-4 bg-warning-50 rounded-lg shimmer">
              <h5>Shimmer Effect</h5>
              <p className="text-sm text-muted-foreground">
                Loading placeholder with shimmer animation
              </p>
            </div>
          </div>
        </section>

        {/* Shadows and Effects */}
        <section className="space-y-6">
          <h2>Shadows & Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-card rounded-lg healthcare-shadow-glow">
              <h4 className="mb-2">Primary Glow</h4>
              <p className="text-muted-foreground">
                Card with primary glow shadow
              </p>
            </div>

            <div className="p-6 bg-card rounded-lg healthcare-shadow-glow-secondary">
              <h4 className="mb-2">Secondary Glow</h4>
              <p className="text-muted-foreground">
                Card with secondary glow shadow
              </p>
            </div>

            <div className="p-6 bg-card rounded-lg shadow-card-hover">
              <h4 className="mb-2">Hover Shadow</h4>
              <p className="text-muted-foreground">
                Card with hover shadow effect
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
