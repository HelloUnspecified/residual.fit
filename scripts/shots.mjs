// Brings the app's captures into src/assets/shots: the whole screens the site shows in a phone, and the pieces it
// shows on their own, cut at their real edges. Re-run it after re-capturing, from this repo's root:
//
//   node scripts/shots.mjs <folder of captures> [<folder of Home Screen captures>]
//
// The captures come from the app's repo: `scripts/screenshots/capture.sh 6.3` writes them to
// build/screenshots/raw/6.3, each as <frame>-light.png and <frame>-dark.png. Cuts are rectangles in the captures'
// own pixels (iPhone 18 Pro, 1206 × 2622); `find` then walks in from the rectangle's middle to the card's true edge,
// so a card that grew by a line is still cut right. If a screen's layout changes, look at the result. The Home Screen
// captures are home-1, home-2 and home-3 in each appearance, from testTheSitesWidgets in the app's WidgetShots.swift; each
// widget is cut with its corners made clear, so it sits on the page's own ground.
import sharp from 'sharp';
import { mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const [from, home] = process.argv.slice(2);
if (!from) { console.error('Usage: node scripts/shots.mjs <folder of captures> [<folder of Home Screen captures>]'); process.exit(1); }
const out = 'src/assets/shots';
mkdirSync(out, { recursive: true });

const frames = ['01-today', '02b-proposal', '03a-drift', '04-log', '05-targets'];
const gauges = ['eaten', 'landing', 'left', 'plan', 'clock'];
// Cards, by a point inside them. The bg is the card's surroundings, read from the capture.
const cards = [
  { name: 'card-grocery', frame: '08-grocery', x: 600, y: 1400 },
  { name: 'card-pantry', frame: '07a-pantry', x: 600, y: 1150 },
  { name: 'card-log', frame: '04-log', x: 600, y: 1200 },
];
// The hero on a gauge: the ring and the bars, and its name; full width, on the app's own ground. Since 1.1.0 the
// hero has no page dots under the name and the verdict sits higher, its first line from row 1024, so the cut is
// centered on the hero (rows 428 to 964) with 32 rows clear above and below, and stays 600 rows tall.
const hero = { left: 0, top: 396, width: 1206, height: 600 };
const modes = ['light', 'dark'];

const pixels = async (file) => {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const at = (x, y) => { const i = (y * info.width + x) * 3; return [data[i], data[i + 1], data[i + 2]]; };
  return { at, width: info.width, height: info.height };
};
const near = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]) < 6;

// A card's bounds: from a point on its own surface, out to where that surface stops, along the two axes.
async function find(file, x, y) {
  const p = await pixels(file);
  // Find the card's color on the row through (x, y): the most common color there.
  const counts = new Map();
  for (let i = 0; i < p.width; i++) { const k = p.at(i, y).join(); counts.set(k, (counts.get(k) ?? 0) + 1); }
  const surface = [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0].split(',').map(Number);
  let cx = x; while (!near(p.at(cx, y), surface) && cx < p.width - 1) cx++;
  let left = cx; while (left > 0 && near(p.at(left - 1, y), surface)) left--;
  let right = cx; while (right < p.width - 1 && near(p.at(right + 1, y), surface)) right++;
  // Up and down a column left of the content, where nothing but the card's surface lies. It meets the card's
  // rounded corner a little short of the true edge, so add that back (the app's card radius, 26 points at 3×).
  const inset = 30, r = 78, corner = Math.round(r - Math.sqrt(r * r - (r - inset) * (r - inset)));
  const column = left + inset;
  let top = y; while (top > 0 && near(p.at(column, top - 1), surface)) top--;
  let bottom = y; while (bottom < p.height - 1 && near(p.at(column, bottom + 1), surface)) bottom++;
  top -= corner; bottom += corner;
  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

for (const mode of modes) {
  for (const f of frames) {
    await sharp(join(from, `${f}-${mode}.png`)).png({ compressionLevel: 9, palette: false }).toFile(join(out, `${f}-${mode}.png`));
  }
  for (const c of cards) {
    const file = join(from, `${c.frame}-${mode}.png`);
    const box = await find(file, c.x, c.y);
    console.log(c.name, mode, box);
    await sharp(file).extract(box).png({ compressionLevel: 9 }).toFile(join(out, `${c.name}-${mode}.png`));
  }
  for (const g of gauges) {
    const file = join(from, `gauge-${g}-${mode}.png`);
    if (existsSync(file)) await sharp(file).extract(hero).png({ compressionLevel: 9 }).toFile(join(out, `gauge-${g}-${mode}.png`));
    else console.warn('no', file);
  }
}

// Widgets, in the Home Screen's grid on an iPhone 18 Pro: small 492 square, medium and large 1048 wide, radius about 25 points.
if (home) {
  const col = [80, 636], row = [270, 872, 1474];
  const small = 492, wide = 1048, tall = 1094;
  const widgets = [
    { name: 'widget-landing-small', page: 1, left: col[0], top: row[0], width: small, height: small },
    { name: 'widget-eaten-small', page: 1, left: col[1], top: row[0], width: small, height: small },
    { name: 'widget-landing-large', page: 1, left: col[0], top: row[1], width: wide, height: tall },
    { name: 'widget-left-small', page: 2, left: col[0], top: row[0], width: small, height: small },
    { name: 'widget-plan-small', page: 2, left: col[1], top: row[0], width: small, height: small },
    { name: 'widget-clock-small', page: 2, left: col[0], top: row[1], width: small, height: small },
    { name: 'widget-next-medium', page: 2, left: col[0], top: row[2], width: wide, height: small },
    { name: 'widget-eaten-medium', page: 3, left: col[0], top: row[0], width: wide, height: small },
  ];
  for (const mode of modes) {
    for (const w of widgets) {
      // Two pixels in from the widget's edge, so no wallpaper comes along in the corners.
      const box = { left: w.left + 2, top: w.top + 2, width: w.width - 4, height: w.height - 4 };
      const mask = Buffer.from(`<svg width="${box.width}" height="${box.height}"><rect width="${box.width}" height="${box.height}" rx="76" ry="76" fill="#fff"/></svg>`);
      await sharp(join(home, `home-${w.page}-${mode}.png`))
        .extract(box)
        .composite([{ input: mask, blend: 'dest-in' }])
        .png({ compressionLevel: 9 })
        .toFile(join(out, `${w.name}-${mode}.png`));
    }
  }
}
