import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { openWhatsAppDirectChat } from "../../services/whatsappService";

export const FloatingWhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 select-none"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      <div
        className={`bg-[#2C1B16] text-[#FFFDF8] text-xs font-medium py-1.5 px-3 rounded-md shadow-lg border border-[#C9A227]/40 transition-all duration-300 pointer-events-none whitespace-nowrap ${
          showTooltip
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-2 pointer-events-none hidden sm:block"
        }`}
      >
        <span>Chat with us on WhatsApp</span>
        <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#2C1B16] rotate-45 border-t border-r border-[#C9A227]/40"></span>
      </div>

      {/* Pulsing button container */}
      <div className="relative">
        {/* Soft pulse wave */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none"></span>

        <button
          onClick={openWhatsAppDirectChat}
          className="relative w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-xl hover:bg-[#1EBE5D] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-white/80"
          aria-label="Chat with showroom on WhatsApp"
        >
          <MessageCircle size={30} className="fill-white/20 stroke-white stroke-[2.2]" />
        </button>
      </div>
    </div>
  );
};
