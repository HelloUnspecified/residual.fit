# CLAUDE.md

The launch site for **Residual**, an iPhone app that re-sizes the meals ahead so the day lands in range. Astro 7,
static output, no client framework. It also hosts the app's share links (`/s/`), the universal-link association
file, and one Cloudflare Pages Function (`POST /api/subscribe`). This repo used to be the `site/` folder of the app
repo; references to `Residual/Info.plist`, `Residual/Theme.swift` and `MacroSolver` point at that repo, not here.

## Commands

**The default shell Node is 18; Astro needs ≥ 22.22.** Prefix commands with `fnm exec --using=.node-version` (or run
`fnm use` in an interactive shell). `npm run build` failing with "Node.js v18 is not supported" means the prefix is missing.

- `npm run dev`: dev server on http://localhost:4321
- `npm run build`: static build to `dist/`; this is the check to run after any change (there are no tests)
- `npm run og`: with the dev server running, renders `/og/` to `public/og.png` via headless Chrome. Re-run after any hero or tagline change and commit the PNG.

`ASTRO_TELEMETRY_DISABLED=1` is set in `.claude/settings.json`.

## Layout

- `src/site.ts`: the facts the site repeats (name, tagline, App Store URL, support email, minimum iOS). Change copy facts here, never inline. The App Store URL and support address are pre-launch placeholders.
- `src/pages/`: `index.astro` (stacks the section components in order), `privacy.md` (Markdown, uses `layouts/Doc.astro`), `support.astro`, and `og.astro`, the unlisted social card, excluded from the sitemap in `astro.config.mjs`.
- `src/components/`: one file per homepage section (`Hero`, `HowItWorks`, `LiveSolve`, `Band`, `Promises`, `Questions`, `Start`, `Footer`) plus `Ring`, the site's one shape.
- `src/scripts/solve.js` + `demo-day.js`: a port of the app's `MacroSolver` (Mode B) re-balance that drives the `LiveSolve` demo. The copy in `LiveSolve` states the solver's rules (calories → protein → carbs, fat floats, ½×–2× bounds, 5 g grid), so a change to the solver must keep that copy true, and the reverse.
- `src/styles/global.css`: tokens mirror the app's `Theme.swift` dark palette. One typeface (Roundo, from Fontshare).
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
