// POST /api/subscribe — the newsletter sign-up behind the app's "Newsletter & product updates" and the
// site footer's "Tell me" form.
//
// An Astro server route (the one page that isn't prerendered), run by the @astrojs/cloudflare adapter in
// the site's Worker. It holds the Loops API key as a Worker secret (never in the app) and creates the
// contact in Loops. The app sends only the email it was given with explicit consent, where it came from,
// and its own version number.
//
// Create and never update: a contact that already exists (Loops answers 409) is left exactly as it is,
// so someone who unsubscribed is never re-subscribed by signing up again, and the app can't change any
// field on an existing contact. Loops' double opt-in doesn't apply to API sign-ups, which is why.
//
// Abuse protection is a Cloudflare WAF rate-limiting rule on this path, not code here (see README).
//
// Environment (Cloudflare → Workers & Pages → the site's Worker → Settings → Variables and Secrets;
// locally, .dev.vars):
//   LOOPS_API_KEY          secret, required — Loops → Settings → API
//   LOOPS_MAILING_LIST_ID  optional — the list to add the contact to (Loops → Audience → Lists)
//   SITE_ORIGIN            optional — the only browser Origin accepted (default https://residual.fit)
//
// Request:  { "email": "a@b.co", "source": "ios", "appVersion": "1.0 (12)" }   (JSON)
// Response: 200 { "ok": true } | 200 { "ok": true, "existing": true } | 400 | 403 | 405 | 415 | 502 | 503 { "error": "…" }
import type { APIRoute } from 'astro';
import { env as workerEnv } from 'cloudflare:workers';

export const prerender = false;

interface Env {
  LOOPS_API_KEY?: string;
  LOOPS_MAILING_LIST_ID?: string;
  SITE_ORIGIN?: string;
}
const env = workerEnv as unknown as Env;

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store',
      // `_headers` applies to static assets only, so the route sets this itself.
      'x-content-type-options': 'nosniff',
    },
  });

// Deliberately simple: one @, something on each side, a dot in the domain, no spaces.
const looksLikeEmail = (s: string) => s.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export const POST: APIRoute = async ({ request }) => {
  if (!env.LOOPS_API_KEY) return json(503, { error: 'Sign-up is not configured.' });

  // The app sends no Origin. A browser does, and only the site's own pages may use this.
  const origin = request.headers.get('origin');
  if (origin !== null && origin !== (env.SITE_ORIGIN || 'https://residual.fit')) {
    return json(403, { error: 'Not allowed from here.' });
  }
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.toLowerCase().startsWith('application/json')) return json(415, { error: 'Send JSON.' });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: 'Send JSON.' });
  }
  if (typeof body !== 'object' || body === null || Array.isArray(body)) return json(400, { error: 'Send JSON.' });
  const fields = body as { email?: unknown; source?: unknown; appVersion?: unknown };

  const email = typeof fields.email === 'string' ? fields.email.trim().toLowerCase() : '';
  if (!looksLikeEmail(email)) return json(400, { error: 'That email address doesn’t look right.' });
  const source = typeof fields.source === 'string' ? fields.source.slice(0, 40) : 'unknown';

  const contact: Record<string, unknown> = {
    email,
    source: `Residual ${source}`,
    userGroup: 'Residual',
  };
  if (typeof fields.appVersion === 'string' && fields.appVersion) {
    contact.residualAppVersion = fields.appVersion.slice(0, 40);
  }
  if (env.LOOPS_MAILING_LIST_ID) contact.mailingLists = { [env.LOOPS_MAILING_LIST_ID]: true };

  let res: Response;
  try {
    res = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: { authorization: `Bearer ${env.LOOPS_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify(contact),
    });
  } catch {
    return json(502, { error: 'Couldn’t sign you up right now. Try again later.' });
  }
  // 409: the contact already exists. Leave it alone and tell the app it's done.
  if (res.status === 409) return json(200, { ok: true, existing: true });
  if (!res.ok) return json(502, { error: 'Couldn’t sign you up right now. Try again later.' });
  return json(200, { ok: true });
};

// Anything but POST gets a plain 405, as the Pages Function did.
export const ALL: APIRoute = () => json(405, { error: 'Use POST.' });
