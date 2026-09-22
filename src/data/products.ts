export interface SareeColor {
  name: string;
  value: string; // hex code for color dot
  image: string; // authentic high-resolution saree photograph
  thumbnail?: string;
}

export interface SareeProduct {
  id: number;
  name: string;
  category: "Paithani" | "Silk" | "Cotton" | "Designer" | "Traditional" | "Festive";
  price: number;
  originalPrice: number;
  description: string;
  fabric: string;
  sareeLength: string;
  blouseIncluded: boolean;
  blouseType: string;
  careInstructions: string;
  availability: "In Stock" | "Made to Order";
  featured: boolean;
  newArrival: boolean;
  rating: number;
  reviewsCount: number;
  work: string;
  zariType: string;
  occasion: string;
  colors: SareeColor[];
  gallery: string[];
}

export const products: SareeProduct[] = [
  {
    id: 1,
    name: "Royal Yeola Paithani Saree",
    category: "Paithani",
    price: 8499,
    originalPrice: 10999,
    description: "An authentic Yeola handloom masterpiece adorned with a glorious Peacock (Mor) and floral vase (Kaldar) pallu woven in genuine gold tissue zari. Intricate peacock buttis shimmer across the rich lustrous body.",
    fabric: "100% Pure Mulberry Silk",
    sareeLength: "6.3 meters (including 0.8m running blouse piece)",
    blouseIncluded: true,
    blouseType: "Unstitched matching silk with heavy zari border",
    careInstructions: "Dry clean only. Preserve in clean muslin or soft cotton cloth away from moisture.",
    availability: "In Stock",
    featured: true,
    newArrival: true,
    rating: 4.9,
    reviewsCount: 42,
    work: "Handwoven Meenakari Peacock Pallu & Gold Buttis",
    zariType: "Pure Tested Muga Gold Zari",
    occasion: "Bridal, Grand Wedding Reception, Mangalagaur",
    colors: [
      {
        name: "Purple",
        value: "#6A1B9A",
        image: "/images/sarees/purple_paithani.jpg",
      },
      {
        name: "Red",
        value: "#B71C1C",
        image: "/images/sarees/red_kanjivaram.jpg",
      },
      {
        name: "Green",
        value: "#1B5E20",
        image: "/images/sarees/green_banarasi.jpg",
      },
      {
        name: "Blue",
        value: "#1565C0",
        image: "/images/sarees/blue_silk.jpg",
      },
    ],
    gallery: [
      "/images/sarees/purple_paithani.jpg",
      "/images/sarees/red_kanjivaram.jpg",
      "/images/sarees/green_banarasi.jpg",
    ],
  },
  {
    id: 2,
    name: "Kanjivaram Temple Border Silk Saree",
    category: "Silk",
    price: 12499,
    originalPrice: 15999,
    description: "Woven in the ancient traditions of Tamil Nadu, this Kanchipuram silk saree showcases soaring temple (korvai) spires along the borders with a heavy brocade gold zari pallu.",
    fabric: "Pure Kanchipuram Silk",
    sareeLength: "6.2 meters (including 0.8m contrasting blouse)",
    blouseIncluded: true,
    blouseType: "Contrasting brocade blouse with matching temple border",
    careInstructions: "Professional dry clean only. Refold periodically along different pleats.",
    availability: "In Stock",
    featured: true,
    newArrival: false,
    rating: 5.0,
    reviewsCount: 38,
    work: "Korvai Interlocking Temple Border with Heavy Zari",
    zariType: "Half-Fine Metallic Gold Zari",
    occasion: "Bridal Muhurtham, Festive Pujas, Grand Anniversaries",
    colors: [
      {
        name: "Maroon",
        value: "#5A1022",
        image: "/images/sarees/maroon_bridal.jpg",
      },
      {
        name: "Green",
        value: "#004D40",
        image: "/images/sarees/green_banarasi.jpg",
      },
      {
        name: "Pink",
        value: "#D81B60",
        image: "/images/sarees/pink_designer.jpg",
      },
      {
        name: "Yellow",
        value: "#F57F17",
        image: "/images/sarees/yellow_festive.jpg",
      },
    ],
    gallery: [
      "/images/sarees/maroon_bridal.jpg",
      "/images/sarees/red_kanjivaram.jpg",
      "/images/sarees/green_banarasi.jpg",
    ],
  },
  {
    id: 3,
    name: "Chanderi Silk-Cotton Floral Saree",
    category: "Cotton",
    price: 3499,
    originalPrice: 4499,
    description: "Whisper-light Chanderi handwoven with sheer organza feel, delicate gold foil florals, and an understated tissue border that drapes like an effortless cloud.",
    fabric: "Chanderi Silk Cotton Blend",
    sareeLength: "6.3 meters (including 0.8m running blouse)",
    blouseIncluded: true,
    blouseType: "Matching running blouse with zari piping",
    careInstructions: "Gentle hand wash in cold water or dry clean for lasting sheen.",
    availability: "In Stock",
    featured: true,
    newArrival: true,
    rating: 4.8,
    reviewsCount: 29,
    work: "Woven Jaal & Foil Floral Motifs with Delicate Sheer Zari",
    zariType: "Soft Champagne Zari",
    occasion: "Haldi Ceremonies, Day Weddings, Elegant Soirees",
    colors: [
      {
        name: "Yellow",
        value: "#FBC02D",
        image: "/images/sarees/yellow_festive.jpg",
      },
      {
        name: "Pink",
        value: "#EC407A",
        image: "/images/sarees/pink_designer.jpg",
      },
      {
        name: "Green",
        value: "#43A047",
        image: "/images/sarees/green_banarasi.jpg",
      },
    ],
    gallery: [
      "/images/sarees/yellow_festive.jpg",
      "/images/sarees/pink_designer.jpg",
      "/images/sarees/green_banarasi.jpg",
    ],
  },
  {
    id: 4,
    name: "Embroidered Organza Designer Saree",
    category: "Designer",
    price: 6999,
    originalPrice: 8999,
    description: "Airy translucent sheer organza featuring artisanal cutwork scalloped borders, pearl seed embellishments, and tonal floral threadwork crafted for the modern muse.",
    fabric: "Premium French Organza",
    sareeLength: "6.2 meters (including 0.8m designer blouse)",
    blouseIncluded: true,
    blouseType: "Heavy raw silk blouse piece with matching embroidery",
    careInstructions: "Strictly dry clean. Handle delicate embroidery with care.",
    availability: "In Stock",
    featured: true,
    newArrival: true,
    rating: 4.9,
    reviewsCount: 51,
    work: "Cutwork Scallop Border, Threadwork & Seed Pearl Sprays",
    zariType: "Silver Resham & Metallic Thread",
    occasion: "Cocktail Nights, Sangeet Celebrations, High-tea",
    colors: [
      {
        name: "Pink",
        value: "#F06292",
        image: "/images/sarees/pink_designer.jpg",
      },
      {
        name: "Blue",
        value: "#0288D1",
        image: "/images/sarees/blue_silk.jpg",
      },
      {
        name: "Purple",
        value: "#7B1FA2",
        image: "/images/sarees/purple_paithani.jpg",
      },
    ],
    gallery: [
      "/images/sarees/pink_designer.jpg",
      "/images/sarees/purple_paithani.jpg",
      "/images/sarees/blue_silk.jpg",
    ],
  },
  {
    id: 5,
    name: "Classic Banarasi Katan Brocade Saree",
    category: "Traditional",
    price: 9899,
    originalPrice: 12999,
    description: "Woven in the spiritual looms of Varanasi, pure Katan silk embellished with ornate Shikargah motifs, floral bel scrolls, and pure antique gold zari brocade pallu.",
    fabric: "Pure Katan Silk",
    sareeLength: "6.3 meters (including 0.8m heavy brocade blouse)",
    blouseIncluded: true,
    blouseType: "Woven Katan silk blouse with heavy sleeve zari",
    careInstructions: "Dry clean only. Roll in muslin cloth.",
    availability: "In Stock",
    featured: false,
    newArrival: true,
    rating: 4.9,
    reviewsCount: 34,
    work: "Kadwa Brocade Weave with Shikargah Border",
    zariType: "Antique Roopa-Sona Tested Zari",
    occasion: "Weddings, Karwa Chauth, Royal Receptions",
    colors: [
      {
        name: "Red",
        value: "#C62828",
        image: "/images/sarees/red_kanjivaram.jpg",
      },
      {
        name: "Maroon",
        value: "#4A0E17",
        image: "/images/sarees/maroon_bridal.jpg",
      },
      {
        name: "Green",
        value: "#2E7D32",
        image: "/images/sarees/green_banarasi.jpg",
      },
    ],
    gallery: [
      "/images/sarees/green_banarasi.jpg",
      "/images/sarees/red_kanjivaram.jpg",
      "/images/sarees/maroon_bridal.jpg",
    ],
  },
  {
    id: 6,
    name: "Festive Shimmer Tissue Georgette Saree",
    category: "Festive",
    price: 4999,
    originalPrice: 6499,
    description: "Flowing pure georgette infused with fine metallic lurex threads that catch room lights with effortless sparkle. Finished with an opulent gota patti border.",
    fabric: "Fine Shimmer Viscose Georgette",
    sareeLength: "6.3 meters (including blouse piece)",
    blouseIncluded: true,
    blouseType: "Embroidered tonal art silk blouse",
    careInstructions: "Dry clean recommended.",
    availability: "In Stock",
    featured: true,
    newArrival: false,
    rating: 4.7,
    reviewsCount: 22,
    work: "Gota Patti Border with Shimmer Weave & Sequin Spangles",
    zariType: "Lustrous Gold Lurex",
    occasion: "Diwali Festivities, Mehendi, Navratri Celebrations",
    colors: [
      {
        name: "Green",
        value: "#00695C",
        image: "/images/sarees/green_banarasi.jpg",
      },
      {
        name: "Purple",
        value: "#4A148C",
        image: "/images/sarees/purple_paithani.jpg",
      },
      {
        name: "Yellow",
        value: "#F9A825",
        image: "/images/sarees/yellow_festive.jpg",
      },
    ],
    gallery: [
      "/images/sarees/green_banarasi.jpg",
      "/images/sarees/yellow_festive.jpg",
      "/images/sarees/purple_paithani.jpg",
    ],
  },
  {
    id: 7,
    name: "Handcrafted Maheshwari Zari Cotton Saree",
    category: "Cotton",
    price: 2799,
    originalPrice: 3499,
    description: "Rooted in the royal Narmada heritage of Ahilyabai Holkar, this lightweight Maheshwari cotton saree features the iconic reversible Bugdi border and linear pallu stripes.",
    fabric: "Pure Handloom Cotton Silk",
    sareeLength: "6.2 meters (including 0.8m running blouse)",
    blouseIncluded: true,
    blouseType: "Matching running cotton-silk blouse",
    careInstructions: "Gentle cold soak or dry clean for initial wash.",
    availability: "In Stock",
    featured: false,
    newArrival: true,
    rating: 4.8,
    reviewsCount: 19,
    work: "Reversible Bugdi Zari Border & Five-Stripe Pallu",
    zariType: "Polished Matt Gold Zari",
    occasion: "Office Wear, Festive Morning Gatherings, Teachers Day",
    colors: [
      {
        name: "Blue",
        value: "#0D47A1",
        image: "/images/sarees/blue_silk.jpg",
      },
      {
        name: "Maroon",
        value: "#7A1730",
        image: "/images/sarees/maroon_bridal.jpg",
      },
      {
        name: "Purple",
        value: "#4A148C",
        image: "/images/sarees/purple_paithani.jpg",
      },
    ],
    gallery: [
      "/images/sarees/blue_silk.jpg",
      "/images/sarees/maroon_bridal.jpg",
      "/images/sarees/purple_paithani.jpg",
    ],
  },
  {
    id: 8,
    name: "Bridal Pure Tussar Silk Saree",
    category: "Traditional",
    price: 7499,
    originalPrice: 9499,
    description: "Richly textured wild Tussar silk displaying natural golden sheen, painted folklore pallu, and antique copper zari lines.",
    fabric: "Raw Tussar Silk (Kosa)",
    sareeLength: "6.3 meters (including unstitched blouse)",
    blouseIncluded: true,
    blouseType: "Raw tussar contrast blouse piece",
    careInstructions: "Dry clean only to maintain natural texture.",
    availability: "In Stock",
    featured: false,
    newArrival: false,
    rating: 4.8,
    reviewsCount: 16,
    work: "Hand-embellished Pallu & Copper Zari Temple Border",
    zariType: "Antique Copper Zari",
    occasion: "Rituals, Cultural Banquets, Art Exhibitions",
    colors: [
      {
        name: "Yellow",
        value: "#F57F17",
        image: "/images/sarees/yellow_festive.jpg",
      },
      {
        name: "Red",
        value: "#B71C1C",
        image: "/images/sarees/red_kanjivaram.jpg",
      },
      {
        name: "Green",
        value: "#1B5E20",
        image: "/images/sarees/green_banarasi.jpg",
      },
    ],
    gallery: [
      "/images/sarees/red_kanjivaram.jpg",
      "/images/sarees/yellow_festive.jpg",
      "/images/sarees/green_banarasi.jpg",
    ],
  },
  {
    id: 9,
    name: "Maharani Nauvari Paithani Bridal Saree",
    category: "Paithani",
    price: 14999,
    originalPrice: 18999,
    description: "The royal 9-yard heirloom woven for timeless Maharashtrian brides. Heavy Asavali motifs, dual peacock pallu, and broad Karvati border in pure gold zari.",
    fabric: "100% Pure Yeola Silk (Nauvari 9-Yard)",
    sareeLength: "8.8 meters (Nauvari cut)",
    blouseIncluded: true,
    blouseType: "Matching 1 meter heavy bridal silk blouse piece",
    careInstructions: "Specialist dry cleaning only. Store wrapped in pure unbleached cotton.",
    availability: "In Stock",
    featured: true,
    newArrival: true,
    rating: 5.0,
    reviewsCount: 28,
    work: "Royal Asavali Weave, Dual Peacock Pallu & Broad Karvati Border",
    zariType: "Pure Gold Plated Silver Zari",
    occasion: "Authentic Maharashtrian Wedding, Sakharpuda",
    colors: [
      {
        name: "Yellow",
        value: "#E65100",
        image: "/images/sarees/yellow_festive.jpg",
      },
      {
        name: "Green",
        value: "#1B5E20",
        image: "/images/sarees/green_banarasi.jpg",
      },
      {
        name: "Red",
        value: "#B71C1C",
        image: "/images/sarees/maroon_bridal.jpg",
      },
    ],
    gallery: [
      "/images/sarees/maroon_bridal.jpg",
      "/images/sarees/yellow_festive.jpg",
      "/images/sarees/green_banarasi.jpg",
    ],
  },
  {
    id: 10,
    name: "Midnight Silk & Sequin Designer Saree",
    category: "Designer",
    price: 8999,
    originalPrice: 11499,
    description: "Dramatic evening glamour combining pure silk body with airy georgette pleats, studded with tone-on-tone micro-sequins and scalloped zardozi edging.",
    fabric: "Pure Silk and Georgette Dual Draped",
    sareeLength: "6.3 meters (including 0.8m designer blouse)",
    blouseIncluded: true,
    blouseType: "Heavily sequined designer silk blouse",
    careInstructions: "Professional dry clean only.",
    availability: "In Stock",
    featured: false,
    newArrival: true,
    rating: 4.8,
    reviewsCount: 31,
    work: "Micro Sequin Embroidery with Scalloped Zardozi Edges",
    zariType: "Champagne Silver & Metallic Sheen",
    occasion: "Reception Galas, Red Carpet, Evening Soirees",
    colors: [
      {
        name: "Blue",
        value: "#0D47A1",
        image: "/images/sarees/blue_silk.jpg",
      },
      {
        name: "Maroon",
        value: "#5A1022",
        image: "/images/sarees/maroon_bridal.jpg",
      },
      {
        name: "Purple",
        value: "#4A148C",
        image: "/images/sarees/purple_paithani.jpg",
      },
    ],
    gallery: [
      "/images/sarees/blue_silk.jpg",
      "/images/sarees/maroon_bridal.jpg",
      "/images/sarees/purple_paithani.jpg",
    ],
  },
];
