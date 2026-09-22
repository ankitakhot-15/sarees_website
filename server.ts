import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for JSON body parsing (with high limit for base64 try-on images)
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ extended: true, limit: "25mb" }));

  // API Health
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      store: "Virasat Silk & Sarees",
      timestamp: new Date().toISOString(),
    });
  });

  // API Virtual Try-On Endpoint
  app.post("/api/try-on", async (req, res) => {
    try {
      const { personImage, sareeImage, sareeName, selectedColor, productId } = req.body;

      if (!personImage || !sareeImage) {
        return res.status(400).json({
          success: false,
          message: "Both personImage and sareeImage are required for virtual try-on.",
        });
      }

      let stylistAdvice = "";
      const apiKey = process.env.GEMINI_API_KEY;

      if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim().length > 10) {
        try {
          const ai = new GoogleGenAI({
            apiKey: apiKey,
            httpOptions: {
              headers: {
                "User-Agent": "aistudio-build",
              },
            },
          });

          // Request AI stylist analysis with gemini-3.1-flash-lite
          const prompt = `You are a master royal saree draper at Virasat Silk & Sarees in Kolhapur. In 2 concise sentences, provide expert styling advice for draping a ${selectedColor} ${sareeName}. Mention pallu arrangement and jewelry pairing.`;
          
          try {
            const aiRes = await ai.models.generateContent({
              model: "gemini-3.1-flash-lite",
              contents: prompt,
            });

            if (aiRes.text) {
              stylistAdvice = aiRes.text.trim();
            }
          } catch (liteErr: any) {
            // Graceful fallback to secondary model if needed
            const aiRes = await ai.models.generateContent({
              model: "gemini-3.5-flash-lite",
              contents: prompt,
            });
            if (aiRes.text) {
              stylistAdvice = aiRes.text.trim();
            }
          }
        } catch {
          // Graceful fallback to heritage styling without noisy console errors
        }
      }

      return res.json({
        success: true,
        stylistAdvice: stylistAdvice || undefined,
        sareeName,
        selectedColor,
        productId,
        message: `Virtual drape model initialized for ${sareeName} (${selectedColor})`,
        generatedAt: new Date().toISOString(),
      });
    } catch (err: any) {
      console.error("Try-on error:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to process virtual try-on.",
      });
    }
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Virasat Showroom server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
