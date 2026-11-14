// The roadmap's rules (src/lib/roadmap.ts), which the prebuild check applies to src/content/roadmap.ts and the
// release notes. `npm test` (Node 22.18+, which runs TypeScript directly).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  compareVersions, parseDay, readFrontmatter, releaseFromNotes, roadmapProblems, shipped, shippedProblems,
  type Roadmap, type RoadmapItem,
} from '../src/lib/roadmap.ts';
import { roadmap } from '../src/content/roadmap.ts';

const pages = new Set(['/', '/pricing/', '/roadmap/', '/releases/1.0.1/']);
const pageExists = (path: string) => pages.has(path);
const item = (over: Partial<RoadmapItem> = {}): RoadmapItem => ({ id: 'apple-health', stage: 'next', title: 'Apple Health', text: 'It will.', ...over });
const map = (items: RoadmapItem[], over: Partial<Roadmap> = {}): Roadmap => ({ updated: '14 November 2026', items, earlierReleases: [], ...over });
const problems = (r: Roadmap) => roadmapProblems(r, pageExists);

test('the real roadmap passes', () => assert.deepEqual(problems(roadmap), []));
test('a plain item passes', () => assert.deepEqual(problems(map([item()])), []));

test('a duplicate id fails', () => {
  const found = problems(map([item(), item({ title: 'Again' })]));
  assert.equal(found.length, 1);
  assert.match(found[0], /"apple-health": two items have this id/);
});
test('a malformed id fails', () => {
  for (const id of ['Apple-Health', 'apple health', 'apple--health', '-apple', '1-apple', '']) {
    assert.match(problems(map([item({ id })])).join('\n'), /lowercase words joined by hyphens/, id);
  }
});
test("an id the page already uses fails", () => {
  assert.match(problems(map([item({ id: 'shipped' })]))[0], /already uses this id/);
  assert.match(problems(map([item({ id: 'ask-title' })]))[0], /already uses this id/);
});
test('an unknown stage fails', () =>
  assert.match(problems(map([item({ stage: 'soon' as RoadmapItem['stage'] })]))[0], /unknown stage "soon"/));
test('an empty title or text fails', () => {
  assert.match(problems(map([item({ title: '  ' })]))[0], /title is empty/);
  assert.match(problems(map([item({ text: '' })]))[0], /text is empty/);
});
test('an empty note fails', () => assert.match(problems(map([item({ note: '' })]))[0], /note is empty/));

test('an invalid updated date fails', () => {
  for (const updated of ['2026-11-14', '14 Nov 2026', '31 February 2026', 'November 2026', '']) {
    assert.match(problems(map([item()], { updated })).join('\n'), /"updated" must be a date/, updated);
  }
});

test('links must reach a page', () => {
  assert.deepEqual(problems(map([item({ link: { href: '/pricing/', label: 'Pricing' } })])), []);
  assert.deepEqual(problems(map([item({ link: { href: 'mailto:support@residual.fit', label: 'Email' } })])), []);
  assert.match(problems(map([item({ link: { href: '/compare/', label: 'Compare' } })]))[0], /doesn't exist/);
  assert.match(problems(map([item({ link: { href: 'pricing/', label: 'Pricing' } })]))[0], /must start with/);
  assert.match(problems(map([item({ link: { href: 'http://example.com/', label: 'Insecure' } })]))[0], /must start with/);
  assert.match(problems(map([item({ link: { href: '/pricing/', label: '' } })]))[0], /no label/);
});
test('a link into the roadmap must name an item or a section', () => {
  assert.deepEqual(problems(map([item(), item({ id: 'android', link: { href: '/roadmap/#apple-health', label: 'Health' } })])), []);
  assert.deepEqual(problems(map([item({ link: { href: '/roadmap/#shipped', label: 'Shipped' } })])), []);
  assert.match(problems(map([item({ link: { href: '/roadmap/#nope', label: 'Nope' } })]))[0], /names no item or section/);
});

test('earlier releases need a version, a date and highlights', () => {
  const release = { version: '1.0', date: 'November 2026', highlights: ['The first one.'] };
  assert.deepEqual(problems(map([], { earlierReleases: [release] })), []);
  assert.deepEqual(problems(map([], { earlierReleases: [{ ...release, date: '8 November 2026' }] })), []);
  assert.match(problems(map([], { earlierReleases: [{ ...release, version: 'one' }] }))[0], /version must look like/);
  assert.match(problems(map([], { earlierReleases: [{ ...release, date: 'Autumn 2026' }] }))[0], /date must look like/);
  assert.match(problems(map([], { earlierReleases: [{ ...release, highlights: [] }] }))[0], /needs "highlights"/);
  assert.match(problems(map([], { earlierReleases: [release, release] }))[0], /listed twice/);
});

test('dates read in the site form only', () => {
  assert.equal(parseDay('9 November 2026'), '2026-11-09');
  assert.equal(parseDay('29 February 2028'), '2028-02-29');
  assert.equal(parseDay('29 February 2027'), null);
  assert.equal(parseDay('November 2026'), null);
  assert.equal(parseDay('November 2026', { monthOnly: true }), '2026-11');
});

test('versions sort by number, not by text', () => {
  assert.equal(compareVersions('1.10', '1.9'), 1);
  assert.equal(compareVersions('1.0', '1.0.0'), 0);
  const order = shipped(
    [{ version: '1.0.1', date: '9 November 2026', highlights: ['a'] }, { version: '1.10', date: '1 January 2027', highlights: ['b'] }],
    [{ version: '1.0', date: 'November 2026', highlights: ['c'] }],
  ).map((r) => r.version);
  assert.deepEqual(order, ['1.10', '1.0.1', '1.0']);
});

const notes = (frontmatter: string) => `---\n${frontmatter}\n---\n\n## Body\n`;
test('a release page gives its version, date, highlights and link', () => {
  const { data, problems: found } = readFrontmatter(notes("title: Residual 1.2\nupdated: 3 December 2026\nhighlights:\n  - One thing.\n  - 'Quoted: with a colon.'"));
  assert.deepEqual(found, []);
  const { release, problems: wrong } = releaseFromNotes('./releases/1.2.md', data);
  assert.deepEqual(wrong, []);
  assert.deepEqual(release, { version: '1.2', date: '3 December 2026', highlights: ['One thing.', 'Quoted: with a colon.'], href: '/releases/1.2/' });
});
test('released wins over updated', () => {
  const { data } = readFrontmatter(notes('released: 9 November 2026\nupdated: 1 December 2026\nhighlights:\n  - A.'));
  assert.equal(releaseFromNotes('1.0.1.md', data).release.date, '9 November 2026');
});
test('a release page without highlights or a date fails', () => {
  const none = readFrontmatter(notes('title: Residual 1.2\nupdated: 3 December 2026')).data;
  assert.match(releaseFromNotes('1.2.md', none).problems.join('\n'), /needs "highlights"/);
  const undated = readFrontmatter(notes('title: Residual 1.2\nhighlights:\n  - A.')).data;
  assert.match(releaseFromNotes('1.2.md', undated).problems.join('\n'), /needs a release date/);
});
test('an unquoted ": " in a highlight fails, since YAML would read a key', () =>
  assert.match(readFrontmatter(notes('highlights:\n  - Subscriptions: they work')).problems[0], /put the item in quotes/));
test('a release with notes may not also be an earlier release', () =>
  assert.match(shippedProblems([{ version: '1.0', date: '', highlights: [] }], [{ version: '1.0', date: 'November 2026', highlights: ['a'] }])[0], /has a notes page now/));

test('the 1.0.1 notes have what Shipped needs', () => {
  const { data, problems: found } = readFrontmatter(readFileSync(new URL('../src/pages/releases/1.0.1.md', import.meta.url), 'utf8'));
  assert.deepEqual(found, []);
  const { release, problems: wrong } = releaseFromNotes('1.0.1.md', data);
  assert.deepEqual(wrong, []);
  assert.equal(release.highlights.length, 3);
});
