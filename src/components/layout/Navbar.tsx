/**
 * Sticky navigation bar with smooth scroll links and mobile hamburger menu.
 * Brand colors: Forest Green (#1B4332) + Coir Gold (#8B6914).
 */
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/data";

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [openDropdown,   setOpenDropdown]   = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      setOpenDropdown(null);
      setMobileOpen(false);
      setMobileExpanded(null);
    }, 0);
    return () => clearTimeout(id);
  }, [pathname]);

  const solid = scrolled || pathname !== "/";

  const linkCls = (active: boolean) =>
    [
      "text-[13px] font-medium tracking-[0.05em] transition-colors duration-200",
      solid
        ? active ? "text-forest-green font-semibold" : "text-forest-dark/60 hover:text-forest-dark"
        : active ? "text-white font-semibold" : "text-white/75 hover:text-white",
    ].join(" ");

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    const base = href.split("#")[0];
    // hash-only anchors on home (e.g. /#products) — never highlight as active
    if (base === "/" || base === "") return false;
    return pathname.startsWith(base);
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
      solid
        ? "bg-coconut-cream/96 backdrop-blur-md border-b border-black/[0.06] shadow-[0_1px_24px_rgba(0,0,0,0.06)] py-4"
        : "bg-transparent py-6"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-serif text-[1.75rem] font-bold leading-none z-50">
          <span className={solid ? "text-forest-dark" : "text-white drop-shadow-md"}>Season</span>
          <span className="text-kerala-gold drop-shadow-sm">Coir</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className={`${linkCls(isActive(item.href))} flex items-center gap-1 outline-none group relative`}>
                  {item.name}
                  <ChevronDown size={13} className={`mt-px transition-transform duration-200 ${openDropdown === item.name ? "rotate-180" : ""}`} />
                  <span className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-px origin-center transition-all duration-300 ${solid ? "bg-forest-green" : "bg-kerala-gold"} ${isActive(item.href) || openDropdown === item.name ? "w-full" : "w-0 group-hover:w-full"}`} />
                </button>

                <AnimatePresence>
                  {openDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50"
                    >
                      <div className="absolute top-[11px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-black/[0.07] rotate-45 z-10 pointer-events-none" />
                      <div className="relative bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-black/[0.06] py-2 min-w-[200px]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href + child.name}
                            href={child.href}
                            className={`block px-5 py-[10px] text-[13px] font-medium tracking-[0.03em] whitespace-nowrap transition-colors ${
                              pathname === child.href.split("#")[0]
                                ? "text-forest-green bg-forest-green/[0.06]"
                                : "text-forest-dark/60 hover:text-forest-green hover:bg-forest-green/[0.05]"
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={`${linkCls(isActive(item.href))} relative group`}
              >
                {item.name}
                <span className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-px origin-center transition-all duration-300 ${solid ? "bg-forest-green" : "bg-kerala-gold"} ${isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            )
          )}

          {/* CTA */}
          <Link
            href="/#contact"
            className={`ml-2 inline-flex items-center px-6 py-[10px] rounded-full text-[13px] font-semibold tracking-[0.06em] transition-all duration-300 ${
              solid
                ? "bg-forest-dark text-coconut-cream hover:bg-forest-green shadow-[0_2px_16px_rgba(15,38,28,0.22)] hover:scale-[1.03]"
                : "bg-kerala-gold/15 border border-kerala-gold/45 text-kerala-gold backdrop-blur-sm hover:bg-kerala-gold hover:text-forest-dark hover:scale-[1.03]"
            }`}
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`lg:hidden p-2 z-50 ${solid || mobileOpen ? "text-forest-dark" : "text-white"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden fixed inset-0 z-40 bg-coconut-cream overflow-y-auto"
          >
            <div className="flex flex-col items-start justify-center min-h-screen max-w-sm mx-auto px-8 py-24 space-y-1">
              {NAV_ITEMS.map((item) =>
                item.children ? (
                  <div key={item.name} className="w-full">
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === item.name ? null : item.name)}
                      className="w-full flex items-center justify-between py-4 font-serif text-3xl text-forest-dark hover:text-kerala-gold transition-colors"
                    >
                      <span>{item.name}</span>
                      <ChevronDown size={20} className={`transition-transform duration-200 text-forest-dark/40 ${mobileExpanded === item.name ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === item.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-5 border-l-2 border-kerala-gold/25 ml-1 mb-3"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href + child.name}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block py-2.5 text-[15px] font-medium text-forest-dark/55 hover:text-kerala-gold transition-colors"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block w-full py-4 font-serif text-3xl text-forest-dark hover:text-kerala-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                )
              )}
              <Link
                href="/#contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full mt-10 text-center bg-forest-dark text-coconut-cream px-10 py-4 rounded-full font-semibold text-base tracking-[0.06em] hover:bg-forest-green transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
