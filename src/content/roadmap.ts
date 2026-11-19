// The public roadmap, residual.fit/roadmap/. The page draws everything from this file, in this order, and
// `npm run build` checks it first (scripts/check-roadmap.mjs). .claude/rules/roadmap.md has the wording rules.
//
// - To move an item, change its `stage` and put it where it belongs in the list. Keep its `id`: other pages
//   link to /roadmap/#<id>, so an id never changes once it's published.
// - To add one, give it a new id (lowercase words joined by hyphens), a title and one or two plain sentences.
//   No dates, no prices, no vendor names. "not-planned" needs the owner's say-so.
// - When something ships, write its release notes (src/pages/releases/<version>.md, with `highlights` in the
//   frontmatter): Shipped reads them from there. Then take its item out of this list and bump `updated`.
// - A stage with no items draws nothing at all, heading included.
import type { Roadmap } from '../lib/roadmap.ts';

export const roadmap: Roadmap = {
  updated: '18 November 2026',

  items: [
    // Next: decided, and up after Now.
    {
      id: 'apple-health',
      stage: 'next',
      title: 'Apple Health',
      text: 'Residual will work with Apple Health. I’m still working out exactly how, and this entry will say once I have.',
    },
    {
      id: 'fiber-goal',
      stage: 'next',
      title: 'A fiber goal',
      text: 'Set a daily fiber goal and see your fiber on the day and, as an estimate, in AI plans, with net carbs too if you count them. Fiber is tracked and shown; the meals ahead are still re-sized for calories, protein, carbs and fat.',
    },
    {
      id: 'food-sources',
      stage: 'next',
      title: 'More food sources',
      text: 'More foods to find by search and by barcode, beyond USDA’s, so fewer foods need a photo of their label.',
    },

    // Later: wanted, and not being worked on yet.
    {
      id: 'live-activity',
      stage: 'later',
      title: 'A Live Activity for the day',
      text: 'Your next meal on the Lock Screen and in the Dynamic Island while the day is under way.',
    },
    {
      id: 'plan-several-days',
      stage: 'later',
      title: 'Plan several days at once',
      text: 'Ask for a plan that covers several days in one go, instead of planning each day on its own.',
    },
    {
      id: 'what-goes-with-this',
      stage: 'later',
      title: '“What goes with this?”',
      text: 'Ask what would go well with a food in your plan, not only what lands the numbers.',
    },
    {
      id: 'practice-videos',
      stage: 'later',
      title: 'Short videos in the practice day',
      text: 'Short videos that show each step of the practice day.',
    },

    // Not planned: only with the owner's say-so, each with its reason.
    {
      id: 'android',
      stage: 'not-planned',
      title: 'Android',
      text: 'Residual is iPhone only, and an Android version isn’t on the near-term roadmap.',
    },
    {
      id: 'plate-photo',
      stage: 'not-planned',
      title: 'Calories from a photo of your plate',
      text: 'Residual won’t guess at a picture of your plate. If you’re serious about your numbers, a guessed-at dinner was never going to fit. A photo of a Nutrition Facts label is a different thing, and that’s in.',
    },
    {
      id: 'automatic-logging',
      stage: 'not-planned',
      title: 'Logging for you automatically',
      text: 'The plan never counts as eaten until you log it, and nothing is logged behind your back, not even by a widget. A meal eaten as planned is still one swipe.',
    },
    {
      id: 'accounts',
      stage: 'not-planned',
      title: 'Accounts and sign-in',
      text: 'There’s no Residual account. Your days live on your iPhone and in your own private iCloud, so there’s nothing to sign in to and nothing for me to collect.',
    },
    {
      id: 'free-tier',
      stage: 'not-planned',
      title: 'A free tier, ads, a lifetime deal or sales',
      text: 'A free version gets paid for with your attention or your data, and a one-time price would be a promise I couldn’t keep. The free part is the trial, and the price is the same every day of the year.',
      link: { href: '/pricing/', label: 'What it costs, and why' },
    },
  ],

  // Releases with no notes page, newest first. Every later release has notes in src/pages/releases/, and
  // Shipped reads it from there instead. The App Store's day of release for 1.0 isn't recorded anywhere, only
  // its build (8 November 2026), so it says the month.
  earlierReleases: [
    {
      version: '1.0',
      date: 'November 2026',
      highlights: [
        'AI day plans built from your own pantry, saved meals and recipes.',
        'Close the residual re-sizes the meals still ahead so the day lands.',
        'Foods from USDA, barcode scanning and photos of Nutrition Facts labels.',
      ],
    },
  ],
};
