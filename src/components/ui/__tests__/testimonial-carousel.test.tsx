import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { TestimonialCarousel } from "../testimonial-carousel";
import { Testimonial } from "@/types/testimonial";

// Mock the hooks
vi.mock("@/hooks/use-touch-swipe", () => ({
  useTouchSwipe: () => ({
    attachSwipeListeners: vi.fn(() => vi.fn()),
  }),
}));

vi.mock("@/hooks/use-reduced-motion", () => ({
  useReducedMotion: () => false,
}));

const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "John Doe",
    role: "Customer",
    company: "Test Company",
    avatar: "https://example.com/avatar1.jpg",
    content: "Great service!",
    rating: 5,
    date: "2024-01-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "Client",
    content: "Excellent experience!",
    rating: 4,
    date: "2024-01-02",
  },
  {
    id: "3",
    name: "Bob Johnson",
    role: "User",
    content: "Highly recommended!",
    rating: 5,
    date: "2024-01-03",
  },
];

describe("TestimonialCarousel", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders testimonials correctly", () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Great service!")).toBeInTheDocument();
    expect(screen.getByText("Customer at Test Company")).toBeInTheDocument();
  });

  it("renders correct number of stars for rating", () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} />);

    // Should render 5 stars total for the first testimonial
    const starContainer = screen.getByText("John Doe").closest(".bg-white");
    const stars = starContainer?.querySelectorAll("svg");
    expect(stars).toHaveLength(5);
  });

  it("shows navigation arrows when showArrows is true", () => {
    render(
      <TestimonialCarousel testimonials={mockTestimonials} showArrows={true} />
    );

    expect(screen.getByLabelText("Previous testimonial")).toBeInTheDocument();
    expect(screen.getByLabelText("Next testimonial")).toBeInTheDocument();
  });

  it("hides navigation arrows when showArrows is false", () => {
    render(
      <TestimonialCarousel testimonials={mockTestimonials} showArrows={false} />
    );

    expect(
      screen.queryByLabelText("Previous testimonial")
    ).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Next testimonial")).not.toBeInTheDocument();
  });

  it("shows dots indicator when showDots is true", () => {
    render(
      <TestimonialCarousel testimonials={mockTestimonials} showDots={true} />
    );

    const dots = screen
      .getAllByRole("button")
      .filter((button) =>
        button.getAttribute("aria-label")?.includes("Go to testimonial")
      );
    expect(dots).toHaveLength(3);
  });

  it("hides dots indicator when showDots is false", () => {
    render(
      <TestimonialCarousel testimonials={mockTestimonials} showDots={false} />
    );

    const dots = screen
      .queryAllByRole("button")
      .filter((button) =>
        button.getAttribute("aria-label")?.includes("Go to testimonial")
      );
    expect(dots).toHaveLength(0);
  });

  it("navigates to next slide when next button is clicked", async () => {
    render(
      <TestimonialCarousel testimonials={mockTestimonials} showArrows={true} />
    );

    const nextButton = screen.getByLabelText("Next testimonial");
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
  });

  it("navigates to previous slide when previous button is clicked", async () => {
    render(
      <TestimonialCarousel testimonials={mockTestimonials} showArrows={true} />
    );

    // First go to next slide
    const nextButton = screen.getByLabelText("Next testimonial");
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });

    // Then go back to previous slide
    const prevButton = screen.getByLabelText("Previous testimonial");
    fireEvent.click(prevButton);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  it("navigates to specific slide when dot is clicked", async () => {
    render(
      <TestimonialCarousel testimonials={mockTestimonials} showDots={true} />
    );

    const thirdDot = screen.getByLabelText("Go to testimonial 3");
    fireEvent.click(thirdDot);

    await waitFor(() => {
      expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
    });
  });

  it("supports keyboard navigation", async () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} />);

    // Navigate with right arrow key
    fireEvent.keyDown(document, { key: "ArrowRight" });

    await waitFor(() => {
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });

    // Navigate with left arrow key
    fireEvent.keyDown(document, { key: "ArrowLeft" });

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  it("auto-plays when autoPlay is enabled", async () => {
    render(
      <TestimonialCarousel
        testimonials={mockTestimonials}
        autoPlay={true}
        autoPlayInterval={1000}
      />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();

    // Fast-forward time
    vi.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
  });

  it("pauses auto-play on hover when pauseOnHover is enabled", async () => {
    render(
      <TestimonialCarousel
        testimonials={mockTestimonials}
        autoPlay={true}
        autoPlayInterval={1000}
        pauseOnHover={true}
      />
    );

    const carousel = screen.getByRole("region");

    // Hover over carousel
    fireEvent.mouseEnter(carousel);

    // Fast-forward time - should not advance
    vi.advanceTimersByTime(2000);

    expect(screen.getByText("John Doe")).toBeInTheDocument();

    // Mouse leave should resume auto-play
    fireEvent.mouseLeave(carousel);
    vi.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
  });

  it("shows play/pause button when autoPlay is enabled", () => {
    render(
      <TestimonialCarousel testimonials={mockTestimonials} autoPlay={true} />
    );

    expect(screen.getByLabelText("Pause carousel")).toBeInTheDocument();
  });

  it("toggles play/pause when play/pause button is clicked", async () => {
    render(
      <TestimonialCarousel testimonials={mockTestimonials} autoPlay={true} />
    );

    const playPauseButton = screen.getByLabelText("Pause carousel");
    fireEvent.click(playPauseButton);

    expect(screen.getByLabelText("Play carousel")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Play carousel"));
    expect(screen.getByLabelText("Pause carousel")).toBeInTheDocument();
  });

  it("handles infinite scroll correctly", async () => {
    render(
      <TestimonialCarousel testimonials={mockTestimonials} infinite={true} />
    );

    // Go to last slide
    const thirdDot = screen.getByLabelText("Go to testimonial 3");
    fireEvent.click(thirdDot);

    await waitFor(() => {
      expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
    });

    // Click next should go to first slide
    const nextButton = screen.getByLabelText("Next testimonial");
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  it("disables navigation at boundaries when infinite is false", () => {
    render(
      <TestimonialCarousel testimonials={mockTestimonials} infinite={false} />
    );

    const prevButton = screen.getByLabelText("Previous testimonial");
    expect(prevButton).toBeDisabled();
  });

  it("renders nothing when testimonials array is empty", () => {
    const { container } = render(<TestimonialCarousel testimonials={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("applies custom className", () => {
    render(
      <TestimonialCarousel
        testimonials={mockTestimonials}
        className="custom-class"
      />
    );

    const carousel = screen.getByRole("region");
    expect(carousel).toHaveClass("custom-class");
  });
});
