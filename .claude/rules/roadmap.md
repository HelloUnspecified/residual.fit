---
paths:
  - src/content/roadmap.ts
  - src/lib/roadmap.ts
  - src/components/roadmap/**
  - src/pages/roadmap.astro
  - src/pages/releases/**
  - scripts/check-roadmap.mjs
---

# The roadmap (/roadmap/)

The page draws everything from `src/content/roadmap.ts`, in the file's order, plus the release notes in
`src/pages/releases/`. `npm run build` checks both first (`scripts/check-roadmap.mjs`, rules in `src/lib/roadmap.ts`).

## Items

- **Add** an item with a new `id`, a `stage` (`now`, `next`, `later`, `not-planned`), a `title`, and a `text` of one or two plain sentences for a customer. `note` (a pill such as "Needs Apple's review") and `link` (`{ href, label }`) are optional. A site link must point at a page that exists; the check refuses one that doesn't.
- **Move** an item by changing its `stage` and its place in the list. Keep the `id`.
- **Retire** an item by deleting it, and check that nothing links to `/roadmap/#<id>` any more (`grep -rn "roadmap/#" src public`): the FAQ's Apple Health answer does today.
- **Ids never change once published.** Other pages, posts and emails link to `/roadmap/#<id>`. Lowercase words joined by hyphens, never derived from the title, never reused for something else.
- A stage with no items draws nothing, heading included, and drops out of "On this page".
- `not-planned` needs the owner's say-so. Its reason is the owner's own, said calmly, and never runs down another app or the people who want the thing.

## Wording

- No dates, and no versions on unshipped items. The one exception is an item for a release that is already built and waiting on Apple (Residual 1.1), which names itself.
- No vendor names, prices or costs. Pricing explains the money; link to it if needed, don't restate it.
- Nothing that depends on Apple's say-so (an entitlement, App Review) stated as a promise.
- Fixes go in release notes, not here. The roadmap is for what Residual will do, not what it does wrong.
- Say no more than the owner has decided. If a direction is open (which parts of Apple Health, which food source), say what it means for the reader and leave the choice out.
- The site's solver copy says calories, protein, carbs and fat are what the day is re-sized to land. An item that adds a number (fiber) says it's tracked and shown, not landed.
- Keep `updated` true: bump it to the day ("14 November 2026") whenever an item is added, moved, reworded or retired. It is shown on the page, used as the page's `dateModified` and as its sitemap `lastmod`.

## When a version ships

1. Write its release notes, `src/pages/releases/<version>.md`, with `highlights` in the frontmatter: two to four plain headline changes. Quote any that contain ": ", or YAML reads them as keys (the check says so). The row's date is `updated`; add `released: <date>` too the first time the notes are edited after the release, so the row keeps the release day.
2. Take its item out of Now (or move the parts that didn't make it).
3. Bump `updated` in `src/content/roadmap.ts`.

Shipped picks the release up from the notes and links to them. `earlierReleases` in the data file is only for releases with no notes page (1.0); a version must not be in both.
