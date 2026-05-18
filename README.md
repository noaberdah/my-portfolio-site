# Noa Lapidot — Portfolio

A professional, single-page portfolio site for **Noa Lapidot** — Software Engineer.
Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, and **Lucide icons**.

The design aesthetic blends **enterprise** (clean grids, strong typography, generous whitespace) with **edgy** detail work (electric-lime + violet accents, monospaced metadata, scramble & marquee motion, cursor-aware ambient glow).

## Sections

- **Hero** — name, scrambled role, location/time, metrics strip
- **Marquee** — flowing skill ticker
- **About** — long-form summary + 4 capability pillars + language strip
- **Career Journey** — alternating timeline with periods, tags and bullet highlights
- **Skills** — 4 grouped chip clusters (Languages, Frameworks, Tools, Methodologies)
- **Projects** — selected work cards (with "Portfolio coming soon" slots)
- **Contact** — large email CTA + contact card with copy-to-clipboard

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

## Content

All copy (bio, skills, timeline, projects, contact) lives in **`src/lib/content.ts`** — edit that file to update the site.

## Design tokens

Theme variables (colors, fonts, spacing helpers) are defined in `src/app/globals.css` under `:root` and exposed to Tailwind v4 via `@theme inline`.
