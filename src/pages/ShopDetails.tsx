import React from "react";
import { MapPin, Phone, MessageCircle, Clock, Mail, Navigation, CheckCircle2, Sparkles } from "lucide-react";
import { shopConfig } from "../config/shopConfig";
import { SectionTitle } from "../components/common/SectionTitle";
import { Button } from "../components/common/Button";
import { openWhatsAppDirectChat } from "../services/whatsappService";

export const ShopDetails: React.FC = () => {
  return (
    <div className="py-12 sm:py-20 bg-[#FFFDF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Visit Our Flagship Store"
          title="Showroom Location & Timings"
          subtitle="Experience the tactile grandeur of pure silks in person. Our Kolhapur showroom offers a serene, spacious shopping experience with personalized draper assistance."
        />

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-10">
          {/* Left Column: Essential Store Info (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#FAF5EB]/70 border border-[#F8F1E5] p-6 sm:p-8 rounded-sm space-y-6">
              {/* Store Identity */}
              <div className="border-b border-[#F8F1E5] pb-5">
                <span className="text-xs uppercase tracking-widest text-[#7A1730] font-semibold block mb-1">
                  Heritage Flagship Showroom
                </span>
                <h2 className="font-serif text-3xl text-[#2C1B16] font-medium">
                  {shopConfig.name}
                </h2>
                <p className="text-xs text-[#2C1B16]/70 mt-1 font-light italic">
                  {shopConfig.tagline}
                </p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#5A1022]/10 text-[#5A1022] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-serif text-base text-[#2C1B16] font-semibold mb-1">
                    Store Address
                  </h4>
                  <p className="text-sm text-[#2C1B16]/80 leading-relaxed font-light">
                    {shopConfig.address}
                  </p>
                  <p className="text-xs text-[#2C1B16]/60 mt-1">
                    Landmark: Near Janata Sahakari Bank, Central Rajarampuri
                  </p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#5A1022]/10 text-[#5A1022] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-serif text-base text-[#2C1B16] font-semibold mb-1">
                    Showroom Timings
                  </h4>
                  <div className="text-sm text-[#2C1B16]/80 font-light space-y-1">
                    <p className="flex justify-between max-w-sm">
                      <span>Monday – Saturday:</span>
                      <strong className="text-[#5A1022] font-medium">{shopConfig.hoursDetail.weekdays}</strong>
                    </p>
                    <p className="flex justify-between max-w-sm">
                      <span>Sunday:</span>
                      <strong className="text-[#5A1022] font-medium">{shopConfig.hoursDetail.sunday}</strong>
                    </p>
                  </div>
                  <p className="text-xs text-[#2C1B16]/60 mt-1">
                    Open on all major Hindu festivals and wedding season weekends.
                  </p>
                </div>
              </div>

              {/* Phone & WhatsApp Contact */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#5A1022]/10 text-[#5A1022] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-serif text-base text-[#2C1B16] font-semibold mb-1">
                    Direct Showroom Inquiries
                  </h4>
                  <p className="text-sm text-[#2C1B16]/80 font-light">
                    Mobile & WhatsApp: <span className="font-semibold text-[#5A1022]">{shopConfig.displayPhone}</span>
                  </p>
                  <p className="text-sm text-[#2C1B16]/80 font-light mt-0.5">
                    Landline: <span className="font-semibold text-[#2C1B16]">{shopConfig.secondaryPhone}</span>
                  </p>
                  <p className="text-sm text-[#2C1B16]/80 font-light mt-0.5">
                    Email: <span className="text-[#5A1022]">{shopConfig.email}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#F8F1E5]">
                <a
                  href={`tel:${shopConfig.phone}`}
                  className="bg-[#5A1022] hover:bg-[#7A1730] text-[#FFFDF8] py-3 px-4 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone size={15} />
                  <span>Call Now</span>
                </a>

                <button
                  onClick={openWhatsAppDirectChat}
                  className="bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-4 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp</span>
                </button>

                <a
                  href={shopConfig.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FFFDF8] hover:bg-[#F8F1E5] text-[#2C1B16] border border-[#2C1B16]/30 py-3 px-4 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <Navigation size={15} />
                  <span>Directions</span>
                </a>
              </div>
            </div>

            {/* In-Store Showroom Facilities */}
            <div className="bg-[#FFFDF8] border border-[#F8F1E5] p-6 rounded-sm">
              <h4 className="font-serif text-lg text-[#2C1B16] font-semibold mb-3">
                Showroom Amenities & Services
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#2C1B16]/80 font-light">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#C9A227] shrink-0" />
                  <span>Full-length bridal draping trial mirrors</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#C9A227] shrink-0" />
                  <span>Air-conditioned family seating lounge</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#C9A227] shrink-0" />
                  <span>Pure silk zari testing on demand</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#C9A227] shrink-0" />
                  <span>Complimentary Muslin saree bag packaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#C9A227] shrink-0" />
                  <span>All major credit cards, UPI, & Netbanking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#C9A227] shrink-0" />
                  <span>Valet parking assistance available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase & Map Placeholder (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Showroom Image */}
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border-2 border-[#C9A227]/40 shadow-lg">
              <img
                src="/images/sarees/red_kanjivaram.jpg"
                alt="Virasat silk and saree bridal showroom collection"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-[#2C1B16]/85 backdrop-blur-xs text-[#FFFDF8] text-[11px] px-3 py-1 rounded-xs">
                Rajarampuri, Kolhapur
              </div>
            </div>

            {/* Map Frame Card */}
            <div className="bg-[#FAF5EB] p-5 rounded-sm border border-[#F8F1E5] space-y-3">
              <h4 className="font-serif text-base text-[#2C1B16] font-semibold flex items-center gap-2">
                <Navigation size={16} className="text-[#5A1022]" />
                <span>Navigate to Showroom</span>
              </h4>
              <p className="text-xs text-[#2C1B16]/75 font-light leading-relaxed">
                Click below to open exact GPS directions in Google Maps directly on your mobile device.
              </p>
              <a
                href={shopConfig.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-[#5A1022] hover:bg-[#7A1730] text-[#FFFDF8] py-2.5 px-4 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Open Google Maps Navigation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
