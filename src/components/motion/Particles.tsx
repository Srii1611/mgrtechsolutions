'use client';

import { useEffect, useRef } from 'react';

type P = {
  x: number; y: number; z: number;   // world position; z is depth (0 = nearest)
  vx: number; vy: number; vz: number;
  scale: number;                     // per-particle size variation
  alpha: number;
};

/** Reads a design token off :root as [r,g,b]. Canvas needs literal numbers,
 *  so tokens are resolved at runtime — colors stay in @theme (hard rule 4). */
function token(name: string, fallback: [number, number, number]): [number, number, number] {
  if (typeof window === 'undefined') return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(raw);
  if (!m) return fallback;
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

export default function Particles({
  /** Depth of the field. Higher = stronger perspective falloff. */
  spread = 260,
  /** Drift speed multiplier. */
  speed = 0.1,
  /** Sprite diameter in px at the nearest depth. */
  baseSize = 15,
  /** Parallax the field toward the pointer. */
  moveOnHover = true,
  /** Vary opacity per particle. False = uniform, crisper. */
  alphaParticles = true,
  /** Slow rotation of the whole field. */
  rotate = true,
  /** Overall opacity ceiling. */
  opacity = 0.95,
  className = '',
}: {
  spread?: number;
  speed?: number;
  baseSize?: number;
  moveOnHover?: boolean;
  alphaParticles?: boolean;
  rotate?: boolean;
  opacity?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const COLOR = token('--color-mist', [157, 181, 167]);

    // ── The sprite ─────────────────────────────────────────────────
    // Drawing a shape per particle per frame is ruinously slow. Render ONE
    // dot to an offscreen canvas, then stamp it with drawImage — a cheap
    // blit. This is what makes hundreds of particles affordable.
    //
    // The dot is SOLID to ~86% of its radius and only fades over the last
    // sliver, which is antialiasing, not glow. A sprite that fades from the
    // centre outward renders as a smudge — the difference between a
    // starfield and fog is entirely in this gradient.
    const SPRITE = 64;
    const sprite = document.createElement('canvas');
    sprite.width = SPRITE;
    sprite.height = SPRITE;
    const sctx = sprite.getContext('2d');
    if (!sctx) return;
    const rgb = `${COLOR[0]}, ${COLOR[1]}, ${COLOR[2]}`;
    const grad = sctx.createRadialGradient(
      SPRITE / 2, SPRITE / 2, 0,
      SPRITE / 2, SPRITE / 2, SPRITE / 2,
    );
    grad.addColorStop(0.0, `rgba(${rgb}, 1)`);
    grad.addColorStop(0.86, `rgba(${rgb}, 1)`);
    grad.addColorStop(1.0, `rgba(${rgb}, 0)`);
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, SPRITE, SPRITE);

    let particles: P[] = [];
    let w = 0;
    let h = 0;
    let spin = 0;

    const pointer = { tx: 0, ty: 0, x: 0, y: 0 };

    const makeParticle = (): P => ({
      // World coords are centred on 0,0 and deliberately overshoot the
      // viewport, so the field still fills the frame once perspective
      // shrinks the far particles inward.
      x: (Math.random() - 0.5) * w * 2.2,
      y: (Math.random() - 0.5) * h * 2.2,
      z: Math.random() * spread,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      vz: -(0.15 + Math.random() * 0.5),
      // Squaring the random skews most particles small with a few standouts,
      // which is what gives a starfield its texture. A flat random makes
      // every dot the same middling size and reads as noise.
      scale: 0.28 + Math.pow(Math.random(), 2) * 1.5,
      alpha: alphaParticles ? 0.4 + Math.random() * 0.6 : 1,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Count scales with area: far fewer on a 375px phone (hard rule 8).
      // Small crisp dots need MANY more than soft blobs did to read as a
      // field rather than as scattered specks.
      const count = Math.max(110, Math.min(520, Math.round((w * h) / 2500)));
      particles = Array.from({ length: count }, makeParticle);
    };

    const drawFrame = (dt: number, animate: boolean) => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;

      if (animate) {
        if (rotate) spin += 0.00004 * dt;
        pointer.x += (pointer.tx - pointer.x) * 0.05; // eased follow, not a snap
        pointer.y += (pointer.ty - pointer.y) * 0.05;
      }

      const cos = Math.cos(spin);
      const sin = Math.sin(spin);

      // Painter's algorithm: far particles first, so near ones stack on top.
      particles.sort((a, b) => b.z - a.z);

      // Normal blending, deliberately NOT 'lighter'. Additive blending piles
      // overlapping particles into bright haze, which is what turned this
      // into fog on the first pass.
      for (const p of particles) {
        if (animate) {
          p.x += p.vx * speed * dt * 0.06;
          p.y += p.vy * speed * dt * 0.06;
          p.z += p.vz * speed * dt * 0.06;
          // Recycle to the back of the field once it passes the camera.
          if (p.z <= 0) {
            p.z = spread;
            p.x = (Math.random() - 0.5) * w * 2.2;
            p.y = (Math.random() - 0.5) * h * 2.2;
          }
        }

        // Perspective projection: k shrinks with depth, driving position,
        // size and opacity together. That single factor is what sells depth.
        const k = 1 / (1 + (p.z / spread) * 3);

        const rx = p.x * cos - p.y * sin;
        const ry = p.x * sin + p.y * cos;

        const px = cx + rx * k + pointer.x * k;
        const py = cy + ry * k + pointer.y * k;

        const r = baseSize * k * p.scale;
        if (r < 0.4) continue;
        if (px < -r || px > w + r || py < -r || py > h + r) continue;

        // Depth dims the far particles, but only partly — fading straight
        // by k washes the back of the field out entirely.
        ctx.globalAlpha = p.alpha * (0.45 + 0.55 * k) * opacity;
        ctx.drawImage(sprite, px - r, py - r, r * 2, r * 2);
      }
      ctx.globalAlpha = 1;
    };

    resize();

    // ── Reduced motion (hard rule 5) ───────────────────────────────
    // The CSS guard in globals.css cannot see a canvas loop. Paint one
    // static frame and never start animating.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      drawFrame(0, false);
      const roStatic = new ResizeObserver(() => { resize(); drawFrame(0, false); });
      roStatic.observe(canvas);
      return () => roStatic.disconnect();
    }

    let raf = 0;
    let last = performance.now();
    let visible = true; // a ref, NOT a dep — a dep would rebuild on every scroll

    const tick = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      if (visible) drawFrame(dt, true);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      if (!moveOnHover) return;
      const rect = canvas.getBoundingClientRect();
      pointer.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 46;
      pointer.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 46;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      io.disconnect();
      ro.disconnect();
    };
  }, [spread, speed, baseSize, moveOnHover, alphaParticles, rotate, opacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
