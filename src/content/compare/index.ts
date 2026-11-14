// The compare pages' data in one place: the rows, Residual's column, and the apps in the order the pages show them.
// To add an app: copy one app's file, fill in every row and source, and add it to `competitors` below. The
// prebuild check (scripts/check-compare.mjs) says what's missing.
import type { Competitor, Source } from './types.ts';
import { groups, rows } from './rows.ts';
import { residual } from './residual.ts';
import { macrofactor } from './macrofactor.ts';
import { cronometer } from './cronometer.ts';
import { myfitnesspal } from './myfitnesspal.ts';
import { eatthismuch } from './eatthismuch.ts';

export { groups, rows, residual };

export const competitors: Competitor[] = [macrofactor, cronometer, myfitnesspal, eatthismuch];

/** Where a source's entry sits on a page, so a source number can link to it. */
export const sourceAnchor = (app: Competitor, id: string) => `src-${app.key}-${id}`;

/**
 * The number each source shows on a page, counted in the order the apps and their sources are listed: the overview
 * numbers every app's sources in one run, an app's own page numbers just its own from 1. Nothing is numbered by hand.
 */
export function numberSources(apps: Competitor[]) {
  const numbers = new Map<string, number>();
  let n = 0;
  for (const app of apps) for (const s of app.sources) numbers.set(`${app.key}:${s.id}`, ++n);
  return {
    number: (app: Competitor, id: string) => numbers.get(`${app.key}:${id}`),
    source: (app: Competitor, id: string): Source | undefined => app.sources.find((s) => s.id === id),
  };
}

const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
/** A count in words ("seventeen questions", "four other apps"), or in figures past twenty. */
export const inWords = (n: number) => NUMBER_WORDS[n] ?? String(n);

/** The checked date the pages state: one date when every app shares it. */
export const checkedDates = () => [...new Set(competitors.map((a) => a.checked))];
