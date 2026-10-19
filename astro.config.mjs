// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// The deployed origin. Share links (`/s/#…`) and the universal-link association file live on the same
// domain, so this is also what `SHARE_LINK_BASE` in Residual/Info.plist points at.
export default defineConfig({
  site: 'https://residual.fit',
  // The sitemap lists the pages worth finding: not the social-card render (/og/) or the 404 page.
  integrations: [sitemap({ filter: (page) => !/\/(og|404)\/?$/.test(new URL(page).pathname) })],
  // Keep HTML-aware whitespace handling: the page sets inline spans on separate source lines.
  compressHTML: true,
  // Every page is prerendered to static HTML; only src/pages/api/subscribe.ts (prerender = false) runs on
  // request, in the site's Cloudflare Worker. Images are optimised at build time ("compile"), as before.
  output: 'static',
  adapter: cloudflare({ imageService: 'compile' }),
});
