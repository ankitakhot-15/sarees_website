import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { products, type SareeProduct, type SareeColor } from "../../data/products";
import { ProductGrid } from "../products/ProductGrid";
import { SectionTitle } from "../common/SectionTitle";

export interface NewArrivalsProps {
  onTryOn?: (product: SareeProduct, color: SareeColor) => void;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({ onTryOn }) => {
  const newArrivalProducts = products.filter((p) => p.newArrival).slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-[#FFFDF8] border-b border-[#F8F1E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#7A1730] font-semibold mb-2">
              <Sparkles size={13} className="text-[#C9A227]" />
              <span>Just Unboxed at Showroom</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2C1B16] font-normal">
              New Arrivals
            </h2>
          </div>

          <Link
            to="/sarees"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5A1022] hover:text-[#7A1730] transition-colors"
          >
            <span>View All New Weaves</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <ProductGrid
          products={newArrivalProducts}
          onTryOn={onTryOn}
          columns={4}
        />
      </div>
    </section>
  );
};
