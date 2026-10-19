---
paths:
  - src/pages/api/**
  - wrangler.jsonc
---

# Server routes (the Cloudflare Worker)

- `src/pages/api/subscribe.ts` is the site's only server route (`export const prerender = false`); every other page is prerendered. It runs in the site's Worker through `@astrojs/cloudflare`.
- It is called by the iOS app (sends no `Origin`) and by the site footer. Keep the request/response contract in its header comment current; the app depends on it.
- **Create, never update.** A Loops 409 (contact exists) returns `{ ok: true, existing: true }` and leaves the contact untouched, so an unsubscribed person is never re-subscribed. Don't add an update or upsert path.
- One Loops account (Residual's own) and at most one list. No guides, events or multi-list routing.
- No dependencies and no Node APIs beyond what Workers provide (`fetch`, `Request`, `Response`).
- `public/_headers` applies to static assets only, so every response goes through `json()`, which sets its own headers.
- Rate limiting is a Cloudflare WAF rule (see README), not code.
- Secrets come from `env` in `cloudflare:workers` (`LOOPS_API_KEY`, `LOOPS_MAILING_LIST_ID`, `SITE_ORIGIN`). Never log the key or echo request bodies back.
- `wrangler.jsonc`: never add `main` or `assets.directory` (the adapter generates them). `name` must match the Worker in the dashboard. `compatibility_date` can't be later than the bundled workerd.
- Test locally: put a throwaway `LOOPS_API_KEY` in `.dev.vars` (gitignored), `npm run build`, then `npm run preview`. Delete it after.
