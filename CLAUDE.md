# TS Event Planners website

Marketing site for a Karachi, Pakistan event planner (weddings, mehndi, receptions, birthdays).
Next.js 16 App Router, `output: 'export'` (fully static), TypeScript, Tailwind v4, framer-motion.
Theme is gold and white; headline font Cormorant Garamond (500/600, italic available), body Jost.
Headings sit at weight 500 via a base rule in `globals.css` (Cormorant is too light at 400).

## Commands
- `npm run dev`: dev server on http://localhost:3000
- `npm run build`: static export to `out/`
- `npm run typecheck`
- `npm run media`: turns raw files in `media-originals/` into `public/gallery/{t,l}`, `public/videos`
  and `src/lib/media-manifest.json`. Run it after adding photos or videos.

## Layout
- `src/app`: `/`, `/about`, `/services/[slug]`, `/gallery/[category]`, `/contact`, `not-found`
- `src/lib/site.ts`: name, contact details, hours, social links (edit here only). The two phone numbers come from the
  client's Instagram bio and double as the WhatsApp number; email, address and hours are still placeholders.
- `src/lib/content.ts`: services, process steps, FAQ, testimonials, `about` copy, `team`
- `src/lib/photos.ts`: which photo number belongs to which gallery category. "Stage designs" is a second view of
  photos that are also in other categories; `alsoListed` keeps it out of "All" so nothing shows twice.
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

## Brand (from instagram.com/tseventplanners)
- Logo is a gold "TS" monogram in a gold ring on black; `Mark` (`mark.tsx`) echoes it. Instagram handle, YouTube
  and WhatsApp number live in `site.ts` (`whatsappHref()` builds wa.me links). The number is still a placeholder.
- Home hero is a full-screen slideshow of four night photos (`heroSlides` in `photos.ts`: wide on md+, tall on phones)
  that crossfade every 7s, CSS only (`.hero-slide`, 28s cycle, `--i` = slide number; z-index is animated so the
  picture never dips to black; reduced motion shows only the first). The gold foil tagline sits on it, gold on black like
  the logo, and `.hero-shade` darkens top, left and bottom so it reads on any slide. Keep slides dark night scenes.
- The header floats over the hero on `/` only (white text, no background, `--nav-hover` white); on other pages it is a
  white bar. `Header` decides with `usePathname`.
- Design motifs borrowed from top planner sites (Calder Clark, Easton): `.arch-frame` (mehrab-shaped photo with a gold
  keyline, used for the About photos), `Interlude` (full-width photo band with one italic line, parallax via
  `.parallax` where `animation-timeline` exists), and the giant tone-on-tone name in the footer (`text-wash`).
- `Highlights` (`highlights.tsx`) are the round gold-ring covers for each event type, like Instagram story highlights.
  They are the event-type navigation on the home page and the gallery. Cover photo numbers: `highlightCover`.
- Home "Recent events" is a 3x3 square grid in the style of the Instagram feed (`featuredIds` in `featured-work.tsx`),
  photos picked for the feed's look: floral stages, arches, greenery, hanging lights.
- About: `/about` (story, "How we work" habits, team) plus a "Who we are" block on the home page (`about-preview.tsx`).
  Copy is in `about` in `content.ts`, written only from what the Instagram bio says (weddings, corporate events,
  private celebrations in Karachi). Do not add founding year, team size or event counts until the client confirms.
  The team section renders nothing until `team` has real people. The bio's "more" text is behind Instagram's login;
  the public meta description has the numbers.
- Home also has "Watch our events" (`videos-preview.tsx`: v02 to v04, vertical, `preload="metadata"`) and a reviews
  pointer to Instagram's "Client Reviews" highlight until real `testimonials` exist.
- Header shows the name from 440px up and hides "About" below 360px (footer and home link to it).
- Fixed WhatsApp button bottom-right (`whatsapp-button.tsx`, z-40, under the gallery lightbox). The old marquee ticker
  was removed; the highlights row does that job.

## Dark theme ("Night")
- Follows the system setting until the visitor picks one with `ThemeToggle` (`theme-toggle.tsx`), which sets
  `<html data-theme="light|dark">` and saves it in localStorage (`ts-theme`). A tiny script in `layout.tsx` restores
  the saved choice before first paint, so there is no flash. The toggle is in the footer on every screen and in the
  header from 768px up (no room beside the four links below that).
- Colours are tokens in `globals.css` (`@theme`, overridden under "Dark theme"): `page` (background, never use
  `bg-white`), `leaf`, `ink` and `ink-soft` (text; they flip to ivory), `gold-deep` (gold text; lighter in dark),
  `line`, `wash`. `night` is the fixed brand dark and never flips: use `bg-night` for dark surfaces (hero,
  interlude, lightbox, WhatsApp button) and `text-night` for text on gold (`.gold-fill`, `.btn-gold`, `.link-dark`).
  `text-ink` on a surface that stays dark or gold would turn ivory in dark mode: use `text-white` or `text-night`.
- If a toggle's display class is set in the component and by the caller, the two fight; the component sets none.
- To remove dark mode: revert the commit that added it (it is one self-contained change).

## Motion
- No GSAP, on purpose (bundle size). CSS effects in `globals.css`: fairy lights `.bulb`, curtain `.curtain-*`,
  and the scroll-driven `.draw-line` (`animation-timeline: view()`; browsers without it show the finished state).
- Scroll reveals: `Reveal` / `RevealItem` (`reveal.tsx`, one shared IntersectionObserver + CSS `[data-reveal]`,
  fade + 28px rise, `delay` for stagger). Used on section headings, lists and gallery tiles. Content on screen when
  the page opens is shown at once (the page transition is its entrance; otherwise it animated twice); only content
  below the fold reveals on scroll. Server output is visible, so nothing depends on JavaScript. Do not nest reveals.
- Hover and press effects are one system in `globals.css` (see the comment above `.btn-gold`): `.btn-gold` / `.btn-ink`
  buttons (fill sweeps up from the bottom, 2px lift, glow), `.link-gold` / `-light` / `-dark` / `-ink` text links
  (underline drops and darkens), `.nav-link` (gold line grows from the centre), `.foot-link`, `.img-zoom` (photo
  zoom), `.wa-button`. Use these classes on new buttons and links instead of ad hoc `hover:` utilities. They are
  unlayered, so they beat Tailwind utilities on the same element. Movement is off under reduced motion.
- Page changes: `PageTransition` (`page-transition.tsx`, React `<ViewTransition>`) wraps every `page.tsx` (never the
  layout; layouts persist). CSS under "Page changes" in `globals.css`: old page fades, new one opens from the centre
  like curtains; the header is pinned via `viewTransitionName: site-header`. Hard loads get the `page-load` keyframe
  instead: `PageWrap` (`page-wrap.tsx`) marks `<html data-navigated>` on the first client navigation and the keyframe
  rule stops matching. (Do not gate it on `:active-view-transition`: the rule re-matched when the transition ended
  and the fade played a second time.) Browsers without the API just swap pages.
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
  Below 400px the header shows only the mark (the name is `sr-only`); three nav links do not fit beside both.
- `puppeteer-core` is not a project dependency; install it in a scratch folder and point it at the installed Chrome.
- Screenshots of lazy images can come out blank if taken without slow scrolling; that is the test, not the site.

## Where we stopped (continue here)
Done (14 Nov 2026): redesign after the client's Instagram (see Brand): night hero, highlight circles, square feed grid,
brand mark, WhatsApp button and social links; fonts Cormorant Garamond + Jost; scroll reveals and page transitions
(see Motion, verified in Chrome 157 with `document.getAnimations()`: old page `vt-fade`, new page `vt-curtain`).
Then About page, home "Who we are" / videos / reviews pointer, Stage designs gallery, real phone numbers from the
Instagram bio. Checked at 320 to 2560 (no overflow, header fits) and a clean `npm run build` (20 pages).
Earlier: responsive review and a clean `npm run build` (16 pages).
Also done: confetti tested in headless Chrome (canvas appears, paints, removes itself, skipped under reduced motion).
It was frame-based and ran twice as fast on 120Hz screens; now stepped by elapsed time. To test the form without
opening a mail app, use headless Chrome: submit does `window.location.href = mailto:` in real Chrome.
1. Waiting on the client: real email, address, hours (`site.ts`), confirmation that the two Instagram phone numbers are
   the ones to publish, real testimonials, the team (names, roles, photos), their story (when they started, how many
   events), the real turnaround time, and confirmation of the draft copy in `content.ts`. Not built because it needs
   facts from them: Catering and Corporate events service pages (both appear on their Instagram), venue list.
2. Favicon is `src/app/icon.svg` (gold "TS" monogram) plus `src/app/apple-icon.png` (180px, made from the SVG with
   sharp). Redo the PNG if the SVG changes. The `__next.<route>.__PAGE__.txt` prefetch requests 404 on a plain
   static server; pages still open normally. Check on the real host after deploying.
3. Optional ideas not built: Urdu/Roman Urdu copy, a larger root font size on screens
   over 1920px, a "Stage designs" gallery filter (Instagram has that highlight; it would need photos in two
   categories, which `photos.ts` does not model yet).

## Design rules
- The gold foil headline is only on the home hero. One flat gold block (`CtaBand`) per page.
- Numbered markers only where order matters (How it works). No tracked-caps eyebrow labels.
