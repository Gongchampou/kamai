import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PORTFOLIO_ITEMS,
  BLOG_POSTS,
  filterPortfolioItems,
  getCategoryCounts,
  getAdjacentLightboxIndex,
  filterBlogPosts,
  validateContactForm,
  createInquiryReferenceCode,
} from './portfolioLogic.ts';

test('filterPortfolioItems filters by category, search query, and aspect ratio', () => {
  const all = filterPortfolioItems(PORTFOLIO_ITEMS, 'All');
  assert.equal(all.length, 8);

  const architecture = filterPortfolioItems(PORTFOLIO_ITEMS, 'Architecture');
  assert.equal(architecture.length, 3);
  assert.ok(architecture.every((item) => item.category === 'Architecture'));

  const searched = filterPortfolioItems(PORTFOLIO_ITEMS, 'All', 'Hasselblad');
  assert.equal(searched.length, 4);

  const portraitAspect = filterPortfolioItems(PORTFOLIO_ITEMS, 'All', '', '3:4');
  assert.equal(portraitAspect.length, 2);
});

test('getCategoryCounts computes exact totals per category', () => {
  const counts = getCategoryCounts(PORTFOLIO_ITEMS);
  assert.equal(counts.All, 8);
  assert.equal(counts.Architecture, 3);
  assert.equal(counts.Monochrome, 2);
  assert.equal(counts.Landscapes, 2);
  assert.equal(counts.Editorial, 1);
});

test('getAdjacentLightboxIndex wraps around cleanly in both directions', () => {
  assert.equal(getAdjacentLightboxIndex(0, 8, 'next'), 1);
  assert.equal(getAdjacentLightboxIndex(7, 8, 'next'), 0);
  assert.equal(getAdjacentLightboxIndex(0, 8, 'prev'), 7);
  assert.equal(getAdjacentLightboxIndex(3, 8, 'prev'), 2);
  assert.equal(getAdjacentLightboxIndex(0, 0, 'next'), -1);
});

test('filterBlogPosts filters dispatches by category', () => {
  assert.equal(filterBlogPosts(BLOG_POSTS, 'All').length, 3);
  const fieldNotes = filterBlogPosts(BLOG_POSTS, 'Field Notes');
  assert.equal(fieldNotes.length, 1);
  assert.equal(fieldNotes[0].id, 'hardangerfjord-winter-dispatch');
});

test('validateContactForm rejects empty or invalid inputs and accepts valid commission details', () => {
  const invalidResult = validateContactForm({
    name: ' ',
    email: 'invalid-email',
    projectType: 'Architectural Commission',
    locationOrTimeline: '',
    message: 'Too short',
  });

  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors.name);
  assert.ok(invalidResult.errors.email);
  assert.ok(invalidResult.errors.locationOrTimeline);
  assert.ok(invalidResult.errors.message);

  const validResult = validateContactForm({
    name: 'Astrid Lindholm',
    email: 'astrid@nordicstudio.dk',
    projectType: 'Architectural Commission',
    locationOrTimeline: 'Oslo · November 2026',
    message: 'We are seeking a 3-day architectural documentation shoot for our new timber cultural center.',
  });

  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});
});

test('createInquiryReferenceCode generates deterministic reference strings', () => {
  const code = createInquiryReferenceCode('Astrid Lindholm', 1);
  assert.equal(code, 'SL-2026-AL-0105');
});
