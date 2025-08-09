import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ChamSocVien from "./pages/ChamSocVien";
import DaoTao from "./pages/DaoTao";
import TinTuc from "./pages/TinTuc";
import ViCongDong from "./pages/ViCongDong";
import LienHe from "./pages/LienHe";
import DichVu from "./pages/DichVu";
import VeChungToi from "./pages/VeChungToi";
import { DesignSystemDemo } from "./components/design-system-demo";
import { ImageManagementDemo } from "./components/image-management-demo";
import ServiceCardDemo from "./components/service-card-demo";
import { TestimonialCarouselDemo } from "./components/testimonial-carousel-demo";
import ContactFormDemo from "./components/contact-form-demo";
import { LoadingDemo } from "./components/loading-demo";
import { ResponsiveTestDemo } from "./components/responsive-test-demo";
import { FinalTestDemo } from "./components/final-test-demo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="wecare247-ui-theme">
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Index />
                </Layout>
              }
            />
            <Route path="/design-system" element={<DesignSystemDemo />} />
            <Route path="/image-demo" element={<ImageManagementDemo />} />
            <Route path="/service-card-demo" element={<ServiceCardDemo />} />
            <Route
              path="/testimonial-demo"
              element={<TestimonialCarouselDemo />}
            />
            <Route path="/contact-form-demo" element={<ContactFormDemo />} />
            <Route path="/loading-demo" element={<LoadingDemo />} />
            <Route path="/responsive-test" element={<ResponsiveTestDemo />} />
            <Route path="/final-test" element={<FinalTestDemo />} />
            <Route
              path="/ve-chung-toi"
              element={
                <Layout>
                  <VeChungToi />
                </Layout>
              }
            />
            <Route
              path="/cham-soc-vien"
              element={
                <Layout>
                  <ChamSocVien />
                </Layout>
              }
            />
            <Route
              path="/dao-tao"
              element={
                <Layout>
                  <DaoTao />
                </Layout>
              }
            />
            <Route
              path="/tin-tuc"
              element={
                <Layout>
                  <TinTuc />
                </Layout>
              }
            />
            <Route
              path="/vi-cong-dong"
              element={
                <Layout>
                  <ViCongDong />
                </Layout>
              }
            />
            <Route
              path="/lien-he"
              element={
                <Layout>
                  <LienHe />
                </Layout>
              }
            />
            <Route
              path="/dich-vu"
              element={
                <Layout>
                  <DichVu />
                </Layout>
              }
            />
            <Route
              path="*"
              element={
                <Layout>
                  <NotFound />
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
