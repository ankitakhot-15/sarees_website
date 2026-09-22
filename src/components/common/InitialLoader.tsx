import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { shopConfig } from "../../config/shopConfig";

interface InitialLoaderProps {
  onComplete?: () => void;
}

export const InitialLoader: React.FC<InitialLoaderProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 1400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="initial-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#5A1022] text-[#FFFDF8] px-6 overflow-hidden pointer-events-none"
        >
          {/* Subtle Fabric Wave Background Lines */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:24px_24px]"></div>

          {/* Saree Pallu Fabric Shimmer Swirl */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mb-6"
          >
            <motion.div
              animate={{
                rotate: [0, 180, 360],
                borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "60% 40% 30% 70% / 60% 30% 70% 40%", "30% 70% 70% 30% / 30% 30% 70% 70%"],
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-20 h-20 rounded-full border border-[#C9A227]/40 flex items-center justify-center bg-gradient-to-tr from-[#7A1730] to-[#5A1022] shadow-2xl"
            >
              <span className="text-[#C9A227] text-2xl animate-pulse">✦</span>
            </motion.div>
          </motion.div>

          {/* Store Name with Staggered Entrance */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.25em] text-[#FFFDF8] font-normal mb-2">
              {shopConfig.name}
            </h1>

            <div className="flex items-center justify-center gap-3 my-2">
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "2rem" }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="h-px bg-[#C9A227]"
              />
              <span className="text-[#C9A227] text-xs">✦</span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "2rem" }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="h-px bg-[#C9A227]"
              />
            </div>

            <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-[#F8F1E5]/80 font-light mt-1">
              {shopConfig.tagline}
            </p>
          </motion.div>

          {/* Elegant Gold Shimmer Bar */}
          <div className="mt-8 w-44 h-[2px] bg-[#7A1730] overflow-hidden rounded-full relative">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              className="w-full h-full bg-gradient-to-r from-transparent via-[#C9A227] to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
