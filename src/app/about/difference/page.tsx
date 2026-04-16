"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const usps = [
  {
    number: "01",
    icon: "🌿",
    title: "45+ Years of Heritage",
    subtitle: "Operating Since 1980",
    body: "Season Coir was established in 1980 — making us one of the oldest and most experienced coir exporters in Alleppey. Our decades of operational history mean we have weathered market shifts, adapted to evolving buyer needs, and built processes that are time-tested to a degree no newer competitor can claim. When you work with us, you inherit that institutional knowledge.",
    stat: "45+",
    statLabel: "Years of Operation",
    image: "/images/placeholders/hero_kerala_grove.png",
  },
  {
    number: "02",
    icon: "🏆",
    title: "GI-Tagged Alleppey Coir",
    subtitle: "Government-Certified Authenticity",
    body: "'Alleppey Coir' received its Geographical Indication (GI) tag — a prestigious government certification guaranteeing that our products are genuinely made from the specific coconut husks retted in Kerala's backwaters. This tag protects both the heritage of the craft and the interests of buyers who need certified authentic Kerala coir. It is a distinction no product made elsewhere can imitate.",
    stat: "GI",
    statLabel: "Certified Alleppey Coir",
    image: "/images/placeholders/img_whyus_quality.png",
  },
  {
    number: "03",
    icon: "♻️",
    title: "100% Organic & Biodegradable",
    subtitle: "No Synthetics in Our Coir",
    body: "Every strand of coir we produce is drawn entirely from coconut husks — a renewable by-product that would otherwise be discarded. Our coir products contain zero synthetic materials and are fully biodegradable at end of life. In an era of greenwashing, we offer genuine sustainability: certified organic fibre, traditional retting in natural waterways, and a zero-waste production cycle that turns every part of the husk into a usable product.",
    stat: "100%",
    statLabel: "Organic Coir Fibre",
    image: "/images/placeholders/img_whyus_biodegradable.png",
  },
  {
    number: "04",
    icon: "🤝",
    title: "Direct Factory-to-Buyer",
    subtitle: "No Middlemen. No Markups.",
    body: "We manufacture and export directly — there are no agents, trading houses, or brokers between our factory floor and your warehouse. This direct relationship gives buyers competitive pricing, faster communication, complete transparency on lead times and production status, and the ability to request custom specifications at the source. Our buyers know exactly who is making their product and can visit the facility at any time.",
    stat: "0",
    statLabel: "Middlemen in the Chain",
    image: "/images/placeholders/img_whyus_quality.png",
  },
  {
    number: "05",
    icon: "🔬",
    title: "Quality at Every Stage",
    subtitle: "Total Quality Management",
    body: "Quality at Season Coir is not a final inspection — it is embedded at every stage of production. Raw fibre is graded before spinning. Yarn tensile strength is tested before weaving. Weave density is monitored during production. Backing adhesion is tested before finishing. Every finished product is inspected before packaging. Our quality protocols have delivered a near-zero defect rate across thousands of export shipments over decades.",
    stat: "3381+",
    statLabel: "Shipments Completed",
    image: "/images/placeholders/img_whyus_biodegradable.png",
  },
  {
    number: "06",
    icon: "🌍",
    title: "Global Export Expertise",
    subtitle: "Trusted on 3 Continents",
    body: "With active export relationships in the UAE, Poland, Germany, the UK, and beyond, Season Coir has accumulated deep expertise in international trade — documentation, compliance, custom specifications, and the unique preferences of buyers in different markets. We understand what a European importer needs, what a Gulf resort expects, and what a UK retailer requires. That cross-market experience is built in to every shipment we send.",
    stat: "3",
    statLabel: "Continents Served",
    image: "/images/placeholders/img_whyus_quality.png",
  },
];

export default function DifferencePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="bg-coconut-cream overflow-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative flex items-center justify-center min-h-[75svh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="/images/placeholders/hero_kerala_grove.png" alt="What Sets Season Coir Apart" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/80 via-forest-dark/60 to-coconut-cream" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-kerala-gold text-[11px] font-semibold tracking-[0.35em] uppercase mb-6"
          >
            Our Competitive Advantage
          </motion.p>
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              className="font-serif text-5xl md:text-7xl text-white font-bold leading-[0.95] tracking-tight"
            >
              What Sets Us
              <br />
              <span className="text-kerala-gold">Apart</span>
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed"
          >
            Six reasons why the world&apos;s most discerning coir buyers choose Season Coir, year after year.
          </motion.p>
        </motion.div>
      </section>

      {/* ── USP Sections ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-24 space-y-36">
        {usps.map((usp, i) => (
          <UspSection key={usp.number} usp={usp} index={i} />
        ))}
      </div>

      {/* ── Stats Bar ────────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="bg-forest-dark py-20 px-6"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { stat: "45+", label: "Years of Heritage" },
              { stat: "3381+", label: "Export Shipments" },
              { stat: "3", label: "Continents Served" },
              { stat: "100%", label: "Organic Fibre" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <p className="font-serif text-5xl text-kerala-gold font-bold">{item.stat}</p>
                <p className="text-coconut-cream/50 text-sm mt-2 tracking-wide">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </main>
  );
}

function UspSection({ usp, index }: { usp: (typeof usps)[0]; index: number }) {
  const isEven = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 40%"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [40, 0]);

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
      {/* Image */}
      <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ${isEven ? "" : "lg:order-2"}`}>
        <motion.div style={{ y: imageY }} className="absolute inset-0">
          <Image src={usp.image} alt={usp.title} fill className="object-cover scale-110" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-forest-dark/40" />
        {/* Stat */}
        <div className="absolute bottom-6 left-6 bg-forest-dark/85 backdrop-blur-sm rounded-2xl p-4 text-center min-w-[100px]">
          <p className="font-serif text-3xl text-kerala-gold font-bold">{usp.stat}</p>
          <p className="text-coconut-cream/60 text-[11px] mt-1 leading-tight">{usp.statLabel}</p>
        </div>
        {/* Icon */}
        <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl">
          {usp.icon}
        </div>
      </div>

      {/* Text */}
      <motion.div style={{ opacity: textOpacity, y: textY }} className={isEven ? "" : "lg:order-1"}>
        <span className="text-kerala-gold text-[10px] font-semibold tracking-[0.35em] uppercase mb-3 inline-block">{usp.number} / 06</span>
        <p className="text-forest-dark/40 text-sm tracking-[0.2em] uppercase mb-1">{usp.subtitle}</p>
        <h2 className="font-serif text-3xl md:text-4xl text-forest-dark font-bold leading-tight mb-6">
          {usp.title}
        </h2>
        <div className="w-10 h-[2px] bg-kerala-gold mb-6" />
        <p className="text-forest-dark/65 text-lg leading-relaxed">{usp.body}</p>
      </motion.div>
    </div>
  );
}
