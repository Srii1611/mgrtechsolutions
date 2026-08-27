import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ReactNode } from 'react';
import { slugifyHeading } from '@/lib/blog';

/**
 * Renders post markdown with token-styled elements. Heading ids use the
 * SAME slugify + duplicate-suffix algorithm as `@/lib/blog`'s
 * `extractHeadings`, so `Toc` anchors always resolve. Do not enable
 * `rehype-raw` — raw HTML stays disabled.
 */
export default function ArticleBody({ markdown }: { markdown: string }) {
  const idCounts = new Map<string, number>();

  const nextId = (text: string): string => {
    let id = slugifyHeading(text);
    const count = idCounts.get(id) ?? 0;
    idCounts.set(id, count + 1);
    if (count > 0) {
      id = `${id}-${count + 1}`;
    }
    return id;
  };

  const textOf = (node: ReactNode): string => {
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(textOf).join('');
    if (node && typeof node === 'object' && 'props' in node) {
      return textOf((node as { props: { children?: ReactNode } }).props.children);
    }
    return '';
  };

  return (
    <div className="max-w-[65ch]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => {
            const id = nextId(textOf(children));
            return (
              <h2 id={id} className="h2-section scroll-mt-24 mt-12 font-medium text-forest-950">
                {children}
              </h2>
            );
          },
          h3: ({ children }) => {
            const id = nextId(textOf(children));
            return (
              <h3 id={id} className="h3-card scroll-mt-24 mt-8 font-medium text-forest-950">
                {children}
              </h3>
            );
          },
          p: ({ children }) => (
            <p className="mt-5 text-[1.0625rem] leading-[1.7] text-ink-soft">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mt-5 list-disc space-y-2 pl-6 text-[1.0625rem] leading-[1.7] text-ink-soft">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mt-5 list-decimal space-y-2 pl-6 text-[1.0625rem] leading-[1.7] text-ink-soft">
              {children}
            </ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          a: ({ href, children }) => {
            const isExternal = /^https?:\/\//.test(href ?? '');
            return (
              <a
                href={href}
                className="text-accent-ink underline underline-offset-2"
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {children}
              </a>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="mt-6 border-l-4 border-cream-300 pl-5 italic text-ink-soft">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="rounded bg-cream-200 px-1.5 py-0.5 font-mono text-[0.9em] text-forest-950">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <div className="mt-6 overflow-x-auto rounded-xl border border-cream-300 bg-cream-100">
              <pre className="p-4 font-mono text-[0.9em] text-forest-950">{children}</pre>
            </div>
          ),
          table: ({ children }) => (
            <div className="mt-6 overflow-x-auto rounded-xl border border-cream-300">
              <table className="w-full border-collapse text-[0.95em] text-ink-soft">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th
              scope="col"
              className="border-b border-cream-300 bg-cream-100 px-4 py-2 text-left font-medium text-forest-950"
            >
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-cream-300 px-4 py-2 align-top">{children}</td>
          ),
          strong: ({ children }) => <strong className="font-semibold text-forest-950">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          input: (props) => {
            if (props.type !== 'checkbox') {
              return <input {...props} />;
            }
            return <input {...props} aria-hidden="true" />;
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
