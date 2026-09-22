import React from "react";
import { motion } from "motion/react";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import { testimonials } from "../../data/testimonials";
import { SectionTitle } from "../common/SectionTitle";

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#FFFDF8] border-b border-[#F8F1E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Customer Experiences"
          title="Words From Our Patrons"
          subtitle="Discover what brides, saree connoisseurs, and families say about their handloom shopping journey with us."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="bg-[#FAF5EB]/60 border border-[#F8F1E5] hover:border-[#C9A227]/40 p-6 sm:p-7 rounded-sm relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#C9A227]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={15} className="fill-[#C9A227]" />
                    ))}
                  </div>
                  <Quote size={24} className="text-[#C9A227]/30" />
                </div>

                <p className="text-sm text-[#2C1B16]/85 font-light leading-relaxed italic mb-5">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F8F1E5] flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-serif text-base text-[#2C1B16] font-semibold">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-[#2C1B16]/60">
                    {t.city} • <span className="text-[#5A1022] font-medium">{t.sareePurchased}</span>
                  </p>
                </div>

                {t.verifiedPurchase && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#25D366] font-semibold bg-[#25D366]/10 px-2 py-0.5 rounded-full shrink-0">
                    <CheckCircle2 size={11} /> Verified
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-[#2C1B16]/50 mt-8 italic">
          *Customer impressions recorded from showroom visits & WhatsApp orders.
        </p>
      </div>
    </section>
  );
};
