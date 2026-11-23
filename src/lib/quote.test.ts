import { describe, it, expect } from 'vitest';
import { BUDGET_RANGES, quoteSchema } from './quote';
import { BUDGET_OPTIONS, money, tierOf } from '@/data/prices';

const valid = {
  name: 'Pat Rivera',
  email: 'owner@example.com',
  projectType: 'Website',
  budget: BUDGET_RANGES[0],
  timeline: 'ASAP',
  notes: 'Need it before spring.',
};

describe('quote budgets', () => {
  it('come from prices.ts', () => {
    expect([...BUDGET_RANGES]).toEqual([...BUDGET_OPTIONS]);
  });

  it('follow the website prices', () => {
    expect(BUDGET_RANGES[0]).toBe(`Around ${money(Math.round(tierOf('website', 'site').oneTime! / 50) * 50)}`);
    expect(BUDGET_RANGES).toContain('Monthly plans');
    expect(BUDGET_RANGES).toContain('Not sure yet');
  });

  it('accept every offered option and reject the retired ones', () => {
    for (const budget of BUDGET_RANGES) expect(quoteSchema.safeParse({ ...valid, budget }).success).toBe(true);
    expect(quoteSchema.safeParse({ ...valid, budget: 'Under $2,000' }).success).toBe(false);
  });
});

describe('quoteSchema phone', () => {
  it('is optional', () => {
    expect(quoteSchema.safeParse(valid).success).toBe(true);
    expect(quoteSchema.safeParse({ ...valid, phone: '' }).success).toBe(true);
    expect(quoteSchema.safeParse({ ...valid, phone: '774-460-1116' }).success).toBe(true);
  });

  it('rejects letters', () => {
    expect(quoteSchema.safeParse({ ...valid, phone: 'later' }).success).toBe(false);
  });
});
