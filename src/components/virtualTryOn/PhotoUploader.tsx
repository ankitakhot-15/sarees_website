import React, { useRef, useState } from "react";
import { Upload, Image as ImageIcon, AlertCircle, Check } from "lucide-react";
import { siteConfig } from "../../config/siteConfig";

export interface PhotoUploaderProps {
  onPhotoSelected: (base64Image: string) => void;
  selectedPhoto: string | null;
  onRemovePhoto: () => void;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  onPhotoSelected,
  selectedPhoto,
  onRemovePhoto,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    setErrorMsg(null);

    // Validate type
    const validTypes = siteConfig.aiConfig.supportedFormats;
    if (!validTypes.includes(file.type)) {
      setErrorMsg("Please upload a valid JPG, PNG, or WebP photo.");
      return;
    }

    // Validate size (max 10MB)
    const maxBytes = siteConfig.aiConfig.maxImageSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      setErrorMsg(`Photo size exceeds ${siteConfig.aiConfig.maxImageSizeMB}MB limit. Please choose a smaller photo.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onPhotoSelected(result);
      }
    };
    reader.onerror = () => {
      setErrorMsg("Failed to read image file. Please try another photo.");
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="space-y-4">
      {selectedPhoto ? (
        <div className="relative aspect-[3/4] max-h-72 mx-auto rounded-sm overflow-hidden border-2 border-[#5A1022] shadow-sm bg-[#2C1B16]/5 flex items-center justify-center">
          <img
            src={selectedPhoto}
            alt="Customer portrait preview"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-3 inset-x-3 flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 bg-[#FFFDF8] hover:bg-[#F8F1E5] text-[#5A1022] text-xs font-semibold py-2 px-3 rounded-xs shadow-md border border-[#5A1022]/40 transition-colors cursor-pointer"
            >
              Replace Photo
            </button>
            <button
              type="button"
              onClick={onRemovePhoto}
              className="bg-[#5A1022] hover:bg-[#7A1730] text-[#FFFDF8] text-xs font-semibold py-2 px-3 rounded-xs shadow-md transition-colors cursor-pointer"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-sm p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 ${
            isDragging
              ? "border-[#5A1022] bg-[#5A1022]/5 scale-[0.99]"
              : "border-[#C9A227]/50 hover:border-[#5A1022] bg-[#F8F1E5]/30 hover:bg-[#F8F1E5]/60"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-[#5A1022]/10 text-[#5A1022] flex items-center justify-center">
            <Upload size={22} />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#2C1B16]">
              Click to upload or drag & drop photo
            </p>
            <p className="text-xs text-[#2C1B16]/60 mt-1">
              Supports JPG, PNG, WEBP (Max {siteConfig.aiConfig.maxImageSizeMB}MB)
            </p>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {errorMsg && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs">
          <AlertCircle size={16} className="shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Guidelines Box */}
      <div className="p-3.5 bg-[#F8F1E5]/50 border border-[#F8F1E5] rounded-sm text-xs text-[#2C1B16]/80 space-y-1.5">
        <p className="font-semibold text-[#5A1022] flex items-center gap-1.5">
          <ImageIcon size={14} className="text-[#C9A227]" />
          <span>For best virtual try-on results:</span>
        </p>
        <ul className="space-y-1 pl-4 list-disc text-[11px] font-light text-[#2C1B16]/75">
          <li>Use a clear, front-facing portrait with good lighting</li>
          <li>Waist-up or full-body standing photo preferred</li>
          <li>Simple background and plain clothing yield the crispest saree drape</li>
        </ul>
      </div>
    </div>
  );
};
