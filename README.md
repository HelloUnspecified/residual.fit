# Residual site

The launch site for Residual, and the domain its share links point to. Built with [Astro](https://astro.build)
(static output, no server code, no data). Three pages (`/`, `/privacy/`, `/support/`) plus the static share
page and the universal-link association file in `public/`.

```
  src/pages/            index, privacy, support, 404 (and og, the social card, unlisted)
  src/components/       Hero, HowItWorks, LiveSolve, Band, Promises, Questions, Start, Footer, Ring
  src/content/faq.ts    the home page's questions: feeds both the visible cards and the FAQPage structured data
  src/scripts/solve.js  a small port of MacroSolver's re-balance for the page's live demo
  src/scripts/demo-day.js  the demo's targets, logged breakfast, lunch, and meals ahead
  src/assets/shots/     real simulator screenshots (dark appearance) the page shows
  src/site.ts           the App Store id, titles, description, feature list: change these before launch
  public/fonts/         Roundo, self-hosted (official Fontshare files, unmodified; the ITF Free Font License allows it)
  public/llms.txt       a plain summary of Residual for answer engines and AI assistants; keep it true to the app
  public/.well-known/apple-app-site-association   tells iOS that /s links open Residual
  public/s/index.html   the share page, for when the app isn't installed (its script is public/s/share.js)
  public/_headers       serves the association file as JSON, and the security headers (Cloudflare Pages / Netlify)
  functions/api/subscribe.ts  POST /api/subscribe: the app's newsletter sign-up, forwarded to Loops
```

## Run it

Needs Node 22.22 or newer (`.node-version` pins one; `fnm use` picks it up).

```
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run og        # with the dev server running: renders public/og.png (needs Google Chrome)
```

Set `ASTRO_TELEMETRY_DISABLED=1` in the shell to keep Astro from phoning home.

## Deploy

Cloudflare Pages: create a project from this repo (root directory: the repo root), build command `npm run build`,
output directory `dist`, and `NODE_VERSION` = `22.23.3`. Add the custom domain. Netlify and GitHub Pages work
the same way (the `.nojekyll` in `public/` keeps `.well-known` published on GitHub Pages).

Then, once:

1. **Set the domain in `astro.config.mjs`** (`site`) and in `src/site.ts`. The sitemap, canonical links and
   the social card use it.
2. **Check the association file:** `curl -i https://<domain>/.well-known/apple-app-site-association` should
   return `200` with `content-type: application/json` and no redirect. Apple's CDN caches it, so a fix can
   take up to a day to reach phones.
3. **Newsletter sign-up** (`functions/api/subscribe.ts`, a Pages Function at `POST /api/subscribe`): add the
   secret `LOOPS_API_KEY` (Loops → Settings → API) and, to put sign-ups on a list, `LOOPS_MAILING_LIST_ID`, under
   Settings → Variables and Secrets. `SITE_ORIGIN` is optional: the one browser Origin the function accepts
   (default `https://residual.fit`; the app sends none). Then set `NEWSLETTER_URL` = `https://<domain>/api/subscribe`
   in the app repo's `Residual/Info.plist`; until it is set, the app's sign-up is hidden (DEBUG builds show it with a note).
   Check it: `curl -X POST https://<domain>/api/subscribe -H 'content-type: application/json' -d '{"email":"you@example.com","source":"curl"}'`.
   - **Required: a rate limit.** The function has none of its own. In the Cloudflare dashboard for the
     domain: Security → WAF → Rate limiting rules → create one with URI Path equals `/api/subscribe`,
     3 requests per 10 seconds per IP, action Block for 10 seconds. One rule is available on the Free plan.
   - The endpoint creates the contact and never updates it: Loops' double opt-in doesn't apply to API
     sign-ups, so an existing contact (including someone who unsubscribed) is left untouched and the
     function answers `{"ok":true,"existing":true}`.
4. **Point the app at it** (in the Residual app repo): `Residual/Info.plist` → `SHARE_LINK_BASE` = `https://<domain>/s/`,
   and `Residual/Residual.entitlements` → `com.apple.developer.associated-domains` = `applinks:<domain>`
   (for a development build, `applinks:<domain>?mode=developer`). Turn on Associated Domains for the App ID
   `io.unspecified.residual` in the developer portal if Xcode's automatic signing doesn't.

## Before launch

- `src/site.ts`: set `appStoreId` to the app's numeric Apple ID. That switches every button to the real store
  page and turns on the Safari Smart App Banner and the App Store link in the structured data.
- Once the price is set, add an `offers` block (price, currency) to the `MobileApplication` data in
  `src/pages/index.astro`, and the number to the price answer in `src/content/faq.ts` and `public/llms.txt`.
- Search and structured data: check the home page with Google's Rich Results Test and submit
  `/sitemap-index.xml` in Google Search Console and Bing Webmaster Tools.
- `npm run og` after any hero change, and commit `public/og.png`.

## If you change the team or bundle id

Update `appIDs` in `public/.well-known/apple-app-site-association` to `<TEAM_ID>.<bundle id>` (now
`5ECYNEC6SR.io.unspecified.residual`).
