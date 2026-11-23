'use client';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { clamp, dotPos, lerp, reveal, seg, smooth, type Pt, type SceneApi } from '@/components/services/scroll-scenes/lib';
import { money } from '@/data/prices';

export const SHOP_TAG = 'THE CART';
export const SHOP_TICKS = [0.12, 0.3, 0.5, 0.78];

const PRODUCTS = [
  { name: 'Brake pads', price: 64, stock: 12, bg: 'linear-gradient(135deg,var(--color-sc-b9c4cc),var(--color-sc-6d7c88))' },
  { name: 'Oil filter kit', price: 38, stock: 30, bg: 'linear-gradient(135deg,var(--color-sc-f2d9a7),var(--color-sc-c98f2b))' },
  { name: 'Wiper set', price: 29, stock: 41, bg: 'linear-gradient(135deg,var(--color-sc-9fd0b4),var(--color-sc-2f7a55))' },
  { name: 'Floor mats', price: 53, stock: 9, bg: 'linear-gradient(135deg,var(--color-sc-d6b2b2),var(--color-sc-8c4a4a))' },
];
const PICKS = [0, 1, 3, 2];            // order the items go into the cart
const WIN = 0.1, STARTAT = 0.08, GAPAT = 0.13;

const ShopScene = forwardRef<SceneApi>(function ShopScene(_, ref) {
  const card = useRef<HTMLDivElement>(null);
  const cart = useRef<HTMLSpanElement>(null);
  const em = useRef<HTMLElement>(null);
  const prods = useRef<(HTMLDivElement | null)[]>([]);
  const stocks = useRef<(HTMLElement | null)[]>([]);
  const chips = useRef<(HTMLDivElement | null)[]>([]);
  const ct = useRef<HTMLElement>(null);
  const pay = useRef<HTMLButtonElement>(null);
  const toast = useRef<HTMLDivElement>(null);
  const L = useRef<{ prod: Pt[]; cart: Pt; start: Pt; cartS: Pt; pay: Pt }>({ prod: [], cart: { x: 0, y: 0 }, start: { x: 40, y: 60 }, cartS: { x: 0, y: 0 }, pay: { x: 0, y: 0 } });

  useImperativeHandle(ref, () => ({
    measure(ctx) {
      const cr = card.current!.getBoundingClientRect(), loc = (el: Element): Pt => { const a = el.getBoundingClientRect(); return { x: (a.left - cr.left + a.width / 2) / ctx.scale, y: (a.top - cr.top + a.height / 2) / ctx.scale }; };
      L.current = { prod: prods.current.map((e) => loc(e!)), cart: loc(cart.current!), start: { x: ctx.stage.clientWidth * 0.1, y: 60 }, cartS: ctx.rel(cart.current!), pay: ctx.rel(pay.current!) };
    },
    frame(p, ctx) {
      let count = 0, total = 0;
      const stock = PRODUCTS.map((x) => x.stock);
      PICKS.forEach((pi, k) => {
        const a = STARTAT + GAPAT * k, s = seg(p, a, a + WIN), e = smooth(s);
        prods.current[pi]?.classList.toggle('is-pick', s > 0);
        const chip = chips.current[k];
        if (chip) { const f = L.current.prod[pi] ?? { x: 0, y: 0 }, t = L.current.cart; chip.style.opacity = s > 0 && s < 1 ? '1' : '0'; chip.style.transform = `translate(${lerp(f.x, t.x, e)}px,${lerp(f.y, t.y, e) - Math.sin(e * Math.PI) * 24}px) scale(${lerp(1, 0.5, e)})`; }
        total += PRODUCTS[pi].price * e; if (s >= 1) { count++; stock[pi]--; }
      });
      if (em.current) em.current.textContent = String(count);
      if (ct.current) ct.current.textContent = '$' + Math.round(total);
      stocks.current.forEach((el, i) => { if (el) el.textContent = String(stock[i]); });
      const pressed = p >= 0.72 && p < 0.75, paid = p >= 0.75;
      if (pay.current) { pay.current.classList.toggle('is-pressed', pressed); pay.current.classList.toggle('is-paid', paid); pay.current.textContent = paid ? 'Paid ✓' : 'Pay securely'; }
      reveal(toast.current, smooth(seg(p, 0.78, 0.86)));
      const d = dotPos(p, L.current.start, [{ a: 0, b: 0.07, to: L.current.cartS }, { a: 0.6, b: 0.72, to: L.current.pay }]);
      ctx.setDot(d.x, d.y, clamp(p * 30));
    },
  }), []);

  return (
    <div ref={card} className="sc-card">
      <div className="sc-shophead"><b>Parts Depot</b>
        <span ref={cart} className="sc-cart"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h2l2.4 11h10l2-8H6.5" /><circle cx="9" cy="19" r="1.5" /><circle cx="17" cy="19" r="1.5" /></svg><em ref={em}>0</em></span></div>
      <div className="sc-pgrid">
        {PRODUCTS.map((x, i) => (
          <div key={x.name} ref={(el) => { prods.current[i] = el; }} className="sc-prod">
            <div className="sc-img" style={{ background: x.bg }} /><b>{x.name}</b><small>${x.price}</small>
            <span className="sc-sk">In stock: <i ref={(el) => { stocks.current[i] = el; }}>{x.stock}</i></span>
          </div>
        ))}
      </div>
      <div className="sc-carttotal"><span>Cart total</span><b ref={ct}>{money(0)}</b></div>
      <button ref={pay} className="sc-pay" type="button" tabIndex={-1}>Pay securely</button>
      <div ref={toast} className="sc-toast sc-r">New order #1042 · shipping label ready</div>
      {PICKS.map((_, k) => (<div key={k} ref={(el) => { chips.current[k] = el; }} className="sc-chip" />))}
    </div>
  );
});
export default ShopScene;
