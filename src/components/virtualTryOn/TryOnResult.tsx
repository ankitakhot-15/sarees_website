import React, { useState, useEffect } from "react";
import {
  Download,
  MessageCircle,
  RotateCcw,
  Sparkles,
  Eye,
  Columns,
  Sliders,
  Layers,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  UserCheck,
  RefreshCw,
} from "lucide-react";
import type { SareeProduct, SareeColor } from "../../data/products";
import { formatPrice } from "../../utils/formatPrice";
import { openWhatsAppTryOnEnquiry } from "../../services/whatsappService";
import { generateFaceOnSaree, generateDrapeOnCustomerPhoto } from "../../services/drapingEngine";

export interface TryOnResultProps {
  resultImage: string;
  faceOnModelImage?: string;
  drapedOnYouImage?: string;
  studioDuoImage?: string;
  originalImage?: string;
  stylistAdvice?: string;
  product: SareeProduct;
  selectedColor: SareeColor;
  onReset: () => void;
  onClose: () => void;
}

type ViewMode = "drapedOnYou" | "faceOnModel" | "split" | "studio" | "original";

export const TryOnResult: React.FC<TryOnResultProps> = ({
  resultImage,
  faceOnModelImage,
  drapedOnYouImage,
  studioDuoImage,
  originalImage,
  stylistAdvice,
  product,
  selectedColor,
  onReset,
  onClose,
}) => {
  // Default to Draped on You (preserves customer's face, smile, and natural portrait)
  const [viewMode, setViewMode] = useState<ViewMode>("drapedOnYou");
  const [splitPosition, setSplitPosition] = useState<number>(50);

  // Face fitting adjustment parameters for model view
  const [faceOffsetX, setFaceOffsetX] = useState<number>(0);
  const [faceOffsetY, setFaceOffsetY] = useState<number>(0);
  const [faceScale, setFaceScale] = useState<number>(1.0);
  const [faceRotation, setFaceRotation] = useState<number>(0);
  const [cropCenterY, setCropCenterY] = useState<number>(0.28);
  const [showFineTuner, setShowFineTuner] = useState<boolean>(false);
  const [customCompositeImage, setCustomCompositeImage] = useState<string | null>(null);

  // Cached HTMLImageElements for fast real-time canvas updates
  const [personElement, setPersonElement] = useState<HTMLImageElement | null>(null);
  const [sareeElement, setSareeElement] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!originalImage) return;

    const pImg = new Image();
    if (!originalImage.startsWith("data:")) pImg.crossOrigin = "anonymous";
    pImg.src = originalImage;
    pImg.onload = () => setPersonElement(pImg);

    const sImg = new Image();
    sImg.crossOrigin = "anonymous";
    sImg.src = selectedColor.image;
    sImg.onload = () => setSareeElement(sImg);
  }, [originalImage, selectedColor.image]);

  // Re-render model composite if user adjusts nudge/scale controls
  useEffect(() => {
    if (!personElement || !sareeElement || !originalImage) return;

    try {
      const updated = generateFaceOnSaree(personElement, sareeElement, {
        personImage: originalImage,
        sareeImage: selectedColor.image,
        sareeName: product.name,
        selectedColor: selectedColor.name,
        colorHex: selectedColor.value,
        category: product.category,
        faceOffsetX,
        faceOffsetY,
        faceScale,
        faceRotation,
        cropCenterY,
      });
      setCustomCompositeImage(updated);
    } catch (err) {
      console.warn("Real-time face adjustment warning:", err);
    }
  }, [faceOffsetX, faceOffsetY, faceScale, faceRotation, cropCenterY, personElement, sareeElement]);

  const effectiveDrapedOnYou = drapedOnYouImage || resultImage;
  const effectiveFaceOnModel = customCompositeImage || faceOnModelImage || resultImage;
  const effectiveStudio = studioDuoImage || resultImage;
  const effectiveOriginal = originalImage || "";

  const handleResetAlignment = () => {
    setFaceOffsetX(0);
    setFaceOffsetY(0);
    setFaceScale(1.0);
    setFaceRotation(0);
    setCropCenterY(0.28);
  };

  const getActiveImage = () => {
    switch (viewMode) {
      case "drapedOnYou":
        return effectiveDrapedOnYou;
      case "faceOnModel":
        return effectiveFaceOnModel;
      case "studio":
        return effectiveStudio;
      case "original":
        return effectiveOriginal || resultImage;
      default:
        return effectiveDrapedOnYou;
    }
  };

  const handleDownload = () => {
    try {
      const activeImg = getActiveImage();
      const link = document.createElement("a");
      link.href = activeImg;
      link.download = `Virasat-${product.name.replace(/\s+/g, "-")}-${selectedColor.name}-TryOn.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to download try-on preview:", err);
    }
  };

  const handleWhatsApp = () => {
    openWhatsAppTryOnEnquiry(product, selectedColor);
  };

  return (
    <div className="space-y-4">
      {/* Title Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5A1022]/10 text-[#5A1022] text-xs font-semibold uppercase tracking-wider mb-1.5">
          <Sparkles size={13} className="text-[#C9A227]" />
          <span>Virtual Saree Try-On</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-[#2C1B16] font-medium">
          {product.name}
        </h3>
        <p className="text-xs text-[#2C1B16]/65 mt-0.5 font-light">
          Experience how this authentic {selectedColor.name} handloom drape looks on you
        </p>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 bg-[#FAF5EB] p-1.5 rounded-sm border border-[#F8F1E5]">
        <button
          type="button"
          onClick={() => setViewMode("drapedOnYou")}
          className={`px-3 py-1.5 rounded-xs text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
            viewMode === "drapedOnYou"
              ? "bg-[#5A1022] text-[#FFFDF8] shadow-sm font-semibold"
              : "text-[#2C1B16]/75 hover:text-[#5A1022] hover:bg-[#F8F1E5]"
          }`}
        >
          <UserCheck size={13} className={viewMode === "drapedOnYou" ? "text-[#C9A227]" : ""} />
          <span>Draped on You</span>
        </button>

        <button
          type="button"
          onClick={() => setViewMode("faceOnModel")}
          className={`px-3 py-1.5 rounded-xs text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
            viewMode === "faceOnModel"
              ? "bg-[#5A1022] text-[#FFFDF8] shadow-sm font-semibold"
              : "text-[#2C1B16]/75 hover:text-[#5A1022] hover:bg-[#F8F1E5]"
          }`}
        >
          <Sparkles size={13} className={viewMode === "faceOnModel" ? "text-[#C9A227]" : ""} />
          <span>Full Model Drape</span>
        </button>

        {effectiveOriginal && (
          <button
            type="button"
            onClick={() => setViewMode("split")}
            className={`px-3 py-1.5 rounded-xs text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === "split"
                ? "bg-[#5A1022] text-[#FFFDF8] shadow-sm font-semibold"
                : "text-[#2C1B16]/75 hover:text-[#5A1022] hover:bg-[#F8F1E5]"
            }`}
          >
            <Columns size={13} className={viewMode === "split" ? "text-[#C9A227]" : ""} />
            <span>Before vs. After</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => setViewMode("studio")}
          className={`px-3 py-1.5 rounded-xs text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
            viewMode === "studio"
              ? "bg-[#5A1022] text-[#FFFDF8] shadow-sm font-semibold"
              : "text-[#2C1B16]/75 hover:text-[#5A1022] hover:bg-[#F8F1E5]"
          }`}
        >
          <Layers size={13} className={viewMode === "studio" ? "text-[#C9A227]" : ""} />
          <span>Studio Duo</span>
        </button>

        {effectiveOriginal && (
          <button
            type="button"
            onClick={() => setViewMode("original")}
            className={`px-3 py-1.5 rounded-xs text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === "original"
                ? "bg-[#5A1022] text-[#FFFDF8] shadow-sm font-semibold"
                : "text-[#2C1B16]/75 hover:text-[#5A1022] hover:bg-[#F8F1E5]"
            }`}
          >
            <Eye size={13} />
            <span>Original Photo</span>
          </button>
        )}
      </div>

      {/* Main Image Display */}
      <div className="relative aspect-[3/4] max-h-[440px] mx-auto rounded-sm overflow-hidden border-2 border-[#C9A227] shadow-xl bg-[#160B09] flex items-center justify-center select-none">
        {viewMode === "split" && effectiveOriginal ? (
          /* Interactive Split Slider */
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={effectiveDrapedOnYou}
              alt="You wearing the saree"
              className="absolute inset-0 w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />

            <div
              className="absolute inset-0 overflow-hidden border-r-2 border-[#C9A227] shadow-2xl"
              style={{ width: `${splitPosition}%` }}
            >
              <img
                src={effectiveOriginal}
                alt="Original Uploaded Portrait"
                className="absolute inset-0 w-full h-full object-cover object-top max-w-none"
                style={{ width: "896px", maxWidth: "none" }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-[#160B09]/85 text-[#FFFDF8] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-xs">
                Before: Uploaded Photo
              </div>
            </div>

            <div className="absolute top-3 right-3 bg-[#5A1022]/90 text-[#FFFDF8] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-xs">
              After: Draped Look
            </div>

            <input
              type="range"
              min="10"
              max="90"
              value={splitPosition}
              onChange={(e) => setSplitPosition(Number(e.target.value))}
              className="absolute inset-x-0 bottom-4 w-4/5 mx-auto opacity-80 hover:opacity-100 transition-opacity cursor-ew-resize accent-[#C9A227] z-20"
              title="Slide horizontally to compare"
            />
          </div>
        ) : (
          /* Single Image Display */
          <>
            <img
              src={getActiveImage()}
              alt={`Virtual try on result for ${product.name} in ${selectedColor.name}`}
              className="w-full h-full object-cover object-top transition-opacity duration-200"
              referrerPolicy="no-referrer"
            />

            {/* Corner Badge */}
            <div className="absolute top-3 left-3 bg-[#160B09]/90 backdrop-blur-xs text-[#FFFDF8] text-[11px] px-2.5 py-1 rounded-xs flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#C9A227]"></span>
              <span>
                {viewMode === "original"
                  ? "Your Uploaded Photo"
                  : viewMode === "studio"
                  ? `Studio Duo • ${selectedColor.name}`
                  : viewMode === "drapedOnYou"
                  ? `Draped on You • ${selectedColor.name}`
                  : `${product.name} (${selectedColor.name})`}
              </span>
            </div>

            <div className="absolute top-3 right-3 bg-[#5A1022]/90 backdrop-blur-xs text-[#C9A227] text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-xs shadow-sm">
              Photorealistic Drape
            </div>
          </>
        )}
      </div>

      {/* Optional Fine-Tuning Drawer for Full Model Drape Mode */}
      {viewMode === "faceOnModel" && (
        <div className="bg-[#FAF5EB] border border-[#C9A227]/40 rounded-sm p-3 space-y-2.5">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowFineTuner(!showFineTuner)}
              className="text-xs font-semibold text-[#5A1022] flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <Sliders size={13} className="text-[#C9A227]" />
              <span>Fine-Tune Head Position & Size</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${showFineTuner ? "rotate-180" : ""}`}
              />
            </button>
            <button
              type="button"
              onClick={handleResetAlignment}
              className="text-[10px] text-[#5A1022] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw size={10} />
              <span>Reset Alignment</span>
            </button>
          </div>

          {showFineTuner && (
            <div className="pt-2 border-t border-[#F8F1E5] space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                {/* 4-way Nudge Controls */}
                <div>
                  <label className="text-[10px] font-semibold text-[#2C1B16] block mb-1">
                    Nudge Face Position:
                  </label>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setFaceOffsetY((prev) => prev - 5)}
                      className="p-1.5 rounded-xs bg-[#FFFDF8] border border-[#C9A227]/50 text-[#5A1022] hover:bg-[#5A1022] hover:text-white transition-colors cursor-pointer"
                      title="Move Up"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setFaceOffsetY((prev) => prev + 5)}
                      className="p-1.5 rounded-xs bg-[#FFFDF8] border border-[#C9A227]/50 text-[#5A1022] hover:bg-[#5A1022] hover:text-white transition-colors cursor-pointer"
                      title="Move Down"
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setFaceOffsetX((prev) => prev - 5)}
                      className="p-1.5 rounded-xs bg-[#FFFDF8] border border-[#C9A227]/50 text-[#5A1022] hover:bg-[#5A1022] hover:text-white transition-colors cursor-pointer"
                      title="Move Left"
                    >
                      <ArrowLeft size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setFaceOffsetX((prev) => prev + 5)}
                      className="p-1.5 rounded-xs bg-[#FFFDF8] border border-[#C9A227]/50 text-[#5A1022] hover:bg-[#5A1022] hover:text-white transition-colors cursor-pointer"
                      title="Move Right"
                    >
                      <ArrowRight size={14} />
                    </button>
                    <span className="text-[10px] text-[#2C1B16]/65 ml-1">
                      X: {faceOffsetX}px, Y: {faceOffsetY}px
                    </span>
                  </div>
                </div>

                {/* Face Scale / Zoom */}
                <div>
                  <div className="flex justify-between text-[10px] font-semibold text-[#2C1B16] mb-1">
                    <span>Face Size:</span>
                    <span>{Math.round(faceScale * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.80"
                    max="1.25"
                    step="0.02"
                    value={faceScale}
                    onChange={(e) => setFaceScale(Number(e.target.value))}
                    className="w-full accent-[#5A1022]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                {/* Head Tilt / Rotation */}
                <div>
                  <div className="flex justify-between text-[10px] font-semibold text-[#2C1B16] mb-1">
                    <span>Head Tilt:</span>
                    <span>{faceRotation}°</span>
                  </div>
                  <input
                    type="range"
                    min="-16"
                    max="16"
                    step="1"
                    value={faceRotation}
                    onChange={(e) => setFaceRotation(Number(e.target.value))}
                    className="w-full accent-[#5A1022]"
                  />
                </div>

                {/* Photo Face Crop Height */}
                <div>
                  <div className="flex justify-between text-[10px] font-semibold text-[#2C1B16] mb-1">
                    <span>Crop Center:</span>
                    <span>{Math.round(cropCenterY * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.15"
                    max="0.45"
                    step="0.02"
                    value={cropCenterY}
                    onChange={(e) => setCropCenterY(Number(e.target.value))}
                    className="w-full accent-[#5A1022]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* AI Stylist Recommendation */}
      {stylistAdvice && (
        <div className="bg-[#FAF5EB] border border-[#C9A227]/40 p-3.5 rounded-sm flex items-start gap-3">
          <div className="w-7 h-7 rounded-full bg-[#5A1022] text-[#C9A227] flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles size={14} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] uppercase tracking-widest text-[#7A1730] font-bold mb-0.5">
              Virasat AI Draper's Recommendation
            </p>
            <p className="text-xs text-[#2C1B16]/85 font-light leading-relaxed">
              {stylistAdvice}
            </p>
          </div>
        </div>
      )}

      {/* Saree Info Banner */}
      <div className="bg-[#F8F1E5] p-3 rounded-sm border border-[#C9A227]/30 flex items-center justify-between text-xs">
        <div>
          <p className="text-[#2C1B16]/60 uppercase tracking-wider text-[10px]">
            Selected Ensemble
          </p>
          <p className="font-serif text-base text-[#5A1022] font-semibold">
            {product.name}
          </p>
          <p className="text-[#2C1B16]/80 text-[11px]">
            Shade: <span className="font-medium text-[#5A1022]">{selectedColor.name}</span> • {product.category} Silk
          </p>
        </div>
        <div className="text-right">
          <p className="text-[#2C1B16]/60 text-[10px]">Price</p>
          <p className="text-lg font-bold text-[#5A1022]">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="space-y-2.5">
        <button
          onClick={handleWhatsApp}
          className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 px-6 rounded-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all duration-200 cursor-pointer text-sm"
        >
          <MessageCircle size={18} />
          <span>Enquire About This Saree on WhatsApp</span>
        </button>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-sm border border-[#5A1022] text-[#5A1022] hover:bg-[#5A1022] hover:text-[#FFFDF8] text-xs font-medium transition-colors cursor-pointer"
          >
            <Download size={15} />
            <span>Download Look</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-sm bg-[#F8F1E5] text-[#2C1B16] hover:bg-[#2C1B16] hover:text-[#FFFDF8] text-xs font-medium transition-colors cursor-pointer"
          >
            <RotateCcw size={15} />
            <span>Try Another Saree / Shade</span>
          </button>
        </div>
      </div>
    </div>
  );
};
