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
    .email("That doesn't look like an email address")
    .trim()
    .min(1, 'Your email is required')
    .max(320),
  name: z
    .string()
    .trim()
    .min(1, 'Your name is required')
    .max(120),
  notes: z.string().trim().max(5000).optional(),
  /** Honeypot. Hidden from people; bots fill it. Never rendered visibly. */
  company: z.string().max(200).optional(),
});

export type Lead = z.infer<typeof leadSchema>;

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
