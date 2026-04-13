import { describe, it, expect } from 'vitest';
import { products, CATEGORIES } from '@/data';

// ─── Category filtering ────────────────────────────────────────────────────────
describe('Product filtering by category', () => {
  it('"PVC / Vinyl Coir" should return 5 products', () => {
    const result = products.filter((p) => p.category === 'PVC / Vinyl Coir');
    expect(result.length).toBe(5);
  });

  it('"Rubber Backed" should return 4 products', () => {
    const result = products.filter((p) => p.category === 'Rubber Backed');
    expect(result.length).toBe(4);
  });

  it('"100% Rubber" should return 4 products', () => {
    const result = products.filter((p) => p.category === '100% Rubber');
    expect(result.length).toBe(4);
  });

  it('"100% Coir" should return 4 products', () => {
    const result = products.filter((p) => p.category === '100% Coir');
    expect(result.length).toBe(4);
  });

  it('"Polypropylene" should return 4 products', () => {
    const result = products.filter((p) => p.category === 'Polypropylene');
    expect(result.length).toBe(4);
  });

  it('all filtered products should belong to the requested category', () => {
    CATEGORIES.forEach((cat) => {
      const filtered = products.filter((p) => p.category === cat);
      filtered.forEach((p) => {
        expect(p.category).toBe(cat);
      });
    });
  });

  it('filtering by all categories should account for all 21 products', () => {
    const total = CATEGORIES.reduce(
      (sum, cat) => sum + products.filter((p) => p.category === cat).length,
      0,
    );
    expect(total).toBe(products.length);
  });
});

// ─── Product tags ──────────────────────────────────────────────────────────────
describe('Product tags', () => {
  it('every product should have at least one tag', () => {
    products.forEach((p) => {
      expect(p.tags.length, `${p.id}: should have at least 1 tag`).toBeGreaterThan(0);
    });
  });

  it('all tags should be non-empty strings', () => {
    products.forEach((p) => {
      p.tags.forEach((tag, i) => {
        expect(typeof tag, `${p.id} tag[${i}]: should be a string`).toBe('string');
        expect(tag.trim().length, `${p.id} tag[${i}]: should not be empty`).toBeGreaterThan(0);
      });
    });
  });

  it('PVC products should all have tags', () => {
    const pvcProducts = products.filter((p) => p.category === 'PVC / Vinyl Coir');
    pvcProducts.forEach((p) => {
      expect(p.tags.length).toBeGreaterThan(0);
    });
  });
});

// ─── Product image paths ───────────────────────────────────────────────────────
describe('Product image paths', () => {
  it('all image paths should start with /', () => {
    products.forEach((p) => {
      expect(p.image.startsWith('/'), `${p.id}: image path must be absolute`).toBe(true);
    });
  });
});
