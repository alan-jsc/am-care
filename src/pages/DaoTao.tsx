import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Clock, User, Users } from "lucide-react";

export default function DaoTao() {
  const trainingPrograms = [
    {
      title: "Khóa đào tạo chăm sóc người cao tuổi",
      description:
        "Trang bị kiến thức và kỹ năng cần thiết để chăm sóc người cao tuổi an toàn và hiệu quả.",
      duration: "3 tháng",
      students: "20 học viên/lớp",
      features: [
        "Kiến thức về các bệnh lý thường gặp ở người cao tuổi",
        "Kỹ thuật chăm sóc cơ bản và nâng cao",
        "Xử lý các tình huống khẩn cấp",
        "Thực hành với người cao tuổi thực tế",
      ],
    },
    {
      title: "Khóa đào tạo chăm sóc người bệnh",
      description:
        "Đào tạo chuyên sâu về cách chăm sóc người bệnh sau phẫu thuật và mắc bệnh mãn tính.",
      duration: "4 tháng",
      students: "15 học viên/lớp",
      features: [
        "Kiến thức chuyên sâu về các bệnh lý phổ biến",
        "Kỹ thuật chăm sóc vết thương và theo dõi sức khỏe",
        "Sử dụng các thiết bị y tế cơ bản",
        "Thực hành tại bệnh viện đối tác",
      ],
    },
    {
      title: "Khóa đào tạo chăm sóc trẻ em",
      description:
        "Chương trình đào tạo toàn diện về chăm sóc và phát triển trẻ em từ sơ sinh đến lứa tuổi mẫu giáo.",
      duration: "3 tháng",
      students: "18 học viên/lớp",
      features: [
        "Phát triển thể chất và tinh thần ở trẻ",
        "Dinh dưỡng và chế độ ăn uống cho trẻ",
        "Sơ cứu và xử lý tình huống khẩn cấp",
        "Tổ chức các hoạt động vui chơi và học tập",
      ],
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Đào Tạo Chăm Sóc Viên Chuyên Nghiệp
            </h1>
            <p className="text-lg md:text-xl mb-8">
              ICare cung cấp các khóa đào tạo chất lượng cao, giúp chăm sóc viên
              nâng cao kỹ năng và phát triển nghề nghiệp bền vững.
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Đăng ký khóa học ngay
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Our Training Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 text-center">
            Tại sao chọn đào tạo tại ICare?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Giảng viên giàu kinh nghiệm
              </h3>
              <p className="text-gray-600">
                Đội ngũ giảng viên là các chuyên gia trong lĩnh vực y tế và chăm
                sóc, có nhiều năm kinh nghiệm thực tế.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Chương trình đào tạo toàn diện
              </h3>
              <p className="text-gray-600">
                Chương trình được thiết kế kết hợp giữa lý thuyết và thực hành,
                đảm bảo học viên có đủ kỹ năng làm việc.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ArrowRight className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Cơ hội việc làm sau tốt nghiệp
              </h3>
              <p className="text-gray-600">
                Học viên xuất sắc sẽ được ưu tiên giới thiệu việc làm tại ICare
                hoặc các đối tác của chúng tôi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 text-center">
            Các Khóa Đào Tạo Của Chúng Tôi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainingPrograms.map((program, index) => (
              <Card
                key={index}
                className="border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{program.description}</p>
                  <div className="flex items-center mb-3">
                    <Clock className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-gray-700">{program.duration}</span>
                  </div>
                  <div className="flex items-center mb-6">
                    <User className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-gray-700">{program.students}</span>
                  </div>
                  <div className="space-y-3 mb-6">
                    {program.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full">Xem chi tiết</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Training Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 text-center">
            Quy Trình Đào Tạo
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline */}
              <div className="absolute left-8 top-0 h-full w-1 bg-blue-200"></div>

              {/* Steps */}
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative pl-20">
                  <div className="absolute left-0 h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Đăng ký và đánh giá
                    </h3>
                    <p className="text-gray-600">
                      Học viên đăng ký và tham gia buổi phỏng vấn đầu vào để
                      đánh giá năng lực và định hướng nghề nghiệp.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative pl-20">
                  <div className="absolute left-0 h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Đào tạo lý thuyết
                    </h3>
                    <p className="text-gray-600">
                      Học viên được đào tạo về kiến thức y tế cơ bản, các bệnh
                      lý thường gặp, và kỹ năng chăm sóc theo từng đối tượng.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative pl-20">
                  <div className="absolute left-0 h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Thực hành kỹ năng
                    </h3>
                    <p className="text-gray-600">
                      Học viên được thực hành các kỹ năng chăm sóc dưới sự hướng
                      dẫn của chuyên gia trong môi trường mô phỏng.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative pl-20">
                  <div className="absolute left-0 h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Thực tập thực tế</h3>
                    <p className="text-gray-600">
                      Học viên được bố trí thực tập tại các cơ sở y tế hoặc
                      trung tâm chăm sóc để trải nghiệm thực tế công việc.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="relative pl-20">
                  <div className="absolute left-0 h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Đánh giá và cấp chứng chỉ
                    </h3>
                    <p className="text-gray-600">
                      Sau khi hoàn thành khóa học, học viên sẽ được đánh giá
                      toàn diện và cấp chứng chỉ có giá trị trong ngành.
                    </p>
                  </div>
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
            Bắt đầu sự nghiệp chăm sóc chuyên nghiệp
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Đăng ký ngay hôm nay để bắt đầu sự nghiệp chăm sóc ý nghĩa và phát
            triển kỹ năng chuyên môn của bạn.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Đăng ký khóa học
            </Button>
            <Button
              variant="outline"
              className="text-primary-600 border-white hover:bg-blue-700"
            >
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
