"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const milestones = [
  {
    year: "1859",
    title: "The First Coir Factory",
    desc: "The first coir factory in India was established in Alleppey by James Darragh, igniting a century-long legacy of natural fibre craftsmanship along Kerala's backwaters.",
    accent: "Historical Roots",
  },
  {
    year: "1980",
    title: "Season Coir Exports Founded",
    desc: "Season Coir Exports was established in Alleppey (Alappuzha), Kerala. Built on generations of coir expertise, the company set out to bring authentic Kerala craftsmanship to the world.",
    accent: "Our Beginning",
  },
  {
    year: "1985",
    title: "First International Export",
    desc: "Season Coir completed its first international export shipment, marking the start of a global journey. Kerala's finest natural coir began reaching homes and businesses beyond India's borders.",
    accent: "Going Global",
  },
  {
    year: "1990",
    title: "Rubber-Backed Coir Mats",
    desc: "Expanded the product line to include rubber-backed coir mats — combining the natural beauty of coir with the practical durability of vulcanised rubber for commercial use.",
    accent: "Product Innovation",
  },
  {
    year: "1995",
    title: "PVC / Vinyl Backed Mats",
    desc: "Introduced PVC and vinyl backed coir tufted mats, opening new markets in retail and hospitality sectors globally. These products became one of our most exported lines.",
    accent: "New Markets",
  },
  {
    year: "2000",
    title: "European Partnerships",
    desc: "Established strong distribution partnerships with leading importers across Europe — Germany, Poland, and beyond. Season Coir became a trusted name in the European natural mat market.",
    accent: "European Reach",
  },
  {
    year: "2007",
    title: "GI Tag for Alleppey Coir",
    desc: "'Alleppey Coir' received the prestigious Geographical Indication (GI) tag — a government-certified mark guaranteeing the authentic origin and quality of Kerala-made coir products.",
    accent: "Heritage Certified",
  },
  {
    year: "2010",
    title: "Factory Modernisation",
    desc: "Invested in modernising the factory with advanced manufacturing equipment, improving production capacity and consistency while preserving the traditional techniques that define Season Coir quality.",
    accent: "Infrastructure Upgrade",
  },
  {
    year: "2015",
    title: "UAE, Poland & Germany",
    desc: "Expanded active export operations to UAE, Poland, and Germany. Season Coir's global footprint grew significantly, with products reaching luxury resorts, hotels, and homes across these markets.",
    accent: "Global Expansion",
  },
  {
    year: "2020",
    title: "40 Years of Excellence",
    desc: "Season Coir celebrated 40 years of operation with 3,381+ export shipments recorded — a testament to decades of consistent quality, trust, and dedication to the craft.",
    accent: "Four Decades",
  },
  {
    year: "2024",
    title: "Digital Transformation",
    desc: "Launched a new premium digital presence to better serve our global network of buyers, importers, and partners. Bringing Kerala's craftsmanship to the digital age with the same care we put into our products.",
    accent: "Digital Era",
  },
  {
    year: "2026",
    title: "Innovation & Global Expansion",
    desc: "Season Coir continues to innovate — expanding product lines, building new international relationships, and leading the natural fibre industry into its next chapter.",
    accent: "The Future",
  },
];

export default function MilestonesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="bg-coconut-cream overflow-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative flex items-center justify-center min-h-[80vh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="/images/placeholders/hero_kerala_grove.png"
            alt="Season Coir heritage"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/75 via-forest-dark/55 to-coconut-cream" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-kerala-gold text-[11px] font-semibold tracking-[0.35em] uppercase mb-6"
          >
            1859 — Present
          </motion.p>
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              className="font-serif text-5xl md:text-7xl text-white font-bold leading-[0.95] tracking-tight"
            >
              Our Journey
              <br />
              <span className="text-kerala-gold">Through Time</span>
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed"
          >
            From the first coir factory in 1859 to a global export brand today — every milestone is a chapter in Kerala&apos;s natural fibre story.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-28 relative">
        {/* Vertical line */}
        <TimelineLine count={milestones.length} />

        <div className="space-y-0">
          {milestones.map((m, i) => (
            <MilestoneCard key={m.year} milestone={m} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}

function TimelineLine({ count: _count }: { count: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 20%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px pointer-events-none hidden md:block" aria-hidden>
      <div className="absolute inset-0 bg-forest-green/10" />
      <motion.div style={{ scaleY, transformOrigin: "top" }} className="absolute inset-0 bg-kerala-gold" />
    </div>
  );
}

function MilestoneCard({ milestone, index }: { milestone: (typeof milestones)[0]; index: number }) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-start gap-0 md:gap-8 mb-16 md:mb-20 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-col`}
    >
      {/* Card */}
      <div className={`flex-1 ${isLeft ? "md:text-right md:pr-12" : "md:text-left md:pl-12"} pl-14 md:pl-0`}>
        <span className="inline-block text-kerala-gold text-[10px] font-semibold tracking-[0.3em] uppercase mb-2 bg-kerala-gold/10 px-3 py-1 rounded-full">
          {milestone.accent}
        </span>
        <h3 className="font-serif text-xl md:text-2xl text-forest-dark font-bold mt-2 mb-3">
          {milestone.title}
        </h3>
        <p className="text-forest-dark/60 text-sm leading-relaxed max-w-sm md:ml-auto">
          {milestone.desc}
        </p>
      </div>

      {/* Centre dot + year */}
      <div className="relative flex flex-col items-center shrink-0 z-10 -ml-10 md:ml-0">
        <div className="w-12 h-12 rounded-full bg-forest-dark border-4 border-kerala-gold flex items-center justify-center shadow-lg">
          <span className="text-kerala-gold text-[10px] font-bold">{milestone.year.slice(-2)}</span>
        </div>
        <span className="text-forest-dark font-serif font-bold text-sm mt-1 hidden md:block">{milestone.year}</span>
      </div>

      {/* Empty spacer for alternating layout */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}
