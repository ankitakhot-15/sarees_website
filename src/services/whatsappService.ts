import { shopConfig } from "../config/shopConfig";
import { formatPrice } from "../utils/formatPrice";

export interface SareeEnquiryItem {
  id?: number | string;
  name: string;
  category: string;
  price: number;
}

export interface ColorSelection {
  name: string;
  value?: string;
  image?: string;
}

/**
 * Builds and opens a WhatsApp enquiry for a specific product and currently selected color.
 */
export function openWhatsAppEnquiry(
  product: SareeEnquiryItem,
  selectedColor?: ColorSelection | string
) {
  const colorName =
    typeof selectedColor === "string"
      ? selectedColor
      : selectedColor?.name || "Default";

  const formattedPrice = formatPrice(product.price);

  const message = [
    "Hello, I am interested in this saree.",
    "",
    `Saree Name: ${product.name}`,
    `Category: ${product.category}`,
    `Selected Color: ${colorName}`,
    `Price: ${formattedPrice}`,
    "",
    "Please share availability and more details.",
  ].join("\n");

  const url = `https://wa.me/${shopConfig.whatsapp}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Builds and opens a WhatsApp enquiry after a virtual try-on session.
 */
export function openWhatsAppTryOnEnquiry(
  product: SareeEnquiryItem,
  selectedColor?: ColorSelection | string
) {
  const colorName =
    typeof selectedColor === "string"
      ? selectedColor
      : selectedColor?.name || "Default";

  const formattedPrice = formatPrice(product.price);

  const message = [
    "Hello, I am interested in this saree.",
    "",
    `Saree Name: ${product.name}`,
    `Category: ${product.category}`,
    `Selected Color: ${colorName}`,
    `Price: ${formattedPrice}`,
    "",
    "I also tried this saree using the virtual try-on feature.",
    "",
    "Please share availability and more details.",
  ].join("\n");

  const url = `https://wa.me/${shopConfig.whatsapp}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Contact form submission via WhatsApp.
 */
export function openWhatsAppGeneralEnquiry(params: {
  name: string;
  mobile: string;
  productOrInterest?: string;
  message: string;
}) {
  const lines = [
    "Hello, I would like to make an enquiry from your website.",
    "",
    `Name: ${params.name}`,
    `Mobile: ${params.mobile}`,
  ];

  if (params.productOrInterest) {
    lines.push(`Saree / Interest: ${params.productOrInterest}`);
  }

  lines.push(`Message: ${params.message}`);

  const url = `https://wa.me/${shopConfig.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Opens direct chat with showroom consultants.
 */
export function openWhatsAppDirectChat() {
  const message =
    "Hello, I am browsing your showroom collection online and would like some assistance.";
  const url = `https://wa.me/${shopConfig.whatsapp}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
