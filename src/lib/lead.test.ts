import { describe, it, expect } from 'vitest';
import { leadSchema, mapLeadIssues } from './lead';

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
    expect(leadSchema.safeParse({ ...valid, hp_ref: '' }).success).toBe(true);
  });

  it('ignores a stray "company" key as unknown rather than treating it as the honeypot', () => {
    const r = leadSchema.safeParse({ ...valid, company: 'Rivera Landscaping' });
    expect(r.success).toBe(true);
    expect(r.success && (r.data as Record<string, unknown>).company).toBeUndefined();
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

describe('mapLeadIssues', () => {
  it('surfaces an over-length notes value as a visible field error', () => {
    const r = leadSchema.safeParse({ ...valid, notes: 'x'.repeat(5001) });
    expect(r.success).toBe(false);
    const mapped = !r.success && mapLeadIssues(r.error.issues);
    expect(mapped && mapped.fieldErrors.notes).toBeTruthy();
    expect(mapped && mapped.formError).toBeUndefined();
  });

  it('folds an issue on a key with no renderable field into the form-level error', () => {
    const mapped = mapLeadIssues([{ path: ['hp_ref'], message: 'unexpected' }]);
    expect(mapped.fieldErrors).toEqual({});
    expect(mapped.formError).toBe('unexpected');
  });

  it('maps a url/email/name issue to its field as before', () => {
    const r = leadSchema.safeParse({ ...valid, email: 'nope' });
    expect(r.success).toBe(false);
    const mapped = !r.success && mapLeadIssues(r.error.issues);
    expect(mapped && mapped.fieldErrors.email).toBeTruthy();
  });
});
