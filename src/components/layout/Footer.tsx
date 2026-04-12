"use client";

import Link from "next/link";
import { MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";

const LINKS = {
  Company: [
    { name: "Our Story",    href: "/about#story" },
    { name: "Our Process",  href: "/about#process" },
    { name: "Why Us",       href: "/about#why" },
    { name: "Gallery",      href: "/gallery" },
  ],
  Products: [
    { name: "PVC / Vinyl Coir Tufted", href: "/#products" },
    { name: "Rubber Backed Coir",      href: "/#products" },
    { name: "100% Rubber Mats",        href: "/#products" },
    { name: "100% Coir Mats",          href: "/#products" },
    { name: "Polypropylene Mats",      href: "/#products" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-forest-dark text-coconut-cream/70">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/[0.08]">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-serif text-[2rem] font-bold leading-none block mb-5">
              <span className="text-coconut-cream">Season</span>
              <span className="text-kerala-gold">Coir</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm mb-8 text-coconut-cream/55">
              GI-tagged Alleppey coir. Ethically sourced, artisan-crafted, and exported globally since 1980. The benchmark for premium natural fibre flooring.
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <a href="mailto:info@seasoncoir.com" className="flex items-center gap-3 hover:text-kerala-gold transition-colors group">
                <Mail size={15} className="text-kerala-gold/60 group-hover:text-kerala-gold transition-colors" />
                info@seasoncoir.com
              </a>
              <a href="tel:+914772234567" className="flex items-center gap-3 hover:text-kerala-gold transition-colors group">
                <Phone size={15} className="text-kerala-gold/60 group-hover:text-kerala-gold transition-colors" />
                +91 477 223 4567
              </a>
              <span className="flex items-start gap-3">
                <MapPin size={15} className="text-kerala-gold/60 mt-0.5 shrink-0" />
                <span>Alleppey (Alappuzha), Kerala 688 001, India</span>
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="text-coconut-cream font-semibold text-[11px] tracking-[0.3em] uppercase mb-6">{heading}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm hover:text-kerala-gold transition-colors flex items-center gap-1 group"
                    >
                      {item.name}
                      <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-coconut-cream/35">
            © {new Date().getFullYear()} Season Coir Exports. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-coconut-cream/35 hover:text-kerala-gold transition-colors"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-coconut-cream/35 hover:text-kerala-gold transition-colors"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
