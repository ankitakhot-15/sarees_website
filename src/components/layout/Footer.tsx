import React from "react";
import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, Mail, MessageCircle, Instagram, Facebook, Youtube } from "lucide-react";
import { shopConfig } from "../../config/shopConfig";
import { categories } from "../../data/categories";
import { openWhatsAppDirectChat } from "../../services/whatsappService";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2C1B16] text-[#F8F1E5] pt-16 pb-8 border-t-2 border-[#C9A227]/40 relative overflow-hidden">
      {/* Decorative Gold Border Line Motif */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[#F8F1E5]/10">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#5A1022] flex items-center justify-center text-[#C9A227] border border-[#C9A227]">
                <span className="font-serif text-xl font-bold">V</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[#FFFDF8] font-normal tracking-wide">
                  {shopConfig.name}
                </h3>
                <p className="text-[11px] text-[#C9A227] tracking-widest uppercase font-medium">
                  {shopConfig.tagline}
                </p>
              </div>
            </div>

            <p className="text-sm text-[#F8F1E5]/75 leading-relaxed font-light pt-2">
              Dedicated to preserving the sacred art of traditional Indian handloom weaving. From Yeola Paithani to Kanchipuram mulberry silks, each saree is a certified heirloom woven with pure devotion.
            </p>

            <div className="flex items-center gap-3 pt-3">
              <a
                href={shopConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#FFFDF8]/5 hover:bg-[#5A1022] text-[#C9A227] flex items-center justify-center border border-[#C9A227]/30 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={17} />
              </a>
              <a
                href={shopConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#FFFDF8]/5 hover:bg-[#5A1022] text-[#C9A227] flex items-center justify-center border border-[#C9A227]/30 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={17} />
              </a>
              <a
                href={shopConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#FFFDF8]/5 hover:bg-[#5A1022] text-[#C9A227] flex items-center justify-center border border-[#C9A227]/30 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={17} />
              </a>
              <button
                onClick={openWhatsAppDirectChat}
                className="w-9 h-9 rounded-full bg-[#25D366]/20 hover:bg-[#25D366] text-white flex items-center justify-center border border-[#25D366]/40 transition-colors cursor-pointer"
                aria-label="WhatsApp"
              >
                <MessageCircle size={17} />
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-serif text-lg text-[#FFFDF8] tracking-wider mb-5 flex items-center gap-2">
              <span className="text-[#C9A227]">✦</span> Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F8F1E5]/80 font-light">
              <li>
                <Link to="/" className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5">
                  <span>›</span> Home
                </Link>
              </li>
              <li>
                <Link to="/sarees" className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5">
                  <span>›</span> All Sarees Collection
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5">
                  <span>›</span> Weaving Heritage & Collections
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5">
                  <span>›</span> About Our Handloom Legacy
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5">
                  <span>›</span> Kolhapur Showroom Details
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5">
                  <span>›</span> Contact & Bridal Appointments
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Collections */}
          <div>
            <h4 className="font-serif text-lg text-[#FFFDF8] tracking-wider mb-5 flex items-center gap-2">
              <span className="text-[#C9A227]">✦</span> Saree Collections
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F8F1E5]/80 font-light">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/sarees?category=${encodeURIComponent(cat.slug)}`}
                    className="hover:text-[#C9A227] transition-colors flex items-center gap-1.5"
                  >
                    <span>›</span> {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Showroom Contact */}
          <div>
            <h4 className="font-serif text-lg text-[#FFFDF8] tracking-wider mb-5 flex items-center gap-2">
              <span className="text-[#C9A227]">✦</span> Showroom & Contact
            </h4>
            <div className="space-y-3.5 text-sm text-[#F8F1E5]/80 font-light">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#C9A227] shrink-0 mt-0.5" />
                <p>
                  {shopConfig.address}, {shopConfig.landmark}, {shopConfig.city}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#C9A227] shrink-0" />
                <a
                  href={`tel:${shopConfig.phone}`}
                  className="hover:text-[#C9A227] transition-colors"
                >
                  {shopConfig.displayPhone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MessageCircle size={18} className="text-[#25D366] shrink-0" />
                <button
                  onClick={openWhatsAppDirectChat}
                  className="hover:text-[#C9A227] transition-colors text-left cursor-pointer"
                >
                  WhatsApp: +{shopConfig.whatsapp}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#C9A227] shrink-0" />
                <a
                  href={`mailto:${shopConfig.email}`}
                  className="hover:text-[#C9A227] transition-colors"
                >
                  {shopConfig.email}
                </a>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <Clock size={18} className="text-[#C9A227] shrink-0 mt-0.5" />
                <p>{shopConfig.openingHours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F8F1E5]/60 gap-4">
          <p>© 2026 {shopConfig.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-[#C9A227]">Handwoven with Authenticity</span>
            <span>•</span>
            <Link to="/shop" className="hover:text-[#C9A227] transition-colors">
              Visit Showroom
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
