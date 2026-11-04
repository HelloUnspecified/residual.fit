// The questions on the support page. One list feeds both the page (pages/support.astro) and its FAQPage
// structured data, so what search and answer engines read is exactly what a visitor reads, as with the home
// page's faq.ts. Each answer is a list of paragraphs. A paragraph may carry a link as a plain <a href="…">
// tag; the structured data keeps the words and drops the tag. `problem` questions are drawn together as one
// list under "Something isn't working" instead of each under its own heading.
import { site } from '../site';

export interface Help { q: string; a: string[]; problem?: boolean }

const prices = site.plans.map((p) => `$${p.price} ${p.per}`);
const priceList = `${prices.slice(0, -1).join(', ')} or ${prices.at(-1)}`;

export const help: Help[] = [
  { q: 'How does the Residual Plus subscription work?', a: [
    `Everything in Residual is part of Residual Plus, an auto-renewing subscription. There is no free tier. It costs ${priceList}, and every plan starts with a ${site.trialDays}-day free trial. The App Store shows the price in your currency. <a href="/pricing/">Pricing</a> explains what it pays for.`,
    'Apple handles the payment; we only see whether your subscription is active. To change or cancel, open Settings → your name → Subscriptions. Cancel at least 24 hours before the trial ends and you won\'t be charged.',
    'On a new iPhone, sign in with the same Apple Account and install Residual. If it asks you to subscribe, tap Restore Purchases.',
    'When your subscription or trial ends, the app locks until you subscribe again. Your data stays: from the lock screen you can still export it (More → Export to a spreadsheet) and Restore Purchases.',
  ] },
  { q: 'Does Residual work offline?', a: [
    'Residual works without a connection. Targets, logging, the solver and the forecast run on your iPhone. Planning uses Apple Intelligence on iPhones that have it turned on; otherwise plans are built from your pantry, saved meals and built-in foods. Food search shows the foods you\'ve already saved, used or put in your pantry, plus USDA\'s generic foods, which come with the app.',
    'Planning with Claude and packaged foods from USDA need a connection, and the app shows when you\'re offline. iCloud sync catches up when you\'re back online.',
  ] },
  { q: 'How does planning with Claude work?', a: [
    'Before your first plan, the app asks once: "Plan with Claude?" Nothing goes to Anthropic unless you choose Use Claude. Turn it on or off any time in More → AI planning. If it\'s off, or Claude can\'t be reached, Apple Intelligence plans on your iPhone (or, without it, your own foods do), and every plan says who wrote it. The <a href="/privacy/">privacy policy</a> lists what each request sends.',
    'Claude can also suggest a food to add when Close the residual can\'t bring the day into range with the foods you have. If you haven\'t allowed Claude yet, the app asks first. Claude picks the food; the solver sizes it.',
    'A plan says which planner made it. "Planned by Apple Intelligence on this iPhone" or "Built from your pantry and library" means Claude didn\'t plan that day: it\'s turned off, you\'ve reached today\'s Claude limit, you\'re offline, or Claude couldn\'t be reached, and the plan says which. The solver still sizes every portion.',
  ] },
  { q: 'Where is my data, and how do I export or delete it?', a: [
    'Your days, foods and targets are stored on your iPhone and, with iCloud on, in your private iCloud database, which keeps your devices in sync. More → iCloud sync shows whether it\'s on.',
    'More → Export to a spreadsheet saves the days you pick as a CSV file, one row per food, to open in Numbers, Excel or Google Sheets.',
    'Delete single items in the app. Deleting the app removes its data from the phone. To remove the iCloud copy, open Settings → your name → iCloud → Manage Storage → Residual. To delete anything we hold, such as a support email or your newsletter address, write to us.',
  ] },
  { problem: true, q: 'Why do plans say "Planned by Apple Intelligence on this iPhone" while I\'m online?', a: [
    'Check that Plan with Claude is on in More → AI planning and that you have a connection. If you\'ve reached today\'s Claude limit, the plan says so, and Claude is back tomorrow. If Claude couldn\'t be reached, the plan says why; try again in a minute.',
  ] },
  { problem: true, q: 'Why does food search say the database is busy?', a: [
    'USDA limits how often it answers. Try again in a minute; your saved foods and pantry still work.',
  ] },
  { problem: true, q: 'Why doesn\'t sync show on my other device?', a: [
    'Both devices must be signed in to the same Apple Account, with iCloud on for Residual (Settings → your name → iCloud). More → iCloud sync shows whether it\'s on.',
  ] },
  { q: 'What does "can\'t fully recover" mean?', a: [
    'The meals ahead cannot absorb what has been eaten without shrinking a food below half its plan or growing one past double. Close the residual still gets as close as it can. Tap the + on Today for Suggest a fix, which finds the best few changes from what you already have.',
  ] },
  { q: 'What does "to match" on a planned food mean?', a: [
    'It is still an AI estimate. Tap Match under the verdict on Today, or the food itself, and pick its real USDA entry; the plan then uses real numbers, and the match carries into the log.',
  ] },
];
