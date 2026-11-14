// Everything the compare pages say about Eat This Much: its column in the table, its page at /compare/eatthismuch/,
// and the sources behind both. Every sentence about Eat This Much carries the ids of the sources that back it, and
// only facts confirmed on Eat This Much's own site, help centre or App Store listing belong here. Two of its own
// pages disagree (where its foods come from; what Apple Health sync does), so the cells say only what both support.
// .claude/rules/compare.md says how to re-check it; `checked` is the day that was last done.
import type { Competitor } from './types.ts';

const help = 'https://help.eatthismuch.com/help/';

export const eatthismuch: Competitor = {
  key: 'etm',
  name: 'Eat This Much',
  slug: 'eatthismuch',
  checked: '14 November 2026',
  forYouIf: 'you want whole days of meals made for you from its recipes, with a grocery list on Premium, rather than choosing meals yourself. Its free tier plans one day at a time. [home, pricing, subscribe]',

  cells: {
    plans: { mark: 'yes', short: 'Yes, its core', detail: 'Yes, its core: days, or weeks with Premium, from its recipes and foods', sources: ['home', 'pricing'] },
    resize: { mark: 'none', short: 'Regenerates on request', detail: 'Its help says to log what you ate and adjust the rest by hand. On mobile, eaten food locks, and regenerating the day rebuilds the unticked foods around what you ate to match your targets, when you ask', sources: ['offplan', 'lock'] },
    ranges: { mark: 'yes', short: 'Yes, for macros', detail: 'Yes, macros as ranges or percentages', sources: ['macros'] },
    adapt: { mark: 'none', short: 'Not stated' },
    database: { mark: 'none', short: 'Includes USDA foods', detail: 'Includes USDA foods; its own pages differ on where the rest come from', sources: ['foods', 'tracker'] },
    micros: { mark: 'partly', short: 'Targets: fiber, sodium, cholesterol', detail: 'Targets for fiber, sodium and cholesterol; no direct targets for other micronutrients', sources: ['micros'] },
    scan: { mark: 'yes', short: 'Barcode, free; label', detail: 'Barcode for US brands, free; label photo', sources: ['tracker', 'appstore'] },
    grocery: { mark: 'yes', short: 'Yes, with Premium', detail: 'Yes, with Premium, plus grocery delivery', sources: ['subscribe'] },
    platforms: { mark: 'none', short: 'Web, iPhone, Android', detail: 'Web, iPhone, iPad, Android', sources: ['home', 'mobile', 'appstore'] },
    health: { mark: 'yes', short: 'Yes, Premium per its listing', detail: 'Yes; sends meals you mark eaten. Its App Store listing lists it under Premium', sources: ['health', 'appstore'] },
    coach: { mark: 'yes', short: 'Professional plans', detail: 'Yes, its Professional plans, from $49 a month for up to 10 clients, billed quarterly', sources: ['pros'] },
    export: { mark: 'yes', short: 'Plans as PDF, with Premium', detail: 'Meal plans as PDF, print or email, with Premium; no CSV', sources: ['export'] },
    account: { mark: 'none', short: 'To save plans', detail: 'Needed to save plans and track', sources: ['account'] },
    ads: { mark: 'none', short: 'Not stated' },
    tracking: { mark: 'none', short: 'None listed', detail: 'Its App Store label lists none', sources: ['appstore'] },
    free: { mark: 'yes', short: 'Yes, a day at a time', detail: 'Yes, one day at a time; Premium has a 14-day trial', sources: ['pricing', 'subscribe'] },
    price: { mark: 'none', short: 'Premium $14.99 a month', detail: 'Premium $14.99 a month or $59.99 a year', sources: ['subscribe'] },
  },

  sources: [
    { id: 'home', title: 'Eat This Much home page', url: 'https://www.eatthismuch.com/' },
    { id: 'pricing', title: 'Eat This Much pricing', url: 'https://www.eatthismuch.com/pricing' },
    { id: 'subscribe', title: 'Eat This Much help: What do I get for subscribing?', url: `${help}what-do-i-get-for-subscribing` },
    { id: 'account', title: 'Eat This Much help: What do I get for creating an account?', url: `${help}what-do-i-get-for-creating-an-account` },
    { id: 'offplan', title: 'Eat This Much help: I ate something that wasn’t in my meal plan, what should I do?', url: `${help}i-ate-something-that-wasnt-in-my-meal-plan-what-should-i-do` },
    { id: 'lock', title: 'Eat This Much help: How do I track what I’ve eaten, or lock meals in place?', url: `${help}how-do-i-track-what-ive-eaten-or-lock-meals-in-place` },
    { id: 'macros', title: 'Eat This Much help: The generator isn’t hitting my target macros, what’s going on?', url: `${help}the-generator-isnt-hitting-my-target-macros-whats-going-on` },
    { id: 'micros', title: 'Eat This Much help: Can I set targets for saturated fats, potassium or other micronutrients?', url: `${help}can-i-set-targets-for-saturated-fats-potassium-or-other-micronutrients` },
    { id: 'foods', title: 'Eat This Much help: Where do your foods come from?', url: `${help}where-do-your-foods-come-from` },
    { id: 'tracker', title: 'Eat This Much food tracker app page', url: 'https://www.eatthismuch.com/food-tracker-app' },
    { id: 'mobile', title: 'Eat This Much help: Is there a mobile app?', url: `${help}is-there-a-mobile-app` },
    { id: 'newapp', title: 'Eat This Much help: The new Eat This Much mobile app', url: `${help}the-new-eat-this-much-mobile-app` },
    { id: 'health', title: 'Eat This Much help: How to sync with Apple Health, Android Health Connect or Google Fit', url: `${help}how-to-sync-with-apple-health-slash-android-health-connect-slash-google-fit` },
    { id: 'export', title: 'Eat This Much help: How do I email, print or download my meal plan and grocery list?', url: `${help}how-do-i-email-print-or-download-my-meal-plan-and-grocery-list` },
    { id: 'pros', title: 'Eat This Much for professionals', url: 'https://www.eatthismuch.com/professionals' },
    { id: 'appstore', title: 'Eat This Much on the App Store (US)', url: 'https://apps.apple.com/us/app/eat-this-much-meal-planner/id981637806' },
  ],

  page: {
    title: 'Residual and Eat This Much: how they differ',
    description: 'Residual and Eat This Much compared: Eat This Much generates meal plans and can regenerate them; Residual keeps your meals and changes their amounts when the day drifts. Who should pick which, prices and sources.',
    summary: 'Both build meal plans to calorie and macro targets. Eat This Much generates them for you, from its recipes and foods, fitted to your tastes, budget and schedule. [home] Residual plans from your own food, and when the day drifts it keeps those meals and changes their amounts.',
    pickThem: [
      'You’d rather not choose meals at all: it generates a day, or a week at a time with Premium, from its recipes. [home, pricing]',
      'You want the plan shaped by your budget, cooking time and schedule as well as your macros. [home]',
      'You want a grocery list, pantry tracking and grocery delivery from the plan, with Premium. [subscribe]',
      'You want a free tier, a web app or Android, or you plan for clients with its Professional plans. [pricing, home, mobile, pros]',
    ],
    pickThemNote: 'When a day goes off plan, its help says to log what you ate and adjust the rest by hand; in the mobile app you can lock what you ate and regenerate the rest. [offplan, lock]',
    pickResidual: [
      'You’d rather choose your meals yourself, from food you already have.',
      'When the day drifts, you want to keep your meals and change only their amounts.',
      'You want room for one or more targets to float, balanced last.',
      'You want no account: your data on your iPhone and in your own iCloud.',
    ],
    pickResidualNote: 'It’s iPhone only, with no free tier. Apple Health isn’t supported yet; it’s {roadmap}.',
    difference: {
      heading: 'Eat This Much regenerates the plan. Residual re-sizes it.',
      paragraphs: [
        '**Eat This Much hands you the plan.** You give it your targets, tastes, budget and schedule, and it generates meals from its recipes and foods. [home] Foods you mark to appear often or always are built in. [macros] You can regenerate a whole day or week. [newapp]',
        'When you eat something that wasn’t planned, its help says to log it and adjust the rest by hand, with part of a portion or a smaller meal. [offplan] In the mobile app, ticking what you ate locks it, and regenerating the day rebuilds the unticked foods around it to match your targets. [lock]',
        '**Residual keeps your meals.** You plan the day from your own food, then log what really happened. When lunch runs over, it keeps the same dinner and snack and changes their amounts, in grams, so the day still lands inside your ranges. You see every change first.',
        'Neither is the wrong idea. If you’d rather not decide what to eat, Eat This Much is built for that. If you’ve already decided, and want the amounts to keep up with your day, that’s what Residual is for.',
      ],
    },
    figure: {
      event: { name: 'Lunch', value: '799 kcal', sub: 'Planned 562 kcal', chip: 'Off plan · +237 kcal' },
      them: {
        kicker: 'Then, in Eat This Much',
        title: 'In the mobile app',
        rows: [
          { name: 'Lunch', value: 'Ticked, locked' },
          { name: 'Dinner', value: 'Rebuilt, if you regenerate' },
          { name: 'Snack', value: 'Rebuilt, if you regenerate' },
        ],
        notes: [
          'Regenerate the day and “unchecked foods are rebuilt around your locked meals”. [lock]',
          'Or adjust the rest by hand, as its help suggests. [offplan]',
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
      caption: 'An illustration, not a screenshot of either app: lunch runs 237 kcal over on a 2,100 kcal day. Eat This Much’s side says only what its help describes.',
    },
    price: {
      main: '$14.99',
      per: 'a month, for Premium',
      more: 'or $59.99 a year, which its pricing page shows as $5 a month',
      trial: 'A free tier, one day at a time. Premium has a 14-day free trial.',
      sources: [{ id: 'subscribe', label: 'help page on subscribing' }, { id: 'pricing', label: 'pricing page' }],
    },
    switching: {
      movingOver: 'Residual doesn’t import from Eat This Much or any other tracker. Eat This Much Premium can print, email or download a plan as a PDF, with no CSV option [export], and Residual can’t read a PDF.',
      keepingBoth: 'You can let Eat This Much suggest the recipes [home] and rebuild the ones you like in Residual as recipes or saved meals, then plan and land your days from those. That part is by hand.',
    },
    end: 'Plan a real week with the whole app. If Eat This Much turns out to be what you need, cancel Residual before its trial ends and you’ve paid nothing.',
  },
};
