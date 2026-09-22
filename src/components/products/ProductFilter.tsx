import React from "react";
import { Filter, X, RotateCcw } from "lucide-react";

export interface FilterState {
  category: string;
  color: string;
  priceRange: string;
  sortBy: string;
}

export interface ProductFilterProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const CATEGORY_OPTIONS = [
  "All",
  "Paithani",
  "Silk",
  "Cotton",
  "Designer",
  "Traditional",
  "Festive",
];

export const COLOR_OPTIONS = [
  { name: "All", value: "" },
  { name: "Purple", value: "#6A1B9A" },
  { name: "Red", value: "#B71C1C" },
  { name: "Green", value: "#1B5E20" },
  { name: "Blue", value: "#1565C0" },
  { name: "Pink", value: "#D81B60" },
  { name: "Maroon", value: "#5A1022" },
  { name: "Yellow", value: "#F57F17" },
  { name: "Black", value: "#212121" },
];

export const PRICE_OPTIONS = [
  { label: "All Prices", value: "all" },
  { label: "Under ₹3,000", value: "under-3000" },
  { label: "₹3,000 – ₹6,000", value: "3000-6000" },
  { label: "₹6,000 – ₹10,000", value: "6000-10000" },
  { label: "Above ₹10,000", value: "above-10000" },
];

export const SORT_OPTIONS = [
  { label: "Featured & Best Picks", value: "featured" },
  { label: "New Arrivals", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

export const ProductFilter: React.FC<ProductFilterProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalResults,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const hasActiveFilters =
    filters.category !== "All" ||
    filters.color !== "All" ||
    filters.priceRange !== "all" ||
    filters.sortBy !== "featured";

  const handleCategorySelect = (cat: string) => {
    onFilterChange({ ...filters, category: cat });
  };

  const handleColorSelect = (col: string) => {
    onFilterChange({ ...filters, color: col });
  };

  const handlePriceSelect = (pr: string) => {
    onFilterChange({ ...filters, priceRange: pr });
  };

  const handleSortSelect = (sort: string) => {
    onFilterChange({ ...filters, sortBy: sort });
  };

  const filterContent = (
    <div className="space-y-7">
      {/* Category Filter */}
      <div>
        <h4 className="font-serif text-base text-[#2C1B16] font-medium tracking-wide mb-3 flex items-center justify-between">
          <span>Weave / Category</span>
          {filters.category !== "All" && (
            <span className="text-[11px] font-sans text-[#5A1022] font-semibold">
              {filters.category}
            </span>
          )}
        </h4>
        <div className="flex flex-col gap-1.5">
          {CATEGORY_OPTIONS.map((cat) => {
            const isSelected = filters.category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategorySelect(cat)}
                className={`text-left text-sm py-1.5 px-3 rounded-xs transition-colors flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? "bg-[#5A1022] text-[#FFFDF8] font-medium"
                    : "text-[#2C1B16]/80 hover:bg-[#F8F1E5] hover:text-[#5A1022]"
                }`}
              >
                <span>{cat === "All" ? "All Sarees" : `${cat} Sarees`}</span>
                {isSelected && <span className="text-xs text-[#C9A227]">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Filter */}
      <div className="pt-4 border-t border-[#F8F1E5]">
        <h4 className="font-serif text-base text-[#2C1B16] font-medium tracking-wide mb-3 flex items-center justify-between">
          <span>Saree Shade</span>
          {filters.color !== "All" && (
            <span className="text-[11px] font-sans text-[#5A1022] font-semibold">
              {filters.color}
            </span>
          )}
        </h4>
        <div className="flex items-center gap-2 flex-wrap">
          {COLOR_OPTIONS.map((c) => {
            const isSelected = filters.color === c.name;
            if (c.name === "All") {
              return (
                <button
                  key="all-color"
                  type="button"
                  onClick={() => handleColorSelect("All")}
                  className={`text-xs px-2.5 py-1 rounded-sm border cursor-pointer ${
                    isSelected
                      ? "bg-[#5A1022] text-[#FFFDF8] border-[#5A1022]"
                      : "bg-[#FFFDF8] text-[#2C1B16]/70 border-[#2C1B16]/20 hover:border-[#5A1022]"
                  }`}
                >
                  All Shades
                </button>
              );
            }
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => handleColorSelect(c.name)}
                className={`relative p-1 rounded-full cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "ring-2 ring-[#5A1022] ring-offset-2 ring-offset-[#FFFDF8] scale-110"
                    : "hover:scale-105"
                }`}
                title={c.name}
              >
                <span
                  className="block w-5 h-5 rounded-full border border-black/15 shadow-inner"
                  style={{ backgroundColor: c.value }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="pt-4 border-t border-[#F8F1E5]">
        <h4 className="font-serif text-base text-[#2C1B16] font-medium tracking-wide mb-3">
          Price Range
        </h4>
        <div className="space-y-1.5">
          {PRICE_OPTIONS.map((p) => {
            const isSelected = filters.priceRange === p.value;
            return (
              <label
                key={p.value}
                className="flex items-center gap-2.5 text-sm text-[#2C1B16]/80 hover:text-[#5A1022] cursor-pointer py-1"
              >
                <input
                  type="radio"
                  name="priceRange"
                  value={p.value}
                  checked={isSelected}
                  onChange={() => handlePriceSelect(p.value)}
                  className="accent-[#5A1022] cursor-pointer"
                />
                <span className={isSelected ? "font-semibold text-[#5A1022]" : ""}>
                  {p.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Clear Filters CTA */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-[#F8F1E5]">
          <button
            type="button"
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold uppercase tracking-wider text-[#5A1022] hover:bg-[#5A1022]/10 rounded-sm transition-colors border border-[#5A1022]/30 cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Filter */}
      <div className="hidden lg:block w-64 shrink-0 bg-[#FFFDF8] border border-[#F8F1E5] rounded-sm p-5 shadow-xs self-start sticky top-24">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F8F1E5]">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-[#5A1022]" />
            <h3 className="font-serif text-lg font-semibold text-[#2C1B16]">
              Filter Sarees
            </h3>
          </div>
          <span className="text-xs text-[#2C1B16]/60">
            {totalResults} {totalResults === 1 ? "saree" : "sarees"}
          </span>
        </div>

        {filterContent}
      </div>

      {/* Mobile Drawer Filter */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative ml-auto w-full max-w-xs bg-[#FFFDF8] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#F8F1E5] mb-5">
                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-[#5A1022]" />
                  <h3 className="font-serif text-lg font-semibold text-[#2C1B16]">
                    Filters ({totalResults})
                  </h3>
                </div>
                <button
                  onClick={onCloseMobile}
                  className="p-1 text-[#2C1B16]/60 hover:text-[#5A1022]"
                >
                  <X size={20} />
                </button>
              </div>

              {filterContent}
            </div>

            <div className="pt-6 border-t border-[#F8F1E5] mt-6">
              <button
                onClick={onCloseMobile}
                className="w-full bg-[#5A1022] text-[#FFFDF8] py-3 rounded-sm font-medium hover:bg-[#7A1730] transition-colors"
              >
                Apply Filters ({totalResults})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
