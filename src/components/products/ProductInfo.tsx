import React from "react";
import { MessageCircle, Sparkles, Phone, ShieldCheck, CheckCircle2, RefreshCw } from "lucide-react";
import type { SareeProduct, SareeColor } from "../../data/products";
import { ColorSelector } from "./ColorSelector";
import { formatPrice } from "../../utils/formatPrice";
import { shopConfig } from "../../config/shopConfig";
import { openWhatsAppEnquiry } from "../../services/whatsappService";

export interface ProductInfoProps {
  product: SareeProduct;
  selectedColor: SareeColor;
  onSelectColor: (color: SareeColor) => void;
  onOpenTryOn: () => void;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  selectedColor,
  onSelectColor,
  onOpenTryOn,
}) => {
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleWhatsApp = () => {
    openWhatsAppEnquiry(product, selectedColor);
  };

  return (
    <div className="space-y-6">
      {/* Category & Rating */}
      <div className="flex items-center justify-between text-xs tracking-wider">
        <span className="text-[#7A1730] font-semibold uppercase">
          {product.category} Silk Weave
        </span>
        <div className="flex items-center gap-1.5 text-[#C9A227] font-semibold">
          <span>★ {product.rating}</span>
          <span className="text-[#2C1B16]/50">({product.reviewsCount} customer reviews)</span>
        </div>
      </div>

      {/* Saree Title */}
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#2C1B16] font-normal leading-tight">
          {product.name}
        </h1>
        <p className="text-xs text-[#2C1B16]/60 font-light mt-1">
          Handcrafted in authentic traditional looms • Certified Pure Weave
        </p>
      </div>

      {/* Price Section */}
      <div className="flex items-baseline gap-3 p-4 bg-[#F8F1E5]/50 border border-[#F8F1E5] rounded-sm">
        <span className="text-3xl font-bold text-[#5A1022]">
          {formatPrice(product.price)}
        </span>
        {product.originalPrice > product.price && (
          <span className="text-base text-[#2C1B16]/50 line-through">
            {formatPrice(product.originalPrice)}
          </span>
        )}
        {discountPercent > 0 && (
          <span className="text-xs bg-[#5A1022] text-[#FFFDF8] font-semibold px-2 py-0.5 rounded-xs">
            Save {discountPercent}%
          </span>
        )}
      </div>

      {/* Interactive Color Selection - Core Feature */}
      <div className="p-4 bg-[#FFFDF8] border border-[#C9A227]/30 rounded-sm space-y-2">
        <ColorSelector
          colors={product.colors}
          selectedColor={selectedColor}
          onSelectColor={onSelectColor}
          size="md"
          showLabel={true}
        />
        <p className="text-[11px] text-[#2C1B16]/60 italic">
          *Changing shade instantly switches the saree photograph and updates the WhatsApp enquiry.
        </p>
      </div>

      {/* Primary Action Buttons */}
      <div className="space-y-3 pt-2">
        {/* Virtual Try-On CTA */}
        <button
          onClick={onOpenTryOn}
          className="w-full bg-gradient-to-r from-[#5A1022] via-[#7A1730] to-[#5A1022] hover:from-[#7A1730] hover:to-[#5A1022] text-[#FFFDF8] py-3.5 px-6 rounded-sm font-semibold tracking-wide flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all duration-300 border border-[#C9A227]/50 cursor-pointer group"
        >
          <Sparkles size={18} className="text-[#C9A227] animate-pulse" />
          <span>✨ Try This Saree (Virtual Drape)</span>
        </button>

        {/* WhatsApp Enquiry Button */}
        <button
          onClick={handleWhatsApp}
          className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 px-6 rounded-sm font-semibold tracking-wide flex items-center justify-center gap-2.5 shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
        >
          <MessageCircle size={18} />
          <span>Enquire on WhatsApp ({selectedColor.name})</span>
        </button>

        {/* Direct Call Button */}
        <a
          href={`tel:${shopConfig.phone}`}
          className="w-full bg-[#F8F1E5] hover:bg-[#2C1B16] text-[#5A1022] hover:text-[#FFFDF8] border border-[#5A1022]/30 py-3 px-6 rounded-sm font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200"
        >
          <Phone size={16} />
          <span>Call Showroom ({shopConfig.displayPhone})</span>
        </a>
      </div>

      {/* Product Description */}
      <div className="pt-2">
        <h3 className="font-serif text-lg text-[#2C1B16] font-medium mb-2">
          Saree Description
        </h3>
        <p className="text-sm text-[#2C1B16]/80 leading-relaxed font-light">
          {product.description}
        </p>
      </div>

      {/* Detailed Specifications Grid */}
      <div className="pt-4 border-t border-[#F8F1E5]">
        <h3 className="font-serif text-lg text-[#2C1B16] font-medium mb-3">
          Specifications & Weave Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
          <div className="flex justify-between py-1.5 border-b border-[#F8F1E5]">
            <span className="text-[#2C1B16]/60">Fabric:</span>
            <span className="font-medium text-[#2C1B16]">{product.fabric}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#F8F1E5]">
            <span className="text-[#2C1B16]/60">Saree Length:</span>
            <span className="font-medium text-[#2C1B16]">{product.sareeLength}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#F8F1E5]">
            <span className="text-[#2C1B16]/60">Blouse Piece:</span>
            <span className="font-medium text-[#2C1B16]">
              {product.blouseIncluded ? "Included (Unstitched)" : "Not Included"}
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#F8F1E5]">
            <span className="text-[#2C1B16]/60">Zari Type:</span>
            <span className="font-medium text-[#2C1B16]">{product.zariType}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#F8F1E5]">
            <span className="text-[#2C1B16]/60">Work / Motifs:</span>
            <span className="font-medium text-[#2C1B16] text-right">{product.work}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#F8F1E5]">
            <span className="text-[#2C1B16]/60">Occasion:</span>
            <span className="font-medium text-[#2C1B16] text-right">{product.occasion}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#F8F1E5] sm:col-span-2">
            <span className="text-[#2C1B16]/60">Care Instructions:</span>
            <span className="font-medium text-[#2C1B16] text-right">{product.careInstructions}</span>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#F8F1E5] text-center text-xs">
        <div className="p-2.5 bg-[#F8F1E5]/40 rounded-sm">
          <ShieldCheck size={20} className="text-[#5A1022] mx-auto mb-1" />
          <span className="font-medium text-[#2C1B16] block">100% Authentic</span>
          <span className="text-[10px] text-[#2C1B16]/60">Pure Loom Tested</span>
        </div>
        <div className="p-2.5 bg-[#F8F1E5]/40 rounded-sm">
          <CheckCircle2 size={20} className="text-[#5A1022] mx-auto mb-1" />
          <span className="font-medium text-[#2C1B16] block">Video Call Check</span>
          <span className="text-[10px] text-[#2C1B16]/60">Available on WhatsApp</span>
        </div>
        <div className="p-2.5 bg-[#F8F1E5]/40 rounded-sm">
          <RefreshCw size={20} className="text-[#5A1022] mx-auto mb-1" />
          <span className="font-medium text-[#2C1B16] block">Muslin Packed</span>
          <span className="text-[10px] text-[#2C1B16]/60">Safe Delivery</span>
        </div>
      </div>
    </div>
  );
};
