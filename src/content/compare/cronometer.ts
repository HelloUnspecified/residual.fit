// Everything the compare pages say about Cronometer: its column in the table, its page at /compare/cronometer/,
// and the sources behind both. Every sentence about Cronometer carries the ids of the sources that back it, and
// only facts confirmed on Cronometer's own site, blog, forum staff posts or App Store listing belong here. Its help
// centre refused automated reads when this was checked, so nothing here rests on it.
// .claude/rules/compare.md says how to re-check it; `checked` is the day that was last done.
import type { Competitor } from './types.ts';

export const cronometer: Competitor = {
  key: 'cr',
  name: 'Cronometer',
  slug: 'cronometer',
  checked: '14 November 2026',
  forYouIf: 'nutrient detail matters most: it tracks up to 95 nutrients, from lab-analysed sources. It has a free tier and a web app, and a dietitian can follow you through Cronometer Pro. [home, db, pro]',

  cells: {
    plans: { mark: 'no', short: 'No day planner', detail: 'No day planner; you can log meals ahead, and Gold suggests a meal at a time', sources: ['planblog', 'suggest'] },
    resize: { mark: 'none', short: 'Shows what’s left; suggests foods', detail: 'Shows what’s left. Gold suggests foods that fit the day’s remaining targets; its AI coach can recommend a meal but “will not automatically change your diary”', sources: ['suggest', 'coach'] },
    ranges: { mark: 'none', short: 'Not stated', detail: 'Not stated for calories and macros; nutrients have a target and an optional maximum', sources: ['targets'] },
    adapt: { mark: 'none', short: 'Not stated' },
    database: { mark: 'none', short: 'Over 1 million', detail: 'Over 1 million verified, lab-analysed foods, from 10+ sources', sources: ['home', 'db'] },
    micros: { mark: 'yes', short: 'Up to 95 nutrients', detail: 'Yes, up to 95 nutrients and compounds', sources: ['home'] },
    scan: { mark: 'yes', short: 'Barcode and label, free', detail: 'Barcode and label, free; photo logging with Gold', sources: ['barcode', 'gold'] },
    grocery: { mark: 'no', short: 'No', detail: 'No; none on its features or Gold pages', sources: ['features', 'gold'] },
    platforms: { mark: 'none', short: 'Web, iPhone, Android', detail: 'Web, iPhone, iPad, Apple Watch, Android', sources: ['home', 'appstore'] },
    health: { mark: 'yes', short: 'Yes', detail: 'Yes, plus Health Connect, Garmin, Fitbit and more', sources: ['sync'] },
    coach: { mark: 'yes', short: 'Cronometer Pro', detail: 'Yes, Cronometer Pro, from $39.99 a month', sources: ['pro'] },
    export: { mark: 'yes', short: 'Yes', detail: 'Yes, by date range', sources: ['export'] },
    account: { mark: 'none', short: 'Yes', detail: 'Yes; you sign up on the web or in the app', sources: ['home'] },
    ads: { mark: 'none', short: 'Free tier, per its policy', detail: 'Its privacy policy says free users get targeted ads; Gold is “Ad-free”', sources: ['privacy', 'gold'] },
    tracking: { mark: 'none', short: 'Its label lists 3 kinds', detail: 'Its App Store label lists contact info, identifiers and usage data', sources: ['appstore'] },
    free: { mark: 'yes', short: 'Yes, Basic', detail: 'Yes, Basic', sources: ['gold'] },
    price: { mark: 'none', short: 'Gold $10.99 a month', detail: 'Gold $10.99 a month or $59.99 a year', sources: ['gold'] },
  },

  sources: [
    { id: 'home', title: 'Cronometer home page', url: 'https://cronometer.com/' },
    { id: 'features', title: 'Cronometer: features', url: 'https://cronometer.com/features/' },
    { id: 'gold', title: 'Cronometer Gold', url: 'https://cronometer.com/gold/' },
    { id: 'planblog', title: 'Cronometer blog: How to build a high-protein meal plan that fits your macro goals', url: 'https://cronometer.com/blog/how-to-build-a-high-protein-meal-plan-that-fits-your-macro-goals/' },
    { id: 'suggest', title: 'Cronometer blog: Food Suggestions', url: 'https://cronometer.com/blog/suggest-food/' },
    { id: 'coach', title: 'Cronometer blog: Crono Coach', url: 'https://cronometer.com/blog/crono-coach/' },
    { id: 'targets', title: 'Cronometer blog: How to set your macro and micronutrient targets', url: 'https://cronometer.com/blog/how-to-set-your-macro-and-micronutrient-targets/' },
    { id: 'db', title: 'Cronometer: accurate databases', url: 'https://cronometer.com/features/accurate-databases.html' },
    { id: 'barcode', title: 'Cronometer blog: How to use the barcode scanner', url: 'https://cronometer.com/blog/how-to-use-the-barcode-scanner/' },
    { id: 'sync', title: 'Cronometer: sync your devices', url: 'https://cronometer.com/features/sync-devices.html' },
    { id: 'pro', title: 'Cronometer Pro', url: 'https://cronometer.com/pro/' },
    { id: 'export', title: 'Cronometer forum, staff post: Exporting data', url: 'https://forums.cronometer.com/discussion/460/exporting-data' },
    { id: 'privacy', title: 'Cronometer privacy policy', url: 'https://cronometer.com/privacy/' },
    { id: 'appstore', title: 'Cronometer on the App Store (US)', url: 'https://apps.apple.com/us/app/cronometer-calorie-counter/id1145935738' },
  ],

  page: {
    title: 'Residual and Cronometer: how they differ',
    description: 'Residual and Cronometer compared: Cronometer tracks up to 95 nutrients from lab-analysed sources; Residual plans the day and re-sizes the meals ahead to land four targets. Who should pick which, prices and sources.',
    summary: 'Both track calories and macros. Cronometer is built around nutrient detail: it tracks up to 95 nutrients and compounds, from foods it calls verified and lab-analysed. [home] Residual takes four numbers, calories, protein, carbs and fat, and plans each day to land them, re-sizing the meals ahead when the day drifts.',
    pickThem: [
      'You want more than macros: it tracks up to 95 nutrients and compounds, vitamins and minerals among them. [home, appstore]',
      'You care where the numbers come from: its foods come from more than 10 sources, NCCDB and USDA among them. [db]',
      'You work with a dietitian or coach, who can follow your diary and targets through Cronometer Pro. [pro]',
      'You want a free tier and a web app, or Garmin, Fitbit, Oura or Dexcom synced alongside your food. [gold, home, sync]',
    ],
    pickThemNote: 'It doesn’t plan a day for you: you can enter meals ahead, and Gold suggests a meal at a time. [planblog, suggest]',
    pickResidual: [
      'You want the day planned for you, from food you already have.',
      'Your days drift, and you want the meals still to come re-sized for you, in grams.',
      'Calories, protein, carbs and fat are the numbers you eat to, each with its own range.',
      'You want no account: your data on your iPhone and in your own iCloud.',
    ],
    pickResidualNote: 'It’s iPhone only, with no free tier. It tracks fiber but no other micronutrient, and it has no dashboard for a dietitian. Apple Health isn’t supported yet; it’s {roadmap}.',
    difference: {
      heading: 'Cronometer shows the detail. Residual lands the day.',
      paragraphs: [
        '**Cronometer looks at what’s in your food.** It tracks up to 95 nutrients and compounds. [home] Each nutrient can have a daily target and an optional maximum. [targets] Its foods come from more than 10 sources it calls trusted, NCCDB and USDA among them. [db]',
        'Within a day, you see your progress against those targets. Gold can suggest a meal or recipe that fits what’s left. [suggest] Its AI coach can recommend a meal, but it “will not automatically change your diary”. [coach]',
        '**Residual looks at four numbers.** You plan the day from your own food, then log what really happened. When lunch runs over, it re-sizes the same dinner and snack, in grams, so calories, protein, carbs and fat still land inside your ranges. Fiber is counted and shown; no other micronutrient is.',
        'Neither is the wrong idea. If you want to see how your vitamins and minerals add up, Cronometer is built for that. If you want today’s four numbers to land without working out dinner yourself, that’s what Residual is for.',
      ],
    },
    figure: {
      them: {
        kicker: 'Tracked in Cronometer',
        big: { value: '95', label: 'nutrients and compounds it can track, at most' },
        notes: [
          'Vitamins and minerals among them, each with a daily target and an optional maximum. [appstore, targets]',
          'From over a million foods it calls verified and lab-analysed. [home]',
        ],
      },
      us: {
        kicker: 'Landed in Residual',
        title: 'Four targets, each with a range',
        rows: [
          { name: 'Calories', note: 'of 2,100 ± 100', value: '2,099' },
          { name: 'Protein', note: 'of 160 ± 10 g', value: '160 g' },
          { name: 'Carbs', note: 'of 210 ± 20 g', value: '208 g' },
          { name: 'Fat', note: 'floats', value: '70 g' },
          { name: 'Fiber', note: 'shown, not a target', value: '31 g' },
        ],
        lands: 'Every target lands **inside its range**.',
      },
      caption: 'An illustration, not a screenshot of either app. Cronometer’s side says only what its own pages say; Residual’s numbers are an example day.',
    },
    price: {
      main: '$10.99',
      per: 'a month, for Gold',
      more: 'or $59.99 a year',
      trial: 'A free tier, Basic.',
      sources: [{ id: 'gold', label: 'Gold page' }],
    },
    switching: {
      movingOver: 'Residual doesn’t import from Cronometer or any other tracker. Cronometer can export your data for a date range, but Residual can’t read it. [export]',
      keepingBoth: 'You can keep Cronometer for the nutrient detail [home] and let Residual plan and land the four main numbers. It works, but it’s two logs: what you eat goes into each by hand.',
    },
    end: 'Plan a real week with the whole app. If Cronometer turns out to be what you need, cancel before the trial ends and you’ve paid nothing.',
  },
};
