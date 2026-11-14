// The compare data's prebuild check (src/content/compare/check.ts), fed small made-up apps. `npm test` (Node 22.18+,
// which runs TypeScript directly). The last test runs it on the real data, so a broken data file fails here too.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkCompare, parseChecked } from '../src/content/compare/check.ts';
import { competitors, residual, rows as realRows } from '../src/content/compare/index.ts';
import type { Competitor, ResidualCell, Row } from '../src/content/compare/types.ts';

const rows: Row[] = [{ id: 'plans', label: 'Plans your day' }, { id: 'ads', label: 'Ads' }];
const residualCells: Record<string, ResidualCell> = { plans: { mark: 'yes', short: 'Yes' }, ads: { mark: 'none', short: 'None' } };
const today = new Date(2026, 10, 14); // 14 November 2026, local

const app = (change: (a: Competitor) => void = () => {}): Competitor => {
  const a: Competitor = {
    key: 'ex', name: 'Example', slug: 'example', checked: '14 November 2026',
    forYouIf: 'you like examples. [home]',
    cells: { plans: { mark: 'no', short: 'No', detail: 'No, its page says', sources: ['home'] }, ads: { mark: 'none', short: 'Not stated' } },
    sources: [{ id: 'home', title: 'Example home page', url: 'https://example.com/' }],
    page: {
      title: 'Residual and Example', description: 'd', summary: 'It is an example. [home]',
      pickThem: ['You like examples. [home]'], pickThemNote: 'Note. [home]',
      pickResidual: ['You plan.'], pickResidualNote: 'Apple Health is {roadmap}.',
      difference: { heading: 'h', paragraphs: ['**Example** does things. [home]'] },
      figure: { them: { kicker: 'Then, in Example', notes: ['It shows what’s left. [home]'] }, us: { kicker: 'Then, in Residual' }, caption: 'An illustration, not a screenshot.' },
      price: { main: '$1', per: 'a month', more: '', trial: '', sources: [{ id: 'home', label: 'home page' }] },
      switching: { movingOver: 'It exports. [home]', keepingBoth: 'Both work.' },
      end: 'e',
    },
  };
  change(a);
  return a;
};
const run = (a: Competitor, when = today) => checkCompare({ rows, residualCells, competitors: [a], today: when });
const has = (list: string[], text: RegExp) => assert.ok(list.some((l) => text.test(l)), `expected a line matching ${text}, got:\n${list.join('\n')}`);

test('good data passes', () => assert.deepEqual(run(app()), { errors: [], warnings: [] }));

test('a missing row fails, and says which', () => {
  const { errors } = run(app((a) => { delete a.cells.ads; }));
  has(errors, /no cell for the row "ads"/);
});
test('a row that does not exist fails', () => {
  const { errors } = run(app((a) => { a.cells.colour = { mark: 'none', short: 'Not stated' }; }));
  has(errors, /"colour", which isn't a row/);
});
test('Residual’s column must cover every row too', () => {
  const { errors } = checkCompare({ rows, residualCells: { plans: residualCells.plans }, competitors: [app()], today });
  has(errors, /residual\.ts: no cell for the row "ads"/);
});

test('a cell citing an unknown source fails', () => {
  const { errors } = run(app((a) => { a.cells.plans.sources = ['blog']; }));
  has(errors, /row "plans": cites "blog", which isn't one of its sources/);
});
test('page text citing an unknown source fails', () => {
  const { errors } = run(app((a) => { a.page.difference.paragraphs = ['It does things. [blog]']; }));
  has(errors, /difference\.paragraphs\[0\]: cites "blog"/);
});
test('a price card naming an unknown source fails', () => {
  const { errors } = run(app((a) => { a.page.price.sources = [{ id: 'pricing', label: 'pricing page' }]; }));
  has(errors, /page\.price: cites "pricing"/);
});
test('a mistyped mark fails', () => {
  const { errors } = run(app((a) => { a.page.summary = 'It is an example [Home].'; }));
  has(errors, /isn't a mark the pages read/);
});

test('a source without a title or an https link fails', () => {
  const { errors } = run(app((a) => { a.sources = [{ id: 'home', title: ' ', url: 'http://example.com/' }]; }));
  has(errors, /source "home" has no title/);
  has(errors, /source "home" needs an https link/);
});

test('a marked or factual cell without a source fails', () => {
  has(run(app((a) => { a.cells.plans = { mark: 'yes', short: 'Yes' }; })).errors, /“Yes” has no source/);
  has(run(app((a) => { a.cells.ads = { mark: 'none', short: 'Free tier' }; })).errors, /“Free tier” has no source/);
  has(run(app((a) => { a.cells.ads = { mark: 'none', short: 'Not stated', detail: 'Its page says nothing' }; })).errors, /“Not stated” has no source/);
});
test('half a mark only for a paid tier fails; a full mark naming the tier passes', () => {
  has(run(app((a) => { a.cells.plans = { mark: 'partly', short: 'Premium', sources: ['home'] }; })).errors, /marked partly only for its tier/);
  has(run(app((a) => { a.cells.plans = { mark: 'partly', short: 'Yes, with Premium+', sources: ['home'] }; })).errors, /marked partly only for its tier/);
  assert.deepEqual(run(app((a) => { a.cells.plans = { mark: 'yes', short: 'Yes, with Premium', sources: ['home'] }; })).errors, []);
  assert.deepEqual(run(app((a) => { a.cells.plans = { mark: 'partly', short: 'Targets: fiber only', sources: ['home'] }; })).errors, []);
});
test('“Not stated” with no mark needs no source', () => assert.deepEqual(run(app()).errors, []));

test('the checked date must be a real date', () => {
  has(run(app((a) => { a.checked = '2026-11-14'; })).errors, /write the date like "14 November 2026"/);
  has(run(app((a) => { a.checked = '31 November 2026'; })).errors, /write the date like/);
  has(run(app((a) => { a.checked = '15 November 2026'; })).errors, /in the future/);
  assert.equal(parseChecked('1 March 2026')?.toISOString().slice(0, 10), '2026-03-01');
});
test('74 days old passes quietly; 75 warns; 90 still passes', () => {
  const at = (days: number) => run(app(), new Date(2026, 10, 14 + days));
  assert.deepEqual(at(74), { errors: [], warnings: [] });
  has(at(75).warnings, /75 days ago; the build fails after 90/);
  assert.deepEqual(at(90).errors, []);
});
test('more than 90 days old fails, and says what to do', () => {
  const { errors } = run(app(), new Date(2027, 1, 13)); // 91 days on
  has(errors, /last checked 14 November 2026, 91 days ago \(the limit is 90\)/);
  has(errors, /open each of its sources, compare what they say with its cells and page text, correct anything that changed/);
  has(errors, /set checked to the day you did it, in src\/content\/compare\/example\.ts/);
});

test('a source nobody cites is a warning, not a failure', () => {
  const result = run(app((a) => { a.sources.push({ id: 'blog', title: 'Example blog', url: 'https://example.com/blog/' }); }));
  assert.deepEqual(result.errors, []);
  has(result.warnings, /source "blog" isn't cited anywhere/);
});

test('the real data passes, on the day it was checked', () => {
  const day = new Date(2026, 10, 14);
  assert.deepEqual(checkCompare({ rows: realRows, residualCells: residual.cells, competitors, today: day }).errors, []);
});
