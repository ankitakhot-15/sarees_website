import React from "react";

export interface SectionTitleProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "center" | "left";
  theme?: "light" | "dark";
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  eyebrow,
  align = "center",
  theme = "light",
  className = "",
}) => {
  const isCenter = align === "center";

  return (
    <div className={`mb-10 md:mb-14 ${isCenter ? "text-center max-w-3xl mx-auto" : "text-left"} ${className}`}>
      {eyebrow && (
        <span
          className={`text-xs uppercase tracking-[0.25em] font-medium block mb-2 ${
            theme === "dark" ? "text-[#C9A227]" : "text-[#7A1730]"
          }`}
        >
          {eyebrow}
        </span>
      )}

      <h2
        className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-tight ${
          theme === "dark" ? "text-[#FFFDF8]" : "text-[#2C1B16]"
        }`}
      >
        {title}
      </h2>

      {/* Decorative Gold Flourish */}
      <div
        className={`flex items-center gap-3 my-3.5 ${
          isCenter ? "justify-center" : "justify-start"
        }`}
      >
        <span className="h-px w-8 bg-[#C9A227]/40"></span>
        <span className="text-[#C9A227] text-xs">✦</span>
        <span className="h-px w-8 bg-[#C9A227]/40"></span>
      </div>

      {subtitle && (
        <p
          className={`text-base sm:text-lg leading-relaxed font-light ${
            theme === "dark" ? "text-[#F8F1E5]/80" : "text-[#2C1B16]/75"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
