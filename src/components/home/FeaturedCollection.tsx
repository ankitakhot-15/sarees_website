import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products, type SareeProduct, type SareeColor } from "../../data/products";
import { ProductGrid } from "../products/ProductGrid";
import { SectionTitle } from "../common/SectionTitle";
import { Button } from "../common/Button";

export interface FeaturedCollectionProps {
  onTryOn?: (product: SareeProduct, color: SareeColor) => void;
}

export const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({ onTryOn }) => {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="py-16 sm:py-24 bg-[#FAF5EB] border-b border-[#F8F1E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Signature Masterpieces"
          title="Featured Collection"
          subtitle="Handpicked bridal Paithanis, regal Kanchipuram weaves, and artisanal organzas loved by our patrons across India."
        />

        <ProductGrid
          products={featuredProducts}
          onTryOn={onTryOn}
          columns={3}
        />

        <div className="mt-12 text-center">
          <Link to="/sarees">
            <Button
              variant="outline"
              size="lg"
              icon={<ArrowRight size={16} />}
              iconPosition="right"
            >
              Browse Complete Catalogue (10+ Sarees)
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
