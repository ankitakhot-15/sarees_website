import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, Award, Layers, UserCheck, MessageCircle, Truck } from "lucide-react";
import { SectionTitle } from "../common/SectionTitle";

const PILLARS = [
  {
    icon: Award,
    title: "Certified Pure Handloom",
    desc: "Every Paithani and Kanchipuram silk saree comes with authentic weave certification and tested gold-silver zari.",
  },
  {
    icon: ShieldCheck,
    title: "100% Genuine Fabrics",
    desc: "Direct master weaver partnerships in Yeola, Varanasi, and Kanchipuram ensure untouched purity and no synthetic blends.",
  },
  {
    icon: Layers,
    title: "Exclusive Color Options",
    desc: "Browse identical handcrafted sarees in authentic heritage shades with real color photos for every single variant.",
  },
  {
    icon: UserCheck,
    title: "Personal Video Shopping",
    desc: "Schedule a live WhatsApp video consultation with our senior showroom drapers to inspect the pallu and zari closely.",
  },
  {
    icon: MessageCircle,
    title: "Instant WhatsApp Enquiry",
    desc: "Single-tap direct chat with our showroom team to confirm immediate stock availability, matching blouses, and parcel dispatch.",
  },
  {
    icon: Truck,
    title: "Safe Heritage Packaging",
    desc: "Each saree is wrapped in clean muslin cloth and reinforced boxed packing for safe delivery across all states in India.",
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF5EB] border-b border-[#F8F1E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="The Virasat Standard"
          title="Why Choose Our Showroom"
          subtitle="Combining centuries-old weaving traditions with trusted personal service and transparent customer relationships."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PILLARS.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="bg-[#FFFDF8] p-6 sm:p-7 rounded-sm border border-[#F8F1E5] hover:border-[#C9A227]/60 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#5A1022]/10 text-[#5A1022] flex items-center justify-center mb-4">
                  <IconComponent size={22} />
                </div>
                <h3 className="font-serif text-xl font-medium text-[#2C1B16] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#2C1B16]/75 leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
