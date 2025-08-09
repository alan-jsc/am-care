import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Building2,
  Send,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

// Newsletter form validation schema
const newsletterSchema = z.object({
  email: z.string().email("Vui lòng nhập email hợp lệ"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export default function Footer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Newsletter signup:", data);
    setIsSubmitted(true);
    setIsSubmitting(false);
    form.reset();

    // Reset success state after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <footer className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.05)_25%,rgba(59,130,246,0.05)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.05)_75%)] bg-[length:20px_20px]" />
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 pt-12 sm:pt-16 pb-6 sm:pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {/* Company Info & Newsletter */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Logo & Description */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-3 sm:mb-4">
                  WeCare247
                </h2>
                <p className="text-neutral-300 leading-relaxed max-w-md text-sm sm:text-base">
                  Đồng hành cùng sức khỏe của bạn 24/7 với dịch vụ chăm sóc y tế
                  chuyên nghiệp, tận tâm và hiện đại nhất.
                </p>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-neutral-700/50">
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" />
                  Đăng ký nhận tin tức
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm mb-3 sm:mb-4">
                  Nhận thông tin mới nhất về sức khỏe và các dịch vụ của chúng
                  tôi
                </p>

                {isSubmitted ? (
                  <div className="flex items-center gap-2 text-success-400 bg-success-400/10 rounded-lg p-3">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      Đăng ký thành công!
                    </span>
                  </div>
                ) : (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="flex flex-col sm:flex-row gap-2"
                    >
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder="Nhập email của bạn"
                                className="bg-neutral-800/50 border-neutral-600 text-white placeholder:text-neutral-400 focus:border-primary-500 focus:ring-primary-500/20 min-h-[44px] text-base"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 border-0 px-4 sm:px-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 min-h-[44px] w-full sm:w-auto"
                      >
                        {isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send className="w-4 h-4 sm:mr-0 mr-2" />
                            <span className="sm:hidden">Đăng ký</span>
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">
                Dịch vụ
              </h3>
              <ul className="space-y-3">
                {[
                  { to: "/dich-vu/cham-soc-247", label: "Chăm sóc 24/7" },
                  {
                    to: "/dich-vu/cham-soc-theo-yeu-cau",
                    label: "Chăm sóc theo yêu cầu",
                  },
                  { to: "/dich-vu/bac-si-gia-dinh", label: "Bác sĩ gia đình" },
                  { to: "/dich-vu/tu-van-suc-khoe", label: "Tư vấn sức khỏe" },
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.to}
                      className="text-neutral-300 hover:text-primary-400 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Contact */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">
                Liên hệ & Hỗ trợ
              </h3>

              {/* Contact Info */}
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-neutral-400">Hotline</p>
                    <Link
                      to="tel:19005247"
                      className="text-white font-medium hover:text-primary-400 transition-colors duration-300"
                    >
                      1900 5247
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-neutral-400">Email</p>
                    <Link
                      to="mailto:info@wecare247.com.vn"
                      className="text-white font-medium hover:text-primary-400 transition-colors duration-300"
                    >
                      info@wecare247.com.vn
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-neutral-400">Văn phòng</p>
                    <p className="text-white text-sm">
                      171 Trần Não, Quận 02, TP. HCM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-neutral-400">MST</p>
                    <p className="text-white text-sm">0314709929</p>
                  </div>
                </div>
              </div>

              {/* Support Links */}
              <ul className="space-y-2">
                {[
                  { to: "/cau-hoi-thuong-gap", label: "Câu hỏi thường gặp" },
                  { to: "/chinh-sach-bao-mat", label: "Chính sách bảo mật" },
                  {
                    to: "/chinh-sach-giai-quyet-khieu-nai",
                    label: "Giải quyết khiếu nại",
                  },
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.to}
                      className="text-neutral-400 hover:text-primary-400 transition-colors duration-300 text-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-700/50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Copyright */}
              <div className="text-neutral-400 text-sm">
                <p>© 2024 WeCare247. Tất cả quyền được bảo lưu.</p>
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center gap-4">
                <span className="text-neutral-400 text-sm mr-2">
                  Theo dõi chúng tôi:
                </span>
                <div className="flex gap-3">
                  {[
                    { icon: Facebook, href: "#", label: "Facebook" },
                    { icon: Instagram, href: "#", label: "Instagram" },
                    { icon: Youtube, href: "#", label: "YouTube" },
                    { icon: Linkedin, href: "#", label: "LinkedIn" },
                  ].map((social, index) => (
                    <Link
                      key={index}
                      to={social.href}
                      aria-label={social.label}
                      className={cn(
                        "w-10 h-10 rounded-full bg-neutral-800/50 border border-neutral-700/50",
                        "flex items-center justify-center text-neutral-400",
                        "hover:bg-gradient-to-r hover:from-primary-600 hover:to-secondary-600",
                        "hover:text-white hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/25",
                        "transition-all duration-300 hover:scale-110 hover:-translate-y-1",
                        "group"
                      )}
                    >
                      <social.icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap gap-4 text-sm">
                <Link
                  to="/chinh-sach-bao-mat"
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-300"
                >
                  Chính sách bảo mật
                </Link>
                <Link
                  to="/chinh-sach-cookie"
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-300"
                >
                  Chính sách cookie
                </Link>
                <Link
                  to="/dieu-khoan-su-dung"
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-300"
                >
                  Điều khoản sử dụng
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
