export const siteConfig = {
  currencySymbol: "₹",
  currencyCode: "INR",
  aiConfig: {
    virtualTryOnEnabled: true,
    provider: "backend",
    maxImageSizeMB: 10,
    supportedFormats: ["image/jpeg", "image/png", "image/webp"],
  },
  navLinks: [
    { name: "Home", path: "/" },
    { name: "Sarees", path: "/sarees" },
    { name: "Collections", path: "/collections" },
    { name: "About", path: "/about" },
    { name: "Shop Details", path: "/shop" },
    { name: "Contact", path: "/contact" },
  ],
};
