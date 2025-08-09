import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <div className="bg-white">
      <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary">
            Về Chúng Tôi
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Nâng tầm chất lượng ngành chăm sóc sức khoẻ cá nhân tại Việt Nam.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              Tầm nhìn
            </h2>
            <p className="text-gray-700">
              Trở thành đơn vị cung cấp dịch vụ chăm sóc sức khỏe cá nhân hàng
              đầu Việt Nam, nơi những người chăm sóc được tôn trọng và những
              người được chăm sóc nhận được sự quan tâm đích thực.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              Sứ mệnh
            </h2>
            <p className="text-gray-700">
              Nâng cao chất lượng cuộc sống của người cao tuổi và những người
              cần chăm sóc đặc biệt thông qua các dịch vụ chăm sóc cá nhân
              chuyên nghiệp, đồng thời tạo cơ hội việc làm và phát triển nghề
              nghiệp cho đội ngũ chăm sóc viên.
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center text-primary">
            Câu Chuyện Của Chúng Tôi
          </h2>
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <p className="text-gray-700 mb-4">
              ICare được thành lập năm 2015 với mong muốn mang đến các dịch vụ
              chăm sóc sức khỏe cá nhân chuyên nghiệp và đáng tin cậy tại Việt
              Nam. Chúng tôi nhận thấy khoảng trống lớn trong lĩnh vực chăm sóc
              người cao tuổi, người bệnh và những người có nhu cầu đặc biệt.
            </p>
            <p className="text-gray-700 mb-4">
              Từ những ngày đầu với đội ngũ nhỏ, đến nay ICare đã phát triển
              mạnh mẽ với hơn 2200 chăm sóc viên được đào tạo bài bản, phục vụ
              hơn 3400 gia đình trên khắp Việt Nam.
            </p>
            <p className="text-gray-700">
              Chúng tôi tự hào khi đã và đang đóng góp vào việc nâng cao chất
              lượng cuộc sống của người cao tuổi và những người cần chăm sóc đặc
              biệt, đồng thời tạo cơ hội việc làm và phát triển nghề nghiệp cho
              đội ngũ chăm sóc viên.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">
            Giá Trị Cốt Lõi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary-600 mb-2">
                Chuyên Nghiệp
              </h3>
              <p className="text-gray-700">
                Đào tạo bài bản và tiêu chuẩn chất lượng nghiêm ngặt cho mọi
                dịch vụ của chúng tôi.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Tận Tâm</h3>
              <p className="text-gray-700">
                Chăm sóc khách hàng của chúng tôi như chăm sóc người thân trong
                gia đình.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Đáng Tin Cậy</h3>
              <p className="text-gray-700">
                Cam kết chất lượng dịch vụ và đảm bảo sự an tâm cho mọi gia
                đình.
              </p>
            </div>
          </div>
        </div>

        {/* Management Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">
            Đội Ngũ Lãnh Đạo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                {/* Replace with actual image */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Ảnh
                </div>
              </div>
              <h3 className="text-xl font-semibold text-primary-600">
                Nguyễn Văn A
              </h3>
              <p className="text-primary font-medium mb-2">
                Nhà Sáng Lập & CEO
              </p>
              <p className="text-gray-700 text-sm">
                Với hơn 15 năm kinh nghiệm trong ngành y tế và chăm sóc sức
                khỏe, ông A đã xây dựng ICare từ những ngày đầu thành lập.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Ảnh
                </div>
              </div>
              <h3 className="text-xl font-semibold text-primary-600">
                Trần Thị B
              </h3>
              <p className="text-primary font-medium mb-2">
                Giám Đốc Điều Hành
              </p>
              <p className="text-gray-700 text-sm">
                Chuyên gia trong lĩnh vực quản lý nhân sự và phát triển dịch vụ,
                bà B đã giúp ICare mở rộng quy mô và nâng cao chất lượng dịch
                vụ.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Ảnh
                </div>
              </div>
              <h3 className="text-xl font-semibold text-primary-600">
                Lê Văn C
              </h3>
              <p className="text-primary font-medium mb-2">Giám Đốc Đào Tạo</p>
              <p className="text-gray-700 text-sm">
                Với nền tảng y tế vững chắc, ông C chịu trách nhiệm xây dựng và
                phát triển chương trình đào tạo chăm sóc viên theo tiêu chuẩn
                quốc tế.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-primary">
            Bạn cần thêm thông tin?
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ ngay.
          </p>
          <Button asChild size="lg" className="font-medium !text-white">
            <Link to="/lien-he">Liên Hệ Ngay</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
