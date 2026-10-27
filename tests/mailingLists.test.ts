// Which Loops lists a sign-up joins (src/lib/mailingLists.ts). `npm test` (Node 22.18+, which runs
// TypeScript directly).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mailingListsField, requestedLists } from '../src/lib/mailingLists.ts';

const ids = { LOOPS_LIST_NEWSLETTER: 'NEWS', LOOPS_LIST_PRODUCT_UPDATES: 'PROD' };
const field = (source: string, lists?: unknown) => mailingListsField(requestedLists(source, lists), ids);

test('the app with no lists joins both', () => assert.equal(field('ios'), 'NEWS,PROD'));
test('the footer with no lists joins the newsletter', () => assert.equal(field('site'), 'NEWS'));
test('an unknown source joins the newsletter', () => assert.equal(field('unknown'), 'NEWS'));
test('named lists are honored', () => {
  assert.equal(field('site', ['product-updates']), 'PROD');
  assert.equal(field('ios', ['newsletter']), 'NEWS');
  assert.equal(field('site', ['product-updates', 'newsletter']), 'NEWS,PROD');
});
test('unknown names and raw ids are dropped', () => {
  assert.equal(field('site', ['newsletter', 'cmvSomeOtherList', 42]), 'NEWS');
  assert.equal(field('ios', ['cmvSomeOtherList']), 'NEWS,PROD'); // nothing we offer: the default
  assert.equal(field('site', 'newsletter,product-updates'), 'NEWS'); // not an array: the default
});
test('duplicates collapse', () => assert.equal(field('site', ['newsletter', 'newsletter']), 'NEWS'));
test('an unset id is skipped', () =>
  assert.equal(mailingListsField(['newsletter', 'product-updates'], { LOOPS_LIST_NEWSLETTER: 'NEWS' }), 'NEWS'));
