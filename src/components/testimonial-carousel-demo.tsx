import React from "react";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";
import { Testimonial } from "@/types/testimonial";

// Sample testimonial data
const sampleTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Nguyễn Thị Mai",
    role: "Khách hàng",
    company: "Gia đình Nguyễn",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    content:
      "Dịch vụ chăm sóc tại nhà của WeCare247 thật sự tuyệt vời. Các chăm sóc viên rất chuyên nghiệp và tận tâm. Mẹ tôi được chăm sóc rất chu đáo.",
    rating: 5,
    date: "2024-01-15",
  },
  {
    id: "2",
    name: "Trần Văn Hùng",
    role: "Con trai bệnh nhân",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content:
      "Tôi rất hài lòng với chất lượng dịch vụ. Các y tá đến đúng giờ, làm việc cẩn thận và luôn báo cáo tình hình sức khỏe của bố tôi một cách chi tiết.",
    rating: 5,
    date: "2024-01-10",
  },
  {
    id: "3",
    name: "Lê Thị Hoa",
    role: "Khách hàng",
    company: "Gia đình Lê",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content:
      "Dịch vụ vật lý trị liệu tại nhà giúp mẹ tôi phục hồi rất nhanh sau tai biến. Các chuyên gia rất giỏi và kinh nghiệm.",
    rating: 5,
    date: "2024-01-05",
  },
  {
    id: "4",
    name: "Phạm Minh Tuấn",
    role: "Khách hàng",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content:
      "Giá cả hợp lý, dịch vụ chất lượng cao. Tôi đã giới thiệu WeCare247 cho nhiều người bạn và họ đều rất hài lòng.",
    rating: 4,
    date: "2023-12-28",
  },
  {
    id: "5",
    name: "Võ Thị Lan",
    role: "Con gái bệnh nhân",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    content:
      "Nhờ có WeCare247, tôi yên tâm đi làm mà vẫn biết mẹ được chăm sóc tốt ở nhà. Dịch vụ này thật sự cần thiết cho các gia đình hiện đại.",
    rating: 5,
    date: "2023-12-20",
  },
  {
    id: "6",
    name: "Đặng Văn Nam",
    role: "Khách hàng",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    content:
      "Các chăm sóc viên không chỉ chuyên nghiệp mà còn rất thân thiện. Họ như người thân trong gia đình vậy.",
    rating: 5,
    date: "2023-12-15",
  },
];

export const TestimonialCarouselDemo: React.FC = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Khách hàng nói gì về chúng tôi
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hàng nghìn gia đình đã tin tưởng và hài lòng với dịch vụ chăm sóc
            sức khỏe tại nhà của WeCare247
          </p>
        </div>

        {/* Default carousel */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Carousel mặc định
          </h3>
          <TestimonialCarousel
            testimonials={sampleTestimonials}
            autoPlay={true}
            autoPlayInterval={4000}
            showDots={true}
            showArrows={true}
            infinite={true}
            pauseOnHover={true}
          />
        </div>

        {/* Carousel without auto-play */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Carousel không tự động chạy
          </h3>
          <TestimonialCarousel
            testimonials={sampleTestimonials.slice(0, 3)}
            autoPlay={false}
            showDots={true}
            showArrows={true}
            infinite={false}
          />
        </div>

        {/* Minimal carousel */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Carousel tối giản
          </h3>
          <TestimonialCarousel
            testimonials={sampleTestimonials.slice(0, 4)}
            autoPlay={true}
            autoPlayInterval={3000}
            showDots={false}
            showArrows={false}
            infinite={true}
            pauseOnHover={true}
          />
        </div>

        {/* Usage instructions */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Cách sử dụng
          </h3>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>Điều hướng:</strong> Sử dụng mũi tên trái/phải trên bàn
              phím hoặc click vào các nút điều hướng
            </p>
            <p>
              <strong>Touch/Swipe:</strong> Vuốt trái/phải trên thiết bị di động
              để chuyển slide
            </p>
            <p>
              <strong>Auto-play:</strong> Carousel sẽ tự động chuyển slide, tạm
              dừng khi hover (desktop)
            </p>
            <p>
              <strong>Accessibility:</strong> Hỗ trợ screen reader và keyboard
              navigation
            </p>
            <p>
              <strong>Responsive:</strong> Tự động thích ứng với các kích thước
              màn hình khác nhau
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
