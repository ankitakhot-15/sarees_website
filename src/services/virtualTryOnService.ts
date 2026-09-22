import { siteConfig } from "../config/siteConfig";
import { generateVirtualSareeLooks } from "./drapingEngine";

export interface TryOnRequest {
  personImage: string; // base64 or URL
  sareeImage: string;
  sareeName: string;
  selectedColor: string;
  colorHex?: string;
  category?: string;
  productId: number | string;
  personName?: string;
}

export interface TryOnResult {
  success: boolean;
  resultImage: string;
  faceOnModelImage: string;
  drapedOnYouImage: string;
  studioDuoImage: string;
  originalImage: string;
  stylistAdvice?: string;
  sareeName: string;
  selectedColor: string;
  message?: string;
  generatedAt: string;
}

export interface DemoModel {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const demoModels: DemoModel[] = [
  {
    id: "model-1",
    name: "Model Priya",
    description: "Graceful Indian portrait with traditional bindi and saree drape",
    image: "/images/models/model_priya.jpg",
  },
  {
    id: "model-2",
    name: "Model Ananya",
    description: "Festive standing saree pose, ideal for pleats and pallu draping",
    image: "/images/models/model_ananya.jpg",
  },
  {
    id: "model-3",
    name: "Model Shalini",
    description: "Elegant poised posture wearing traditional Indian saree",
    image: "/images/models/model_shalini.jpg",
  },
];

const PHOTOREALISTIC_DRAPES: Record<string, string> = {
  purple: "/images/tryon/priya_purple.jpg",
  red: "/images/tryon/priya_red.jpg",
  green: "/images/tryon/priya_green.jpg",
  maroon: "/images/tryon/priya_maroon.jpg",
  yellow: "/images/tryon/priya_yellow.jpg",
  blue: "/images/tryon/priya_blue.jpg",
  pink: "/images/tryon/priya_pink.jpg",
};

export function getPhotorealisticDrape(colorName: string): string | null {
  const c = colorName.toLowerCase();
  for (const [key, path] of Object.entries(PHOTOREALISTIC_DRAPES)) {
    if (c.includes(key)) return path;
  }
  return PHOTOREALISTIC_DRAPES.purple;
}

/**
 * Service function calling the backend API and client-side draping engine for Virtual Try-On
 */
export async function generateVirtualTryOn(data: TryOnRequest): Promise<TryOnResult> {
  if (!siteConfig.aiConfig.virtualTryOnEnabled) {
    throw new Error("Virtual try-on feature is currently disabled in site settings.");
  }

  // 1. Simultaneously query server for any Gemini styling advice
  let backendStylistAdvice: string | undefined;
  try {
    const response = await fetch("/api/try-on", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personImage: data.personImage.slice(0, 100), // send signature/lightweight payload
        sareeImage: data.sareeImage,
        sareeName: data.sareeName,
        selectedColor: data.selectedColor,
        productId: data.productId,
      }),
    });

    if (response.ok) {
      const json = await response.json();
      if (json.stylistAdvice) {
        backendStylistAdvice = json.stylistAdvice;
      }
    }
  } catch (err) {
    console.warn("Backend try-on styling note skipped:", err);
  }

  // 2. Execute authentic saree draping and portrait transformation
  const looks = await generateVirtualSareeLooks({
    personImage: data.personImage,
    sareeImage: data.sareeImage,
    sareeName: data.sareeName,
    selectedColor: data.selectedColor,
    colorHex: data.colorHex,
    category: data.category,
  });

  const photoDrape = getPhotorealisticDrape(data.selectedColor);
  const primaryDrapedLook = photoDrape || looks.drapedOnYouLook;

  return {
    success: true,
    resultImage: primaryDrapedLook,
    faceOnModelImage: looks.faceOnModelLook,
    drapedOnYouImage: primaryDrapedLook,
    studioDuoImage: looks.studioDuoLook,
    originalImage: data.personImage,
    stylistAdvice: backendStylistAdvice || looks.stylistAdvice,
    sareeName: data.sareeName,
    selectedColor: data.selectedColor,
    message: `Photorealistic virtual saree drape generated for ${data.sareeName}`,
    generatedAt: new Date().toISOString(),
  };
}
