import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Menu, X, Phone, MapPin, Sparkles } from "lucide-react";
import { shopConfig } from "../../config/shopConfig";
import { siteConfig } from "../../config/siteConfig";
import { openWhatsAppDirectChat } from "../../services/whatsappService";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  return (
    <>
      {/* Top Heritage Notice Bar */}
      <div className="bg-[#3E0916] text-[#F8F1E5] text-xs py-1.5 px-4 border-b border-[#C9A227]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#C9A227]">✦</span>
            <span className="font-light tracking-wider hidden sm:inline">
              Kolhapur Showroom & Handloom Emporium
            </span>
            <span className="font-light tracking-wider sm:hidden">
              Kolhapur Handloom Emporium
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] tracking-wide">
            <a
              href={`tel:${shopConfig.phone}`}
              className="hover:text-[#C9A227] transition-colors flex items-center gap-1"
            >
              <Phone size={12} className="text-[#C9A227]" />
              <span className="hidden md:inline">{shopConfig.displayPhone}</span>
              <span className="md:hidden">Call Showroom</span>
            </a>
            <span className="text-[#C9A227]/40 hidden md:inline">|</span>
            <Link
              to="/shop"
              className="hover:text-[#C9A227] transition-colors hidden md:flex items-center gap-1"
            >
              <MapPin size={12} className="text-[#C9A227]" />
              <span>{shopConfig.city}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#FFFDF8]/95 backdrop-blur-md shadow-md py-3.5 border-b border-[#F8F1E5]"
            : "bg-[#FFFDF8] py-4 border-b border-[#F8F1E5]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#5A1022] flex items-center justify-center text-[#C9A227] border border-[#C9A227]/40 shadow-sm group-hover:scale-105 transition-transform duration-300">
              <span className="font-serif text-lg font-bold">V</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl tracking-wider text-[#5A1022] font-semibold leading-tight group-hover:text-[#7A1730] transition-colors">
                {shopConfig.name}
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A227] font-medium">
                {shopConfig.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {siteConfig.navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm tracking-wide font-medium relative py-1 transition-colors ${
                    isActive
                      ? "text-[#5A1022] font-semibold"
                      : "text-[#2C1B16]/80 hover:text-[#5A1022]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#5A1022]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {/* Try-on shortcut hint in navbar */}
            <Link
              to="/sarees"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#5A1022] bg-[#F8F1E5] hover:bg-[#5A1022] hover:text-[#FFFDF8] px-3 py-1.5 rounded-sm border border-[#C9A227]/30 transition-all duration-300"
            >
              <Sparkles size={13} className="text-[#C9A227]" />
              <span className="font-medium">AI Try-On</span>
            </Link>

            {/* WhatsApp Enquiry Button */}
            <button
              onClick={openWhatsAppDirectChat}
              className="inline-flex items-center gap-2 bg-[#25D366] text-white hover:bg-[#1EBE5D] px-3.5 sm:px-4 py-2 rounded-sm text-xs sm:text-sm font-medium tracking-wide shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
              title="Chat with showroom on WhatsApp"
            >
              <MessageCircle size={16} />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#5A1022] hover:bg-[#F8F1E5] rounded-sm transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[82%] max-w-sm bg-[#FFFDF8] shadow-2xl flex flex-col justify-between p-6 border-l border-[#C9A227]/20 lg:hidden overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-[#F8F1E5]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#5A1022] flex items-center justify-center text-[#C9A227]">
                      <span className="font-serif text-sm font-bold">V</span>
                    </div>
                    <span className="font-serif text-lg font-semibold text-[#5A1022]">
                      {shopConfig.name}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 text-[#2C1B16]/60 hover:text-[#5A1022] rounded-full hover:bg-[#F8F1E5] transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="py-6 flex flex-col gap-3">
                  {siteConfig.navLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-base py-2.5 px-3 rounded-sm transition-colors flex items-center justify-between ${
                          isActive
                            ? "bg-[#5A1022] text-[#FFFDF8] font-semibold"
                            : "text-[#2C1B16] hover:bg-[#F8F1E5]"
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive && <span className="text-[#C9A227]">✦</span>}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Footer Details */}
              <div className="pt-6 border-t border-[#F8F1E5] flex flex-col gap-4">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openWhatsAppDirectChat();
                  }}
                  className="w-full bg-[#25D366] text-white py-3 rounded-sm flex items-center justify-center gap-2 font-medium shadow-sm hover:bg-[#1EBE5D] transition-colors"
                >
                  <MessageCircle size={18} />
                  <span>Enquire on WhatsApp</span>
                </button>

                <a
                  href={`tel:${shopConfig.phone}`}
                  className="w-full bg-[#F8F1E5] text-[#5A1022] border border-[#5A1022]/30 py-3 rounded-sm flex items-center justify-center gap-2 font-medium hover:bg-[#5A1022] hover:text-[#FFFDF8] transition-colors"
                >
                  <Phone size={18} />
                  <span>Call {shopConfig.displayPhone}</span>
                </a>

                <div className="text-center text-xs text-[#2C1B16]/60 pt-2 font-light">
                  <p>{shopConfig.address}</p>
                  <p>{shopConfig.city}</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
