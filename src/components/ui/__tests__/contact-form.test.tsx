import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "../contact-form";
import { vi } from "vitest";

// Mock the form submission
const mockSubmit = vi.fn();

describe("ContactForm", () => {
  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it("renders all form fields correctly", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/họ và tên/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/số điện thoại/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tiêu đề/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nội dung/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /gửi tin nhắn/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors for empty required fields", async () => {
    const user = userEvent.setup();
    render(<ContactForm showValidation={true} />);

    const submitButton = screen.getByRole("button", { name: /gửi tin nhắn/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/họ tên phải có ít nhất 2 ký tự/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/email là bắt buộc/i)).toBeInTheDocument();
      expect(
        screen.getByText(/số điện thoại phải có ít nhất 10 số/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/nội dung phải có ít nhất 10 ký tự/i)
      ).toBeInTheDocument();
    });
  });

  it("validates email format correctly", async () => {
    const user = userEvent.setup();
    render(<ContactForm showValidation={true} />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, "invalid-email");
    await user.tab(); // Trigger blur event

    await waitFor(() => {
      expect(
        screen.getByText(/vui lòng nhập địa chỉ email hợp lệ/i)
      ).toBeInTheDocument();
    });
  });

  it("validates phone number format correctly", async () => {
    const user = userEvent.setup();
    render(<ContactForm showValidation={true} />);

    const phoneInput = screen.getByLabelText(/số điện thoại/i);
    await user.type(phoneInput, "abc123");
    await user.tab(); // Trigger blur event

    await waitFor(() => {
      expect(
        screen.getByText(/số điện thoại không hợp lệ/i)
      ).toBeInTheDocument();
    });
  });

  it("submits form with valid data", async () => {
    const user = userEvent.setup();
    mockSubmit.mockResolvedValue(undefined);

    render(<ContactForm onSubmit={mockSubmit} />);

    // Fill in all required fields
    await user.type(screen.getByLabelText(/họ và tên/i), "Nguyễn Văn A");
    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/số điện thoại/i), "0123456789");
    await user.type(
      screen.getByLabelText(/nội dung/i),
      "This is a test message"
    );

    const submitButton = screen.getByRole("button", { name: /gửi tin nhắn/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: "Nguyễn Văn A",
        email: "test@example.com",
        phone: "0123456789",
        subject: "",
        message: "This is a test message",
      });
    });
  });

  it("shows loading state during submission", async () => {
    const user = userEvent.setup();
    mockSubmit.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    );

    render(<ContactForm onSubmit={mockSubmit} />);

    // Fill in required fields
    await user.type(screen.getByLabelText(/họ và tên/i), "Nguyễn Văn A");
    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/số điện thoại/i), "0123456789");
    await user.type(
      screen.getByLabelText(/nội dung/i),
      "This is a test message"
    );

    const submitButton = screen.getByRole("button", { name: /gửi tin nhắn/i });
    await user.click(submitButton);

    expect(screen.getByText(/đang gửi/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("shows success animation after successful submission", async () => {
    const user = userEvent.setup();
    mockSubmit.mockResolvedValue(undefined);

    render(<ContactForm onSubmit={mockSubmit} submitAnimation={true} />);

    // Fill in required fields
    await user.type(screen.getByLabelText(/họ và tên/i), "Nguyễn Văn A");
    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/số điện thoại/i), "0123456789");
    await user.type(
      screen.getByLabelText(/nội dung/i),
      "This is a test message"
    );

    const submitButton = screen.getByRole("button", { name: /gửi tin nhắn/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/gửi thành công/i)).toBeInTheDocument();
    });
  });

  it("shows error message when submission fails", async () => {
    const user = userEvent.setup();
    mockSubmit.mockRejectedValue(new Error("Network error"));

    render(<ContactForm onSubmit={mockSubmit} />);

    // Fill in required fields
    await user.type(screen.getByLabelText(/họ và tên/i), "Nguyễn Văn A");
    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/số điện thoại/i), "0123456789");
    await user.type(
      screen.getByLabelText(/nội dung/i),
      "This is a test message"
    );

    const submitButton = screen.getByRole("button", { name: /gửi tin nhắn/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });
  });

  it("renders different variants correctly", () => {
    const { rerender } = render(<ContactForm variant="page" />);
    expect(screen.getByText(/điều khoản sử dụng/i)).toBeInTheDocument();

    rerender(<ContactForm variant="modal" />);
    expect(screen.queryByText(/điều khoản sử dụng/i)).not.toBeInTheDocument();

    rerender(<ContactForm variant="inline" />);
    expect(screen.queryByText(/điều khoản sử dụng/i)).not.toBeInTheDocument();
  });

  it("shows skeleton loading state initially", () => {
    render(<ContactForm />);

    // The component should show skeleton loading initially
    // This is tested by checking if the form fields are not immediately visible
    // and skeleton elements are shown instead
    expect(screen.queryByLabelText(/họ và tên/i)).not.toBeInTheDocument();
  });
});
