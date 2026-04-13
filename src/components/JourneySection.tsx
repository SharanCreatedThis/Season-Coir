/**
 * Scroll-pinned manufacturing process timeline with glowing vertical progress line.
 * Five-step journey from coconut harvesting to finished mat, with image and text panels.
 * Uses Framer Motion useScroll + useSpring for smooth scroll-linked animations.
 * Background storytelling gradient transitions from warm golden-green → deep forest → dark emerald.
 */
"use client";

import React, { useRef, useState } from "react";
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

// ─── Background gradient stages ───────────────────────────────────────────────
// Background color transition: warm gold-green at step 0 → dark emerald at step 4.
// Creates a visual narrative of "golden hour to nightfall" across the manufacturing journey.
// Each stage is a full CSS gradient string rendered as an absolutely-positioned layer.
// Stages crossfade via Framer Motion animate={{ opacity }} — 1.4s ease per transition.
const BG_STAGES = [
  // Step 01 — warm golden-green, Kerala golden hour
  "linear-gradient(160deg, #1a3320 0%, #22401a 35%, #1c3218 65%, #0f2214 100%)",
  // Step 02 — shifting toward deeper green, warm mist
  "linear-gradient(160deg, #152e1e 0%, #1a3820 40%, #163018 70%, #0d2010 100%)",
  // Step 03 — deep forest green, mid-section richness
  "linear-gradient(160deg, #0f2a1a 0%, #163222 40%, #102815 70%, #0a1c0e 100%)",
  // Step 04 — rich forest, darkening
  "linear-gradient(160deg, #0d2418 0%, #122a1c 40%, #0e2214 70%, #081810 100%)",
  // Step 05 — sophisticated dark emerald, luxury finish
  "linear-gradient(160deg, #091c14 0%, #0e2418 40%, #0a1c12 70%, #060e0a 100%)",
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
      className="h-px origin-left mt-8 mb-10"
      style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.6), rgba(212,175,55,0.15))" }}
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const springProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // Drive active step from scroll
  React.useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(Math.floor(v * STEPS.length), STEPS.length - 1);
      setActive(idx);
    });
  }, [scrollYProgress]);

  // Progress rail
  const progressWidth = useTransform(springProgress, [0, 1], ["0%", "100%"]);

  // Vertical glow dot
  const glowDotTop = useTransform(springProgress, [0, 1], ["5%", "95%"]);
  const lineFillHeight = useTransform(springProgress, [0, 1], ["0%", "100%"]);

  // Image subtle zoom
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.1]);

  // Warm overlay opacity — fades from rich at step 0 to gone at step 4
  // Gives the "golden hour → night" feel
  const warmOverlayOpacity = useTransform(springProgress, [0, 0.6], [0.18, 0]);

  // Mist texture layer — pulses gently, always subtle
  const mistY = useTransform(springProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${STEPS.length * 100}vh` }}
    >
      {/* ── Sticky viewport ─────────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">

        {/* ── Storytelling background — crossfades between 5 gradient stages ── */}
        <div className="absolute inset-0 z-0">
          {BG_STAGES.map((bg, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              style={{ background: bg }}
              animate={{ opacity: active === i ? 1 : 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}

          {/* Warm golden-hour overlay — fades as you scroll deeper */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: warmOverlayOpacity,
              background: "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(212,175,55,0.22) 0%, rgba(139,105,20,0.12) 45%, transparent 75%)",
            }}
          />

          {/* Coir-fiber mist texture — moves gently with scroll ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              y: mistY,
              opacity: 0.045,
              backgroundImage: [
                "repeating-linear-gradient(12deg, transparent, transparent 18px, rgba(212,175,55,0.9) 19px, transparent 20px)",
                "repeating-linear-gradient(-8deg, transparent, transparent 28px, rgba(212,175,55,0.5) 29px, transparent 30px)",
              ].join(", "),
              backgroundSize: "120px 120px, 180px 180px",
            }}
          />

          {/* Radial vignette — frames content, always present */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 45%, rgba(0,0,0,0.45) 100%)" }}
          />

          {/* Top edge fade */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 12%)" }}
          />
        </div>

        {/* ── Top progress rail ─────────────────────────────────────────── */}
        <div
          className="relative w-full h-[2px] shrink-0 z-20"
          style={{ background: "rgba(212,175,55,0.07)" }}
          role="progressbar"
          aria-label="Manufacturing process progress"
          aria-valuenow={active + 1}
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
        >
          <motion.div
            className="absolute left-0 top-0 h-full origin-left"
            style={{
              width: progressWidth,
              background: "linear-gradient(90deg, rgba(212,175,55,0.4), #D4AF37)",
            }}
          />
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[7px] h-[7px] rounded-full"
            style={{
              left: progressWidth,
              background: "#D4AF37",
              boxShadow: "0 0 12px 4px rgba(212,175,55,0.55)",
            }}
          />
          {STEPS.map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full transition-colors duration-700"
              style={{
                left: `${(i / (STEPS.length - 1)) * 100}%`,
                background: i <= active ? "#D4AF37" : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>

        {/* ── Main content area ─────────────────────────────────────────── */}
        <div className="flex flex-1 min-h-0 relative z-10">

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
                    transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        sizes="52vw"
                        className="object-cover"
                        priority={i === 0}
                      />
                    </motion.div>
                    {/* Left panel cinematic colour-grading overlays */}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,26,16,0.5) 0%, transparent 55%, rgba(10,26,16,0.65) 100%)" }} />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,26,16,0.45) 0%, transparent 30%, transparent 65%, rgba(10,26,16,0.55) 100%)" }} />
                    {/* Warm left-edge burn */}
                    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 40% 60% at 0% 50%, rgba(139,105,20,0.12) 0%, transparent 60%)" }} />
                  </motion.div>
                )
              ))}
            </AnimatePresence>

            {/* Section label */}
            <div className="absolute top-10 left-10 z-10 flex items-center gap-3">
              <div className="w-5 h-px" style={{ background: "rgba(212,175,55,0.55)" }} />
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.5em", color: "rgba(212,175,55,0.55)" }} className="font-bold uppercase">
                Manufacturing Process
              </span>
            </div>

            {/* "The Journey" wordmark */}
            <div className="absolute bottom-10 left-10 z-10">
              <h2
                className="font-serif font-bold leading-[0.88]"
                style={{
                  fontSize: "clamp(2.8rem, 4.5vw, 5rem)",
                  color: "rgba(245,240,232,0.92)",
                  textShadow: "0 4px 32px rgba(0,0,0,0.7)",
                  letterSpacing: "-0.02em",
                }}
              >
                The<br />
                <em className="not-italic" style={{ color: "#D4AF37" }}>Journey</em>
              </h2>
              {/* Tagline under wordmark */}
              <p style={{ fontSize: "0.68rem", letterSpacing: "0.22em", color: "rgba(245,240,232,0.28)", marginTop: "0.75rem" }} className="uppercase font-medium">
                From husk to mat
              </p>
            </div>
          </div>

          {/* ── DIVIDER: scroll-tracked glowing vertical line ─────── */}
          <div className="relative w-[2px] shrink-0 self-stretch overflow-visible" style={{ zIndex: 20 }}>
            <div className="absolute inset-0 w-full" style={{ background: "rgba(212,175,55,0.06)" }} />
            <motion.div
              className="absolute top-0 left-0 w-full origin-top"
              style={{
                height: lineFillHeight,
                background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.2) 20%, rgba(212,175,55,0.5) 80%, rgba(212,175,55,0.12))",
              }}
            />
            <motion.div className="absolute left-1/2 -translate-x-1/2" style={{ top: glowDotTop }}>
              <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" style={{ width: 44, height: 44, background: "radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)", filter: "blur(5px)" }} />
              <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" style={{ width: 18, height: 18, background: "radial-gradient(circle, rgba(212,175,55,0.55) 0%, transparent 70%)", filter: "blur(2px)" }} />
              <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ width: 6, height: 6, background: "#D4AF37" }}
                animate={{ boxShadow: ["0 0 6px 2px rgba(212,175,55,0.8)", "0 0 16px 6px rgba(212,175,55,0.35)", "0 0 6px 2px rgba(212,175,55,0.8)"] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              />
            </motion.div>
          </div>

          {/* ── RIGHT: Text content panel ─────────────────────────── */}
          <div className="flex-1 h-full flex flex-col justify-center px-14 lg:px-20 relative overflow-hidden">

            {/* Giant watermark step number */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`wm-${active}`}
                className="absolute right-6 bottom-4 font-serif font-bold select-none pointer-events-none leading-none"
                style={{ fontSize: "clamp(9rem, 17vw, 17rem)", color: "rgba(212,175,55,0.04)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {STEPS[active].num}
              </motion.div>
            </AnimatePresence>

            {/* Subtle top-right radial bloom — changes warmth per step */}
            <motion.div
              className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            />

            {/* Step counter */}
            <div className="flex items-center gap-3 mb-10">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`num-${active}`}
                  className="font-serif font-bold"
                  style={{ fontSize: "2.4rem", lineHeight: 1, color: "#D4AF37" }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {STEPS[active].num}
                </motion.span>
              </AnimatePresence>
              <span style={{ color: "rgba(255,255,255,0.12)", fontSize: "0.85rem", letterSpacing: "0.12em" }} className="font-light">/ 05</span>
              <div className="flex-1 h-px ml-2" style={{ background: "rgba(212,175,55,0.08)" }} />
              <AnimatePresence mode="wait">
                <motion.span
                  key={`acc-${active}`}
                  style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: "rgba(212,175,55,0.4)" }}
                  className="font-bold uppercase"
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
                style={{ fontSize: "0.65rem", letterSpacing: "0.45em", color: "rgba(212,175,55,0.55)" }}
                className="font-bold uppercase mb-5"
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
                  className="font-serif font-bold"
                  style={{
                    fontSize: "clamp(2.4rem, 3.8vw, 3.8rem)",
                    lineHeight: 1.02,
                    letterSpacing: "-0.025em",
                    color: "rgba(245,240,232,0.95)",
                    textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                  }}
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

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${active}`}
                style={{
                  fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)",
                  lineHeight: 1.9,
                  maxWidth: 420,
                  color: "rgba(245,240,232,0.48)",
                  letterSpacing: "0.01em",
                }}
                className="font-light"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {STEPS[active].desc}
              </motion.p>
            </AnimatePresence>

            {/* Next step hint */}
            <div className="mt-16">
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
                    <div className="w-3 h-3 rounded-full flex items-center justify-center" style={{ border: "1px solid rgba(212,175,55,0.25)" }}>
                      <div className="w-1 h-1 rounded-full" style={{ background: "rgba(212,175,55,0.45)" }} />
                    </div>
                    <span style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: "rgba(245,240,232,0.22)" }} className="uppercase font-medium">
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
                    <div className="w-3 h-3 rounded-full flex items-center justify-center" style={{ border: "1px solid rgba(212,175,55,0.55)" }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#D4AF37" }} />
                    </div>
                    <span style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: "rgba(212,175,55,0.45)" }} className="uppercase font-medium">
                      Process Complete
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Step dots */}
            <div className="absolute bottom-10 right-14 flex flex-col gap-2.5">
              {STEPS.map((_, i) => (
                <motion.div
                  key={i}
                  className="rounded-full"
                  animate={{
                    width: i === active ? 18 : 4,
                    height: 4,
                    background: i === active ? "#D4AF37" : "rgba(255,255,255,0.1)",
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
