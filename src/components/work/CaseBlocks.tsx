import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { WORK } from '@/data/home';
import { CASE_BLOCK } from '@/data/work-page';

/** Live site URLs — spec §8. Only these three projects link out. */
const LIVE_URLS: Record<string, string> = {
  'Emanuel Blueboard Corporation': 'https://www.emanuelblueboardcorp.com',
  'Master Tile Installation': 'https://mastertileinstallation.com',
  'L&J Landscaping': 'https://www.landjlandscapingma.com/',
};

/** S3 — All seven project case blocks (light). */
export default function CaseBlocks() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="case-blocks-heading">
      <div className="container-page">
        <h2 id="case-blocks-heading" className="sr-only">
          All projects
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {WORK.projects.map((project, i) => {
            const liveUrl = project.live ? LIVE_URLS[project.name] : undefined;
            return (
              <Reveal key={project.name} delay={i * 0.06}>
                <article className="h-full overflow-hidden rounded-2xl border border-cream-300 bg-cream-50">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={project.image}
                      alt={`${project.name} website`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <span
                      className={
                        project.live
                          ? 'absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-medium text-forest-950'
                          : 'absolute left-4 top-4 rounded-full border border-accent-ink bg-cream-50 px-3 py-1 text-xs font-medium text-accent-ink'
                      }
                    >
                      {project.live ? 'LIVE' : 'DEMO'}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="h3-card font-medium text-forest-950">{project.name}</h3>
                    <p className="eyebrow mt-2 text-ink-soft">{project.category}</p>
                    <p className="mt-3 text-[1.0625rem] leading-[1.7] text-ink-soft">
                      {project.outcome}
                    </p>
                    {liveUrl ? (
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={CASE_BLOCK.liveLinkTitle}
                        className="mt-5 inline-flex items-center gap-2 font-medium text-accent-ink transition-colors hover:underline"
                      >
                        {CASE_BLOCK.liveLinkLabel}
                        <ExternalLink className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                      </a>
                    ) : (
                      <p className="eyebrow mt-5 text-ink-soft">{CASE_BLOCK.demoNote}</p>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
