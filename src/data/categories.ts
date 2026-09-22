export interface Category {
  id: string;
  name: string;
  slug: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  itemCount: number;
}

export const categories: Category[] = [
  {
    id: "paithani",
    name: "Paithani Sarees",
    slug: "Paithani",
    shortDesc: "The queen of Maharashtrian silken splendor, woven with pure gold zari and majestic mor (peacock) pallu motifs.",
    fullDesc: "Known as the Queen of Silks, each authentic Paithani saree is handwoven by master weavers in Yeola and Paithan. Adorned with delicate oblique borders, kaleidoscopic pallus, and vibrant jewel tones.",
    image: "/images/sarees/purple_paithani.jpg",
    itemCount: 18,
  },
  {
    id: "silk",
    name: "Silk Sarees",
    slug: "Silk",
    shortDesc: "Pure Kanjivaram and Banarasi mulberry silks adorned with authentic woven gold brocade.",
    fullDesc: "From the temple corridors of Kanchipuram to the ancient ghats of Varanasi, our silk collection reflects unmatched opulence, crisp structure, and generational heritage.",
    image: "/images/sarees/red_kanjivaram.jpg",
    itemCount: 24,
  },
  {
    id: "cotton",
    name: "Cotton Sarees",
    slug: "Cotton",
    shortDesc: "Lightweight Chanderi, Maheshwari and soft handloom cottons for timeless grace and everyday luxury.",
    fullDesc: "Handcrafted with natural breathability, delicate weaves, and subtle woven zari borders. Perfect for day functions, summer festivities, and refined professional gatherings.",
    image: "/images/sarees/yellow_festive.jpg",
    itemCount: 14,
  },
  {
    id: "designer",
    name: "Designer Sarees",
    slug: "Designer",
    shortDesc: "Contemporary draping in tissue organza, rich georgette, and sculpted hand embroidery.",
    fullDesc: "Where traditional Indian craftsmanship meets modern silhouettes. Featuring scalloped borders, cutwork embroidery, and ethereal metallic organza textures.",
    image: "/images/sarees/pink_designer.jpg",
    itemCount: 16,
  },
  {
    id: "traditional",
    name: "Traditional Sarees",
    slug: "Traditional",
    shortDesc: "Timeless heritage weaves, auspicious temple motifs, and enduring ceremonial heirlooms.",
    fullDesc: "Rooted in sacred rituals and festive customs, our traditional collection embraces classic Kasavu, Nauvari, and Pochampally ikats crafted by artisanal families.",
    image: "/images/sarees/green_banarasi.jpg",
    itemCount: 20,
  },
  {
    id: "festive",
    name: "Festive Sarees",
    slug: "Festive",
    shortDesc: "Vibrant celebratory palettes embellished with shimmering gota patti, sequins, and rich brocade.",
    fullDesc: "Celebrate Diwali, wedding sangeets, and grand pujas in opulent sarees that catch every ray of celebratory light with rich zardozi, meenakari, and radiant festive hues.",
    image: "/images/sarees/blue_silk.jpg",
    itemCount: 22,
  },
];
