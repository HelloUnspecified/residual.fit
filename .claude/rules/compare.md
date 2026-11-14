---
paths:
  - src/content/compare/**
  - src/components/compare/**
  - src/pages/compare/**
  - scripts/check-compare.mjs
  - tests/compare.test.ts
---

# The compare pages (/compare/)

`/compare/` puts Residual beside MacroFactor, Cronometer, MyFitnessPal and Eat This Much; `/compare/<slug>/` is one
page per app. Both come from one route (`src/pages/compare/[...slug].astro`) and one set of data files.

## Where things are

- `src/content/compare/rows.ts`: the questions every app answers (id, label, group), in table order.
- `src/content/compare/<slug>.ts`: one file per app, and the only place anything about that app is written: its
  name, `checked` date, the "Pick X if" line for the overview, a cell per row (`short`, optional `detail`, `mark`,
  `sources`), its sources (id, title, https url), and its page's text, illustration, price and switching notes.
- `src/content/compare/residual.ts`: Residual's own column (app 1.1.0). Prices, plan names, the trial and the minimum
  iOS come from `src/site.ts`; never type them here. `roadmap: true` marks a cell whose detail says it is planned.
- `src/content/compare/index.ts`: the list of apps, in page order. `types.ts` documents every field and the text
  marks: `**bold**`, `[text](/link/)`, `[sourceid]` or `[id, id]` after the sentence it backs, and `{roadmap}`.
- `src/components/compare/`: the overview, the app page, the table, the illustration, the sources list, the close.
- Source numbers are counted, never typed: the overview numbers every app's sources in one run, an app's page from 1.
- `site.roadmapUrl` in `src/site.ts` is `null` until `/roadmap/` exists. While it is null, roadmap pointers say
  "planned for a later version" as text; set it and they become "On the roadmap" links. Never link a page that
  doesn't exist yet.

## Tone, in the owner's words

"I think there is room for all of these. Those apps are great, I don't want to say they're terrible or better. we're
just different."

- Say what each app is for and who it suits. No ranking in either direction: not better, best, ahead, behind, falls
  short, gaps, biggest, worse, beats, wins, or anything like them.
- Headings are "Residual and MacroFactor", never "vs".
- Residual's own plain facts stay plain: iPhone only, no free tier, it lands the targets you set rather than changing them.
- A short form in the table never claims more than its detail and sources support. "Not stated" means the app's own
  pages don't say; it is never a guess.
- Marks are claims too, and they are even-handed. `partly` means the capability itself is partial. A whole capability
  that needs a paid tier is `yes`, with the tier in the short form ("Yes, with Premium"): Residual has no free tier,
  so every one of its own marks is paid as well. `no` needs the app's own statement; where its pages are only silent,
  say what they show ("None listed", "No planner listed") with no mark.
- Keep the conditions a source gives: the tier, platform, country, language or client count goes into the short form
  or the detail, never dropped. "Can" stays "can"; an inference is never written as a statement.
- The close on each app page says to cancel Residual before its trial ends, since the page also names the other app's trial.
- An illustration is labelled as one in its caption, shows no other app's screens, and puts no number on the other
  app's side that a source doesn't give.

## Privacy, ads and data use: only what their own page says

Anything about another app's privacy, ads or data use is "its own page/label/policy says X", linked to that page,
with no characterisation of it. The "Data used to track you" row says only what the app's App Store privacy label
lists, attributed to the label. Don't summarise a privacy policy beyond the sentence a cell quotes.

## Re-checking an app (every 90 days at most)

The build warns from 75 days after an app's `checked` date and fails after 90. To re-check one:

1. Open its file, `src/content/compare/<slug>.ts`.
2. Open every source in its `sources` list, one by one.
3. Compare each cell (short form and detail) and each sentence of its page text that cites that source with what the
   page says today. Correct what changed. If a page no longer supports a cell, make it `short: 'Not stated'` with no
   mark, or remove the sentence. If a page moved, update the url and title; if it is gone, find the app's own page
   that says the same thing or drop the claim.
4. Only use the app's own site, help centre, blog, roadmap, staff forum posts or App Store listing. No third-party
   reviews, no memory.
5. Check prices on the source the price card names, and that they are US prices.
6. Set `checked` to the day you did this, written like `14 November 2026`.
7. `npm run build`; the prebuild check says what's wrong, if anything.

## Adding a row or an app

- A row: add it to `rows.ts` in the right group, then give every app's file and `residual.ts` a cell for it, each
  with sources (or `short: 'Not stated'`). The pages pick it up; the row count in their text is counted.
- An app: copy an existing app's file to `src/content/compare/<slug>.ts`, change `key` (short, unique), `name`, `slug`,
  then fill every row, source and page field from the app's own pages. Add it to `competitors` in `index.ts`. The
  footer, sitemap and overview follow. The phone switcher handles up to six apps (`MAX_COMPETITORS` in `check.ts`).
  The overview's card grid is laid out for five cards; check it at 1440 and 375 if the count changes.

## What the prebuild check enforces

`scripts/check-compare.mjs` runs before every build (`npm run build`) with the rules in `src/content/compare/check.ts`,
tested in `tests/compare.test.ts` (`npm test`). It fails the build when:

- an app, or Residual's column, is missing a row or has a cell for a row that doesn't exist;
- a cell, a sentence of page text, or a price card cites a source id its app doesn't define;
- a source has no title or no https link, or two sources share an id;
- a competitor cell with a mark, a detail, or any short form other than "Not stated" has no source;
- a cell is marked `partly` when its short form is only a paid tier's name (mark it `yes` and name the tier);
- a mark is not yes, partly, no or none, or text has a mistyped mark (a stray bracket, brace or `**`);
- the illustration's caption doesn't say it's an illustration;
- `checked` isn't a date like "14 November 2026", is in the future, or is more than 90 days old (a warning from 75).

It warns, without failing, about a source no cell or sentence cites.
