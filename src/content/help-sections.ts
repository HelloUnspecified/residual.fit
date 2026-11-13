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
  { id: 'getting-started', name: 'Getting started', blurb: 'From a fresh install to your first logged meal.', layout: 'start' },
  { id: 'targets', name: 'Targets', blurb: 'Your daily numbers, each with a range, and the order they land in.' },
  { id: 'today', name: 'Today', blurb: 'The ring, the gauges, and the sentence that says where the day lands.' },
  { id: 'planning', name: 'Planning', blurb: 'Build a day from your own food, with AI or without it.' },
  { id: 'logging', name: 'Logging', blurb: 'Record what you actually ate. The plan is never overwritten.' },
  { id: 'closing-the-residual', name: 'Closing the residual', blurb: 'What happens when the day drifts, and how it still lands.' },
  { id: 'your-food', name: 'Your food', blurb: 'Find, scan, save and combine the foods you eat.' },
  { id: 'sharing-and-widgets', name: 'Sharing and widgets', blurb: 'Your day on the Home Screen, and a meal sent to someone else.' },
  { id: 'data-and-settings', name: 'Data and settings', blurb: 'Sync, export, units, and the subscription.' },
  { id: 'reference', name: 'Reference', blurb: 'How the numbers are worked out, and what each label means.' },
  { id: 'troubleshooting', name: 'Troubleshooting', blurb: 'Fixes for the problems people write in about.', layout: 'wide' },
];

/** The links in the help home's "Common" row, as article ids (<section>/<slug>), most asked first. The build fails
 *  on an id that has no article, so a link here never goes nowhere. Empty, the row isn't drawn. */
export const commonHelp: string[] = [
  'closing-the-residual/close-the-residual',
  'troubleshooting/food-search-problems',
  'targets/daily-targets',
];
