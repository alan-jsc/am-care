import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/ui/contact-form";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

export default function LienHe() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-blue-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Liên Hệ
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Hãy liên hệ với chúng tôi nếu bạn cần tư vấn hoặc có bất kỳ câu
              hỏi nào về dịch vụ chăm sóc
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Gửi tin nhắn cho chúng tôi
              </h2>
              <ContactForm
                variant="page"
                showValidation={true}
                submitAnimation={true}
                onSubmit={async (data) => {
                  // Simulate API call
                  await new Promise((resolve) => setTimeout(resolve, 2000));
                  console.log("Contact form submitted:", data);

                  // Here you would typically send the data to your backend
                  // Example: await submitContactForm(data);
                }}
              />
            </div>

            {/* Contact Information */}
            <div className="lg:pl-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Thông tin liên hệ
              </h2>
              <div className="space-y-8">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2408944884276!2d106.731403676233!3d10.792861199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317526373d76b23b%3A0x401df32672ddfd4a!2zMTcxIMSQxrDhu51uZyBUcuG6p24gTsOjbywgUGjGsOG7nW5nIELDrG5oIEFuLCBRdeG6rW4gMiwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1692362810268!5m2!1svi!2s"
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="WeCare247 location map"
                    ></iframe>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 shrink-0">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Địa chỉ</h3>
                      <p className="text-gray-600">
                        171 Trần Não, Phường Bình An, Quận 2, TP. HCM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 shrink-0">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Email</h3>
                      <p className="text-gray-600">info@wecare247.com.vn</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 shrink-0">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Hotline</h3>
                      <p className="text-gray-600">1900 5247</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 shrink-0">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        Giờ làm việc
                      </h3>
                      <p className="text-gray-600">
                        Thứ 2 - Thứ 6: 8:00 - 17:30
                      </p>
                      <p className="text-gray-600">Thứ 7: 8:00 - 12:00</p>
                      <p className="text-gray-600">Chủ nhật: Nghỉ</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Câu hỏi thường gặp
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-2">
                Làm thế nào để đăng ký dịch vụ chăm sóc?
              </h3>
              <p className="text-gray-600">
                Bạn có thể đăng ký dịch vụ chăm sóc bằng cách gọi đến hotline
                1900 5247, gửi email đến info@wecare247.com.vn hoặc điền form
                liên hệ trên website.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-2">
                Chi phí dịch vụ chăm sóc là bao nhiêu?
              </h3>
              <p className="text-gray-600">
                Chi phí dịch vụ sẽ tùy thuộc vào loại hình chăm sóc, thời gian
                và yêu cầu cụ thể của bạn. Vui lòng liên hệ với chúng tôi để
                được tư vấn chi tiết và nhận báo giá phù hợp.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-2">
                Chăm sóc viên của WeCare247 có được đào tạo không?
              </h3>
              <p className="text-gray-600">
                Tất cả chăm sóc viên của WeCare247 đều được tuyển chọn kỹ lưỡng
                và trải qua quá trình đào tạo chuyên nghiệp trước khi làm việc
                với khách hàng. Họ được trang bị kiến thức và kỹ năng cần thiết
                để đảm bảo chất lượng chăm sóc tốt nhất.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-2">
                Tôi có thể yêu cầu thay đổi chăm sóc viên không?
              </h3>
              <p className="text-gray-600">
                Có, bạn có thể yêu cầu thay đổi chăm sóc viên nếu không hài
                lòng. WeCare247 luôn lắng nghe phản hồi từ khách hàng và sẽ cố
                gắng đáp ứng nhu cầu của bạn trong thời gian sớm nhất.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
