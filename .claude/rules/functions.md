---
paths:
  - functions/**
---

# Pages Functions

- `functions/api/subscribe.ts` is called by the iOS app (sends no `Origin`) and by the site's own pages. Keep the request/response contract in its header comment current; the app depends on it.
- **Create, never update.** A Loops 409 (contact exists) returns `{ ok: true, existing: true }` and leaves the contact untouched, so an unsubscribed person is never re-subscribed. Don't add an update or upsert path.
- No dependencies and no Node APIs; it runs on the Workers runtime (`fetch`, `Request`, `Response`).
- Pages `_headers` don't apply here, so every response goes through `json()`, which sets its own headers.
- Rate limiting is a Cloudflare WAF rule (see README), not code.
- Secrets come from `env` (`LOOPS_API_KEY`, `LOOPS_MAILING_LIST_ID`, `SITE_ORIGIN`). Never log the key or echo request bodies back.
- Test locally with `npx wrangler pages dev dist` after a build; local secrets go in `.dev.vars` (gitignored).
