// Checks the roadmap before every build (npm "prebuild"), so a broken anchor or a dead link never goes out.
// Other pages and posts link to /roadmap/#<id>, and Shipped is read from the release notes, so the things
// that can go wrong are quiet ones: a duplicate id sends a link to the wrong item, a link to a page that was
// never written is a 404, and release notes without `highlights` would leave a row empty. The rules themselves
// live in src/lib/roadmap.ts, where tests/roadmap.test.ts checks them; this reads the files and applies them.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { roadmap } from '../src/content/roadmap.ts';
import { readFrontmatter, releaseFromNotes, roadmapProblems, shippedProblems } from '../src/lib/roadmap.ts';

const root = new URL('../', import.meta.url);
const releasesDir = new URL('src/pages/releases/', root);

// A site path is a page when src/pages has a file for it (/pricing/ is pricing.astro, pricing.md or
// pricing/index.astro), or when public/ serves it as is (/llms.txt).
const pageExists = (path) => {
  const clean = decodeURIComponent(path).replace(/^\/+|\/+$/g, '');
  if (clean.includes('..')) return false;
  const pages = ['.astro', '.md'].flatMap((ext) => (clean ? [`${clean}${ext}`, `${clean}/index${ext}`] : [`index${ext}`]));
  return pages.some((file) => existsSync(new URL(`src/pages/${file}`, root))) || (clean !== '' && existsSync(new URL(`public/${clean}`, root)));
};

const problems = roadmapProblems(roadmap, pageExists).map((why) => `src/content/roadmap.ts: ${why}`);

const notes = readdirSync(releasesDir).filter((file) => file.endsWith('.md'));
const fromNotes = notes.map((file) => {
  const { data, problems: frontmatter } = readFrontmatter(readFileSync(new URL(file, releasesDir), 'utf8'));
  const { release, problems: found } = releaseFromNotes(file, data);
  problems.push(...frontmatter.map((why) => `src/pages/releases/${file}: ${why}`), ...found);
  return release;
});
problems.push(...shippedProblems(fromNotes, roadmap.earlierReleases).map((why) => `src/content/roadmap.ts: ${why}`));

if (problems.length) {
  for (const why of problems) console.error(why);
  process.exit(1);
}

const count = (stage) => roadmap.items.filter((item) => item.stage === stage).length;
console.log(
  `roadmap: ${roadmap.items.length} items (now ${count('now')}, next ${count('next')}, later ${count('later')}, not planned ${count('not-planned')}), ` +
    `${fromNotes.length + roadmap.earlierReleases.length} releases, updated ${roadmap.updated}`,
);
