// Everything the compare pages say about MyFitnessPal: its column in the table, its page at /compare/myfitnesspal/,
// and the sources behind both. Every sentence about MyFitnessPal carries the ids of the sources that back it, and
// only facts confirmed on MyFitnessPal's own site, help centre or App Store listing belong here. Its own pages give
// 18, 19 and 20.5 million for the food database; "more than 18 million, by its own count" is what all three support.
// .claude/rules/compare.md says how to re-check it; `checked` is the day that was last done.
import type { Competitor } from './types.ts';

const help = 'https://support.myfitnesspal.com/hc/en-us/articles/';

export const myfitnesspal: Competitor = {
  key: 'mfp',
  name: 'MyFitnessPal',
  slug: 'myfitnesspal',
  checked: '14 November 2026',
  forYouIf: 'you want a database of more than 18 million foods, by its own count, apps for the web, Android and both watches, and a free tier to start. [home, web, appstore, watch, wear, premium]',

  cells: {
    plans: { mark: 'yes', short: 'Yes, with Premium+', detail: 'Premium+ Meal Planner: 2 to 15 days from its recipes, on iOS and Android, in six countries, in English', sources: ['planner', 'plushelp'] },
    resize: { mark: 'none', short: 'Shows what’s left; Premium Coach suggests', detail: 'Shows what’s left, by meal with Premium. Its Premium Coach (on iPhone) suggests what to eat with remaining calories; it doesn’t change the plan', sources: ['watch', 'bymeal', 'coach'] },
    ranges: { mark: 'none', short: 'Not stated', detail: 'Not stated; goals are set in percentages, or grams with Premium', sources: ['goals'] },
    adapt: { mark: 'none', short: 'Offers a recalculation every 10 lb lost', detail: 'Offers to recalculate your goal after every 10 lb of weight loss you record', sources: ['recalc'] },
    database: { mark: 'none', short: '18 million+, by its count', detail: 'More than 18 million foods, by its own count; check marks show reviewed entries', sources: ['home', 'check'] },
    micros: { mark: 'yes', short: 'Yes', detail: 'Yes, with micronutrient goals on the website', sources: ['goals'] },
    scan: { mark: 'yes', short: 'Yes, with Premium', detail: 'Barcode and Meal Scan, both Premium', sources: ['barcode', 'scan'] },
    grocery: { mark: 'yes', short: 'Yes, with Premium+', detail: 'From the Meal Planner, Premium+', sources: ['planner'] },
    platforms: { mark: 'none', short: 'Web, iPhone, Android', detail: 'Web, iPhone, iPad, Android, Apple Watch, Wear OS', sources: ['web', 'appstore', 'watch', 'wear'] },
    health: { mark: 'yes', short: 'Yes', detail: 'Yes; weight syncs both ways', sources: ['health'] },
    coach: { mark: 'none', short: 'Diary sharing', detail: 'No dashboard documented; you can share your diary, free', sources: ['share'] },
    export: { mark: 'yes', short: 'CSV, with Premium', detail: 'Premium only: three CSV files by email', sources: ['export'] },
    account: { mark: 'none', short: 'Yes', detail: 'Yes; your diary syncs across web and apps', sources: ['web'] },
    ads: { mark: 'none', short: 'Free tier, per its help', detail: 'Its help says the free tier is ad-supported and Premium removes ads', sources: ['adfree'] },
    tracking: { mark: 'none', short: 'Its label lists 2 kinds', detail: 'Its App Store label lists identifiers and usage data', sources: ['appstore'] },
    free: { mark: 'yes', short: 'Yes', detail: 'Yes; Premium has a 7-day free trial for new subscribers', sources: ['premium'] },
    price: { mark: 'none', short: 'Premium $19.99 a month', detail: 'Premium $19.99 a month or $79.99 a year; Premium+ $24.99 or $99.99', sources: ['premium', 'plus'] },
  },

  sources: [
    { id: 'home', title: 'MyFitnessPal home page', url: 'https://www.myfitnesspal.com/' },
    { id: 'premium', title: 'MyFitnessPal Premium', url: 'https://www.myfitnesspal.com/premium' },
    { id: 'plus', title: 'MyFitnessPal Premium+', url: 'https://www.myfitnesspal.com/premium-plus' },
    { id: 'planner', title: 'MyFitnessPal help: How to use the Meal Planner', url: `${help}34603055097869` },
    { id: 'plushelp', title: 'MyFitnessPal help: Premium+', url: `${help}34347930588557` },
    { id: 'coach', title: 'MyFitnessPal help: Nutrition Coach', url: `${help}45212266254221` },
    { id: 'bymeal', title: 'MyFitnessPal help: Calorie goals by meal', url: `${help}360032273792` },
    { id: 'goals', title: 'MyFitnessPal help: Customize your goals', url: `${help}360032274432` },
    { id: 'recalc', title: 'MyFitnessPal help: Force a goal update', url: `${help}360032271472` },
    { id: 'check', title: 'MyFitnessPal help: Check-marked food items', url: `${help}360032273292` },
    { id: 'barcode', title: 'MyFitnessPal help: Barcode scanner', url: `${help}360032624771` },
    { id: 'scan', title: 'MyFitnessPal help: Meal Scan', url: `${help}360045761612` },
    { id: 'web', title: 'MyFitnessPal help: Using the website', url: `${help}360032623131` },
    { id: 'watch', title: 'MyFitnessPal help: Apple Watch app', url: `${help}360032625731` },
    { id: 'wear', title: 'MyFitnessPal help: Wear OS app', url: `${help}4407940713869` },
    { id: 'health', title: 'MyFitnessPal help: Apple Health', url: `${help}360032271092` },
    { id: 'share', title: 'MyFitnessPal help: Share your diary', url: `${help}360032623371` },
    { id: 'export', title: 'MyFitnessPal help: Export your data', url: `${help}360032273352` },
    { id: 'adfree', title: 'MyFitnessPal help: Ad-free experience', url: `${help}360032273152` },
    { id: 'appstore', title: 'MyFitnessPal on the App Store (US)', url: 'https://apps.apple.com/us/app/myfitnesspal-calorie-counter/id341232718' },
  ],

  page: {
    title: 'Residual and MyFitnessPal: how they differ',
    description: 'Residual and MyFitnessPal compared: MyFitnessPal tracks from a database of 18 million+ foods and, with Premium+, plans from its recipes; Residual plans from your own food and re-sizes it. Who should pick which, prices and sources.',
    summary: 'Both plan and track. MyFitnessPal logs from a database of more than 18 million foods, by its own count, and its Premium+ Meal Planner builds 2 to 15 days of meals from its recipes. [home, planner] Residual plans each day from your own food, and re-sizes those meals when the day drifts.',
    pickThem: [
      'You want to log almost anything: its database has more than 18 million foods, by its own count. [home]',
      'You’d like a plan made for you from recipes: Premium+ plans 2 to 15 days from a library of 1,500+, with a grocery list. [planner, plus]',
      'You want the web, Android, an Apple Watch or Wear OS, and a free tier to start. [web, appstore, watch, wear, premium]',
      'You want your weight to sync both ways with Apple Health, or a trainer to see your diary. [health, share]',
    ],
    pickThemNote: 'Its Meal Planner is part of Premium+, on iOS and Android, in six countries. [planner, plushelp]',
    pickResidual: [
      'You want the plan built from food you already have.',
      'Your days drift, and you want the meals still to come re-sized for you, in grams.',
      'You want each target to have a range, and room for one or more to float.',
      'You want no account: your data on your iPhone and in your own iCloud.',
    ],
    pickResidualNote: 'It’s iPhone only, with no free tier. Its foods come from USDA, barcodes and the labels you photograph; larger food databases are {roadmap}, and so is Apple Health.',
    difference: {
      heading: 'MyFitnessPal’s planner works from its recipes. Residual plans from your food.',
      paragraphs: [
        '**MyFitnessPal tracks almost anything.** Its database has more than 18 million foods by its own count, and a check mark shows the entries it has reviewed or added. [home, check] With Premium+, its Meal Planner builds 2 to 15 days from its recipe library, and you can swap any recipe. [planner]',
        'When the day changes, the diary shows what’s left [watch], by meal with Premium. [bymeal] Its Premium Coach, on iPhone, can suggest what to eat with your remaining calories; it doesn’t change the plan or log anything. [coach]',
        '**Residual plans from your food.** The day comes from your pantry and saved meals. When lunch runs over, the same dinner and snack get smaller, in grams, so the day still lands inside your ranges, and you see every change first.',
        'Neither is the wrong idea. If you want a huge database and a plan made from a recipe library, MyFitnessPal is built for that. If you want your own food planned and kept on track as the day changes, that’s what Residual is for.',
      ],
    },
    figure: {
      them: {
        kicker: 'A plan in MyFitnessPal',
        title: 'The Meal Planner, with Premium+',
        rows: [
          { name: 'Planned from', value: '1,500+ recipes' },
          { name: 'Days at a time', value: '2 to 15' },
          { name: 'A meal you don’t want', value: 'Swap the recipe' },
          { name: 'Shopping', value: 'A grocery list' },
        ],
        notes: ['Each row is from its own help and Premium+ pages. [planner, plus]'],
      },
      us: {
        kicker: 'A plan in Residual',
        title: 'From your pantry and saved meals',
        rows: [
          { name: 'Greek yogurt', value: '250 g' },
          { name: 'Chicken thigh', value: '180 g' },
          { name: 'Salmon', value: '170 g' },
          { name: 'Rice, cooked', value: '200 g' },
          { name: 'Olive oil', value: '10 g' },
        ],
        lands: 'Lunch runs over? These amounts change; the foods stay.',
      },
      caption: 'An illustration, not a screenshot of either app. MyFitnessPal’s side lists only what its own pages describe; Residual’s foods are an example day.',
    },
    price: {
      main: '$19.99',
      per: 'a month, for Premium',
      more: 'or $79.99 a year. Premium+ is $24.99 a month or $99.99 a year',
      trial: 'A free tier. Premium has a 7-day free trial for new subscribers.',
      sources: [{ id: 'premium', label: 'Premium page' }, { id: 'plus', label: 'Premium+ page' }],
    },
    switching: {
      movingOver: 'Residual doesn’t import from MyFitnessPal or any other tracker. MyFitnessPal Premium emails your data as three CSV files, but Residual can’t read them. [export]',
      keepingBoth: 'You can keep MyFitnessPal for its database and for sharing your diary [share], and let Residual plan and land the day. It works, but it’s two logs: what you eat goes into each by hand.',
    },
    end: 'Plan a real week with the whole app. If MyFitnessPal turns out to be what you need, cancel Residual before its trial ends and you’ve paid nothing.',
  },
};
