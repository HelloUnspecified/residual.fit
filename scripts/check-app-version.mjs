// Checks public/app/ios.json before every build (npm "prebuild"), so a typo never reaches anyone's iPhone.
// The app reads this file at launch (ResidualKit AppUpdatePolicy): below "latest" it suggests updating, at most
// weekly; below "minimum" it shows only the update screen. The app ignores a file that fails these same checks,
// but then it falls back to the last good copy, so a broken file would quietly freeze whatever was there before.
//
// Raise "minimum" only once that version is live in the App Store: the update screen has no way out but the store.
import { readFileSync } from 'node:fs';

const path = new URL('../public/app/ios.json', import.meta.url);
const fail = (why) => {
  console.error(`public/app/ios.json: ${why}`);
  process.exit(1);
};

let file;
try {
  file = JSON.parse(readFileSync(path, 'utf8'));
} catch (error) {
  fail(`not valid JSON (${error.message})`);
}

const version = (key) => {
  const value = file[key];
  if (typeof value !== 'string' || !/^\d{1,6}(\.\d{1,6}){0,3}$/.test(value)) {
    fail(`"${key}" must be a version like "1.0" or "1.0.1", not ${JSON.stringify(value)}`);
  }
  return value.split('.').map(Number);
};
const compare = (a, b) => {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const d = (a[i] ?? 0) - (b[i] ?? 0);
    if (d) return Math.sign(d);
  }
  return 0;
};

if (file.schema !== 1) fail('"schema" must be 1 (the only one the app reads)');
const latest = version('latest');
const minimum = version('minimum');
if (compare(minimum, latest) > 0) fail('"minimum" is above "latest"');

const text = (key, limit) => {
  if (file[key] === undefined) return;
  if (typeof file[key] !== 'string' || !file[key].trim()) fail(`"${key}" must be text, or left out`);
  if (file[key].trim().length > limit) fail(`"${key}" is over ${limit} characters; the app would drop it`);
};
text('title', 60);
text('message', 300);

if (file.url !== undefined) {
  let url;
  try {
    url = new URL(file.url);
  } catch {
    fail('"url" is not a link');
  }
  if (url.protocol !== 'https:' || !['residual.fit', 'www.residual.fit'].includes(url.hostname) || url.port || url.username) {
    fail('"url" must be an https link on residual.fit; the app drops any other');
  }
}

const known = new Set(['schema', 'latest', 'minimum', 'title', 'message', 'url']);
const extra = Object.keys(file).filter((key) => !known.has(key));
if (extra.length) fail(`unknown field ${extra.map((k) => `"${k}"`).join(', ')} (the app ignores it)`);

console.log(`public/app/ios.json: latest ${file.latest}, minimum ${file.minimum}`);
