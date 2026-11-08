# TS Event Planners website

Marketing site for a Karachi, Pakistan event planner (weddings, mehndi, receptions, birthdays).
Next.js 16 App Router, `output: 'export'` (fully static), TypeScript, Tailwind v4, framer-motion.
Theme is gold and white; headline font Gilda Display, body Hanken Grotesk.

## Commands
- `npm run dev`: dev server on http://localhost:3000
- `npm run build`: static export to `out/`
- `npm run typecheck`
- `npm run media`: turns raw files in `media-originals/` into `public/gallery/{t,l}`, `public/videos`
  and `src/lib/media-manifest.json`. Run it after adding photos or videos.

## Layout
- `src/app`: `/`, `/services/[slug]`, `/gallery/[category]`, `/contact`, `not-found`
- `src/lib/site.ts`: name, contact details, hours (all placeholders, edit here only)
- `src/lib/content.ts`: services, process steps, FAQ, testimonials
- `src/lib/photos.ts`: which photo number belongs to which gallery category
- `media-originals/`: raw uploads, not shipped. `public/gallery`, `public/videos` and
  `media-manifest.json` are generated.

## Gotchas
- Static export: no server actions or API routes. The contact form builds a `mailto:` link.
- Dynamic routes need `generateStaticParams` + `dynamicParams = false`; `params` is a Promise.
- Do not run `next build` while `next dev` is running (they share `.next`; gallery routes returned 500).
- Photo ids are sorted-index numbers (`p029` = 29) and are remembered in the manifest. Never rename them.
  Photo 18 is excluded (not an event photo); 87, 88, 107, 137 are duplicates of other photos.
- Videos are copied as-is (no ffmpeg on this machine), about 40 MB total.
- The Testimonials section renders nothing until real reviews are added to `content.ts`. Never invent reviews.
- Copy in `content.ts` and the "two working days" promise are drafts; confirm with the client.
- Read `node_modules/next/dist/docs/` before writing Next.js code (see AGENTS.md).

## Motion
- No GSAP, on purpose (bundle size). Effects are mostly CSS in `globals.css`: marquee `.ticker`, fairy lights `.bulb`,
  curtain `.curtain-*`, and scroll-driven `.reveal-img`, `.stage-open`, `.draw-line` (`animation-timeline: view()`).
  Browsers without it (Firefox for now) show the finished state, so nothing may depend on these to be visible.
- framer-motion runs under `LazyMotion strict` (`providers.tsx`): import `m`, never `motion`, or it throws.
- The home curtain plays once per session (`intro.tsx`, sessionStorage); the hero waits for it via `useIntroReady`.
- Confetti on the contact form is `src/lib/confetti.ts` (canvas, no library).
- Every effect must respect `prefers-reduced-motion`.

## Responsive
- The site must work on every device, 320px phones to 2560px screens. Mobile first; no horizontal scroll anywhere.
- Tap targets on mobile are at least 44px tall (`min-h-11`); use `inline-flex min-h-11 items-center` on text links.
- Real Chrome's window resize does not narrow the viewport, and headless Chrome stops at 500px. To test narrow
  screens use `puppeteer-core` device emulation (`setViewport` with `isMobile`) and check `scrollWidth > clientWidth`.
- Checked on the production build (`out/`): 320, 768 and 2560px plus landscape phone (844x390): no overflow, no
  small tap targets, header fits inside the 20px gutter at 320px. At 2560px the content stays 1280px wide, centred.
- Screenshots of lazy images can come out blank if taken without slow scrolling; that is the test, not the site.

## Where we stopped (continue here)
Done: responsive review and a clean `npm run build` (16 pages).
Also done: confetti tested in headless Chrome (canvas appears, paints, removes itself, skipped under reduced motion).
It was frame-based and ran twice as fast on 120Hz screens; now stepped by elapsed time. To test the form without
opening a mail app, use headless Chrome: submit does `window.location.href = mailto:` in real Chrome.
1. Waiting on the client: real email, phone, address, hours (`site.ts`), real testimonials and an About page
   (team and story), the real turnaround time, and confirmation of the draft copy in `content.ts`.
2. Favicon is `src/app/icon.svg` (gold "TS" monogram) plus `src/app/apple-icon.png` (180px, made from the SVG with
   sharp). Redo the PNG if the SVG changes. The `__next.<route>.__PAGE__.txt` prefetch requests 404 on a plain
   static server; pages still open normally. Check on the real host after deploying.
3. Optional ideas not built: route-change curtain wipe, WhatsApp button, Instagram link, Urdu/Roman Urdu copy,
   a larger root font size on screens over 1920px.

## Design rules
- The gold foil headline is only on the home hero. One flat gold block (`CtaBand`) per page.
- Numbered markers only where order matters (How it works). No tracked-caps eyebrow labels.
