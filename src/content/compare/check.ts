// The rules the compare data must keep, as one function so scripts/check-compare.mjs runs it before every build and
// tests/compare.test.ts can feed it broken data. It returns plain sentences: what is wrong, where, and what to do.
import type { Competitor, ResidualCell, Row } from './types.ts';
import { NOT_STATED } from './rows.ts';
import { citedIds, strayMarks } from './render.ts';

/** Past this many days since an app was checked, the build fails; from WARN_DAYS it warns. */
export const STALE_DAYS = 90;
export const WARN_DAYS = 75;
/** The phone switcher's CSS (CompareTable.astro) has a rule for each of this many apps. */
export const MAX_COMPETITORS = 6;

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MARKS = ['yes', 'partly', 'no', 'none'];
/** A short form that is nothing but a paid tier's name ("Premium", "with Gold", "Premium only"). */
const PAID_TIER = /^(yes,? )?(with |on )?(premium\+?|gold|pro|plus|paid( tier)?)( only)?$/i;

/** "14 November 2026" as a UTC date, or null if it isn't one. */
export function parseChecked(text: string): Date | null {
  const m = /^(\d{1,2}) ([A-Z][a-z]+) (\d{4})$/.exec(text ?? '');
  if (!m) return null;
  const month = MONTHS.indexOf(m[2]);
  if (month < 0) return null;
  const date = new Date(Date.UTC(Number(m[3]), month, Number(m[1])));
  return date.getUTCDate() === Number(m[1]) ? date : null; // 31 November rolls over; refuse it
}

const dayNumber = (d: Date) => Math.floor(d.getTime() / 86_400_000);
const todayUTC = (today: Date) => new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));

export interface CheckInput {
  rows: Row[];
  residualCells: Record<string, ResidualCell>;
  competitors: Competitor[];
  today: Date;
}

export function checkCompare({ rows, residualCells, competitors, today }: CheckInput) {
  const errors: string[] = [];
  const warnings: string[] = [];
  const rowIds = new Set(rows.map((r) => r.id));

  const coversRows = (where: string, cells: Record<string, unknown>) => {
    for (const r of rows) if (!(r.id in cells)) errors.push(`${where}: no cell for the row "${r.id}" (${r.label}). Add one; use short: '${NOT_STATED}' if the app doesn't say.`);
    for (const id of Object.keys(cells)) if (!rowIds.has(id)) errors.push(`${where}: a cell for "${id}", which isn't a row in src/content/compare/rows.ts. Remove it, or add the row there first.`);
  };
  const marksRead = (where: string, text: string | undefined) => {
    if (!text) return;
    const stray = strayMarks(text);
    if (stray.length) errors.push(`${where}: "${stray.join('')}" isn't a mark the pages read (see types.ts). Check the brackets in: ${text}`);
  };

  coversRows('src/content/compare/residual.ts', residualCells);
  for (const [id, cell] of Object.entries(residualCells)) {
    if (!MARKS.includes(cell.mark)) errors.push(`residual.ts, row "${id}": mark must be yes, partly, no or none, not "${cell.mark}".`);
    if (!cell.short?.trim()) errors.push(`residual.ts, row "${id}": the short form is empty.`);
    marksRead(`residual.ts, row "${id}"`, cell.detail);
    if (cell.detail && citedIds(cell.detail).length) errors.push(`residual.ts, row "${id}": Residual's column cites no sources; take out the source ids.`);
  }

  if (competitors.length > MAX_COMPETITORS) errors.push(`${competitors.length} apps, but the phone switcher in src/components/compare/CompareTable.astro has rules for ${MAX_COMPETITORS}. Add a rule there and raise MAX_COMPETITORS.`);
  const seen = new Map<string, string>();
  for (const app of competitors) {
    for (const [field, value] of [['key', app.key], ['slug', app.slug]] as const) {
      if (!/^[a-z0-9-]+$/.test(value ?? '')) errors.push(`${app.name}: ${field} "${value}" must be lowercase letters, digits and hyphens.`);
      if (seen.has(`${field}:${value}`)) errors.push(`${app.name}: ${field} "${value}" is already used by ${seen.get(`${field}:${value}`)}.`);
      seen.set(`${field}:${value}`, app.name);
    }
  }

  for (const app of competitors) {
    const file = `src/content/compare/${app.slug}.ts`;
    const where = `${app.name} (${file})`;
    const defined = new Set<string>();
    const used = new Set<string>();

    for (const s of app.sources) {
      if (defined.has(s.id)) errors.push(`${where}: two sources have the id "${s.id}".`);
      defined.add(s.id);
      if (!s.title?.trim()) errors.push(`${where}: source "${s.id}" has no title. Use the page's own title.`);
      let url: URL | null = null;
      try { url = new URL(s.url); } catch { /* reported below */ }
      if (!url || url.protocol !== 'https:') errors.push(`${where}: source "${s.id}" needs an https link, not ${JSON.stringify(s.url)}.`);
    }
    const cite = (place: string, ids: string[]) => {
      for (const id of ids) {
        used.add(id);
        if (!defined.has(id)) errors.push(`${where}, ${place}: cites "${id}", which isn't one of its sources (${[...defined].join(', ')}). Fix the id, or add the source with its title and link.`);
      }
    };
    const rich = (place: string, text: string | undefined) => {
      if (!text) return;
      marksRead(`${where}, ${place}`, text);
      cite(place, citedIds(text));
    };

    coversRows(where, app.cells);
    for (const [id, cell] of Object.entries(app.cells)) {
      const place = `row "${id}"`;
      if (!MARKS.includes(cell.mark)) errors.push(`${where}, ${place}: mark must be yes, partly, no or none, not "${cell.mark}".`);
      if (!cell.short?.trim()) errors.push(`${where}, ${place}: the short form is empty.`);
      // Half a mark is for a capability that is itself partial. A paid tier alone earns a full mark with the tier in
      // the words, because Residual has no free tier and its own marks are all paid too.
      if (cell.mark === 'partly' && PAID_TIER.test(cell.short.trim())) {
        errors.push(`${where}, ${place}: “${cell.short}” is marked partly only for its tier. Mark it yes and name the tier in the short form ("Yes, with Premium"); partly is for a capability that is itself partial.`);
      }
      rich(place, cell.detail);
      cite(place, cell.sources ?? []);
      // "Not stated" with no mark and nothing to open is the one value that needs no source: the app doesn't say.
      const factual = cell.mark !== 'none' || cell.short.trim() !== NOT_STATED || Boolean(cell.detail);
      if (factual && !(cell.sources?.length)) {
        errors.push(`${where}, ${place}: “${cell.short}” has no source. Add the id of the page that says it, or make the cell short: '${NOT_STATED}' with no mark.`);
      }
    }

    const p = app.page;
    rich('forYouIf', app.forYouIf);
    rich('page.summary', p.summary);
    p.pickThem.forEach((t, i) => rich(`page.pickThem[${i}]`, t));
    rich('page.pickThemNote', p.pickThemNote);
    p.pickResidual.forEach((t, i) => rich(`page.pickResidual[${i}]`, t));
    rich('page.pickResidualNote', p.pickResidualNote);
    p.difference.paragraphs.forEach((t, i) => rich(`page.difference.paragraphs[${i}]`, t));
    for (const side of ['them', 'us'] as const) {
      p.figure[side].notes?.forEach((t, i) => rich(`page.figure.${side}.notes[${i}]`, t));
      rich(`page.figure.${side}.lands`, p.figure[side].lands);
    }
    if (!/illustration/i.test(p.figure.caption)) errors.push(`${where}: the figure's caption must say it is an illustration, not a screenshot.`);
    rich('page.switching.movingOver', p.switching.movingOver);
    rich('page.switching.keepingBoth', p.switching.keepingBoth);
    if (!p.price.sources.length) errors.push(`${where}: the price card names no source. Prices are shown with where they were read.`);
    cite('page.price', p.price.sources.map((s) => s.id));

    for (const id of defined) if (!used.has(id)) warnings.push(`${where}: source "${id}" isn't cited anywhere. Cite it or remove it.`);

    const checked = parseChecked(app.checked);
    if (!checked) {
      errors.push(`${where}: checked is "${app.checked}"; write the date like "14 November 2026".`);
      continue;
    }
    const age = dayNumber(todayUTC(today)) - dayNumber(checked);
    const redo = `Re-check it: open each of its sources, compare what they say with its cells and page text, correct anything that changed (or remove what no source supports any more), then set checked to the day you did it, in ${file}. .claude/rules/compare.md has the steps.`;
    if (age < 0) errors.push(`${where}: checked is ${app.checked}, which is in the future. Set it to the day the sources were last read.`);
    else if (age > STALE_DAYS) errors.push(`${where}: last checked ${app.checked}, ${age} days ago (the limit is ${STALE_DAYS}). ${redo}`);
    else if (age >= WARN_DAYS) warnings.push(`${where}: last checked ${app.checked}, ${age} days ago; the build fails after ${STALE_DAYS}. ${redo}`);
  }

  return { errors, warnings };
}
