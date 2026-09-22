import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { MessageCircle, ArrowRight, Sparkles, Award } from "lucide-react";
import { Button } from "../common/Button";
import { shopConfig } from "../../config/shopConfig";
import { openWhatsAppDirectChat } from "../../services/whatsappService";

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-[#FFFDF8] via-[#F8F1E5]/40 to-[#FFFDF8] pt-8 pb-16 lg:py-20 overflow-hidden border-b border-[#F8F1E5]">
      {/* Subtle Indian Textile Loom Motif in Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none -mr-20 -mt-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5A1022]/10 border border-[#5A1022]/20 text-[#5A1022] text-xs font-semibold uppercase tracking-[0.2em]">
              <span className="text-[#C9A227]">✦</span>
              <span>Authentic Maharashtrian & Royal Weaves</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#2C1B16] leading-[1.08] tracking-tight">
              Elegance Woven in Every <span className="italic text-[#5A1022]">Thread</span>
            </h1>

            {/* Decorative Gold Accent Line */}
            <div className="flex items-center gap-3 py-1">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "3.5rem" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-[2px] bg-[#C9A227]"
              />
              <span className="text-[#C9A227] text-xs">✦</span>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "1.5rem" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-[1px] bg-[#C9A227]/60"
              />
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#2C1B16]/80 max-w-xl leading-relaxed font-light">
              Discover timeless sarees crafted with tradition, beauty, and exquisite detail. From authentic Yeola Paithani to regal Kanchipuram silks, each piece is an eternal family heirloom.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link to="/sarees">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight size={18} />}
                  iconPosition="right"
                  className="w-full sm:w-auto"
                >
                  Explore Collection
                </Button>
              </Link>

              <button
                onClick={openWhatsAppDirectChat}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-sm bg-[#25D366] hover:bg-[#1EBE5D] text-white font-medium text-base tracking-wide shadow-sm hover:shadow transition-all duration-300 cursor-pointer"
              >
                <MessageCircle size={20} />
                <span>Chat on WhatsApp</span>
              </button>
            </div>

            {/* Micro Trust Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#F8F1E5]">
              <div>
                <p className="font-serif text-2xl font-bold text-[#5A1022]">100%</p>
                <p className="text-xs text-[#2C1B16]/70 uppercase tracking-wider font-light">Pure Loom Silk</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#5A1022]">600+</p>
                <p className="text-xs text-[#2C1B16]/70 uppercase tracking-wider font-light">Curated Designs</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#5A1022]">Kolhapur</p>
                <p className="text-xs text-[#2C1B16]/70 uppercase tracking-wider font-light">Heritage Showroom</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero High Fashion Saree Imagery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Outer Gold Ornamental Border Frame */}
            <div className="relative mx-auto max-w-md lg:max-w-none aspect-[3/4] rounded-sm overflow-hidden border-4 border-[#C9A227]/40 shadow-2xl group">
              <img
                src="/images/sarees/purple_paithani.jpg"
                alt="Royal Yeola Paithani Saree in rich purple with pure gold zari peacock pallu"
                className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Bottom Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1B16]/80 via-transparent to-transparent opacity-80 pointer-events-none"></div>

              {/* Caption Overlay */}
              <div className="absolute bottom-5 inset-x-5 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#C9A227] font-semibold block">
                  Showroom Highlight
                </span>
                <p className="font-serif text-xl font-normal leading-snug">
                  Royal Yeola Paithani Peacock Edition
                </p>
                <p className="text-xs text-white/80 font-light mt-0.5">
                  Woven with pure tested gold zari
                </p>
              </div>
            </div>

            {/* Floating Trust Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-6 -left-4 sm:-left-6 bg-[#FFFDF8] border border-[#C9A227] p-3.5 rounded-sm shadow-xl flex items-center gap-3 backdrop-blur-xs"
            >
              <div className="w-10 h-10 rounded-full bg-[#5A1022] text-[#C9A227] flex items-center justify-center shrink-0">
                <Award size={20} />
              </div>
              <div className="text-left pr-2">
                <p className="text-xs font-semibold text-[#5A1022] leading-tight">
                  Certified Silk Mark
                </p>
                <p className="text-[10px] text-[#2C1B16]/70">
                  Govt. of India Quality Standard
                </p>
              </div>
            </motion.div>

            {/* Floating Try-On Teaser Pill */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -top-3 -right-3 sm:-right-4 bg-[#5A1022] text-[#FFFDF8] py-2 px-3.5 rounded-full shadow-lg border border-[#C9A227] flex items-center gap-2"
            >
              <Sparkles size={14} className="text-[#C9A227]" />
              <span className="text-xs font-medium tracking-wide">AI Virtual Try-On Live</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
