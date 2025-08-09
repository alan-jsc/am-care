import { ContactForm } from "@/components/ui/contact-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ContactFormDemo() {
  // Mock submission handler
  const handleSubmit = async (data: {
    name: string;
    email: string;
    phone: string;
    subject?: string;
    message: string;
  }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Form submitted:", data);

    // Simulate random error for demo purposes
    if (Math.random() > 0.7) {
      throw new Error("Lỗi kết nối mạng. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Enhanced Contact Forms Demo
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Demonstration of enhanced contact forms with real-time validation,
          loading states, success animations, and smooth error handling.
        </p>
      </div>

      <Tabs defaultValue="page" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="page">Page Variant</TabsTrigger>
          <TabsTrigger value="inline">Inline Variant</TabsTrigger>
          <TabsTrigger value="modal">Modal Variant</TabsTrigger>
        </TabsList>

        <TabsContent value="page" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Page Contact Form</CardTitle>
              <CardDescription>
                Full-featured contact form with all validation and animations
                enabled. Features real-time validation, loading states, and
                success animations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm
                variant="page"
                showValidation={true}
                submitAnimation={true}
                onSubmit={handleSubmit}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Inline Contact Form</CardTitle>
              <CardDescription>
                Compact version suitable for embedding in other components or
                sections. Maintains all functionality with reduced spacing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm
                variant="inline"
                showValidation={true}
                submitAnimation={true}
                onSubmit={handleSubmit}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Modal Contact Form</CardTitle>
              <CardDescription>
                Optimized for modal dialogs with constrained width and
                simplified layout. Perfect for popup contact forms.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-full max-w-md">
                <ContactForm
                  variant="modal"
                  showValidation={true}
                  submitAnimation={true}
                  onSubmit={handleSubmit}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Features Implemented</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Real-time validation with Zod schema
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Smooth error state transitions
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Loading states with skeleton UI
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Success animations with bounce effect
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Form submission with loading indicators
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Multiple form variants (page, inline, modal)
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Validation Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                <div>
                  <strong>Name:</strong> 2-50 characters required
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                <div>
                  <strong>Email:</strong> Valid email format required
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                <div>
                  <strong>Phone:</strong> 10-15 digits, numbers only
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                <div>
                  <strong>Subject:</strong> 5-100 characters (optional)
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                <div>
                  <strong>Message:</strong> 10-1000 characters required
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
