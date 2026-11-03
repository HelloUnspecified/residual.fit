// The app's DayRing and MacroBar as numbers, for DayRing.astro and MacroBar.astro on the server and for the
// live fragments in the browser: one place that says how a day is drawn (DESIGN.md §5.1, DayHero.swift).

/** Fractions of the ring: 1 is the target, at 12 o'clock; past 1 it keeps going round from the top. */
export function ringLayout({ target, tol, planned, eaten }) {
  const safe = Math.max(target, 1);
  const lo = Math.max(0, (target - tol) / safe);
  const hi = Math.min(1.5, (target + tol) / safe);
  const plan = Math.max(0, planned / safe);
  const ate = Math.max(0, eaten / safe);
  return {
    bandBefore: [lo, Math.min(1, hi)],
    bandAfter: hi > 1 ? hi - 1 : 0,
    tickLo: lo * 360,
    tickHi: (hi > 1 ? hi - 1 : hi) * 360,
    plan: Math.min(1, plan),
    planOver: plan > 1 ? Math.min(1, plan - 1) : 0,
    eaten: Math.min(1, ate),
    eatenOver: ate > 1 ? Math.min(1, ate - 1) : 0,
    lands: plan,
  };
}

/** Where a macro's marks sit on its bar, as fractions of the bar (MacroBarScale.dayFraction). */
export function barLayout({ target, tol, planned, eaten }) {
  const hi = target + tol;
  const scale = Math.max(target * 1.2, planned * 1.05, hi * 1.05, 1);
  const at = (g) => Math.min(1, Math.max(0, g) / scale);
  return { lo: at(Math.max(0, target - tol)), hi: at(hi), target: at(target), planned: at(planned), eaten: at(eaten) };
}

export const pct = (f) => `${(f * 100).toFixed(2)}%`;
