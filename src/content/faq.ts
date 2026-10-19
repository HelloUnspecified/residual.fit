// The questions on the home page. One list feeds both the visible cards (Questions.astro) and the
// FAQPage structured data (pages/index.astro), so what search and answer engines read is exactly what
// a visitor reads. Answers are plain text: no markup, no links.
export interface Faq { tab: string; q: string; a: string }

export const faq: Faq[] = [
  { tab: 'Residual', q: 'What is Residual?', a: 'Residual is an iPhone meal planner for people who eat to calorie and macro targets. You set each target with its own range, Claude drafts the day from what is in your pantry, you log what you actually ate, and a deterministic solver re-sizes the meals still ahead so the day lands inside your ranges.' },
  { tab: 'Tracker', q: 'Does it replace Cronometer?', a: 'No. Residual is the planning layer in front of your tracker. You keep logging actuals there for your nutritionist; Residual plans the day, shows where it lands, and re-solves the meals ahead. Export any day as a CSV with eaten and planned grams, per food.' },
  { tab: 'AI', q: 'What does the AI do, exactly?', a: 'If you allow it, Claude drafts the day: meals, foods and grams from your pantry, your favorites and what you tell it. If not, the day is planned on your iPhone. That is all the AI owns. Landing the day inside your ranges is deterministic math, the same answer every time, with no AI in the loop.' },
  { tab: 'Drift', q: 'What if I eat something that was not in the plan?', a: 'Add it to the meal, log it, and the meals ahead re-size by the smallest plausible change. When the ranges cannot be met, the forecast says so plainly, "No room left", rather than shrinking a food to a token portion.' },
  { tab: 'Data', q: 'Where does my data live?', a: 'On your iPhone and in your private iCloud database. Planning with Claude asks first. A plan then sends your targets, the day so far, pantry foods, saved meals, recent meal names and your instructions to Anthropic through Apple\'s Foundation Models with App Attest; food search text goes to USDA FoodData Central. No account, no tracking, no analytics.' },
  { tab: 'Phone', q: 'Which iPhone does it need?', a: 'iOS 27 or later. It works offline: targets, logging, the solver and the forecast run on the phone, planning uses Apple\'s on-device model where Apple Intelligence is on (otherwise your pantry, saved meals and built-in foods), and food search shows the foods you\'ve already saved or used. Planning with Claude and USDA food search need a connection.' },
  { tab: 'Price', q: 'What does it cost?', a: 'There is no free tier. Everything in Residual is part of Residual Plus, an auto-renewing subscription that starts with a free trial, priced on the App Store. Manage or cancel any time in Settings → your name → Subscriptions.' },
];
