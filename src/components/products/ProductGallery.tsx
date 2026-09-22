import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ZoomIn } from "lucide-react";
import type { SareeColor } from "../../data/products";

export interface ProductGalleryProps {
  selectedColor: SareeColor;
  additionalImages?: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  selectedColor,
  additionalImages = [],
  productName,
}) => {
  // Combine current color image with extra gallery views (pallu, border, close-up)
  const allImages = Array.from(
    new Set([selectedColor.image, ...additionalImages])
  );

  const [activeImage, setActiveImage] = useState(selectedColor.image);
  const [isZoomed, setIsZoomed] = useState(false);

  // When selectedColor changes from parent, automatically update active main image!
  useEffect(() => {
    setActiveImage(selectedColor.image);
  }, [selectedColor]);

  return (
    <div className="space-y-4">
      {/* Main Large Image Display */}
      <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-[#F8F1E5]/70 border border-[#F8F1E5] shadow-xs group">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            src={activeImage}
            alt={`${productName} in ${selectedColor.name}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`w-full h-full object-cover object-center transition-transform duration-500 ${
              isZoomed ? "scale-150 cursor-zoom-out" : "group-hover:scale-105 cursor-zoom-in"
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>

        {/* Zoom Hint Indicator */}
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute bottom-3 right-3 bg-[#2C1B16]/75 hover:bg-[#5A1022] text-[#FFFDF8] p-2 rounded-sm shadow-md backdrop-blur-xs transition-colors cursor-pointer"
          title={isZoomed ? "Zoom out" : "Click to zoom fabric"}
        >
          <ZoomIn size={16} />
        </button>

        {/* Active Shade Label Badge */}
        <div className="absolute top-3 left-3 bg-[#5A1022]/90 text-[#FFFDF8] text-xs px-2.5 py-1 rounded-xs tracking-wider backdrop-blur-xs">
          Shade: {selectedColor.name}
        </div>
      </div>

      {/* Thumbnails Row */}
      {allImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {allImages.map((img, idx) => {
            const isCurrent = activeImage === img;
            return (
              <button
                key={`${img}-${idx}`}
                type="button"
                onClick={() => {
                  setActiveImage(img);
                  setIsZoomed(false);
                }}
                className={`relative aspect-[3/4] w-16 sm:w-20 rounded-xs overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                  isCurrent
                    ? "border-[#5A1022] shadow-sm scale-102"
                    : "border-transparent opacity-70 hover:opacity-100 hover:border-[#C9A227]/60"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail view ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
