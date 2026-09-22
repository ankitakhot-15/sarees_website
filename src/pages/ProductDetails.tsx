import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronRight, ArrowLeft, Sparkles, MessageCircle, AlertCircle } from "lucide-react";
import { products, type SareeProduct, type SareeColor } from "../data/products";
import { ProductGallery } from "../components/products/ProductGallery";
import { ProductInfo } from "../components/products/ProductInfo";
import { ProductCard } from "../components/products/ProductCard";
import { VirtualTryOnModal } from "../components/virtualTryOn/VirtualTryOnModal";
import { Button } from "../components/common/Button";

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));

  const [selectedColor, setSelectedColor] = useState<SareeColor>(
    product?.colors[0] || { name: "Default", value: "#5A1022", image: "" }
  );

  const [isTryOnOpen, setIsTryOnOpen] = useState(false);

  // When route ID changes, reset selectedColor to the new product's first color
  useEffect(() => {
    if (product && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="py-24 px-4 text-center max-w-lg mx-auto min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-4">
          <AlertCircle size={32} />
        </div>
        <h2 className="font-serif text-3xl text-[#2C1B16] font-medium mb-2">
          Saree Not Found
        </h2>
        <p className="text-sm text-[#2C1B16]/70 mb-6 font-light">
          The requested saree might have been reserved or moved to our archive. Explore our latest handloom collection.
        </p>
        <Link to="/sarees">
          <Button variant="primary">
            Explore All Sarees
          </Button>
        </Link>
      </div>
    );
  }

  // Related sarees from same category
  const relatedSarees = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="py-8 sm:py-12 bg-[#FFFDF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-[#2C1B16]/60 mb-8 font-light flex-wrap">
          <Link to="/" className="hover:text-[#5A1022] transition-colors">
            Home
          </Link>
          <ChevronRight size={13} />
          <Link to="/sarees" className="hover:text-[#5A1022] transition-colors">
            Sarees
          </Link>
          <ChevronRight size={13} />
          <Link
            to={`/sarees?category=${encodeURIComponent(product.category)}`}
            className="hover:text-[#5A1022] transition-colors"
          >
            {product.category} Silk
          </Link>
          <ChevronRight size={13} />
          <span className="text-[#5A1022] font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Back Link */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#5A1022] hover:text-[#7A1730] transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to Collection</span>
          </button>
        </div>

        {/* Product Details Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Image Gallery (6 cols) */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <ProductGallery
              selectedColor={selectedColor}
              additionalImages={product.gallery}
              productName={product.name}
            />
          </div>

          {/* Right Column: Product Information (6 cols) */}
          <div className="lg:col-span-6">
            <ProductInfo
              product={product}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              onOpenTryOn={() => setIsTryOnOpen(true)}
            />
          </div>
        </div>

        {/* Related Sarees Section */}
        {relatedSarees.length > 0 && (
          <div className="mt-20 sm:mt-28 pt-12 border-t border-[#F8F1E5]">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7A1730] block mb-1">
                Complementary Weaves
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#2C1B16]">
                You May Also Admire
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {relatedSarees.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  onTryOn={(p, c) => {
                    setSelectedColor(c);
                    setIsTryOnOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Virtual Try-On Modal */}
      <VirtualTryOnModal
        isOpen={isTryOnOpen}
        onClose={() => setIsTryOnOpen(false)}
        product={product}
        initialColor={selectedColor}
      />
    </div>
  );
};
