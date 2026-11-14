// Everything the compare pages say about MacroFactor: its column in the table, its page at /compare/macrofactor/,
// and the sources behind both. Every sentence about MacroFactor carries the ids of the sources that back it, and
// only facts confirmed on MacroFactor's own site, help centre, roadmap or App Store listing belong here.
// .claude/rules/compare.md says how to re-check it; `checked` is the day that was last done.
import type { Competitor } from './types.ts';

const help = 'https://help.macrofactorapp.com/en/articles/';

export const macrofactor: Competitor = {
  key: 'mf',
  name: 'MacroFactor',
  slug: 'macrofactor',
  checked: '14 November 2026',
  forYouIf: 'you want your targets adjusted every week from your intake and weight trend, and you’re happy to decide each meal yourself. Its product page says “No ads”, and it has no free tier. [product]',

  cells: {
    plans: { mark: 'no', short: 'No', detail: 'No; meal planning is “Under Consideration” on its roadmap; you can log food to future days', sources: ['roadmap', 'future'] },
    resize: { mark: 'no', short: 'No: shows what’s left', detail: 'No; its Remaining view shows what’s left, and meal suggestions are “Under Consideration” on its roadmap. Moving calories between days is manual, its help says', sources: ['remaining', 'roadmap', 'overage'] },
    ranges: { mark: 'none', short: 'Not stated', detail: 'Not stated for calories and macros; micronutrients have a floor and a ceiling', sources: ['micro'] },
    adapt: { mark: 'yes', short: 'Yes, weekly', detail: 'Yes, at its weekly check-ins, from your intake and weight', sources: ['product'] },
    database: { mark: 'none', short: 'About 1.36 million', detail: 'About 1.36 million verified entries', sources: ['product', 'db'] },
    micros: { mark: 'yes', short: 'Yes', detail: 'Yes, “full micronutrient tracking”', sources: ['product'] },
    scan: { mark: 'yes', short: 'Barcode, label, photo', detail: 'Barcode, label scanner and AI photo logging', sources: ['product'] },
    grocery: { mark: 'none', short: 'Not stated' },
    platforms: { mark: 'none', short: 'iPhone, iPad, Watch, Android', detail: 'iPhone, iPad, Apple Watch, Android; a web app is planned', sources: ['appstore', 'product', 'roadmap'] },
    health: { mark: 'yes', short: 'Yes', detail: 'Yes, and Health Connect', sources: ['integrations'] },
    coach: { mark: 'no', short: 'No', detail: 'No; no way for coaches to view clients, its FAQ says', sources: ['product'] },
    export: { mark: 'yes', short: 'Spreadsheets', detail: 'Yes, as spreadsheets', sources: ['export'] },
    account: { mark: 'none', short: 'MacroFactor ID', detail: 'A MacroFactor ID with email sign-in, per its privacy policy', sources: ['privacy'] },
    ads: { mark: 'none', short: '“No ads”', detail: '“No ads”, says its product page', sources: ['product'] },
    tracking: { mark: 'none', short: 'None listed', detail: 'Its App Store label lists none', sources: ['appstore'] },
    free: { mark: 'no', short: 'No; 7-day trial', detail: 'No; a 7-day free trial', sources: ['product'] },
    price: { mark: 'none', short: '$11.99 a month', detail: '$11.99 a month, $47.99 every 6 months or $71.99 a year', sources: ['product'] },
  },

  sources: [
    { id: 'product', title: 'MacroFactor: product page and FAQ', url: 'https://macrofactor.com/macrofactor/' },
    { id: 'roadmap', title: 'MacroFactor public roadmap', url: 'https://feedback.macrofactorapp.com/en/roadmap' },
    { id: 'future', title: 'MacroFactor help: Log food to future days', url: `${help}51-log-food-to-future-days` },
    { id: 'remaining', title: 'MacroFactor help: Switch between consumed and remaining views', url: `${help}42-switch-between-consumed-and-remaining-views` },
    { id: 'overage', title: 'MacroFactor help: How to adjust calorie targets to account for overages or to roll over unused calories', url: `${help}108-how-to-adjust-calorie-targets-to-account-for-overages-or-to-roll-over-unused-calories` },
    { id: 'micro', title: 'MacroFactor help: What are the micronutrient floor, target and ceiling?', url: `${help}138-what-are-the-micronutrient-floor-target-and-ceiling` },
    { id: 'db', title: 'MacroFactor help: Food search database', url: `${help}46-food-search-database` },
    { id: 'integrations', title: 'MacroFactor help: Integrations', url: `${help}102-integrations` },
    { id: 'export', title: 'MacroFactor help: Export your data', url: `${help}68-export-your-data` },
    { id: 'privacy', title: 'MacroFactor privacy policy', url: 'https://macrofactor.com/privacy' },
    { id: 'appstore', title: 'MacroFactor on the App Store (US)', url: 'https://apps.apple.com/us/app/macrofactor-diet-sidekick/id1553503471' },
  ],

  page: {
    title: 'Residual and MacroFactor: how they differ',
    description: 'Residual and MacroFactor compared: MacroFactor adjusts your targets weekly from your weight trend; Residual plans the day and re-sizes the meals ahead. Who should pick which, prices and sources.',
    summary: 'Both are for people who eat to calorie and macro targets. MacroFactor estimates what you burn from the food you log and your weight, and adjusts your targets at a weekly check-in. [product] Residual takes the targets you set and plans each day to land them, re-sizing the meals ahead when the day drifts.',
    pickThem: [
      'You want your targets adjusted every week from what you eat and how your weight moves. [product]',
      'You’d rather log fast, with a photo, a barcode or a label scan, and decide each meal yourself. [product]',
      'You want a large verified database, about 1.36 million entries, and full micronutrient tracking. [db, product]',
      'You use Android, an iPad or an Apple Watch, or want Apple Health or Health Connect. [appstore, product, integrations]',
    ],
    pickThemNote: 'It doesn’t plan meals: meal planning and meal suggestions are “Under Consideration” on its public roadmap. [roadmap]',
    pickResidual: [
      'You plan your meals ahead from food you already have.',
      'Your days drift, and you want the meals still to come re-sized for you, in grams.',
      'You want each target to have a range, and room for one or more to float.',
      'You want no account: your data on your iPhone and in your own iCloud.',
    ],
    pickResidualNote: 'It’s iPhone only, with no free tier. It lands the targets you set rather than changing them. Apple Health isn’t supported yet; it’s {roadmap}.',
    difference: {
      heading: 'MacroFactor corrects over weeks. Residual corrects within the day.',
      paragraphs: [
        '**MacroFactor watches the long run.** You log what you eat and weigh in. From those it estimates what you burn and adjusts your targets each week. Its product page calls this “adherence neutral”: it works whether or not you stuck to the plan. [product]',
        'Within a day, its Remaining view shows what’s left. Carrying an overage into later days is something you set up by hand, its help says. [remaining, overage]',
        '**Residual watches today.** You plan the day from your own food, then log what really happened. When lunch runs over, it re-sizes the same dinner and snack, in grams, so tonight still lands inside your ranges. Your targets stay where you set them.',
        'Neither is the wrong idea. If the hard part for you is knowing the right number, MacroFactor is built for that. If it’s hitting the number on a day that didn’t go to plan, that’s what Residual is for.',
      ],
    },
    figure: {
      event: { name: 'Lunch', value: '799 kcal', sub: 'Planned 562 kcal', chip: 'Off plan · +237 kcal' },
      them: {
        kicker: 'Then, in MacroFactor',
        big: { value: '761', label: 'kcal remaining today' },
        notes: [
          'What dinner fits in that is yours to work out. [remaining]',
          'At the next weekly check-in, your trend may move the target itself. [product]',
        ],
      },
      us: {
        kicker: 'Then, in Residual',
        title: 'Dinner and snack, re-sized',
        rows: [
          { name: 'Salmon', was: '170 g', value: '140 g' },
          { name: 'Rice, cooked', was: '200 g', value: '120 g' },
          { name: 'Olive oil', was: '10 g', value: '5 g' },
          { name: 'Greek yogurt', was: '250 g', value: '200 g' },
        ],
        lands: 'The day lands at **2,099** of 2,100 ± 100.',
      },
      caption: 'An illustration, not a screenshot of either app: lunch runs 237 kcal over on a 2,100 kcal day.',
    },
    price: {
      main: '$11.99',
      per: 'a month',
      more: '$47.99 every 6 months, or $71.99 a year',
      trial: 'A 7-day free trial. No free tier.',
      sources: [{ id: 'product', label: 'product page' }],
    },
    switching: {
      movingOver: 'Residual doesn’t import from MacroFactor or any other tracker. MacroFactor exports your history as spreadsheets, but Residual can’t read them. [export]',
      keepingBoth: 'You can let MacroFactor set the targets and Residual land them. [product] It works, but it’s two logs: type the new targets into Residual after each check-in. Residual won’t read them for you.',
    },
    end: 'Plan a real week with the whole app. If MacroFactor turns out to be what you need, cancel Residual before its trial ends and you’ve paid nothing.',
  },
};
