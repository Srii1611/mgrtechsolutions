'use client';

import { useState, type FormEvent } from 'react';
import { leadSchema, LEAD_FIELDS } from '@/lib/lead';
import { SITE } from '@/data/site';

type Errors = Partial<Record<'url' | 'email' | 'name' | 'form', string>>;
type Status = 'idle' | 'sending' | 'sent';

const inputBase =
  'w-full rounded-xl border bg-cream-50 px-4 py-3 text-[1rem] text-forest-950 transition placeholder:text-ink-soft/50';

export default function ReviewForm() {
  const [values, setValues] = useState({ url: '', email: '', name: '', notes: '', company: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  const set = (k: keyof typeof values) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const parsed = leadSchema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]) as keyof Errors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setErrors({
          form:
            body?.message ??
            `We couldn't send that. Please call ${SITE.phone} and I'll pick it up directly.`,
        });
        setStatus('idle');
        return;
      }

      setStatus('sent');
    } catch {
      setErrors({
        form: `We couldn't send that. Please call ${SITE.phone} and I'll pick it up directly.`,
      });
      setStatus('idle');
    }
  };

  if (status === 'sent') {
    return (
      <div>
        <p className="eyebrow text-accent-ink">DOOR 02 · SENT</p>
        <h2 className="h3-card mt-3 font-medium text-forest-950">Got it. Watch your inbox.</h2>
        <p className="mt-3 max-w-md text-[1.0625rem] leading-[1.7] text-ink-soft">
          Your review lands within two business days — from a person, not an autoresponder.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="eyebrow text-accent-ink">DOOR 02 · THE FREE SITE REVIEW</p>
      <p className="eyebrow mt-6 text-ink-soft">THE LOW-COMMITMENT WAY</p>
      <h2 className="h3-card mt-3 font-medium text-forest-950">
        Send your URL. Get the 3 things costing you calls.
      </h2>
      <p className="mt-5 max-w-md text-[1.0625rem] leading-[1.7] text-ink-soft">
        I&rsquo;ll personally look at your website and send back a short, honest review — the three
        things most likely costing you phone calls, in plain English. Free. One email. No follow-up
        sequence.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-10 space-y-6">
        {LEAD_FIELDS.map((f) => (
          <div key={f.key}>
            <label htmlFor={`lead-${f.key}`} className="eyebrow text-ink-soft">
              {f.label}
            </label>
            <input
              id={`lead-${f.key}`}
              name={f.key}
              type={f.type}
              inputMode={f.inputMode}
              autoComplete={f.autoComplete}
              placeholder={f.placeholder}
              value={values[f.key]}
              onChange={set(f.key)}
              aria-invalid={Boolean(errors[f.key])}
              aria-describedby={errors[f.key] ? `lead-${f.key}-error` : undefined}
              className={`${inputBase} mt-2 ${
                errors[f.key] ? 'border-destructive' : 'border-cream-300'
              }`}
            />
            {errors[f.key] && (
              <p id={`lead-${f.key}-error`} className="mt-2 text-[0.8125rem] text-destructive">
                {errors[f.key]}
              </p>
            )}
          </div>
        ))}

        <div>
          <label htmlFor="lead-notes" className="eyebrow text-ink-soft">
            ANYTHING I SHOULD KNOW?
          </label>
          <textarea
            id="lead-notes"
            name="notes"
            rows={3}
            placeholder="Optional — a sentence is plenty"
            value={values.notes}
            onChange={set('notes')}
            className={`${inputBase} mt-2 h-auto border-cream-300`}
          />
        </div>

        {/* Honeypot. Hidden from people, not from bots. */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
          <label htmlFor="lead-company">Company</label>
          <input
            id="lead-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.company}
            onChange={set('company')}
          />
        </div>

        {errors.form && (
          <p role="alert" className="text-[0.9375rem] text-destructive">
            {errors.form}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded-full bg-forest-950 px-8 py-4 text-[0.9375rem] font-semibold text-white transition hover:bg-forest-800 disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send my free review'}
        </button>
      </form>
    </div>
  );
}
