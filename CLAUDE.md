# CLAUDE.md

The launch site for **Residual**, an iPhone app that re-sizes the meals ahead so the day lands in range. Astro 7,
static output, no client framework. It also hosts the app's share links (`/s/`), the universal-link association
file, and one Cloudflare Pages Function (`POST /api/subscribe`). This repo used to be the `site/` folder of the app
repo; references to `Residual/Info.plist`, `Residual/Theme.swift` and `MacroSolver` point at that repo, not here.

## Commands

**The default shell Node is 18; Astro needs ≥ 22.22.** Prefix commands with `fnm exec --using=.node-version` (or run
`fnm use` in an interactive shell). `npm run build` failing with "Node.js v18 is not supported" means the prefix is missing.

- `npm run dev`: dev server on http://localhost:4321
- `npm run build`: static build to `dist/`, then the help's Pagefind search index; this is the check to run after any change. Its `prebuild` runs `scripts/check-app-version.mjs`, `scripts/check-roadmap.mjs` and `scripts/check-compare.mjs` first. The build's prerender step binds a local port, so in a sandbox it may need local binding allowed
- `npm test`: the tests in `tests/` (the newsletter's list choice, the roadmap's rules, the compare check's rules)
- `npm run og`: with the dev server running, renders `/og/` to `public/og.png` via headless Chrome. Re-run after any hero or tagline change and commit the PNG.

`ASTRO_TELEMETRY_DISABLED=1` is set in `.claude/settings.json`.

## Layout

- `src/site.ts`: the facts the site repeats (name, tagline, App Store URL, support email, minimum iOS, plans, `roadmapUrl`). Change copy facts here, never inline. The App Store URL and support address are pre-launch placeholders. `roadmapUrl` is the roadmap's address, which the compare pages link to; `null` turns those links back into plain text.
- `src/pages/`: `index.astro` (stacks the section components in order), `privacy.md` (Markdown, uses `layouts/Doc.astro`), `support.astro` (the contact page: the support address, then links into the help; it repeats no article), `roadmap.astro`, `releases/<version>.md` (release notes), and `og.astro`, the unlisted social card, excluded from the sitemap in `astro.config.mjs`.
- The roadmap (`/roadmap/`): items live in `src/content/roadmap.ts` (stable `id`s, stages now, next, later, not-planned), drawn by `src/components/roadmap/`. Shipped is read from each release notes page's frontmatter (`highlights`, and `released` or `updated`); 1.0, which has no notes, is listed in the data file. `scripts/check-roadmap.mjs` runs in `prebuild` with the rules in `src/lib/roadmap.ts` (tested in `tests/roadmap.test.ts`). See `.claude/rules/roadmap.md` before changing any of it.
- Help (`/help/`): the user manual, 30 articles in eleven sections, checked against the app at 1.1.0. Articles are Markdown in `src/content/help/<section>/<slug>.md` (the `help` collection in `src/content.config.ts`), sections and the home's "Common" links in `src/content/help-sections.ts`, ordering and checks in `src/lib/help.ts`. Pages are `src/pages/help/index.astro` and `src/pages/help/[section]/[slug].astro`, in `layouts/Help.astro`; components in `src/components/help/` (`Topics` draws both the sidebar and the phone disclosure). The Markdown conventions (callouts, in-app paths, screenshots, steps, tables) are two small Sätteri plugins in `src/lib/help-markdown.mjs`, scoped to the help folder, with their styles in `src/styles/help.css`. Search is Pagefind, indexed after `astro build` over `dist/client`. Read `.claude/rules/help.md` before writing an article.
- `src/pages/compare/[...slug].astro`: `/compare/` and `/compare/<slug>/`, Residual beside MacroFactor, Cronometer, MyFitnessPal and Eat This Much, drawn by `src/components/compare/` from the data in `src/content/compare/` (one file per app, `rows.ts`, `residual.ts`). `scripts/check-compare.mjs` checks that data before every build (sources, rows, dates no older than 90 days). See `.claude/rules/compare.md` before changing anything there; the tone is "different, not better".
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
