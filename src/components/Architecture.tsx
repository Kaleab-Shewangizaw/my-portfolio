"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { unlock } from "@/lib/secrets";

type Node = { id: string; label: string; sub: string; x: number; y: number; w: number; detail: string };

const H = 54;

const nodes: Node[] = [
  { id: "web", label: "Web app", sub: "Next.js", x: 110, y: 50, w: 170, detail: "Public site, customer accounts, and the organizer and admin dashboards. Zustand, Socket.IO client, Tailwind." },
  { id: "attendee", label: "Attendee app", sub: "React Native", x: 320, y: 50, w: 170, detail: "Discovery, checkout, a QR ticket wallet, cinema bookings, RSVPs and chat. Expo SDK 57 and TanStack Query." },
  { id: "organizer", label: "Organizer app", sub: "React Native", x: 530, y: 50, w: 170, detail: "Organizer, usher and cashier roles, each behind route guards. Includes a camera QR scanner. Zustand and Zod." },
  { id: "api", label: "REST API", sub: "Node · Express", x: 320, y: 200, w: 230, detail: "One API serves every client. Controllers, services and middleware, with JWT auth, rate limiting and Helmet." },
  { id: "db", label: "MongoDB", sub: "Mongoose", x: 85, y: 350, w: 140, detail: "Events, tickets, orders and users, with compound indexes for the queries that matter." },
  { id: "pay", label: "Payments", sub: "Chapa · Santim", x: 245, y: 350, w: 140, detail: "Local payment gateways behind one interface. Callbacks are idempotent, so retries never double-charge." },
  { id: "rt", label: "Real-time", sub: "Socket.IO", x: 405, y: 350, w: 140, detail: "Live sales and check-in updates pushed to dashboards as they happen." },
  { id: "comms", label: "Media & comms", sub: "Cloudinary · SMS", x: 565, y: 350, w: 140, detail: "Image uploads to Cloudinary, email over SMTP and SMS through GeezSMS." },
];

const edges: [string, string][] = [
  ["web", "api"],
  ["attendee", "api"],
  ["organizer", "api"],
  ["api", "db"],
  ["api", "pay"],
  ["api", "rt"],
  ["api", "comms"],
];

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

function edgePath(a: Node, b: Node) {
  const x1 = a.x;
  const y1 = a.y + H / 2;
  const x2 = b.x;
  const y2 = b.y - H / 2;
  const my = (y1 + y2) / 2;
  return `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`;
}

export function Architecture({ focus }: { focus?: string }) {
  const [hover, setHoverState] = useState<string | null>(null);
  const explored = useRef(new Set<string>());
  const setHover = (id: string | null) => {
    setHoverState(id);
    if (!id) return;
    explored.current.add(id);
    if (explored.current.size === nodes.length) unlock("architect");
  };
  const active = hover ?? focus ?? null;
  const lit = (id: string) => !active || active === id || edges.some(([a, b]) => (a === active && b === id) || (b === active && a === id));
  const edgeLit = (a: string, b: string) => !active || a === active || b === active;
  const shown = active ? byId[active] : null;

  return (
    <div>
      <svg viewBox="0 0 640 400" className="w-full select-none" role="img" aria-label="Pazimo architecture: three clients share one REST API, which talks to MongoDB, payment gateways, real-time sockets and media and messaging services.">
        {edges.map(([a, b], i) => {
          const d = edgePath(byId[a], byId[b]);
          const on = edgeLit(a, b);
          return (
            <g key={a + b} style={{ opacity: on ? 1 : 0.15, transition: "opacity .3s" }}>
              <path id={`e-${a}-${b}`} d={d} fill="none" stroke="var(--line)" strokeWidth={1.5} />
              <path d={d} fill="none" stroke={active && on ? "var(--accent)" : "var(--faint)"} strokeWidth={1.5} className="flow" />
              <circle r={3.5} fill="var(--accent)">
                <animateMotion dur={`${2.2 + (i % 3) * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.3}s`}>
                  <mpath href={`#e-${a}-${b}`} />
                </animateMotion>
              </circle>
            </g>
          );
        })}
        {nodes.map((n) => {
          const isActive = active === n.id;
          return (
            <g
              key={n.id}
              tabIndex={0}
              role="button"
              aria-label={`${n.label}: ${n.detail}`}
              onMouseEnter={() => setHover(n.id)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(n.id)}
              onBlur={() => setHover(null)}
              className="cursor-pointer outline-none"
              style={{ opacity: lit(n.id) ? 1 : 0.35, transition: "opacity .3s" }}
            >
              <rect
                x={n.x - n.w / 2}
                y={n.y - H / 2}
                width={n.w}
                height={H}
                rx={12}
                fill={isActive ? "var(--accent)" : "var(--surface-2)"}
                stroke={isActive ? "var(--accent)" : "var(--line)"}
                style={{ transition: "fill .25s" }}
              />
              <text x={n.x} y={n.y - 3} textAnchor="middle" fontSize={16} fontWeight={600} fill={isActive ? "#000" : "var(--fg)"}>
                {n.label}
              </text>
              <text x={n.x} y={n.y + 16} textAnchor="middle" fontSize={12} className="mono" fill={isActive ? "#000" : "var(--muted)"}>
                {n.sub}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-3 min-h-[3.5rem] border-t border-[var(--line)] pt-3">
        <AnimatePresence mode="wait">
          <motion.p
            key={shown?.id ?? "none"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="text-sm leading-relaxed text-[var(--muted)]"
          >
            {shown ? (
              <>
                <span className="font-medium text-[var(--fg)]">{shown.label}. </span>
                {shown.detail}
              </>
            ) : (
              "Hover or tap a box to see what it does. The dots are requests moving through the system."
            )}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
