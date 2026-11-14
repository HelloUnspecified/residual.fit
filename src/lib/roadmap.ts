// The roadmap's types and the rules it must follow (src/content/roadmap.ts, src/pages/roadmap.astro).
// The rules are plain functions with no file access, so the prebuild check (scripts/check-roadmap.mjs), the
// tests (tests/roadmap.test.ts) and any other page that links into the roadmap can all use the same ones.
// Node runs this file directly (22.18 or newer strips the types), so keep to syntax that only needs erasing.

export const stages = ['now', 'next', 'later', 'not-planned'] as const;
export type Stage = (typeof stages)[number];

export interface RoadmapItem {
  /** The item's anchor, /roadmap/#<id>. Other pages link to it, so it never changes once published. */
  id: string;
  stage: Stage;
  title: string;
  /** One or two plain sentences for a customer. */
  text: string;
  /** A short label drawn as a pill, like "Needs Apple's review". */
  note?: string;
  link?: { href: string; label: string };
}

/** A release with no notes page of its own (1.0). Releases with notes come from src/pages/releases/. */
export interface EarlierRelease {
  version: string;
  /** "9 November 2026", or "November 2026" when only the month is known. */
  date: string;
  highlights: string[];
}

export interface Roadmap {
  /** "14 November 2026": when the roadmap last changed. Shown on the page and used as its dateModified. */
  updated: string;
  items: RoadmapItem[];
  earlierReleases: EarlierRelease[];
}

/** A release as the Shipped list draws it, whichever of the two places it came from. */
export interface Release {
  version: string;
  date: string;
  highlights: string[];
  /** The release notes page, when there is one. */
  href?: string;
}

/** The id pattern: lowercase words joined by hyphens, starting with a letter, so it is a safe, readable anchor. */
export const idPattern = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

/** The page's own sections, which links may also point at (/roadmap/#shipped). */
export const sectionIds = ['now', 'next', 'later', 'shipped', 'not-planned', 'ask'];
/** Every id the page and its layout already use. An item may not take one, or two things would share an anchor. */
const takenIds = [...sectionIds, 'news-email', 'foot-title'];

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * Reads the site's date form, "14 November 2026" (or "November 2026" when `monthOnly` is allowed), and gives
 * the ISO form for a <time datetime>: "2026-11-14" or "2026-11". Anything else, including a day the month
 * doesn't have, gives null.
 */
export function parseDay(text: unknown, { monthOnly = false } = {}): string | null {
  if (typeof text !== 'string') return null;
  const match = text.trim().match(/^(?:(\d{1,2}) )?([A-Z][a-z]+) (\d{4})$/);
  if (!match) return null;
  const [, day, monthName, year] = match;
  const month = months.indexOf(monthName) + 1;
  if (!month) return null;
  const mm = String(month).padStart(2, '0');
  if (day === undefined) return monthOnly ? `${year}-${mm}` : null;
  const date = new Date(Date.UTC(Number(year), month - 1, Number(day)));
  if (date.getUTCMonth() !== month - 1 || date.getUTCDate() !== Number(day)) return null;
  return `${year}-${mm}-${String(day).padStart(2, '0')}`;
}

/** Compares "1.0" and "1.0.1" part by part; a missing part counts as 0. */
export function compareVersions(a: string, b: string): number {
  const pa = a.split('.').map(Number), pb = b.split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d) return Math.sign(d);
  }
  return 0;
}

const versionPattern = /^\d{1,4}(\.\d{1,4}){1,3}$/;
const blank = (value: unknown) => typeof value !== 'string' || !value.trim();

/**
 * Everything wrong with a roadmap, as plain sentences; an empty list means it's fine. `pageExists` answers
 * whether a site path ("/pricing/", "/releases/1.0.1/") is a real page, so a link can't point at nothing.
 */
export function roadmapProblems(roadmap: Roadmap, pageExists: (path: string) => boolean): string[] {
  const problems: string[] = [];
  if (!parseDay(roadmap.updated)) problems.push(`"updated" must be a date like "14 November 2026", not ${JSON.stringify(roadmap.updated)}`);

  const seen = new Set<string>();
  const ids = new Set(roadmap.items.map((item) => item.id));
  roadmap.items.forEach((item, index) => {
    const name = typeof item.id === 'string' && item.id ? `"${item.id}"` : `item ${index + 1}`;
    if (typeof item.id !== 'string' || !idPattern.test(item.id)) {
      problems.push(`${name}: the id must be lowercase words joined by hyphens, like "apple-health"`);
    } else if (seen.has(item.id)) {
      problems.push(`${name}: two items have this id; each needs its own, because /roadmap/#${item.id} can lead to only one`);
    } else if (takenIds.includes(item.id) || item.id.endsWith('-title')) {
      problems.push(`${name}: the page already uses this id for a section; pick another`);
    }
    seen.add(item.id);
    if (!(stages as readonly string[]).includes(item.stage)) {
      problems.push(`${name}: unknown stage ${JSON.stringify(item.stage)}; use one of ${stages.join(', ')}`);
    }
    if (blank(item.title)) problems.push(`${name}: the title is empty`);
    if (blank(item.text)) problems.push(`${name}: the text is empty`);
    if (item.note !== undefined && blank(item.note)) problems.push(`${name}: the note is empty; leave it out instead`);
    if (item.link !== undefined) {
      if (blank(item.link.label)) problems.push(`${name}: the link has no label`);
      const why = linkProblem(item.link.href, pageExists, ids);
      if (why) problems.push(`${name}: ${why}`);
    }
  });

  const versions = new Set<string>();
  roadmap.earlierReleases.forEach((release, index) => {
    const name = typeof release.version === 'string' && release.version ? `release ${release.version}` : `earlier release ${index + 1}`;
    if (typeof release.version !== 'string' || !versionPattern.test(release.version)) problems.push(`${name}: the version must look like "1.0" or "1.0.1"`);
    if (versions.has(release.version)) problems.push(`${name}: listed twice`);
    versions.add(release.version);
    if (!parseDay(release.date, { monthOnly: true })) problems.push(`${name}: the date must look like "9 November 2026" or "November 2026"`);
    problems.push(...highlightProblems(name, release.highlights));
  });
  return problems;
}

/** Why a link can't be used, or null when it can. Site links must reach a page; mailto and https are left alone. */
export function linkProblem(href: unknown, pageExists: (path: string) => boolean, itemIds = new Set<string>()): string | null {
  if (typeof href !== 'string' || !href.trim()) return 'the link has no href';
  if (/^(https:|mailto:)/.test(href)) return null;
  if (!href.startsWith('/')) return `the link ${JSON.stringify(href)} must start with "/", "https:" or "mailto:"`;
  const url = new URL(href, 'https://residual.fit');
  if (!pageExists(url.pathname)) return `the link ${JSON.stringify(href)} goes to a page that doesn't exist`;
  if (url.pathname === '/roadmap/' && url.hash) {
    const anchor = decodeURIComponent(url.hash.slice(1));
    if (!itemIds.has(anchor) && !sectionIds.includes(anchor)) return `the link ${JSON.stringify(href)} names no item or section on the roadmap`;
  }
  return null;
}

function highlightProblems(name: string, highlights: unknown): string[] {
  if (!Array.isArray(highlights) || highlights.length === 0) return [`${name}: it needs "highlights", a list of the release's headline changes`];
  if (highlights.length > 4) return [`${name}: ${highlights.length} highlights is a lot for a row; keep it to the two to four that matter most`];
  return highlights.some(blank) ? [`${name}: one of its highlights is empty`] : [];
}

/**
 * Reads the parts of a Markdown page's frontmatter the roadmap uses: top-level `key: value` lines and one
 * level of `- item` lists. It is not a YAML parser. It refuses the one thing that trips YAML in a plain list
 * item, a ": " (which YAML reads as a key), unless the item is quoted, so what this reads is what Astro reads.
 */
export function readFrontmatter(markdown: string): { data: Record<string, string | string[]>; problems: string[] } {
  const data: Record<string, string | string[]> = {};
  const problems: string[] = [];
  const block = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!block) return { data, problems: ['it has no frontmatter'] };
  const unquote = (value: string) => {
    const quoted = value.match(/^(['"])(.*)\1$/);
    return quoted ? (quoted[1] === "'" ? quoted[2].replace(/''/g, "'") : quoted[2].replace(/\\"/g, '"')) : value;
  };
  let list: string[] | null = null;
  for (const line of block[1].split(/\r?\n/)) {
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && list) {
      const value = item[1].trim();
      if (!/^['"]/.test(value) && /:\s/.test(value)) problems.push(`the list item "${value}" has a ": " in it; put the item in quotes`);
      list.push(unquote(value));
      continue;
    }
    const pair = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (!pair) continue;
    const [, key, value] = pair;
    if (value.trim() === '') {
      list = [];
      data[key] = list;
    } else {
      list = null;
      data[key] = unquote(value.trim());
    }
  }
  return { data, problems };
}

/**
 * A release notes page (src/pages/releases/<version>.md) as a Shipped row, with what's wrong with it. The
 * version is the file's name. The date is `released`, or `updated` when the notes haven't changed since the
 * release; add `released` the first time a page's notes are edited later, so the row keeps the release's date.
 */
export function releaseFromNotes(file: string, frontmatter: Record<string, unknown>): { release: Release; problems: string[] } {
  const version = file.replace(/^.*\//, '').replace(/\.md$/, '');
  const name = `src/pages/releases/${version}.md`;
  const problems: string[] = [];
  if (!versionPattern.test(version)) problems.push(`${name}: the file's name must be the version, like 1.0.1.md`);
  const date = (frontmatter.released ?? frontmatter.updated) as string | undefined;
  if (!parseDay(date)) problems.push(`${name}: it needs a release date, "released" or "updated", like "9 November 2026"`);
  problems.push(...highlightProblems(name, frontmatter.highlights));
  const highlights = Array.isArray(frontmatter.highlights) ? (frontmatter.highlights as string[]) : [];
  return { release: { version, date: date ?? '', highlights, href: `/releases/${version}/` }, problems };
}

/** Every release, newest first: the notes pages and the earlier releases that have none. */
export function shipped(fromNotes: Release[], earlier: EarlierRelease[]): Release[] {
  return [...fromNotes, ...earlier].sort((a, b) => compareVersions(b.version, a.version));
}

/** A version with notes must not also be listed in the roadmap's earlierReleases, or it would show twice. */
export function shippedProblems(fromNotes: Release[], earlier: EarlierRelease[]): string[] {
  const withNotes = new Set(fromNotes.map((r) => r.version));
  return earlier
    .filter((r) => withNotes.has(r.version))
    .map((r) => `release ${r.version}: it has a notes page now, so take it out of earlierReleases in src/content/roadmap.ts`);
}
