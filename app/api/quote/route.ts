import { Resend } from 'resend';
import { quoteSchema } from '@/lib/quote';
import { rateLimit } from '@/lib/rate-limit';
import { SITE } from '@/data/site';

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

/** See the matching function in `app/api/lead/route.ts` for why a null
 *  result deliberately skips rate limiting rather than sharing one bucket. */
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

  const parsed = quoteSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      if (!errors[key]) errors[key] = issue.message;
    }
    return json({ ok: false, errors }, 400);
  }

  const quote = parsed.data;

  if (quote.hp_ref && quote.hp_ref.trim() !== '') {
    return json({ ok: true }, 200);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error('[quote] RESEND_API_KEY or LEAD_FROM_EMAIL is not configured');
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
    `New quote request`,
    ``,
    `Name:         ${quote.name}`,
    `Email:        ${quote.email}`,
    `Phone:        ${quote.phone?.trim() ? quote.phone : '(not given)'}`,
    `Project type: ${quote.projectType}`,
    `Budget:       ${quote.budget}`,
    `Timeline:     ${quote.timeline}`,
    ``,
    `Notes:`,
    quote.notes?.trim() ? quote.notes : '(none)',
  ].join('\n');

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: [getLeadRecipient()],
      replyTo: quote.email,
      subject: `Quote request — ${quote.name} (${quote.projectType})`,
      text,
    });

    if (error || !data?.id) {
      console.error('[quote] resend did not confirm delivery', error);
      return json(
        { ok: false, message: `We could not send that just now. Please call ${SITE.phone} instead.` },
        503,
      );
    }
  } catch (cause) {
    console.error('[quote] resend threw', cause);
    return json(
      { ok: false, message: `We could not send that just now. Please call ${SITE.phone} instead.` },
      503,
    );
  }

  return json({ ok: true }, 200);
}
