/**
 * Season Coir — Homepage
 * Premium eco-luxury marketing website with scrollytelling animations,
 * 3D interactive coconut scene, and product catalogue.
 * @see https://seasoncoir.vercel.app
 */
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Quote, MapPin, Mail, Phone, Send, ChevronRight } from "lucide-react";
import {
  whySeasonCoirFeatures,
  sustainabilityStats,
  testimonials,
  products,
  exportMarkets,
  CATEGORIES,
} from "@/data";
import type { Category } from "@/data";
import JourneySection from "@/components/JourneySection";
import { CapsuleSlider } from "@/components/CapsuleSlider";

// ─── Count-up ─────────────────────────────────────────────────────────────────
function CountUp({ target, duration = 1800 }: { target: string; duration?: number }) {
  const [display, setDisplay] = useState(target); // show final value by default (SSR / no-JS safe)
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ""));
    const sfx = target.replace(/[0-9.]/g, "");
    if (isNaN(numeric)) return; // display already initialized to target
    const startTime = Date.now();
    let raf: number;
    const tick = () => {
      const p = Math.min((Date.now() - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(`${Math.round(eased * numeric)}${sfx}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return <span ref={ref}>{display}</span>;
}

// ─── Trust-bar items ──────────────────────────────────────────────────────────
const TRUST_ITEMS = [
  "Est. 1980 · Alleppey, Kerala",
  "GI-Tagged Coir",
  "3381+ Shipments",
  "UAE · Germany · Poland · UK · USA",
  "100% Biodegradable",
  "B2B Manufacturer & Exporter",
  "Est. 1980 · Alleppey, Kerala",
  "GI-Tagged Coir",
  "3381+ Shipments",
  "UAE · Germany · Poland · UK · USA",
  "100% Biodegradable",
  "B2B Manufacturer & Exporter",
];

// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  // Parallax layers — each moves at a different rate
  const bgY = useTransform(scrollY, [0, 900], [0, 260]);
  // Content scroll-linked: fades + lifts as user scrolls
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, -60]);

  const [activeCategory, setActiveCategory] = useState<Category>("PVC / Vinyl Coir");
  const [tIdx, setTIdx] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTIdx((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const filtered = products.filter((p) => p.category === activeCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative w-full h-screen min-h-[720px] flex items-end overflow-hidden"
      >
        {/* ── Layer 0: Background image — slowest parallax ── */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 z-0 h-[130%] -top-[15%]"
        >
          <Image
            src="/images/placeholders/hero_kerala_grove.png"
            alt="Kerala Coconut Grove"
            fill priority sizes="100vw"
            className="object-cover object-[50%_55%]"
          />
        </motion.div>

        {/* ── Layer 1: Cinematic grading — golden hour warmth ── */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          {/* Warm golden-hour overlay on the right */}
          <div style={{ background: "radial-gradient(ellipse 55% 80% at 78% 30%, rgba(212,175,55,0.13) 0%, transparent 70%)" }} className="absolute inset-0" />
          {/* Deep left shadow — where text lives */}
          <div style={{ background: "linear-gradient(105deg, rgba(15,38,28,0.92) 0%, rgba(15,38,28,0.72) 38%, rgba(15,38,28,0.22) 65%, transparent 100%)" }} className="absolute inset-0" />
          {/* Top scrim for navbar legibility */}
          <div style={{ background: "linear-gradient(to bottom, rgba(15,38,28,0.55) 0%, transparent 22%)" }} className="absolute inset-0" />
          {/* Bottom fade — blends to trust bar */}
          <div style={{ background: "linear-gradient(to bottom, transparent 55%, rgba(15,38,28,0.8) 80%, rgba(15,38,28,0.98) 100%)" }} className="absolute inset-0" />
        </div>

        {/* ── Layer 2: Floating coir-fiber particles — scroll-linked opacity ── */}
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
          {[
            { left: "12%", top: "22%", w: 48, h: 2, rot: -28, delay: 0.0, dur: 8.0 },
            { left: "8%",  top: "58%", w: 36, h: 1.5, rot: 15, delay: 1.4, dur: 9.5 },
            { left: "22%", top: "76%", w: 56, h: 2, rot: -8, delay: 0.7, dur: 7.2 },
            { left: "72%", top: "18%", w: 40, h: 1.5, rot: 22, delay: 2.1, dur: 8.8 },
            { left: "82%", top: "44%", w: 30, h: 1.5, rot: -18, delay: 0.4, dur: 10.0 },
            { left: "65%", top: "72%", w: 52, h: 2, rot: 5, delay: 1.8, dur: 7.6 },
            { left: "45%", top: "12%", w: 34, h: 1.5, rot: -35, delay: 3.0, dur: 9.0 },
            { left: "35%", top: "85%", w: 44, h: 2, rot: 12, delay: 1.1, dur: 8.4 },
          ].map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: p.left, top: p.top,
                width: p.w, height: p.h,
                rotate: p.rot,
                background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.28), transparent)",
              }}
              animate={{ y: [0, -22, 0], opacity: [0, 0.6, 0], x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: p.dur, delay: p.delay, ease: "easeInOut" }}
            />
          ))}
        </motion.div>

        {/* ── Layer 3: Hero text content — left-aligned editorial ── */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-14 pb-24 md:pb-28"
        >
          {/* Eyebrow */}
          <div className="hero-instant hero-instant-1 mb-8 flex items-center gap-4">
            <div className="h-px w-8" style={{ background: "rgba(212,175,55,0.7)" }} />
            <span
              style={{ fontSize: "0.68rem", letterSpacing: "0.42em", color: "rgba(212,175,55,0.85)" }}
              className="font-semibold uppercase"
            >
              Est. 1980 · Alleppey, Kerala
            </span>
          </div>

          {/* Headline — two lines, left-aligned, cinematic scale */}
          <h1
            className="font-serif font-bold text-white mb-7"
            style={{ lineHeight: 0.97 }}
          >
            {/* Line 1 */}
            <div className="pb-[0.28em]">
              <span
                className="hero-clip hero-clip-1 block"
                style={{
                  fontSize: "clamp(2.8rem, 8vw, 7rem)",
                  letterSpacing: "-0.03em",
                  textShadow: "0 4px 40px rgba(15,38,28,0.6)",
                }}
              >
                Naturally Strong.
              </span>
            </div>
            {/* Line 2 — gold italic */}
            <div className="pb-[0.28em]">
              <span
                className="hero-clip hero-clip-2 block"
                style={{
                  fontSize: "clamp(2.8rem, 8vw, 7rem)",
                  letterSpacing: "-0.03em",
                  fontStyle: "italic",
                  color: "#D4AF37",
                  textShadow: "0 4px 48px rgba(212,175,55,0.22)",
                }}
              >
                Sustainably Yours.
              </span>
            </div>
          </h1>

          {/* Subheading */}
          <p
            className="hero-instant hero-instant-3 mb-12 hidden md:block"
            style={{
              fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
              lineHeight: 1.75,
              color: "rgba(245,240,232,0.58)",
              maxWidth: "34em",
              letterSpacing: "0.015em",
              textShadow: "0 1px 12px rgba(15,38,28,0.8)",
            }}
          >
            Premium coir products from the coconut heartland of Kerala,<br className="hidden md:block" />
            crafted since 1980 and shipped to the world&apos;s most luxurious spaces.
          </p>

          {/* Buttons */}
          <div className="hero-instant hero-instant-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            {/* Primary — gold fill */}
            <motion.a
              href="#products"
              whileHover={{ scale: 1.035 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full"
              style={{
                background: "linear-gradient(135deg, #D4AF37 0%, #B8962E 100%)",
                padding: "15px 34px",
                boxShadow: "0 8px 32px rgba(212,175,55,0.32), inset 0 1px 0 rgba(255,255,255,0.18)",
              }}
            >
              {/* Shine sweep on hover */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)" }}
              />
              <span
                className="relative z-10 font-bold uppercase"
                style={{ fontSize: "0.72rem", letterSpacing: "0.22em", color: "#0F261C" }}
              >
                Explore Products
              </span>
              <ArrowRight
                size={13}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: "#0F261C" }}
              />
            </motion.a>

            {/* Secondary — glass outline */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="hidden sm:block"
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-3 rounded-full"
                style={{
                  padding: "14px 32px",
                  border: "1px solid rgba(212,175,55,0.35)",
                  color: "rgba(245,240,232,0.82)",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  background: "rgba(15,38,28,0.28)",
                  transition: "border-color 0.3s, color 0.3s, background 0.3s",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(212,175,55,0.7)";
                  el.style.color = "#D4AF37";
                  el.style.background = "rgba(212,175,55,0.08)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(212,175,55,0.35)";
                  el.style.color = "rgba(245,240,232,0.82)";
                  el.style.background = "rgba(15,38,28,0.28)";
                }}
              >
                Our Story
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Scroll cue — centred at bottom ── */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 hero-instant hero-instant-5"
        >
          <div
            className="w-[1px] h-12 overflow-hidden"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <motion.div
              animate={{ y: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="w-full h-1/2"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.7), transparent)" }}
            />
          </div>
          <span style={{ fontSize: 7.5, letterSpacing: "0.5em", color: "rgba(255,255,255,0.18)" }} className="uppercase font-medium mt-1">Scroll</span>
        </motion.div>

        {/* ── Corner metadata ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 1.2 }}
          className="hidden md:flex absolute bottom-9 left-8 md:left-14 z-10 items-center gap-1.5"
        >
          <MapPin size={9} style={{ color: "rgba(212,175,55,0.35)" }} />
          <span style={{ fontSize: 9, letterSpacing: "0.22em", color: "rgba(255,255,255,0.2)" }} className="uppercase font-medium">8.8932° N, 76.6141° E</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 1.2 }}
          className="hidden md:block absolute bottom-9 right-8 md:right-14 z-10"
        >
          <span style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(255,255,255,0.16)" }} className="uppercase font-medium">Est. MCMLXXX</span>
        </motion.div>
      </section>

      {/* ── 2. TRUST BAR ─────────────────────────────────────────────────────── */}
      <div className="bg-kerala-gold py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {TRUST_ITEMS.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 mx-8 text-[11px] font-bold tracking-[0.3em] uppercase text-forest-dark/75">
              {item}
              <span className="w-1 h-1 rounded-full bg-forest-dark/30" />
            </span>
          ))}
        </div>
      </div>

      {/* ── 3. WHY SEASON COIR ───────────────────────────────────────────────── */}
      <section className="relative bg-coconut-cream overflow-hidden">
        {/* Subtle background texture stripes */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 119px, rgba(15,38,28,0.018) 120px)",
        }} />
        {/* Top rule */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-kerala-gold/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-28 pb-20 md:pb-32 relative z-10">

          {/* ── Section header ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="mb-24"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-10 bg-kerala-gold/60" />
              <span style={{ fontSize: 10, letterSpacing: "0.45em", color: "var(--color-kerala-gold)" }} className="uppercase font-semibold">
                The Season Coir Difference
              </span>
            </div>

            {/* Main heading */}
            <div className="pb-[0.3em]">
              <h2
                className="font-serif font-bold text-forest-dark leading-[0.92]"
                style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", letterSpacing: "-0.025em" }}
              >
                Sustainable
                <em className="not-italic text-kerala-gold"> Luxury</em>
              </h2>
            </div>

            {/* Subheading */}
            <p
              className="mt-7 text-forest-dark/50 font-sans leading-relaxed max-w-xl"
              style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)", letterSpacing: "0.01em" }}
            >
              Six commitments that define every mat we weave — from the coastal lagoons
              of Alleppey to showrooms across three continents.
            </p>
          </motion.div>

          {/* ── Feature cards ── */}
          {/* Mobile 3D Capsule Slider */}
          <div className="block md:hidden mt-8 -mx-6">
            <CapsuleSlider 
              items={whySeasonCoirFeatures}
              height={420}
              cardWidth="280px"
              renderItem={(feature, isActive, index) => (
                <div className="w-full h-full relative bg-coconut-cream cursor-pointer flex flex-col rounded-3xl overflow-hidden shadow-lg border border-forest-dark/[0.06]">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden shrink-0">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      sizes="280px"
                      className="object-cover opacity-85 transition-all duration-700 pointer-events-none"
                    />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(245,240,232,0.9) 0%, transparent 55%)" }} />
                    <span
                      className="absolute top-4 right-5 font-serif font-bold text-forest-dark/10 select-none leading-none pointer-events-none"
                      style={{ fontSize: "4rem", lineHeight: 1 }}
                      aria-hidden
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Text body */}
                  <div className="px-8 pt-5 pb-8 flex flex-col flex-1">
                    <h3 className="font-serif font-bold text-forest-dark mb-3 leading-tight" style={{ fontSize: "1.15rem", letterSpacing: "-0.01em" }}>
                      {feature.title}
                    </h3>
                    <div className={"w-8 h-[1.5px] mb-4 transition-all duration-500 " + (isActive ? "w-14 bg-kerala-gold" : "bg-kerala-gold/50")} />
                    <p className="text-forest-dark/50 leading-relaxed" style={{ fontSize: "0.875rem", letterSpacing: "0.005em" }}>
                      {feature.desc}
                    </p>
                  </div>
                </div>
              )}
            />
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-forest-dark/[0.06] rounded-3xl overflow-hidden shadow-[0_4px_60px_rgba(15,38,28,0.07)]">
            {whySeasonCoirFeatures.map((feature, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: "easeOut" }}
                className="group relative bg-coconut-cream hover:bg-white transition-colors duration-500 cursor-default flex flex-col"
              >
                {/* Hover gold top bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-kerala-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />

                {/* Image */}
                <div className="relative h-48 overflow-hidden shrink-0">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  {/* Bottom gradient for text blend */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(245,240,232,0.9) 0%, transparent 55%)" }} />
                  {/* Index watermark over image */}
                  <span
                    className="absolute top-4 right-5 font-serif font-bold text-forest-dark/10 select-none leading-none"
                    style={{ fontSize: "4rem", lineHeight: 1 }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Text body */}
                <div className="px-8 pt-5 pb-8 flex flex-col flex-1">
                  {/* Title */}
                  <h3
                    className="font-serif font-bold text-forest-dark mb-3 leading-tight"
                    style={{ fontSize: "1.15rem", letterSpacing: "-0.01em" }}
                  >
                    {feature.title}
                  </h3>

                  {/* Accent rule */}
                  <div className="w-8 h-[1.5px] bg-kerala-gold/50 mb-4 transition-all duration-500 group-hover:w-14 group-hover:bg-kerala-gold" />

                  {/* Description */}
                  <p
                    className="text-forest-dark/50 leading-relaxed"
                    style={{ fontSize: "0.875rem", letterSpacing: "0.005em" }}
                  >
                    {feature.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Bottom rule */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-kerala-gold/30 to-transparent" />
      </section>

      {/* ── 4. MANUFACTURING JOURNEY ─────────────────────────────────────────── */}
      <JourneySection />

      {/* ── 5. PRODUCTS ──────────────────────────────────────────────────────── */}
      <section id="products" className="relative bg-coconut-cream overflow-hidden">
        {/* Subtle column stripes */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 119px,rgba(15,38,28,0.018) 120px)" }} />
        {/* Radial vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(212,175,55,0.05) 0%, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-28 pb-20 md:pb-36 relative z-10">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-20"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-10 bg-kerala-gold/60" />
              <span style={{ fontSize: 10, letterSpacing: "0.45em", color: "var(--color-kerala-gold)" }} className="uppercase font-semibold">
                Our Range
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="pb-[0.3em]">
                <h2
                  className="font-serif font-bold text-forest-dark leading-[0.92]"
                  style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)", letterSpacing: "-0.025em" }}
                >
                  Product
                  <em className="not-italic text-kerala-gold"> Catalogue</em>
                </h2>
              </div>
              <p className="text-forest-dark/45 max-w-xs leading-relaxed lg:text-right"
                style={{ fontSize: "0.875rem", letterSpacing: "0.01em" }}>
                21 products across 5 categories — crafted in Alleppey, shipped worldwide.
              </p>
            </div>
          </motion.div>

          {/* ── Category filter tabs ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex overflow-x-auto whitespace-nowrap scrollbar-hide flex-nowrap md:flex-wrap gap-2 mb-12 pb-2 md:pb-0"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 relative px-5 py-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase transition-all duration-300 rounded-full border ${
                  activeCategory === cat
                    ? "bg-forest-dark text-coconut-cream border-forest-dark shadow-[0_4px_20px_rgba(15,38,28,0.18)]"
                    : "bg-white border-forest-dark/10 text-forest-dark/50 hover:border-forest-dark/30 hover:text-forest-dark"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* ── Product grid ── */}
          {/* Mobile 3D Capsule Slider */}
          <div className="block sm:hidden mt-8 -mx-6">
            <CapsuleSlider 
              items={filtered}
              height={450}
              cardWidth="280px"
              renderItem={(product) => (
                <div className="w-full h-full relative rounded-2xl overflow-hidden cursor-pointer bg-white border border-forest-dark/[0.07] shadow-lg">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-coconut-cream">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="280px"
                      className="object-cover opacity-90 transition-all duration-700 pointer-events-none"
                    />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(15,38,28,0.3) 0%, transparent 50%)" }} />
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <span
                        className="px-2.5 py-1 text-[9px] font-bold tracking-[0.18em] uppercase rounded-full backdrop-blur-sm"
                        style={{ background: "rgba(15,38,28,0.72)", color: "var(--color-coconut-cream)" }}
                      >
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col justify-between" style={{ height: "calc(100% - 13rem)" }}>
                    <div>
                      <h3 className="font-serif font-bold text-forest-dark leading-snug mb-2" style={{ fontSize: "1rem", letterSpacing: "-0.01em" }}>
                        {product.name}
                      </h3>
                      <p className="text-forest-dark/45 leading-relaxed mb-4" style={{ fontSize: "0.8rem", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {product.description}
                      </p>
                    </div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full font-semibold"
                          style={{ fontSize: "0.65rem", letterSpacing: "0.06em", background: "rgba(15,38,28,0.05)", color: "rgba(15,38,28,0.5)", border: "1px solid rgba(15,38,28,0.10)" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            />
          </div>

          {/* Desktop Grid */}
          <motion.div layout className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, delay: i * 0.04, ease: "easeOut" }}
                  className="group relative rounded-2xl overflow-hidden cursor-default bg-white border border-forest-dark/[0.07] hover:shadow-[0_8px_40px_rgba(15,38,28,0.12)] transition-shadow duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-coconut-cream">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    {/* Subtle gradient for badge readability */}
                    <div className="absolute inset-0 px-6 sm:px-0" style={{ background: "linear-gradient(to bottom, rgba(15,38,28,0.3) 0%, transparent 50%)" }} />
                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className="px-2.5 py-1 text-[9px] font-bold tracking-[0.18em] uppercase rounded-full backdrop-blur-sm"
                        style={{ background: "rgba(15,38,28,0.72)", color: "var(--color-coconut-cream)" }}
                      >
                        {product.category}
                      </span>
                    </div>
                    {/* Hover gold top line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-kerala-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <h3
                      className="font-serif font-bold text-forest-dark leading-snug mb-2"
                      style={{ fontSize: "1rem", letterSpacing: "-0.01em" }}
                    >
                      {product.name}
                    </h3>
                    <p className="text-forest-dark/45 leading-relaxed mb-4" style={{ fontSize: "0.8rem" }}>
                      {product.description}
                    </p>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full font-semibold"
                          style={{ fontSize: "0.65rem", letterSpacing: "0.06em", background: "rgba(15,38,28,0.05)", color: "rgba(15,38,28,0.5)", border: "1px solid rgba(15,38,28,0.10)" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom accent on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-kerala-gold/0 group-hover:bg-kerala-gold/50 transition-colors duration-500" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ── CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mt-16"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-coconut-cream transition-all duration-300 hover:shadow-[0_4px_30px_rgba(15,38,28,0.25)] hover:scale-[1.03] bg-forest-dark hover:bg-forest-green"
              style={{ fontSize: "0.875rem", letterSpacing: "0.08em" }}
            >
              Request a Custom Quote
              <ChevronRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 6. SUSTAINABILITY STATS ───────────────────────────────────────────── */}
      <section className="py-16 md:py-28 bg-forest-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-kerala-gold blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-kerala-gold blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <span className="text-kerala-gold text-[10px] font-bold tracking-[0.55em] uppercase mb-4 block">By the Numbers</span>
            <h2 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-coconut-cream">Four decades of impact</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-8 lg:gap-10">
            {sustainabilityStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <h4 className="font-serif text-4xl md:text-5xl lg:text-6xl text-kerala-gold font-bold mb-3">
                  <CountUp target={stat.value} />
                </h4>
                <p className="text-xs uppercase tracking-widest text-coconut-cream/40 leading-relaxed">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. GLOBAL EXPORTS ────────────────────────────────────────────────── */}
      <section className="relative bg-coconut-cream overflow-hidden">
        {/* Subtle column stripes */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 119px,rgba(15,38,28,0.018) 120px)" }} />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-kerala-gold/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-28 pb-20 md:pb-32 relative z-10">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="mb-20"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-10 bg-kerala-gold/60" />
              <span style={{ fontSize: 10, letterSpacing: "0.45em", color: "var(--color-kerala-gold)" }} className="uppercase font-semibold">
                Worldwide Reach
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="pb-[0.3em]">
                <h2
                  className="font-serif font-bold text-forest-dark leading-[0.92]"
                  style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)", letterSpacing: "-0.025em" }}
                >
                  Exported
                  <em className="not-italic text-kerala-gold"> Globally</em>
                </h2>
              </div>
              <p className="text-forest-dark/45 max-w-xs leading-relaxed lg:text-right"
                style={{ fontSize: "0.875rem", letterSpacing: "0.01em" }}>
                From Alleppey&apos;s backwaters to hotel lobbies across the world — Season Coir ships to over 15 countries.
              </p>
            </div>
          </motion.div>

          {/* ── Country cards ── */}
          {/* ── Country cards ── */}
          {/* Mobile 3D Capsule Slider */}
          <div className="block md:hidden mt-8 -mx-6">
            <CapsuleSlider 
              items={exportMarkets}
              height={180}
              cardWidth="280px"
              renderItem={(market, isActive, index) => (
                <div className="w-full h-full relative bg-coconut-cream cursor-pointer rounded-3xl overflow-hidden shadow-lg border border-forest-dark/[0.06] flex items-center">
                  <div className={"absolute top-0 left-0 right-0 h-[2px] transition-all duration-500 " + (isActive ? "bg-kerala-gold" : "bg-transparent")} />
                  
                  <div className="px-8 py-6 flex items-center gap-6 w-full">
                    {/* Flag + index column */}
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <span className="text-4xl leading-none">{market.flag}</span>
                      <span
                        className={"font-serif font-bold select-none transition-colors duration-500 " + (isActive ? "text-kerala-gold/15" : "text-forest-dark/[0.07]")}
                        style={{ fontSize: "2rem", lineHeight: 1 }}
                        aria-hidden
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className={"w-px self-stretch transition-colors duration-500 " + (isActive ? "bg-kerala-gold/20" : "bg-forest-dark/[0.07]")} />

                    {/* Text */}
                    <div>
                      <p className="font-serif font-bold text-forest-dark leading-tight mb-1" style={{ fontSize: "1.1rem", letterSpacing: "-0.01em" }}>
                        {market.country}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className={"h-[1.5px] transition-all duration-500 " + (isActive ? "w-7 bg-kerala-gold" : "w-4 bg-kerala-gold/50")} />
                        <p className="text-forest-dark/40 font-medium uppercase" style={{ fontSize: "0.68rem", letterSpacing: "0.14em" }}>
                          Partner since {market.since}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            />
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-forest-dark/[0.07] rounded-3xl overflow-hidden shadow-[0_4px_60px_rgba(15,38,28,0.06)]">
            {exportMarkets.map((market, i) => (
              <motion.div
                key={market.country}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: "easeOut" }}
                className="group relative bg-coconut-cream hover:bg-white transition-colors duration-500 cursor-default"
              >
                {/* Hover gold top line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-kerala-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="px-10 py-9 flex items-center gap-6">
                  {/* Flag + index column */}
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <span className="text-4xl leading-none">{market.flag}</span>
                    <span
                      className="font-serif font-bold text-forest-dark/[0.07] select-none transition-colors duration-500 group-hover:text-kerala-gold/15"
                      style={{ fontSize: "2rem", lineHeight: 1 }}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="w-px self-stretch bg-forest-dark/[0.07] group-hover:bg-kerala-gold/20 transition-colors duration-500" />

                  {/* Text */}
                  <div>
                    <p
                      className="font-serif font-bold text-forest-dark leading-tight mb-1"
                      style={{ fontSize: "1.1rem", letterSpacing: "-0.01em" }}
                    >
                      {market.country}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-4 h-[1.5px] bg-kerala-gold/50 transition-all duration-500 group-hover:w-7 group-hover:bg-kerala-gold" />
                      <p className="text-forest-dark/40 font-medium uppercase" style={{ fontSize: "0.68rem", letterSpacing: "0.14em" }}>
                        Partner since {market.since}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── World reach callout bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 rounded-2xl px-8 py-8 md:px-10 md:py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            style={{ background: "linear-gradient(135deg, var(--color-forest-dark) 0%, var(--color-forest-green) 100%)" }}
          >
            <div>
              <p className="text-coconut-cream/90 font-serif font-bold" style={{ fontSize: "1.15rem", letterSpacing: "-0.01em" }}>
                Ready to join our global network?
              </p>
              <p className="text-coconut-cream/40 mt-1" style={{ fontSize: "0.8rem", letterSpacing: "0.02em" }}>
                We work directly with importers, wholesalers, and hospitality brands — no middlemen.
              </p>
            </div>
            <a
              href="#contact"
              className="group shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-forest-dark transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-[1.04]"
              style={{ fontSize: "0.8rem", letterSpacing: "0.1em", background: "var(--color-kerala-gold)" }}
            >
              Get in Touch
              <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-kerala-gold/30 to-transparent" />
      </section>

      {/* ── 8. TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-forest-dark text-white px-6 overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="text-kerala-gold text-[10px] font-bold tracking-[0.55em] uppercase mb-4 block">From Our Partners</span>
            <h2 className="font-serif font-bold text-3xl md:text-5xl text-coconut-cream">What they say</h2>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Quote size={40} className="text-kerala-gold/20 mx-auto mb-6" />
              <p className="text-coconut-cream/80 text-lg leading-relaxed italic mb-8">
                &ldquo;{testimonials[tIdx].text}&rdquo;
              </p>
              <p className="font-semibold text-coconut-cream">{testimonials[tIdx].name}</p>
              <p className="text-xs text-coconut-cream/40 tracking-wide mt-1">{testimonials[tIdx].role}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setTIdx(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === tIdx ? "bg-kerala-gold w-6" : "bg-white/20"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. ABOUT / OUR STORY ─────────────────────────────────────────────── */}
      <section id="about" className="py-16 md:py-32 bg-coconut-cream px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-kerala-gold text-[10px] font-bold tracking-[0.55em] uppercase mb-5 block">Our Heritage</span>
              <h2 className="font-serif font-bold text-4xl md:text-5xl text-forest-dark mb-6 leading-tight">
                A family craft,<br />
                <span className="text-kerala-gold italic">four decades</span> strong.
              </h2>
              <p className="text-forest-dark/60 leading-relaxed mb-5">
                Founded in 1980 by a family of master weavers in Alleppey — the coir capital of Kerala — Season Coir began as a small workshop on the banks of the backwaters. Today, we supply hotels, interior designers, and wholesale importers across the UAE, Europe, and beyond.
              </p>
              <p className="text-forest-dark/60 leading-relaxed mb-8">
                Our coir carries GI (Geographical Indication) certification, guaranteeing authentic Alleppey provenance. Every mat is hand-woven by craftspeople whose families have practised the art for generations.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-forest-dark font-semibold text-sm hover:text-kerala-gold transition-colors group"
              >
                Read our full story
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-[350px] md:h-[500px] rounded-3xl overflow-hidden"
            >
              <Image
                src="/images/placeholders/img_process_weaving.png"
                alt="Artisan weaving at Season Coir"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-serif text-2xl font-bold">Alleppey, Kerala</p>
                <p className="text-sm text-white/60">The coir capital of the world</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 10. CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-20 md:py-32 bg-forest-dark text-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">

            {/* Left: info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-kerala-gold text-[10px] font-bold tracking-[0.55em] uppercase mb-5 block">Get in Touch</span>
              <h2 className="font-serif font-bold text-4xl md:text-5xl text-coconut-cream mb-6 leading-tight">
                Let&apos;s build something<br />
                <span className="text-kerala-gold italic">beautiful together.</span>
              </h2>
              <p className="text-coconut-cream/55 leading-relaxed mb-10 max-w-md">
                Whether you&apos;re a wholesale importer, interior designer, or hospitality brand — we&apos;d love to discuss your requirements.
              </p>
              <div className="space-y-5">
                <a href="mailto:info@seasoncoir.com" className="flex items-center gap-4 text-coconut-cream/70 hover:text-kerala-gold transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-kerala-gold/10 transition-colors">
                    <Mail size={16} className="text-kerala-gold/60" />
                  </div>
                  info@seasoncoir.com
                </a>
                <a href="tel:+914772234567" className="flex items-center gap-4 text-coconut-cream/70 hover:text-kerala-gold transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-kerala-gold/10 transition-colors">
                    <Phone size={16} className="text-kerala-gold/60" />
                  </div>
                  +91 477 223 4567
                </a>
                <div className="flex items-start gap-4 text-coconut-cream/70">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-kerala-gold/60" />
                  </div>
                  <span>Alleppey (Alappuzha), Kerala 688 001, India</span>
                </div>
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {formSent ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-6 py-20">
                  <div className="w-16 h-16 rounded-full bg-kerala-gold/10 flex items-center justify-center">
                    <Send size={24} className="text-kerala-gold" />
                  </div>
                  <h3 className="font-serif text-2xl text-coconut-cream">Thank you!</h3>
                  <p className="text-coconut-cream/50 max-w-sm">We&apos;ve received your enquiry and will be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { name: "name", label: "Full Name", type: "text", placeholder: "John Smith" },
                    { name: "email", label: "Email Address", type: "email", placeholder: "john@company.com" },
                    { name: "company", label: "Company / Brand", type: "text", placeholder: "Your company name" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-coconut-cream/40 mb-2">{field.label}</label>
                      <input
                        type={field.type}
                        required={field.name !== "company"}
                        placeholder={field.placeholder}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={(e) => setFormData((d) => ({ ...d, [field.name]: e.target.value }))}
                        className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3.5 text-sm text-coconut-cream placeholder-coconut-cream/20 focus:outline-none focus:border-kerala-gold/50 transition-colors"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-coconut-cream/40 mb-2">Message</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                      className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3.5 text-sm text-coconut-cream placeholder-coconut-cream/20 focus:outline-none focus:border-kerala-gold/50 transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-kerala-gold text-forest-dark py-4 rounded-xl font-bold text-sm tracking-[0.1em] uppercase hover:bg-white transition-colors flex items-center justify-center gap-3"
                  >
                    Send Enquiry
                    <Send size={15} />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
