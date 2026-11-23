'use client';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { clamp, dotPos, reveal, seg, smooth, typed, type Pt, type SceneApi } from '@/components/services/scroll-scenes/lib';
import { money } from '@/data/prices';

export const ADS_TAG = 'THE CLICK TO CALL';
export const ADS_TICKS = [0.18, 0.34, 0.5, 0.8];

/** Made-up ad spend for the demo card. Not one of our prices. */
const DEMO_AD_SPEND = 1500;
const QUERY = 'emergency plumber near me';
const TIMES = ['8:12 AM', '9:40 AM', '1:05 PM'];

const AdsScene = forwardRef<SceneApi>(function AdsScene(_, ref) {
  const q = useRef<HTMLSpanElement>(null);
  const searchBox = useRef<HTMLDivElement>(null);
  const ad = useRef<HTMLDivElement>(null);
  const adTitle = useRef<HTMLElement>(null);
  const land = useRef<HTMLDivElement>(null);
  const call = useRef<HTMLButtonElement>(null);
  const leads = useRef<HTMLDivElement>(null);
  const lrows = useRef<(HTMLDivElement | null)[]>([]);
  const ln = useRef<HTMLElement>(null);
  const cpl = useRef<HTMLElement>(null);
  const A = useRef<{ start: Pt; search: Pt; ad: Pt; call: Pt; leads: Pt }>({ start: { x: 40, y: 60 }, search: { x: 0, y: 0 }, ad: { x: 0, y: 0 }, call: { x: 0, y: 0 }, leads: { x: 0, y: 0 } });

  useImperativeHandle(ref, () => ({
    measure(ctx) {
      const sb = searchBox.current!.getBoundingClientRect(), s = ctx.stage.getBoundingClientRect();
      A.current = { start: { x: s.width * 0.1, y: 60 }, search: { x: sb.left - s.left + 38 * ctx.scale, y: sb.top - s.top + sb.height / 2 }, ad: ctx.rel(adTitle.current!), call: ctx.rel(call.current!), leads: ctx.rel(leads.current!) };
    },
    frame(p, ctx) {
      if (q.current) q.current.textContent = typed(QUERY, seg(p, 0.03, 0.14));
      reveal(ad.current, smooth(seg(p, 0.14, 0.2)));
      ad.current?.classList.toggle('is-clicked', p >= 0.28);
      reveal(land.current, smooth(seg(p, 0.28, 0.34)));
      call.current?.classList.toggle('is-ring', p >= 0.42);
      lrows.current.forEach((el, i) => reveal(el, smooth(seg(p, 0.44 + i * 0.06, 0.5 + i * 0.06))));
      const m = seg(p, 0.5, 0.8);
      if (ln.current) ln.current.textContent = String(Math.round(25 * m));
      if (cpl.current) cpl.current.textContent = '$' + Math.round(60 * m);
      const d = dotPos(p, A.current.start, [{ a: 0, b: 0.07, to: A.current.search }, { a: 0.2, b: 0.26, to: A.current.ad }, { a: 0.34, b: 0.4, to: A.current.call }, { a: 0.84, b: 0.94, to: A.current.leads }]);
      ctx.setDot(d.x, d.y, clamp(p * 30));
    },
  }), []);

  return (
    <div className="sc-card">
      <div className="sc-ads">
        <div ref={searchBox} className="sc-search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-sc-777777)" strokeWidth="2.4" strokeLinecap="round"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M20 20l-4.8-4.8" /></svg>
          <span ref={q} /><span className="sc-caret" />
        </div>
        <div ref={ad} className="sc-r sc-a-ad"><small><i>Ad</i>metroplumbing.com</small><b ref={adTitle}>24/7 Emergency Plumber</b><span>On site in 60 minutes. Call now.</span></div>
        <div ref={land} className="sc-r sc-a-land"><span className="sc-a-tag">SAME WORDS AS THE AD</span><b>24/7 Emergency Plumber</b><button ref={call} className="sc-callbtn" type="button" tabIndex={-1}>Call now</button></div>
        <div ref={leads} className="sc-a-leads"><small>Leads this month</small>
          {TIMES.map((t, i) => (<div key={t} ref={(el) => { lrows.current[i] = el; }} className="sc-r sc-lr"><span>New call</span><small>{t}</small></div>))}
        </div>
        <div className="sc-a-meter">
          <div><small>Ad spend</small><b>{money(DEMO_AD_SPEND)}</b></div><div><small>Leads</small><b ref={ln}>0</b></div><div><small>Cost per lead</small><b ref={cpl}>{money(0)}</b></div>
        </div>
      </div>
    </div>
  );
});
export default AdsScene;
