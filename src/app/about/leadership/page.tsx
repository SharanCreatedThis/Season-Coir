"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const team = [
  {
    name: "Suresh Krishnan",
    title: "Managing Director",
    tenure: "Since 1980",
    image: "/images/placeholders/img_whyus_quality.png",
    bio: "Founder and visionary leader of Season Coir Exports, Suresh Krishnan established the company in 1980 with a simple belief: Kerala's natural coir deserved a global audience. Over 45 years, he has guided the company from a single factory floor to one of South India's most recognised coir exporters, building relationships with buyers across three continents. His philosophy — quality first, no shortcuts — has shaped every product that leaves the facility.",
    expertise: ["Export Strategy", "Product Development", "Industry Relations"],
  },
  {
    name: "Ramesh Nair",
    title: "Head of Operations",
    tenure: "Since 1995",
    image: "/images/placeholders/img_whyus_biodegradable.png",
    bio: "Ramesh Nair oversees all manufacturing processes, quality control, and supply chain management across the Season Coir facility. With three decades of hands-on experience on the factory floor, he has an intimate understanding of every stage — from de-husking to final weaving. His implementation of total quality management protocols has driven consistent product standards that international buyers depend on.",
    expertise: ["Manufacturing", "Quality Control", "Supply Chain"],
  },
  {
    name: "Deepa Menon",
    title: "Export Manager",
    tenure: "Since 2005",
    image: "/images/placeholders/img_whyus_quality.png",
    bio: "Deepa Menon manages Season Coir's international trade relationships, overseeing active export operations to UAE, Germany, Poland, the UK, and beyond. Her deep expertise in B2B coir exports — from compliance and documentation to buyer relations and custom specifications — ensures seamless shipments and long-term partnerships. She has personally overseen over 1,200 export shipments in her tenure.",
    expertise: ["International Trade", "B2B Relations", "Export Compliance"],
  },
  {
    name: "Anil Varghese",
    title: "Quality Assurance Lead",
    tenure: "Since 2008",
    image: "/images/placeholders/img_whyus_biodegradable.png",
    bio: "Anil Varghese ensures that every Season Coir product meets the highest international quality benchmarks. His team conducts rigorous testing at every production stage — raw fibre grading, yarn tensile strength, weave density, backing adhesion, and finished product inspection. Anil's protocols are the reason Season Coir has maintained a near-zero defect return rate across thousands of export shipments.",
    expertise: ["Quality Testing", "ISO Compliance", "Product Inspection"],
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function LeadershipPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="bg-coconut-cream overflow-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative flex items-center justify-center min-h-[72vh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="/images/placeholders/hero_kerala_grove.png"
            alt="Season Coir Leadership"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/80 via-forest-dark/60 to-coconut-cream" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-kerala-gold text-[11px] font-semibold tracking-[0.35em] uppercase mb-6"
          >
            The People Behind Season Coir
          </motion.p>
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              className="font-serif text-5xl md:text-7xl text-white font-bold leading-[0.95] tracking-tight"
            >
              Leadership Team
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed"
          >
            Four decades of expertise, dedication, and passion for natural fibre — meet the team that drives Season Coir.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Team Grid ────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </motion.div>
      </section>

      {/* ── Values Strip ─────────────────────────────────────────────────── */}
      <section className="bg-forest-dark py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-coconut-cream font-bold mb-6">
            Guided by <span className="text-kerala-gold">Shared Values</span>
          </h2>
          <p className="text-coconut-cream/55 text-lg leading-relaxed mb-14 max-w-2xl mx-auto">
            Our leadership team is united by a common purpose — to bring the best of Kerala&apos;s natural heritage to the world, with integrity and care.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["Integrity", "Quality", "Innovation", "Partnership"].map((v, i) => (
              <motion.div
                key={v}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="w-12 h-px bg-kerala-gold mx-auto mb-4" />
                <span className="text-coconut-cream font-serif text-lg font-semibold">{v}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}

function TeamCard({ member }: { member: (typeof team)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-black/[0.04] cursor-default"
    >
      <div className="flex flex-col sm:flex-row gap-0">
        {/* Portrait */}
        <div className="relative w-full sm:w-48 h-64 sm:h-auto shrink-0 overflow-hidden">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-forest-dark/10" />
        </div>

        {/* Content */}
        <div className="flex-1 p-7 flex flex-col justify-between">
          <div>
            <span className="text-kerala-gold text-[10px] font-semibold tracking-[0.3em] uppercase">{member.tenure}</span>
            <h3 className="font-serif text-2xl text-forest-dark font-bold mt-1 mb-0.5">{member.name}</h3>
            <p className="text-forest-dark/50 text-sm font-medium tracking-wide mb-4">{member.title}</p>
            <div className="w-8 h-0.5 bg-kerala-gold mb-4" />

            <AnimatePresence mode="wait">
              {hovered ? (
                <motion.p
                  key="bio"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-forest-dark/60 text-sm leading-relaxed"
                >
                  {member.bio}
                </motion.p>
              ) : (
                <motion.p
                  key="short"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-forest-dark/60 text-sm leading-relaxed line-clamp-3"
                >
                  {member.bio}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Expertise tags */}
          <div className="flex flex-wrap gap-2 mt-5">
            {member.expertise.map((tag) => (
              <span key={tag} className="text-[11px] text-forest-green bg-forest-green/8 px-3 py-1 rounded-full font-medium tracking-wide border border-forest-green/15">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
