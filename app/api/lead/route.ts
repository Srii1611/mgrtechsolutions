import { Resend } from 'resend';
import { leadSchema } from '@/lib/lead';
import { rateLimit } from '@/lib/rate-limit';
import { SITE } from '@/data/site';

/**
 * The inbox leads land in. Falls back to the site email if LEAD_TO_EMAIL
 * is not set, allowing leads to be routed elsewhere for testing.
 */
function getLeadRecipient(): string {
  const envTo = process.env.LEAD_TO_EMAIL;
  if (envTo && envTo.trim() !== '') {
    return envTo.trim();
  }
  return SITE.email;
}

function json(body: unknown, status: number, headers?: HeadersInit) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  });
}

/**
 * Returns null when the caller cannot be identified. On Vercel the platform
 * always sets x-forwarded-for, so this path should never trigger in
 * production. When it does (e.g. local/dev tooling), we deliberately do NOT
 * rate limit rather than share a single 'unknown' bucket across every
 * unidentifiable visitor — sharing that bucket would 429 real leads, which is
 * the exact lead-loss this phase exists to prevent. Skipping the limiter only
 * risks spam, which the honeypot already absorbs.
 */
function clientIp(request: Request): string | null {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip');
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
  // nothing, but send nothing. Checked before the config guard and the rate
  // limiter so bot traffic never burns either.
  if (lead.hp_ref && lead.hp_ref.trim() !== '') {
    return json({ ok: true }, 200);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  if (!apiKey || !from) {
    // Never report success we cannot back up. Checked before the rate
    // limiter so a misconfigured deploy always tells the visitor to call,
    // rather than burning their budget toward a 429 instead.
    console.error('[lead] RESEND_API_KEY or LEAD_FROM_EMAIL is not configured');
    return json(
      { ok: false, message: `We could not send that just now. Please call ${SITE.phone} instead.` },
      503,
    );
  }

  const ip = clientIp(request);
  if (ip !== null) {
    const limit = rateLimit(ip);
    if (!limit.ok) {
      return json(
        { ok: false, message: `Too many submissions. Please call ${SITE.phone} instead.` },
        429,
        { 'retry-after': String(limit.retryAfterSeconds) },
      );
    }
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
    const { data, error } = await resend.emails.send({
      from,
      to: [getLeadRecipient()],
      replyTo: lead.email,
      subject: `Site review request — ${lead.name} (${lead.url})`,
      text,
    });

    if (error || !data?.id) {
      console.error('[lead] resend did not confirm delivery', error);
      return json(
        { ok: false, message: `We could not send that just now. Please call ${SITE.phone} instead.` },
        503,
      );
    }
  } catch (cause) {
    console.error('[lead] resend threw', cause);
    return json(
      { ok: false, message: `We could not send that just now. Please call ${SITE.phone} instead.` },
      503,
    );
  }

  return json({ ok: true }, 200);
}
