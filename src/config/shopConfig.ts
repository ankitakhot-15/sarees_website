export interface ShopConfig {
  name: string;
  tagline: string;
  phone: string;
  displayPhone: string;
  secondaryPhone: string;
  whatsapp: string;
  whatsappNumber: string;
  email: string;
  address: string;
  landmark: string;
  city: string;
  openingHours: string;
  hoursDetail: {
    weekdays: string;
    sunday: string;
  };
  googleMapsUrl: string;
  mapUrl: string;
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
}

export const shopConfig: ShopConfig = {
  name: "Virasat Silk & Sarees",
  tagline: "Elegance Woven in Every Thread",
  phone: "9356951406",
  displayPhone: "+91 93569 51406",
  secondaryPhone: "0231-2524890",
  whatsapp: "919356951406",
  whatsappNumber: "919356951406",
  email: "care@virasatsarees.com",
  address: "Showroom No. 12, Mahadwar Road, Near Mahalakshmi Temple, Rajarampuri",
  landmark: "Opposite Rajwada Square",
  city: "Kolhapur, Maharashtra 416012",
  openingHours: "10:00 AM – 9:00 PM (Open All 7 Days)",
  hoursDetail: {
    weekdays: "10:00 AM – 9:00 PM",
    sunday: "10:30 AM – 8:30 PM",
  },
  googleMapsUrl: "https://maps.google.com/?q=Mahalakshmi+Temple+Kolhapur",
  mapUrl: "https://maps.google.com/?q=Mahalakshmi+Temple+Kolhapur",
  social: {
    instagram: "https://instagram.com/virasatsarees",
    facebook: "https://facebook.com/virasatsarees",
    youtube: "https://youtube.com/@virasatsarees",
  },
};
