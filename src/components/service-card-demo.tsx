import { ServiceCard } from "@/components/ui/service-card";

export default function ServiceCardDemo() {
  const sampleServices = [
    {
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
    },
    {
      title: "Chăm sóc VIP Premium",
      description:
        "Dịch vụ chăm sóc cao cấp với đội ngũ chuyên gia y tế hàng đầu và trang thiết bị hiện đại.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "Đội ngũ bác sĩ chuyên khoa",
        "Trang thiết bị y tế hiện đại",
        "Phòng chăm sóc đặc biệt",
        "Dịch vụ 5 sao",
        "Báo cáo sức khỏe định kỳ",
        "Hỗ trợ khẩn cấp 24/7",
      ],
      price: "Từ 2tr/ngày",
      badge: "Phổ biến",
      variant: "featured" as const,
      hoverEffect: "glow" as const,
      showRating: true,
      rating: 5,
    },
    {
      title: "Chăm sóc theo yêu cầu",
      description:
        "Dịch vụ chăm sóc linh hoạt theo thời gian và nhu cầu cụ thể.",
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "Chăm sóc theo giờ",
        "Linh hoạt thời gian",
        "Chi phí tiết kiệm",
        "Phù hợp nhiều đối tượng",
        "Tư vấn miễn phí",
      ],
      price: "Từ 50k/giờ",
      variant: "compact" as const,
      hoverEffect: "scale" as const,
      showRating: true,
      rating: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Enhanced Service Cards Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Showcase of modern service cards with 3D transforms, glassmorphism
            effects, gradient borders, and micro-interactions
          </p>
        </div>

        {/* Main Demo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {sampleServices.map((service, index) => (
            <ServiceCard
              key={index}
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
              onButtonClick={() => console.log(`Clicked on ${service.title}`)}
            />
          ))}
        </div>

        {/* Hover Effects Showcase */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Hover Effects Comparison
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["lift", "glow", "scale"].map((effect) => (
              <ServiceCard
                key={effect}
                title={`${
                  effect.charAt(0).toUpperCase() + effect.slice(1)
                } Effect`}
                description={`Hover over this card to see the ${effect} animation effect in action.`}
                image="https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                features={[
                  `${
                    effect.charAt(0).toUpperCase() + effect.slice(1)
                  } animation`,
                  "Smooth transitions",
                  "Modern interactions",
                ]}
                hoverEffect={effect as "lift" | "glow" | "scale"}
                buttonText={`Try ${effect}`}
              />
            ))}
          </div>
        </div>

        {/* Variant Showcase */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Card Variants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              title="Default Variant"
              description="Standard card layout with balanced proportions and clean design."
              image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              features={[
                "Standard layout",
                "Balanced proportions",
                "Clean design",
              ]}
              variant="default"
              buttonText="Default Style"
            />
            <ServiceCard
              title="Featured Variant"
              description="Premium card with enhanced styling, gradient borders, and larger content area."
              image="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              features={[
                "Premium styling",
                "Gradient borders",
                "Enhanced effects",
                "Larger content area",
              ]}
              variant="featured"
              badge="Premium"
              buttonText="Featured Style"
            />
            <ServiceCard
              title="Compact Variant"
              description="Space-efficient design perfect for dense layouts and quick overviews."
              image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              features={[
                "Space efficient",
                "Quick overview",
                "Dense layouts",
                "Minimal design",
                "Fast loading",
              ]}
              variant="compact"
              buttonText="Compact"
            />
          </div>
        </div>

        {/* Interactive Features Demo */}
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Interactive Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                ✨ Visual Effects
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 3D transform animations on hover</li>
                <li>• Glassmorphism backgrounds with backdrop blur</li>
                <li>• Gradient borders and shadows</li>
                <li>• Smooth shine effects across cards</li>
                <li>• Image scaling and brightness adjustments</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                🎯 Micro-interactions
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Feature list items animate on hover</li>
                <li>• Button background gradient transitions</li>
                <li>• Badge rotation effects</li>
                <li>• Star rating animations</li>
                <li>• Staggered feature animations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
