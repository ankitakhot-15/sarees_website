import React, { useState } from "react";
import { MessageCircle, Phone, MapPin, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { shopConfig } from "../config/shopConfig";
import { SectionTitle } from "../components/common/SectionTitle";
import { categories } from "../data/categories";

export const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [collection, setCollection] = useState("Paithani Sarees");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!message.trim()) {
      setErrorMsg("Please enter your enquiry message.");
      return;
    }

    // Format WhatsApp message
    const formattedText = `Namaste Virasat Silk & Sarees,\n\nI would like to make an enquiry:\n- *Name*: ${name.trim()}\n- *Phone*: ${cleanPhone}\n- *Preferred Collection*: ${collection}\n- *Message*: ${message.trim()}\n\nPlease guide me on availability and showroom consultation.`;

    const encoded = encodeURIComponent(formattedText);
    const waUrl = `https://wa.me/${shopConfig.whatsappNumber}?text=${encoded}`;

    // Open WhatsApp
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-20 bg-[#FFFDF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Connect With Our Curators"
          title="Contact & WhatsApp Enquiry"
          subtitle="Have questions about a specific weave, custom color dyeing, or bridal appointments? Send us an inquiry or message us directly on WhatsApp."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mt-12 items-start">
          {/* Left Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#FFFDF8] border border-[#F8F1E5] p-6 sm:p-8 rounded-sm shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-50 text-[#25D366] flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-serif text-2xl text-[#2C1B16] font-medium">
                  Enquiry Dispatched to WhatsApp!
                </h3>
                <p className="text-sm text-[#2C1B16]/75 max-w-md mx-auto font-light leading-relaxed">
                  Thank you, <strong>{name}</strong>. Your message has been forwarded to our Kolhapur showroom WhatsApp helpline. Our draper will respond shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage("");
                    }}
                    className="text-xs font-semibold uppercase tracking-wider text-[#5A1022] hover:underline cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-serif text-xl text-[#2C1B16] font-semibold mb-2">
                  Send Showroom Enquiry
                </h3>
                <p className="text-xs text-[#2C1B16]/65 font-light">
                  Submitting will automatically open your WhatsApp with this message ready to send.
                </p>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2C1B16] uppercase tracking-wider mb-1.5">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Radhika Patil"
                      className="w-full py-2.5 px-3.5 bg-[#FAF5EB]/50 border border-[#2C1B16]/20 rounded-xs text-sm text-[#2C1B16] focus:outline-hidden focus:border-[#5A1022]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2C1B16] uppercase tracking-wider mb-1.5">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full py-2.5 px-3.5 bg-[#FAF5EB]/50 border border-[#2C1B16]/20 rounded-xs text-sm text-[#2C1B16] focus:outline-hidden focus:border-[#5A1022]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C1B16] uppercase tracking-wider mb-1.5">
                    Preferred Collection of Interest
                  </label>
                  <select
                    value={collection}
                    onChange={(e) => setCollection(e.target.value)}
                    className="w-full py-2.5 px-3.5 bg-[#FAF5EB]/50 border border-[#2C1B16]/20 rounded-xs text-sm text-[#2C1B16] focus:outline-hidden focus:border-[#5A1022] cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                    <option value="Bridal Trousseau Consultation">Bridal Trousseau Consultation</option>
                    <option value="General Inquiry">General Showroom Visit Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2C1B16] uppercase tracking-wider mb-1.5">
                    Your Message / Saree Requirements <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about the occasion, color preferences, budget, or request video call photos..."
                    className="w-full py-2.5 px-3.5 bg-[#FAF5EB]/50 border border-[#2C1B16]/20 rounded-xs text-sm text-[#2C1B16] focus:outline-hidden focus:border-[#5A1022] resize-y"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-sm py-3.5 px-6 rounded-sm shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle size={18} />
                  <span>Send Enquiry via WhatsApp</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Contact Details & Timings (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF5EB]/70 border border-[#F8F1E5] p-6 sm:p-7 rounded-sm space-y-5">
              <h3 className="font-serif text-xl text-[#2C1B16] font-semibold border-b border-[#F8F1E5] pb-3">
                Showroom Direct Desk
              </h3>

              <div className="flex items-start gap-3.5">
                <Phone size={18} className="text-[#5A1022] shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-[#2C1B16]/60 uppercase font-semibold">
                    Call Us
                  </p>
                  <p className="text-sm font-semibold text-[#5A1022]">
                    {shopConfig.displayPhone}
                  </p>
                  <p className="text-xs text-[#2C1B16]/70">
                    Landline: {shopConfig.secondaryPhone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <MessageCircle size={18} className="text-[#25D366] shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-[#2C1B16]/60 uppercase font-semibold">
                    WhatsApp Helpline
                  </p>
                  <p className="text-sm font-semibold text-[#2C1B16]">
                    +91 {shopConfig.whatsappNumber.slice(2)}
                  </p>
                  <p className="text-xs text-[#2C1B16]/70">
                    Live responses between 10 AM – 9 PM IST
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail size={18} className="text-[#5A1022] shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-[#2C1B16]/60 uppercase font-semibold">
                    Email Desk
                  </p>
                  <p className="text-sm text-[#2C1B16] font-medium">
                    {shopConfig.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <MapPin size={18} className="text-[#5A1022] shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-[#2C1B16]/60 uppercase font-semibold">
                    Showroom Address
                  </p>
                  <p className="text-xs sm:text-sm text-[#2C1B16]/80 font-light leading-relaxed">
                    {shopConfig.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock size={18} className="text-[#5A1022] shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-[#2C1B16]/60 uppercase font-semibold">
                    Business Hours
                  </p>
                  <p className="text-xs text-[#2C1B16]/80">
                    Mon – Sat: {shopConfig.hoursDetail.weekdays}
                  </p>
                  <p className="text-xs text-[#2C1B16]/80">
                    Sunday: {shopConfig.hoursDetail.sunday}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
