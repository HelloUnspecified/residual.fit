// One place for the facts the site repeats. Change them here before launch.

// The app's numeric Apple ID (App Store Connect → App Information → Apple ID; the store page is
// apps.apple.com/us/app/residual-ai-macro-planner/id6782665400). It turns on every App Store button, the
// Safari Smart App Banner and the App Store link in the structured data. Left empty, the site links a
// placeholder and leaves both out, so nothing published points at a store page that doesn't exist.
// The link has no storefront (/us/) so Apple sends each visitor to their own country's store.
const appStoreId = '6782665400';

export const site = {
  name: 'Residual',
  tagline: 'A day of eating, solved.',
  // The home page's <title>: the brand line plus the words people search for. Keep it near 60 characters.
  homeTitle: 'Residual: A day of eating, solved. Macro meal planner for iPhone',
  // The default meta description. Keep it under about 160 characters so search results show it whole.
  description:
    'An iPhone meal planner for your calorie and macro targets. Plan the day with Claude, log what you ate, and the meals ahead re-size so the day lands in range.',
  // One plain sentence that says what Residual is: the definition answer engines and link previews quote.
  definition:
    'Residual is an iPhone meal planner for people who eat to calorie and macro targets: it plans the day, and as you log what you actually ate, a deterministic solver re-sizes the meals still ahead so the day lands inside your ranges.',
  appStoreId,
  appStoreLive: appStoreId !== '',
  appStoreUrl: appStoreId ? `https://apps.apple.com/app/id${appStoreId}` : 'https://apps.apple.com/app/residual/id0000000000',
  supportEmail: 'support@residual.fit',
  minimumOS: 'iOS 27',
  // Residual Plus starts with a free trial this long (App Store Connect → the subscription's introductory offer).
  trialDays: 14,
  // Residual Plus, in US dollars on the App Store's price grid. Every plan has everything and the same trial.
  // The pricing page works out each plan's monthly and daily cost from these, so change them only here.
  plans: [
    { name: 'Monthly', price: 12.99, months: 1, per: 'a month' },
    { name: 'Quarterly', price: 34.99, months: 3, per: 'every 3 months' },
    { name: 'Yearly', price: 99.99, months: 12, per: 'a year' },
  ],
  developer: 'Clark Sell',
  // The company that publishes Residual: the footer's copyright and maker line. The Terms and the privacy policy
  // name it too, with its mailing address, in their own Markdown.
  publisher: 'Unspecified LLC',
  // The maker's Instagram: the workouts and the health journey behind the app, linked from the founder note.
  instagram: { handle: 'theclarksell', url: 'https://www.instagram.com/theclarksell/' },
  // What the app does, as short claims, for structured data and llms.txt. Keep them true to the app.
  features: [
    'Daily targets for calories, protein, carbs and fat, each with its own plus-or-minus range and a landing order you set; any of them may float',
    'A TDEE calculator that works out targets from your body, activity and goal, or enter the numbers a coach gave you',
    'Day plans drafted by Claude from your pantry, saved meals and instructions, only if you allow it',
    "Planning with Apple Intelligence on your iPhone, or from your pantry and saved foods, when Claude is off or can't be reached",
    'Plan any day up to two weeks ahead, and copy a meal to every weekday at once',
    'Log what you actually ate; the plan is never overwritten',
    'Close the residual: a deterministic solver re-sizes the meals still ahead by the smallest plausible change',
    'A forecast that shows where the day will land before you eat it',
    'Foods matched to USDA FoodData Central, with barcode scanning and on-device Nutrition Facts label reading',
    'Foods to avoid, allergies included, left out of every plan',
    'A grocery list from every planned day, by aisle',
    "Share a meal by link or AirDrop, sized to the other person's targets",
    'Portions stored in grams, shown in grams, ounces, cups, tablespoons or millilitres',
    'Private iCloud sync, no account, no tracking',
    'CSV export of eaten and planned grams for your tracker or nutritionist',
  ],
};
