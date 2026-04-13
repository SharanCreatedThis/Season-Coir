# Architecture

## Overview
Season Coir is a multi-page marketing website built with Next.js 15 (App Router), TypeScript, and Tailwind CSS v4. Pages are organized using the App Router's file-based routing system.

## Scroll-Tracking System
The `JourneySection` component uses Framer Motion's `useScroll` hook with `useSpring` to create smooth, physics-based scroll animations tied to the manufacturing process timeline.

- `useScroll({ target, offset })` tracks the user's scroll position relative to the section
- `useSpring(scrollYProgress)` adds physics-based smoothing to prevent jitter
- Each of the 5 manufacturing steps (De-husking → Retting → Defibering → Fiber Separation → Weaving) pins temporarily using CSS sticky positioning
- A vertical progress line fills with golden color as the user scrolls
- Background gradients transition from warm gold to dark emerald to create a visual "day to night" narrative

## Component Architecture
```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout (fonts, metadata, analytics)
│   ├── globals.css           # Tailwind v4 tokens + keyframes
│   └── opengraph-image.tsx   # Dynamic OG image generation
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx        # Sticky nav with mobile overlay
│   │   └── Footer.tsx        # Footer with contact details
│   └── JourneySection.tsx    # Scroll-pinned manufacturing timeline
└── data/
    └── index.ts              # Static data (products, features, markets)
```

Note: Additional pages are being added as the site expands from the initial homepage build.

## Data Flow
All static content (products, features, testimonials, export markets, navigation) lives in `src/data/index.ts`. Components import from this single source of truth rather than hardcoding strings.

## Styling Strategy
- Tailwind CSS v4 for utility-first styling
- CSS custom properties (tokens) defined in `globals.css`
- Framer Motion for scroll-triggered animations and transitions
- No CSS modules or styled-components

## Performance
- Images use `next/image` with WebP optimization
- `sharp` installed for Vercel image processing
- Vercel Speed Insights tracks real-user metrics

## Deployment
Automatic deployments via Vercel on push to `main`. GitHub Actions CI runs lint + build checks before deploy.
