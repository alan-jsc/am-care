import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import Footer from "../Footer";

// Mock react-hook-form
vi.mock("react-hook-form", () => ({
  useForm: () => ({
    control: {},
    handleSubmit: (fn: any) => (e: any) => {
      e.preventDefault();
      fn({ email: "test@example.com" });
    },
    reset: vi.fn(),
  }),
}));

// Mock zod resolver
vi.mock("@hookform/resolvers/zod", () => ({
  zodResolver: () => vi.fn(),
}));

const FooterWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("Footer Component", () => {
  it("renders footer with all sections", () => {
    render(
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    );

    // Check if main sections are present
    expect(screen.getByText("ICare")).toBeInTheDocument();
    expect(screen.getByText("Dịch vụ")).toBeInTheDocument();
    expect(screen.getByText("Liên hệ & Hỗ trợ")).toBeInTheDocument();
    expect(screen.getByText("Đăng ký nhận tin tức")).toBeInTheDocument();
  });

  it("renders service links correctly", () => {
    render(
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    );

    expect(screen.getByText("Chăm sóc 24/7")).toBeInTheDocument();
    expect(screen.getByText("Chăm sóc theo yêu cầu")).toBeInTheDocument();
    expect(screen.getByText("Bác sĩ gia đình")).toBeInTheDocument();
    expect(screen.getByText("Tư vấn sức khỏe")).toBeInTheDocument();
  });

  it("renders contact information correctly", () => {
    render(
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    );

    expect(screen.getByText("1900 5247")).toBeInTheDocument();
    expect(screen.getByText("info@icare.com.vn")).toBeInTheDocument();
    expect(
      screen.getByText("171 Trần Não, Quận 02, TP. HCM")
    ).toBeInTheDocument();
    expect(screen.getByText("0314709929")).toBeInTheDocument();
  });

  it("renders social media icons", () => {
    render(
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    );

    // Check for social media section
    expect(screen.getByText("Theo dõi chúng tôi:")).toBeInTheDocument();

    // Check for social media links (by aria-label)
    expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
    expect(screen.getByLabelText("YouTube")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
  });

  it("renders newsletter signup form", () => {
    render(
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    );

    expect(
      screen.getByPlaceholderText("Nhập email của bạn")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("renders copyright and legal links", () => {
    render(
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    );

    expect(
      screen.getByText("© 2024 ICare. Tất cả quyền được bảo lưu.")
    ).toBeInTheDocument();
    expect(screen.getByText("Chính sách bảo mật")).toBeInTheDocument();
    expect(screen.getByText("Chính sách cookie")).toBeInTheDocument();
    expect(screen.getByText("Điều khoản sử dụng")).toBeInTheDocument();
  });

  it("has proper responsive grid layout", () => {
    render(
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    );

    const mainGrid = screen.getByText("ICare").closest(".grid");
    expect(mainGrid).toHaveClass(
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-4"
    );
  });

  it("applies modern design classes", () => {
    render(
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    );

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass(
      "bg-gradient-to-br",
      "from-neutral-900",
      "via-neutral-800",
      "to-neutral-900"
    );
  });
});
