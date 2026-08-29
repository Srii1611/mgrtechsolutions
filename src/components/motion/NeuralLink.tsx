'use client';

import { useEffect, useRef } from 'react';

type Node = {
  x: number; y: number;   // position, in CSS pixels
  vx: number; vy: number; // velocity, pixels per frame
  r: number;              // radius
  pulse: number;          // 1.0 = resting; spikes when a packet passes through
};

type Packet = {
  path: number[];  // indices of the nodes this packet will visit, in order
  leg: number;     // which hop of the path we're on
  t: number;       // 0..1 progress along the current hop
  speed: number;
  size: number;
};

/**
 * Reads a design token off :root and returns it as an [r,g,b] triple.
 *
 * Canvas can't use CSS variables — it needs literal numbers. So we resolve
 * the token at runtime instead of hardcoding hex, which keeps hard rule 4
 * intact: the colors still live in @theme, this file just asks for them.
 */
function token(name: string, fallback: [number, number, number]): [number, number, number] {
  if (typeof window === 'undefined') return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(raw);
  if (!m) return fallback;
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

export default function NeuralLink({
  /** Pixels between two nodes before a synapse line is drawn. */
  linkDistance = 130,
  /** How close the cursor must be to reach a node. */
  cursorRadius = 170,
  /** Milliseconds between auto-spawned packets. 0 disables them. */
  packetEvery = 2600,
  className = '',
}: {
  linkDistance?: number;
  cursorRadius?: number;
  packetEvery?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── Colors, resolved once from your @theme tokens ──────────────
    const NODE = token('--color-accent', [60, 224, 140]);
    const LINE = token('--color-mist', [157, 181, 167]);
    const PACKET = token('--color-cream-50', [250, 246, 236]);
    const rgba = (c: [number, number, number], a: number) =>
      `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;

    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let w = 0;
    let h = 0;

    const pointer = { x: 0, y: 0, active: false, lastX: 0, lastY: 0 };

    // ── Sizing ─────────────────────────────────────────────────────
    // A canvas has two sizes: its CSS size (how big it looks) and its
    // buffer size (how many real pixels it holds). On a phone those differ
    // by the devicePixelRatio — usually 2 or 3. Set the buffer to the
    // larger size, then scale the context so your drawing code can keep
    // thinking in ordinary CSS pixels. Skip this and everything is blurry.
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2: 3x costs a lot for no visible gain
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Node count scales with area, so a 375px phone renders far fewer
      // than a desktop. Mobile-first (hard rule 8) applies to frame cost,
      // not just layout.
      const target = Math.round((w * h) / 26000);
      const count = Math.max(16, Math.min(64, target));

      nodes = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.10 + Math.random() * 0.18; // deliberately slower than the demo
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 1.2 + Math.random() * 1.6,
          pulse: 1,
        };
      });
      packets = [];
    };

    // ── Packet routing ─────────────────────────────────────────────
    // Walk from a starting node to a random connected neighbour, 3-5 times,
    // to build a path. The packet then travels that path hop by hop.
    const spawnPacket = (startIdx: number) => {
      const path = [startIdx];
      let current = startIdx;
      const hops = 3 + Math.floor(Math.random() * 3);

      for (let i = 0; i < hops; i++) {
        const neighbours: number[] = [];
        const a = nodes[current];
        for (let j = 0; j < nodes.length; j++) {
          if (j === current || path.includes(j)) continue;
          const dx = nodes[j].x - a.x;
          const dy = nodes[j].y - a.y;
          if (dx * dx + dy * dy < linkDistance * linkDistance) neighbours.push(j);
        }
        if (neighbours.length === 0) break;
        current = neighbours[Math.floor(Math.random() * neighbours.length)];
        path.push(current);
      }

      if (path.length < 2) return;
      packets.push({
        path,
        leg: 0,
        t: 0,
        speed: 0.020 + Math.random() * 0.014,
        size: 1.8 + Math.random() * 1.4,
      });
      nodes[startIdx].pulse = 2.4;
    };

    // ── Drawing ────────────────────────────────────────────────────
    // One frame. Split into update-then-draw so the two never tangle.
    const drawFrame = (dt: number, animate: boolean) => {
      ctx.clearRect(0, 0, w, h);

      if (animate) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          // Wrap around the edges so the field never empties out.
          if (n.x < 0) n.x = w; else if (n.x > w) n.x = 0;
          if (n.y < 0) n.y = h; else if (n.y > h) n.y = 0;
          n.pulse = n.pulse > 1 ? Math.max(1, n.pulse - dt * 0.004) : 1;
        }
      }

      // Synapse lines. Comparing every pair is O(n²) — the cost grows with
      // the SQUARE of the node count. That's why count is capped above.
      // Note `j = i + 1`: it skips pairs already compared, halving the work.
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d2 = dx * dx + dy * dy;
          // Compare squared distances. Math.sqrt is expensive and we only
          // need the real distance for the fade, not for the test itself.
          if (d2 >= linkDistance * linkDistance) continue;
          const d = Math.sqrt(d2);
          ctx.strokeStyle = rgba(LINE, (1 - d / linkDistance) * 0.16);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Cursor tendrils
      if (pointer.active) {
        ctx.lineWidth = 0.8;
        for (const n of nodes) {
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d >= cursorRadius) continue;
          ctx.strokeStyle = rgba(NODE, (1 - d / cursorRadius) * 0.22);
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
      }

      // Nodes
      for (const n of nodes) {
        ctx.fillStyle = rgba(NODE, 0.75);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * n.pulse, 0, Math.PI * 2);
        ctx.fill();
      }

      // Packets — the signature effect. `t` runs 0→1 across one hop, and
      // the position is a linear interpolation (lerp) between the two
      // nodes: start + (end - start) * t.
      if (animate) {
        for (let i = packets.length - 1; i >= 0; i--) {
          const p = packets[i];
          p.t += p.speed;

          if (p.t >= 1) {
            p.t = 0;
            p.leg++;
            if (p.leg >= p.path.length - 1) {
              packets.splice(i, 1);
              continue;
            }
            nodes[p.path[p.leg]].pulse = 2;
          }

          const a = nodes[p.path[p.leg]];
          const b = nodes[p.path[p.leg + 1]];
          if (!a || !b) { packets.splice(i, 1); continue; }

          const x = a.x + (b.x - a.x) * p.t;
          const y = a.y + (b.y - a.y) * p.t;

          ctx.shadowBlur = 10;
          ctx.shadowColor = rgba(PACKET, 0.9);
          ctx.fillStyle = rgba(PACKET, 0.95);
          ctx.beginPath();
          ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // shadows are sticky — always reset
        }
      }
    };

    resize();

    // ── Reduced motion (hard rule 5) ───────────────────────────────
    // Your globals.css guard only reaches CSS animations. A canvas loop is
    // invisible to it, so the check has to happen here: paint ONE static
    // frame and never start the loop at all.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) {
      drawFrame(0, false);
      const ro = new ResizeObserver(() => { resize(); drawFrame(0, false); });
      ro.observe(canvas);
      return () => ro.disconnect();
    }

    // ── The loop ───────────────────────────────────────────────────
    let raf = 0;
    let last = performance.now();
    let spawnClock = 0;

    // Pausing when off-screen goes in a REF, not a dependency. If it were a
    // dep, the effect would tear down and rebuild every time you scrolled
    // past — which is the bug in the component you pasted.
    let visible = true;

    const tick = (now: number) => {
      const dt = Math.min(now - last, 50); // clamp: a backgrounded tab returns a huge dt
      last = now;

      if (visible) {
        if (packetEvery > 0 && nodes.length > 0) {
          spawnClock += dt;
          if (spawnClock >= packetEvery) {
            spawnClock = 0;
            spawnPacket(Math.floor(Math.random() * nodes.length));
          }
        }
        drawFrame(dt, true);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // ── Listeners ──────────────────────────────────────────────────
    // 'pointermove' covers mouse, touch, and stylus in one event.
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;

      // Throttle by distance, not by time: inject a packet only after the
      // pointer has actually travelled far enough to mean something.
      if (Math.hypot(pointer.x - pointer.lastX, pointer.y - pointer.lastY) > 60) {
        let best = -1;
        let bestD = Infinity;
        for (let i = 0; i < nodes.length; i++) {
          const d = Math.hypot(nodes[i].x - pointer.x, nodes[i].y - pointer.y);
          if (d < bestD) { bestD = d; best = i; }
        }
        if (best >= 0 && bestD < cursorRadius) spawnPacket(best);
        pointer.lastX = pointer.x;
        pointer.lastY = pointer.y;
      }
    };
    const onLeave = () => { pointer.active = false; };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);

    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(canvas);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Every listener, observer, and frame request gets torn down here.
    // Miss one and it leaks across client-side navigations.
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      io.disconnect();
      ro.disconnect();
    };
  }, [linkDistance, cursorRadius, packetEvery]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}