# Enhanced Contact Form Component

A modern, feature-rich contact form component with real-time validation, loading states, success animations, and smooth error handling.

## Features

### ✅ Real-time Validation

- **Zod Schema Validation**: Comprehensive form validation using Zod
- **Instant Feedback**: Real-time validation with smooth error state transitions
- **Vietnamese Language Support**: All validation messages in Vietnamese
- **Field-specific Validation**:
  - Name: 2-50 characters required
  - Email: Valid email format required
  - Phone: 10-15 digits, numbers only with special characters allowed
  - Subject: 5-100 characters (optional)
  - Message: 10-1000 characters required

### 🎨 Loading States & Animations

- **Skeleton Loading**: Beautiful skeleton UI while component initializes
- **Submit Loading**: Loading indicators during form submission
- **Success Animation**: Bouncing checkmark with success message
- **Error Animation**: Smooth error message transitions
- **Button States**: Loading spinner and disabled state during submission

### 🎯 Form Variants

- **Page Variant**: Full-featured form with terms and conditions
- **Inline Variant**: Compact version for embedding in sections
- **Modal Variant**: Optimized for modal dialogs with constrained width

### 🚀 Advanced Features

- **TypeScript Support**: Fully typed with comprehensive interfaces
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Responsive Design**: Mobile-first approach with touch-friendly interactions
- **Form Reset**: Automatic form reset after successful submission
- **Error Recovery**: Retry mechanism with clear error messages

## Usage

### Basic Usage

```tsx
import { ContactForm } from "@/components/ui/contact-form";

export default function ContactPage() {
  return (
    <ContactForm
      variant="page"
      showValidation={true}
      submitAnimation={true}
      onSubmit={async (data) => {
        // Handle form submission
        await submitToAPI(data);
      }}
    />
  );
}
```

### Custom Submission Handler

```tsx
const handleSubmit = async (data: ContactFormData) => {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    // Success handling is automatic
  } catch (error) {
    // Error handling is automatic
    throw error;
  }
};

<ContactForm onSubmit={handleSubmit} />;
```

### Different Variants

```tsx
// Page variant (full-featured)
<ContactForm variant="page" />

// Inline variant (compact)
<ContactForm variant="inline" />

// Modal variant (constrained width)
<ContactForm variant="modal" />
```

## Props

| Prop              | Type                                       | Default     | Description                 |
| ----------------- | ------------------------------------------ | ----------- | --------------------------- |
| `variant`         | `'inline' \| 'modal' \| 'page'`            | `'page'`    | Form layout variant         |
| `showValidation`  | `boolean`                                  | `true`      | Enable real-time validation |
| `submitAnimation` | `boolean`                                  | `true`      | Show success animation      |
| `onSubmit`        | `(data: ContactFormData) => Promise<void>` | `undefined` | Custom submission handler   |
| `className`       | `string`                                   | `undefined` | Additional CSS classes      |

## Data Types

```typescript
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
}

interface ContactFormProps {
  variant?: "inline" | "modal" | "page";
  showValidation?: boolean;
  submitAnimation?: boolean;
  onSubmit?: (data: ContactFormData) => Promise<void>;
  className?: string;
}
```

## Validation Schema

The form uses Zod for validation with the following rules:

```typescript
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
```

## Styling

The component uses Tailwind CSS with custom animations and transitions:

- **Color Scheme**: Blue gradient primary colors
- **Animations**: Smooth transitions with spring easing
- **Focus States**: Blue ring with proper contrast
- **Error States**: Red borders and text
- **Success States**: Green checkmark with bounce animation

## Accessibility

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Visible focus indicators
- **Error Announcements**: Screen reader compatible error messages
- **Touch Targets**: Minimum 44px touch targets on mobile

## Browser Support

- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

- `react-hook-form`: Form state management
- `@hookform/resolvers`: Zod integration
- `zod`: Schema validation
- `lucide-react`: Icons
- `tailwindcss`: Styling
- `@radix-ui/react-*`: UI primitives

## Demo

Visit `/contact-form-demo` to see all variants and features in action.

## Testing

The component includes comprehensive tests covering:

- Form rendering
- Validation logic
- Submission handling
- Loading states
- Error handling
- Success animations
- Different variants

Run tests with your preferred testing framework (Jest, Vitest, etc.).
