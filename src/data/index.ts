// ─── Why Season Coir ──────────────────────────────────────────────────────────
export const whySeasonCoirFeatures = [
  {
    icon: "🌿",
    title: "100% Biodegradable",
    desc: "Every strand of coir we produce returns to the earth naturally without leaving a footprint.",
    image: "/images/placeholders/img_whyus_biodegradable.png",
  },
  {
    icon: "🏆",
    title: "Artisanal Quality",
    desc: "Our products are handmade by generational craftsmen from the coastal belts of Kerala.",
    image: "/images/placeholders/img_whyus_quality.png",
  },
  {
    icon: "♻️",
    title: "Zero-Waste Process",
    desc: "From de-husking to weaving, our manufacturing chain prioritises energy efficiency and zero waste.",
    image: "/images/placeholders/img_whyus_biodegradable.png",
  },
  {
    icon: "🌍",
    title: "Global Exports",
    desc: "Supplying UAE, Poland, Germany and beyond — trusted by importers on 3 continents since 1980.",
    image: "/images/placeholders/img_whyus_quality.png",
  },
  {
    icon: "🪙",
    title: "GI-Tagged Alleppey Coir",
    desc: "Our coir carries Geographical Indication status — a government-certified mark of origin and quality.",
    image: "/images/placeholders/img_whyus_biodegradable.png",
  },
  {
    icon: "🤝",
    title: "B2B Partnership First",
    desc: "We work directly with wholesalers, interior designers and hospitality brands — no middlemen.",
    image: "/images/placeholders/img_whyus_quality.png",
  },
];

// ─── Sustainability stats ─────────────────────────────────────────────────────
export const sustainabilityStats = [
  { value: "100%", label: "Biodegradable Core Materials" },
  { value: "45+",  label: "Years of Export Excellence" },
  { value: "3381+", label: "Shipments Completed" },
  { value: "3",    label: "Continents Served" },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const testimonials = [
  {
    name: "Thomas Weber",
    role: "Proprietor, Weber Imports GmbH — Germany",
    text: "The sheer durability of Season Coir products is unmatched in the European market. Their commitment to traditional retting processes ensures a fibre quality we haven't found elsewhere.",
    image: "/images/placeholders/img_testimonial_1.png",
  },
  {
    name: "Aisha bin Rashid",
    role: "Procurement Head, Desert Oasis Resorts — Dubai",
    text: "For our luxury eco-resorts in Dubai, only natural textures will do. Season Coir's custom-woven floor coverings provide the exact organic aesthetic our guests expect.",
    image: "/images/placeholders/img_testimonial_2.png",
  },
  {
    name: "Julian Brooks",
    role: "Sustainability Director, Urban Gardeners UK",
    text: "Transitioning to Season Coir's biodegradable garden mats reduced our plastic waste by 3 tons last year alone. They are true partners in our green mission.",
    image: "/images/placeholders/img_testimonial_3.png",
  },
];

// ─── Product categories & catalog ────────────────────────────────────────────
export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
};

export const CATEGORIES = [
  "PVC / Vinyl Coir",
  "Rubber Backed",
  "100% Rubber",
  "100% Coir",
  "Polypropylene",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const products: Product[] = [
  // PVC / Vinyl Coir Tufted (5)
  {
    id: "pvc-001",
    name: "Classic Grid Tufted Mat",
    category: "PVC / Vinyl Coir",
    description: "Traditional grid-weave coir on a durable PVC backing. High footfall performance with natural texture.",
    tags: ["Indoor", "Outdoor", "Anti-slip"],
    image: "/images/placeholders/img_whyus_quality.png",
  },
  {
    id: "pvc-002",
    name: "Heritage Chevron Tufted",
    category: "PVC / Vinyl Coir",
    description: "Chevron-pattern tufted coir with UV-resistant vinyl backing. Popular for hotel lobbies.",
    tags: ["Hotel", "Commercial", "UV-resistant"],
    image: "/images/placeholders/img_whyus_quality.png",
  },
  {
    id: "pvc-003",
    name: "Diamond Weave Tufted",
    category: "PVC / Vinyl Coir",
    description: "Dense diamond-tufted weave, ideal for high-traffic entryways and retail spaces.",
    tags: ["Retail", "High-traffic", "Anti-slip"],
    image: "/images/placeholders/img_whyus_quality.png",
  },
  {
    id: "pvc-004",
    name: "Berber Loop Tufted",
    category: "PVC / Vinyl Coir",
    description: "Berber-loop texture on PVC base — premium tactile feel with low pile height.",
    tags: ["Indoor", "Premium", "Loop-pile"],
    image: "/images/placeholders/img_whyus_quality.png",
  },
  {
    id: "pvc-005",
    name: "Scroll Border Tufted",
    category: "PVC / Vinyl Coir",
    description: "Decorative scroll-border design. Adds artisan character to entryways and corridors.",
    tags: ["Decorative", "Entryway", "Artisan"],
    image: "/images/placeholders/img_whyus_quality.png",
  },

  // Rubber Backed Coir (4)
  {
    id: "rub-001",
    name: "ProGrip Rubber-Backed Mat",
    category: "Rubber Backed",
    description: "Natural coir face with vulcanised rubber base. Stays firmly in place even on polished floors.",
    tags: ["Anti-slip", "Indoor", "Residential"],
    image: "/images/placeholders/img_whyus_biodegradable.png",
  },
  {
    id: "rub-002",
    name: "Heavy-Duty Entrance Mat",
    category: "Rubber Backed",
    description: "Thick coir pile on heavy rubber. Scrapes dirt aggressively — perfect for outdoor entrance areas.",
    tags: ["Outdoor", "Commercial", "Scraper"],
    image: "/images/placeholders/img_whyus_biodegradable.png",
  },
  {
    id: "rub-003",
    name: "Luxury Bordered Rubber-Coir",
    category: "Rubber Backed",
    description: "Elegant ribbed-border coir surface on premium rubber. Suited for villa and resort entrances.",
    tags: ["Luxury", "Resort", "Bordered"],
    image: "/images/placeholders/img_whyus_biodegradable.png",
  },
  {
    id: "rub-004",
    name: "Modular Rubber-Backed Tile",
    category: "Rubber Backed",
    description: "Interlocking coir tiles on rubber backing. Fully customisable coverage area.",
    tags: ["Modular", "Custom", "Commercial"],
    image: "/images/placeholders/img_whyus_biodegradable.png",
  },

  // 100% Rubber Mats (4)
  {
    id: "rmr-001",
    name: "Natural Rubber Scraper Mat",
    category: "100% Rubber",
    description: "Solid vulcanised natural rubber. Aggressive rib pattern for maximum mud and dirt scraping.",
    tags: ["Scraper", "Outdoor", "Rubber"],
    image: "/images/placeholders/img_whyus_quality.png",
  },
  {
    id: "rmr-002",
    name: "Ribbed Rubber Entrance Mat",
    category: "100% Rubber",
    description: "Classic ribbed natural rubber mat. Highly durable, weather-resistant, easy to clean.",
    tags: ["Ribbed", "Weather-resistant", "Entrance"],
    image: "/images/placeholders/img_whyus_quality.png",
  },
  {
    id: "rmr-003",
    name: "Anti-Fatigue Rubber Mat",
    category: "100% Rubber",
    description: "Ergonomic open-cell rubber for standing comfort. Ideal for kitchens and workstations.",
    tags: ["Anti-fatigue", "Kitchen", "Ergonomic"],
    image: "/images/placeholders/img_whyus_quality.png",
  },
  {
    id: "rmr-004",
    name: "Studded Safety Rubber Mat",
    category: "100% Rubber",
    description: "Raised stud pattern provides maximum grip. Used in industrial and wet environments.",
    tags: ["Safety", "Industrial", "Wet-area"],
    image: "/images/placeholders/img_whyus_quality.png",
  },

  // 100% Coir Mats (4)
  {
    id: "coir-001",
    name: "Natural Fibre Entrance Mat",
    category: "100% Coir",
    description: "Pure Alleppey coir, no backing. Fully biodegradable and compostable after use.",
    tags: ["Natural", "Biodegradable", "Entrance"],
    image: "/images/placeholders/img_whyus_biodegradable.png",
  },
  {
    id: "coir-002",
    name: "Basket-Weave Coir Mat",
    category: "100% Coir",
    description: "Traditional basket weave pattern. Dense and highly absorbent — ideal for wet climates.",
    tags: ["Traditional", "Absorbent", "Handwoven"],
    image: "/images/placeholders/img_whyus_biodegradable.png",
  },
  {
    id: "coir-003",
    name: "Twisted Yarn Coir Mat",
    category: "100% Coir",
    description: "Made with twisted coir yarn for extra durability. Rustic aesthetic with premium performance.",
    tags: ["Rustic", "Durable", "Twisted"],
    image: "/images/placeholders/img_whyus_biodegradable.png",
  },
  {
    id: "coir-004",
    name: "Printed Coir Doormat",
    category: "100% Coir",
    description: "Custom printed designs on natural coir. Personalised welcome for homes and boutique hotels.",
    tags: ["Custom", "Printed", "Doormat"],
    image: "/images/placeholders/img_whyus_biodegradable.png",
  },

  // Polypropylene Mats (4)
  {
    id: "pp-001",
    name: "PP Ribbed Commercial Mat",
    category: "Polypropylene",
    description: "Heavy-duty polypropylene ribbed mat. UV-stabilised and water-resistant for outdoor use.",
    tags: ["Outdoor", "UV-resistant", "Commercial"],
    image: "/images/placeholders/img_whyus_quality.png",
  },
  {
    id: "pp-002",
    name: "PP Brush Scraper Mat",
    category: "Polypropylene",
    description: "Multi-level brush fibres for aggressive scraping. Keeps interiors free of dirt and debris.",
    tags: ["Scraper", "Multi-level", "Entrance"],
    image: "/images/placeholders/img_whyus_quality.png",
  },
  {
    id: "pp-003",
    name: "PP Astroturf-Style Mat",
    category: "Polypropylene",
    description: "Grass-green astroturf aesthetic. Popular for outdoor seating areas and terraces.",
    tags: ["Outdoor", "Aesthetic", "Terrace"],
    image: "/images/placeholders/img_whyus_quality.png",
  },
  {
    id: "pp-004",
    name: "PP Lattice Open-Weave Mat",
    category: "Polypropylene",
    description: "Open-lattice weave allows easy drainage and drying. Perfect for pool-side and marine use.",
    tags: ["Pool-side", "Drainage", "Marine"],
    image: "/images/placeholders/img_whyus_quality.png",
  },
];

// ─── Export markets ───────────────────────────────────────────────────────────
export const exportMarkets = [
  { country: "United Arab Emirates", flag: "🇦🇪", since: "1983" },
  { country: "Germany",              flag: "🇩🇪", since: "1991" },
  { country: "Poland",               flag: "🇵🇱", since: "1995" },
  { country: "United Kingdom",       flag: "🇬🇧", since: "1998" },
  { country: "United States",        flag: "🇺🇸", since: "2002" },
  { country: "Australia",            flag: "🇦🇺", since: "2007" },
];
