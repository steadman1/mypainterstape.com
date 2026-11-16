/**
 * Magnetic buttons, from the portfolio site: small clickable things lean toward the
 * pointer while it's over them and spring back when it leaves. The system cursor is
 * left alone.
 *
 * Only runs on devices with a mouse or trackpad, and not with reduced motion.
 * Add data-magnetic="none" to an element to opt it out.
 */

const INTERACTIVE = 'a, button:not(:disabled), [role="button"], .pointer';
const MAGNET_PULL = 0.3; // element follows this fraction of the pointer's offset...
const MAGNET_MAX = 8; // ...up to this many pixels
const MAGNET_MAX_WIDTH = 480; // bigger elements (photos, the 3D view) don't move
const MAGNET_MAX_HEIGHT = 120;

// Locomotive scrolls with transforms, so no scroll event fires when the page moves
// under a still pointer. Re-check what is under it every few frames instead.
const RECHECK_EVERY_FRAMES = 6;

type Spring = { x: number; y: number; vx: number; vy: number; goalX: number; goalY: number };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function initMagnetic() {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!finePointer) return;

  const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const pointer = { x: 0, y: 0 };
  const magnets = new Map<HTMLElement, Spring>();
  let target: HTMLElement | null = null;
  let started = false;
  let frame = 0;

  function setTarget(el: EventTarget | null) {
    let next = el instanceof Element ? el.closest<HTMLElement>(INTERACTIVE) : null;
    if (next?.dataset.magnetic === 'none') next = null;
    if (next) {
      const r = next.getBoundingClientRect();
      if (r.width > MAGNET_MAX_WIDTH || r.height > MAGNET_MAX_HEIGHT) next = null;
    }
    if (next === target) return;
    target = next;
    if (target && !magnets.has(target)) magnets.set(target, { x: 0, y: 0, vx: 0, vy: 0, goalX: 0, goalY: 0 });
  }

  addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType === 'touch') return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      started = true;
      setTarget(e.target);
    },
    { passive: true },
  );
  document.documentElement.addEventListener('mouseleave', () => setTarget(null));

  let lastTime = performance.now();
  const tick = (now: number) => {
    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;
    requestAnimationFrame(tick);
    if (!started) return;

    if (++frame % RECHECK_EVERY_FRAMES === 0) setTarget(document.elementFromPoint(pointer.x, pointer.y));
    if (target && !target.isConnected) setTarget(null);

    if (target) {
      const rect = target.getBoundingClientRect();
      const spring = magnets.get(target)!;
      // Centre of the element without its magnetic offset.
      const cx = rect.left + rect.width / 2 - spring.x;
      const cy = rect.top + rect.height / 2 - spring.y;
      const max = reducedQuery.matches ? 0 : MAGNET_MAX;
      spring.goalX = clamp((pointer.x - cx) * MAGNET_PULL, -max, max);
      spring.goalY = clamp((pointer.y - cy) * MAGNET_PULL, -max, max);
    }

    // A slightly springy pull toward the pointer, and a spring back to rest when it leaves.
    for (const [el, s] of magnets) {
      if (el !== target) {
        s.goalX = 0;
        s.goalY = 0;
      }
      const stiffness = 180;
      const damping = 18;
      s.vx += (stiffness * (s.goalX - s.x) - damping * s.vx) * dt;
      s.vy += (stiffness * (s.goalY - s.y) - damping * s.vy) * dt;
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      const atRest = el !== target && Math.abs(s.x) + Math.abs(s.y) + Math.abs(s.vx) + Math.abs(s.vy) < 0.05;
      if (atRest || !el.isConnected) {
        el.style.translate = '';
        magnets.delete(el);
      } else {
        el.style.translate = `${s.x.toFixed(2)}px ${s.y.toFixed(2)}px`;
      }
    }
  };
  requestAnimationFrame(tick);
}
