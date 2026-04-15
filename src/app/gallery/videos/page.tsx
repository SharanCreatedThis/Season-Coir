"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";

const videos = [
  {
    id: "v-001",
    title: "The Art of Coir — Factory Tour",
    desc: "A full walkthrough of Season Coir's manufacturing facility, from raw husk arrival to finished mat packaging.",
    duration: "4:32",
    category: "Factory",
    thumbnail: "/images/placeholders/img_process_weaving.png",
    youtubeId: null,
  },
  {
    id: "v-002",
    title: "Retting in the Backwaters of Kerala",
    desc: "Watch how coconut husks are retted for 6–10 months in Kerala's iconic backwaters — the process that defines Alleppey coir.",
    duration: "2:15",
    category: "Process",
    thumbnail: "/images/placeholders/img_process_retting.png",
    youtubeId: null,
  },
  {
    id: "v-003",
    title: "Weaving Tradition — Coir on the Loom",
    desc: "Skilled weavers demonstrate the traditional and mechanical loom techniques used to create Season Coir's premium mats.",
    duration: "3:48",
    category: "Craft",
    thumbnail: "/images/placeholders/img_process_defibering.png",
    youtubeId: null,
  },
  {
    id: "v-004",
    title: "Season Coir at Domotex 2023",
    desc: "Highlights from Season Coir's participation at Domotex Hannover — the world's leading flooring trade fair.",
    duration: "1:55",
    category: "Exhibition",
    thumbnail: "/images/placeholders/img_whyus_quality.png",
    youtubeId: null,
  },
  {
    id: "v-005",
    title: "From Kerala to the World — Export Journey",
    desc: "Follow a Season Coir shipment from the factory floor in Alappuzha to its final destination in a European warehouse.",
    duration: "5:12",
    category: "Export",
    thumbnail: "/images/placeholders/img_process_separation.png",
    youtubeId: null,
  },
  {
    id: "v-006",
    title: "Quality Control — The Final Inspection",
    desc: "Our quality assurance team demonstrates the rigorous testing process every mat undergoes before export.",
    duration: "2:40",
    category: "Process",
    thumbnail: "/images/placeholders/img_whyus_biodegradable.png",
    youtubeId: null,
  },
];

type Video = (typeof videos)[0];

export default function VideosPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState<Video | null>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="bg-coconut-cream overflow-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative flex items-center justify-center min-h-[65vh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="/images/placeholders/img_process_defibering.png" alt="Video Gallery" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/80 via-forest-dark/60 to-coconut-cream" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-kerala-gold text-[11px] font-semibold tracking-[0.35em] uppercase mb-6"
          >
            Behind the Scenes
          </motion.p>
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              className="font-serif text-6xl md:text-8xl text-white font-bold leading-[0.9] tracking-tight"
            >
              Video Gallery
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="text-white/70 text-lg max-w-xl mx-auto"
          >
            Watch our craft in motion — from Kerala backwaters to global exhibitions.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Video Grid ───────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} onPlay={() => setPlaying(video)} />
          ))}
        </motion.div>
      </div>

      {/* ── Video Modal ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12"
            onClick={() => setPlaying(null)}
          >
            <div className="absolute inset-0 bg-forest-dark/90 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-forest-dark rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPlaying(null)}
                className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X size={18} className="text-white" />
              </button>

              {/* Video player placeholder */}
              <div className="relative aspect-video bg-forest-dark">
                <Image src={playing.thumbnail} alt={playing.title} fill className="object-cover opacity-40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-kerala-gold/20 border-2 border-kerala-gold/60 flex items-center justify-center">
                    <Play size={28} className="text-kerala-gold ml-1" fill="currentColor" />
                  </div>
                  <p className="text-white/50 text-sm text-center px-8">
                    Video coming soon. Contact us for a factory tour or demo reel.
                  </p>
                </div>
              </div>

              <div className="p-7">
                <span className="text-kerala-gold text-[10px] tracking-[0.3em] uppercase font-semibold">{playing.category}</span>
                <h3 className="font-serif text-2xl text-coconut-cream font-bold mt-2 mb-3">{playing.title}</h3>
                <p className="text-coconut-cream/50 text-sm leading-relaxed">{playing.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function VideoCard({ video, onPlay }: { video: Video; onPlay: () => void }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } } }}
      onClick={onPlay}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-black/[0.05] cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-400"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <Image src={video.thumbnail} alt={video.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-forest-dark/30 group-hover:bg-forest-dark/50 transition-colors duration-400" />
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 rounded-full bg-white/15 border-2 border-white/60 backdrop-blur-sm flex items-center justify-center group-hover:bg-kerala-gold/30 group-hover:border-kerala-gold transition-all duration-400"
          >
            <Play size={22} className="text-white ml-1" fill="currentColor" />
          </motion.div>
        </div>
        {/* Duration */}
        <div className="absolute bottom-3 right-3 bg-forest-dark/80 text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
          {video.duration}
        </div>
        {/* Category */}
        <div className="absolute top-3 left-3 bg-kerala-gold/90 text-forest-dark text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wide">
          {video.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-base text-forest-dark font-semibold leading-snug mb-2 group-hover:text-forest-green transition-colors">
          {video.title}
        </h3>
        <p className="text-forest-dark/45 text-xs leading-relaxed line-clamp-2">{video.desc}</p>
        <div className="mt-4 flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-kerala-gold/20 flex items-center justify-center">
            <Play size={8} className="text-kerala-gold ml-0.5" fill="currentColor" />
          </div>
          <span className="text-kerala-gold text-[11px] font-semibold">Watch Video</span>
        </div>
      </div>
    </motion.div>
  );
}
