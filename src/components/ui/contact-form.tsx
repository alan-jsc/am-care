import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckCircle, Loader2, AlertCircle, Send } from "lucide-react";

// Form validation schema
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Họ tên phải có ít nhất 2 ký tự")
    .max(50, "Họ tên không được quá 50 ký tự"),
  email: z
    .string()
    .email("Vui lòng nhập địa chỉ email hợp lệ")
    .min(1, "Email là bắt buộc"),
  phone: z
    .string()
    .min(10, "Số điện thoại phải có ít nhất 10 số")
    .max(15, "Số điện thoại không được quá 15 số")
    .regex(/^[0-9+\-\s()]+$/, "Số điện thoại không hợp lệ"),
  subject: z
    .string()
    .min(5, "Tiêu đề phải có ít nhất 5 ký tự")
    .max(100, "Tiêu đề không được quá 100 ký tự")
    .optional(),
  message: z
    .string()
    .min(10, "Nội dung phải có ít nhất 10 ký tự")
    .max(1000, "Nội dung không được quá 1000 ký tự"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export interface ContactFormProps {
  variant?: "inline" | "modal" | "page";
  showValidation?: boolean;
  submitAnimation?: boolean;
  onSubmit?: (data: ContactFormData) => Promise<void>;
  className?: string;
}

// Loading skeleton component for form fields
const FormFieldSkeleton = () => (
  <div className="space-y-2">
    <Skeleton className="h-4 w-20" />
    <Skeleton className="h-10 w-full" />
  </div>
);

// Success animation component
const SuccessAnimation = ({ show }: { show: boolean }) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center py-8 transition-all duration-500",
      show ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
    )}
  >
    <div className="relative">
      <CheckCircle className="h-16 w-16 text-green-500 animate-bounce" />
      <div className="absolute inset-0 h-16 w-16 rounded-full bg-green-500/20 animate-ping" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">
      Gửi thành công!
    </h3>
    <p className="text-gray-600 text-center max-w-sm">
      Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi trong thời gian
      sớm nhất.
    </p>
  </div>
);

// Error animation component
const ErrorAnimation = ({
  show,
  message,
}: {
  show: boolean;
  message?: string;
}) => (
  <div
    className={cn(
      "flex items-center gap-2 p-4 rounded-lg bg-red-50 border border-red-200 transition-all duration-300",
      show
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-2 pointer-events-none"
    )}
  >
    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
    <p className="text-red-700 text-sm">
      {message || "Có lỗi xảy ra khi gửi form. Vui lòng thử lại."}
    </p>
  </div>
);

export const ContactForm = React.forwardRef<HTMLFormElement, ContactFormProps>(
  (
    {
      variant = "page",
      showValidation = true,
      submitAnimation = true,
      onSubmit,
      className,
    },
    ref
  ) => {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [submitError, setSubmitError] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const form = useForm<ContactFormData>({
      resolver: zodResolver(contactFormSchema),
      defaultValues: {
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      },
      mode: showValidation ? "onChange" : "onSubmit",
    });

    // Simulate loading state for demo
    React.useEffect(() => {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (data: ContactFormData) => {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        if (onSubmit) {
          await onSubmit(data);
        } else {
          // Default submission simulation
          await new Promise((resolve) => setTimeout(resolve, 2000));
          console.log("Form submitted:", data);
        }

        if (submitAnimation) {
          setIsSuccess(true);
          // Reset form after success animation
          setTimeout(() => {
            form.reset();
            setIsSuccess(false);
          }, 3000);
        } else {
          form.reset();
        }
      } catch (error) {
        setSubmitError(
          error instanceof Error ? error.message : "Có lỗi xảy ra khi gửi form"
        );
      } finally {
        setIsSubmitting(false);
      }
    };

    const formVariants = {
      inline: "space-y-3 sm:space-y-4",
      modal: "space-y-3 sm:space-y-4 max-w-md",
      page: "space-y-4 sm:space-y-6",
    };

    if (isLoading) {
      return (
        <div className={cn("space-y-4 sm:space-y-6", className)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <FormFieldSkeleton />
            <FormFieldSkeleton />
          </div>
          <FormFieldSkeleton />
          <FormFieldSkeleton />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      );
    }

    if (isSuccess && submitAnimation) {
      return (
        <div
          className={cn(
            "min-h-[400px] flex items-center justify-center",
            className
          )}
        >
          <SuccessAnimation show={isSuccess} />
        </div>
      );
    }

    return (
      <Form {...form}>
        <form
          ref={ref}
          onSubmit={form.handleSubmit(handleSubmit)}
          className={cn(formVariants[variant], className)}
        >
          {submitError && (
            <ErrorAnimation show={!!submitError} message={submitError} />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập họ tên của bạn"
                      {...field}
                      className={cn(
                        "transition-all duration-200 min-h-[44px] text-base",
                        form.formState.errors.name
                          ? "border-red-500 focus-visible:ring-red-500"
                          : "focus-visible:ring-blue-500"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="animate-in slide-in-from-top-1 duration-200" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập số điện thoại"
                      {...field}
                      className={cn(
                        "transition-all duration-200 min-h-[44px] text-base",
                        form.formState.errors.phone
                          ? "border-red-500 focus-visible:ring-red-500"
                          : "focus-visible:ring-blue-500"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="animate-in slide-in-from-top-1 duration-200" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Nhập địa chỉ email"
                    {...field}
                    className={cn(
                      "transition-all duration-200 min-h-[44px] text-base",
                      form.formState.errors.email
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "focus-visible:ring-blue-500"
                    )}
                  />
                </FormControl>
                <FormMessage className="animate-in slide-in-from-top-1 duration-200" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập tiêu đề"
                    {...field}
                    className={cn(
                      "transition-all duration-200 min-h-[44px] text-base",
                      form.formState.errors.subject
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "focus-visible:ring-blue-500"
                    )}
                  />
                </FormControl>
                <FormMessage className="animate-in slide-in-from-top-1 duration-200" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nội dung *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Nhập nội dung tin nhắn"
                    className={cn(
                      "min-h-[100px] sm:min-h-[120px] transition-all duration-200 resize-none text-base",
                      form.formState.errors.message
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "focus-visible:ring-blue-500"
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="animate-in slide-in-from-top-1 duration-200" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className={cn(
              "w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
              "transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]",
              "min-h-[44px] text-base font-medium",
              isSubmitting && "cursor-not-allowed"
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang gửi...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Gửi tin nhắn
              </>
            )}
          </Button>

          {variant === "page" && (
            <p className="text-sm text-gray-500 text-center">
              Bằng cách gửi form này, bạn đồng ý với{" "}
              <a href="#" className="text-blue-600 hover:underline">
                điều khoản sử dụng
              </a>{" "}
              và{" "}
              <a href="#" className="text-blue-600 hover:underline">
                chính sách bảo mật
              </a>{" "}
              của chúng tôi.
            </p>
          )}
        </form>
      </Form>
    );
  }
);

ContactForm.displayName = "ContactForm";
