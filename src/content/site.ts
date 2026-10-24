// Single source of truth for everything the site says.
// Edit copy here; no component needs to change.

export const site = {
  name: "Kaleab Shewangizaw",
  first: "Kaleab",
  alias: "Kal_X",
  url: "https://kal-x.vercel.app",
  role: "Software Engineer",
  location: "Addis Ababa, Ethiopia",
  city: "Addis Ababa",
  timezone: "Africa/Addis_Ababa",
  email: "kaleab.stk@gmail.com",
  github: "Kaleab-Shewangizaw",
  cv: "/kaleab-shewangizaw-cv.pdf",
  startedCoding: 2022,
  current: "CTO at Pazimo",
  intro: "I make websites and phone apps. I'm the CTO of Pazimo, an event ticketing startup in Addis Ababa.",
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
  platform: "web" | "mobile" | "tool";
  kind: string;
  role: string;
  summary: string;
  stack: string[];
  links: { live?: string; liveLabel?: string; code?: string };
  highlights: string[];
  story: { heading: string; body: string }[];
  featured?: boolean;
};

/** Just enough of a project to link to it (terminal, command palette). */
export type ProjectLink = Pick<Project, "slug" | "name" | "kind">;

// Built-in projects. The admin (/admin/projects) can add more, edit these,
// hide them or reorder them; see lib/projects.ts.
export const projects: Project[] = [
  {
    slug: "pazimo",
    name: "Pazimo",
    year: "2025",
    platform: "web",
    kind: "Website",
    role: "CTO",
    featured: true,
    summary: "A website for buying event tickets and sending invitations in Ethiopia.",
    stack: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
    links: { live: "https://pazimo.com", code: "https://github.com/Kaleab-Shewangizaw/pazimo" },
    highlights: [
      "Buy tickets with local payment methods",
      "Get a QR ticket that's scanned at the door",
      "Organizers see their sales live",
    ],
    story: [
      {
        heading: "The problem",
        body: "Most ticketing sites don't accept the payment methods people in Ethiopia use.",
      },
      {
        heading: "What I did",
        body: "I lead the team that built Pazimo, and I keep the website and its servers running.",
      },
    ],
  },
  {
    slug: "pazimo-mobile",
    name: "Pazimo Mobile",
    year: "2026",
    platform: "mobile",
    kind: "Phone app",
    role: "Lead developer",
    featured: true,
    summary: "Find events, buy tickets and keep them on your phone.",
    stack: ["React Native", "Expo", "TypeScript"],
    links: { code: "https://github.com/Kaleab-Shewangizaw/pazimo-mobile" },
    highlights: [
      "Find events and buy tickets",
      "Book cinema seats and order snacks",
      "Keep every ticket in one place",
    ],
    story: [
      {
        heading: "The problem",
        body: "The old app was slow to change, so new features took a long time to reach users.",
      },
      {
        heading: "What I did",
        body: "I rebuilt it from scratch so the same team can update the website and the app together.",
      },
    ],
  },
  {
    slug: "pazimo-organizer",
    name: "Pazimo Organizer",
    year: "2026",
    platform: "mobile",
    kind: "Phone app",
    role: "Built it alone",
    featured: true,
    summary: "The app event staff use to scan tickets and track sales.",
    stack: ["React Native", "Expo", "TypeScript"],
    links: { code: "https://github.com/Kaleab-Shewangizaw/pazimo-organizer-mobile" },
    highlights: [
      "Scan tickets at the door with the phone camera",
      "See ticket sales for each event",
      "Each staff member only sees what they need",
    ],
    story: [
      {
        heading: "The problem",
        body: "Organizers, door staff and cashiers each need different tools, and the wrong access costs money.",
      },
      {
        heading: "What I did",
        body: "I built one app that shows each person the right screens after they sign in.",
      },
    ],
  },
  {
    slug: "chop",
    name: "Chop",
    year: "2026",
    platform: "tool",
    kind: "AI writing tool",
    role: "Built it alone",
    summary: "Turns one idea into ready-to-post content for every social app.",
    stack: ["Next.js", "TypeScript", "AI"],
    links: { live: "https://chop-content.vercel.app", code: "https://github.com/Kaleab-Shewangizaw/chop" },
    highlights: [
      "Works with text, PDFs, Word files and screenshots",
      "Writes a post for each platform at once",
      "Keeps a history of everything you made",
    ],
    story: [
      {
        heading: "Why I built it",
        body: "Rewriting the same idea for every social platform by hand takes too long.",
      },
      {
        heading: "How it works",
        body: "You drop something in, and AI writes a version that fits each platform.",
      },
    ],
  },
  {
    slug: "rust-proxy",
    name: "My own web server",
    year: "2026",
    platform: "tool",
    kind: "Learning project · in progress",
    role: "Built it alone",
    summary: "I'm learning the Rust language by building a web server from scratch.",
    stack: ["Rust"],
    links: { code: "https://github.com/Kaleab-Shewangizaw/RUST" },
    highlights: ["Reads its own settings file", "Spreads visitors across several servers", "Keeps a log of every visit"],
    story: [
      {
        heading: "Why I built it",
        body: "I set up this kind of software for Pazimo every week and wanted to know how it works inside.",
      },
    ],
  },
  {
    slug: "creator-workspace",
    name: "Creator Workspace",
    year: "2026",
    platform: "tool",
    kind: "Free tool",
    role: "Built it alone",
    summary: "Write, plan and preview YouTube scripts in one place.",
    stack: ["JavaScript"],
    links: { code: "https://github.com/Kaleab-Shewangizaw/creator-workspace" },
    highlights: ["No sign-up needed", "Your work stays on your computer", "Hear your script read aloud"],
    story: [
      {
        heading: "Why I built it",
        body: "A friend was writing, planning and recording in three different apps. I made one place for all of it.",
      },
    ],
  },
  {
    slug: "yoinker",
    name: "Yoinker",
    year: "2025",
    platform: "tool",
    kind: "Browser extension",
    role: "Built it alone",
    summary: "Save any job post in one click and keep track of every job you've applied to.",
    stack: ["TypeScript", "React", "AI"],
    links: { code: "https://github.com/Kaleab-Shewangizaw/Yoinker" },
    highlights: ["Save a job post in one click", "AI fills in the details for you", "Track each application to the offer"],
    story: [
      {
        heading: "Why I built it",
        body: "While job hunting I had forty tabs open and a spreadsheet that was always out of date.",
      },
    ],
  },
  {
    slug: "oweme",
    name: "OweMe",
    year: "2025",
    platform: "mobile",
    kind: "Android app",
    role: "Built it alone",
    summary: "Keep track of money you lend to friends and money you owe.",
    stack: ["TypeScript", "Android"],
    links: { live: "https://t.me/kal_abX/591", liveLabel: "Download for Android", code: "https://github.com/Kaleab-Shewangizaw/OweMe" },
    highlights: ["See who owes you and how much", "Every payment is recorded", "Friendly reminders"],
    story: [
      {
        heading: "Why I built it",
        body: "Lending money between friends usually runs on memory, and memory isn't always reliable.",
      },
    ],
  },
];

export const stack = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "Rust", "Dart", "C++", "SQL"] },
  { group: "Frontend", items: ["React", "Next.js", "Tailwind", "Framer Motion"] },
  { group: "Mobile", items: ["React Native", "Expo", "Flutter", "Reanimated"] },
  { group: "Backend", items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Socket.IO", "REST"] },
  { group: "Infra", items: ["Linux", "Nginx", "Docker", "PM2", "CI/CD", "GitHub Actions", "Vercel"] },
];

export type Build = { name: string; client: string; href: string; label?: string; body: string; stack: string[] };

// logo: a file in public/logos. Entries without one show the org's initials.
export const timeline: { period: string; title: string; org: string; logo?: string; note: string; builds?: Build[] }[] = [
  { period: "2025 — now", title: "CTO", org: "Pazimo", logo: "/logos/pazimo.png", note: "I lead the team building Pazimo's website and apps." },
  {
    period: "2025 — now",
    title: "Full-stack Developer",
    org: "Prime Software",
    logo: "/logos/prime-software.jpg",
    note: "Built websites and tools for clients.",
    builds: [
      {
        name: "Proforma system",
        client: "Shrubs Marble & Granite",
        href: "https://proforma.shrubsmarble.com",
        body: "Staff create price quotes and managers approve them.",
        stack: [],
      },
      {
        name: "Customer order tracking",
        client: "Shrubs Marble & Granite",
        href: "https://customer.shrubsmarble.com",
        body: "Customers follow their order from cutting to delivery.",
        stack: [],
      },
      {
        name: "GojoHost support bot",
        client: "GojoHost",
        href: "https://t.me/Gojo_hostBot",
        label: "@Gojo_hostBot",
        body: "A Telegram bot that answers customers' hosting questions.",
        stack: [],
      },
    ],
  },
  { period: "2023 — 2024", title: "Bootcamp Instructor", org: "GDG · AAU", note: "Taught web development to new developers." },
  { period: "2023", title: "Problem Solving Track", org: "A2SV", logo: "/logos/a2sv.svg", note: "A training program for problem solving." },
  { period: "2022 — now", title: "BSc Engineering", org: "Addis Ababa University", logo: "/logos/aau.png", note: "Addis Ababa Institute of Technology (AAiT)." },
  { period: "2022", title: "Learned to code", org: "Scrimba", logo: "/logos/scrimba.svg", note: "Where it all started." },
];

export const now = [
  "Building my own NGINX from scratch in Rust",
  "Shipping Pazimo's new mobile apps",
  "Running Pazimo's servers and deploys",
];
