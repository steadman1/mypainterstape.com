import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useLoader, useThree, ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { isMobile } from 'react-device-detect';
import { useLocomotiveScroll } from '../hooks/useLocomotiveScroll';
import { useLocomotiveScrollEvent } from '../hooks/useLocomotiveScrollEvent';

const INITIAL_ROTATIONS = [
  { x: 1.35, y: 0.26, z: -2.48 },
  { x: 1.54, y: 1.14, z: -2.21 },
  { x: 1.33, y: 0.68, z: -0.79 },
  { x: 2.25, y: 0.13, z: -0.43 },
  { x: 2.13, y: 0.99, z: 2.47 },
  { x: 1.41, y: 0.74, z: 1.99 },
  { x: 0.99, y: 0.54, z: 2.84 },
  { x: 0.49, y: 0.36, z: 1.46 },
  { x: 0.59, y: 0.83, z: 1.13 },
];

// Scroll reaction (per frame, tuned by eye).
const POSITIONAL_VELOCITY_DAMPING = 0.91;
const SCROLL_POSITION_DAMPING = 0.96;

// Swipe-to-spin.
const DRAG_RADIANS_PER_PIXEL = 0.012;
const SPIN_DAMPING_PER_SECOND = 2.4;   // higher stops the flick sooner
const MAX_SPIN = 28;                   // rad/s
const MIN_FLICK_SPEED = 0.6;           // rad/s; slower releases just stop
const RELEASE_STILL_MS = 90;           // holding still this long before release cancels the flick
const TOUCH_INTENT_PX = 8;             // touch movement before deciding swipe vs page scroll
const TAP_MAX_PX = 6;
const TAP_MAX_MS = 300;
const TAP_SPIN = 9;
const TAP_HOP = 0.3;

const X_AXIS = new THREE.Vector3(1, 0, 0);
const Y_AXIS = new THREE.Vector3(0, 1, 0);

type DragState = {
  pointerId: number;
  pointerType: string;
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
  lastTime: number;
  startTime: number;
  // Touch only: undecided until the finger moves far enough to tell a sideways swipe from a page scroll.
  mode: 'pending' | 'spin' | 'scroll';
  hit: THREE.Vector3;
};

const applySmoothShading = (scene: THREE.Object3D | null) => {
  if (!scene) return;
  scene.traverse((object) => {
    if (!(object as THREE.Mesh).isMesh) return;
    const mesh = object as THREE.Mesh;
    if (mesh.material instanceof THREE.MeshStandardMaterial) {
      mesh.material.flatShading = false;
    }
    mesh.geometry.computeVertexNormals();
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    materials.forEach((material) => { material.needsUpdate = true; });
    mesh.castShadow = true;
  });
};

const setupCinematicLighting = (scene: THREE.Object3D | null) => {
  if (!scene) return;

  // Key light, upper front-left.
  const keyLight = new THREE.DirectionalLight(0xffffff, 0.1);
  keyLight.position.set(50, 100, 50);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 500;
  scene.add(keyLight);

  // Fill light, upper front-right.
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.2);
  fillLight.position.set(-50, 50, 50);
  scene.add(fillLight);

  // Rim light from behind for edge separation.
  const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
  rimLight.position.set(0, 100, -100);
  scene.add(rimLight);

  scene.add(new THREE.AmbientLight(0x404040, 0.1));

  const spotlight = new THREE.SpotLight(0xffffff, 0.2);
  spotlight.position.set(100, 200, 100);
  spotlight.castShadow = true;
  spotlight.shadow.mapSize.width = 1024;
  spotlight.shadow.mapSize.height = 1024;
  spotlight.shadow.camera.near = 0.5;
  spotlight.shadow.camera.far = 500;
  scene.add(spotlight);
};

const Model = ({ url, canvasRef }: { url: string, canvasRef: React.RefObject<HTMLCanvasElement | null> }) => {
  const modelRef = useRef<THREE.Group>(null);
  const scrollRef = useLocomotiveScroll();
  const { gl } = useThree();

  // Scroll reaction
  const lastScrollY = useRef<number | null>(null);
  const scrollDirection = useRef(0);
  const positionalVelocity = useRef(0.25);

  // Spin: angular velocity in rad/s around world axes.
  const spin = useRef(new THREE.Vector3());
  const hopVelocity = useRef(0);
  const drag = useRef<DragState | null>(null);
  const removeDragListeners = useRef<(() => void) | null>(null);
  const isSetup = useRef(false);

  const model = useLoader(GLTFLoader, url, (loader) => {
    loader.manager.onLoad = () => {
      canvasRef.current?.dispatchEvent(new Event("modelLoaded"));
    };
  });

  // Grab target: a sphere slightly smaller than the model's bounds, so the hole in the middle
  // of the roll and near misses still count as grabbing the tape. Measured before any
  // transforms are applied, so it is in the model's own space.
  const grabSphere = useMemo(() => {
    const sphere = new THREE.Box3().setFromObject(model.scene).getBoundingSphere(new THREE.Sphere());
    return { center: sphere.center.toArray() as [number, number, number], radius: sphere.radius * 0.85 };
  }, [model.scene]);

  const adjustModelScale = () => {
    const divisor = isMobile ? 450 : 800;
    const scaleFactor = Math.min(window.innerWidth / divisor, window.innerHeight / divisor, 0.8);
    modelRef.current?.scale.set(scaleFactor, scaleFactor, scaleFactor);
  };

  useEffect(() => {
    const object = modelRef.current;
    if (!object || isSetup.current) return;
    const rotation = INITIAL_ROTATIONS[Math.floor(Math.random() * INITIAL_ROTATIONS.length)];
    object.rotation.set(rotation.x, rotation.y, rotation.z);
    adjustModelScale();
    applySmoothShading(object.parent);
    setupCinematicLighting(object.parent);
    isSetup.current = true;
  });

  useEffect(() => {
    window.addEventListener('resize', adjustModelScale);
    return () => window.removeEventListener('resize', adjustModelScale);
  }, []);

  useLocomotiveScrollEvent(({ scroll }) => {
    const previous = lastScrollY.current;
    lastScrollY.current = scroll.y;
    if (previous === null || scroll.y === previous) {
      scrollDirection.current = 0;
      return;
    }
    scrollDirection.current = scroll.y > previous ? -1 : 1;
    positionalVelocity.current = Math.abs(scroll.y - previous) * 0.005;
  });

  // The page is smooth-scrolled by Locomotive (no native scrolling), so the canvas can take
  // every touch; vertical swipes off the tape still reach Locomotive. With native scrolling,
  // leave vertical panning to the browser so the hero never traps the page.
  useEffect(() => {
    const updateTouchAction = () => {
      const smooth = document.documentElement.classList.contains('has-scroll-smooth');
      gl.domElement.style.touchAction = smooth ? 'none' : 'pan-y';
    };
    updateTouchAction();
    window.addEventListener('locomotive-scroll-initialized', updateTouchAction);
    return () => window.removeEventListener('locomotive-scroll-initialized', updateTouchAction);
  }, [gl]);

  // `data-cursor` gives the canvas the custom hand cursor (src/cursor.ts); the CSS cursor
  // is the fallback when the custom one isn't running.
  const setCursor = (cursor: 'grab' | 'grabbing' | '') => {
    gl.domElement.style.cursor = cursor;
    if (cursor) gl.domElement.dataset.cursor = '';
    else delete gl.domElement.dataset.cursor;
  };

  const rotateBy = (dx: number, dy: number) => {
    const object = modelRef.current;
    if (!object) return;
    object.rotateOnWorldAxis(Y_AXIS, dx * DRAG_RADIANS_PER_PIXEL);
    object.rotateOnWorldAxis(X_AXIS, dy * DRAG_RADIANS_PER_PIXEL);
  };

  const beginSpin = () => {
    scrollRef?.current?.stop();
    setCursor('grabbing');
  };

  const endDrag = (event: PointerEvent) => {
    const state = drag.current;
    if (!state || event.pointerId !== state.pointerId) return;
    drag.current = null;
    removeDragListeners.current?.();

    if (state.mode === 'spin') {
      scrollRef?.current?.start();
      setCursor('grab');
      const heldStill = performance.now() - state.lastTime > RELEASE_STILL_MS;
      if (heldStill || spin.current.length() < MIN_FLICK_SPEED) spin.current.set(0, 0, 0);
      return;
    }

    // A quick tap with no real movement nudges the tape: it hops and spins away from the tap,
    // as if flicked at that spot.
    const moved = Math.hypot(event.clientX - state.startX, event.clientY - state.startY);
    if (event.type === 'pointerup' && moved < TAP_MAX_PX && performance.now() - state.startTime < TAP_MAX_MS) {
      const object = modelRef.current;
      if (!object) return;
      const center = object.getWorldPosition(new THREE.Vector3());
      const lever = state.hit.clone().sub(center);
      const torque = lever.cross(new THREE.Vector3(0, 0, -1)).normalize();
      if (torque.lengthSq() === 0) torque.copy(Y_AXIS);
      spin.current.addScaledVector(torque, TAP_SPIN).clampLength(0, MAX_SPIN);
      hopVelocity.current = TAP_HOP;
    }
  };

  const handlePointerMove = (event: PointerEvent) => {
    const state = drag.current;
    if (!state || event.pointerId !== state.pointerId) return;

    if (state.mode === 'pending') {
      const dx = event.clientX - state.startX;
      const dy = event.clientY - state.startY;
      if (Math.hypot(dx, dy) < TOUCH_INTENT_PX) return;
      // Mostly vertical on touch means the visitor is scrolling the page, not spinning the tape.
      state.mode = Math.abs(dx) >= Math.abs(dy) ? 'spin' : 'scroll';
      if (state.mode === 'scroll') return;
      beginSpin();
    }
    if (state.mode !== 'spin') return;

    const now = performance.now();
    const dx = event.clientX - state.lastX;
    const dy = event.clientY - state.lastY;
    const dt = Math.max((now - state.lastTime) / 1000, 1 / 240);
    rotateBy(dx, dy);

    // Smoothed angular velocity so a flick carries on after release.
    const instant = new THREE.Vector3(dy * DRAG_RADIANS_PER_PIXEL / dt, dx * DRAG_RADIANS_PER_PIXEL / dt, 0);
    spin.current.lerp(instant, 0.5).clampLength(0, MAX_SPIN);

    state.lastX = event.clientX;
    state.lastY = event.clientY;
    state.lastTime = now;
    event.preventDefault();
  };

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    if (drag.current || (event.pointerType === 'mouse' && event.button !== 0)) return;
    event.stopPropagation();

    const isTouch = event.pointerType !== 'mouse';
    const now = performance.now();
    drag.current = {
      pointerId: event.pointerId,
      pointerType: event.pointerType,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      lastTime: now,
      startTime: now,
      mode: isTouch ? 'pending' : 'spin',
      hit: event.point.clone(),
    };

    // Grabbing stops the current spin, like catching it.
    spin.current.set(0, 0, 0);
    if (!isTouch) {
      event.nativeEvent.preventDefault(); // no text selection while dragging
      beginSpin();
    }

    const move = handlePointerMove;
    const end = endDrag;
    window.addEventListener('pointermove', move, { passive: false });
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);
    removeDragListeners.current = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', end);
      window.removeEventListener('pointercancel', end);
      removeDragListeners.current = null;
    };
  };

  useEffect(() => () => {
    removeDragListeners.current?.();
    if (drag.current?.mode === 'spin') scrollRef?.current?.start();
  }, [scrollRef]);

  useFrame((_, delta) => {
    const object = modelRef.current;
    if (!object) return;
    const dt = Math.min(delta, 1 / 20);

    // Scroll: bob along y and roll a little with the scroll direction.
    const velocity = positionalVelocity.current;
    object.position.y += velocity * scrollDirection.current + hopVelocity.current;
    object.position.y *= SCROLL_POSITION_DAMPING;
    object.rotation.x += velocity * 0.5 * scrollDirection.current;
    positionalVelocity.current = velocity * POSITIONAL_VELOCITY_DAMPING;
    hopVelocity.current *= 0.8;

    // Free spin after a flick or tap; while dragging, the pointer drives rotation directly.
    if (drag.current?.mode !== 'spin') {
      const speed = spin.current.length();
      if (speed > 1e-3) {
        object.rotateOnWorldAxis(spin.current.clone().normalize(), speed * dt);
        spin.current.multiplyScalar(Math.exp(-SPIN_DAMPING_PER_SECOND * dt));
      }
    }
  });

  return (
    <primitive
      object={model.scene}
      ref={modelRef}
      onPointerDown={handlePointerDown}
      onPointerOver={() => { if (!drag.current) setCursor('grab'); }}
      onPointerOut={() => { if (!drag.current) setCursor(''); }}
    >
      <mesh position={grabSphere.center}>
        <sphereGeometry args={[grabSphere.radius, 16, 12]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </primitive>
  );
};

const ThreeScene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div data-scroll data-scroll-speed="0.2" data-scroll-position="top">
      <Canvas ref={canvasRef} style={{ height: "100dvh", width: "100vw", maxWidth: "100%" }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        <Model url="/pt-roll/painter_stape.gltf" canvasRef={canvasRef} />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
