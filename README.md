# Season Coir — Official Website

Premium eco-luxury marketing website for **Season Coir Exports**, a B2B coir mat manufacturer and exporter from Alleppey, Kerala, established in 1980.

**Live site → [seasoncoir.vercel.app](https://seasoncoir.vercel.app)**

![Season Coir Website Preview](https://seasoncoir.vercel.app/opengraph-image)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| 3D | React Three Fiber + Three.js |
| Analytics | Vercel Speed Insights |
| Deployment | Vercel |

---

## Features

- **Scrollytelling hero** — CSS-first instant-appear animations with scroll-linked Framer Motion transforms
- **3D coconut scene** — interactive Three.js / React Three Fiber model in the hero
- **Product catalogue** — 21 products across 5 categories with animated filter tabs
- **Manufacturing journey** — immersive scroll-tracked process timeline with glowing progress line
- **Global exports** — six partner country cards with staggered reveal
- **Contact form** — B2B enquiry form with validation
- **Fully responsive** — mobile-first layout across all breakpoints

---

## Getting Started

### Prerequisites

- Node.js v24+
- npm

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

---

## Deployment

The site is deployed on Vercel. To deploy from the CLI:

```bash
npm run build
npx vercel --prod
```

Or connect the repository to a Vercel project for automatic preview and production deployments on push.

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Home page — all homepage sections composed here
│   ├── layout.tsx        # Root layout (fonts, metadata, Navbar, Footer)
│   └── globals.css       # Tailwind v4 theme tokens + global keyframe animations
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Fixed top nav with dropdown menus + mobile overlay
│   │   └── Footer.tsx            # Site footer with links and contact details
│   ├── JourneySection.tsx        # Scroll-pinned manufacturing process timeline
│   └── CoconutScrollEffect.tsx   # Three.js / R3F 3D coconut hero component
└── data/
    └── index.ts          # All static data: products, features, testimonials, export markets
```

---

## Credits

- **Built by** Sharan M ([@sharan.created.this](https://www.instagram.com/sharan.created.this))
- **Client** Season Coir Exports, Alleppey, Kerala

---

## License

MIT © 2026 Sharan M — see [LICENSE](./LICENSE) for details.
