// POST /api/subscribe — the newsletter sign-up behind the app's "Newsletter & product updates" and the
// site footer's "Subscribe" form.
//
// An Astro server route (the one page that isn't prerendered), run by the @astrojs/cloudflare adapter in
// the site's Worker. It passes the sign-up to the Residual Loops account's form endpoint
// (https://loops.so/docs/forms/custom-form), the one Loops endpoint gated behind double opt-in: Loops
// emails the address a confirmation link, and the contact joins the newsletter list only once they click
// it. So a sign-up can't subscribe someone else's address, and nobody is subscribed without saying yes.
//
// Existing contacts: the form endpoint can add a contact to a list but never unsubscribes anyone, and the
// only field it can change on an existing contact is userGroup, which this route never sends. Signing up
// again therefore changes nothing on the contact; Loops decides whether to send another confirmation.
//
// What reaches Loops: the email address, `source` ("Residual ios", "Residual site", …) and the list. The
// app also sends its version; that isn't forwarded.
//
// Abuse protection: the SUBSCRIBE_LIMITER binding (wrangler.jsonc) allows 5 attempts a minute per IP
// address, counted before anything else; past that the route answers 429. Cloudflare documents the
// binding as permissive (counts cached per machine), so a WAF rate-limiting rule on this path is the
// dependable limit. Loops also rate-limits its form endpoint, and its 429 is passed through.
//
// Settings (plain vars in wrangler.jsonc, so they deploy with the code):
//   LOOPS_FORM_ENDPOINT    the Residual account's form endpoint (Loops → Forms → Settings)
//   LOOPS_MAILING_LIST_ID  the newsletter list; it must be Public in Loops for the form to use it
//   SITE_ORIGIN            optional — the only browser Origin accepted (default https://residual.fit)
//
// Request:  { "email": "a@b.co", "source": "ios", "appVersion": "1.0 (12)" }   (JSON)
// Response: 200 { "ok": true } | 400 | 403 | 405 | 415 | 429 | 502 | 503 { "error": "…" }
// (`existing: true`, which the app understands, is no longer sent: the form endpoint doesn't say.)
import type { APIRoute } from 'astro';
import { env as workerEnv } from 'cloudflare:workers';

export const prerender = false;

interface RateLimit {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}
interface Env {
  LOOPS_FORM_ENDPOINT?: string;
  LOOPS_MAILING_LIST_ID?: string;
  SITE_ORIGIN?: string;
  SUBSCRIBE_LIMITER?: RateLimit;
}
const env = workerEnv as unknown as Env;

const json = (status: number, body: unknown, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store',
      // `_headers` applies to static assets only, so the route sets this itself.
      'x-content-type-options': 'nosniff',
      ...extra,
    },
  });

const TOO_MANY = 'Too many sign-ups from here. Try again in a minute.';
const FAILED = 'Couldn’t sign you up right now. Try again later.';

/** True when this caller is still under the limit. Without the binding (it is always bound when deployed)
 *  or when the limiter itself fails, the sign-up goes ahead: a limiter outage shouldn't lose a sign-up. */
async function underLimit(request: Request): Promise<boolean> {
  if (!env.SUBSCRIBE_LIMITER) return true;
  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
  try {
    return (await env.SUBSCRIBE_LIMITER.limit({ key: ip })).success;
  } catch {
    return true;
  }
}

// Deliberately simple: one @, something on each side, a dot in the domain, no spaces.
const looksLikeEmail = (s: string) => s.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export const POST: APIRoute = async ({ request }) => {
  if (!(await underLimit(request))) return json(429, { error: TOO_MANY }, { 'retry-after': '60' });
  if (!env.LOOPS_FORM_ENDPOINT) return json(503, { error: 'Sign-up is not configured.' });

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
  const fields = body as { email?: unknown; source?: unknown };

  const email = typeof fields.email === 'string' ? fields.email.trim().toLowerCase() : '';
  if (!looksLikeEmail(email)) return json(400, { error: 'That email address doesn’t look right.' });
  const source = typeof fields.source === 'string' ? fields.source.replace(/[^\w .-]/g, '').slice(0, 40) : 'unknown';

  const form = new URLSearchParams({ email, source: `Residual ${source}` });
  if (env.LOOPS_MAILING_LIST_ID) form.set('mailingLists', env.LOOPS_MAILING_LIST_ID);

  let res: Response;
  try {
    res = await fetch(env.LOOPS_FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: form.toString(),
    });
  } catch {
    return json(502, { error: FAILED });
  }
  const result = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };

  if (res.ok && result.success !== false) return json(200, { ok: true });
  if (res.status === 429) return json(429, { error: TOO_MANY }, { 'retry-after': '60' });
  // Loops' 400 is about what was sent (a bad address, a list it won't accept); its message says which.
  if (res.status === 400 && result.message) return json(400, { error: result.message });
  return json(502, { error: FAILED });
};

// Anything but POST gets a plain 405.
export const ALL: APIRoute = () => json(405, { error: 'Use POST.' });
