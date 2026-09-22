import React from "react";
import type { SareeProduct, SareeColor } from "../../data/products";
import { ProductCard } from "./ProductCard";
import { Button } from "../common/Button";
import { Sparkles } from "lucide-react";

export interface ProductGridProps {
  products: SareeProduct[];
  onClearFilters?: () => void;
  onTryOn?: (product: SareeProduct, color: SareeColor) => void;
  columns?: 3 | 4;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onClearFilters,
  onTryOn,
  columns = 3,
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-[#F8F1E5]/40 border border-[#F8F1E5] rounded-sm max-w-xl mx-auto my-8">
        <div className="w-14 h-14 mx-auto rounded-full bg-[#5A1022]/10 flex items-center justify-center text-[#5A1022] mb-4">
          <Sparkles size={24} />
        </div>
        <h3 className="font-serif text-2xl text-[#2C1B16] font-medium mb-2">
          No Sarees Found
        </h3>
        <p className="text-sm text-[#2C1B16]/70 max-w-md mx-auto mb-6 font-light">
          We couldn't find sarees matching your exact combination of category, shade, and price filters.
        </p>
        {onClearFilters && (
          <Button variant="primary" size="sm" onClick={onClearFilters}>
            Clear All Filters
          </Button>
        )}
      </div>
    );
  }

  const gridColsClass =
    columns === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid ${gridColsClass} gap-6 sm:gap-7`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onTryOn={onTryOn}
        />
      ))}
    </div>
  );
};
