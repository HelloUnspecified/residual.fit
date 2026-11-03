// Moves a server-rendered DayRing or MacroBar to a new day. The elements' CSS carries the change on the app's
// spring (see DayRing.astro), so these only set where things should end up.
import { ringLayout, barLayout, pct } from './day-ring.js';

const dash = (f) => `${f.toFixed(4)} 1`;

export function setRing(svg, day) {
  const g = ringLayout(day);
  const part = (name) => svg.querySelector(`[data-part="${name}"]`);
  svg.dataset.tone = day.tone ?? 'good';
  const arc = (name, f) => { const el = part(name); el.setAttribute('stroke-dasharray', dash(f)); el.style.opacity = f > 0 ? '' : '0'; };
  arc('plan', g.plan);
  arc('planOver', g.planOver);
  arc('eaten', g.eaten);
  arc('eatenOver', g.eatenOver);
  part('dot').style.transform = `rotate(${(g.lands * 360).toFixed(2)}deg)`;
}

export function setBar(el, line) {
  const g = barLayout(line);
  const q = (name) => el.querySelector(`[data-${name}]`);
  if (line.off) el.dataset.off = line.off; else delete el.dataset.off;
  q('eaten').textContent = String(Math.round(line.eaten));
  q('lands').textContent = String(Math.round(line.planned));
  q('range').style.left = pct(g.lo);
  q('range').style.width = pct(g.hi - g.lo);
  q('plan').style.width = pct(g.planned);
  q('eat').style.width = pct(g.eaten);
  q('tick').style.left = pct(g.target);
  q('dot').style.left = pct(g.planned);
}
