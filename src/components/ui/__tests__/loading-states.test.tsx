import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
  LoadingSpinner,
  ProgressBar,
  LoadingOverlay,
  ServiceCardSkeleton,
  TestimonialSkeleton,
  ContactFormSkeleton,
  HeroSkeleton,
} from "../loading-states";

describe("LoadingSpinner", () => {
  it("renders default spinner", () => {
    render(<LoadingSpinner data-testid="spinner" />);
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("animate-spin");
  });

  it("renders dots variant", () => {
    render(<LoadingSpinner variant="dots" data-testid="dots-spinner" />);
    const spinner = screen.getByTestId("dots-spinner");
    expect(spinner).toBeInTheDocument();
    expect(spinner.children).toHaveLength(3);
  });

  it("renders pulse variant", () => {
    render(<LoadingSpinner variant="pulse" data-testid="pulse-spinner" />);
    const spinner = screen.getByTestId("pulse-spinner");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("animate-pulse-glow");
  });

  it("applies size classes correctly", () => {
    const { rerender } = render(
      <LoadingSpinner size="sm" data-testid="spinner" />
    );
    expect(screen.getByTestId("spinner")).toHaveClass("h-4", "w-4");

    rerender(<LoadingSpinner size="md" data-testid="spinner" />);
    expect(screen.getByTestId("spinner")).toHaveClass("h-6", "w-6");

    rerender(<LoadingSpinner size="lg" data-testid="spinner" />);
    expect(screen.getByTestId("spinner")).toHaveClass("h-8", "w-8");
  });
});

describe("ProgressBar", () => {
  it("renders with correct progress percentage", () => {
    render(<ProgressBar value={50} max={100} data-testid="progress" />);
    const progressBar = screen.getByTestId("progress");
    const progressFill = progressBar.querySelector("div");

    expect(progressBar).toBeInTheDocument();
    expect(progressFill).toHaveStyle({ width: "50%" });
  });

  it("handles edge cases for progress values", () => {
    const { rerender } = render(
      <ProgressBar value={-10} data-testid="progress" />
    );
    let progressFill = screen.getByTestId("progress").querySelector("div");
    expect(progressFill).toHaveStyle({ width: "0%" });

    rerender(<ProgressBar value={150} max={100} data-testid="progress" />);
    progressFill = screen.getByTestId("progress").querySelector("div");
    expect(progressFill).toHaveStyle({ width: "100%" });
  });

  it("applies variant classes correctly", () => {
    const { rerender } = render(
      <ProgressBar variant="default" data-testid="progress" />
    );
    let progressFill = screen.getByTestId("progress").querySelector("div");
    expect(progressFill).toHaveClass("bg-primary");

    rerender(<ProgressBar variant="gradient" data-testid="progress" />);
    progressFill = screen.getByTestId("progress").querySelector("div");
    expect(progressFill).toHaveClass("bg-gradient-to-r");

    rerender(<ProgressBar variant="striped" data-testid="progress" />);
    progressFill = screen.getByTestId("progress").querySelector("div");
    expect(progressFill).toHaveClass("animate-pulse");
  });
});

describe("LoadingOverlay", () => {
  it("shows overlay when loading", () => {
    render(
      <LoadingOverlay isLoading={true} data-testid="overlay">
        <div>Content</div>
      </LoadingOverlay>
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByRole("status", { hidden: true })).toBeInTheDocument();
  });

  it("hides overlay when not loading", () => {
    render(
      <LoadingOverlay isLoading={false} data-testid="overlay">
        <div>Content</div>
      </LoadingOverlay>
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(
      screen.queryByRole("status", { hidden: true })
    ).not.toBeInTheDocument();
  });

  it("displays custom loading text", () => {
    render(
      <LoadingOverlay isLoading={true} text="Custom loading message">
        <div>Content</div>
      </LoadingOverlay>
    );

    expect(screen.getByText("Custom loading message")).toBeInTheDocument();
  });

  it("applies backdrop variants correctly", () => {
    const { rerender } = render(
      <LoadingOverlay isLoading={true} backdrop="light" data-testid="overlay">
        <div>Content</div>
      </LoadingOverlay>
    );

    let overlay = screen
      .getByTestId("overlay")
      .querySelector('[class*="absolute"]');
    expect(overlay).toHaveClass("bg-background/80");

    rerender(
      <LoadingOverlay isLoading={true} backdrop="blur" data-testid="overlay">
        <div>Content</div>
      </LoadingOverlay>
    );

    overlay = screen
      .getByTestId("overlay")
      .querySelector('[class*="absolute"]');
    expect(overlay).toHaveClass("backdrop-blur-sm");
  });
});

describe("Skeleton Components", () => {
  it("renders ServiceCardSkeleton with correct structure", () => {
    render(<ServiceCardSkeleton data-testid="service-skeleton" />);
    const skeleton = screen.getByTestId("service-skeleton");

    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass("border", "rounded-lg", "p-6", "space-y-4");
  });

  it("renders TestimonialSkeleton with correct structure", () => {
    render(<TestimonialSkeleton data-testid="testimonial-skeleton" />);
    const skeleton = screen.getByTestId("testimonial-skeleton");

    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass("p-6", "space-y-4");
  });

  it("renders ContactFormSkeleton with correct structure", () => {
    render(<ContactFormSkeleton data-testid="form-skeleton" />);
    const skeleton = screen.getByTestId("form-skeleton");

    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass("space-y-4");
  });

  it("renders HeroSkeleton with correct structure", () => {
    render(<HeroSkeleton data-testid="hero-skeleton" />);
    const skeleton = screen.getByTestId("hero-skeleton");

    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass("space-y-6", "text-center", "py-20");
  });
});

describe("Accessibility", () => {
  it("loading spinner has proper ARIA attributes", () => {
    render(<LoadingSpinner aria-label="Loading content" />);
    const spinner = screen.getByLabelText("Loading content");
    expect(spinner).toBeInTheDocument();
  });

  it("progress bar has proper ARIA attributes", () => {
    render(
      <ProgressBar
        value={50}
        max={100}
        role="progressbar"
        aria-valuenow={50}
        aria-valuemax={100}
        aria-label="Loading progress"
      />
    );

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "50");
    expect(progressBar).toHaveAttribute("aria-valuemax", "100");
    expect(progressBar).toHaveAttribute("aria-label", "Loading progress");
  });

  it("loading overlay is properly announced to screen readers", () => {
    render(
      <LoadingOverlay isLoading={true} text="Loading content">
        <div>Content</div>
      </LoadingOverlay>
    );

    const loadingText = screen.getByText("Loading content");
    expect(loadingText).toBeInTheDocument();
  });
});

describe("Performance", () => {
  it("does not cause unnecessary re-renders", () => {
    const renderSpy = vi.fn();

    function TestComponent({ isLoading }: { isLoading: boolean }) {
      renderSpy();
      return (
        <LoadingOverlay isLoading={isLoading}>
          <div>Content</div>
        </LoadingOverlay>
      );
    }

    const { rerender } = render(<TestComponent isLoading={false} />);
    expect(renderSpy).toHaveBeenCalledTimes(1);

    rerender(<TestComponent isLoading={true} />);
    expect(renderSpy).toHaveBeenCalledTimes(2);

    rerender(<TestComponent isLoading={true} />);
    expect(renderSpy).toHaveBeenCalledTimes(3);
  });
});
