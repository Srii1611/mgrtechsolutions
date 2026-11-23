'use client';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { clamp, dotPos, lerp, reveal, seg, smooth, type Pt, type SceneApi } from '@/components/services/scroll-scenes/lib';

export const WEB_TICKS = [0.14, 0.3, 0.56, 0.8];

const WebScene = forwardRef<SceneApi>(function WebScene(_, ref) {
  const blocks = useRef<(HTMLElement | null)[]>([]);
  const call = useRef<HTMLButtonElement>(null);
  const gt = useRef<HTMLElement>(null);
  const gbar = useRef<HTMLElement>(null);
  const stamp = useRef<HTMLDivElement>(null);
  const A = useRef<{ start: Pt; hero: Pt; call: Pt }>({ start: { x: 40, y: 60 }, hero: { x: 150, y: 200 }, call: { x: 150, y: 400 } });

  useImperativeHandle(ref, () => ({
    measure(ctx) {
      A.current = { start: { x: ctx.stage.clientWidth * 0.1, y: 60 }, hero: ctx.rel(blocks.current[1]!), call: ctx.rel(call.current!) };
    },
    frame(p, ctx) {
      blocks.current.forEach((el, i) => reveal(el as HTMLElement, smooth(seg(p, 0.05 + i * 0.09, 0.12 + i * 0.09))));
      const g = seg(p, 0.45, 0.75), v = lerp(4.2, 1.8, 1 - Math.pow(1 - g, 3));
      if (gt.current) gt.current.textContent = v.toFixed(1) + 's';
      if (gbar.current) gbar.current.style.width = (v / 4.2) * 100 + '%';
      const s = smooth(seg(p, 0.78, 0.84));
      if (stamp.current) { stamp.current.style.opacity = String(s); stamp.current.style.transform = `rotate(8deg) scale(${lerp(1.8, 1, s)})`; }
      call.current?.classList.toggle('is-ring', p >= 0.9);
      const d = dotPos(p, A.current.start, [{ a: 0, b: 0.08, to: A.current.hero }, { a: 0.84, b: 0.95, to: A.current.call }]);
      ctx.setDot(d.x, d.y, clamp(p * 30));
    },
  }), []);

  return (
    <div className="sc-card">
      <div className="sc-bhead"><i /><i /><i /><span className="sc-url">yourbusiness.com</span></div>
      <div className="sc-bbody">
        <div className="sc-r sc-b-nav" ref={(el) => { blocks.current[0] = el; }}><span className="sc-logo" /><span><s /><s /><s /></span></div>
        <div className="sc-r sc-b-hero" ref={(el) => { blocks.current[1] = el; }}><h4>Framingham&apos;s plastering crew.</h4><p>Free quotes. Local. Insured.</p></div>
        <div className="sc-r sc-b-photo" ref={(el) => { blocks.current[2] = el; }} />
        <div className="sc-r sc-b-rev" ref={(el) => { blocks.current[3] = el; }}><span className="sc-stars">★★★★★</span> 4.9 · 112 reviews</div>
        <div className="sc-r" ref={(el) => { blocks.current[4] = el; }}><button ref={call} className="sc-callbtn" type="button" tabIndex={-1}>Call now</button></div>
      </div>
      <div className="sc-gauge"><div className="sc-g1"><span>Mobile load time</span><b ref={gt}>4.2s</b></div><div className="sc-gbarwrap"><u ref={gbar} /></div></div>
      <div ref={stamp} className="sc-stamp">100% YOURS</div>
    </div>
  );
});
export default WebScene;
