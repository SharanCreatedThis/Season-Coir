# Testing Guide

## Running Tests

```bash
npm run test            # Run all tests once
npm run test:watch      # Run in watch mode (re-runs on file change)
npm run test:coverage   # Generate coverage report
```

## Test Structure

```
src/test/
├── setup.ts            # Test environment setup (@testing-library/jest-dom)
├── navbar.test.tsx     # Navigation structure tests
├── data.test.ts        # Data integrity tests (products, markets, features)
└── products.test.ts    # Product filtering and tag validation tests
```

## Writing New Tests

All tests use Vitest. Import from `vitest` and `@/data`:

```typescript
import { describe, it, expect } from 'vitest';
import { products } from '@/data';

describe('My Test Suite', () => {
  it('should do something', () => {
    expect(products.length).toBeGreaterThan(0);
  });
});
```

## Running in CI

Tests run automatically on every push to `main` via GitHub Actions. See `.github/workflows/ci.yml`.
