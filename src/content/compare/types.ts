// The shapes of the compare pages' data (src/content/compare/). One file per app holds everything said about that
// app; rows.ts holds the questions every app answers; residual.ts holds Residual's own column. Plain TypeScript
// rather than an Astro content collection, so scripts/check-compare.mjs can read the same files with Node before
// Astro runs, and the editor checks every field as it is typed.
//
// Text fields are "rich text", a few marks and nothing else (render.ts reads them):
//   **words**              bold
//   [text](/path/)         a link
//   [product] [db, gold]   source numbers: ids from the app's own `sources`, at the end of the sentence they back
//   {roadmap}              "on the roadmap" as a link once site.roadmapUrl is set; "planned for a later version" until then

/**
 * Yes, partly, no; `none` for a description or "the app doesn't say". `partly` means the capability itself is partial;
 * a whole capability behind a paid tier is `yes`, with the tier in the short form ("Yes, with Premium"), because
 * Residual has no free tier and its own marks are all paid too. `no` needs a statement from the app, not an absence.
 */
export type Mark = 'yes' | 'partly' | 'no' | 'none';

export interface Row {
  id: string;
  label: string;
}

export interface Group {
  name: string;
  rows: Row[];
}

/** One value in the table. `short` is what the table shows; `detail` shows under it, with the sources, when its row is opened. */
export interface Cell {
  mark: Mark;
  short: string;
  /** The full sentence. A short form never claims more than this does. */
  detail?: string;
  /** Source ids from this app's `sources` that back the short form and the detail. */
  sources?: string[];
}

export interface Source {
  id: string;
  /** The page's own title, as published. */
  title: string;
  /** An https link to the page that was read. */
  url: string;
}

/** A row of the illustration: a name, and a value, or a value it changed from. */
export interface FigureRow {
  name: string;
  value?: string;
  was?: string;
  note?: string;
}

/** One side of the illustration: what happens next in one app. */
export interface FigurePanel {
  kicker: string;
  big?: { value: string; label: string };
  title?: string;
  rows?: FigureRow[];
  /** Rich text. A sentence about another app carries its source ids. */
  notes?: string[];
  /** Rich text, set at the foot of the panel. */
  lands?: string;
}

/** The difference, drawn: an optional event (the meal that went off plan), then the two apps side by side. */
export interface Figure {
  event?: { name: string; value: string; sub: string; chip: string };
  them: FigurePanel;
  us: FigurePanel;
  /** Says it is an illustration, not a screenshot. */
  caption: string;
}

export interface Competitor {
  /** A short key for anchors (`mf`); never shown. */
  key: string;
  name: string;
  /** The page's address: /compare/<slug>/. Also the data file's name. */
  slug: string;
  /** When every source was last read and every cell checked against it, as "14 November 2026". */
  checked: string;
  /** Rich text after "Pick <name> if" on the overview's "Which one is for you" card. */
  forYouIf: string;
  /** Every cell, by row id (rows.ts). */
  cells: Record<string, Cell>;
  sources: Source[];
  page: {
    /** <title>, without the site name. */
    title: string;
    description: string;
    /** Rich text: the lead under the heading. */
    summary: string;
    pickThem: string[];
    /** Rich text, small, under the "Pick <name> if…" list. */
    pickThemNote: string;
    pickResidual: string[];
    pickResidualNote: string;
    difference: { heading: string; paragraphs: string[] };
    figure: Figure;
    price: {
      main: string;
      per: string;
      more: string;
      trial: string;
      /** Where the price was read: a source id and the words the link shows. */
      sources: { id: string; label: string }[];
    };
    switching: { movingOver: string; keepingBoth: string };
    /** The close's sentence. */
    end: string;
  };
}

/** Residual's own column: its cells, and which of them point at the roadmap. */
export interface ResidualCell {
  mark: Mark;
  short: string;
  detail?: string;
  /** The detail says this is planned; show the roadmap link once site.roadmapUrl is set. */
  roadmap?: boolean;
}
