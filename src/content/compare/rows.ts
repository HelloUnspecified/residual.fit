// The questions every app in the comparison answers, in the order the table shows them. Every app's file (and
// residual.ts) has exactly one cell for each row id here; the prebuild check fails the build when one is missing
// or a file has a row this list doesn't. To add a row: add it here, then a cell for it in every app's file.
import type { Group } from './types.ts';

export const groups: Group[] = [
  { name: 'The day', rows: [
    { id: 'plans', label: 'Plans your day' },
    { id: 'resize', label: 'Re-sizes the meals ahead when you go off plan' },
    { id: 'ranges', label: 'Targets with ranges' },
    { id: 'adapt', label: 'Targets adapt from your weight trend' },
  ] },
  { name: 'Food', rows: [
    { id: 'database', label: 'Food database' },
    { id: 'micros', label: 'Micronutrients' },
    { id: 'scan', label: 'Barcode / label scan' },
    { id: 'grocery', label: 'Grocery list' },
  ] },
  { name: 'Where it works', rows: [
    { id: 'platforms', label: 'Platforms' },
    { id: 'health', label: 'Apple Health' },
    { id: 'coach', label: 'Coach access' },
    { id: 'export', label: 'Export' },
  ] },
  { name: 'Cost and privacy', rows: [
    { id: 'account', label: 'Account' },
    { id: 'ads', label: 'Ads' },
    { id: 'tracking', label: 'Data used to track you' },
    { id: 'free', label: 'Free tier' },
    { id: 'price', label: 'Price, US' },
  ] },
];

export const rows = groups.flatMap((g) => g.rows);

/** The one short form that needs no source: the app's own pages don't say. */
export const NOT_STATED = 'Not stated';
