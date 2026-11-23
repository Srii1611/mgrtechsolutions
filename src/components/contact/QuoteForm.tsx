'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from 'react';
import {
  quoteSchema,
  mapQuoteIssues,
  PROJECT_TYPES,
  BUDGET_RANGES,
  TIMELINES,
  type QuoteRenderableKey,
} from '@/lib/quote';
import { parseQuoteResponse } from '@/lib/quote-response';
import { SITE } from '@/data/site';

type Errors = Partial<Record<QuoteRenderableKey | 'form', string>>;
type Status = 'idle' | 'sending' | 'sent';

const subscribeNever = () => () => {};

const inputBase =
  'w-full rounded-xl border bg-cream-50 px-4 py-3 text-[1rem] text-forest-950 transition placeholder:text-ink-soft';

export default function QuoteForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    notes: '',
    hp_ref: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  // false while rendering on the server and during hydration, true once on the client
  const mounted = useSyncExternalStore(subscribeNever, () => true, () => false);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === 'sent') {
      successHeadingRef.current?.focus();
    }
  }, [status]);

  const set = (k: keyof typeof values) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const focusField = (key: QuoteRenderableKey) => {
    const el = document.getElementById(`quote-${key}`);
    if (el instanceof HTMLElement) el.focus();
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const parsed = quoteSchema.safeParse(values);
    if (!parsed.success) {
      const { fieldErrors, formError } = mapQuoteIssues(parsed.error.issues);
      setErrors({ ...fieldErrors, form: formError });
      const firstInvalid = (Object.keys(fieldErrors) as QuoteRenderableKey[])[0];
      if (firstInvalid) focusField(firstInvalid);
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const { fieldErrors, formError } = parseQuoteResponse(res.status, body);
        setErrors({ ...fieldErrors, form: formError });
        const firstInvalid = (Object.keys(fieldErrors) as QuoteRenderableKey[])[0];
        if (firstInvalid) focusField(firstInvalid);
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
      <div role="status">
        <p className="eyebrow text-accent-ink">DOOR 03 · SENT</p>
        <h2
          ref={successHeadingRef}
          tabIndex={-1}
          className="h3-card mt-3 font-medium text-forest-950 outline-none"
        >
          Got it. I&rsquo;ll follow up with real numbers.
        </h2>
        <p className="mt-3 max-w-md text-[1.0625rem] leading-[1.7] text-ink-soft">
          {SITE.replyTime} It comes from a person, not an autoresponder. Need it sooner? Call{' '}
          {SITE.phone}.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="eyebrow text-accent-ink">DOOR 03 · REQUEST A QUOTE</p>
      <p className="eyebrow mt-6 text-ink-soft">THE STRAIGHT-NUMBER WAY</p>
      <h2 className="h3-card mt-3 font-medium text-forest-950">
        Tell me what you need. I&rsquo;ll tell you what it costs.
      </h2>
      <p className="mt-5 max-w-md text-[1.0625rem] leading-[1.7] text-ink-soft">
        A few details on the project and I&rsquo;ll come back with a real starting number, not a
        vague &ldquo;it depends.&rdquo;
      </p>

      <noscript>
        <p className="mt-6 max-w-md text-[0.9375rem] text-ink-soft">
          This form needs JavaScript. Call{' '}
          <a href={SITE.phoneHref} className="font-medium text-accent-ink underline">
            {SITE.phone}
          </a>{' '}
          instead, I answer.
        </p>
      </noscript>

      <form onSubmit={onSubmit} noValidate className="mt-10 space-y-6">
        <div>
          <label htmlFor="quote-name" className="eyebrow text-ink-soft">
            YOUR NAME
          </label>
          <input
            id="quote-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="So I know who I'm writing to"
            value={values.name}
            onChange={set('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'quote-name-error' : undefined}
            className={`${inputBase} mt-2 ${errors.name ? 'border-destructive' : 'border-form-border'}`}
          />
          {errors.name && (
            <p id="quote-name-error" className="mt-2 text-[0.8125rem] text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="quote-email" className="eyebrow text-ink-soft">
            YOUR EMAIL
          </label>
          <input
            id="quote-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@yourbusiness.com"
            value={values.email}
            onChange={set('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'quote-email-error' : undefined}
            className={`${inputBase} mt-2 ${errors.email ? 'border-destructive' : 'border-form-border'}`}
          />
          {errors.email && (
            <p id="quote-email-error" className="mt-2 text-[0.8125rem] text-destructive">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="quote-phone" className="eyebrow text-ink-soft">
            YOUR PHONE (OPTIONAL)
          </label>
          <input
            id="quote-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="If you would rather talk"
            value={values.phone}
            onChange={set('phone')}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'quote-phone-error' : undefined}
            className={`${inputBase} mt-2 ${errors.phone ? 'border-destructive' : 'border-form-border'}`}
          />
          {errors.phone && (
            <p id="quote-phone-error" className="mt-2 text-[0.8125rem] text-destructive">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="quote-projectType" className="eyebrow text-ink-soft">
            WHAT DO YOU NEED?
          </label>
          <select
            id="quote-projectType"
            name="projectType"
            value={values.projectType}
            onChange={set('projectType')}
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={errors.projectType ? 'quote-projectType-error' : undefined}
            className={`${inputBase} mt-2 ${errors.projectType ? 'border-destructive' : 'border-form-border'}`}
          >
            <option value="" disabled>
              Choose one
            </option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.projectType && (
            <p id="quote-projectType-error" className="mt-2 text-[0.8125rem] text-destructive">
              {errors.projectType}
            </p>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="quote-budget" className="eyebrow text-ink-soft">
              BUDGET RANGE
            </label>
            <select
              id="quote-budget"
              name="budget"
              value={values.budget}
              onChange={set('budget')}
              aria-invalid={Boolean(errors.budget)}
              aria-describedby={errors.budget ? 'quote-budget-error' : undefined}
              className={`${inputBase} mt-2 ${errors.budget ? 'border-destructive' : 'border-form-border'}`}
            >
              <option value="" disabled>
                Choose one
              </option>
              {BUDGET_RANGES.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
            {errors.budget && (
              <p id="quote-budget-error" className="mt-2 text-[0.8125rem] text-destructive">
                {errors.budget}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="quote-timeline" className="eyebrow text-ink-soft">
              TIMELINE
            </label>
            <select
              id="quote-timeline"
              name="timeline"
              value={values.timeline}
              onChange={set('timeline')}
              aria-invalid={Boolean(errors.timeline)}
              aria-describedby={errors.timeline ? 'quote-timeline-error' : undefined}
              className={`${inputBase} mt-2 ${errors.timeline ? 'border-destructive' : 'border-form-border'}`}
            >
              <option value="" disabled>
                Choose one
              </option>
              {TIMELINES.map((timeline) => (
                <option key={timeline} value={timeline}>
                  {timeline}
                </option>
              ))}
            </select>
            {errors.timeline && (
              <p id="quote-timeline-error" className="mt-2 text-[0.8125rem] text-destructive">
                {errors.timeline}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="quote-notes" className="eyebrow text-ink-soft">
            ANYTHING I SHOULD KNOW?
          </label>
          <textarea
            id="quote-notes"
            name="notes"
            rows={3}
            placeholder="Optional, a sentence is plenty"
            value={values.notes}
            onChange={set('notes')}
            aria-invalid={Boolean(errors.notes)}
            aria-describedby={errors.notes ? 'quote-notes-error' : undefined}
            className={`${inputBase} mt-2 h-auto ${errors.notes ? 'border-destructive' : 'border-form-border'}`}
          />
          {errors.notes && (
            <p id="quote-notes-error" className="mt-2 text-[0.8125rem] text-destructive">
              {errors.notes}
            </p>
          )}
        </div>

        {/* Honeypot — see ReviewForm for why it's named hp_ref. */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
          <label htmlFor="quote-hp-ref">Leave this field empty</label>
          <input
            id="quote-hp-ref"
            name="hp_ref"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.hp_ref}
            onChange={set('hp_ref')}
          />
        </div>

        {errors.form && (
          <p role="alert" className="text-[0.9375rem] text-destructive">
            {errors.form}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'sending' || !mounted}
          className="rounded-full bg-forest-950 px-8 py-4 text-[0.9375rem] font-semibold text-cream-50 transition hover:bg-forest-800 disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Request my quote'}
        </button>
      </form>
    </div>
  );
}
