// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The deployed origin. Share links (`/s/#…`) and the universal-link association file live on the same
// domain, so this is also what `SHARE_LINK_BASE` in Residual/Info.plist points at.
export default defineConfig({
  site: 'https://residual.fit',
  integrations: [sitemap({ filter: (page) => !page.endsWith('/og/') })],
  // Keep HTML-aware whitespace handling: the page sets inline spans on separate source lines.
  compressHTML: true,
});
