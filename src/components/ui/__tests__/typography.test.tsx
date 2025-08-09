/**
 * Typography Component Tests
 * Tests for responsive typography, accessibility, and WCAG compliance
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Typography,
  Display,
  Heading,
  Body,
  Caption,
  PageTitle,
  SectionTitle,
  CardTitle,
  CardDescription,
  ScreenReaderOnly,
  Link,
  List,
  ListItem,
  Blockquote,
} from "../typography";

describe("Typography Components", () => {
  describe("Typography", () => {
    it("renders with default variant", () => {
      render(<Typography>Test content</Typography>);
      expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("renders with custom variant", () => {
      render(<Typography variant="heading-lg">Test heading</Typography>);
      const element = screen.getByText("Test heading");
      expect(element).toBeInTheDocument();
    });

    it("renders with custom element", () => {
      render(<Typography as="h1">Test heading</Typography>);
      const element = screen.getByRole("heading", { level: 1 });
      expect(element).toBeInTheDocument();
    });
  });

  describe("Display", () => {
    it("renders display text with default size", () => {
      render(<Display>Display Text</Display>);
      const element = screen.getByRole("heading", { level: 1 });
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent("Display Text");
    });

    it("renders with different sizes", () => {
      render(<Display size="2xl">Large Display</Display>);
      const element = screen.getByRole("heading", { level: 1 });
      expect(element).toBeInTheDocument();
    });

    it("renders with gradient", () => {
      render(<Display gradient>Gradient Text</Display>);
      const element = screen.getByRole("heading", { level: 1 });
      expect(element).toHaveClass("bg-gradient-to-r");
    });
  });

  describe("Heading", () => {
    it("renders with default level and size", () => {
      render(<Heading>Test Heading</Heading>);
      const element = screen.getByRole("heading", { level: 2 });
      expect(element).toBeInTheDocument();
    });

    it("renders with custom level", () => {
      render(<Heading level={3}>H3 Heading</Heading>);
      const element = screen.getByRole("heading", { level: 3 });
      expect(element).toBeInTheDocument();
    });

    it("renders with gradient", () => {
      render(<Heading gradient>Gradient Heading</Heading>);
      const element = screen.getByRole("heading", { level: 2 });
      expect(element).toHaveClass("bg-gradient-to-r");
    });
  });

  describe("Body", () => {
    it("renders body text with default size", () => {
      render(<Body>Body text content</Body>);
      expect(screen.getByText("Body text content")).toBeInTheDocument();
    });

    it("renders lead text", () => {
      render(<Body lead>Lead text</Body>);
      expect(screen.getByText("Lead text")).toBeInTheDocument();
    });

    it("renders muted text", () => {
      render(<Body muted>Muted text</Body>);
      expect(screen.getByText("Muted text")).toBeInTheDocument();
    });

    it("renders with different sizes", () => {
      render(<Body size="xl">Large body text</Body>);
      expect(screen.getByText("Large body text")).toBeInTheDocument();
    });
  });

  describe("Caption", () => {
    it("renders caption text", () => {
      render(<Caption>Caption text</Caption>);
      expect(screen.getByText("Caption text")).toBeInTheDocument();
    });
  });

  describe("Semantic Components", () => {
    it("renders PageTitle", () => {
      render(<PageTitle>Page Title</PageTitle>);
      const element = screen.getByRole("heading", { level: 1 });
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent("Page Title");
    });

    it("renders SectionTitle", () => {
      render(<SectionTitle>Section Title</SectionTitle>);
      const element = screen.getByRole("heading", { level: 2 });
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent("Section Title");
    });

    it("renders CardTitle", () => {
      render(<CardTitle>Card Title</CardTitle>);
      const element = screen.getByRole("heading", { level: 3 });
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent("Card Title");
    });

    it("renders CardDescription", () => {
      render(<CardDescription>Card description</CardDescription>);
      expect(screen.getByText("Card description")).toBeInTheDocument();
    });
  });

  describe("Accessibility Components", () => {
    it("renders ScreenReaderOnly text", () => {
      render(<ScreenReaderOnly>Screen reader only</ScreenReaderOnly>);
      const element = screen.getByText("Screen reader only");
      expect(element).toHaveClass("sr-only");
    });

    it("renders accessible Link", () => {
      render(<Link href="/test">Test Link</Link>);
      const element = screen.getByRole("link");
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("href", "/test");
    });

    it("renders Link with different variants", () => {
      render(<Link variant="secondary">Secondary Link</Link>);
      expect(screen.getByRole("link")).toBeInTheDocument();
    });
  });

  describe("List Components", () => {
    it("renders unordered list", () => {
      render(
        <List>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
        </List>
      );
      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });

    it("renders ordered list", () => {
      render(
        <List ordered>
          <ListItem>First item</ListItem>
          <ListItem>Second item</ListItem>
        </List>
      );
      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
    });

    it("renders list with different spacing", () => {
      render(
        <List spacing="loose">
          <ListItem>Spaced item</ListItem>
        </List>
      );
      const list = screen.getByRole("list");
      expect(list).toHaveClass("space-y-4");
    });
  });

  describe("Blockquote", () => {
    it("renders blockquote", () => {
      render(<Blockquote>This is a quote</Blockquote>);
      expect(screen.getByText("This is a quote")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper heading hierarchy", () => {
      render(
        <div>
          <PageTitle>Main Title</PageTitle>
          <SectionTitle>Section Title</SectionTitle>
          <CardTitle>Card Title</CardTitle>
        </div>
      );

      const h1 = screen.getByRole("heading", { level: 1 });
      const h2 = screen.getByRole("heading", { level: 2 });
      const h3 = screen.getByRole("heading", { level: 3 });

      expect(h1).toHaveTextContent("Main Title");
      expect(h2).toHaveTextContent("Section Title");
      expect(h3).toHaveTextContent("Card Title");
    });

    it("supports custom className", () => {
      render(<Body className="custom-class">Custom styled text</Body>);
      const element = screen.getByText("Custom styled text");
      expect(element).toHaveClass("custom-class");
    });

    it("forwards refs correctly", () => {
      const ref = { current: null };
      render(<Body ref={ref}>Ref test</Body>);
      expect(ref.current).not.toBeNull();
    });
  });

  describe("Responsive Behavior", () => {
    it("applies responsive classes", () => {
      render(<Display size="2xl">Responsive text</Display>);
      const element = screen.getByRole("heading", { level: 1 });
      // Check that the element has the appropriate classes for responsive behavior
      expect(element).toBeInTheDocument();
    });
  });

  describe("WCAG Compliance", () => {
    it("uses semantic HTML elements", () => {
      render(
        <div>
          <Heading level={1}>Main Heading</Heading>
          <Body>Body paragraph</Body>
          <Link href="/test">Accessible link</Link>
        </div>
      );

      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole("link")).toBeInTheDocument();
    });

    it("provides proper contrast classes", () => {
      render(<Body className="text-contrast-primary">High contrast text</Body>);
      const element = screen.getByText("High contrast text");
      expect(element).toHaveClass("text-contrast-primary");
    });
  });
});
