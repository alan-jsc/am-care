import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ServiceCard } from "@/components/ui/service-card";
import { ChevronRight, Check } from "lucide-react";

export default function DichVu() {
  const services = [
    {
      id: 1,
      title: "Chăm sóc 247",
      description:
        "Dịch vụ chăm sóc toàn diện 24/7 cho người già, người bệnh tại nhà hoặc bệnh viện.",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "Chăm sóc toàn thời gian 24/7",
        "Hỗ trợ sinh hoạt hàng ngày",
        "Theo dõi và chăm sóc sức khỏe",
        "Đồng hành và hỗ trợ tinh thần",
      ],
      price: "Từ 500k/ngày",
      variant: "default" as const,
      hoverEffect: "lift" as const,
      showRating: true,
      rating: 5,
      link: "/dich-vu/cham-soc-247",
    },
    {
      id: 2,
      title: "Chăm sóc theo yêu cầu",
      description:
        "Dịch vụ chăm sóc linh hoạt theo thời gian và nhu cầu cụ thể của khách hàng.",
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "Chăm sóc theo giờ, theo buổi hoặc theo ngày",
        "Linh hoạt thời gian và dịch vụ",
        "Phù hợp với nhiều đối tượng",
        "Chi phí tiết kiệm",
      ],
      price: "Từ 50k/giờ",
      badge: "Phổ biến",
      variant: "featured" as const,
      hoverEffect: "glow" as const,
      showRating: true,
      rating: 5,
      link: "/dich-vu/cham-soc-theo-yeu-cau",
    },
    {
      id: 3,
      title: "Bác sĩ gia đình",
      description:
        "Dịch vụ thăm khám và tư vấn sức khỏe tại nhà với đội ngũ bác sĩ chuyên nghiệp.",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "Thăm khám và tư vấn sức khỏe tại nhà",
        "Theo dõi và điều trị bệnh mãn tính",
        "Kê đơn thuốc và hướng dẫn sử dụng",
        "Lập kế hoạch chăm sóc sức khỏe",
      ],
      price: "Từ 200k/lần",
      variant: "default" as const,
      hoverEffect: "scale" as const,
      showRating: true,
      rating: 4,
      link: "/dich-vu/bac-si-gia-dinh",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Dịch Vụ Chăm Sóc
            </h1>
            <p className="text-lg md:text-xl mb-8">
              WeCare247 cung cấp các dịch vụ chăm sóc chuyên nghiệp, đáp ứng mọi
              nhu cầu từ người cao tuổi, người bệnh đến trẻ em.
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Tìm hiểu thêm <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2">
              <img
                src="http://localhost:8080/images/Community.jpg"
                alt="WeCare247 Approach"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Phương pháp tiếp cận của chúng tôi
              </h2>
              <p className="text-gray-700 mb-4">
                Tại WeCare247, chúng tôi hiểu rằng mỗi khách hàng đều có nhu cầu
                chăm sóc khác nhau. Chúng tôi luôn đặt khách hàng vào vị trí
                trung tâm, xây dựng kế hoạch chăm sóc phù hợp với từng cá nhân.
              </p>
              <p className="text-gray-700 mb-4">
                Đội ngũ chăm sóc viên của chúng tôi không chỉ được đào tạo
                chuyên nghiệp về kỹ năng chăm sóc mà còn có tâm với nghề, luôn
                tận tâm và thấu hiểu nhu cầu của người được chăm sóc.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Check className="h-6 w-6 text-blue-600" />
                </div>
                <p className="font-medium text-gray-700">
                  Tùy chỉnh theo nhu cầu cá nhân
                </p>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Check className="h-6 w-6 text-blue-600" />
                </div>
                <p className="font-medium text-gray-700">
                  Đội ngũ chăm sóc viên chuyên nghiệp
                </p>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Check className="h-6 w-6 text-blue-600" />
                </div>
                <p className="font-medium text-gray-700">
                  Giám sát chất lượng thường xuyên
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 text-center">
            Các dịch vụ của chúng tôi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                image={service.image}
                features={service.features}
                price={service.price}
                badge={service.badge}
                variant={service.variant}
                hoverEffect={service.hoverEffect}
                showRating={service.showRating}
                rating={service.rating}
                onButtonClick={() => console.log(`Navigate to ${service.link}`)}
                buttonText="Xem chi tiết"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 text-center">
            Quy trình sử dụng dịch vụ
          </h2>
          <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">
            <div className="flex-1 text-center p-6">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-700">
                Liên hệ với chúng tôi
              </h3>
              <p className="text-gray-600">
                Gọi điện, gửi email hoặc điền form trên website để đăng ký nhu
                cầu chăm sóc của bạn.
              </p>
            </div>

            <div className="hidden md:flex items-center justify-center text-blue-300">
              <ChevronRight size={40} />
            </div>
            <div className="md:hidden flex justify-center text-blue-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </div>

            <div className="flex-1 text-center p-6">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-700">
                Tư vấn và đánh giá
              </h3>
              <p className="text-gray-600">
                Chúng tôi sẽ tư vấn và đánh giá nhu cầu chăm sóc để xây dựng kế
                hoạch phù hợp.
              </p>
            </div>

            <div className="hidden md:flex items-center justify-center text-blue-300">
              <ChevronRight size={40} />
            </div>
            <div className="md:hidden flex justify-center text-blue-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </div>

            <div className="flex-1 text-center p-6">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-700">
                Lựa chọn chăm sóc viên
              </h3>
              <p className="text-gray-600">
                Chúng tôi sẽ lựa chọn chăm sóc viên phù hợp với nhu cầu và mong
                muốn của bạn.
              </p>
            </div>

            <div className="hidden md:flex items-center justify-center text-blue-300">
              <ChevronRight size={40} />
            </div>
            <div className="md:hidden flex justify-center text-blue-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </div>

            <div className="flex-1 text-center p-6">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-700">
                Thực hiện chăm sóc
              </h3>
              <p className="text-gray-600">
                Chăm sóc viên sẽ thực hiện công việc chăm sóc theo kế hoạch đã
                thống nhất.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 text-center">
            Khách hàng nói gì về chúng tôi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  <div className="text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 italic mb-6">
                  "Dịch vụ chăm sóc của WeCare247 thực sự chuyên nghiệp và chu
                  đáo. Chăm sóc viên không chỉ giúp mẹ tôi trong các hoạt động
                  hàng ngày mà còn trở thành người bạn đồng hành đáng tin cậy."
                </p>
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img
                        src="https://randomuser.me/api/portraits/women/23.jpg"
                        alt="Nguyễn Thị Mai"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Nguyễn Thị Mai</h4>
                    <p className="text-gray-500 text-sm">
                      Khách hàng dịch vụ Chăm sóc 247
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  <div className="text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 italic mb-6">
                  "Sau ca phẫu thuật, tôi rất lo lắng về quá trình hồi phục.
                  Nhưng với dịch vụ Chăm sóc theo yêu cầu của WeCare247, tôi đã
                  nhận được sự chăm sóc chu đáo và hỗ trợ kịp thời. Xin cảm ơn
                  WeCare247!"
                </p>
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img
                        src="https://randomuser.me/api/portraits/men/54.jpg"
                        alt="Trần Văn Hưng"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Trần Văn Hưng</h4>
                    <p className="text-gray-500 text-sm">
                      Khách hàng dịch vụ Chăm sóc theo yêu cầu
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  <div className="text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 italic mb-6">
                  "Dịch vụ Bác sĩ gia đình của WeCare247 đã giúp bố tôi quản lý
                  bệnh tiểu đường hiệu quả. Bác sĩ không chỉ thăm khám định kỳ
                  mà còn tư vấn chi tiết về chế độ ăn uống và sinh hoạt phù
                  hợp."
                </p>
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img
                        src="https://randomuser.me/api/portraits/women/67.jpg"
                        alt="Phạm Thị Hương"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Phạm Thị Hương</h4>
                    <p className="text-gray-500 text-sm">
                      Khách hàng dịch vụ Bác sĩ gia đình
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Bạn cần dịch vụ chăm sóc?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Liên hệ với chúng tôi ngay hôm nay để được tư vấn và nhận dịch vụ
            chăm sóc phù hợp với nhu cầu của bạn.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Đăng ký dịch vụ
            </Button>
            <Button
              variant="outline"
              className="text-primary border-white hover:bg-blue-700"
            >
              Gọi Hotline: 1900 5247
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
