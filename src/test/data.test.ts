import { describe, it, expect } from 'vitest';
import {
  products,
  CATEGORIES,
  testimonials,
  exportMarkets,
  sustainabilityStats,
  whySeasonCoirFeatures,
  NAV_ITEMS,
} from '@/data';

// ─── Products ──────────────────────────────────────────────────────────────────
describe('Products', () => {
  it('should have exactly 21 products', () => {
    expect(products.length).toBe(21);
  });

  it('every product should have all required fields', () => {
    products.forEach((p) => {
      expect(p.id,          `${p.id}: missing id`).toBeTruthy();
      expect(p.name,        `${p.id}: missing name`).toBeTruthy();
      expect(p.category,    `${p.id}: missing category`).toBeTruthy();
      expect(p.description, `${p.id}: missing description`).toBeTruthy();
      expect(p.image,       `${p.id}: missing image`).toBeTruthy();
      expect(Array.isArray(p.tags), `${p.id}: tags must be array`).toBe(true);
    });
  });

  it('all product IDs should be unique', () => {
    const ids = products.map((p) => p.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('all product categories should be valid CATEGORIES values', () => {
    const validCats = new Set<string>(CATEGORIES);
    products.forEach((p) => {
      expect(validCats.has(p.category), `"${p.category}" is not a valid category`).toBe(true);
    });
  });

  it('should have 5 categories', () => {
    expect(CATEGORIES.length).toBe(5);
  });

  it('each category should have at least one product', () => {
    CATEGORIES.forEach((cat) => {
      const count = products.filter((p) => p.category === cat).length;
      expect(count, `category "${cat}" has no products`).toBeGreaterThan(0);
    });
  });
});

// ─── Testimonials ──────────────────────────────────────────────────────────────
describe('Testimonials', () => {
  it('should have at least 3 testimonials', () => {
    expect(testimonials.length).toBeGreaterThanOrEqual(3);
  });

  it('every testimonial should have name, role, and text', () => {
    testimonials.forEach((t, i) => {
      expect(t.name, `testimonial[${i}]: missing name`).toBeTruthy();
      expect(t.role, `testimonial[${i}]: missing role`).toBeTruthy();
      expect(t.text, `testimonial[${i}]: missing text`).toBeTruthy();
    });
  });
});

// ─── Export Markets ────────────────────────────────────────────────────────────
describe('Export Markets', () => {
  it('should have at least 6 export markets', () => {
    expect(exportMarkets.length).toBeGreaterThanOrEqual(6);
  });

  it('every market should have country, flag, and since', () => {
    exportMarkets.forEach((m, i) => {
      expect(m.country, `market[${i}]: missing country`).toBeTruthy();
      expect(m.flag,    `market[${i}]: missing flag`).toBeTruthy();
      expect(m.since,   `market[${i}]: missing since`).toBeTruthy();
    });
  });

  it('since year should be a valid 4-digit year string', () => {
    exportMarkets.forEach((m) => {
      expect(m.since).toMatch(/^\d{4}$/);
    });
  });
});

// ─── Sustainability Stats ──────────────────────────────────────────────────────
describe('Sustainability Stats', () => {
  it('should have exactly 4 stats', () => {
    expect(sustainabilityStats.length).toBe(4);
  });

  it('every stat should have value and label', () => {
    sustainabilityStats.forEach((s, i) => {
      expect(s.value, `stat[${i}]: missing value`).toBeTruthy();
      expect(s.label, `stat[${i}]: missing label`).toBeTruthy();
    });
  });
});

// ─── Why Season Coir Features ─────────────────────────────────────────────────
describe('whySeasonCoirFeatures', () => {
  it('should have exactly 6 features', () => {
    expect(whySeasonCoirFeatures.length).toBe(6);
  });

  it('every feature should have icon, title, desc, and image', () => {
    whySeasonCoirFeatures.forEach((f, i) => {
      expect(f.icon,  `feature[${i}]: missing icon`).toBeTruthy();
      expect(f.title, `feature[${i}]: missing title`).toBeTruthy();
      expect(f.desc,  `feature[${i}]: missing desc`).toBeTruthy();
      expect(f.image, `feature[${i}]: missing image`).toBeTruthy();
    });
  });
});

// ─── Navigation ────────────────────────────────────────────────────────────────
describe('NAV_ITEMS', () => {
  it('should have exactly 5 top-level items', () => {
    expect(NAV_ITEMS.length).toBe(5);
  });

  it('should contain Home, About Us, Products, Gallery, and Contact Us', () => {
    const names = NAV_ITEMS.map((n) => n.name);
    expect(names).toContain('Home');
    expect(names).toContain('About Us');
    expect(names).toContain('Products');
    expect(names).toContain('Gallery');
    expect(names).toContain('Contact Us');
  });

  it('all top-level hrefs should be valid paths', () => {
    NAV_ITEMS.forEach((item) => {
      expect(item.href).toBeTruthy();
      expect(item.href.startsWith('/') || item.href.startsWith('#')).toBe(true);
    });
  });

  it('About Us should have 5 dropdown children with valid hrefs', () => {
    const about = NAV_ITEMS.find((n) => n.name === 'About Us');
    expect(about?.children?.length).toBe(5);
    about?.children?.forEach((child) => {
      expect(child.name).toBeTruthy();
      expect(child.href.startsWith('/')).toBe(true);
    });
  });

  it('Gallery should have 2 dropdown children', () => {
    const gallery = NAV_ITEMS.find((n) => n.name === 'Gallery');
    expect(gallery?.children?.length).toBe(2);
  });

  it('all dropdown children should have name and href', () => {
    NAV_ITEMS.forEach((item) => {
      item.children?.forEach((child, i) => {
        expect(child.name, `${item.name} child[${i}]: missing name`).toBeTruthy();
        expect(child.href, `${item.name} child[${i}]: missing href`).toBeTruthy();
      });
    });
  });
});
