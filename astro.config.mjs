// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import { readdirSync, readFileSync } from 'node:fs';

// Each Markdown page states when it last changed (`updated:` in its frontmatter, read the same way as
// layouts/Doc.astro). The sitemap gives those pages that date as lastmod. The other pages are built from many
// components and carry no date of their own, so they get none rather than a guessed one.
const lastmod = Object.fromEntries(
  readdirSync('src/pages')
    .filter((file) => file.endsWith('.md'))
    .flatMap((file) => {
      const updated = readFileSync(`src/pages/${file}`, 'utf8').match(/^updated:\s*(.+)$/m)?.[1].trim();
      const date = updated ? new Date(`${updated} 12:00 UTC`) : null;
      return date && !Number.isNaN(date.getTime()) ? [[`/${file.slice(0, -3)}/`, date.toISOString()]] : [];
    }),
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
  // Keep HTML-aware whitespace handling: the page sets inline spans on separate source lines.
  compressHTML: true,
  // Every page is prerendered to static HTML; only src/pages/api/subscribe.ts (prerender = false) runs on
  // request, in the site's Cloudflare Worker. Images are optimised at build time ("compile"), as before.
  output: 'static',
  adapter: cloudflare({ imageService: 'compile' }),
});
