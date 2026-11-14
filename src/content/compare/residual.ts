// Residual's own column on the compare pages, and the lines about Residual every page shares. It describes app
// version 1.1.0, from this site's Features, Pricing and Privacy pages. Prices, plan names, the trial and the minimum
// iOS come from src/site.ts, so they follow it; never type them here.
//
// `roadmap: true` marks a cell whose detail says the thing is planned. Those cells, and the {roadmap} mark in the
// text, link to site.roadmapUrl once it is set; until then they say "planned for a later version" as text. Only
// what the site already calls planned gets one: Apple Health and larger food databases. Android doesn't: the
// site says it isn't on the near-term roadmap.
import { site } from '../../site.ts';
import type { ResidualCell } from './types.ts';

const money = (n: number) => `$${n.toFixed(2)}`;
const [first, ...rest] = site.plans;
const orList = (items: string[]) => (items.length > 1 ? `${items.slice(0, -1).join(', ')} or ${items.at(-1)}` : items[0]);

export const residual = {
  name: site.name,
  /** The app version this column describes. */
  version: '1.1.0',
  cells: {
    plans: { mark: 'yes', short: 'Yes, from your own food', detail: 'Yes. Claude, Apple Intelligence on your iPhone, or your pantry and saved meals draft the day from food you keep; Claude only if you allow it.' },
    resize: { mark: 'yes', short: 'Yes', detail: 'Yes: the same foods in new amounts, after you review them.' },
    ranges: { mark: 'yes', short: 'Yes, ± on each', detail: 'Yes, ± on each; any but one can float.' },
    adapt: { mark: 'no', short: 'No', detail: 'No; a TDEE calculator works them out from your body, activity and goal, then you set them.' },
    database: { mark: 'none', short: 'USDA, barcodes, your labels', detail: 'USDA FoodData Central, barcodes, and any food you add by photographing its Nutrition Facts label. Larger food databases are planned for a later release.', roadmap: true },
    micros: { mark: 'partly', short: 'Fiber only: tracked and shown, not a target', detail: 'Fiber only: tracked and shown, not one of the targets the day is solved against. No other micronutrients.' },
    scan: { mark: 'yes', short: 'Barcode and label', detail: 'Both. A label photo is read on your iPhone and never uploaded.' },
    grocery: { mark: 'yes', short: 'Yes, by aisle', detail: 'Yes, by aisle, from every planned day.' },
    platforms: { mark: 'none', short: 'iPhone only', detail: `iPhone only, ${site.minimumOS} or later. There is no Android version, and one isn’t on the near-term roadmap.` },
    health: { mark: 'no', short: 'Not yet', detail: 'Not yet; Apple Health support is planned for a later version.', roadmap: true },
    coach: { mark: 'no', short: 'No dashboard', detail: 'No dashboard; any day exports as a CSV to share.' },
    export: { mark: 'yes', short: 'CSV', detail: 'CSV of eaten and planned grams per food, for any days.' },
    account: { mark: 'none', short: 'None', detail: 'None. Your data is on your iPhone and in your own iCloud.' },
    ads: { mark: 'none', short: 'None' },
    tracking: { mark: 'none', short: 'None: no tracking, no analytics', detail: 'None. No tracking, no analytics and no account: no analytics SDK and no advertising identifier, and its [privacy policy](/privacy/) lists every request that leaves your phone.' },
    free: { mark: 'no', short: `No; ${site.trialDays}-day trial`, detail: `No free tier; every plan starts with a ${site.trialDays}-day free trial.` },
    price: { mark: 'none', short: `${money(first.price)} ${first.per}`, detail: `${orList(site.plans.map((p) => `${money(p.price)} ${p.name}`))}.` },
  } satisfies Record<string, ResidualCell> as Record<string, ResidualCell>,

  /** The "Which one is for you" card on the overview. */
  forYouIf: 'you plan meals ahead from food you already have, and want the rest of the day re-sized when lunch runs long. It’s iPhone only, with no free tier.',

  /** The price card on each competitor page. */
  price: {
    main: money(first.price),
    per: first.name,
    more: orList(rest.map((p) => `${money(p.price)} ${p.name}`)).replace(/ or /, ', or '),
    trial: `A ${site.trialDays}-day free trial. No free tier.`,
  },

  /** The two switching notes that are the same on every page. */
  fresh: 'Starting fresh takes a few minutes: set your targets, plan a day, and your foods and meals build up as you go.',
  takingYourData: 'Nothing in Residual is locked in. Any day exports as a CSV of eaten and planned grams per food, for a spreadsheet, a coach or another app.',
};
