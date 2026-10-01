# AZINHACK ’26

Hackathon website built with Next.js 16, React 19, TypeScript, GSAP ScrollTrigger and Lenis. Includes pinned desktop scenes, responsive mobile layouts, reduced-motion support, sponsor logos, a community gallery and the official Unstop registration link.

- Website: https://azinhack-26-build.kkiddo640.chatgpt.site
- Event: https://unstop.com/p/azinhack-2026-guru-gobind-singh-indraprastha-university-ggsipu-delhi-1763832
- Private repository: https://github.com/Pranshu640/azinhack-2026

## Run locally

```sh
npm ci
npm run dev
```

Open the local URL printed by Next.js.

## Build

```sh
npm run build
```

The project exports static files to `out/`. `npm run preview` serves that output, and `npm run typecheck` runs TypeScript separately.

## Edit the site

- `lib/event.ts`: event facts, registration and TinyFish links, gallery photos, journey and FAQs.
- `app/page.tsx`: sections, navigation, gallery viewer and GSAP timelines.
- `app/globals.css`: colours, typography, responsive layout and static texture.
- `public/gallery/`: supplied community photographs as WebP assets.
- `public/sponsors/`: original TinyFish and Docker SVG logos.
- `docs/event-content.md`: event reference and launch checklist.
- `docs/design-and-motion.md`: design and motion decisions.
- `docs/hero-art-prompt.txt`: prompt for the generated hand-and-star illustration.

To extend the gallery, add an optimized image to `public/gallery/` and append its path, accurate alt text and caption to the `gallery` array in `lib/event.ts`.

## Hosting

`.openai/hosting.json` identifies the existing Sites deployment and its static output directory. This GitHub repository stores the project source. The website is hosted at the link above. Dependencies, generated build output and local environment files are excluded from Git.
