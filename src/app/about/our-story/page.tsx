"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.12, ease: EASE },
  }),
};

const sections = [
  {
    label: "Where It All Began",
    year: "1859",
    side: "left",
    image: "/images/placeholders/img_process_retting.png",
    body: "The coir manufacturing industry in Alleppey traces its factory-based roots back over a hundred years, producing matting, floor covers, and coir mats. The first coir factory in India was established in Alleppey in 1859 by James Darragh — igniting a legacy of natural fibre craftsmanship that Kerala would carry for generations. The coastal backwaters became the lifeblood of this industry, providing the perfect conditions for retting coconut husks into the world's finest coir.",
  },
  {
    label: "The Birth of Season Coir",
    year: "1980",
    side: "right",
    image: "/images/placeholders/img_whyus_quality.png",
    body: "Season Coir Exports was established in 1980 in Alleppey (Alappuzha), Kerala — 'the land of coconut trees.' Built on decades of regional expertise and a passion for natural fibres, the brand quickly gained recognition as a leading manufacturer and exporter of coir products from India. What began as a single facility has grown into a trusted international name, sending Kerala's finest craftsmanship to markets across three continents.",
  },
  {
    label: "What We Do",
    year: "Today",
    side: "left",
    image: "/images/placeholders/img_process_weaving.png",
    body: "The company holds a pioneering position in the coir industry with deep expertise across the full product spectrum — coco geotextiles, coir mats, coir yarn, coir pith, curled coir rope, coir doormats, vinyl-backed coir, coir combined with rubber, and a range of rubber products. Each category represents decades of refinement, technical mastery, and intimate knowledge of how natural fibre performs across climates, applications, and tastes worldwide.",
  },
  {
    label: "Our Philosophy",
    year: "Always",
    side: "right",
    image: "/images/placeholders/img_whyus_biodegradable.png",
    body: "At Season Coir, we believe in using natural things in everyday life to develop a deeper bond with the earth. Every product we make is 100% organic — drawn from coconut husks that would otherwise go to waste. Our focus remains unwavering: uncompromising quality, continuous innovation, and partnerships built on trust. When you choose Season Coir, you choose a material that gives back to the land it came from.",
  },
];

export default function OurStoryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <main className="bg-coconut-cream overflow-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative flex items-center justify-center min-h-[88vh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="/images/placeholders/hero_kerala_grove.png"
            alt="Kerala coconut grove backwaters"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/70 via-forest-dark/50 to-coconut-cream" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-kerala-gold text-[11px] font-semibold tracking-[0.35em] uppercase mb-6"
          >
            Est. 1980 · Alappuzha, Kerala
          </motion.p>
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-[0.95] tracking-tight"
            >
              Our Story
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Four decades of turning coconut husks into the world&apos;s most trusted natural fibre products.
          </motion.p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-[10px] tracking-[0.25em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-kerala-gold/70 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── Content Sections ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-24 space-y-40">
        {sections.map((sec, i) => (
          <StorySection key={sec.label} sec={sec} index={i} />
        ))}
      </div>

      {/* ── Closing Quote ───────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="bg-forest-dark py-28 px-6 text-center"
      >
        <motion.div variants={fadeUp} custom={0} className="max-w-3xl mx-auto">
          <div className="w-12 h-px bg-kerala-gold mx-auto mb-10" />
          <p className="font-serif text-3xl md:text-4xl text-coconut-cream leading-relaxed font-light italic">
            &ldquo;Every mat that leaves our factory carries with it the spirit of Kerala — its rivers, its palms, its people.&rdquo;
          </p>
          <p className="text-kerala-gold/70 text-sm tracking-[0.2em] uppercase mt-8">
            Managing Director, Season Coir Exports
          </p>
        </motion.div>
      </motion.section>
    </main>
  );
}

function StorySection({ sec, index }: { sec: (typeof sections)[0]; index: number }) {
  const isRight = sec.side === "right";
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ${isRight ? "lg:flex-row-reverse" : ""}`}
    >
      {/* Text */}
      <div className={isRight ? "lg:order-2" : ""}>
        <motion.span
          variants={fadeUp}
          custom={0}
          className="inline-block text-kerala-gold font-serif text-6xl font-bold opacity-20 leading-none mb-2"
        >
          {sec.year}
        </motion.span>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="font-serif text-3xl md:text-4xl text-forest-dark font-bold leading-tight mb-6"
        >
          {sec.label}
        </motion.h2>
        <motion.div variants={fadeUp} custom={2} className="w-10 h-[2px] bg-kerala-gold mb-8" />
        <motion.p variants={fadeUp} custom={3} className="text-forest-dark/65 text-lg leading-relaxed">
          {sec.body}
        </motion.p>
      </div>

      {/* Image */}
      <motion.div
        variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1, transition: { duration: 0.9, delay: index * 0.05, ease: EASE } } }}
        className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ${isRight ? "lg:order-1" : ""}`}
      >
        <Image src={sec.image} alt={sec.label} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/30 to-transparent" />
        {/* Year badge */}
        <div className="absolute bottom-6 left-6 bg-forest-dark/80 backdrop-blur-sm text-kerala-gold font-serif text-2xl font-bold px-5 py-2 rounded-xl">
          {sec.year}
        </div>
      </motion.div>
    </motion.div>
  );
}
