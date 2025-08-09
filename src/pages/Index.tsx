import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImageAsset } from "@/components/ui/image-asset";
import { HeroSection } from "@/components/ui/hero-section";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";
import {
  SectionTitle,
  Body,
  CardTitle,
  CardDescription,
} from "@/components/ui/typography";
import { ChevronRight, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Testimonial } from "@/types/testimonial";

export default function HomePage() {
  // Testimonials data
  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Nguyễn Thị Mai",
      role: "Khách hàng",
      company: "TP. Hồ Chí Minh",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content:
        "Dịch vụ chăm sóc của ICare thực sự chuyên nghiệp. Mẹ tôi đã được chăm sóc tận tình, giúp bà phục hồi nhanh chóng sau ca phẫu thuật. Cảm ơn ICare!",
      rating: 5,
      date: "2024-01-15",
    },
    {
      id: "2",
      name: "Trần Văn Hưng",
      role: "Khách hàng",
      company: "Hà Nội",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content:
        "Tôi rất hài lòng với dịch vụ của ICare. Chăm sóc viên không chỉ giúp bố tôi trong sinh hoạt hàng ngày mà còn là người bạn đồng hành đáng tin cậy.",
      rating: 5,
      date: "2024-01-10",
    },
    {
      id: "3",
      name: "Phạm Thị Hương",
      role: "Khách hàng",
      company: "Đà Nẵng",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content:
        "ICare đã giúp gia đình tôi rất nhiều trong việc chăm sóc con gái nhỏ. Chăm sóc viên rất tận tâm và có kinh nghiệm với trẻ em. Tôi hoàn toàn yên tâm.",
      rating: 5,
      date: "2024-01-05",
    },
    {
      id: "4",
      name: "Lê Văn Đức",
      role: "Con trai bệnh nhân",
      company: "Cần Thơ",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content:
        "Dịch vụ vật lý trị liệu tại nhà giúp mẹ tôi phục hồi rất nhanh sau tai biến. Các chuyên gia rất giỏi và kinh nghiệm. Giá cả cũng hợp lý.",
      rating: 4,
      date: "2023-12-28",
    },
    {
      id: "5",
      name: "Võ Thị Lan",
      role: "Con gái bệnh nhân",
      company: "Biên Hòa",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      content:
        "Nhờ có ICare, tôi yên tâm đi làm mà vẫn biết mẹ được chăm sóc tốt ở nhà. Dịch vụ này thật sự cần thiết cho các gia đình hiện đại.",
      rating: 5,
      date: "2023-12-20",
    },
  ];

  // Featured services
  const services = [
    {
      title: "Chăm sóc 247",
      description:
        "Dịch vụ chăm sóc toàn diện 24/7 cho người già, người bệnh tại nhà hoặc bệnh viện.",
      icon: "/images/care-247.png",
      link: "/dich-vu/cham-soc-247",
    },
    {
      title: "Chăm sóc theo yêu cầu",
      description:
        "Dịch vụ chăm sóc linh hoạt theo thời gian và nhu cầu cụ thể của khách hàng.",
      icon: "/images/care-requirement.png",
      link: "/dich-vu/cham-soc-theo-yeu-cau",
    },
    {
      title: "Bác sĩ gia đình",
      description:
        "Dịch vụ thăm khám và tư vấn sức khỏe tại nhà với đội ngũ bác sĩ chuyên nghiệp.",
      icon: "/images/doctor-family.png",
      link: "/dich-vu/bac-si-gia-dinh",
    },
  ];

  // Why choose us
  const benefits = [
    {
      title: "Chăm sóc viên chất lượng cao",
      description:
        "Đội ngũ chăm sóc viên được đào tạo bài bản, có kinh nghiệm và kỹ năng chuyên môn.",
      icon: <Check className="h-5 w-5" />,
    },
    {
      title: "Dịch vụ linh hoạt",
      description:
        "Các gói dịch vụ được thiết kế linh hoạt, đáp ứng đa dạng nhu cầu của khách hàng.",
      icon: <Check className="h-5 w-5" />,
    },
    {
      title: "Giám sát chất lượng",
      description:
        "Hệ thống giám sát chất lượng dịch vụ chặt chẽ, đảm bảo sự hài lòng của khách hàng.",
      icon: <Check className="h-5 w-5" />,
    },
    {
      title: "Hỗ trợ 24/7",
      description:
        "Đội ngũ hỗ trợ chuyên nghiệp, sẵn sàng phục vụ 24/7 kể cả ngày lễ và cuối tuần.",
      icon: <Check className="h-5 w-5" />,
    },
  ];

  return (
    <div className="bg-white">
      {/* Enhanced Hero Section */}
      <HeroSection
        title="Dịch vụ chăm sóc chuyên nghiệp"
        subtitle="ICare cung cấp dịch vụ chăm sóc chất lượng cao cho người già, người bệnh và trẻ em với đội ngũ chăm sóc viên chuyên nghiệp, tận tâm."
        backgroundImage="/images/Healthcare.jpg"
        ctaButtons={[
          {
            text: "Đặt dịch vụ ngay",
            variant: "default",
            onClick: () => console.log("Đặt dịch vụ clicked"),
          },
          {
            text: "Tìm hiểu thêm",
            variant: "outline",
            onClick: () => console.log("Tìm hiểu thêm clicked"),
          },
        ]}
        statistics={[
          { value: "10+", label: "Năm kinh nghiệm" },
          { value: "500+", label: "Chăm sóc viên" },
          { value: "5000+", label: "Khách hàng" },
          { value: "20+", label: "Tỉnh thành" },
        ]}
        showParallax={true}
      />

      {/* Services Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <SectionTitle className="mb-4">Dịch vụ của chúng tôi</SectionTitle>
            <Body size="lg" className="text-contrast-secondary">
              ICare cung cấp các dịch vụ chăm sóc toàn diện, đáp ứng mọi nhu cầu
              từ người cao tuổi, người bệnh đến trẻ em.
            </Body>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <ImageAsset
                      src={service.icon}
                      alt={service.title}
                      objectFit="contain"
                      className="h-8 bg-transparent"
                    />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                  <Link
                    to={service.link}
                    className="text-blue-600 hover:text-blue-800 flex items-center mt-auto"
                  >
                    Xem chi tiết <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-10">
            <Button asChild size="lg" className="min-h-[44px]">
              <Link to="/dich-vu">Xem tất cả dịch vụ</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <ImageAsset
                src="/images/Community.jpg"
                alt="Về ICare"
                aspectRatio="landscape"
                rounded="lg"
                shadow="lg"
                className="w-full"
              />
            </div>
            <div>
              <SectionTitle className="mb-6">Về ICare</SectionTitle>
              <Body className="mb-4">
                ICare là đơn vị tiên phong trong lĩnh vực cung cấp dịch vụ chăm
                sóc người bệnh, người cao tuổi và trẻ em tại Việt Nam. Chúng tôi
                tự hào mang đến những dịch vụ chăm sóc chuyên nghiệp, tận tâm và
                toàn diện.
              </Body>
              <Body className="mb-6">
                Với đội ngũ chăm sóc viên được đào tạo bài bản và giàu kinh
                nghiệm, ICare cam kết mang đến sự an tâm cho gia đình bạn và
                chất lượng cuộc sống tốt hơn cho người thân của bạn.
              </Body>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="font-bold text-blue-600">10+</span>
                  </div>
                  <span className="text-gray-700">Năm kinh nghiệm</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="font-bold text-blue-600">500+</span>
                  </div>
                  <span className="text-gray-700">Chăm sóc viên</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="font-bold text-blue-600">5000+</span>
                  </div>
                  <span className="text-gray-700">Khách hàng</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="font-bold text-blue-600">20+</span>
                  </div>
                  <span className="text-gray-700">Tỉnh thành</span>
                </div>
              </div>
              <Button asChild size="lg" className="min-h-[44px]">
                <Link to="/ve-chung-toi">
                  Tìm hiểu thêm <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <SectionTitle className="mb-4">Tại sao chọn ICare?</SectionTitle>
            <Body size="lg" className="text-contrast-secondary">
              Chúng tôi không chỉ cung cấp dịch vụ chăm sóc mà còn mang đến sự
              an tâm và tin cậy cho gia đình bạn
            </Body>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 flex"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 sm:mr-4 shrink-0">
                  {benefit.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <SectionTitle className="mb-4">
              Khách hàng nói gì về chúng tôi
            </SectionTitle>
            <Body size="lg" className="text-contrast-secondary">
              Sự hài lòng của khách hàng là minh chứng cho chất lượng dịch vụ
              của chúng tôi
            </Body>
          </div>

          <TestimonialCarousel
            testimonials={testimonials}
            autoPlay={true}
            autoPlayInterval={5000}
            showDots={true}
            showArrows={true}
            infinite={true}
            pauseOnHover={true}
            className="max-w-4xl mx-auto"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-10 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
            Bạn cần dịch vụ chăm sóc?
          </h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
            Liên hệ với chúng tôi ngay hôm nay để được tư vấn và nhận dịch vụ
            chăm sóc phù hợp với nhu cầu của bạn.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 min-h-[44px]"
            >
              Đăng ký dịch vụ
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-primary border-white hover:bg-blue-700 min-h-[44px]"
            >
              Gọi Hotline: 1900 5247
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
