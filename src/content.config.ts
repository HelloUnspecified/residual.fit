// The help articles: Markdown under src/content/help/<section>/<slug>.md, one task to a page. The authoring
// guide is .claude/rules/help.md; the sections are src/content/help-sections.ts.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// "13 November 2026", the form the site's other Markdown pages use for `updated`. Checked here so a typo fails
// the build instead of leaving the page without a date in its foot, its structured data and the sitemap.
const day = z.string().refine((s) => !Number.isNaN(new Date(`${s} 12:00 UTC`).getTime()) && /^\d{1,2} [A-Z][a-z]+ \d{4}$/.test(s), {
  message: 'Write the date as "13 November 2026"',
});

const help = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/help' }),
  schema: z.object({
    title: z.string(),
    // The meta description, and what a search result shows when Pagefind finds no excerpt. Under ~160 characters.
    description: z.string().max(200),
    // The paragraph under the title. Optional; most articles have one.
    lead: z.string().optional(),
    // A short line for the Getting started tiles on the help home. Optional; other sections don't show it.
    summary: z.string().optional(),
    // Its place within its section, lowest first.
    order: z.number(),
    updated: day,
    // The app version the article first applies to: "1.0", "1.1.0".
    since: z.string().regex(/^\d+\.\d+(\.\d+)?$/, 'Write the version as 1.0 or 1.1.0'),
    // A troubleshooting entry: something isn't working.
    problem: z.boolean().optional(),
  }),
});

export const collections = { help };
