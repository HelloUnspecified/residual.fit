---
paths:
  - src/pages/api/**
  - wrangler.jsonc
---

# Server routes (the Cloudflare Worker)

- `src/pages/api/subscribe.ts` is the site's only server route (`export const prerender = false`); every other page is prerendered. It runs in the site's Worker through `@astrojs/cloudflare`.
- It is called by the iOS app (sends no `Origin`) and by the site footer. Keep the request/response contract in its header comment current; the app depends on it.
- **Double opt-in through the form endpoint.** Sign-ups go to the Residual Loops account's form endpoint (`LOOPS_FORM_ENDPOINT`), the only Loops endpoint gated behind double opt-in. Don't switch to the contacts API: it skips the confirmation email, so anyone could subscribe someone else's address.
- Never send `userGroup` (the one field the form endpoint changes on an existing contact). Don't add update, upsert or unsubscribe paths.
- One Loops account (Residual's own) and one list. No guides, events or multi-list routing.
- No dependencies and no Node APIs beyond what Workers provide (`fetch`, `Request`, `Response`).
- `public/_headers` applies to static assets only, so every response goes through `json()`, which sets its own headers.
- Settings are plain `vars` in `wrangler.jsonc` (`LOOPS_FORM_ENDPOINT`, `LOOPS_MAILING_LIST_ID`, optional `SITE_ORIGIN`): a deploy replaces dashboard plain-text vars, so they live in the repo. Nothing here is a secret; no API key is used.
- Rate limiting: the `SUBSCRIBE_LIMITER` binding (5 a minute per IP), checked first, is best effort; Cloudflare's WAF rule on `/api/subscribe` is the dependable limit. Keep the binding check before any other work.
- `wrangler.jsonc`: never add `main` or `assets.directory` (the adapter generates them). `name` must match the Worker in the dashboard. `compatibility_date` can't be later than the bundled workerd.
- Test locally with `npm run build` then `npm run preview`. It uses the real form endpoint, so test the rejection paths with invalid input; a valid address is a real sign-up.
