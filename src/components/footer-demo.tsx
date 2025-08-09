import Footer from "./layout/Footer";

export default function FooterDemo() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Demo content to show footer at bottom */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold text-neutral-900">
            Enhanced Footer Demo
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Scroll down to see the modern, enhanced footer with improved layout,
            social media icons with hover animations, newsletter signup form
            with validation, and responsive grid layout.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-primary-700">
                Modern Design
              </h3>
              <p className="text-neutral-600">
                Dark gradient background with glassmorphism effects and modern
                visual hierarchy.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-primary-700">
                Social Media Icons
              </h3>
              <p className="text-neutral-600">
                Animated social media icons with hover effects and proper
                accessibility labels.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-primary-700">
                Newsletter Form
              </h3>
              <p className="text-neutral-600">
                Real-time validation, loading states, and success animations for
                newsletter signup.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-primary-700">
                Responsive Layout
              </h3>
              <p className="text-neutral-600">
                Mobile-first responsive grid that adapts to different screen
                sizes seamlessly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-primary-700">
                Contact Information
              </h3>
              <p className="text-neutral-600">
                Well-organized contact details with icons and proper visual
                hierarchy.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-primary-700">
                Brand Consistency
              </h3>
              <p className="text-neutral-600">
                Consistent with the healthcare brand using design tokens and
                color palette.
              </p>
            </div>
          </div>

          {/* Spacer to push footer down */}
          <div className="h-32"></div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
