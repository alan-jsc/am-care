/**
 * Typography Demo Component
 * Showcases the responsive typography system with all variants
 */

import React from "react";
import {
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
} from "@/components/ui/typography";
import { Card, CardContent } from "@/components/ui/card";

export function TypographyDemo() {
  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      <div className="text-center">
        <PageTitle gradient>Typography System Demo</PageTitle>
        <Body size="lg" className="text-contrast-secondary max-w-3xl mx-auto">
          Demonstrating the responsive typography system with fluid scaling,
          proper hierarchy, and WCAG AA contrast compliance for ICare.
        </Body>
      </div>

      {/* Display Sizes */}
      <section>
        <SectionTitle>Display Sizes</SectionTitle>
        <div className="space-y-6">
          <div>
            <Caption className="text-contrast-muted mb-2">Display 2XL</Caption>
            <Display size="2xl">Healthcare Excellence</Display>
          </div>
          <div>
            <Caption className="text-contrast-muted mb-2">Display XL</Caption>
            <Display size="xl">Professional Care Services</Display>
          </div>
          <div>
            <Caption className="text-contrast-muted mb-2">Display LG</Caption>
            <Display size="lg">Trusted Healthcare Partners</Display>
          </div>
          <div>
            <Caption className="text-contrast-muted mb-2">Display MD</Caption>
            <Display size="md">Quality Care Solutions</Display>
          </div>
          <div>
            <Caption className="text-contrast-muted mb-2">Display SM</Caption>
            <Display size="sm">Compassionate Service</Display>
          </div>
        </div>
      </section>

      {/* Heading Hierarchy */}
      <section>
        <SectionTitle>Heading Hierarchy</SectionTitle>
        <div className="space-y-4">
          <div>
            <Caption className="text-contrast-muted mb-2">
              Heading XL (H1)
            </Caption>
            <Heading level={1} size="xl">
              Main Page Heading
            </Heading>
          </div>
          <div>
            <Caption className="text-contrast-muted mb-2">
              Heading LG (H2)
            </Caption>
            <Heading level={2} size="lg">
              Section Heading
            </Heading>
          </div>
          <div>
            <Caption className="text-contrast-muted mb-2">
              Heading MD (H3)
            </Caption>
            <Heading level={3} size="md">
              Subsection Heading
            </Heading>
          </div>
          <div>
            <Caption className="text-contrast-muted mb-2">
              Heading SM (H4)
            </Caption>
            <Heading level={4} size="sm">
              Component Heading
            </Heading>
          </div>
          <div>
            <Caption className="text-contrast-muted mb-2">
              Heading XS (H5)
            </Caption>
            <Heading level={5} size="xs">
              Small Heading
            </Heading>
          </div>
        </div>
      </section>

      {/* Body Text Sizes */}
      <section>
        <SectionTitle>Body Text Sizes</SectionTitle>
        <div className="space-y-4">
          <div>
            <Caption className="text-contrast-muted mb-2">Body XL</Caption>
            <Body size="xl">
              This is extra large body text, perfect for lead paragraphs and
              important content that needs to stand out while maintaining
              excellent readability.
            </Body>
          </div>
          <div>
            <Caption className="text-contrast-muted mb-2">Body LG</Caption>
            <Body size="lg">
              This is large body text, ideal for introductory paragraphs and
              content that should be easily readable across all devices.
            </Body>
          </div>
          <div>
            <Caption className="text-contrast-muted mb-2">
              Body MD (Default)
            </Caption>
            <Body size="md">
              This is medium body text, the standard size for most content. It
              provides optimal readability with a line height of 1.6 for
              comfortable reading.
            </Body>
          </div>
          <div>
            <Caption className="text-contrast-muted mb-2">Body SM</Caption>
            <Body size="sm">
              This is small body text, suitable for secondary information,
              captions, and supporting content that doesn't need to be as
              prominent.
            </Body>
          </div>
          <div>
            <Caption className="text-contrast-muted mb-2">Body XS</Caption>
            <Body size="xs">
              This is extra small body text, used for fine print, legal text,
              and minimal supporting information.
            </Body>
          </div>
        </div>
      </section>

      {/* Semantic Components */}
      <section>
        <SectionTitle>Semantic Components</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <CardTitle>Service Card Example</CardTitle>
              <CardDescription>
                This demonstrates how the typography system works within card
                components, providing consistent spacing and hierarchy.
              </CardDescription>
              <Body size="sm" className="text-contrast-muted">
                Additional details can be provided using smaller text sizes
                while maintaining proper contrast ratios.
              </Body>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <CardTitle>Healthcare Services</CardTitle>
              <CardDescription>
                Professional care services with experienced healthcare providers
                available 24/7 for your peace of mind.
              </CardDescription>
              <List spacing="normal">
                <ListItem>24/7 professional care</ListItem>
                <ListItem>Experienced healthcare providers</ListItem>
                <ListItem>Personalized care plans</ListItem>
                <ListItem>Emergency response available</ListItem>
              </List>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Special Text Styles */}
      <section>
        <SectionTitle>Special Text Styles</SectionTitle>
        <div className="space-y-6">
          <div>
            <Caption className="text-contrast-muted mb-2">Lead Text</Caption>
            <Body lead>
              This is lead text, designed to introduce sections or articles with
              slightly larger text that draws attention while remaining
              readable.
            </Body>
          </div>

          <div>
            <Caption className="text-contrast-muted mb-2">Muted Text</Caption>
            <Body muted>
              This is muted text, used for secondary information that should be
              less prominent but still accessible and readable.
            </Body>
          </div>

          <div>
            <Caption className="text-contrast-muted mb-2">
              Gradient Text
            </Caption>
            <Heading gradient size="lg">
              ICare - Professional Healthcare
            </Heading>
          </div>

          <div>
            <Caption className="text-contrast-muted mb-2">Caption Text</Caption>
            <Caption>
              This is caption text, perfect for image captions, footnotes, and
              small supporting information.
            </Caption>
          </div>
        </div>
      </section>

      {/* Links and Interactive Text */}
      <section>
        <SectionTitle>Links and Interactive Elements</SectionTitle>
        <div className="space-y-4">
          <div>
            <Caption className="text-contrast-muted mb-2">
              Primary Links
            </Caption>
            <Body>
              Visit our <Link href="/services">healthcare services</Link> page
              to learn more about our comprehensive care options.
            </Body>
          </div>

          <div>
            <Caption className="text-contrast-muted mb-2">
              Secondary Links
            </Caption>
            <Body>
              Check out our{" "}
              <Link variant="secondary" href="/about">
                about us
              </Link>{" "}
              section for company information.
            </Body>
          </div>

          <div>
            <Caption className="text-contrast-muted mb-2">Muted Links</Caption>
            <Body>
              Read our{" "}
              <Link variant="muted" href="/privacy">
                privacy policy
              </Link>{" "}
              and
              <Link variant="muted" href="/terms">
                {" "}
                terms of service
              </Link>
              .
            </Body>
          </div>
        </div>
      </section>

      {/* Lists */}
      <section>
        <SectionTitle>Lists and Content Structure</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Heading level={3} size="md" className="mb-4">
              Unordered List
            </Heading>
            <List spacing="normal">
              <ListItem>Professional healthcare providers</ListItem>
              <ListItem>24/7 availability and support</ListItem>
              <ListItem>Personalized care plans</ListItem>
              <ListItem>Emergency response services</ListItem>
              <ListItem>Family communication and updates</ListItem>
            </List>
          </div>

          <div>
            <Heading level={3} size="md" className="mb-4">
              Ordered List
            </Heading>
            <List ordered spacing="normal">
              <ListItem>Initial consultation and assessment</ListItem>
              <ListItem>Customized care plan development</ListItem>
              <ListItem>Care provider assignment</ListItem>
              <ListItem>Service implementation</ListItem>
              <ListItem>Ongoing monitoring and adjustments</ListItem>
            </List>
          </div>
        </div>
      </section>

      {/* Blockquote */}
      <section>
        <SectionTitle>Blockquotes and Testimonials</SectionTitle>
        <Blockquote>
          "ICare has provided exceptional care for my mother. The professional
          staff and personalized attention have given our family peace of mind
          during a challenging time. I highly recommend their services."
        </Blockquote>
        <Caption className="text-right mt-2">— Satisfied Customer</Caption>
      </section>

      {/* Accessibility Features */}
      <section>
        <SectionTitle>Accessibility Features</SectionTitle>
        <div className="space-y-4">
          <Body>
            Our typography system includes several accessibility features:
          </Body>
          <List spacing="normal">
            <ListItem>WCAG AA contrast compliance for all text colors</ListItem>
            <ListItem>Semantic HTML elements for screen readers</ListItem>
            <ListItem>Proper heading hierarchy for navigation</ListItem>
            <ListItem>Responsive text scaling for different devices</ListItem>
            <ListItem>System font fallbacks for reliability</ListItem>
          </List>

          <ScreenReaderOnly>
            This text is only visible to screen readers and provides additional
            context for accessibility.
          </ScreenReaderOnly>

          <Body size="sm" className="text-contrast-muted">
            Note: Screen reader only text is included above but not visible to
            sighted users.
          </Body>
        </div>
      </section>

      {/* Responsive Behavior */}
      <section>
        <SectionTitle>Responsive Typography</SectionTitle>
        <Body className="mb-6">
          All typography scales fluidly across different screen sizes using CSS
          clamp() functions. Resize your browser window to see the text adapt
          automatically.
        </Body>

        <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg">
          <Display size="lg" className="mb-4">
            Responsive Display Text
          </Display>
          <Body size="lg">
            This text will scale smoothly from mobile to desktop sizes, ensuring
            optimal readability at every breakpoint while maintaining proper
            proportions and hierarchy.
          </Body>
        </div>
      </section>
    </div>
  );
}
