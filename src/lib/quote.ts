import { z } from 'zod';
import { BUDGET_OPTIONS } from '@/data/prices';

export const PROJECT_TYPES = [
  'Website',
  'E-commerce',
  'SEO & marketing',
  'Google Ads / PPC',
  'Social media management',
  'Not sure yet',
] as const;

/** Built from src/data/prices.ts, so the options follow the prices. */
export const BUDGET_RANGES = BUDGET_OPTIONS;

export const TIMELINES = ['ASAP', '1–3 months', 'Just exploring'] as const;

export const quoteSchema = z.object({
  name: z.string().trim().min(1, 'Your name is required').max(120),
  email: z
    .string()
    .trim()
    .min(1, 'Your email is required')
    .max(320)
    .pipe(z.email("That doesn't look like an email address")),
  projectType: z.enum(PROJECT_TYPES, { error: 'Pick what best describes the project' }),
  budget: z.enum(BUDGET_RANGES, { error: 'Pick a budget range' }),
  timeline: z.enum(TIMELINES, { error: 'Pick a timeline' }),
  /** Optional. Digits, spaces and the usual punctuation only. */
  phone: z
    .string()
    .trim()
    .max(40, 'That phone number is too long')
    .regex(/^[\d\s().+-]*$/, 'Use digits, spaces, dashes or a leading +')
    .optional(),
  notes: z.string().trim().max(5000).optional(),
  /** Honeypot — see the matching field in `lib/lead.ts` for why it's named this way. */
  hp_ref: z.string().max(200).optional(),
});

export type Quote = z.infer<typeof quoteSchema>;

const RENDERABLE_KEYS = ['name', 'email', 'phone', 'projectType', 'budget', 'timeline', 'notes'] as const;
export type QuoteRenderableKey = (typeof RENDERABLE_KEYS)[number];

function isRenderableKey(key: string): key is QuoteRenderableKey {
  return (RENDERABLE_KEYS as readonly string[]).includes(key);
}

export type MappedQuoteIssues = {
  fieldErrors: Partial<Record<QuoteRenderableKey, string>>;
  formError?: string;
};

/** Maps zod validation issues onto the fields the quote form can render an error under. */
export function mapQuoteIssues(issues: readonly { path: PropertyKey[]; message: string }[]): MappedQuoteIssues {
  const fieldErrors: Partial<Record<QuoteRenderableKey, string>> = {};
  let formError: string | undefined;
  for (const issue of issues) {
    const key = String(issue.path[0]);
    if (isRenderableKey(key)) {
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    } else if (!formError) {
      formError = issue.message;
    }
  }
  return { fieldErrors, formError };
}
