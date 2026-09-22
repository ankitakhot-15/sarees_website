import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, MapPin, Phone, Sparkles } from "lucide-react";
import { Hero } from "../components/home/Hero";
import { CategorySection } from "../components/home/CategorySection";
import { FeaturedCollection } from "../components/home/FeaturedCollection";
import { NewArrivals } from "../components/home/NewArrivals";
import { WhyChooseUs } from "../components/home/WhyChooseUs";
import { Testimonials } from "../components/home/Testimonials";
import { VirtualTryOnModal } from "../components/virtualTryOn/VirtualTryOnModal";
import type { SareeProduct, SareeColor } from "../data/products";
import { shopConfig } from "../config/shopConfig";
import { openWhatsAppDirectChat } from "../services/whatsappService";

export const Home: React.FC = () => {
  const [tryOnProduct, setTryOnProduct] = useState<SareeProduct | null>(null);
  const [tryOnColor, setTryOnColor] = useState<SareeColor | undefined>(undefined);

  const handleOpenTryOn = (product: SareeProduct, color: SareeColor) => {
    setTryOnProduct(product);
    setTryOnColor(color);
  };

  return (
    <div>
      <Hero />
      <CategorySection />
      <FeaturedCollection onTryOn={handleOpenTryOn} />
      <NewArrivals onTryOn={handleOpenTryOn} />
      <WhyChooseUs />
      <Testimonials />

      {/* Showroom Visit Invitation Banner */}
      <section className="bg-[#3E0916] text-[#FFFDF8] py-16 px-4 sm:px-6 lg:px-8 border-t-2 border-[#C9A227]/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#C9A227] tracking-[0.25em] uppercase font-semibold">
            <span>✦</span>
            <span>Experience The Grandeur In Person</span>
            <span>✦</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
            Visit Our Kolhapur Handloom Showroom
          </h2>

          <p className="text-sm sm:text-base text-[#F8F1E5]/80 max-w-2xl mx-auto font-light leading-relaxed">
            Witness the drape, feel the silk weight, and explore over 600 authentic handloom weaves with personal assistance from our master drapers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/shop"
              className="w-full sm:w-auto bg-[#C9A227] text-[#2C1B16] hover:bg-[#DFBB4C] font-semibold text-sm py-3.5 px-8 rounded-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MapPin size={17} />
              <span>Showroom Location & Timings</span>
            </Link>

            <button
              onClick={openWhatsAppDirectChat}
              className="w-full sm:w-auto bg-[#25D366] text-white hover:bg-[#1EBE5D] font-medium text-sm py-3.5 px-7 rounded-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle size={18} />
              <span>Plan Visit on WhatsApp</span>
            </button>
          </div>
        </div>
      </section>

      {/* Virtual Try-On Modal */}
      {tryOnProduct && (
        <VirtualTryOnModal
          isOpen={!!tryOnProduct}
          onClose={() => setTryOnProduct(null)}
          product={tryOnProduct}
          initialColor={tryOnColor}
        />
      )}
    </div>
  );
};
