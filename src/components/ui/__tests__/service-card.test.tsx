import { render, screen, fireEvent } from "@testing-library/react";
import { ServiceCard } from "../service-card";

describe("ServiceCard", () => {
  const defaultProps = {
    title: "Test Service",
    description: "Test description",
    features: ["Feature 1", "Feature 2", "Feature 3"],
  };

  it("renders basic service card correctly", () => {
    render(<ServiceCard {...defaultProps} />);

    expect(screen.getByText("Test Service")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
    expect(screen.getByText("Feature 2")).toBeInTheDocument();
    expect(screen.getByText("Feature 3")).toBeInTheDocument();
  });

  it("renders with image when provided", () => {
    render(
      <ServiceCard {...defaultProps} image="https://example.com/image.jpg" />
    );

    const image = screen.getByAltText("Test Service");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
  });

  it("renders price when provided", () => {
    render(
      <ServiceCard
        {...defaultProps}
        price="$100/day"
        image="https://example.com/image.jpg"
      />
    );

    expect(screen.getByText("$100/day")).toBeInTheDocument();
  });

  it("renders badge when provided", () => {
    render(<ServiceCard {...defaultProps} badge="Popular" />);

    expect(screen.getByText("Popular")).toBeInTheDocument();
  });

  it("renders rating when showRating is true", () => {
    render(<ServiceCard {...defaultProps} showRating={true} rating={4} />);

    expect(screen.getByText("(4/5)")).toBeInTheDocument();
  });

  it("calls onButtonClick when button is clicked", () => {
    const mockClick = jest.fn();
    render(
      <ServiceCard
        {...defaultProps}
        onButtonClick={mockClick}
        buttonText="Click me"
      />
    );

    const button = screen.getByText("Click me");
    fireEvent.click(button);

    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it("renders compact variant correctly", () => {
    render(
      <ServiceCard
        {...defaultProps}
        variant="compact"
        features={[
          "Feature 1",
          "Feature 2",
          "Feature 3",
          "Feature 4",
          "Feature 5",
        ]}
      />
    );

    // Compact variant should only show first 3 features
    expect(screen.getByText("Feature 1")).toBeInTheDocument();
    expect(screen.getByText("Feature 2")).toBeInTheDocument();
    expect(screen.getByText("Feature 3")).toBeInTheDocument();
    expect(screen.getByText("+2 tính năng khác")).toBeInTheDocument();
  });

  it("applies correct CSS classes for different variants", () => {
    const { rerender } = render(
      <ServiceCard {...defaultProps} variant="default" />
    );

    let card = screen.getByText("Test Service").closest(".group");
    expect(card).toHaveClass("bg-white/80");

    rerender(<ServiceCard {...defaultProps} variant="featured" />);
    card = screen.getByText("Test Service").closest(".group");
    expect(card).toHaveClass("bg-gradient-to-br");

    rerender(<ServiceCard {...defaultProps} variant="compact" />);
    card = screen.getByText("Test Service").closest(".group");
    expect(card).toHaveClass("bg-white/70");
  });
});
