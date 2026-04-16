"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Mail } from "lucide-react";

const PRODUCT_CATEGORIES = [
  {
    id: "all",
    label: "All Products",
  },
  {
    id: "pvc-vinyl",
    label: "PVC / Vinyl Backed",
  },
  {
    id: "rubber-backed",
    label: "Rubber Backed Coir",
  },
  {
    id: "pvc-backed",
    label: "PVC Backed",
  },
  {
    id: "rubber-only",
    label: "100% Rubber",
  },
  {
    id: "coir-only",
    label: "100% Coir",
  },
  {
    id: "polypropylene",
    label: "Polypropylene",
  },
] as const;

type CategoryId = (typeof PRODUCT_CATEGORIES)[number]["id"];

const allProducts = [
  // PVC / Vinyl Backed
  {
    id: "pv-001",
    category: "pvc-vinyl" as CategoryId,
    name: "PVC / Vinyl Backed Coir Tufted Mat",
    desc: "Classic coir tufted mat on a durable PVC/vinyl backing. Ideal for high-footfall entryways.",
    tags: ["Indoor", "Anti-slip", "Commercial"],
    image: "/images/placeholders/img_whyus_quality.png",
  },
  {
    id: "pv-002",
    category: "pvc-vinyl" as CategoryId,
    name: "PVC / Vinyl Backed Printed Coir Tufted Mat",
    desc: "Custom-printed coir surface on vinyl backing. Brand logos, patterns, and bespoke designs available.",
    tags: ["Custom Print", "Retail", "Commercial"],
    image: "/images/placeholders/img_whyus_quality.png",
  },
  {
    id: "pv-003",
    category: "pvc-vinyl" as CategoryId,
    name: "PVC / Vinyl Backed Rubber Embossed Coir Tufted Mat",
    desc: "Rubber embossed design combined with coir tufting on PVC. Premium tactile appeal.",
    tags: ["Embossed", "Premium", "Hospitality"],
    image: "/images/placeholders/img_whyus_quality.png",
  },
  {
    id: "pv-004",
    category: "pvc-vinyl" as CategoryId,
    name: "PVC / Vinyl Backed Shaped Printed Coir Tufted Mat",
    desc: "Available in custom shapes — semi-circle, arch, oval — with printed coir face on vinyl base.",
    tags: ["Custom Shape", "Decorative", "Residential"],
    image: "/images/placeholders/img_whyus_quality.png",
  },
  // Rubber Backed Coir
  {
    id: "rb-001",
    category: "rubber-backed" as CategoryId,
    name: "Non Slip Heavy Duty Rubber Backed Coir Scraper Mat",
    desc: "Thick coir pile on vulcanised rubber. Heavy-duty mud scraping for commercial and industrial entrances.",
    tags: ["Anti-slip", "Industrial", "Scraper"],
    image: "/images/placeholders/img_whyus_biodegradable.png",
  },
  {
    id: "rb-002",
    category: "rubber-backed" as CategoryId,
    name: "PVC Backed Printed Coir Tufted Mat With Rubber Tray Backing",
    desc: "Double-backed for superior grip — PVC coir mat set into a rubber tray for maximum stability.",
    tags: ["Double Backed", "Stable", "Entrance"],
    image: "/images/placeholders/img_whyus_biodegradable.png",
  },
  {
    id: "rb-003",
    category: "rubber-backed" as CategoryId,
    name: "Rubber Backed Coir Brush Mat",
    desc: "Brush-style coir fibres on natural rubber. Aggressive cleaning action for heavy-use entrances.",
    tags: ["Brush Style", "Heavy Use", "Outdoor"],
    image: "/images/placeholders/img_whyus_biodegradable.png",
  },
  {
    id: "rb-004",
    category: "rubber-backed" as CategoryId,
    name: "Rubber Backed Coir Grill Brush Mat / Crown Brush Mat",
    desc: "Grill pattern with brush inserts. Superior dirt and debris scraping for industrial entrances.",
    tags: ["Grill Pattern", "Brush", "Industrial"],
    image: "/images/placeholders/img_whyus_biodegradable.png",
  },
  {
    id: "rb-005",
    category: "rubber-backed" as CategoryId,
    name: "Rubber Backed Coir Grill Insert Mat",
    desc: "Open grill frame with coir insert panels. Modular design allows easy cleaning and insert replacement.",
    tags: ["Modular", "Easy Clean", "Commercial"],
    image: "/images/placeholders/img_whyus_biodegradable.png",
  },
  {
    id: "rb-006",
    category: "rubber-backed" as CategoryId,
    name: "Rubber Backed Coir Grill Matting Mat / Panama Crown Coir Mat",
    desc: "Panama-style crown weave on rubber backing. Elegant grid appearance with practical performance.",
    tags: ["Panama Weave", "Elegant", "Entrance"],
    image: "/images/placeholders/img_whyus_biodegradable.png",
  },
  {
    id: "rb-007",
    category: "rubber-backed" as CategoryId,
    name: "Rubber Backed Coir Mat With Border Painted – SK8 Mat",
    desc: "SK8 series — painted border frame with natural coir centre. Decorative appeal with anti-slip rubber base.",
    tags: ["Decorative Border", "SK8 Series", "Residential"],
    image: "/images/placeholders/img_whyus_biodegradable.png",
  },
  {
    id: "rb-008",
    category: "rubber-backed" as CategoryId,
    name: "Rubber Backed Coir Matting Mat / Panama Coir Mat",
    desc: "Classic Panama weave coir on rubber. One of our bestselling lines — trusted by buyers across Europe.",
    tags: ["Bestseller", "Panama", "Europe Export"],
    image: "/images/placeholders/img_whyus_biodegradable.png",
  },
  {
    id: "rb-009",
    category: "rubber-backed" as CategoryId,
    name: "Rubber Backed Coir Printed Matting Mat / Panama Printed",
    desc: "Panama weave coir with custom print capability on rubber backing. Personalised mats at commercial scale.",
    tags: ["Custom Print", "Panama", "Commercial"],
    image: "/images/placeholders/img_whyus_biodegradable.png",
  },
  // PVC Backed Coir
  {
    id: "pb-001",
    category: "pvc-backed" as CategoryId,
    name: "PVC Backed Printed Coir Tufted Mat With Rubber Tray Backing",
    desc: "Tufted coir with print, set into a rubber tray on PVC base. Triple-layer for stability and style.",
    tags: ["Triple Layer", "Printed", "Premium"],
    image: "/images/placeholders/img_whyus_quality.png",
  },
  // 100% Rubber Mats
  {
    id: "rm-001",
    category: "rubber-only" as CategoryId,
    name: "Rope Mat",
    desc: "Coiled rubber rope construction. Highly durable, water-resistant, and suitable for marine and pool environments.",
    tags: ["Marine", "Pool-side", "Water-resistant"],
    image: "/images/placeholders/img_whyus_quality.png",
  },
  {
    id: "rm-002",
    category: "rubber-only" as CategoryId,
    name: "Rubber Backed Flocked Digital Printed Mat / Sublimation Mat",
    desc: "Sublimation-print quality on flocked rubber surface. Photo-realistic custom prints for promotional and retail use.",
    tags: ["Sublimation Print", "Custom", "Promotional"],
    image: "/images/placeholders/img_whyus_quality.png",
  },
  {
    id: "rm-003",
    category: "rubber-only" as CategoryId,
    name: "Rubber Backed Pin Mat",
    desc: "Raised pin pattern on solid rubber base. Ergonomic anti-fatigue performance for kitchens and workstations.",
    tags: ["Anti-fatigue", "Kitchen", "Pin Pattern"],
    image: "/images/placeholders/img_whyus_quality.png",
  },
  {
    id: "rm-004",
    category: "rubber-only" as CategoryId,
    name: "Rubber Iron Grill Mat",
    desc: "Heavy iron grill frame with rubber insert. Maximum durability for industrial and heavy-traffic settings.",
    tags: ["Industrial", "Iron Grill", "Heavy-duty"],
    image: "/images/placeholders/img_whyus_quality.png",
  },
  {
    id: "rm-005",
    category: "rubber-only" as CategoryId,
    name: "Soil Carpet",
    desc: "Specialised rubber soil-retention mat for greenhouse, nursery, and garden centre use.",
    tags: ["Garden", "Greenhouse", "Nursery"],
    image: "/images/placeholders/img_whyus_quality.png",
  },
  // 100% Coir Mats
  {
    id: "cm-001",
    category: "coir-only" as CategoryId,
    name: "PVC / Vinyl Backed Printed Coir Tufted Mat",
    desc: "Pure Alleppey coir tufted mat with custom print. Fully biodegradable coir face with minimal backing.",
    tags: ["Biodegradable", "Printed", "Alleppey Coir"],
    image: "/images/placeholders/img_whyus_biodegradable.png",
  },
  {
    id: "cm-002",
    category: "coir-only" as CategoryId,
    name: "Rope Mat",
    desc: "Handwoven natural coir rope mat. Zero synthetic content, fully compostable — the most natural mat we make.",
    tags: ["Handwoven", "Compostable", "100% Natural"],
    image: "/images/placeholders/img_whyus_biodegradable.png",
  },
  // Polypropylene
  {
    id: "pp-001",
    category: "polypropylene" as CategoryId,
    name: "Rubber Backed Digital Mat / Gallery Mat",
    desc: "High-resolution digital print on polypropylene pile, rubber backed. Perfect for exhibitions and galleries.",
    tags: ["Digital Print", "Gallery", "Exhibition"],
    image: "/images/placeholders/img_whyus_quality.png",
  },
  {
    id: "pp-002",
    category: "polypropylene" as CategoryId,
    name: "Rubber Backed Polypropylene Mat With Rubber Border",
    desc: "UV-stabilised polypropylene pile with integrated rubber border. Commercial-grade durability for outdoor use.",
    tags: ["UV-stable", "Outdoor", "Rubber Border"],
    image: "/images/placeholders/img_whyus_quality.png",
  },
];

type Product = (typeof allProducts)[0];

export default function ProductsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const filtered = activeCategory === "all" ? allProducts : allProducts.filter((p) => p.category === activeCategory);

  return (
    <main className="bg-coconut-cream overflow-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative flex items-center justify-center min-h-[72svh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="/images/placeholders/img_whyus_quality.png" alt="Season Coir Products" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/80 via-forest-dark/60 to-coconut-cream" />
          {/* Fibre texture */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(212,175,55,0.4) 0px, transparent 1px, transparent 12px)", backgroundSize: "100% 12px" }} />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-kerala-gold text-[11px] font-semibold tracking-[0.35em] uppercase mb-6"
          >
            6 Categories · 23 Products
          </motion.p>
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              className="font-serif text-6xl md:text-8xl text-white font-bold leading-[0.9] tracking-tight"
            >
              Our Products
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed"
          >
            Premium coir and rubber mats — manufactured in Kerala, trusted worldwide.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Category Filter Tabs ──────────────────────────────────────────── */}
      <div className="sticky top-[72px] z-30 bg-coconut-cream/95 backdrop-blur-md border-b border-forest-dark/8 py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative shrink-0 px-5 py-2.5 rounded-full text-[13px] font-medium tracking-wide transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-forest-dark text-coconut-cream shadow-md"
                    : "text-forest-dark/55 hover:text-forest-dark hover:bg-forest-dark/6"
                }`}
              >
                {cat.label}
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 bg-forest-dark rounded-full -z-10"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Products Grid ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Result count + Download CTA */}
        <div className="flex items-center justify-between mb-10">
          <motion.p
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-forest-dark/45 text-sm"
          >
            Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </motion.p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-kerala-gold border border-kerala-gold/30 px-5 py-2.5 rounded-full hover:bg-kerala-gold hover:text-forest-dark transition-all duration-300"
          >
            <Mail size={14} />
            Request Catalogue
          </Link>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedProduct(product)}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-black/[0.05] cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-400"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-kerala-gold flex items-center justify-center">
                      <ArrowRight size={14} className="text-forest-dark" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {product.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[10px] text-forest-green bg-forest-green/8 px-2.5 py-0.5 rounded-full font-medium border border-forest-green/12">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-serif text-base text-forest-dark font-semibold leading-snug mb-2 group-hover:text-forest-green transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-forest-dark/50 text-xs leading-relaxed line-clamp-2">{product.desc}</p>
                  <div className="mt-4 pt-4 border-t border-black/[0.05] flex items-center justify-between">
                    <span className="text-[11px] text-forest-dark/35 uppercase tracking-[0.2em]">View Details</span>
                    <ArrowRight size={13} className="text-kerala-gold" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Product Modal ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-forest-dark/60 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-coconut-cream rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl max-h-[90svh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-forest-dark/10 flex items-center justify-center hover:bg-forest-dark/20 transition-colors"
        >
          <X size={18} className="text-forest-dark" />
        </button>

        {/* Image */}
        <div className="relative h-64">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-coconut-cream to-transparent" />
        </div>

        {/* Content */}
        <div className="px-8 pb-8 -mt-6 relative">
          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.map((tag) => (
              <span key={tag} className="text-[11px] text-forest-green bg-forest-green/10 px-3 py-1 rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-forest-dark font-bold leading-tight mb-4">
            {product.name}
          </h2>
          <div className="w-8 h-0.5 bg-kerala-gold mb-5" />
          <p className="text-forest-dark/65 text-base leading-relaxed mb-6">{product.desc}</p>

          <div className="bg-forest-dark/4 rounded-2xl p-5 mb-6">
            <p className="text-forest-dark/50 text-sm font-medium mb-2">Product Specifications</p>
            <p className="text-forest-dark/40 text-sm">Custom sizes, colours, and specifications available. Contact us for a detailed product datasheet and samples.</p>
          </div>

          <Link
            href="/contact"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-3 bg-forest-dark text-coconut-cream px-8 py-4 rounded-full font-semibold text-sm tracking-[0.06em] hover:bg-forest-green transition-colors"
          >
            <Mail size={16} />
            Send Enquiry for This Product
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
