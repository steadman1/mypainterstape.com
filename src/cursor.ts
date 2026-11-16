/**
 * Custom cursor, ported from the portfolio site: public/pointer.svg normally,
 * public/hand.svg over anything clickable (INTERACTIVE below).
 *
 * - Small clickable things lean toward the pointer ("magnetic").
 * - Add data-cursor="none" to an element to opt it out, or data-cursor to opt
 *   a non-button element in (it gets the hand).
 * - Only runs on devices with a mouse or trackpad; touch screens keep the
 *   normal behavior.
 *
 * `size` is how big the artwork is drawn (px), `hotspot` is the point that
 * clicks as a fraction of the image (0,0 = top left), and `angle` turns the
 * artwork around the hotspot. The arrow in pointer.svg points straight up, so
 * it is turned 30° for the macOS look.
 */

const CURSORS = {
  pointer: { src: '/pointer.svg', size: 46, hotspot: [0.5, 0.11], angle: -30 },
  hand: { src: '/hand.svg', size: 68, hotspot: [0.39, 0.25], angle: 0 },
};

// The cursor tilts a little in the direction it's moving, then springs back.
const TILT_PER_SPEED = 0.012; // degrees per px/s of sideways movement...
const TILT_MAX = 14; // ...up to this many degrees

const INTERACTIVE = 'a, button:not(:disabled), [role="button"], .pointer, [data-cursor]';
const MAGNET_PULL = 0.3; // element follows this fraction of the pointer's offset...
const MAGNET_MAX = 8; // ...up to this many pixels
const MAGNET_MAX_WIDTH = 480; // bigger elements (photos, the 3D view) don't move
const MAGNET_MAX_HEIGHT = 120;

// Locomotive scrolls with transforms, so no scroll event fires when the page moves
// under a still pointer. Re-check what is under it every few frames instead.
const RECHECK_EVERY_FRAMES = 6;

type Spring = { x: number; y: number; vx: number; vy: number; goalX: number; goalY: number };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const damp = (current: number, target: number, rate: number, dt: number) =>
  current + (target - current) * (1 - Math.exp(-rate * dt));

export function initCursor() {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!finePointer) return;

  const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const root = document.createElement('div');
  root.className = 'cursor';
  root.setAttribute('aria-hidden', 'true');
  for (const [name, c] of Object.entries(CURSORS)) {
    const img = document.createElement('img');
    img.className = `cursor-img cursor-${name}`;
    img.src = c.src;
    img.alt = '';
    img.width = c.size;
    img.height = c.size;
    img.draggable = false;
    img.style.left = `${-c.size * c.hotspot[0]}px`;
    img.style.top = `${-c.size * c.hotspot[1]}px`;
    img.style.transformOrigin = `${c.hotspot[0] * 100}% ${c.hotspot[1] * 100}%`;
    img.style.setProperty('--angle', `${c.angle}deg`);
    root.append(img);
  }
  document.body.append(root);

  const pointer = { x: 0, y: 0 };
  const last = { x: 0 };
  const tilt = { angle: 0, speed: 0, velocityX: 0 };
  const magnets = new Map<HTMLElement, Spring>();
  let target: HTMLElement | null = null;
  let magnetic = false;
  let started = false;
  let frame = 0;

  function setTarget(el: EventTarget | null) {
    let next = el instanceof Element ? el.closest<HTMLElement>(INTERACTIVE) : null;
    if (next?.dataset.cursor === 'none') next = null;
    if (next === target) return;
    target = next;
    magnetic = false;
    if (target && !(target instanceof HTMLCanvasElement)) {
      const r = target.getBoundingClientRect();
      magnetic = r.width <= MAGNET_MAX_WIDTH && r.height <= MAGNET_MAX_HEIGHT;
      if (magnetic && !magnets.has(target)) magnets.set(target, { x: 0, y: 0, vx: 0, vy: 0, goalX: 0, goalY: 0 });
    }
    root.classList.toggle('is-hand', !!target);
  }

  addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType === 'touch') return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!started) {
        // Only hide the system cursor once ours is actually running.
        started = true;
        last.x = pointer.x;
        document.documentElement.classList.add('has-cursor');
      }
      root.classList.add('is-visible');
      setTarget(e.target);
    },
    { passive: true },
  );

  document.documentElement.addEventListener('mouseleave', () => root.classList.remove('is-visible'));
  document.documentElement.addEventListener('mouseenter', () => started && root.classList.add('is-visible'));
  addEventListener('pointerdown', () => root.classList.add('is-pressed'));
  addEventListener('pointerup', () => root.classList.remove('is-pressed'));
  addEventListener('pointercancel', () => root.classList.remove('is-pressed'));

  let lastTime = performance.now();
  const tick = (now: number) => {
    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;
    requestAnimationFrame(tick);
    if (!started) return;

    if (++frame % RECHECK_EVERY_FRAMES === 0) setTarget(document.elementFromPoint(pointer.x, pointer.y));

    // The cursor itself follows the pointer exactly (no lag).
    root.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;

    // Tilt toward the direction of movement on a slightly bouncy spring.
    if (dt > 0) {
      tilt.velocityX = damp(tilt.velocityX, (pointer.x - last.x) / dt, 14, dt);
      last.x = pointer.x;
      const goal = reducedQuery.matches ? 0 : clamp(tilt.velocityX * TILT_PER_SPEED, -TILT_MAX, TILT_MAX);
      // Small steps keep the spring steady even when frames are slow.
      for (let left = dt; left > 0; left -= 1 / 120) {
        const step = Math.min(left, 1 / 120);
        tilt.speed += (200 * (goal - tilt.angle) - 14 * tilt.speed) * step;
        tilt.angle += tilt.speed * step;
      }
      if (Math.abs(tilt.angle) + Math.abs(tilt.speed) < 0.01) tilt.angle = tilt.speed = 0;
      root.style.setProperty('--tilt', `${tilt.angle.toFixed(2)}deg`);
    }

    if (target && !target.isConnected) setTarget(null);

    if (target && magnetic) {
      const rect = target.getBoundingClientRect();
      const spring = magnets.get(target)!;
      // Centre of the element without its magnetic offset.
      const cx = rect.left + rect.width / 2 - spring.x;
      const cy = rect.top + rect.height / 2 - spring.y;
      const max = reducedQuery.matches ? 0 : MAGNET_MAX;
      spring.goalX = clamp((pointer.x - cx) * MAGNET_PULL, -max, max);
      spring.goalY = clamp((pointer.y - cy) * MAGNET_PULL, -max, max);
    }

    // Magnetic elements: a slightly springy pull toward the pointer, and a
    // spring back to rest when the pointer leaves.
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
