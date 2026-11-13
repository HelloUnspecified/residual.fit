---
paths:
  - src/content/help/**
  - src/content/help-sections.ts
  - src/components/help/**
  - src/pages/help/**
  - src/lib/help*
---

# Writing a help article

The help at `/help/` is plain Markdown, one task to a page, reviewed by someone who isn't a developer. No MDX, no components, no HTML in an article.

## The file

`src/content/help/<section>/<slug>.md` is served at `/help/<section>/<slug>/`. `<section>` is an `id` from `src/content/help-sections.ts`; the build fails on any other folder. The slug is the file name: lowercase, hyphens, a few words.

```yaml
---
title: Set your daily targets, ranges and landing order   # the h1, the search title, the topic list
description: One sentence, under ~160 characters.         # meta description; search shows it when it has no excerpt
lead: The paragraph under the title.                      # optional
summary: Calories, protein, carbs and fat, each with a range.   # optional; only Getting started's tiles show it
order: 1                                                  # its place in its section, lowest first
updated: 13 November 2026                                 # this form exactly; bump it whenever the article changes
since: "1.0"                                              # the app version it first applies to, quoted
problem: true                                             # optional; a troubleshooting entry
---
```

Previous and next, the topic list, the sitemap's date and the structured data all come from these fields. "On this page" comes from the `##` headings, so give each one a short, plain title. Use `###` only under a `##`.

## The Markdown

| Write | You get |
| --- | --- |
| `1.` `2.` `3.` | Numbered steps. Every ordered list in an article is drawn as steps, so use one only for steps done in order. |
| `` `More → Daily targets` `` | A place in the app, drawn as a path. Backticks mean "in the app" and nothing else. `->` works for `→`. |
| `` `+` `` or `` `…` `` | A single control drawn as a chip: the `+` at the bottom of Today, the `…` menu on a card or screen. |
| `**Apply**` | A button or label the reader taps or reads on screen. |
| `> [!NOTE] Title`, then a line with just `>`, then the text | A callout card with a title. A plain `>` quote is a callout without one. |
| `> [!OFF] Title` (same shape) | The amber callout. Only for "the day is off": amber means that on Today, nowhere else. |
| `![What the screen shows](shot:03a-drift "Caption")` | A screenshot in the phone, light or dark to match the reader. On a line of its own. |
| A pipe table | A table on its own card. |
| `[Close the residual](/help/closing-the-residual/close-the-residual/)` | A link to another article: always the full path with both slashes. Add `#heading-id` to land on a section: the heading in lowercase, spaces as hyphens, punctuation dropped (`#add-a-food-in-the-review`). |
| “Couldn't read that photo.” | A message or line the app shows, in curly quotes, word for word. Bold is for what the reader taps. |

A screenshot names a capture in `src/assets/shots/` without `-light.png` or `-dark.png`; both must exist. The alt text says what the screen shows, in words. Use a capture only if everything it shows is still true in the version the article describes; otherwise leave it out and say a fresh capture is needed. The alt text and caption describe that exact frame, numbers included ("Calories over 175.", not a number from an older capture), so check them whenever the capture is replaced.

## The facts

Every label, button, menu path, message and number in an article is checked against the app's source at the version the article describes (the app's own repo, read-only, at the tag for that version), and quoted exactly as it appears there: "Calculate from your body", not "Calculate from my body". If it can't be confirmed, leave it out. When the app changes a label, the article changes with it and its `updated` moves.

## The version

An article describes the app as it is at the version the help covers, and nothing else. No "new in 1.1.0", "now", "no longer", "used to" or "in earlier versions" in the body: `since` carries the version, and the release notes under `/releases/` carry the changes. Don't publish numbers the app treats as settings it may change without a release, such as Claude's daily limits; say there is a limit. Prices and the trial's length belong to `/pricing/` and `src/site.ts`; link there rather than repeating them.

## One home for each thing

Every behaviour is explained in one article; the others link to it. Before explaining a rule, a limit or a screen at length, look for the article that owns it (the solver's rules: `reference/how-the-numbers-work`; the source labels: `your-food/match-foods`; the ways out of an off day: `closing-the-residual/when-the-day-cant-land`; what's sent to Claude: `planning/who-plans`). A sentence and a link is enough elsewhere.

## The words

Use the app's words, and the same word for the same thing in every article:

- **saved meal** in your own sentences; quote the app's own labels exactly where they say favorite (**Save as favorite**, **Remove favorite**, "Favorite meals"). A single food you save is a favorite food.
- **range** for the ± around a target. "band" only inside a quote of the app ("Off plan · past a band of the day", the practice day's "green band").
- **AI estimate** for a food a planner guessed; **match** for linking it to a real food.
- **Close the residual** for the button and the review; "close the residual" as a verb in a sentence.
- **Floats** for the switch; "floating" for a target that has it on.

## The voice

The site's own: plain and direct, short sentences, second person, no marketing words, no emoji, few dashes. Say what's on screen and what to tap. One task to a page; link to the next article rather than covering it.

## A new section

Add `{ id, name, blurb }` to `helpSections` in `src/content/help-sections.ts`, in the place it should appear, and make the folder. A section with no articles yet doesn't show anywhere. `layout: 'start'` draws it as numbered tiles (Getting started), `'wide'` across the grid in two columns (Troubleshooting). `commonHelp` in the same file lists the help home's "Common" links, each an article id with a short label.

## Check it

`fnm exec --using=.node-version npm run build` builds the pages and then the search index (Pagefind, into `dist/client/pagefind`). Search only works on the built site, not in `npm run dev`. If an article's Markdown doesn't render as expected after changing `src/lib/help-markdown.mjs`, delete `.astro/` and `node_modules/.astro/`: rendered articles are cached by their content.
