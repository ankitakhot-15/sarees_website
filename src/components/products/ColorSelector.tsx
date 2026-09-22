import React from "react";
import type { SareeColor } from "../../data/products";

export interface ColorSelectorProps {
  colors: SareeColor[];
  selectedColor: SareeColor;
  onSelectColor: (color: SareeColor) => void;
  size?: "sm" | "md";
  showLabel?: boolean;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColor,
  onSelectColor,
  size = "md",
  showLabel = true,
}) => {
  const dotSize = size === "sm" ? "w-4 h-4" : "w-6 h-6";

  return (
    <div className="space-y-1.5">
      {showLabel && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#2C1B16]/70 uppercase tracking-wider font-medium">
            Color:
          </span>
          <span className="font-semibold text-[#5A1022]">{selectedColor.name}</span>
        </div>
      )}

      <div className="flex items-center gap-2 flex-wrap" role="radiogroup" aria-label="Saree Color Options">
        {colors.map((color) => {
          const isSelected = selectedColor.name === color.name;
          return (
            <button
              key={color.name}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={`Select ${color.name} color`}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onSelectColor(color);
              }}
              className={`group relative rounded-full p-0.5 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "ring-2 ring-[#5A1022] ring-offset-2 ring-offset-[#FFFDF8] scale-110"
                  : "hover:scale-105 hover:ring-1 hover:ring-[#C9A227]"
              }`}
              title={color.name}
            >
              <span
                className={`block rounded-full border border-black/15 shadow-inner ${dotSize}`}
                style={{ backgroundColor: color.value }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
