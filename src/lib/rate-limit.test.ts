import { describe, it, expect, beforeEach } from 'vitest';
import { rateLimit, __resetRateLimit, LIMIT, WINDOW_MS } from './rate-limit';

describe('rateLimit', () => {
  beforeEach(() => __resetRateLimit());

  it('allows the first request', () => {
    expect(rateLimit('1.2.3.4', 0).ok).toBe(true);
  });

  it('allows exactly LIMIT requests in a window', () => {
    for (let i = 0; i < LIMIT; i++) {
      expect(rateLimit('1.2.3.4', 0).ok).toBe(true);
    }
  });

  it('blocks the request after the limit', () => {
    for (let i = 0; i < LIMIT; i++) rateLimit('1.2.3.4', 0);
    const r = rateLimit('1.2.3.4', 0);
    expect(r.ok).toBe(false);
    expect(r.retryAfterSeconds).toBeGreaterThan(0);
  });

  it('tracks keys independently', () => {
    for (let i = 0; i < LIMIT; i++) rateLimit('1.1.1.1', 0);
    expect(rateLimit('2.2.2.2', 0).ok).toBe(true);
  });

  it('allows again once the window has passed', () => {
    for (let i = 0; i < LIMIT; i++) rateLimit('1.2.3.4', 0);
    expect(rateLimit('1.2.3.4', 0).ok).toBe(false);
    expect(rateLimit('1.2.3.4', WINDOW_MS + 1).ok).toBe(true);
  });
});
