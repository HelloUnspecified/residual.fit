// The day the live demo solves: the visitor's targets, a logged breakfast, lunch (what you drag), and
// the two meals ahead with their planned grams. Per-100 g profiles are USDA-typical values.
export const rows = [
  { key: 'cal', target: 2700, tol: 100, floats: false },
  { key: 'p', target: 210, tol: 10, floats: false },
  { key: 'c', target: 230, tol: 25, floats: false },
  { key: 'f', target: 104, tol: 15, floats: true },
];

export const breakfast = { name: 'Breakfast', p: 42, c: 99, f: 19, cal: 739 }; // logged, as eaten

export const lunch = [
  { name: 'Chicken breast, cooked', per100: [31, 0, 3.6], ref: 200 },
  { name: 'White rice, cooked', per100: [2.7, 28, 0.3], ref: 250 },
  { name: 'Olive oil', per100: [0, 0, 100], ref: 10 },
];

export const ahead = [
  { meal: 'Dinner', name: 'Pork tenderloin, raw', per100: [21, 0, 3.5], ref: 280 },
  { meal: 'Dinner', name: 'Basmati rice, dry', per100: [8, 78, 0.6], ref: 60 },
  { meal: 'Dinner', name: 'Olive oil', per100: [0, 0, 100], ref: 25 },
  { meal: 'Dinner', name: 'Green beans', per100: [1.8, 7, 0.1], ref: 150 },
  { meal: 'Snack', name: 'Greek yogurt, 2%', per100: [10, 3.6, 2], ref: 300 },
  { meal: 'Snack', name: 'Almonds', per100: [21, 22, 50], ref: 30 },
];
