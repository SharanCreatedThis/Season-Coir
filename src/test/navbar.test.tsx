import { describe, it, expect } from 'vitest';
import { NAV_ITEMS } from '@/data';

describe('Navigation', () => {
  it('should have all required nav items', () => {
    const navNames = NAV_ITEMS.map(item => item.name);
    expect(navNames).toContain('Home');
    expect(navNames).toContain('About');
    expect(NAV_ITEMS.length).toBeGreaterThanOrEqual(4);
  });

  it('should have valid href for all nav items', () => {
    NAV_ITEMS.forEach(item => {
      expect(item.href).toBeTruthy();
      expect(item.href.startsWith('#') || item.href.startsWith('/')).toBe(true);
    });
  });
});
