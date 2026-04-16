"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type FilterTab = "All" | "Exhibition" | "Manufacturing";

const galleryImages = [
  // Exhibition
  { id: 1, src: "/images/placeholders/img_whyus_quality.png", alt: "Season Coir at international trade exhibition", tab: "Exhibition" as FilterTab, wide: true },
  { id: 2, src: "/images/placeholders/img_whyus_biodegradable.png", alt: "Coir product display at expo", tab: "Exhibition" as FilterTab, wide: false },
  { id: 3, src: "/images/placeholders/img_process_weaving.png", alt: "Season Coir stall at trade fair", tab: "Exhibition" as FilterTab, wide: false },
  { id: 4, src: "/images/placeholders/img_whyus_quality.png", alt: "International buyers at exhibition", tab: "Exhibition" as FilterTab, wide: true },
  { id: 5, src: "/images/placeholders/img_whyus_biodegradable.png", alt: "Product showcase floor display", tab: "Exhibition" as FilterTab, wide: false },
  { id: 6, src: "/images/placeholders/img_process_separation.png", alt: "Awards and recognition display", tab: "Exhibition" as FilterTab, wide: false },
  // Manufacturing
  { id: 7, src: "/images/placeholders/img_process_dehusking.png", alt: "De-husking process at Season Coir factory", tab: "Manufacturing" as FilterTab, wide: true },
  { id: 8, src: "/images/placeholders/img_process_retting.png", alt: "Coir retting in Kerala backwaters", tab: "Manufacturing" as FilterTab, wide: false },
  { id: 9, src: "/images/placeholders/img_process_defibering.png", alt: "Defibering drums in operation", tab: "Manufacturing" as FilterTab, wide: false },
  { id: 10, src: "/images/placeholders/img_process_separation.png", alt: "Fibre separation and grading", tab: "Manufacturing" as FilterTab, wide: true },
  { id: 11, src: "/images/placeholders/img_process_weaving.png", alt: "Coir weaving on traditional looms", tab: "Manufacturing" as FilterTab, wide: false },
  { id: 12, src: "/images/placeholders/img_whyus_quality.png", alt: "Quality inspection of finished mats", tab: "Manufacturing" as FilterTab, wide: false },
  { id: 13, src: "/images/placeholders/img_whyus_biodegradable.png", alt: "Factory floor overview", tab: "Manufacturing" as FilterTab, wide: false },
  { id: 14, src: "/images/placeholders/img_process_dehusking.png", alt: "Coir yarn spinning", tab: "Manufacturing" as FilterTab, wide: true },
  { id: 15, src: "/images/placeholders/img_process_retting.png", alt: "Finished mats ready for export", tab: "Manufacturing" as FilterTab, wide: false },
];

export default function PhotosPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const filtered = activeTab === "All" ? galleryImages : galleryImages.filter((img) => img.tab === activeTab);

  const openLightbox = (id: number) => {
    const idx = filtered.findIndex((img) => img.id === id);
    setLightboxIndex(idx);
  };

  const prev = () => setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const next = () => setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));

  return (
    <main className="bg-coconut-cream overflow-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative flex items-center justify-center min-h-[65svh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="/images/placeholders/img_process_weaving.png" alt="Gallery" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/75 via-forest-dark/55 to-coconut-cream" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-kerala-gold text-[11px] font-semibold tracking-[0.35em] uppercase mb-6"
          >
            Photo Gallery
          </motion.p>
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              className="font-serif text-6xl md:text-8xl text-white font-bold leading-[0.9] tracking-tight"
            >
              Gallery
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="text-white/70 text-lg max-w-xl mx-auto"
          >
            Behind the scenes at our factory, and around the world at international exhibitions.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Filter Tabs ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8 flex items-center gap-3">
        {(["All", "Exhibition", "Manufacturing"] as FilterTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-full text-[13px] font-medium tracking-wide transition-all duration-300 ${
              activeTab === tab
                ? "bg-forest-dark text-coconut-cream shadow-md"
                : "text-forest-dark/55 border border-forest-dark/15 hover:border-forest-dark/40 hover:text-forest-dark"
            }`}
          >
            {tab}
          </button>
        ))}
        <span className="ml-auto text-forest-dark/35 text-sm">{filtered.length} photos</span>
      </div>

      {/* ── Masonry Grid ─────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto px-6 pb-24"
        >
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-0">
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openLightbox(img.id)}
                className="relative overflow-hidden rounded-2xl mb-5 cursor-pointer group break-inside-avoid"
              >
                <div className={`relative ${img.wide ? "aspect-[4/3]" : "aspect-square"}`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-forest-dark/0 group-hover:bg-forest-dark/35 transition-colors duration-400" />
                  {/* Overlay text */}
                  <div className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div>
                      <span className="text-[10px] text-kerala-gold tracking-[0.25em] uppercase font-medium">{img.tab}</span>
                      <p className="text-white text-sm font-medium leading-snug mt-1">{img.alt}</p>
                    </div>
                  </div>
                  {/* Zoom icon */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/0 group-hover:bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-forest-dark/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <X size={18} className="text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft size={22} className="text-white" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl aspect-[4/3] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].alt}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-forest-dark/80 to-transparent p-6">
                <span className="text-kerala-gold text-[10px] tracking-[0.25em] uppercase font-medium">{filtered[lightboxIndex].tab}</span>
                <p className="text-white text-sm mt-1">{filtered[lightboxIndex].alt}</p>
              </div>
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight size={22} className="text-white" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm">
              {lightboxIndex + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
