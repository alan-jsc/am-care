import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ChevronRight, MapPin, Users } from "lucide-react";

export default function ViCongDong() {
  // Mock community program data
  const communityPrograms = [
    {
      id: 1,
      title: "Chương trình khám sức khỏe định kỳ cho người cao tuổi",
      description:
        "Tổ chức khám sức khỏe định kỳ miễn phí cho người cao tuổi tại các địa phương khó khăn.",
      image:
        "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "25/06/2023",
      location: "Quận 8, TP. HCM",
      participants: 150,
    },
    {
      id: 2,
      title: "Tập huấn sơ cấp cứu cho cộng đồng",
      description:
        "Tổ chức các buổi tập huấn kỹ năng sơ cấp cứu cơ bản cho người dân tại các khu dân cư.",
      image:
        "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "10/04/2023",
      location: "Quận Bình Thạnh, TP. HCM",
      participants: 120,
    },
    {
      id: 3,
      title: "Tặng quà cho trẻ em mồ côi",
      description:
        "Chương trình tặng quà và tổ chức hoạt động vui chơi cho trẻ em mồ côi tại các trung tâm bảo trợ xã hội.",
      image:
        "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "01/07/2023",
      location: "Quận Gò Vấp, TP. HCM",
      participants: 80,
    },
    {
      id: 4,
      title: "Trao tặng xe lăn cho người khuyết tật",
      description:
        "Chương trình trao tặng xe lăn và các thiết bị hỗ trợ di chuyển cho người khuyết tật có hoàn cảnh khó khăn.",
      image:
        "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "15/05/2023",
      location: "Quận 6, TP. HCM",
      participants: 50,
    },
    {
      id: 5,
      title: "Chăm sóc sức khỏe tại nhà cho người cao tuổi neo đơn",
      description:
        "Chương trình thăm khám và chăm sóc sức khỏe tại nhà cho người cao tuổi neo đơn không có điều kiện đến bệnh viện.",
      image:
        "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "05/08/2023",
      location: "Quận 4, TP. HCM",
      participants: 35,
    },
    {
      id: 6,
      title: "Hội thảo về chăm sóc sức khỏe người cao tuổi",
      description:
        "Tổ chức hội thảo cung cấp kiến thức về chăm sóc sức khỏe cho người cao tuổi và người thân trong gia đình.",
      image:
        "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "20/03/2023",
      location: "Quận 1, TP. HCM",
      participants: 200,
    },
  ];

  // Social impact statistics
  const impactStats = [
    { label: "Người được hưởng lợi", value: "5,000+" },
    { label: "Chương trình đã thực hiện", value: "45+" },
    { label: "Tình nguyện viên tham gia", value: "200+" },
    { label: "Địa phương tiếp cận", value: "15+" },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-400 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Vì Cộng Đồng
            </h1>
            <p className="text-lg md:text-xl mb-8">
              WeCare247 cam kết đóng góp vào sự phát triển của cộng đồng thông
              qua các chương trình từ thiện và hoạt động xã hội có ý nghĩa.
            </p>
            <Button className="bg-white text-green-600 hover:bg-gray-100">
              Tham gia cùng chúng tôi <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2">
              <img
                src="/images/Community.jpg"
                alt="WeCare247 vì cộng đồng"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Sứ mệnh của chúng tôi
              </h2>
              <p className="text-gray-700 mb-4">
                Tại WeCare247, chúng tôi tin rằng mỗi người đều xứng đáng được
                chăm sóc với sự tận tâm và chuyên nghiệp. Chúng tôi cam kết mang
                dịch vụ chăm sóc sức khỏe đến với mọi người, đặc biệt là những
                người có hoàn cảnh khó khăn, thông qua các chương trình cộng
                đồng.
              </p>
              <p className="text-gray-700 mb-4">
                Mục tiêu của chúng tôi là tạo ra tác động xã hội tích cực, nâng
                cao nhận thức về sức khỏe và góp phần xây dựng một cộng đồng
                khỏe mạnh, hạnh phúc.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {impactStats.map((stat, index) => (
                  <div
                    key={index}
                    className="p-4 bg-green-50 rounded-lg text-center"
                  >
                    <p className="font-bold text-2xl text-green-600">
                      {stat.value}
                    </p>
                    <p className="text-gray-700">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Programs Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Chương Trình Cộng Đồng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communityPrograms.map((program) => (
              <Card
                key={program.id}
                className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{program.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {program.description}
                  </p>
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{program.location}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{program.participants} người tham gia</span>
                  </div>
                  <Button
                    variant="outline"
                    className="text-green-600 border-green-600 hover:bg-green-50"
                  >
                    Xem chi tiết
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button className="bg-green-600 hover:bg-green-700">
              Xem tất cả chương trình
            </Button>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 text-center">
            Cách Bạn Có Thể Tham Gia
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Trở thành tình nguyện viên
                </h3>
                <p className="text-gray-600 mb-6">
                  Tham gia các hoạt động cộng đồng với tư cách tình nguyện viên,
                  giúp đỡ những người có hoàn cảnh khó khăn.
                </p>
                <Button
                  variant="outline"
                  className="text-green-600 border-green-600 hover:bg-green-50"
                >
                  Đăng ký ngay
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
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
                    className="h-8 w-8 text-green-600"
                  >
                    <path d="M12 2v20"></path>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Quyên góp ủng hộ</h3>
                <p className="text-gray-600 mb-6">
                  Đóng góp tài chính để hỗ trợ các chương trình cộng đồng, giúp
                  chúng tôi tiếp cận nhiều người hơn.
                </p>
                <Button
                  variant="outline"
                  className="text-green-600 border-green-600 hover:bg-green-50"
                >
                  Quyên góp
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
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
                    className="h-8 w-8 text-green-600"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Chia sẻ thông tin
                </h3>
                <p className="text-gray-600 mb-6">
                  Giúp lan tỏa thông điệp và hoạt động cộng đồng của chúng tôi
                  đến nhiều người hơn qua mạng xã hội.
                </p>
                <Button
                  variant="outline"
                  className="text-green-600 border-green-600 hover:bg-green-50"
                >
                  Chia sẻ ngay
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-green-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 text-center">
            Tiếng Nói Từ Cộng Đồng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://randomuser.me/api/portraits/women/45.jpg"
                    alt="Nguyễn Thị Hoa"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Nguyễn Thị Hoa</h4>
                  <p className="text-gray-500 text-sm">
                    Người tham gia chương trình
                  </p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Tôi rất xúc động khi được tham gia chương trình khám sức khỏe
                miễn phí của WeCare247. Không chỉ được khám bệnh, tôi còn được
                tư vấn về cách chăm sóc sức khỏe hàng ngày."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Trần Văn Nam"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Trần Văn Nam</h4>
                  <p className="text-gray-500 text-sm">Tình nguyện viên</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Là một tình nguyện viên tại WeCare247, tôi thực sự cảm thấy
                công việc mình làm có ý nghĩa. Nhìn thấy nụ cười của những người
                được giúp đỡ là động lực lớn nhất đối với tôi."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://randomuser.me/api/portraits/women/68.jpg"
                    alt="Lê Thị Minh"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Lê Thị Minh</h4>
                  <p className="text-gray-500 text-sm">Nhà hảo tâm</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Tôi rất tin tưởng vào hoạt động của WeCare247. Mỗi đồng quyên
                góp đều được sử dụng đúng mục đích và mang lại giá trị thực sự
                cho cộng đồng. Tôi sẽ tiếp tục ủng hộ các chương trình trong
                tương lai."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Cùng chúng tôi mang lại sự thay đổi
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Mỗi hành động nhỏ đều có thể tạo nên sự khác biệt lớn. Hãy tham gia
            cùng WeCare247 trong hành trình vì một cộng đồng khỏe mạnh và hạnh
            phúc hơn.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-green-600 hover:bg-gray-100">
              Tham gia ngay
            </Button>
            <Button
              variant="outline"
              className="text-green-600 border-white hover:bg-green-700"
            >
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
