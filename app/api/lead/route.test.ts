import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SITE } from '@/data/site';

const sendMock = vi.fn();
vi.mock('resend', () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

import { POST } from './route';
import { __resetRateLimit } from '@/lib/rate-limit';

const valid = {
  url: 'https://example.com',
  email: 'owner@example.com',
  name: 'Pat Rivera',
  notes: 'Site feels slow.',
};

function req(body: unknown, ip = '1.2.3.4') {
  return new Request('http://localhost/api/lead', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  __resetRateLimit();
  sendMock.mockReset();
  vi.stubEnv('RESEND_API_KEY', 'test-key');
  vi.stubEnv('LEAD_FROM_EMAIL', 'site@mgrtechsolutionsinc.com');
});

describe('POST /api/lead', () => {
  it('sends the lead and returns ok', async () => {
    sendMock.mockResolvedValue({ data: { id: 'abc' }, error: null });
    const res = await POST(req(valid));
    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it('includes the submitted details in the email body', async () => {
    sendMock.mockResolvedValue({ data: { id: 'abc' }, error: null });
    await POST(req(valid));
    const payload = sendMock.mock.calls[0][0];
    expect(payload.to).toContain('sri@mgrtechsolutionsinc.com');
    expect(JSON.stringify(payload)).toContain('example.com');
    expect(JSON.stringify(payload)).toContain('Pat Rivera');
  });

  it('sets reply-to so replying reaches the prospect', async () => {
    sendMock.mockResolvedValue({ data: { id: 'abc' }, error: null });
    await POST(req(valid));
    const payload = sendMock.mock.calls[0][0];
    expect(payload.replyTo).toBe('owner@example.com');
  });

  it('strips unknown keys before sending', async () => {
    sendMock.mockResolvedValue({ data: { id: 'abc' }, error: null });
    await POST(req({ ...valid, isAdmin: true }));
    const payload = sendMock.mock.calls[0][0];
    expect(JSON.stringify(payload)).not.toContain('isAdmin');
  });

  it('rejects an invalid payload with field errors', async () => {
    const res = await POST(req({ ...valid, email: 'nope' }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.errors.email).toBeTruthy();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('silently discards a honeypot submission without sending', async () => {
    const res = await POST(req({ ...valid, hp_ref: 'bot fill' }));
    expect(res.status).toBe(200);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('rate limits after repeated submissions', async () => {
    sendMock.mockResolvedValue({ data: { id: 'abc' }, error: null });
    for (let i = 0; i < 5; i++) await POST(req(valid, '9.9.9.9'));
    const res = await POST(req(valid, '9.9.9.9'));
    expect(res.status).toBe(429);
    expect(sendMock).toHaveBeenCalledTimes(5);
  });

  it('does not rate limit when no forwarding header identifies the caller', async () => {
    sendMock.mockResolvedValue({ data: { id: 'abc' }, error: null });
    const unidentified = () =>
      POST(
        new Request('http://localhost/api/lead', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(valid),
        }),
      );
    for (let i = 0; i < 6; i++) {
      const res = await unidentified();
      expect(res.status).toBe(200);
    }
    expect(sendMock).toHaveBeenCalledTimes(6);
  });

  it('checks the honeypot before the rate limiter, so a real lead from the same IP still sends', async () => {
    sendMock.mockResolvedValue({ data: { id: 'abc' }, error: null });
    for (let i = 0; i < 6; i++) {
      await POST(req({ ...valid, hp_ref: 'bot fill' }, '8.8.8.8'));
    }
    expect(sendMock).not.toHaveBeenCalled();
    const res = await POST(req(valid, '8.8.8.8'));
    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it('returns 503 and does NOT claim success when the send fails', async () => {
    sendMock.mockResolvedValue({ data: null, error: { message: 'boom' } });
    const res = await POST(req(valid));
    expect(res.status).toBe(503);
    const body = await res.json();
    expect(body.ok).toBe(false);
  });

  it('returns 503 and does NOT claim success when Resend throws', async () => {
    sendMock.mockRejectedValue(new Error('network down'));
    const res = await POST(req(valid));
    expect(res.status).toBe(503);
  });

  it('returns 503 when the API key is missing', async () => {
    vi.stubEnv('RESEND_API_KEY', '');
    const res = await POST(req(valid));
    expect(res.status).toBe(503);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('returns 503 when the from address is missing', async () => {
    vi.stubEnv('LEAD_FROM_EMAIL', '');
    const res = await POST(req(valid));
    expect(res.status).toBe(503);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('a payload containing a stray "company" key is ignored as an unknown key, not treated as the honeypot', async () => {
    sendMock.mockResolvedValue({ data: { id: 'abc' }, error: null });
    const res = await POST(req({ ...valid, company: 'Rivera Landscaping' }));
    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it('includes the phone number in the 429 message', async () => {
    sendMock.mockResolvedValue({ data: { id: 'abc' }, error: null });
    for (let i = 0; i < 5; i++) await POST(req(valid, '5.5.5.5'));
    const res = await POST(req(valid, '5.5.5.5'));
    const body = await res.json();
    expect(body.message).toContain(SITE.phone);
  });

  it('includes the phone number in the 503 message when the send fails', async () => {
    sendMock.mockResolvedValue({ data: null, error: { message: 'boom' } });
    const res = await POST(req(valid));
    const body = await res.json();
    expect(body.message).toContain(SITE.phone);
  });

  it('rejects a malformed json body', async () => {
    const res = await POST(
      new Request('http://localhost/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: '{ not json',
      }),
    );
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('uses LEAD_TO_EMAIL when set', async () => {
    sendMock.mockResolvedValue({ data: { id: 'abc' }, error: null });
    vi.stubEnv('LEAD_TO_EMAIL', 'test@example.com');
    const res = await POST(req(valid));
    expect(res.status).toBe(200);
    const payload = sendMock.mock.calls[0][0];
    expect(payload.to).toContain('test@example.com');
  });

  it('falls back to SITE.email when LEAD_TO_EMAIL is unset', async () => {
    sendMock.mockResolvedValue({ data: { id: 'abc' }, error: null });
    vi.stubEnv('LEAD_TO_EMAIL', '');
    const res = await POST(req(valid));
    expect(res.status).toBe(200);
    const payload = sendMock.mock.calls[0][0];
    expect(payload.to).toContain(SITE.email);
  });
});
