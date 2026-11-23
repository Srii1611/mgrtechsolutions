import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BUDGET_RANGES } from '@/lib/quote';

const sendMock = vi.fn();
vi.mock('resend', () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

import { POST } from './route';
import { __resetRateLimit } from '@/lib/rate-limit';

const valid = {
  name: 'Pat Rivera',
  email: 'owner@example.com',
  projectType: 'Website',
  budget: BUDGET_RANGES[1],
  timeline: 'ASAP',
  notes: 'Need it before spring.',
};

function req(body: unknown, ip = '1.2.3.4') {
  return new Request('http://localhost/api/quote', {
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

describe('POST /api/quote', () => {
  it('sends the quote request with the budget and the phone number', async () => {
    sendMock.mockResolvedValue({ data: { id: 'abc' }, error: null });
    const res = await POST(req({ ...valid, phone: '774-555-0100' }));
    expect(res.status).toBe(200);
    const text = sendMock.mock.calls[0][0].text as string;
    expect(text).toContain('Phone:        774-555-0100');
    expect(text).toContain(`Budget:       ${BUDGET_RANGES[1]}`);
  });

  it('says so when no phone number is given', async () => {
    sendMock.mockResolvedValue({ data: { id: 'abc' }, error: null });
    await POST(req(valid));
    expect(sendMock.mock.calls[0][0].text).toContain('Phone:        (not given)');
  });

  it('rejects a budget that is not offered', async () => {
    const res = await POST(req({ ...valid, budget: 'Under $2,000' }));
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('drops honeypot fills silently without sending', async () => {
    const res = await POST(req({ ...valid, hp_ref: 'bot fill' }));
    expect(res.status).toBe(200);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('returns 503 and does not claim success when the send fails', async () => {
    sendMock.mockResolvedValue({ data: null, error: { message: 'boom' } });
    const res = await POST(req(valid));
    expect(res.status).toBe(503);
    expect((await res.json()).ok).toBe(false);
  });
});
