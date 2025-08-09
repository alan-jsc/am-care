import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { useReducedMotion } from "../../hooks/use-reduced-motion";
import { scrollToSection } from "../../lib/scroll-utils";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const location = useLocation();

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if current path matches the link
  const isActiveLink = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Get active link styles
  const getActiveStyles = (path: string) => {
    const isActive = isActiveLink(path);
    return isActive
      ? "text-blue-700 font-semibold"
      : "text-gray-700 hover:text-blue-700";
  };

  // Get active underline styles
  const getActiveUnderlineStyles = (path: string) => {
    const isActive = isActiveLink(path);
    return isActive
      ? "absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-blue-700"
      : "absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-200 group-hover:w-full";
  };

  // Handle navigation click for same-page sections
  const handleNavClick = (to: string, sectionId?: string) => {
    if (sectionId && window.location.pathname === "/") {
      const behavior = prefersReducedMotion ? "auto" : "smooth";
      scrollToSection(sectionId, 80, behavior);
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out
        ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20"
            : "bg-white/95 backdrop-blur-sm shadow-sm"
        }
      `}
    >
      <div className="container mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
        {/* Logo with hover animation */}
        <Link
          to="/"
          className="flex items-center group"
          onClick={() => handleNavClick("/")}
        >
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent transition-all duration-300 group-hover:from-blue-700 group-hover:to-blue-800">
            WeCare247
          </div>
        </Link>

        {/* Mobile menu button with animation */}
        <button
          className={`
            lg:hidden p-2 rounded-lg transition-all duration-200 ease-out min-h-[44px] min-w-[44px] flex items-center justify-center
            text-gray-700 hover:text-blue-700 hover:bg-blue-50
            ${isMenuOpen ? "bg-blue-50 text-blue-700" : ""}
          `}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <div className="relative w-6 h-6">
            <Menu
              size={24}
              className={`absolute inset-0 transition-all duration-200 ${
                isMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
              }`}
            />
            <X
              size={24}
              className={`absolute inset-0 transition-all duration-200 ${
                isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
              }`}
            />
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link
            to="/"
            className={`${getActiveStyles(
              "/"
            )} transition-all duration-200 font-medium relative group`}
            onClick={() => handleNavClick("/")}
          >
            Trang Chủ
            <span className={getActiveUnderlineStyles("/")}></span>
          </Link>

          <Link
            to="/ve-chung-toi"
            className={`${getActiveStyles(
              "/ve-chung-toi"
            )} transition-all duration-200 font-medium relative group`}
            onClick={() => handleNavClick("/ve-chung-toi")}
          >
            Về chúng tôi
            <span className={getActiveUnderlineStyles("/ve-chung-toi")}></span>
          </Link>

          {/* Services dropdown with enhanced styling */}
          <div className="relative group">
            <Link
              to="/dich-vu"
              className={`${getActiveStyles(
                "/dich-vu"
              )} transition-all duration-200 font-medium relative group flex items-center`}
              onClick={() => handleNavClick("/dich-vu")}
            >
              Dịch vụ
              <span className={getActiveUnderlineStyles("/dich-vu")}></span>
            </Link>
          </div>

          <Link
            to="/cham-soc-vien"
            className={`${getActiveStyles(
              "/cham-soc-vien"
            )} transition-all duration-200 font-medium relative group`}
            onClick={() => handleNavClick("/cham-soc-vien")}
          >
            Chăm sóc viên
            <span className={getActiveUnderlineStyles("/cham-soc-vien")}></span>
          </Link>

          <Link
            to="/dao-tao"
            className={`${getActiveStyles(
              "/dao-tao"
            )} transition-all duration-200 font-medium relative group`}
            onClick={() => handleNavClick("/dao-tao")}
          >
            Đào tạo
            <span className={getActiveUnderlineStyles("/dao-tao")}></span>
          </Link>

          <Link
            to="/tin-tuc"
            className={`${getActiveStyles(
              "/tin-tuc"
            )} transition-all duration-200 font-medium relative group`}
            onClick={() => handleNavClick("/tin-tuc")}
          >
            Tin tức
            <span className={getActiveUnderlineStyles("/tin-tuc")}></span>
          </Link>

          <Link
            to="/vi-cong-dong"
            className={`${getActiveStyles(
              "/vi-cong-dong"
            )} transition-all duration-200 font-medium relative group`}
            onClick={() => handleNavClick("/vi-cong-dong")}
          >
            Vì cộng đồng
            <span className={getActiveUnderlineStyles("/vi-cong-dong")}></span>
          </Link>

          {/* CTA Button with gradient background and hover effects */}
          <Link
            to="/lien-he"
            className="
              relative inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3
              bg-gradient-to-r from-blue-600 to-blue-700 
              hover:from-blue-700 hover:to-blue-800 
              !text-white font-medium rounded-full text-sm sm:text-base
              transition-all duration-300 ease-out min-h-[44px]
              transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            "
            onClick={() => handleNavClick("/lien-he")}
          >
            <Phone size={16} color="white" />
            Liên hệ ngay
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </nav>
      </div>

      {/* Enhanced Mobile Navigation with slide animation */}
      <div
        className={`
          lg:hidden absolute top-full left-0 right-0 
          bg-white/95 backdrop-blur-md border-b border-gray-100
          transition-all duration-300 ease-out transform origin-top
          ${
            isMenuOpen
              ? "opacity-100 scale-y-100 translate-y-0"
              : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
          }
        `}
      >
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <nav className="flex flex-col space-y-1">
            <Link
              to="/"
              className={`px-4 py-3 ${getActiveStyles("/")} ${
                isActiveLink("/") ? "bg-blue-50" : "hover:bg-blue-50"
              } rounded-lg transition-all duration-200 font-medium min-h-[44px] flex items-center`}
              onClick={() => handleNavClick("/")}
            >
              Trang Chủ
            </Link>

            <Link
              to="/ve-chung-toi"
              className={`px-4 py-3 ${getActiveStyles("/ve-chung-toi")} ${
                isActiveLink("/ve-chung-toi")
                  ? "bg-blue-50"
                  : "hover:bg-blue-50"
              } rounded-lg transition-all duration-200 font-medium`}
              onClick={() => handleNavClick("/ve-chung-toi")}
            >
              Về chúng tôi
            </Link>

            {/* Mobile Services Section */}
            <div className="space-y-1">
              <Link
                to="/dich-vu"
                className={`px-4 py-3 ${getActiveStyles("/dich-vu")} ${
                  isActiveLink("/dich-vu") ? "bg-blue-50" : "hover:bg-blue-50"
                } rounded-lg transition-all duration-200 font-medium block`}
                onClick={() => handleNavClick("/dich-vu")}
              >
                Dịch vụ
              </Link>
              <div className="pl-4 space-y-1">
                <Link
                  to="/dich-vu/cham-soc-247"
                  className={`px-4 py-2 ${getActiveStyles(
                    "/dich-vu/cham-soc-247"
                  )} ${
                    isActiveLink("/dich-vu/cham-soc-247")
                      ? "bg-blue-50"
                      : "hover:bg-blue-50"
                  } rounded-lg transition-all duration-200 block text-sm`}
                  onClick={() => handleNavClick("/dich-vu/cham-soc-247")}
                >
                  Chăm sóc 247
                </Link>
                <Link
                  to="/dich-vu/cham-soc-theo-yeu-cau"
                  className={`px-4 py-2 ${getActiveStyles(
                    "/dich-vu/cham-soc-theo-yeu-cau"
                  )} ${
                    isActiveLink("/dich-vu/cham-soc-theo-yeu-cau")
                      ? "bg-blue-50"
                      : "hover:bg-blue-50"
                  } rounded-lg transition-all duration-200 block text-sm`}
                  onClick={() =>
                    handleNavClick("/dich-vu/cham-soc-theo-yeu-cau")
                  }
                >
                  Chăm sóc theo yêu cầu
                </Link>
                <Link
                  to="/dich-vu/bac-si-gia-dinh"
                  className={`px-4 py-2 ${getActiveStyles(
                    "/dich-vu/bac-si-gia-dinh"
                  )} ${
                    isActiveLink("/dich-vu/bac-si-gia-dinh")
                      ? "bg-blue-50"
                      : "hover:bg-blue-50"
                  } rounded-lg transition-all duration-200 block text-sm`}
                  onClick={() => handleNavClick("/dich-vu/bac-si-gia-dinh")}
                >
                  Bác sĩ gia đình
                </Link>
              </div>
            </div>

            <Link
              to="/cham-soc-vien"
              className={`px-4 py-3 ${getActiveStyles("/cham-soc-vien")} ${
                isActiveLink("/cham-soc-vien")
                  ? "bg-blue-50"
                  : "hover:bg-blue-50"
              } rounded-lg transition-all duration-200 font-medium`}
              onClick={() => handleNavClick("/cham-soc-vien")}
            >
              Chăm sóc viên
            </Link>

            <Link
              to="/dao-tao"
              className={`px-4 py-3 ${getActiveStyles("/dao-tao")} ${
                isActiveLink("/dao-tao") ? "bg-blue-50" : "hover:bg-blue-50"
              } rounded-lg transition-all duration-200 font-medium`}
              onClick={() => handleNavClick("/dao-tao")}
            >
              Đào tạo
            </Link>

            <Link
              to="/tin-tuc"
              className={`px-4 py-3 ${getActiveStyles("/tin-tuc")} ${
                isActiveLink("/tin-tuc") ? "bg-blue-50" : "hover:bg-blue-50"
              } rounded-lg transition-all duration-200 font-medium`}
              onClick={() => handleNavClick("/tin-tuc")}
            >
              Tin tức
            </Link>

            <Link
              to="/vi-cong-dong"
              className={`px-4 py-3 ${getActiveStyles("/vi-cong-dong")} ${
                isActiveLink("/vi-cong-dong")
                  ? "bg-blue-50"
                  : "hover:bg-blue-50"
              } rounded-lg transition-all duration-200 font-medium`}
              onClick={() => handleNavClick("/vi-cong-dong")}
            >
              Vì cộng đồng
            </Link>

            {/* Mobile CTA Button */}
            <Link
              to="/lien-he"
              className="
                mx-4 mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 
                bg-gradient-to-r from-blue-600 to-blue-700 
                hover:from-blue-700 hover:to-blue-800 
                text-white font-medium rounded-full min-h-[44px]
                transition-all duration-300 ease-out
                transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              "
              onClick={() => handleNavClick("/lien-he")}
            >
              <Phone size={16} />
              Liên hệ ngay
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
