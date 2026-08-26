import { Resend } from 'resend';
import { leadSchema } from '@/lib/lead';
import { rateLimit } from '@/lib/rate-limit';
import { SITE } from '@/data/site';

/** The inbox leads land in. */
const TO = SITE.email;

function json(body: unknown, status: number, headers?: HeadersInit) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  });
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, message: 'Malformed request.' }, 400);
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      if (!errors[key]) errors[key] = issue.message;
    }
    return json({ ok: false, errors }, 400);
  }

  const lead = parsed.data;

  // Honeypot: a person never sees this field. Return 200 so the bot learns
  // nothing, but send nothing.
  if (lead.company && lead.company.trim() !== '') {
    return json({ ok: true }, 200);
  }

  const limit = rateLimit(clientIp(request));
  if (!limit.ok) {
    return json(
      { ok: false, message: 'Too many submissions. Please call instead.' },
      429,
      { 'retry-after': String(limit.retryAfterSeconds) },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  if (!apiKey || !from) {
    // Never report success we cannot back up.
    console.error('[lead] RESEND_API_KEY or LEAD_FROM_EMAIL is not configured');
    return json(
      { ok: false, message: 'We could not send that just now.' },
      503,
    );
  }

  const text = [
    `New site review request`,
    ``,
    `Name:    ${lead.name}`,
    `Email:   ${lead.email}`,
    `Website: ${lead.url}`,
    ``,
    `Notes:`,
    lead.notes?.trim() ? lead.notes : '(none)',
  ].join('\n');

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [TO],
      replyTo: lead.email,
      subject: `Site review request — ${lead.name} (${lead.url})`,
      text,
    });

    if (error) {
      console.error('[lead] resend returned an error', error);
      return json({ ok: false, message: 'We could not send that just now.' }, 503);
    }
  } catch (cause) {
    console.error('[lead] resend threw', cause);
    return json({ ok: false, message: 'We could not send that just now.' }, 503);
  }

  return json({ ok: true }, 200);
}
