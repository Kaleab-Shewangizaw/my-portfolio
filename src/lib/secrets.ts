"use client";

import { useEffect, useState } from "react";

export const SECRETS = [
  { id: "help", title: "Curious", hint: "Ask the terminal for help." },
  { id: "neofetch", title: "Ricer", hint: "Every Linux user's favourite flex." },
  { id: "sudo", title: "Root access", hint: "Try to get superuser powers." },
  { id: "logo", title: "Dizzy", hint: "The logo doesn't like being clicked. Five times." },
  { id: "konami", title: "Old school", hint: "↑ ↑ ↓ ↓ ← → ← → B A" },
  { id: "bubble", title: "Pop!", hint: "That floating bubble looks fragile." },
  { id: "palette", title: "Power user", hint: "Every good tool has a ⌘K." },
  { id: "theme", title: "Lights", hint: "Flip the lights." },
  { id: "explorer", title: "Explorer", hint: "Visit every page." },
  { id: "reader", title: "Bookworm", hint: "Read the About page all the way to the end." },
  { id: "regular", title: "Regular", hint: "Come back a third time." },
  { id: "lost", title: "Lost", hint: "Get lost. Literally." },
  { id: "architect", title: "Architect", hint: "Inspect every box in the Pazimo diagram." },
  { id: "rust", title: "Rustacean", hint: "Build and run something in the terminal, the Rust way." },
  { id: "console", title: "Inspector", hint: "Developers always check the console first." },
] as const;

export const CLAIM_KEY = "kalx:claimed";

export function readFound(): SecretId[] {
  return read();
}

export type SecretId = (typeof SECRETS)[number]["id"];

const KEY = "kalx:secrets";
const EVENT = "kalx:secret";

function read(): SecretId[] {
  try {
    // Drop ids of secrets that have since been retired.
    const ids: string[] = JSON.parse(localStorage.getItem(KEY) || "[]");
    return ids.filter((id): id is SecretId => SECRETS.some((s) => s.id === id));
  } catch {
    return [];
  }
}

export function unlock(id: SecretId) {
  const found = read();
  if (found.includes(id)) return;
  const next = [...found, id];
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { id, count: next.length } }));
}

export function onSecret(fn: (id: SecretId, count: number) => void) {
  const h = (e: Event) => {
    const { id, count } = (e as CustomEvent).detail;
    fn(id, count);
  };
  window.addEventListener(EVENT, h);
  return () => window.removeEventListener(EVENT, h);
}

export function useSecrets() {
  const [found, setFound] = useState<SecretId[]>([]);
  useEffect(() => {
    setFound(read());
    return onSecret(() => setFound(read()));
  }, []);
  return found;
}

/** Visit counter, bumped once per browser session. */
export function visitCount(): number {
  try {
    let n = Number(localStorage.getItem("kalx:visits") || 0);
    if (!sessionStorage.getItem("kalx:counted")) {
      n += 1;
      localStorage.setItem("kalx:visits", String(n));
      sessionStorage.setItem("kalx:counted", "1");
    }
    return n;
  } catch {
    return 1;
  }
}
