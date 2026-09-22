import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Eye, Sparkles } from "lucide-react";
import type { SareeProduct, SareeColor } from "../../data/products";
import { ColorSelector } from "./ColorSelector";
import { formatPrice } from "../../utils/formatPrice";
import { openWhatsAppEnquiry } from "../../services/whatsappService";

export interface ProductCardProps {
  product: SareeProduct;
  onTryOn?: (product: SareeProduct, color: SareeColor) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onTryOn }) => {
  const [selectedColor, setSelectedColor] = useState<SareeColor>(
    product.colors[0] || { name: "Default", value: "#5A1022", image: product.gallery[0] }
  );
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleColorChange = (newColor: SareeColor) => {
    setSelectedColor(newColor);
    setIsImageLoaded(false);
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openWhatsAppEnquiry(product, selectedColor);
  };

  const handleTryOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onTryOn?.(product, selectedColor);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group bg-[#FFFDF8] border border-[#F8F1E5] hover:border-[#C9A227]/50 rounded-sm shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Top Image Showcase */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F8F1E5]/60">
        <Link to={`/sarees/${product.id}`} className="block w-full h-full">
          <AnimatePresence mode="wait">
            <motion.img
              key={selectedColor.name}
              src={selectedColor.image}
              alt={`${product.name} in ${selectedColor.name}`}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              onLoad={() => setIsImageLoaded(true)}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {product.newArrival && (
            <span className="bg-[#5A1022] text-[#FFFDF8] text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-xs shadow-xs">
              New Arrival
            </span>
          )}
          {product.featured && !product.newArrival && (
            <span className="bg-[#C9A227] text-[#2C1B16] text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-xs shadow-xs">
              Heritage Pick
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-[#7A1730]/90 backdrop-blur-xs text-[#FFFDF8] text-[10px] font-semibold px-2 py-0.5 rounded-xs w-max">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Try-on Quick Action overlay */}
        {onTryOn && (
          <button
            onClick={handleTryOnClick}
            className="absolute top-3 right-3 bg-[#FFFDF8]/90 hover:bg-[#5A1022] hover:text-[#FFFDF8] text-[#5A1022] text-xs font-medium px-2.5 py-1.5 rounded-sm shadow-sm backdrop-blur-xs flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 border border-[#C9A227]/40 cursor-pointer"
            title="Try this saree virtually with AI"
          >
            <Sparkles size={12} className="text-[#C9A227]" />
            <span className="text-[11px]">Virtual Try</span>
          </button>
        )}

        {/* Selected Color tag */}
        <div className="absolute bottom-2.5 left-3 bg-[#2C1B16]/80 backdrop-blur-xs text-[#FFFDF8] text-[10px] font-medium px-2 py-0.5 rounded-xs">
          Shade: {selectedColor.name}
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between gap-3">
        <div>
          <div className="flex items-center justify-between text-xs text-[#7A1730] font-medium tracking-wider uppercase mb-1">
            <span>{product.category} Silk</span>
            <span className="text-[11px] text-[#2C1B16]/60">★ {product.rating}</span>
          </div>

          <Link to={`/sarees/${product.id}`} className="block">
            <h3 className="font-serif text-lg text-[#2C1B16] font-medium hover:text-[#5A1022] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-[#2C1B16]/65 line-clamp-2 mt-1 leading-relaxed font-light">
            {product.description}
          </p>
        </div>

        {/* Price display */}
        <div className="flex items-baseline gap-2 pt-1 border-t border-[#F8F1E5]">
          <span className="text-lg font-bold text-[#5A1022]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-[#2C1B16]/45 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Color Palette Selector */}
        <div className="pt-1">
          <ColorSelector
            colors={product.colors}
            selectedColor={selectedColor}
            onSelectColor={handleColorChange}
            size="sm"
            showLabel={false}
          />
        </div>

        {/* Card Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 mt-auto">
          <Link
            to={`/sarees/${product.id}`}
            className="inline-flex items-center justify-center gap-1 text-xs font-medium py-2 px-2.5 rounded-sm border border-[#5A1022]/40 text-[#5A1022] hover:bg-[#5A1022] hover:text-[#FFFDF8] transition-colors"
          >
            <Eye size={13} />
            <span>Details</span>
          </Link>

          <button
            onClick={handleWhatsAppClick}
            className="inline-flex items-center justify-center gap-1.5 text-xs font-medium py-2 px-2.5 rounded-sm bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-xs transition-colors cursor-pointer"
            title={`Enquire on WhatsApp for ${product.name} in ${selectedColor.name}`}
          >
            <MessageCircle size={13} />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
