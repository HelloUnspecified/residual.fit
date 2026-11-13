// The help's sections, in the order the help home and the topic list show them. An article lives in the folder
// named by its section's id (src/content/help/<id>/<slug>.md), and the build fails on a folder that isn't listed
// here (src/lib/help.ts), so renaming or reordering the outline is a change to this one file plus the folders.
// A section with no articles yet stays out of the help home and the topic list until its first one lands.

export interface HelpSection {
  /** The folder name and the URL segment: /help/<id>/<slug>/. */
  id: string;
  name: string;
  /** One line under the section's name on the help home. */
  blurb: string;
  /** How the help home draws it: `start` as numbered tiles across the grid, `wide` across the grid with its
   *  rows in two columns, `list` as a card in the grid. */
  layout?: 'start' | 'list' | 'wide';
}

export const helpSections: HelpSection[] = [
  { id: 'getting-started', name: 'Getting started', blurb: 'What Residual does, the first run, and a practice day where nothing is saved.', layout: 'start' },
  { id: 'targets', name: 'Targets', blurb: 'Your daily numbers, each with a range, and the order they land in.' },
  { id: 'today', name: 'Today', blurb: 'The ring and its gauges, days ahead, copying meals, and the grocery list.' },
  { id: 'planning', name: 'Planning', blurb: 'Build a day from your own food, with AI or without it.' },
  { id: 'logging', name: 'Logging', blurb: 'Record what you actually ate, and unlock a meal to change it. The plan is never overwritten.' },
  { id: 'closing-the-residual', name: 'Closing the residual', blurb: 'What happens when the day drifts, and how it still lands.' },
  { id: 'your-food', name: 'Your food', blurb: 'Find, scan and match foods, keep a pantry, save meals and recipes, and rule foods out.' },
  { id: 'sharing-and-widgets', name: 'Sharing and widgets', blurb: 'Your day on the Home Screen, and a meal sent to someone else.' },
  { id: 'data-and-settings', name: 'Data and settings', blurb: 'Residual Plus, sync, export, and everything in More.' },
  { id: 'reference', name: 'Reference', blurb: 'How calories, units and re-sizing are worked out.' },
  { id: 'troubleshooting', name: 'Troubleshooting', blurb: 'Fixes for the problems people write in about.', layout: 'wide' },
];

/** The links in the help home's "Common" row, most asked first: an article id (<section>/<slug>) and a short label,
 *  since article titles are too long to sit five to a line. The build fails on an id that has no article, so a link
 *  here never goes nowhere. Empty, the row isn't drawn. */
export const commonHelp: { id: string; label: string }[] = [
  { id: 'closing-the-residual/close-the-residual', label: 'Close the residual' },
  { id: 'data-and-settings/residual-plus', label: 'Residual Plus and the free trial' },
  { id: 'logging/locked-meals-and-days', label: 'Unlock a meal' },
  { id: 'data-and-settings/sync-export-delete', label: 'Sync and export' },
  { id: 'troubleshooting/food-search-problems', label: 'Food search problems' },
];
