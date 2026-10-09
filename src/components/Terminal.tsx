"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { now, projects, site, stack } from "@/content/site";
import { SECRETS, unlock, visitCount } from "@/lib/secrets";
import { LiquidGlass } from "./LiquidGlass";

type Line = { kind: "in" | "out" | "accent" | "muted"; text: string };

const PROMPT = "kaleab@addis ~ %";

const NEOFETCH_ART = [
  "      ▄▄▄▄      ",
  "    ▄█▀  ▀▀▄    ",
  "   ██      ▀█   ",
  "   █▌       █   ",
  "   ▀█▄    ▄█▀   ",
  "     ▀▀██▀▀     ",
];

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return "Up late? Same here.";
  if (h < 12) return "Good morning.";
  if (h < 18) return "Good afternoon.";
  return "Good evening.";
}

export function Terminal() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [booted, setBooted] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const body = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);

  // Boot sequence, typed out line by line.
  useEffect(() => {
    const visits = visitCount();
    if (visits >= 3) unlock("regular");

    const script: Line[] = [
      { kind: "muted", text: visits > 1 ? `Welcome back. This is visit #${visits}.` : `Last login: ${new Date().toDateString()} on ttys001` },
      { kind: "in", text: "whoami" },
      { kind: "out", text: `${site.name}. ${site.role} in ${site.city}.` },
      { kind: "in", text: "cat now.txt" },
      ...now.map((n) => ({ kind: "out" as const, text: `→ ${n}` })),
      { kind: "accent", text: `${greeting()} Type 'help' to look around. Not every command is listed.` },
    ];
    let i = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = () => {
      setLines(script.slice(0, ++i));
      if (i < script.length) timer = window.setTimeout(tick, reduce ? 0 : script[i].kind === "in" ? 520 : 160);
      else setBooted(true);
    };
    let timer = window.setTimeout(tick, reduce ? 0 : 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Scroll the terminal itself, never the page.
    if (body.current) body.current.scrollTop = body.current.scrollHeight;
  }, [lines]);

  const out = (...texts: (string | Line)[]) =>
    texts.map((t) => (typeof t === "string" ? ({ kind: "out", text: t } as Line) : t));

  function run(raw: string): Line[] | "clear" {
    const cmd = raw.trim();
    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(" ");
    switch (name?.toLowerCase()) {
      case "":
        return [];
      case "help":
        unlock("help");
        return out(
          "Available commands:",
          "  about        who I am, in one paragraph",
          "  projects     things I've built",
          "  open <name>  open a project, e.g. open pazimo",
          "  stack        tools I use every day",
          "  contact      ways to reach me",
          "  email        copy my email address",
          "  cv           download my résumé",
          "  theme        switch light / dark",
          "  secrets      how many have you found?",
          "  clear        clean the screen",
          { kind: "muted", text: "There are a few more. Old habits." },
        );
      case "about":
      case "whoami":
        return out(site.intro);
      case "projects":
      case "ls":
        if (name === "ls" && arg) return out(`ls: ${arg}: Permission denied (nice try)`);
        return name === "ls"
          ? out("projects/  now.txt  secrets.txt  resume.pdf")
          : out(...projects.map((p) => `  ${p.slug.padEnd(20)} ${p.kind}`), { kind: "muted", text: "Use 'open <name>' to read more." });
      case "open": {
        const p = projects.find((x) => x.slug === arg.toLowerCase() || x.name.toLowerCase() === arg.toLowerCase());
        if (!p) return out(`open: no project called '${arg}'. Try 'projects'.`);
        setTimeout(() => router.push(`/work/${p.slug}`), 400);
        return out(`Opening ${p.name}…`);
      }
      case "stack":
        return out(...stack.map((s) => `  ${s.group.padEnd(11)} ${s.items.join(", ")}`));
      case "contact":
        return out(`  email     ${site.email}`, ...site.socials.map((s) => `  ${s.label.toLowerCase().padEnd(9)} ${s.href}`));
      case "email":
        navigator.clipboard?.writeText(site.email);
        return out(`Copied ${site.email} to your clipboard.`);
      case "cv":
      case "resume":
        window.open(site.cv, "_blank", "noopener");
        return out("Opening résumé…");
      case "theme":
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
        unlock("theme");
        return out(`Switched to ${resolvedTheme === "dark" ? "light" : "dark"} mode.`);
      case "cat":
        if (arg === "now.txt") return out(...now.map((n) => `→ ${n}`));
        if (arg === "secrets.txt") return out("Nice try. Secrets are found, not read.", { kind: "muted", text: "Type 'secrets' for hints." });
        if (arg === "resume.pdf") return out("%PDF-1.7 ����  …binary. Try 'cv' instead.");
        return out(`cat: ${arg || "?"}: No such file`);
      case "secrets": {
        const found: string[] = JSON.parse(localStorage.getItem("kalx:secrets") || "[]");
        return out(
          `Found ${found.length} of ${SECRETS.length}:`,
          ...SECRETS.map((s) => (found.includes(s.id) ? `  ✓ ${s.title}` : `  · ${s.hint}`)),
          ...(found.length >= SECRETS.length ? [{ kind: "accent" as const, text: "All found. Open ⌘K and claim your reward." }] : []),
        );
      }
      case "neofetch": {
        unlock("neofetch");
        const years = new Date().getFullYear() - site.startedCoding;
        const info = [
          `kaleab@addis`,
          `────────────`,
          `Role:     ${site.role}`,
          `Location: ${site.city}`,
          `Uptime:   ${years} years writing code`,
          `Shell:    zsh + way too many aliases`,
          `Learning: Rust (writing my own NGINX)`,
          `Editor:   VS Code (vim keys)`,
          `Stack:    TypeScript, React, Node, Expo`,
        ];
        return NEOFETCH_ART.concat(Array(Math.max(0, info.length - NEOFETCH_ART.length)).fill(" ".repeat(16))).map(
          (a, i) => ({ kind: i < 2 ? "accent" : "out", text: `${a}  ${info[i] ?? ""}` }) as Line,
        );
      }
      case "sudo":
        unlock("sudo");
        if (/sandwich/.test(arg)) return out({ kind: "accent", text: "Okay." });
        return out("kaleab is not in the sudoers file. This incident will be reported.", { kind: "muted", text: "(Even root can't do everything. It can make a sandwich, though.)" });
      case "cargo":
        if (!/^(run|build)/.test(arg)) return out("Usage: cargo run");
        unlock("rust");
        return out(
          { kind: "muted", text: "   Compiling kalx-proxy v0.1.0 (~/code/kalx-proxy)" },
          { kind: "muted", text: "    Finished `dev` profile [unoptimized + debuginfo] in 2.41s" },
          { kind: "muted", text: "     Running `target/debug/kalx-proxy`" },
          "[config] loaded proxy.conf: 3 backends, max 1024 connections",
          "[registry] backends: 10.0.0.2:3000 ✓  10.0.0.3:3000 ✓  10.0.0.4:3000 ✗",
          { kind: "accent", text: "[proxy] listening on 0.0.0.0:8080 (round-robin over 2 healthy backends)" },
        );
      case "rm":
        return out("Not today. This site has no undo button.");
      case "date":
        return out(new Date().toString());
      case "echo":
        return out(arg);
      case "history":
        return out(...history.map((h, i) => `  ${String(i + 1).padStart(3)}  ${h}`));
      case "coffee":
        return out("☕ Brewing… done. That's coffee #4 today.");
      case "exit":
        return out("There's no leaving. Try 'contact' instead.");
      case "vim":
        return out("You are now stuck in vim. Just kidding. Type ':q' to feel better.");
      case ":q":
      case ":wq":
        return out("Freedom.");
      case "git":
        return arg.startsWith("log")
          ? out("* feat: rebuild portfolio (again)", "* fix: it works on my machine", "* chore: more coffee")
          : out("On branch main. Nothing to commit, working tree clean.");
      case "clear":
        return "clear";
      default:
        return out(`zsh: command not found: ${name}. Type 'help'.`);
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const result = run(input);
    if (input.trim()) setHistory((h) => [...h, input.trim()]);
    setCursor(-1);
    if (result === "clear") setLines([]);
    else setLines((l) => [...l, { kind: "in", text: input }, ...result]);
    setInput("");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const c = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(c);
      setInput(history[c]);
    } else if (e.key === "ArrowDown" && cursor !== -1) {
      e.preventDefault();
      const c = cursor + 1;
      if (c >= history.length) {
        setCursor(-1);
        setInput("");
      } else {
        setCursor(c);
        setInput(history[c]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const all = ["help", "about", "projects", "open ", "stack", "contact", "email", "cv", "theme", "secrets", "clear", "neofetch", "cargo run"];
      const match = all.find((c) => c.startsWith(input));
      if (match && input) setInput(match);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  }

  const color: Record<Line["kind"], string> = {
    in: "text-[var(--fg)]",
    out: "text-[var(--muted)]",
    accent: "text-[var(--accent-text)]",
    muted: "text-[var(--faint)]",
  };

  return (
    <LiquidGlass radius={18} bezel={16} depth={30} frost={10} className="overflow-hidden" onClick={() => field.current?.focus()}>
      <div className="flex items-center gap-2 border-b border-[var(--line)] px-4 py-3">
        <span className="size-3 rounded-full bg-[var(--accent)]" />
        <span className="size-3 rounded-full bg-[var(--faint)]" />
        <span className="size-3 rounded-full bg-[var(--surface-2)]" />
        <span className="label ml-2 truncate">kaleab@addis — zsh — 80×24</span>
      </div>
      <div ref={body} className="mono h-[340px] overflow-y-auto px-4 py-3 text-[13px] leading-[1.65] sm:h-[380px]">
        {lines.map((l, i) => (
          <div key={i} className={"whitespace-pre-wrap break-words " + color[l.kind]}>
            {l.kind === "in" && <span className="text-[var(--accent-text)]">{PROMPT} </span>}
            {l.text}
          </div>
        ))}
        {booted && (
          <form onSubmit={submit} className="flex items-center">
            <label htmlFor="term" className="shrink-0 text-[var(--accent-text)]">
              {PROMPT}&nbsp;
            </label>
            <span className="relative min-w-0 flex-1">
              <input
                id="term"
                ref={field}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Terminal input. Type help for commands."
                className="w-full bg-transparent text-[var(--fg)] caret-transparent outline-none focus-visible:outline-none"
              />
              <span aria-hidden className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 whitespace-pre">
                <span className="invisible">{input}</span>
                <span className="caret" />
              </span>
            </span>
          </form>
        )}
      </div>
    </LiquidGlass>
  );
}
