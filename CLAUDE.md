# CLAUDE.md

The launch site for **Residual**, an iPhone app that re-sizes the meals ahead so the day lands in range. Astro 7,
static output, no client framework. It also hosts the app's share links (`/s/`), the universal-link association
file, and one Cloudflare Pages Function (`POST /api/subscribe`). This repo used to be the `site/` folder of the app
repo; references to `Residual/Info.plist`, `Residual/Theme.swift` and `MacroSolver` point at that repo, not here.

## Commands

**The default shell Node is 18; Astro needs ≥ 22.22.** Prefix commands with `fnm exec --using=.node-version` (or run
`fnm use` in an interactive shell). `npm run build` failing with "Node.js v18 is not supported" means the prefix is missing.

- `npm run dev`: dev server on http://localhost:4321
- `npm run build`: static build to `dist/`, then the help's Pagefind search index; this is the check to run after any change. The build's prerender step binds a local port, so in a sandbox it may need local binding allowed
- `npm run og`: with the dev server running, renders `/og/` to `public/og.png` via headless Chrome. Re-run after any hero or tagline change and commit the PNG.

`ASTRO_TELEMETRY_DISABLED=1` is set in `.claude/settings.json`.

## Layout

- `src/site.ts`: the facts the site repeats (name, tagline, App Store URL, support email, minimum iOS). Change copy facts here, never inline. The App Store URL and support address are pre-launch placeholders.
- `src/pages/`: `index.astro` (stacks the section components in order), `privacy.md` (Markdown, uses `layouts/Doc.astro`), `support.astro`, and `og.astro`, the unlisted social card, excluded from the sitemap in `astro.config.mjs`.
- Help (`/help/`): articles are Markdown in `src/content/help/<section>/<slug>.md` (the `help` collection in `src/content.config.ts`), sections and the home's "Common" links in `src/content/help-sections.ts`, ordering and checks in `src/lib/help.ts`. Pages are `src/pages/help/index.astro` and `src/pages/help/[section]/[slug].astro`, in `layouts/Help.astro`; components in `src/components/help/` (`Topics` draws both the sidebar and the phone disclosure). The Markdown conventions (callouts, in-app paths, screenshots, steps, tables) are two small Sätteri plugins in `src/lib/help-markdown.mjs`, scoped to the help folder, with their styles in `src/styles/help.css`. Search is Pagefind, indexed after `astro build` over `dist/client`. Read `.claude/rules/help.md` before writing an article.
- `src/components/`: one file per homepage section (`Hero`, `LiveSolve`, `Gauges`, `HowItWorks`, `Widgets`, `Promises`, `Founder`, `Questions`, `Start`, `Footer`), the features page's under `features/`, and the pieces of the app they draw: `DayRing`, `MacroBar`, `Phone` and `Shot` (real captures, light and dark), plus `Ring`, the small mark.
- `src/scripts/solve.js` + `demo-day.js`: a port of the app's `MacroSolver` (Mode B) re-balance that drives the `LiveSolve` demo. The copy in `LiveSolve` states the solver's rules (calories → protein → carbs, fat floats, ½×–2× bounds, 5 g grid), so a change to the solver must keep that copy true, and the reverse.
- `src/styles/global.css`: tokens are the app's `DesignTokens` (its `DESIGN.md` §3.1), a light and a dark value; the page follows the visitor's appearance. Data has color, controls are the one key blue, no indigo anywhere. Type is the system's: SF, SF Rounded on titles and numbers, Roundo for the wordmark alone. `src/styles/today.css` holds the working Today fragments' styles.
- `public/`: served as is. See `.claude/rules/public.md` before touching the share page, `_headers`, or `.well-known/`.
- `functions/api/subscribe.ts`: Loops newsletter sign-up for the app. See `.claude/rules/functions.md`.

## Conventions

- `.astro` components with a scoped `<style>` per component; colors, type steps, spacing and easing come from the `var(--…)` tokens in `global.css`, never raw hex in components.
- Pages read correctly without JavaScript. The `html.js` class gates hidden reveal states; `LiveSolve` is server-rendered at the "lunch as planned" state and the script only animates from there.
- Motion runs inside `@media (prefers-reduced-motion: no-preference)`; scroll-driven animation sits behind `@supports (animation-timeline: scroll())`.
- Comments explain *why* in full sentences, the way the existing files do.

## Deploy

Cloudflare Pages: build `npm run build`, output `dist`, `NODE_VERSION=22.23.3`. Secrets, the WAF rate-limit rule, and
the pre-launch checklist are in `README.md`. The production origin is `https://residual.fit` (set in `astro.config.mjs`,
`src/site.ts`, `public/robots.txt`, and the function's `SITE_ORIGIN` default); change all four together.
