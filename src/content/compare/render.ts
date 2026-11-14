// Reads the compare data's rich text (the marks are listed in types.ts) into parts that
// components/compare/Rich.astro draws, and that the prebuild check reads to find every cited source id.
// Anything that looks like a mark but isn't one is left in the text, and the check fails on it.

export type Part =
  | { t: 'text'; s: string }
  | { t: 'strong'; s: string }
  | { t: 'link'; s: string; href: string }
  | { t: 'cites'; ids: string[] }
  | { t: 'roadmap' };

const MARKS = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)|\[([a-z0-9-]+(?:,\s*[a-z0-9-]+)*)\]|\{roadmap\}/g;

export function parse(text: string): Part[] {
  const parts: Part[] = [];
  let at = 0;
  for (const m of text.matchAll(MARKS)) {
    if (m.index > at) parts.push({ t: 'text', s: text.slice(at, m.index) });
    if (m[1] !== undefined) parts.push({ t: 'strong', s: m[1] });
    else if (m[2] !== undefined) parts.push({ t: 'link', s: m[2], href: m[3] });
    else if (m[4] !== undefined) parts.push({ t: 'cites', ids: m[4].split(',').map((id) => id.trim()) });
    else parts.push({ t: 'roadmap' });
    at = m.index + m[0].length;
  }
  if (at < text.length) parts.push({ t: 'text', s: text.slice(at) });
  return parts;
}

/** Every source id the text cites, in order. */
export const citedIds = (text: string) => parse(text).flatMap((p) => (p.t === 'cites' ? p.ids : []));

/** Text left over after the marks are read: a stray bracket, brace or asterisks means a mark was mistyped. */
export const strayMarks = (text: string) =>
  parse(text)
    .filter((p): p is { t: 'text'; s: string } => p.t === 'text')
    .map((p) => p.s)
    .join('')
    .match(/\*\*|[[\]{}]/g) ?? [];

/** The words a reader sees, with no marks or source numbers: for meta descriptions and the banned-word search. */
export const plainText = (text: string) =>
  parse(text)
    .map((p) => (p.t === 'cites' ? '' : p.t === 'roadmap' ? 'planned for a later version' : p.s))
    .join('')
    .replace(/\s+([.,;:])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();
