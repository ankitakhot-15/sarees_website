export interface Testimonial {
  id: number;
  name: string;
  city: string;
  sareePurchased: string;
  rating: number;
  comment: string;
  verifiedPurchase: boolean;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Pooja Deshmukh",
    city: "Pune, Maharashtra",
    sareePurchased: "Royal Yeola Paithani Saree (Purple)",
    rating: 5,
    comment:
      "Ordered this for my sister's wedding. The meenakari peacock pallu was breathtaking and identical to the photo. The team answered all my questions on WhatsApp within minutes and sent video clips of the zari before shipping!",
    verifiedPurchase: true,
    date: "February 2026",
  },
  {
    id: 2,
    name: "Dr. Ananya Sundaram",
    city: "Bengaluru, Karnataka",
    sareePurchased: "Kanjivaram Temple Border Silk Saree",
    rating: 5,
    comment:
      "The silk weight and authentic handloom luster are exceptional. The virtual try-on gave me confidence on how the temple border would drape on my frame. Unbelievable craftsmanship!",
    verifiedPurchase: true,
    date: "January 2026",
  },
  {
    id: 3,
    name: "Meera Kulkarni",
    city: "Kolhapur, Maharashtra",
    sareePurchased: "Maharani Nauvari Paithani Bridal Saree",
    rating: 5,
    comment:
      "Visited their showroom in Kolhapur first, then browsed online to pick the second saree. Pure authenticity, genuine zari, and courteous traditional hospitality. Highly recommended showroom.",
    verifiedPurchase: true,
    date: "March 2026",
  },
  {
    id: 4,
    name: "Roshni Patel",
    city: "Ahmedabad, Gujarat",
    sareePurchased: "Chanderi Silk-Cotton Floral Saree",
    rating: 5,
    comment:
      "So lightweight and elegant for day pujas. The color switch feature let me compare shades instantly before finalizing over WhatsApp. Received my parcel safely packed in protective muslin cloth.",
    verifiedPurchase: true,
    date: "March 2026",
  },
];
