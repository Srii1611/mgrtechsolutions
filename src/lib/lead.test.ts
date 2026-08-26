import { describe, it, expect } from 'vitest';
import { leadSchema } from './lead';

const valid = {
  url: 'https://example.com',
  email: 'owner@example.com',
  name: 'Pat Rivera',
  notes: 'Site feels slow.',
};

describe('leadSchema', () => {
  it('accepts a valid lead', () => {
    expect(leadSchema.safeParse(valid).success).toBe(true);
  });

  it('accepts a bare domain without a scheme', () => {
    expect(leadSchema.safeParse({ ...valid, url: 'example.com' }).success).toBe(true);
  });

  it('rejects a url that is not a website', () => {
    const r = leadSchema.safeParse({ ...valid, url: 'not a website' });
    expect(r.success).toBe(false);
  });

  it('rejects a malformed email', () => {
    expect(leadSchema.safeParse({ ...valid, email: 'nope' }).success).toBe(false);
  });

  it('rejects an empty name', () => {
    expect(leadSchema.safeParse({ ...valid, name: '   ' }).success).toBe(false);
  });

  it('treats notes as optional', () => {
    const { notes, ...withoutNotes } = valid;
    expect(leadSchema.safeParse(withoutNotes).success).toBe(true);
  });

  it('trims whitespace off submitted values', () => {
    const r = leadSchema.safeParse({ ...valid, name: '  Pat Rivera  ' });
    expect(r.success && r.data.name).toBe('Pat Rivera');
  });

  it('caps absurdly long input', () => {
    expect(leadSchema.safeParse({ ...valid, notes: 'x'.repeat(5001) }).success).toBe(false);
  });

  it('allows the honeypot field to be absent or empty', () => {
    expect(leadSchema.safeParse({ ...valid, company: '' }).success).toBe(true);
  });

  it('trims surrounding whitespace off email before validating format', () => {
    const r = leadSchema.safeParse({ ...valid, email: '  owner@example.com  ' });
    expect(r.success).toBe(true);
    expect(r.success && r.data.email).toBe('owner@example.com');
  });

  it('trims surrounding whitespace off a pasted url', () => {
    const r = leadSchema.safeParse({ ...valid, url: '  https://example.com  ' });
    expect(r.success).toBe(true);
    expect(r.success && r.data.url).toBe('https://example.com');
  });
});
