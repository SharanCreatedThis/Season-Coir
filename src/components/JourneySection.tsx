"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

// ─── Data ─────────────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: "01",
    title: "De-husking",
    sub: "The Shell Breaks",
    desc: "The outer shell of the coconut is split and removed by hand, separating the precious fibrous husk from the inner nut — a skill passed down through generations.",
    image: "/images/placeholders/img_process_dehusking.png",
    accent: "Husk extraction",
  },
  {
    num: "02",
    title: "Retting",
    sub: "Water & Time",
    desc: "Husks are submerged in Kerala's natural brackish backwaters for months. The slow soak softens fibres and washes away pith — unhurried, as tradition demands.",
    image: "/images/placeholders/img_process_retting.png",
    accent: "Backwater soak",
  },
  {
    num: "03",
    title: "Defibering",
    sub: "Drawing the Fibre",
    desc: "Softened husks are combed and beaten to draw out long, lustrous coir bristles. Each stroke reveals the golden fibre that gives our mats their legendary durability.",
    image: "/images/placeholders/img_process_defibering.png",
    accent: "Fibre extraction",
  },
  {
    num: "04",
    title: "Separation",
    sub: "Grade & Select",
    desc: "Fibres are graded by length and texture — fine white coir for premium mats, robust brown for heavy-duty applications. Only the finest make the cut.",
    image: "/images/placeholders/img_process_separation.png",
    accent: "Quality grading",
  },
  {
    num: "05",
    title: "Weaving",
    sub: "Craft & Design",
    desc: "Master weavers spin fibre into yarn and weave it into distinctive patterns. Custom backings and finishes are applied — art made functional, beauty made durable.",
    image: "/images/placeholders/img_process_weaving.png",
    accent: "Master craft",
  },
];

// ─── Char-by-char title reveal ────────────────────────────────────────────────
function SplitTitle({ text }: { text: string }) {
  return (
    <span className="inline-block">
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.028, ease: [0.16, 1, 0.3, 1] }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

// ─── Self-drawing horizontal rule ─────────────────────────────────────────────
function DrawRule() {
  return (
    <motion.div
      className="h-px bg-kerala-gold/50 origin-left mt-8 mb-10"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [prevActive, setPrevActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring for progress rail
  const springProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // Drive active step from scroll
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(Math.floor(v * STEPS.length), STEPS.length - 1);
      setActive((prev) => {
        if (prev !== idx) setPrevActive(prev);
        return idx;
      });
    });
  }, [scrollYProgress]);

  // Progress bar width as % string
  const progressWidth = useTransform(springProgress, [0, 1], ["0%", "100%"]);

  // Vertical glow dot — travels top→bottom as section scrolls
  // "top" goes from 5% to 95% so it never clips outside the line
  const glowDotTop = useTransform(springProgress, [0, 1], ["5%", "95%"]);

  // Filled portion of the vertical line — grows downward with scroll
  const lineFillHeight = useTransform(springProgress, [0, 1], ["0%", "100%"]);

  // Image scale — subtle zoom on active step
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.12]);

  return (
    <section ref={containerRef} className="relative bg-forest-dark" style={{ height: `${STEPS.length * 100}vh` }}>

      {/* ── Sticky viewport ─────────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">

        {/* ── Top progress rail ─────────────────────────────────────────── */}
        <div className="relative w-full h-[2px] bg-white/5 shrink-0 z-20">
          <motion.div
            className="absolute left-0 top-0 h-full bg-kerala-gold origin-left"
            style={{ width: progressWidth }}
          />
          {/* Glowing dot travelling along rail */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-kerala-gold"
            style={{ left: progressWidth, boxShadow: "0 0 10px 3px rgba(212,175,55,0.6)" }}
          />
          {/* Step markers */}
          {STEPS.map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-colors duration-500"
              style={{ left: `${(i / (STEPS.length - 1)) * 100}%`, background: i <= active ? "#D4AF37" : "rgba(255,255,255,0.2)" }}
            />
          ))}
        </div>

        {/* ── Main content area ─────────────────────────────────────────── */}
        <div className="flex flex-1 min-h-0">

          {/* ── LEFT: Image panel ─────────────────────────────────── */}
          <div className="relative w-[52%] h-full overflow-hidden">
            <AnimatePresence mode="sync">
              {STEPS.map((step, i) => (
                active === i && (
                  <motion.div
                    key={i}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{ scale: imgScale }}
                    >
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        sizes="52vw"
                        className="object-cover"
                        priority={i === 0}
                      />
                    </motion.div>
                    {/* Left panel cinematic overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/30 via-transparent to-forest-dark/60" />
                    <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/50 via-transparent to-forest-dark/40" />
                  </motion.div>
                )
              ))}
            </AnimatePresence>

            {/* Section label — top-left overlay */}
            <div className="absolute top-10 left-10 z-10 flex items-center gap-3">
              <div className="w-4 h-px bg-kerala-gold/60" />
              <span className="text-kerala-gold/60 text-[9px] font-bold tracking-[0.5em] uppercase">
                Manufacturing Process
              </span>
            </div>

            {/* "The Journey" wordmark — bottom-left, always visible */}
            <div className="absolute bottom-10 left-10 z-10">
              <motion.h2
                className="font-serif text-coconut-cream font-bold leading-[0.9]"
                style={{ fontSize: "clamp(2.8rem, 4.5vw, 5rem)", textShadow: "0 2px 24px rgba(15,38,28,0.8)" }}
              >
                The<br />Journey
              </motion.h2>
            </div>
          </div>

          {/* ── DIVIDER: scroll-tracked glowing vertical line ─────── */}
          <div className="relative w-[2px] shrink-0 self-stretch overflow-visible" style={{ zIndex: 20 }}>

            {/* Track — full height, dim base */}
            <div className="absolute inset-0 w-full" style={{ background: "rgba(212,175,55,0.08)" }} />

            {/* Filled portion — grows from top as user scrolls */}
            <motion.div
              className="absolute top-0 left-0 w-full origin-top"
              style={{
                height: lineFillHeight,
                background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.25) 20%, rgba(212,175,55,0.55) 80%, rgba(212,175,55,0.15))",
              }}
            />

            {/* Glowing dot — travels top→bottom with scroll */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top: glowDotTop }}
            >
              {/* Outer halo — large soft glow */}
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{
                  width: 40,
                  height: 40,
                  background: "radial-gradient(circle, rgba(212,175,55,0.35) 0%, transparent 70%)",
                  filter: "blur(4px)",
                }}
              />
              {/* Mid glow ring */}
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{
                  width: 18,
                  height: 18,
                  background: "radial-gradient(circle, rgba(212,175,55,0.6) 0%, transparent 70%)",
                  filter: "blur(2px)",
                }}
              />
              {/* Core dot */}
              <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ width: 6, height: 6, background: "#D4AF37" }}
                animate={{ boxShadow: ["0 0 6px 2px rgba(212,175,55,0.8)", "0 0 14px 5px rgba(212,175,55,0.4)", "0 0 6px 2px rgba(212,175,55,0.8)"] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
            </motion.div>
          </div>

          {/* ── RIGHT: Text content panel ─────────────────────────── */}
          <div className="flex-1 h-full bg-forest-dark flex flex-col justify-center px-14 lg:px-20 relative overflow-hidden">

            {/* Giant watermark step number */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`wm-${active}`}
                className="absolute right-8 bottom-6 font-serif font-bold text-white/[0.04] select-none pointer-events-none leading-none"
                style={{ fontSize: "clamp(10rem, 18vw, 18rem)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {STEPS[active].num}
              </motion.div>
            </AnimatePresence>

            {/* Step counter — e.g. 02 / 05 */}
            <div className="flex items-center gap-3 mb-10">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`num-${active}`}
                  className="font-serif text-kerala-gold font-bold"
                  style={{ fontSize: "2.5rem", lineHeight: 1 }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {STEPS[active].num}
                </motion.span>
              </AnimatePresence>
              <span className="text-white/15 font-light text-sm tracking-widest">/ 05</span>
              <div className="flex-1 h-px bg-kerala-gold/10 ml-2" />
              {/* Accent label */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={`acc-${active}`}
                  className="text-kerala-gold/45 text-[9px] font-bold tracking-[0.4em] uppercase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {STEPS[active].accent}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Sub-label */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${active}`}
                className="text-kerala-gold/60 text-[10px] font-bold tracking-[0.45em] uppercase mb-4"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {STEPS[active].sub}
              </motion.p>
            </AnimatePresence>

            {/* Main title — character reveal */}
            <div className="pb-[0.3em] mb-2">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={`title-${active}`}
                  className="font-serif text-coconut-cream font-bold"
                  style={{ fontSize: "clamp(2.2rem, 3.5vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
                >
                  <SplitTitle text={STEPS[active].title} />
                </motion.h3>
              </AnimatePresence>
            </div>

            {/* Self-drawing rule */}
            <AnimatePresence mode="wait">
              <motion.div key={`rule-${active}`}>
                <DrawRule />
              </motion.div>
            </AnimatePresence>

            {/* Description text */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${active}`}
                className="text-coconut-cream/55 font-light leading-[1.85]"
                style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)", maxWidth: 420 }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {STEPS[active].desc}
              </motion.p>
            </AnimatePresence>

            {/* Next step hint — bottom */}
            <div className="mt-14">
              <AnimatePresence mode="wait">
                {active < STEPS.length - 1 && (
                  <motion.div
                    key={`next-${active}`}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <div className="w-3 h-3 rounded-full border border-kerala-gold/30 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-kerala-gold/50" />
                    </div>
                    <span className="text-coconut-cream/25 text-[9px] tracking-[0.4em] uppercase font-medium">
                      Next · {STEPS[active + 1].title}
                    </span>
                  </motion.div>
                )}
                {active === STEPS.length - 1 && (
                  <motion.div
                    key="complete"
                    className="flex items-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <div className="w-3 h-3 rounded-full border border-kerala-gold/60 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-kerala-gold" />
                    </div>
                    <span className="text-kerala-gold/50 text-[9px] tracking-[0.4em] uppercase font-medium">
                      Process Complete
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Step dots — bottom right */}
            <div className="absolute bottom-10 right-14 flex flex-col gap-2.5">
              {STEPS.map((_, i) => (
                <motion.div
                  key={i}
                  className="rounded-full"
                  animate={{
                    width: i === active ? 16 : 4,
                    height: 4,
                    background: i === active ? "#D4AF37" : "rgba(255,255,255,0.15)",
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
