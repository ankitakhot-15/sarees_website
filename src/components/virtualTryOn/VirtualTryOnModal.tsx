import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, User, Image as ImageIcon, AlertCircle } from "lucide-react";
import type { SareeProduct, SareeColor } from "../../data/products";
import { PhotoUploader } from "./PhotoUploader";
import { TryOnLoading } from "./TryOnLoading";
import { TryOnResult } from "./TryOnResult";
import { ColorSelector } from "../products/ColorSelector";
import { demoModels, generateVirtualTryOn, type TryOnResult as TryOnResultData } from "../../services/virtualTryOnService";
import { formatPrice } from "../../utils/formatPrice";

export interface VirtualTryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: SareeProduct;
  initialColor?: SareeColor;
}

export const VirtualTryOnModal: React.FC<VirtualTryOnModalProps> = ({
  isOpen,
  onClose,
  product,
  initialColor,
}) => {
  const [selectedColor, setSelectedColor] = useState<SareeColor>(
    initialColor || product.colors[0]
  );
  const [mode, setMode] = useState<"upload" | "demo">("upload");
  const [customerPhoto, setCustomerPhoto] = useState<string | null>(null);
  const [selectedDemoModel, setSelectedDemoModel] = useState(demoModels[0]);
  const [status, setStatus] = useState<"idle" | "loading" | "result" | "error">("idle");
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [tryOnData, setTryOnData] = useState<TryOnResultData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync initial color
  useEffect(() => {
    if (initialColor) {
      setSelectedColor(initialColor);
    }
  }, [initialColor]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && status !== "loading") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, status]);

  if (!isOpen) return null;

  const handleStartProcessing = async () => {
    const personImage = mode === "upload" ? customerPhoto : selectedDemoModel.image;

    if (!personImage) {
      setErrorMessage("Please select or upload a photo to continue.");
      return;
    }

    setStatus("loading");
    setErrorMessage(null);

    try {
      const res = await generateVirtualTryOn({
        personImage,
        sareeImage: selectedColor.image,
        sareeName: product.name,
        selectedColor: selectedColor.name,
        colorHex: selectedColor.value,
        category: product.category,
        productId: product.id,
      });

      if (res.success && res.resultImage) {
        setTryOnData(res);
        setResultImage(res.resultImage);
        setStatus("result");
      } else {
        throw new Error("Could not produce try-on preview.");
      }
    } catch (err: any) {
      console.error("Virtual Try-On error:", err);
      setErrorMessage(
        err.message || "Virtual try-on is temporarily unavailable. You can still enquire on WhatsApp!"
      );
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setResultImage(null);
    setTryOnData(null);
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          if (status !== "loading") onClose();
        }}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
      />

      {/* Modal Dialog Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-xl bg-[#FFFDF8] rounded-sm shadow-2xl border border-[#C9A227]/40 z-10 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="try-on-title"
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-[#F8F1E5] flex items-center justify-between bg-[#F8F1E5]/40 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#5A1022] flex items-center justify-center text-[#C9A227]">
              <Sparkles size={16} />
            </div>
            <div>
              <h2 id="try-on-title" className="font-serif text-lg sm:text-xl text-[#2C1B16] font-semibold leading-tight">
                Try This Saree Virtually
              </h2>
              <p className="text-[11px] text-[#2C1B16]/65 font-light">
                See how this saree could look on you.
              </p>
            </div>
          </div>

          {status !== "loading" && (
            <button
              onClick={onClose}
              className="p-1.5 text-[#2C1B16]/60 hover:text-[#5A1022] hover:bg-[#F8F1E5] rounded-full transition-colors cursor-pointer"
              aria-label="Close virtual try-on modal"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {status === "loading" && (
            <TryOnLoading
              sareeName={product.name}
              selectedColor={selectedColor.name}
            />
          )}

          {status === "result" && resultImage && (
            <TryOnResult
              resultImage={resultImage}
              faceOnModelImage={tryOnData?.faceOnModelImage}
              drapedOnYouImage={tryOnData?.drapedOnYouImage}
              studioDuoImage={tryOnData?.studioDuoImage}
              originalImage={tryOnData?.originalImage}
              stylistAdvice={tryOnData?.stylistAdvice}
              product={product}
              selectedColor={selectedColor}
              onReset={handleReset}
              onClose={onClose}
            />
          )}

          {status === "error" && (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <AlertCircle size={28} />
              </div>
              <h3 className="font-serif text-2xl text-[#2C1B16] font-medium">
                Virtual try-on is temporarily unavailable
              </h3>
              <p className="text-xs text-[#2C1B16]/75 max-w-md mx-auto font-light">
                {errorMessage || "We encountered a momentary delay connecting to the AI rendering engine. Our showroom consultants are available on WhatsApp to assist you immediately."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#5A1022] border border-[#5A1022] rounded-sm hover:bg-[#5A1022] hover:text-[#FFFDF8] transition-colors cursor-pointer"
                >
                  Try Again
                </button>
                <a
                  href={`https://wa.me/919356951406?text=${encodeURIComponent(`Hello, I am interested in ${product.name} in ${selectedColor.name} (${formatPrice(product.price)}). Could you assist me with video/photos?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#25D366] text-white rounded-sm hover:bg-[#1EBE5D] transition-colors"
                >
                  Enquire on WhatsApp
                </a>
              </div>
            </div>
          )}

          {status === "idle" && (
            <div className="space-y-6">
              {/* Saree & Color Snapshot */}
              <div className="p-3.5 bg-[#F8F1E5]/60 border border-[#C9A227]/30 rounded-sm flex items-center gap-3.5">
                <img
                  src={selectedColor.image}
                  alt={product.name}
                  className="w-14 h-18 object-cover rounded-xs border border-[#C9A227]/40 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-base text-[#2C1B16] font-medium truncate">
                    {product.name}
                  </p>
                  <p className="text-xs font-bold text-[#5A1022]">
                    {formatPrice(product.price)}
                  </p>
                  <div className="mt-1">
                    <ColorSelector
                      colors={product.colors}
                      selectedColor={selectedColor}
                      onSelectColor={setSelectedColor}
                      size="sm"
                      showLabel={true}
                    />
                  </div>
                </div>
              </div>

              {/* Mode Tabs: Upload Photo vs Demo Model */}
              <div className="flex rounded-sm bg-[#F8F1E5] p-1 border border-[#F8F1E5]">
                <button
                  type="button"
                  onClick={() => setMode("upload")}
                  className={`flex-1 py-2 text-xs font-medium rounded-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    mode === "upload"
                      ? "bg-[#FFFDF8] text-[#5A1022] shadow-xs font-semibold"
                      : "text-[#2C1B16]/70 hover:text-[#5A1022]"
                  }`}
                >
                  <User size={14} />
                  <span>Upload My Photo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode("demo")}
                  className={`flex-1 py-2 text-xs font-medium rounded-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    mode === "demo"
                      ? "bg-[#FFFDF8] text-[#5A1022] shadow-xs font-semibold"
                      : "text-[#2C1B16]/70 hover:text-[#5A1022]"
                  }`}
                >
                  <ImageIcon size={14} />
                  <span>Try with Demo Model</span>
                </button>
              </div>

              {/* Tab 1: Upload Photo */}
              {mode === "upload" && (
                <PhotoUploader
                  selectedPhoto={customerPhoto}
                  onPhotoSelected={(data) => setCustomerPhoto(data)}
                  onRemovePhoto={() => setCustomerPhoto(null)}
                />
              )}

              {/* Tab 2: Demo Models */}
              {mode === "demo" && (
                <div className="space-y-3">
                  <p className="text-xs text-[#2C1B16]/70">
                    Select a demo model pose to test the saree drape without uploading your own photo:
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {demoModels.map((model) => {
                      const isSelected = selectedDemoModel.id === model.id;
                      return (
                        <button
                          key={model.id}
                          type="button"
                          onClick={() => setSelectedDemoModel(model)}
                          className={`relative aspect-[3/4] rounded-sm overflow-hidden border-2 transition-all cursor-pointer group ${
                            isSelected
                              ? "border-[#5A1022] ring-2 ring-[#C9A227] scale-[1.02]"
                              : "border-transparent opacity-75 hover:opacity-100 hover:border-[#C9A227]"
                          }`}
                        >
                          <img
                            src={model.image}
                            alt={model.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 text-left">
                            <p className="text-[11px] font-semibold text-white">
                              {model.name}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Privacy Notice as requested by Section 32 */}
              <p className="text-[11px] text-[#2C1B16]/60 leading-relaxed border-t border-[#F8F1E5] pt-3 font-light">
                ✦ Your photo is used solely to generate the virtual saree preview. Please upload only a photo you have permission to use. Images are processed temporarily and not stored permanently.
              </p>

              {/* Modal Confirmation Action */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-sm border border-[#2C1B16]/20 text-[#2C1B16]/70 hover:bg-[#F8F1E5] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleStartProcessing}
                  disabled={mode === "upload" && !customerPhoto}
                  className="flex-1 bg-[#5A1022] hover:bg-[#7A1730] disabled:opacity-40 disabled:cursor-not-allowed text-[#FFFDF8] py-3 px-4 rounded-sm text-xs font-semibold tracking-wider uppercase shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles size={14} className="text-[#C9A227]" />
                  <span>Generate Look</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
