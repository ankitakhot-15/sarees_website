import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { FloatingWhatsAppButton } from "./components/whatsapp/FloatingWhatsAppButton";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { InitialLoader } from "./components/common/InitialLoader";

import { Home } from "./pages/Home";
import { Sarees } from "./pages/Sarees";
import { ProductDetails } from "./pages/ProductDetails";
import { Collections } from "./pages/Collections";
import { About } from "./pages/About";
import { ShopDetails } from "./pages/ShopDetails";
import { Contact } from "./pages/Contact";

export default function App() {
  const [showInitialLoader, setShowInitialLoader] = useState(true);

  return (
    <>
      {showInitialLoader && (
        <InitialLoader onComplete={() => setShowInitialLoader(false)} />
      )}

      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#FFFDF8] text-[#2C1B16] font-sans antialiased">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sarees" element={<Sarees />} />
              <Route path="/sarees/:id" element={<ProductDetails />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/about" element={<About />} />
              <Route path="/shop" element={<ShopDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <FloatingWhatsAppButton />
        </div>
      </BrowserRouter>
    </>
  );
}
