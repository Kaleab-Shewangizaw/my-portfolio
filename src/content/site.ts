// Single source of truth for everything the site says.
// Edit copy here; no component needs to change.

export const site = {
  name: "Kaleab Shewangizaw",
  alias: "Kal_X",
  url: "https://kal-x.vercel.app",
  role: "Product Engineer",
  location: "Addis Ababa",
  timezone: "Africa/Addis_Ababa",
  email: "kaleab.stk@gmail.com",
  cv: "/kaleab-shewangizaw-cv.pdf",
  available: true,
  availability: "Open to new roles & select projects",
  headline: {
    lead: "I design and build",
    emphasis: "software that feels",
    tail: "inevitable.",
  },
  intro:
    "Full-stack engineer working across product, interface and infrastructure. I take ideas from a blank file to a product people rely on — and sweat the details nobody asks for.",
  socials: [
    { label: "GitHub", href: "https://github.com/Kaleab-Shewangizaw", handle: "Kaleab-Shewangizaw" },
    { label: "LinkedIn", href: "https://linkedin.com/in/kal-x", handle: "in/kal-x" },
    { label: "X", href: "https://x.com/Kal_abX", handle: "@Kal_abX" },
    { label: "Telegram", href: "https://t.me/kal_abX", handle: "@kal_abX" },
  ],
} as const;

export type Project = {
  slug: string;
  name: string;
  year: string;
  kind: "Product" | "Tool" | "Open source";
  role: string;
  summary: string;
  tagline: string;
  hue: number; // drives the generated cover art
  stack: string[];
  links: { live?: string; code?: string };
  story: { heading: string; body: string }[];
};

export const projects: Project[] = [
  {
    slug: "pazimo",
    name: "Pazimo",
    year: "2025",
    kind: "Product",
    role: "Technical lead · Full stack",
    tagline: "Event ticketing, rebuilt for a local market.",
    summary:
      "A ticketing platform for discovering, managing and booking events in Ethiopia — web, attendee mobile app and an organizer app on one backend.",
    hue: 262,
    stack: ["Next.js", "TypeScript", "Node.js", "React Native", "MongoDB"],
    links: { live: "https://pazimo.com", code: "https://github.com/Kaleab-Shewangizaw/pazimo" },
    story: [
      {
        heading: "The problem",
        body: "Global ticketing tools assume card payments and English-first audiences. Local organizers needed checkout that works with the payment rails people actually use, and tooling simple enough to run an event from a phone.",
      },
      {
        heading: "What I built",
        body: "A three-surface system: a public web app for discovery and checkout, an attendee mobile app with offline-friendly tickets, and an organizer app for scanning and live sales. All three share one typed API.",
      },
      {
        heading: "Under the hood",
        body: "Local payment providers are integrated behind a single payment interface so new providers are a configuration change, not a rewrite. Ticket issuance is idempotent, so retries from flaky networks never double-charge.",
      },
    ],
  },
  {
    slug: "creator-workspace",
    name: "Creator Workspace",
    year: "2026",
    kind: "Open source",
    role: "Solo · Design & engineering",
    tagline: "A local-first writing studio for video scripts.",
    summary:
      "A writing studio for YouTube scripts with a pipeline board, inline delivery cues and in-browser voice-over generation. Your machine, your data, your repo.",
    hue: 168,
    stack: ["JavaScript", "Local-first", "Web Audio", "IndexedDB"],
    links: { code: "https://github.com/Kaleab-Shewangizaw/creator-workspace" },
    story: [
      {
        heading: "The problem",
        body: "Script writing lives in scattered docs, the pipeline lives in a separate board, and the creator's data lives on someone else's server.",
      },
      {
        heading: "What I built",
        body: "One workspace where a script moves from idea to recorded. Delivery cues sit inline with the text, and a voice-over preview is generated right in the browser so pacing can be heard before recording.",
      },
      {
        heading: "Under the hood",
        body: "Local-first by design: everything persists on-device and syncs to a git repo the creator owns. There's no account, no server and nothing to lose.",
      },
    ],
  },
  {
    slug: "yoinker",
    name: "Yoinker",
    year: "2025",
    kind: "Tool",
    role: "Solo · Design & engineering",
    tagline: "Capture a job posting in one click.",
    summary:
      "A Chrome extension and AI dashboard for job hunters. Save postings in one click and track applications, notes, salaries and interviews privately.",
    hue: 28,
    stack: ["TypeScript", "Chrome Extensions", "React", "LLM APIs"],
    links: { code: "https://github.com/Kaleab-Shewangizaw/Yoinker" },
    story: [
      {
        heading: "The problem",
        body: "Job hunting means dozens of tabs, a spreadsheet that's always out of date, and details lost between the posting and the interview.",
      },
      {
        heading: "What I built",
        body: "An extension that captures any posting in a click and a dashboard that structures it: role, salary, stage and notes, with AI-assisted extraction so nothing is typed twice.",
      },
      {
        heading: "Under the hood",
        body: "Extraction runs on the page's content and is normalized into one schema regardless of the job board, so tracking stays consistent everywhere.",
      },
    ],
  },
  {
    slug: "curon",
    name: "Curon",
    year: "2025",
    kind: "Product",
    role: "Solo · Design & engineering",
    tagline: "A second brain that acts, not just stores.",
    summary:
      "A personal assistant that helps you capture, organize and act on your thoughts, tasks and ideas.",
    hue: 210,
    stack: ["TypeScript", "Next.js", "LLM APIs", "PostgreSQL"],
    links: { code: "https://github.com/Kaleab-Shewangizaw/Curon" },
    story: [
      {
        heading: "The problem",
        body: "Notes apps are great at storing thoughts and bad at turning them into action. Ideas pile up and nothing moves.",
      },
      {
        heading: "What I built",
        body: "Fast capture that triages itself: an entry becomes a task, an idea or a reference, and Curon surfaces what needs attention next.",
      },
      {
        heading: "Under the hood",
        body: "A structured data model sits under a conversational surface, so the assistant's suggestions are always backed by real records you can edit.",
      },
    ],
  },
  {
    slug: "oweme",
    name: "OweMe",
    year: "2025",
    kind: "Product",
    role: "Solo · Design & engineering",
    tagline: "Clarity for money between people.",
    summary:
      "A simple, modern tracker for money you owe, lend and repay, built to make informal debts unambiguous.",
    hue: 140,
    stack: ["TypeScript", "Telegram Mini Apps", "Node.js"],
    links: { live: "https://t.me/kal_abX/591", code: "https://github.com/Kaleab-Shewangizaw/OweMe" },
    story: [
      {
        heading: "The problem",
        body: "Informal lending runs on memory and goodwill, and both fail eventually.",
      },
      {
        heading: "What I built",
        body: "A focused tracker that lives where people already talk, with balances per person, repayment history and gentle reminders.",
      },
      {
        heading: "Under the hood",
        body: "A ledger model where entries are append-only, so balances can always be explained and history is never rewritten.",
      },
    ],
  },
];

export const principles = [
  {
    title: "Ship the whole thing",
    body: "Interface, API, data and deploy. I own a feature end to end and care how it behaves in production.",
  },
  {
    title: "Taste is a feature",
    body: "Craft compounds. Motion, copy, empty states and error paths are where products earn trust.",
  },
  {
    title: "Boring where it counts",
    body: "Proven tools for the foundation and a strong typed core, so the parts that should be new can be.",
  },
  {
    title: "Write it down",
    body: "Clear PRs, decisions on paper and code the next person can read. Speed comes from shared context.",
  },
];

export const toolkit = [
  { group: "Interface", items: ["TypeScript", "React", "Next.js", "React Native", "Tailwind", "Framer Motion"] },
  { group: "Systems", items: ["Node.js", "PostgreSQL", "MongoDB", "REST & tRPC", "Redis", "Docker"] },
  { group: "Craft", items: ["Figma", "Design systems", "Accessibility", "Performance", "Testing"] },
  { group: "Curious about", items: ["Rust", "C++", "Local-first", "LLM tooling"] },
];

export const timeline = [
  { period: "2025 — Now", title: "CTO", org: "Pazimo", note: "Leading product engineering across web and mobile." },
  { period: "2024 — 2025", title: "Full-stack Developer", org: "Prime Software", note: "Shipped client products end to end." },
  { period: "2023 — 2024", title: "Bootcamp Instructor", org: "GDG · AAU", note: "Taught modern web development to new engineers." },
  { period: "2022 — Now", title: "BSc Computer Science & Engineering", org: "Addis Ababa University", note: "Addis Ababa Institute of Technology (AAiT)." },
];
