import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ChevronRight, Search } from "lucide-react";

export default function TinTuc() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock news data
  const newsArticles = [
    {
      id: 1,
      title: "Cách chăm sóc người cao tuổi mùa nắng nóng",
      summary:
        "Tìm hiểu những biện pháp hiệu quả giúp người cao tuổi vượt qua mùa nắng nóng an toàn và khỏe mạnh.",
      image:
        "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "12/05/2023",
      category: "cham-soc",
    },
    {
      id: 2,
      title: "WeCare247 tổ chức khám sức khỏe miễn phí cho người cao tuổi",
      summary:
        "Chương trình khám sức khỏe miễn phí được tổ chức nhằm hỗ trợ người cao tuổi có hoàn cảnh khó khăn.",
      image:
        "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "07/06/2023",
      category: "su-kien",
    },
    {
      id: 3,
      title: "5 bước đơn giản phòng ngừa đột quỵ ở người cao tuổi",
      summary:
        "Tìm hiểu những biện pháp phòng ngừa đột quỵ hiệu quả dành cho người cao tuổi và người thân trong gia đình.",
      image:
        "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "25/04/2023",
      category: "suc-khoe",
    },
    {
      id: 4,
      title: "Dinh dưỡng cho người bị tiểu đường - Những điều cần biết",
      summary:
        "Hướng dẫn chi tiết về chế độ dinh dưỡng phù hợp cho người bị tiểu đường, giúp kiểm soát đường huyết hiệu quả.",
      image:
        "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "10/07/2023",
      category: "dinh-duong",
    },
    {
      id: 5,
      title: "Tuyển dụng chăm sóc viên tháng 8/2023",
      summary:
        "WeCare247 thông báo tuyển dụng nhiều vị trí chăm sóc viên toàn thời gian và bán thời gian trong tháng 8/2023.",
      image:
        "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "01/08/2023",
      category: "tuyen-dung",
    },
    {
      id: 6,
      title: "Lễ tốt nghiệp khóa đào tạo chăm sóc người bệnh K5",
      summary:
        "Hơn 30 học viên đã hoàn thành xuất sắc khóa đào tạo chăm sóc người bệnh K5 và nhận chứng chỉ từ WeCare247.",
      image:
        "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "20/07/2023",
      category: "su-kien",
    },
  ];

  const filteredArticles = searchTerm
    ? newsArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.summary.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : newsArticles;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-blue-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Tin Tức & Sự Kiện
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Cập nhật những thông tin mới nhất về chăm sóc sức khỏe, sự kiện và
              hoạt động của WeCare247
            </p>
            <div className="relative max-w-md mx-auto">
              <Input
                placeholder="Tìm kiếm tin tức..."
                className="pl-10 pr-4 py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* News Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full max-w-3xl mx-auto flex justify-between overflow-x-auto mb-8">
              <TabsTrigger value="all" className="flex-1">
                Tất cả
              </TabsTrigger>
              <TabsTrigger value="cham-soc" className="flex-1">
                Chăm sóc
              </TabsTrigger>
              <TabsTrigger value="suc-khoe" className="flex-1">
                Sức khỏe
              </TabsTrigger>
              <TabsTrigger value="dinh-duong" className="flex-1">
                Dinh dưỡng
              </TabsTrigger>
              <TabsTrigger value="su-kien" className="flex-1">
                Sự kiện
              </TabsTrigger>
              <TabsTrigger value="tuyen-dung" className="flex-1">
                Tuyển dụng
              </TabsTrigger>
            </TabsList>

            {/* All News */}
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <Card
                    key={article.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{article.date}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.summary}
                      </p>
                      <Button
                        variant="outline"
                        className="text-blue-600 border-blue-600 hover:bg-blue-50"
                      >
                        Đọc tiếp <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Category specific tabs */}
            {[
              "cham-soc",
              "suc-khoe",
              "dinh-duong",
              "su-kien",
              "tuyen-dung",
            ].map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles
                    .filter((article) => article.category === category)
                    .map((article) => (
                      <Card
                        key={article.id}
                        className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                      >
                        <div className="h-48 overflow-hidden">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center text-gray-500 text-sm mb-3">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{article.date}</span>
                          </div>
                          <h3 className="text-xl font-bold mb-3 line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {article.summary}
                          </p>
                          <Button
                            variant="outline"
                            className="text-blue-600 border-blue-600 hover:bg-blue-50"
                          >
                            Đọc tiếp <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="bg-blue-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Đăng ký nhận tin tức mới nhất
            </h2>
            <p className="text-lg mb-8">
              Nhận thông tin về các sự kiện, hoạt động và kiến thức chăm sóc sức
              khỏe mới nhất
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder="Địa chỉ email của bạn"
                className="bg-white text-gray-800"
              />
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
