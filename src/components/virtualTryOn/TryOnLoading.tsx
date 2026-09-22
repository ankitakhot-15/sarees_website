import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export interface TryOnLoadingProps {
  sareeName: string;
  selectedColor: string;
}

const MESSAGES = [
  "Analyzing portrait posture & lighting...",
  "Aligning traditional silk pleats & zari borders...",
  "Draping authentic handloom pallu on shoulder...",
  "Fine-tuning luster and textile weave details...",
  "Polishing your virtual saree look...",
];

export const TryOnLoading: React.FC<TryOnLoadingProps> = ({
  sareeName,
  selectedColor,
}) => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="py-12 px-6 flex flex-col items-center justify-center text-center space-y-6"
      role="status"
      aria-live="polite"
    >
      {/* Saree Fabric Shimmer Graphic */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Pulsing Outer Rings */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border-2 border-[#C9A227]/40"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="w-20 h-20 rounded-full border-2 border-dashed border-[#5A1022] flex items-center justify-center bg-[#F8F1E5]"
        >
          <Sparkles size={28} className="text-[#C9A227] animate-pulse" />
        </motion.div>
      </div>

      <div className="space-y-2 max-w-sm">
        <h3 className="font-serif text-2xl text-[#2C1B16] font-medium">
          Creating your saree look...
        </h3>
        <p className="text-xs text-[#5A1022] font-semibold uppercase tracking-wider">
          {sareeName} • {selectedColor}
        </p>
        <p className="text-xs text-[#2C1B16]/70 min-h-[1.5rem] font-light">
          {MESSAGES[msgIndex]}
        </p>
      </div>

      {/* Gold Shimmer Progress Indicator */}
      <div className="w-56 h-1.5 bg-[#F8F1E5] rounded-full overflow-hidden relative">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          className="w-full h-full bg-gradient-to-r from-[#5A1022] via-[#C9A227] to-[#7A1730]"
        />
      </div>

      <p className="text-[11px] text-[#2C1B16]/50 italic">
        We are weaving your virtual preview with high-precision drape estimation.
      </p>
    </div>
  );
};
