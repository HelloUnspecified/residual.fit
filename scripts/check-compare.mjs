// Checks the compare pages' data (src/content/compare/) before every build (npm "prebuild"), so a page about another
// app never ships citing a source it doesn't list, missing a row, or resting on facts nobody has looked at for three
// months. The rules are in src/content/compare/check.ts (tested in tests/compare.test.ts); this prints what they find.
// Node 22.18+ reads the TypeScript data files directly.
import { checkCompare } from '../src/content/compare/check.ts';
import { competitors, residual, rows } from '../src/content/compare/index.ts';

const { errors, warnings } = checkCompare({ rows, residualCells: residual.cells, competitors, today: new Date() });

for (const w of warnings) console.warn(`compare (warning): ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`compare: ${e}`);
  console.error(`compare: ${errors.length} problem${errors.length === 1 ? '' : 's'} in src/content/compare/; the build stops here.`);
  process.exit(1);
}

const sources = competitors.reduce((n, app) => n + app.sources.length, 0);
console.log(`compare: ${competitors.length} apps, ${rows.length} rows, ${sources} sources, checked ${[...new Set(competitors.map((a) => a.checked))].join(', ')}`);
