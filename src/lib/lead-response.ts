import { SITE } from '@/data/site';

const FIELD_KEYS = ['url', 'email', 'name'] as const;
type FieldKey = (typeof FIELD_KEYS)[number];

function isFieldKey(key: string): key is FieldKey {
  return (FIELD_KEYS as readonly string[]).includes(key);
}

export type ParsedLeadResponse = {
  fieldErrors: Partial<Record<FieldKey, string>>;
  formError?: string;
};

const GENERIC_FALLBACK = `We couldn't send that. Please call ${SITE.phone} and I'll pick it up directly.`;

/**
 * Turns a raw fetch response (status + parsed/unparsed body) from
 * `POST /api/lead` into field-level and form-level errors the UI can render.
 * Pure and defensive: never throws, regardless of body shape.
 */
export function parseLeadResponse(status: number, body: unknown): ParsedLeadResponse {
  if (status >= 200 && status < 300) {
    return { fieldErrors: {} };
  }

  const isPlainObject =
    typeof body === 'object' && body !== null && !Array.isArray(body);

  if (status === 400) {
    if (isPlainObject) {
      const rawErrors = (body as Record<string, unknown>).errors;
      if (typeof rawErrors === 'object' && rawErrors !== null && !Array.isArray(rawErrors)) {
        const fieldErrors: Partial<Record<FieldKey, string>> = {};
        for (const [key, value] of Object.entries(rawErrors as Record<string, unknown>)) {
          if (isFieldKey(key) && typeof value === 'string') {
            fieldErrors[key] = value;
          }
        }
        if (Object.keys(fieldErrors).length > 0) {
          return { fieldErrors };
        }
      }
    }
    return { fieldErrors: {}, formError: GENERIC_FALLBACK };
  }

  if (status === 429 || status === 503) {
    if (isPlainObject) {
      const message = (body as Record<string, unknown>).message;
      if (typeof message === 'string' && message.trim() !== '') {
        return { fieldErrors: {}, formError: message };
      }
    }
    return { fieldErrors: {}, formError: GENERIC_FALLBACK };
  }

  return { fieldErrors: {}, formError: GENERIC_FALLBACK };
}
