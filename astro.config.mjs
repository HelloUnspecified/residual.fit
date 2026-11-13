// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import { satteri } from '@astrojs/markdown-satteri';
import { readdirSync, readFileSync } from 'node:fs';
import { helpMdast, helpHast } from './src/lib/help-markdown.mjs';

// Each Markdown page states when it last changed (`updated:` in its frontmatter, read the same way as
// layouts/Doc.astro). The sitemap gives those pages that date as lastmod. The other pages are built from many
// components and carry no date of their own, so they get none rather than a guessed one.
const updatedOf = (path) => {
  const updated = readFileSync(path, 'utf8').match(/^updated:\s*(.+)$/m)?.[1].trim();
  const date = updated ? new Date(`${updated} 12:00 UTC`) : null;
  return date && !Number.isNaN(date.getTime()) ? date : null;
};
const pages = readdirSync('src/pages')
  .filter((file) => file.endsWith('.md'))
  .flatMap((file) => {
    const date = updatedOf(`src/pages/${file}`);
    return date ? [[`/${file.slice(0, -3)}/`, date]] : [];
  });
// The help articles (src/content/help/<section>/<slug>.md, served at /help/<section>/<slug>/) the same way, and
// the help home takes the date of the most recently changed article, since its lists are drawn from them.
const help = readdirSync('src/content/help', { recursive: true })
  .filter((file) => file.endsWith('.md'))
  .flatMap((file) => {
    const date = updatedOf(`src/content/help/${file}`);
    return date ? [[`/help/${file.replace(/\\/g, '/').slice(0, -3)}/`, date]] : [];
  });
const newest = help.reduce((a, [, d]) => (a && a > d ? a : d), null);
const lastmod = Object.fromEntries(
  [...pages, ...help, ...(newest ? [['/help/', newest]] : [])].map(([path, date]) => [path, date.toISOString()]),
);

// The deployed origin. Share links (`/s/#…`) and the universal-link association file live on the same
// domain, so this is also what `SHARE_LINK_BASE` in Residual/Info.plist points at.
export default defineConfig({
  site: 'https://residual.fit',
  // The sitemap lists the pages worth finding: not the social-card render (/og/) or the 404 page.
  integrations: [
    sitemap({
      filter: (page) => !/\/(og|404)\/?$/.test(new URL(page).pathname),
      serialize: (item) => {
        const date = lastmod[new URL(item.url).pathname];
        return date ? { ...item, lastmod: date } : item;
      },
    }),
  ],
  // Astro's own Markdown processor, with the help's conventions (callouts, in-app paths, screenshots, tables) for
  // src/content/help/ only; the plugins leave every other Markdown page as it was. See src/lib/help-markdown.mjs.
  markdown: {
    processor: satteri({ mdastPlugins: [helpMdast], hastPlugins: [helpHast] }),
  },
  // Keep HTML-aware whitespace handling: the page sets inline spans on separate source lines.
  compressHTML: true,
  // Every page is prerendered to static HTML; only src/pages/api/subscribe.ts (prerender = false) runs on
  // request, in the site's Cloudflare Worker. Images are optimised at build time ("compile"), as before.
  output: 'static',
  adapter: cloudflare({ imageService: 'compile' }),
  // Nothing here uses Astro sessions. Left on, the adapter adds a SESSION KV binding with no id, and
  // `wrangler preview`, the deploy step for a branch, refuses a binding without one.
  session: false,
});
