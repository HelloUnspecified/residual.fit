// A small, faithful port of Residual's re-balance (MacroSolver, Mode B) for the page's live demo.
// Rows land one at a time in priority order (calories, protein, carbs, then the floating row), each
// with a dead-band; inside the band costs nothing. Every open food stays within about half to double
// its planned amount, on a 5 g grid, and the plan is a plausibility prior: the solver makes the
// smallest change that lands the bands. Same inputs, same output. No I/O.

export const STEP = 5;

/** @typedef {{ name: string, per100: [number, number, number], ref: number, grams?: number }} Food */
/** @typedef {{ key: 'cal'|'p'|'c'|'f', target: number, tol: number, floats: boolean }} Row */

export function kcal(p, c, f) { return 4 * p + 4 * c + 9 * f; }

function snapUp(g) { return Math.ceil(g / STEP) * STEP; }
function snapDown(g) { return Math.floor(g / STEP) * STEP; }

function macros(foods, grams) {
  let p = 0, c = 0, f = 0;
  foods.forEach((food, i) => {
    const g = grams[i] / 100;
    p += food.per100[0] * g; c += food.per100[1] * g; f += food.per100[2] * g;
  });
  return { p, c, f, cal: kcal(p, c, f) };
}

function rowValue(m, key) { return key === 'cal' ? m.cal : m[key]; }

function hinge(e, tol) { return Math.sign(e) * Math.max(0, Math.abs(e) - tol); }

/**
 * Re-size the open foods so the day (logged + open) lands every row inside its band.
 * @param {Row[]} rows   priority order, targets first, floating rows last
 * @param {{p:number,c:number,f:number}} logged  macros already eaten
 * @param {Food[]} foods open foods with reference grams (the plan)
 * @returns {{ grams: number[], totals: {p:number,c:number,f:number,cal:number}, status: Status }}
 */
export function solve(rows, logged, foods) {
  const lo = foods.map((f) => snapUp(Math.max(0.5 * f.ref, Math.min(15, f.ref))));
  const hi = foods.map((f) => snapDown(2 * f.ref + STEP));
  const residual = rows.map((r) => r.target - rowValue({ ...logged, cal: kcal(logged.p, logged.c, logged.f) }, r.key));

  const score = (grams) => {
    const m = macros(foods, grams);
    const miss = rows.map((r, k) => { const e = rowValue(m, r.key) - residual[k]; return (hinge(e, r.tol) / r.tol) ** 2; });
    const prior = grams.reduce((s, g, j) => s + ((g - foods[j].ref) / Math.max(foods[j].ref, 30)) ** 2, 0);
    const close = rows.map((r, k) => ((rowValue(m, r.key) - residual[k]) / r.tol) ** 2);
    return [...miss, prior, ...close];
  };
  const better = (a, b) => { for (let i = 0; i < a.length; i++) { if (a[i] < b[i] - 1e-9) return true; if (a[i] > b[i] + 1e-9) return false; } return false; };
  const clamp = (g, j) => Math.min(hi[j], Math.max(lo[j], g));

  let x = foods.map((f, j) => clamp(snapDown(f.ref), j));
  let best = score(x);
  const steps = [STEP, 2 * STEP, 4 * STEP, 8 * STEP];
  for (let iter = 0; iter < 400; iter++) {
    let moved = false;
    // single moves
    for (let j = 0; j < x.length; j++) for (const s of steps) for (const d of [s, -s]) {
      const y = x.slice(); y[j] = clamp(x[j] + d, j); if (y[j] === x[j]) continue;
      const sc = score(y); if (better(sc, best)) { x = y; best = sc; moved = true; }
    }
    // paired moves, so one food can give while another takes
    for (let j = 0; j < x.length; j++) for (let k = 0; k < x.length; k++) if (j !== k) for (const s of steps) {
      const y = x.slice(); y[j] = clamp(x[j] + s, j); y[k] = clamp(x[k] - s, k);
      if (y[j] === x[j] && y[k] === x[k]) continue;
      const sc = score(y); if (better(sc, best)) { x = y; best = sc; moved = true; }
    }
    if (!moved) break;
  }
  const open = macros(foods, x);
  const totals = { p: logged.p + open.p, c: logged.c + open.c, f: logged.f + open.f };
  totals.cal = kcal(totals.p, totals.c, totals.f);
  return { grams: x, totals, status: forecast(rows, totals) };
}

/** @typedef {{ severity: 'onTrack'|'drifting', worst: null | { key: string, gap: number }, note: null | { key: string, lands: number } }} Status */

/** The forecast judges the targets in priority order; a floating row is never `worst`. */
export function forecast(rows, totals) {
  let worst = null, note = null;
  for (const r of rows) {
    const v = rowValue(totals, r.key);
    const gap = r.target - v;
    if (Math.abs(gap) <= r.tol) continue;
    if (r.floats) { if (!note) note = { key: r.key, lands: v }; continue; }
    if (!worst) worst = { key: r.key, gap };
  }
  return { severity: worst ? 'drifting' : 'onTrack', worst, note };
}

export const LABEL = { cal: 'Calories', p: 'Protein', c: 'Carbs', f: 'Fat' };
export const UNIT = { cal: ' kcal', p: ' g', c: ' g', f: ' g' };
