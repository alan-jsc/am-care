import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ServiceCard } from "@/components/ui/service-card";
import { Check, ChevronRight } from "lucide-react";

export default function ChamSocVien() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Chăm Sóc Viên ICare
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Đội ngũ chăm sóc viên tận tâm, được đào tạo chuyên nghiệp và có
              kinh nghiệm chăm sóc người bệnh, người già và trẻ em.
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Tìm hiểu thêm <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Who Are We Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2">
              <img
                src="http://localhost:8080/images/Community.jpg"
                alt="Chăm sóc viên ICare"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Chăm Sóc Viên là ai?
              </h2>
              <p className="text-gray-700 mb-4">
                Chăm sóc viên là những người được đào tạo để cung cấp các dịch
                vụ chăm sóc cá nhân, hỗ trợ sinh hoạt hàng ngày và theo dõi sức
                khỏe cho người cao tuổi, người bệnh, người có nhu cầu đặc biệt
                và trẻ em.
              </p>
              <p className="text-gray-700 mb-4">
                Tại ICare, chúng tôi tuyển chọn và đào tạo những chăm sóc viên
                chuyên nghiệp, có kinh nghiệm và đặc biệt là có tâm với nghề,
                đảm bảo mang đến dịch vụ chăm sóc chất lượng cao cho khách hàng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Dịch Vụ Chăm Sóc
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              title="Chăm sóc người già"
              description="Hỗ trợ người cao tuổi trong các hoạt động hàng ngày, từ nấu ăn, tắm rửa đến đồng hành và trò chuyện để duy trì tinh thần thoải mái."
              image="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              features={[
                "Hỗ trợ sinh hoạt hàng ngày",
                "Đồng hành và trò chuyện",
                "Chăm sóc sức khỏe cơ bản",
                "Theo dõi tình trạng sức khỏe",
              ]}
              variant="featured"
              hoverEffect="lift"
              buttonText="Tìm hiểu thêm"
            />

            <ServiceCard
              title="Chăm sóc người bệnh"
              description="Chăm sóc đặc biệt cho người bệnh sau phẫu thuật, mắc bệnh mãn tính hoặc cần điều trị dài hạn, giúp phục hồi sức khỏe nhanh chóng."
              image="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              features={[
                "Chăm sóc sau phẫu thuật",
                "Hỗ trợ điều trị mãn tính",
                "Theo dõi phục hồi",
                "Chăm sóc chuyên nghiệp",
              ]}
              variant="featured"
              hoverEffect="glow"
              badge="Chuyên nghiệp"
              buttonText="Tìm hiểu thêm"
            />

            <ServiceCard
              title="Chăm sóc trẻ em"
              description="Chăm sóc trẻ em từ sơ sinh đến lớn với các hoạt động phù hợp lứa tuổi, giúp phát triển thể chất và tinh thần toàn diện."
              image="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              features={[
                "Chăm sóc trẻ sơ sinh",
                "Hoạt động phù hợp lứa tuổi",
                "Phát triển thể chất",
                "Hỗ trợ tinh thần",
              ]}
              variant="featured"
              hoverEffect="scale"
              buttonText="Tìm hiểu thêm"
            />
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Yêu Cầu Đối Với Chăm Sóc Viên
          </h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Kinh nghiệm & Chuyên môn
                  </h3>
                  <p className="text-gray-600">
                    Có kinh nghiệm chăm sóc người bệnh, người cao tuổi hoặc trẻ
                    em. Được đào tạo về kỹ năng chăm sóc cơ bản.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Phẩm chất cá nhân
                  </h3>
                  <p className="text-gray-600">
                    Kiên nhẫn, tận tâm, trung thực và có tinh thần trách nhiệm
                    cao trong công việc.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Sức khỏe</h3>
                  <p className="text-gray-600">
                    Có sức khỏe tốt, không mắc các bệnh truyền nhiễm và có khả
                    năng làm việc với cường độ cao.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Kỹ năng giao tiếp
                  </h3>
                  <p className="text-gray-600">
                    Có kỹ năng giao tiếp tốt, biết lắng nghe và thấu hiểu nhu
                    cầu của người được chăm sóc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Bạn cần tìm chăm sóc viên?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Liên hệ với chúng tôi ngay để được tư vấn và kết nối với chăm sóc
            viên phù hợp với nhu cầu của bạn.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Đặt dịch vụ ngay
            </Button>
            <Button
              variant="outline"
              className="text-primary-600 border-white hover:bg-blue-700"
            >
              Gọi hotline: 1900 5247
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
