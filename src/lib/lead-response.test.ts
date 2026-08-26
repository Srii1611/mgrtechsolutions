import { describe, expect, it } from 'vitest';
import { parseLeadResponse } from '@/lib/lead-response';
import { SITE } from '@/data/site';

const GENERIC = `We couldn't send that. Please call ${SITE.phone} and I'll pick it up directly.`;

describe('parseLeadResponse', () => {
  it('200 -> no errors at all', () => {
    expect(parseLeadResponse(200, { ok: true })).toEqual({ fieldErrors: {} });
  });

  it('400 with {errors:{...}} -> keyed field errors, unknown keys dropped', () => {
    const result = parseLeadResponse(400, {
      ok: false,
      errors: { email: 'That doesn\'t look like an email address', bogus: 'ignored' },
    });
    expect(result.fieldErrors).toEqual({ email: "That doesn't look like an email address" });
    expect(result.formError).toBeUndefined();
  });

  it('400 with multiple recognized field errors -> all kept', () => {
    const result = parseLeadResponse(400, {
      errors: { url: 'bad url', name: 'bad name' },
    });
    expect(result.fieldErrors).toEqual({ url: 'bad url', name: 'bad name' });
  });

  it('400 with errors for no recognized field -> falls back to formError', () => {
    const result = parseLeadResponse(400, { errors: { form: 'something went wrong' } });
    expect(result.fieldErrors).toEqual({});
    expect(result.formError).toBe(GENERIC);
  });

  it('400 with no usable errors key -> formError', () => {
    expect(parseLeadResponse(400, { ok: false })).toEqual({
      fieldErrors: {},
      formError: GENERIC,
    });
  });

  it('400 with malformed request message (no errors object) -> formError', () => {
    expect(parseLeadResponse(400, { ok: false, message: 'Malformed request.' })).toEqual({
      fieldErrors: {},
      formError: GENERIC,
    });
  });

  it('429 with {message} -> that message as formError', () => {
    const result = parseLeadResponse(429, {
      ok: false,
      message: 'Too many submissions. Please call instead.',
    });
    expect(result.fieldErrors).toEqual({});
    expect(result.formError).toBe('Too many submissions. Please call instead.');
  });

  it('503 with {message} -> that message as formError', () => {
    const result = parseLeadResponse(503, {
      ok: false,
      message: 'We could not send that just now.',
    });
    expect(result.formError).toBe('We could not send that just now.');
  });

  it('429 with no usable message -> generic fallback', () => {
    expect(parseLeadResponse(429, {})).toEqual({ fieldErrors: {}, formError: GENERIC });
  });

  it('503 with no body -> generic fallback', () => {
    expect(parseLeadResponse(503, null)).toEqual({ fieldErrors: {}, formError: GENERIC });
  });

  it('other non-2xx status (500) -> generic fallback', () => {
    expect(parseLeadResponse(500, { message: 'server exploded' })).toEqual({
      fieldErrors: {},
      formError: GENERIC,
    });
  });

  it('never throws on null body', () => {
    expect(() => parseLeadResponse(400, null)).not.toThrow();
    expect(parseLeadResponse(400, null)).toEqual({ fieldErrors: {}, formError: GENERIC });
  });

  it('never throws on undefined body', () => {
    expect(() => parseLeadResponse(400, undefined)).not.toThrow();
    expect(parseLeadResponse(400, undefined)).toEqual({ fieldErrors: {}, formError: GENERIC });
  });

  it('never throws on a string body', () => {
    expect(() => parseLeadResponse(400, 'not json')).not.toThrow();
    expect(parseLeadResponse(400, 'not json')).toEqual({ fieldErrors: {}, formError: GENERIC });
  });

  it('never throws on an array body', () => {
    expect(() => parseLeadResponse(400, ['errors', 'here'])).not.toThrow();
    expect(parseLeadResponse(400, ['errors', 'here'])).toEqual({
      fieldErrors: {},
      formError: GENERIC,
    });
  });

  it('never throws on a nested object body with wrong shapes', () => {
    const weird = { errors: { email: { nested: true }, url: 123, name: 'ok name' } };
    expect(() => parseLeadResponse(400, weird)).not.toThrow();
    const result = parseLeadResponse(400, weird);
    expect(result.fieldErrors).toEqual({ name: 'ok name' });
  });

  it('errors value that is itself an array is treated as unusable', () => {
    const result = parseLeadResponse(400, { errors: ['email', 'bad'] });
    expect(result).toEqual({ fieldErrors: {}, formError: GENERIC });
  });
});
