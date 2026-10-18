// The share page's one script (kept out of the HTML so the page's CSP can allow only 'self').
// It reads the share from the part of the link after the #, shows what's in it, and points the
// Open button at the app's own residual:// link. Everything shown goes through textContent.
(async () => {
  const $ = (id) => document.getElementById(id);
  const payload = location.hash.slice(1);
  $('open').href = 'residual://share#' + payload;
  const kinds = { meal: 'Meal', favoriteMeal: 'Favorite meal', favoriteFood: 'Favorite food', pantryItem: 'Pantry item', food: 'Food' };
  const text = (v, fallback = '') => (typeof v === 'string' ? v : fallback).slice(0, 120);
  const maxBytes = 262144; // a share is a few KB; anything past this is not one

  const show = (title, note, isError) => {
    $('name').textContent = title;
    if (isError) $('name').classList.add('error');
    $('note').textContent = note;
    $('note').hidden = false;
  };

  // Older browsers can't inflate the payload; the link is fine, so this is a hint, not an error.
  if (typeof DecompressionStream === 'undefined') {
    show('Open this link on your iPhone to see what was shared.', 'This browser can’t read the link itself.', false);
    return;
  }

  try {
    if (!payload || payload.length > 8192) throw new Error('empty');
    const b64 = payload.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - payload.length % 4) % 4);
    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'));

    // Read the decompressed bytes by hand, so a payload that inflates past the cap is dropped.
    const reader = stream.getReader();
    const chunks = [];
    let total = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) { await reader.cancel(); throw new Error('too big'); }
      chunks.push(value);
    }
    const item = JSON.parse(new TextDecoder().decode(await new Blob(chunks).arrayBuffer()));
    if (typeof item !== 'object' || item === null) throw new Error('not a share');

    const kind = typeof item.kind === 'string' && Object.hasOwn(kinds, item.kind) ? kinds[item.kind] : 'Food';
    const name = text(item.name, 'A shared food') || 'A shared food';
    $('kind').textContent = 'Shared with you · ' + kind;
    $('name').textContent = name;
    document.title = name + ' · Residual';
    if (typeof item.note === 'string' && item.note) { $('note').textContent = text(item.note); $('note').hidden = false; }
    const isMeal = item.kind === 'meal' || item.kind === 'favoriteMeal';
    const foods = Array.isArray(item.foods) ? item.foods.slice(0, 100) : [];
    for (const f of foods) {
      if (typeof f !== 'object' || f === null) continue;
      const li = document.createElement('li');
      const left = document.createElement('div');
      left.textContent = text(f.name);
      const brand = text(f.brand);
      if (brand) { const b = document.createElement('div'); b.className = 'brand'; b.textContent = brand; left.appendChild(b); }
      li.appendChild(left);
      if (isMeal && typeof f.grams === 'number' && f.grams > 0) {
        const g = document.createElement('div'); g.className = 'grams'; g.textContent = Math.round(f.grams) + ' g';
        li.appendChild(g);
      }
      $('foods').appendChild(li);
    }
  } catch {
    show('This link is incomplete', 'Part of it may have been cut off on the way. Ask for it to be sent again.', true);
  }
})();
