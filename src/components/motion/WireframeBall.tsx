'use client';

import { useEffect, useRef } from 'react';

type Vec = { x: number; y: number; z: number };

/** Reads a design token off :root as [r,g,b]. Canvas needs literal numbers,
 *  so tokens are resolved at runtime — colors stay in @theme (hard rule 4). */
function token(name: string, fallback: [number, number, number]): [number, number, number] {
  if (typeof window === 'undefined') return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(raw);
  if (!m) return fallback;
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

export default function WireframeBall({
  /** Vertex count. The reference sits around 45. */
  points = 46,
  /** Radius as a fraction of the smaller viewport dimension. */
  radius = 0.34,
  /** Connect two vertices when their distance on the unit sphere is under this. */
  linkAt = 0.62,
  /** Rotations per second around the vertical axis. */
  spinSpeed = 0.045,
  /** Tilt of the rotation axis, in radians. */
  tilt = -0.32,
  /** Horizontal placement, 0..1. Overridden to sit right of centre on wide screens. */
  offsetX = 0.5,
  /** Nudge toward the pointer. */
  moveOnHover = true,
  className = '',
}: {
  points?: number;
  radius?: number;
  linkAt?: number;
  spinSpeed?: number;
  tilt?: number;
  offsetX?: number;
  moveOnHover?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const NODE = token('--color-accent', [60, 224, 140]);
    const LINE = token('--color-cream-50', [250, 246, 236]);
    const nodeRgb = `${NODE[0]}, ${NODE[1]}, ${NODE[2]}`;
    const lineRgb = `${LINE[0]}, ${LINE[1]}, ${LINE[2]}`;

    // ── Vertices: an evenly spread sphere ───────────────────────────
    // A Fibonacci sphere. Placing points with random spherical angles
    // clumps them at the poles; stepping by the golden angle spaces them
    // almost perfectly evenly, which is what makes the mesh look designed
    // rather than scattered.
    const GOLDEN = Math.PI * (3 - Math.sqrt(5));
    const verts: Vec[] = [];
    for (let i = 0; i < points; i++) {
      const y = 1 - (i / (points - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * GOLDEN;
      verts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
    }

    // ── Edges: computed ONCE ────────────────────────────────────────
    // The sphere is rigid — vertices never move relative to each other, they
    // only rotate together. So which pairs are connected never changes, and
    // the O(n²) pair scan runs a single time at startup rather than every
    // frame. This is the whole performance story of this component.
    const edges: [number, number][] = [];
    for (let i = 0; i < verts.length; i++) {
      for (let j = i + 1; j < verts.length; j++) {
        const dx = verts[i].x - verts[j].x;
        const dy = verts[i].y - verts[j].y;
        const dz = verts[i].z - verts[j].z;
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < linkAt) edges.push([i, j]);
      }
    }

    // ── Glow sprite, pre-rendered once ──────────────────────────────
    // Each node is a crisp core plus a soft halo. The halo is a gradient,
    // and generating one per node per frame would be wasteful, so it is
    // stamped from an offscreen canvas.
    const G = 64;
    const glow = document.createElement('canvas');
    glow.width = G;
    glow.height = G;
    const gctx = glow.getContext('2d');
    if (!gctx) return;
    const gg = gctx.createRadialGradient(G / 2, G / 2, 0, G / 2, G / 2, G / 2);
    gg.addColorStop(0.0, `rgba(${nodeRgb}, 0.55)`);
    gg.addColorStop(0.35, `rgba(${nodeRgb}, 0.18)`);
    gg.addColorStop(1.0, `rgba(${nodeRgb}, 0)`);
    gctx.fillStyle = gg;
    gctx.fillRect(0, 0, G, G);

    let w = 0;
    let h = 0;
    let angle = 0;
    const proj = verts.map(() => ({ x: 0, y: 0, k: 0 }));
    const pointer = { tx: 0, ty: 0, x: 0, y: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawFrame = (dt: number, animate: boolean) => {
      ctx.clearRect(0, 0, w, h);

      if (animate) {
        angle += spinSpeed * (dt / 1000) * Math.PI * 2;
        pointer.x += (pointer.tx - pointer.x) * 0.05;
        pointer.y += (pointer.ty - pointer.y) * 0.05;
      }

      // Centred. Canvas has no media queries, so the one responsive
      // decision — shrinking the ball on narrow screens so it does not
      // crowd the headline — happens here.
      const cx = w * offsetX + pointer.x;
      const cy = h * 0.5 + pointer.y;
      const R = Math.min(w, h) * (w >= 1024 ? radius : radius * 0.78);

      const ca = Math.cos(angle);
      const sa = Math.sin(angle);
      const ct = Math.cos(tilt);
      const st = Math.sin(tilt);

      // ── Rotate and project ────────────────────────────────────────
      for (let i = 0; i < verts.length; i++) {
        const v = verts[i];
        // Spin around the vertical axis...
        const x1 = v.x * ca - v.z * sa;
        const z1 = v.x * sa + v.z * ca;
        // ...then tilt the whole thing toward the viewer.
        const y2 = v.y * ct - z1 * st;
        const z2 = v.y * st + z1 * ct;

        // Perspective divide. k > 1 means nearer than centre, k < 1 farther;
        // it scales position AND drives the depth fade below.
        const k = 2.6 / (2.6 + z2);
        proj[i].x = cx + x1 * R * k;
        proj[i].y = cy + y2 * R * k;
        proj[i].k = k;
      }

      // ── Edges ─────────────────────────────────────────────────────
      // Drawn before the nodes so vertices sit on top of their own lines.
      ctx.lineWidth = 0.7;
      for (const [a, b] of edges) {
        const pa = proj[a];
        const pb = proj[b];
        const depth = (pa.k + pb.k) / 2;          // ~0.72 (back) .. ~1.4 (front)
        const t = Math.max(0, Math.min(1, (depth - 0.7) / 0.7));
        ctx.strokeStyle = `rgba(${lineRgb}, ${0.05 + t * 0.30})`;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }

      // ── Nodes ─────────────────────────────────────────────────────
      // Painter's algorithm: farthest first, so near vertices overlap far.
      const order = proj
        .map((p, i) => ({ i, k: p.k }))
        .sort((m, n) => m.k - n.k);

      for (const { i } of order) {
        const p = proj[i];
        const t = Math.max(0, Math.min(1, (p.k - 0.7) / 0.7));
        const size = (2.0 + t * 2.6);

        // Halo
        const gr = size * 5.5;
        ctx.globalAlpha = 0.35 + t * 0.65;
        ctx.drawImage(glow, p.x - gr, p.y - gr, gr * 2, gr * 2);

        // Core
        ctx.globalAlpha = 0.5 + t * 0.5;
        ctx.fillStyle = `rgba(${nodeRgb}, 1)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
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
      pointer.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 34;
      pointer.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 34;
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
  }, [points, radius, linkAt, spinSpeed, tilt, offsetX, moveOnHover]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
