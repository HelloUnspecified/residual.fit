// Which Loops lists a sign-up joins (2026-10-27, Clark): the newsletter and product updates are two public
// lists. A caller names the lists it wants; the ids stay here, so a caller can't name a list we don't offer.
// Without names, the app's sign-up (source "ios") joins both, since its screen offers news and product
// updates together, and anything else (the site footer) joins the newsletter alone.
//
// Pure, so it runs in the Worker and under `node --test` alike.

export const LIST_NAMES = ['newsletter', 'product-updates'] as const;
export type ListName = (typeof LIST_NAMES)[number];

export interface ListIds {
  LOOPS_LIST_NEWSLETTER?: string;
  LOOPS_LIST_PRODUCT_UPDATES?: string;
}

/** The list names a sign-up asked for, or the default for where it came from. Unknown names are dropped;
 *  a `lists` that names nothing we offer falls back to the default, so a sign-up never joins no list. */
export function requestedLists(source: string, lists: unknown): ListName[] {
  const named = Array.isArray(lists) ? LIST_NAMES.filter((name) => lists.some((l) => l === name)) : [];
  if (named.length) return named;
  return source === 'ios' ? ['newsletter', 'product-updates'] : ['newsletter'];
}

/** The `mailingLists` value for the Loops form: configured ids, comma-separated with no spaces. */
export function mailingListsField(names: ListName[], ids: ListIds): string {
  const id = (name: ListName) => (name === 'newsletter' ? ids.LOOPS_LIST_NEWSLETTER : ids.LOOPS_LIST_PRODUCT_UPDATES);
  return names.map(id).filter((v): v is string => !!v).join(',');
}
