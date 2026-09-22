import React from "react";
import { Link } from "react-router-dom";
import { Award, Heart, ShieldCheck, Sparkles, MapPin } from "lucide-react";
import { SectionTitle } from "../components/common/SectionTitle";
import { Button } from "../components/common/Button";
import { shopConfig } from "../config/shopConfig";

export const About: React.FC = () => {
  return (
    <div className="py-12 sm:py-20 bg-[#FFFDF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Top Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#7A1730] block mb-2">
            Showroom Story & Provenance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#2C1B16] leading-tight mb-4">
            Preserving The Sacred Soul of Indian Handlooms
          </h1>
          <div className="flex items-center justify-center gap-3 my-3">
            <span className="h-px w-10 bg-[#C9A227]"></span>
            <span className="text-[#C9A227] text-xs">✦</span>
            <span className="h-px w-10 bg-[#C9A227]"></span>
          </div>
          <p className="text-base sm:text-lg text-[#2C1B16]/80 font-light leading-relaxed">
            {shopConfig.tagline}. Rooted in Kolhapur's rich royal history, we celebrate the master artisans whose looms spin threads of pure silk and gold into timeless heirlooms.
          </p>
        </div>

        {/* Narrative Split 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-sm overflow-hidden border-2 border-[#C9A227]/40 shadow-xl">
              <img
                src="/images/sarees/maroon_bridal.jpg"
                alt="Authentic traditional Indian handloom saree weave"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-[#5A1022] text-[#FFFDF8] p-4 rounded-sm shadow-lg max-w-xs text-xs font-serif italic border border-[#C9A227]/40">
              "A true Paithani takes up to six months of painstaking patience on hand-operated wooden looms."
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C9A227] font-semibold">
              The Kolhapur Legacy
            </span>
            <h2 className="font-serif text-3xl text-[#2C1B16] font-normal">
              Born From Royal Patronage & Cultural Reverence
            </h2>
            <p className="text-sm text-[#2C1B16]/80 leading-relaxed font-light">
              Kolhapur has long stood as an epicenter of regal Maratha culture, devotion, and handloom patronship. At Virasat Silk & Sarees, we carry forward this legacy by maintaining direct ties with master weavers across Yeola, Paithan, Varanasi, and Kanchipuram.
            </p>
            <p className="text-sm text-[#2C1B16]/80 leading-relaxed font-light">
              Every saree in our showroom is selected by hand for its warp and weft tension, natural colorfast dyes, and genuine zari motifs like the iconic peacocks (Mor), parrots (Popat), and blooming lotuses (Kamal).
            </p>
          </div>
        </div>

        {/* Three Guiding Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-y border-[#F8F1E5] my-16 bg-[#FAF5EB]/50 p-8 rounded-sm">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#5A1022]/10 text-[#5A1022] flex items-center justify-center">
              <Award size={24} />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#2C1B16]">
              Silk Purity Guarantee
            </h3>
            <p className="text-xs sm:text-sm text-[#2C1B16]/75 font-light leading-relaxed">
              We never stock synthetic substitutes. Our silks are certified with Silk Mark standards, guaranteeing unadulterated natural mulberry and tussar filaments.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#5A1022]/10 text-[#5A1022] flex items-center justify-center">
              <Heart size={24} />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#2C1B16]">
              Ethical Weaver Sustenance
            </h3>
            <p className="text-xs sm:text-sm text-[#2C1B16]/75 font-light leading-relaxed">
              By working directly with loom clusters, our patronage ensures fair compensations for veteran handloom craftsmen, preserving this ancient Indian art for coming generations.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#5A1022]/10 text-[#5A1022] flex items-center justify-center">
              <Sparkles size={24} />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#2C1B16]">
              Modern Digital Convenience
            </h3>
            <p className="text-xs sm:text-sm text-[#2C1B16]/75 font-light leading-relaxed">
              From our AI Virtual Saree Try-On to real-time WhatsApp video consultations, we make handloom shopping effortless for families worldwide.
            </p>
          </div>
        </div>

        {/* Showroom CTA */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <h3 className="font-serif text-2xl text-[#2C1B16] font-medium">
            We Welcome You to Our Showroom
          </h3>
          <p className="text-xs sm:text-sm text-[#2C1B16]/75 font-light">
            Located in the heart of Rajarampuri, Kolhapur. Open every day from 10:00 AM to 9:00 PM.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link to="/shop">
              <Button variant="primary">
                View Showroom Address & Timings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
