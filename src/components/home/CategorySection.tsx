import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { categories } from "../../data/categories";
import { SectionTitle } from "../common/SectionTitle";

export const CategorySection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#FFFDF8] border-b border-[#F8F1E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Curated Heritage Weaves"
          title="Explore Our Collections"
          subtitle="From sacred temple corridors to imperial royal courts, explore our handloom traditions distinguished by purity and masterful craftsmanship."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link
                to={`/sarees?category=${encodeURIComponent(category.slug)}`}
                className="group relative block aspect-[4/5] rounded-sm overflow-hidden border border-[#F8F1E5] hover:border-[#C9A227] shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Background Category Image */}
                <img
                  src={category.image}
                  alt={`${category.name} collection`}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Elegant Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1B16] via-[#2C1B16]/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-300"></div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A227] font-semibold mb-1 block">
                    {category.itemCount}+ Unique Weaves
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight mb-2 group-hover:text-[#F8F1E5] transition-colors">
                    {category.name}
                  </h3>

                  <p className="text-xs text-white/80 line-clamp-2 font-light leading-relaxed mb-4">
                    {category.shortDesc}
                  </p>

                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C9A227] group-hover:text-white transition-colors">
                    <span>Explore Collection</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>

                {/* Subtle Gold Corner Accent */}
                <div className="absolute top-4 right-4 text-[#C9A227] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  ✦
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
