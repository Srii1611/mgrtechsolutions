import { z } from 'zod';

/**
 * Accepts what a business owner actually types: "example.com",
 * "www.example.com", or a full URL. Requires a dot and a plausible TLD so
 * "not a website" is rejected.
 */
const WEBSITE_RE = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i;

export const leadSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, 'Your website URL is required')
    .max(2048)
    .regex(WEBSITE_RE, "That doesn't look like a website address"),
  email: z
    .string()
    .trim()
    .min(1, 'Your email is required')
    .max(320)
    .pipe(z.email("That doesn't look like an email address")),
  name: z
    .string()
    .trim()
    .min(1, 'Your name is required')
    .max(120),
  notes: z.string().trim().max(5000).optional(),
  /**
   * Honeypot. Hidden from people; bots fill it. Never rendered visibly.
   * Named `hp_ref` deliberately — anything resembling a real form field
   * (e.g. "company") gets autofilled by browser/password-manager profile
   * fills even while offscreen, which produces false-positive honeypot
   * trips on real leads.
   */
  hp_ref: z.string().max(200).optional(),
});

export type Lead = z.infer<typeof leadSchema>;

/** Field keys the form has a visible input for and can attach an error to. */
const RENDERABLE_KEYS = ['url', 'email', 'name', 'notes'] as const;
export type RenderableKey = (typeof RENDERABLE_KEYS)[number];

function isRenderableKey(key: string): key is RenderableKey {
  return (RENDERABLE_KEYS as readonly string[]).includes(key);
}

export type MappedLeadIssues = {
  fieldErrors: Partial<Record<RenderableKey, string>>;
  formError?: string;
};

/**
 * Maps zod validation issues onto the fields the form can actually render
 * an error under. An issue on a key with no visible field (unknown future
 * schema key, or a path we forgot to wire a field for) folds into the
 * form-level error instead of being silently dropped — the failure mode
 * that made an over-length `notes` value submit-button-dead with zero
 * feedback.
 */
export function mapLeadIssues(issues: readonly { path: PropertyKey[]; message: string }[]): MappedLeadIssues {
  const fieldErrors: Partial<Record<RenderableKey, string>> = {};
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

/** Field metadata the form renders from, so labels live beside the schema. */
export const LEAD_FIELDS = [
  {
    key: 'url',
    label: 'YOUR WEBSITE URL',
    type: 'text',
    inputMode: 'url',
    autoComplete: 'url',
    placeholder: 'https://yourbusiness.com',
  },
  {
    key: 'email',
    label: 'YOUR EMAIL',
    type: 'email',
    inputMode: 'email',
    autoComplete: 'email',
    placeholder: 'you@yourbusiness.com',
  },
  {
    key: 'name',
    label: 'YOUR NAME',
    type: 'text',
    inputMode: 'text',
    autoComplete: 'name',
    placeholder: "So I know who I'm writing to",
  },
] as const satisfies ReadonlyArray<{
  key: 'url' | 'email' | 'name';
  label: string;
  type: string;
  inputMode: 'url' | 'email' | 'text';
  autoComplete: string;
  placeholder: string;
}>;
