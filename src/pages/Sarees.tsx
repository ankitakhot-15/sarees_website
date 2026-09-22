import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, SlidersHorizontal, Sparkles } from "lucide-react";
import { products, type SareeProduct, type SareeColor } from "../data/products";
import { ProductGrid } from "../components/products/ProductGrid";
import {
  ProductFilter,
  type FilterState,
  SORT_OPTIONS,
} from "../components/products/ProductFilter";
import { VirtualTryOnModal } from "../components/virtualTryOn/VirtualTryOnModal";
import { SectionTitle } from "../components/common/SectionTitle";

export const Sarees: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial query params from URL
  const initialCategory = searchParams.get("category") || "All";
  const initialColor = searchParams.get("color") || "All";

  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    color: initialColor,
    priceRange: "all",
    sortBy: "featured",
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [tryOnProduct, setTryOnProduct] = useState<SareeProduct | null>(null);
  const [tryOnColor, setTryOnColor] = useState<SareeColor | undefined>(undefined);

  // Sync state if URL query params change
  useEffect(() => {
    const cat = searchParams.get("category");
    const col = searchParams.get("color");
    if (cat || col) {
      setFilters((prev) => ({
        ...prev,
        category: cat || prev.category,
        color: col || prev.color,
      }));
    }
  }, [searchParams]);

  // Sync URL when filter changes
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    const newParams = new URLSearchParams();
    if (newFilters.category !== "All") {
      newParams.set("category", newFilters.category);
    }
    if (newFilters.color !== "All") {
      newParams.set("color", newFilters.color);
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleResetFilters = () => {
    const defaultFilters: FilterState = {
      category: "All",
      color: "All",
      priceRange: "all",
      sortBy: "featured",
    };
    setFilters(defaultFilters);
    setSearchParams({}, { replace: true });
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (filters.category !== "All" && p.category.toLowerCase() !== filters.category.toLowerCase()) {
          return false;
        }

        // Color filter (checks if any of product's colors matches)
        if (filters.color !== "All") {
          const hasColor = p.colors.some(
            (c) => c.name.toLowerCase() === filters.color.toLowerCase()
          );
          if (!hasColor) return false;
        }

        // Price range filter
        if (filters.priceRange === "under-3000" && p.price >= 3000) return false;
        if (filters.priceRange === "3000-6000" && (p.price < 3000 || p.price > 6000)) return false;
        if (filters.priceRange === "6000-10000" && (p.price < 6000 || p.price > 10000)) return false;
        if (filters.priceRange === "above-10000" && p.price <= 10000) return false;

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "newest") {
          return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
        }
        if (filters.sortBy === "price-asc") {
          return a.price - b.price;
        }
        if (filters.sortBy === "price-desc") {
          return b.price - a.price;
        }
        // "featured" default
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [filters]);

  const handleOpenTryOn = (product: SareeProduct, color: SareeColor) => {
    setTryOnProduct(product);
    setTryOnColor(color);
  };

  return (
    <div className="py-10 sm:py-16 bg-[#FFFDF8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#7A1730] block mb-2">
            The Complete Virasat Collection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#2C1B16] leading-tight">
            Handcrafted Silk & Cotton Sarees
          </h1>
          <div className="flex items-center justify-center gap-3 my-3">
            <span className="h-px w-8 bg-[#C9A227]/40"></span>
            <span className="text-[#C9A227] text-xs">✦</span>
            <span className="h-px w-8 bg-[#C9A227]/40"></span>
          </div>
          <p className="text-sm sm:text-base text-[#2C1B16]/75 font-light">
            Filter by authentic weaving tradition, royal shade, and price. Select any color to see its real photograph or try it on virtually with AI.
          </p>
        </div>

        {/* Mobile Filter & Sort Control Bar */}
        <div className="lg:hidden flex items-center justify-between pb-4 mb-6 border-b border-[#F8F1E5] gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex-1 py-2.5 px-4 bg-[#F8F1E5] border border-[#5A1022]/20 rounded-sm text-xs font-semibold text-[#5A1022] flex items-center justify-center gap-2"
          >
            <Filter size={15} />
            <span>Filters ({filteredProducts.length})</span>
          </button>

          {/* Sort Dropdown Mobile */}
          <div className="relative flex-1">
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange({ ...filters, sortBy: e.target.value })}
              className="w-full py-2.5 px-3 bg-[#FFFDF8] border border-[#2C1B16]/20 rounded-sm text-xs text-[#2C1B16] font-medium appearance-none cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <SlidersHorizontal
              size={13}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2C1B16]/50 pointer-events-none"
            />
          </div>
        </div>

        {/* Main Content Area: Sidebar + Grid */}
        <div className="flex items-start gap-8">
          {/* Desktop Filter Sidebar */}
          <ProductFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            totalResults={filteredProducts.length}
            isOpenMobile={isMobileFilterOpen}
            onCloseMobile={() => setIsMobileFilterOpen(false)}
          />

          {/* Products Column */}
          <div className="flex-1 min-w-0">
            {/* Top Bar on Desktop */}
            <div className="hidden lg:flex items-center justify-between pb-4 mb-6 border-b border-[#F8F1E5]">
              <div className="text-xs text-[#2C1B16]/70">
                Showing <strong className="text-[#5A1022] font-semibold">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? "saree" : "sarees"}
                {filters.category !== "All" && ` in ${filters.category}`}
                {filters.color !== "All" && ` • Shade: ${filters.color}`}
              </div>

              {/* Desktop Sort Dropdown */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#2C1B16]/60">Sort By:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange({ ...filters, sortBy: e.target.value })}
                  className="py-1.5 px-3 bg-[#FFFDF8] border border-[#2C1B16]/20 rounded-sm text-xs font-medium text-[#2C1B16] focus:outline-hidden focus:border-[#5A1022] cursor-pointer"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <ProductGrid
              products={filteredProducts}
              onClearFilters={handleResetFilters}
              onTryOn={handleOpenTryOn}
              columns={3}
            />
          </div>
        </div>
      </div>

      {/* Virtual Try-On Modal */}
      {tryOnProduct && (
        <VirtualTryOnModal
          isOpen={!!tryOnProduct}
          onClose={() => setTryOnProduct(null)}
          product={tryOnProduct}
          initialColor={tryOnColor}
        />
      )}
    </div>
  );
};
