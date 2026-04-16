"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "De-husking",
    subtitle: "Separating Husk from Fruit",
    image: "/images/placeholders/img_process_dehusking.png",
    body: "The initial process involves the careful separation of the edible coconut fruit from the outer husk. The husk — discarded in most industries — becomes the foundational raw material for all coir products. De-husking requires many precise strikes to cleanly separate both parts without damaging the fibre-rich husk. Skilled workers use traditional tools alongside mechanical de-huskers to process large volumes while preserving fibre integrity.",
    detail: "~2–3 kg of husk per coconut",
  },
  {
    number: "02",
    title: "Retting",
    subtitle: "The Backwaters Do Their Work",
    image: "/images/placeholders/img_process_retting.png",
    body: "After de-husking, the husks are submerged in Kerala's famous backwaters — brackish tidal waters that are uniquely suited to the retting process. Bacterial action slowly breaks down the pith and lignin binding the coir fibres together, leaving only the raw, golden fibre behind. This traditional process takes 6 to 10 months and cannot be replicated industrially — it is the secret behind the softness and lustre of Alleppey coir.",
    detail: "6–10 months retting period",
  },
  {
    number: "03",
    title: "Defibering",
    subtitle: "Unleashing the Fibre",
    image: "/images/placeholders/img_process_defibering.png",
    body: "The retted coir is placed into powerful rotating drums fitted with steel bars. As the drum spins, it beats and agitates the husks at high velocity, loosening and separating the coir fibres from the remaining pith material. This mechanical defibering process extracts clean fibre bundles ready for sorting. The separated pith — coir dust — is collected separately as a valuable by-product used in horticulture.",
    detail: "Zero waste — pith becomes coir pith product",
  },
  {
    number: "04",
    title: "Fibre Separation",
    subtitle: "Graded for Purpose",
    image: "/images/placeholders/img_process_separation.png",
    body: "The loose coir fibres are moved to a slow-rotating separator drum that grades them by length and thickness. Short fibres (mattress grade) are directed to cushioning and padding production. Medium fibres become doormats and brushes. The longest, strongest fibres — premium grade — are selected for spinning into yarn, geotextiles, and high-performance mats. This precision grading is essential to Season Coir's product quality consistency.",
    detail: "Three fibre grades: short / medium / long",
  },
  {
    number: "05",
    title: "Weaving & Design",
    subtitle: "From Fibre to Floor",
    image: "/images/placeholders/img_process_weaving.png",
    body: "The graded fibres are spun into coir yarn on traditional spindles and power-assisted spinning frames. The yarn is then woven on mechanical and semi-mechanical looms into geotextiles, floor mats, doormats, and decorative products. Patterns, densities, and pile heights are adjusted to buyer specifications. Backing materials — rubber, PVC, vinyl — are bonded in a final stage, and quality checks are performed on every finished product before packaging and export.",
    detail: "Custom sizes, patterns, and backings available",
  },
];

export default function ProcessPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="bg-coconut-cream overflow-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative flex items-center justify-center min-h-[88svh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="/images/placeholders/img_process_weaving.png"
            alt="Coir weaving process"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/80 via-forest-dark/55 to-coconut-cream" />
          {/* Texture overlay */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(212,175,55,0.3) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-kerala-gold text-[11px] font-semibold tracking-[0.35em] uppercase mb-6"
          >
            5-Stage Manufacturing Process
          </motion.p>
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-[0.95] tracking-tight"
            >
              From Husk
              <br />
              <span className="text-kerala-gold">to Home</span>
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed"
          >
            Every Season Coir product is born from a centuries-old craft — refined over generations, carried on Kerala&apos;s backwaters.
          </motion.p>

          {/* Step indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex items-center justify-center gap-3 mt-10"
          >
            {steps.map((s, i) => (
              <div key={s.number} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-kerala-gold/40 flex items-center justify-center">
                  <span className="text-kerala-gold text-[11px] font-bold">{i + 1}</span>
                </div>
                {i < steps.length - 1 && <div className="w-6 h-px bg-kerala-gold/25 hidden sm:block" />}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Process Steps ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-24 space-y-36">
        {steps.map((step, i) => (
          <ProcessStep key={step.number} step={step} index={i} />
        ))}
      </div>

      {/* ── Closing CTA ──────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-forest-dark py-24 px-6 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <div className="w-12 h-px bg-kerala-gold mx-auto mb-10" />
          <h2 className="font-serif text-3xl md:text-4xl text-coconut-cream font-bold mb-6">
            The Result? <span className="text-kerala-gold">Products That Last</span>
          </h2>
          <p className="text-coconut-cream/55 text-lg leading-relaxed mb-10">
            Every step in our process is a commitment — to the fibre, to the craft, and to the customer who will walk on it for years to come.
          </p>
          <a
            href="/products"
            className="inline-flex items-center gap-3 bg-kerala-gold text-forest-dark px-9 py-4 rounded-full font-semibold text-sm tracking-[0.08em] uppercase hover:bg-coir-light transition-colors"
          >
            Explore Our Products
          </a>
        </div>
      </motion.section>
    </main>
  );
}

function ProcessStep({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const isEven = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 40%"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);
  const textX = useTransform(scrollYProgress, [0, 1], [isEven ? -30 : 30, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <div ref={ref} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center`}>
      {/* Image */}
      <motion.div
        style={{ scale: imageScale }}
        className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ${isEven ? "" : "lg:order-2"}`}
      >
        <Image src={step.image} alt={step.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-forest-dark/10 to-forest-dark/40" />
        {/* Step number watermark */}
        <div className="absolute top-6 left-6 font-serif text-8xl font-bold text-white/10 leading-none select-none">
          {step.number}
        </div>
        {/* Detail badge */}
        <div className="absolute bottom-6 right-6 bg-forest-dark/85 backdrop-blur-sm text-kerala-gold text-xs font-medium px-4 py-2 rounded-full tracking-wide">
          {step.detail}
        </div>
      </motion.div>

      {/* Text */}
      <motion.div style={{ x: textX, opacity: textOpacity }} className={isEven ? "" : "lg:order-1"}>
        <div className="flex items-center gap-4 mb-6">
          <span className="font-serif text-kerala-gold text-6xl font-bold opacity-25 leading-none">{step.number}</span>
          <div className="w-px h-12 bg-kerala-gold/30" />
          <div>
            <p className="text-kerala-gold text-[10px] font-semibold tracking-[0.3em] uppercase">{step.subtitle}</p>
            <h2 className="font-serif text-3xl md:text-4xl text-forest-dark font-bold leading-tight mt-0.5">
              {step.title}
            </h2>
          </div>
        </div>
        <div className="w-10 h-[2px] bg-kerala-gold mb-6" />
        <p className="text-forest-dark/65 text-lg leading-relaxed">
          {step.body}
        </p>
      </motion.div>
    </div>
  );
}
