import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { categories } from "../data/categories";
import { SectionTitle } from "../components/common/SectionTitle";
import { Button } from "../components/common/Button";

export const Collections: React.FC = () => {
  return (
    <div className="py-12 sm:py-20 bg-[#FFFDF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Generational Weaving Traditions"
          title="The Virasat Collections"
          subtitle="A tribute to India's sacred textile geography. Explore our six defining collections, each reflecting masterloom heritage and pure tested zari."
        />

        <div className="space-y-16 sm:space-y-24 mt-12">
          {categories.map((cat, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={cat.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Visual Image Side (6 cols) */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-sm overflow-hidden border-2 border-[#C9A227]/40 shadow-xl group">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C1B16]/60 via-transparent to-transparent pointer-events-none"></div>
                    <div className="absolute top-4 left-4 bg-[#5A1022] text-[#FFFDF8] text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-xs">
                      {cat.itemCount}+ Unique Weaves
                    </div>
                  </div>
                </div>

                {/* Content Story Side (6 cols) */}
                <div
                  className={`lg:col-span-6 space-y-4 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <span className="text-xs uppercase tracking-[0.25em] text-[#C9A227] font-semibold block">
                    Weaving Discipline 0{idx + 1}
                  </span>

                  <h2 className="font-serif text-3xl sm:text-4xl text-[#2C1B16] font-normal">
                    {cat.name}
                  </h2>

                  <p className="text-base text-[#5A1022] font-medium font-serif italic">
                    "{cat.shortDesc}"
                  </p>

                  <p className="text-sm text-[#2C1B16]/80 leading-relaxed font-light">
                    {cat.fullDesc}
                  </p>

                  <div className="pt-3">
                    <Link to={`/sarees?category=${encodeURIComponent(cat.slug)}`}>
                      <Button
                        variant="primary"
                        size="md"
                        icon={<ArrowRight size={15} />}
                        iconPosition="right"
                      >
                        Explore {cat.name}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
