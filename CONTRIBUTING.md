# Contributing to Season Coir Website

Thank you for your interest in contributing!

## Development Setup

1. Clone the repository
```bash
   git clone https://github.com/SharanCreatedThis/Season-Coir.git
   cd Season-Coir
```

2. Install dependencies
```bash
   npm install
```

3. Start development server
```bash
   npm run dev
```

4. Open http://localhost:3000

## Branch Naming

- `feat/description` — new features
- `fix/description` — bug fixes
- `style/description` — visual changes
- `perf/description` — performance improvements
- `docs/description` — documentation updates

## Commit Messages

Use conventional commits:
- `feat: add new section`
- `fix: resolve mobile layout issue`
- `style: improve typography`
- `perf: optimize image loading`
- `docs: update README`

## Code Style

- TypeScript for all components
- Tailwind CSS for styling
- Framer Motion for animations
- Components in `src/components/`

## Deployment

Production deployments happen automatically via Vercel on push to `main`.
