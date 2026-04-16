"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Mail, Phone, Send, CheckCircle } from "lucide-react";

const PRODUCT_CATEGORIES = [
  "PVC / Vinyl Backed Coir Tufted Mats",
  "Rubber Backed Coir Mats",
  "PVC Backed Coir Mats",
  "100% Rubber Mats",
  "100% Coir Mats",
  "Rubber-Backed Polypropylene Mats",
];

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    location: "",
    message: "",
  });

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1500));
    setFormState("success");
  };

  return (
    <main className="bg-coconut-cream overflow-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative flex items-center justify-center min-h-[65svh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src="/images/placeholders/hero_kerala_grove.png" alt="Contact Season Coir" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/80 via-forest-dark/60 to-coconut-cream" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-kerala-gold text-[11px] font-semibold tracking-[0.35em] uppercase mb-6"
          >
            We&apos;d Love to Hear From You
          </motion.p>
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              className="font-serif text-6xl md:text-8xl text-white font-bold leading-[0.9] tracking-tight"
            >
              Get In Touch
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="text-white/70 text-lg max-w-xl mx-auto"
          >
            Whether you&apos;re a first-time buyer or a long-standing partner, we&apos;re here to help.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

          {/* ── Left: Contact Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 space-y-10"
          >
            <div>
              <p className="text-kerala-gold text-[10px] font-semibold tracking-[0.35em] uppercase mb-3">Contact Information</p>
              <h2 className="font-serif text-3xl text-forest-dark font-bold leading-tight mb-2">
                Season Coir Exports
              </h2>
              <div className="w-8 h-0.5 bg-kerala-gold mt-4" />
            </div>

            {/* Address */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-forest-dark/6 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={16} className="text-kerala-gold" />
                </div>
                <div>
                  <p className="text-forest-dark font-semibold text-sm mb-1">Factory & Office Address</p>
                  <p className="text-forest-dark/60 text-sm leading-relaxed">
                    Chingoli P.O., Karthikappally<br />
                    Alappuzha — 690515<br />
                    Kerala, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-forest-dark/6 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-kerala-gold" />
                </div>
                <div>
                  <p className="text-forest-dark font-semibold text-sm mb-1.5">Phone</p>
                  <div className="space-y-1">
                    <a href="tel:+914792486670" className="block text-forest-dark/60 text-sm hover:text-kerala-gold transition-colors">
                      +91 479 2486670 <span className="text-forest-dark/35 text-xs">(Landline)</span>
                    </a>
                    <a href="tel:+919447618500" className="block text-forest-dark/60 text-sm hover:text-kerala-gold transition-colors">
                      +91 94476 18500 <span className="text-forest-dark/35 text-xs">(MD)</span>
                    </a>
                    <a href="tel:+919400453547" className="block text-forest-dark/60 text-sm hover:text-kerala-gold transition-colors">
                      +91 94004 53547 <span className="text-forest-dark/35 text-xs">(Mobile)</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-forest-dark/6 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-kerala-gold" />
                </div>
                <div>
                  <p className="text-forest-dark font-semibold text-sm mb-1.5">Email</p>
                  <div className="space-y-1">
                    <a href="mailto:info@seasoncoir.com" className="block text-forest-dark/60 text-sm hover:text-kerala-gold transition-colors">
                      info@seasoncoir.com
                    </a>
                    <a href="mailto:asc@seasoncoir.com" className="block text-forest-dark/60 text-sm hover:text-kerala-gold transition-colors">
                      asc@seasoncoir.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-forest-dark/10 bg-forest-dark/4 aspect-[4/3] relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-forest-dark/30">
                <MapPin size={28} />
                <p className="text-sm font-medium">Alappuzha, Kerala</p>
                <p className="text-xs">6°30&apos;N 76°15&apos;E</p>
                <a
                  href="https://maps.google.com/?q=Karthikappally,Alappuzha,Kerala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-[11px] text-kerala-gold font-semibold border border-kerala-gold/30 px-4 py-1.5 rounded-full hover:bg-kerala-gold hover:text-forest-dark transition-colors"
                >
                  Open in Maps
                </a>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Contact Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-black/[0.05]">
              {formState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-12 gap-5"
                >
                  <div className="w-20 h-20 rounded-full bg-forest-green/10 flex items-center justify-center">
                    <CheckCircle size={36} className="text-forest-green" />
                  </div>
                  <h3 className="font-serif text-2xl text-forest-dark font-bold">Message Received</h3>
                  <p className="text-forest-dark/55 max-w-sm leading-relaxed">
                    Thank you for reaching out. Our team will respond to your enquiry within 1–2 business days.
                  </p>
                  <button
                    onClick={() => { setFormState("idle"); setForm({ name: "", email: "", phone: "", category: "", location: "", message: "" }); }}
                    className="text-kerala-gold text-sm font-semibold underline underline-offset-2 mt-2"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="mb-8">
                    <h3 className="font-serif text-2xl text-forest-dark font-bold mb-2">Send an Enquiry</h3>
                    <p className="text-forest-dark/45 text-sm">Fill out the form below and we&apos;ll get back to you promptly.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <InputField label="Full Name *" name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                      <InputField label="Email Address *" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <InputField label="Phone Number" name="phone" type="tel" placeholder="+1 234 567 8900" value={form.phone} onChange={handleChange} />
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-semibold text-forest-dark/50 uppercase tracking-[0.2em]">
                          Product Category
                        </label>
                        <select
                          name="category"
                          value={form.category}
                          onChange={handleChange}
                          className="w-full bg-forest-dark/3 border border-forest-dark/10 rounded-xl px-4 py-3 text-sm text-forest-dark/70 focus:outline-none focus:ring-2 focus:ring-kerala-gold/30 focus:border-kerala-gold/50 transition-all appearance-none"
                        >
                          <option value="">Select a category</option>
                          {PRODUCT_CATEGORIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <InputField label="Your Location / Country" name="location" type="text" placeholder="e.g. Germany, UAE, UK..." value={form.location} onChange={handleChange} />

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-semibold text-forest-dark/50 uppercase tracking-[0.2em]">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us about your requirements — product type, quantities, specifications, or any questions you have..."
                        className="w-full bg-forest-dark/3 border border-forest-dark/10 rounded-xl px-4 py-3 text-sm text-forest-dark/80 placeholder:text-forest-dark/30 focus:outline-none focus:ring-2 focus:ring-kerala-gold/30 focus:border-kerala-gold/50 transition-all resize-none"
                      />
                    </div>

                    <p className="text-[11px] text-forest-dark/35 leading-relaxed">
                      Your details are kept strictly confidential as per our Company Privacy Policy.
                    </p>

                    <button
                      type="submit"
                      disabled={formState === "loading"}
                      className="w-full flex items-center justify-center gap-3 bg-kerala-gold text-forest-dark py-4 rounded-xl font-semibold text-sm tracking-[0.06em] hover:bg-coir-light transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_28px_rgba(212,175,55,0.45)] hover:-translate-y-0.5"
                    >
                      {formState === "loading" ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-forest-dark/30 border-t-forest-dark rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Bottom Info Strip ────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-forest-dark py-16 px-6"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { icon: "📦", title: "Export Worldwide", desc: "UAE, Germany, Poland, UK, USA & more" },
            { icon: "⚡", title: "Fast Response", desc: "We respond to all enquiries within 24 hours" },
            { icon: "🤝", title: "Direct Partnership", desc: "Factory-to-buyer — no middlemen" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h4 className="text-coconut-cream font-serif font-semibold text-lg mb-2">{item.title}</h4>
              <p className="text-coconut-cream/40 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}

function InputField({
  label, name, type, placeholder, value, onChange, required,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-semibold text-forest-dark/50 uppercase tracking-[0.2em]">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full bg-forest-dark/3 border border-forest-dark/10 rounded-xl px-4 py-3 text-sm text-forest-dark/80 placeholder:text-forest-dark/30 focus:outline-none focus:ring-2 focus:ring-kerala-gold/30 focus:border-kerala-gold/50 transition-all"
      />
    </div>
  );
}
