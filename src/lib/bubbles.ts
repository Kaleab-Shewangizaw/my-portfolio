"use client";

import { useSyncExternalStore } from "react";
import { unlock } from "./secrets";

/**
 * The shared bubble world. <Bubbles> runs the physics and draws it; the
 * bubble gun adds to it; a flying logo reports where it is so it can burst
 * whatever it hits.
 */

export type Bubble = {
  id: number;
  x: number; // centre, viewport px
  y: number;
  vx: number;
  vy: number;
  r: number;
  maxR: number; // how big it may grow while being blown
  held: boolean; // dragged or being blown: moves with the pointer
  growing: boolean;
  sq: number; // squash, for the jelly wobble after a hit
  sqV: number;
  sqA: number; // squash direction (radians)
  phase: number; // offsets the idle wobble and the film's colours
  dies: number; // performance.now() it pops by itself; Infinity for never
  ambient?: boolean; // the one that drifts in by itself
};

export type Pop = { id: number; x: number; y: number; r: number; by: PopCause };
export type PopCause = "user" | "logo" | "age" | "crowd";
/** The flying logo, as a circle. */
export type Probe = { x: number; y: number; r: number };

let nextId = 1;
let version = 0;
const subs = new Set<() => void>();

export const world = {
  bubbles: [] as Bubble[],
  pops: [] as Pop[],
  logo: null as Probe | null,
  /** Set by the flying logo so it can react when it bursts one. */
  onLogoHit: null as ((b: Bubble) => void) | null,
  gun: false,
};

function emit() {
  version++;
  subs.forEach((f) => f());
}

/** Re-renders when bubbles are added or popped, or the gun is toggled. Positions are written straight to the DOM. */
export function useBubbleWorld() {
  return useSyncExternalStore(
    (f) => {
      subs.add(f);
      return () => subs.delete(f);
    },
    () => version,
    () => 0,
  );
}

export function maxBubbles() {
  return typeof window !== "undefined" && window.innerWidth < 640 ? 10 : 18;
}

export function spawn(b: Pick<Bubble, "x" | "y" | "r"> & Partial<Bubble>): Bubble {
  const bubble: Bubble = {
    id: nextId++,
    vx: 0,
    vy: 0,
    maxR: b.r,
    held: false,
    growing: false,
    sq: 0,
    sqV: 0,
    sqA: 0,
    phase: Math.random() * Math.PI * 2,
    dies: Infinity,
    ...b,
  };
  world.bubbles.push(bubble);
  // Too crowded: the oldest one that nobody is holding gives way.
  if (world.bubbles.length > maxBubbles()) {
    const old = world.bubbles.find((x) => !x.held && x.id !== bubble.id);
    if (old) pop(old, "crowd", false);
  }
  emit();
  return bubble;
}

export function pop(b: Bubble, by: PopCause, notify = true) {
  const i = world.bubbles.indexOf(b);
  if (i === -1) return;
  world.bubbles.splice(i, 1);
  const p = { id: b.id, x: b.x, y: b.y, r: b.r, by };
  world.pops.push(p);
  if (by === "user" || by === "logo") {
    unlock("bubble");
    // Popped the drifting one on purpose: don't bring it back this session.
    if (b.ambient) {
      try {
        sessionStorage.setItem("kalx:popped", "1");
      } catch {}
    }
  }
  if (by === "logo") world.onLogoHit?.(b);
  setTimeout(() => {
    world.pops = world.pops.filter((x) => x !== p);
    emit();
  }, 700);
  if (notify) emit();
}

export function setGun(on: boolean) {
  if (world.gun === on) return;
  world.gun = on;
  emit();
}

/** Tells the rest of the app something changed (e.g. a bubble finished growing). */
export function touch() {
  emit();
}
