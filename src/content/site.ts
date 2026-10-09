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
  intro:
    "I build web and mobile apps, the backends behind them and the servers they run on. I'm the CTO of Pazimo, a startup in Addis Ababa, where I lead engineering and own our infrastructure and deployments.",
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
    kind: "Web platform",
    role: "CTO · Full stack & infrastructure",
    featured: true,
    summary:
      "Pazimo is an event ticketing, invitation and RSVP platform for Ethiopia. The web app covers the public site, customer accounts and the organizer and admin dashboards.",
    stack: ["Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "Socket.IO", "Tailwind"],
    links: { live: "https://pazimo.com", code: "https://github.com/Kaleab-Shewangizaw/pazimo" },
    highlights: [
      "Local payments through Chapa and SantimPay behind one checkout",
      "QR tickets, check-in and live sales over Socket.IO",
      "Organizer and admin dashboards, invitations and custom RSVP forms",
      "I run deployment: Ubuntu servers, Nginx, PM2 and Let's Encrypt",
    ],
    story: [
      {
        heading: "The problem",
        body: "Global ticketing tools don't support the payment methods people in Ethiopia actually use, and they aren't built for how local events run, from invitations and RSVPs to cinema box offices.",
      },
      {
        heading: "What we built",
        body: "One Express and MongoDB API serves every client: the Next.js site, the attendee app and the organizer app. Payments, email, SMS and media each live in their own service layer, so adding a payment provider means writing one adapter instead of changing checkout.",
      },
      {
        heading: "What I learned",
        body: "Payment callbacks on unreliable networks taught me to make every write idempotent. Running production on our own VPS taught me more about Linux, Nginx and on-call than any course.",
      },
    ],
  },
  {
    slug: "pazimo-mobile",
    name: "Pazimo Mobile",
    year: "2026",
    platform: "mobile",
    kind: "iOS & Android app",
    role: "Lead · Mobile",
    featured: true,
    summary:
      "The attendee app. People find events, buy tickets, book cinema seats, order concessions, RSVP to invitations and keep every QR ticket in one wallet.",
    stack: ["React Native", "Expo SDK 57", "Expo Router", "TanStack Query", "NativeWind", "Reanimated"],
    links: { code: "https://github.com/Kaleab-Shewangizaw/pazimo-mobile" },
    highlights: [
      "Event discovery, checkout and a QR ticket wallet",
      "Cinema bookings, concessions orders and wallet top-ups",
      "Invitations, RSVPs and in-app conversations",
      "Native glass effects, haptics and push notifications",
    ],
    story: [
      {
        heading: "The problem",
        body: "The first app was built in Flutter by an outside agency and was hard to change. The web team worked in TypeScript every day, but nobody could ship to the mobile app quickly.",
      },
      {
        heading: "What I built",
        body: "I rebuilt it in React Native with Expo so web and mobile share one language, one set of API types and one team. Server data goes through TanStack Query, so loading, caching and refetching work the same way on every screen.",
      },
      {
        heading: "Details I care about",
        body: "Animations run on the UI thread with Reanimated, so they stay smooth on cheaper phones. Auth tokens are kept in SecureStore, never in plain storage, and every tap that matters gives haptic feedback.",
      },
    ],
  },
  {
    slug: "pazimo-organizer",
    name: "Pazimo Organizer",
    year: "2026",
    platform: "mobile",
    kind: "iOS & Android app",
    role: "Solo · Mobile",
    featured: true,
    summary:
      "The app event staff use. Organizers track revenue, ushers scan tickets at the door and cashiers run the cinema box office. Each role gets its own app experience after signing in.",
    stack: ["React Native", "Expo", "TypeScript", "Zustand", "TanStack Query", "Zod", "expo-camera"],
    links: { code: "https://github.com/Kaleab-Shewangizaw/pazimo-organizer-mobile" },
    highlights: [
      "Three roles with route guards, and the role always comes from the server",
      "Camera QR scanner that checks each ticket against the right event",
      "Per-event dashboards and paginated ticket and sales lists",
      "Animated sign-in that takes over from the native splash screen",
    ],
    story: [
      {
        heading: "The problem",
        body: "Organizers, door staff and box-office cashiers each need different tools, and giving the wrong person access means lost money or a long line at the door.",
      },
      {
        heading: "What I built",
        body: "A single app where the server decides the role. Expo Router's protected stacks route each person to their own tabs, and signing in on the wrong screen still takes you to the right place. Unsupported accounts see a clear dead end instead of getting in by accident.",
      },
      {
        heading: "Working with the backend",
        body: "The usher role didn't exist on the API yet, so the unlock-code flow (POST /ushers/unlock-event) was designed together with the backend before the scanner was built on top of it. Each scan is checked against the event it belongs to.",
      },
    ],
  },
  {
    slug: "chop",
    name: "Chop",
    year: "2026",
    platform: "tool",
    kind: "AI content tool",
    role: "Solo",
    summary:
      "Drop in an idea, a PDF, a Word doc, a screenshot or a link, and Chop turns it into posts written for each platform: X threads, LinkedIn posts, Reddit posts, YouTube scripts and Telegram updates.",
    stack: ["Next.js", "TypeScript", "Groq · Llama 3.3 70B", "Tesseract OCR", "pdf-parse", "Mammoth"],
    links: { live: "https://chop-content.vercel.app", code: "https://github.com/Kaleab-Shewangizaw/chop" },
    highlights: [
      "Reads PDFs, Word docs and images (with OCR), not just pasted text",
      "One input, five platform-native outputs in a single request",
      "Model fallback chain, so a provider outage never means an empty result",
      "Searchable local history of everything you've generated",
    ],
    story: [
      {
        heading: "Why",
        body: "Good ideas usually start as long notes or documents, and rewriting each one by hand for X, LinkedIn, Reddit and YouTube is slow. I wanted to go from raw material to ready-to-post drafts in one step.",
      },
      {
        heading: "How it works",
        body: "Uploads are parsed on the server: PDFs with pdf-parse, Word files with Mammoth and images with OCR. The extracted text goes to Llama 3.3 70B on Groq with a strict output schema for each platform, and the results are validated before they reach the UI.",
      },
      {
        heading: "Making it reliable",
        body: "LLM APIs fail in surprising ways, so generation runs through a chain: Groq first, an optional Gemini fallback, then a deterministic generator. Any missing platform is filled in, so you always get a complete set of drafts.",
      },
    ],
  },
  {
    slug: "rust-proxy",
    name: "My own NGINX, in Rust",
    year: "2026",
    platform: "tool",
    kind: "Systems · in progress",
    role: "Solo",
    summary:
      "I'm learning Rust by writing a web server and reverse proxy from scratch, the kind of thing NGINX does. No frameworks, just the standard library and a lot of reading.",
    stack: ["Rust", "std::net", "Threads", "TCP"],
    links: { code: "https://github.com/Kaleab-Shewangizaw/RUST" },
    highlights: [
      "Parses its own config file: host, port, connection limits and backends",
      "Backend registry with round-robin selection and health status",
      "Structured request logging to file",
    ],
    story: [
      {
        heading: "Why",
        body: "I configure NGINX for Pazimo all the time and wanted to understand what actually happens between a request arriving and a backend answering. Building one is the best way I know to learn both Rust and how web servers work.",
      },
      {
        heading: "How it's going",
        body: "Each step is a small crate: config parsing first, then the backend registry and round-robin picking, then logging. Next up is accepting real TCP connections and forwarding them upstream.",
      },
    ],
  },
  {
    slug: "creator-workspace",
    name: "Creator Workspace",
    year: "2026",
    platform: "tool",
    kind: "Open source",
    role: "Solo",
    summary:
      "A local-first writing studio for YouTube scripts. It has a pipeline board, inline delivery cues and voice-over previews generated in the browser.",
    stack: ["JavaScript", "IndexedDB", "Web Audio", "Git sync"],
    links: { code: "https://github.com/Kaleab-Shewangizaw/creator-workspace" },
    highlights: ["No accounts and no server", "Everything stays on your machine", "Syncs to a git repo you own"],
    story: [
      {
        heading: "Why",
        body: "A friend wrote scripts in one app, tracked them in another and recorded in a third. I wanted one place for all of it, where the data stays with the person who wrote it.",
      },
      {
        heading: "How",
        body: "Everything is saved on the device first and synced to a git repo the creator owns. A voice preview generated in the browser lets you hear the pacing before you record.",
      },
    ],
  },
  {
    slug: "yoinker",
    name: "Yoinker",
    year: "2025",
    platform: "tool",
    kind: "Chrome extension",
    role: "Solo",
    summary:
      "Save any job posting with one click, then track applications, salaries, notes and interviews in a private dashboard.",
    stack: ["TypeScript", "Chrome Extensions", "React", "LLM APIs"],
    links: { code: "https://github.com/Kaleab-Shewangizaw/Yoinker" },
    highlights: ["One-click capture from any job board", "AI pulls out the fields so you don't type them", "Private by default"],
    story: [
      {
        heading: "Why",
        body: "I was job hunting with forty open tabs and a spreadsheet that was always out of date, so I built the tool I wanted.",
      },
      {
        heading: "How",
        body: "The extension reads the posting, an LLM turns it into one consistent format, and the dashboard tracks each application from saved to offer.",
      },
    ],
  },
  {
    slug: "oweme",
    name: "OweMe",
    year: "2025",
    platform: "mobile",
    kind: "Android app",
    role: "Solo",
    summary: "A simple mobile app for tracking money you lend, borrow and pay back. Android only for now; the APK is on my Telegram channel.",
    stack: ["TypeScript", "Android"],
    links: { live: "https://t.me/kal_abX/591", liveLabel: "Download APK", code: "https://github.com/Kaleab-Shewangizaw/OweMe" },
    highlights: ["Running balance per person", "Append-only ledger, so history never changes", "Gentle repayment reminders"],
    story: [
      {
        heading: "Why",
        body: "Lending money between friends usually works on memory, and memory isn't always reliable.",
      },
      {
        heading: "How",
        body: "Every entry is append-only, so any balance can be explained line by line. It's built for Android for now, and the APK ships through my Telegram channel.",
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

export const timeline: { period: string; title: string; org: string; note: string; builds?: Build[] }[] = [
  { period: "2025 — now", title: "CTO", org: "Pazimo", note: "Pazimo is a ticketing startup in Addis Ababa. I lead engineering and own infrastructure and deployment for the web app, both mobile apps and the API." },
  {
    period: "2024 — 2025",
    title: "Full-stack Developer",
    org: "Prime Software",
    note: "Built client products end to end, from database design to deployment.",
    builds: [
      {
        name: "Proforma system",
        client: "Shrubs Marble & Granite",
        href: "https://proforma.shrubsmarble.com",
        body: "Internal tool for creating and approving proforma invoices. React and Vite frontend, Express and PostgreSQL API, JWT auth with refresh-token rotation, and user, manager and admin roles with an approval flow.",
        stack: ["React", "Vite", "Express", "PostgreSQL", "JWT"],
      },
      {
        name: "Customer order tracking",
        client: "Shrubs Marble & Granite",
        href: "https://customer.shrubsmarble.com",
        body: "Customers enter an order number and phone number to follow their marble and granite order through fabrication, from cutting to delivery.",
        stack: [],
      },
      {
        name: "GojoHost support bot",
        client: "GojoHost",
        href: "https://t.me/Gojo_hostBot",
        label: "@Gojo_hostBot",
        body: "A Telegram bot and Mini App that answers hosting questions, runs DNS checks, walks users through setup guides and hands off to an AI assistant. Sessions are stored in Redis.",
        stack: ["Node.js", "Telegram Bot API", "Next.js", "Redis", "LLM API"],
      },
    ],
  },
  { period: "2023 — 2024", title: "Bootcamp Instructor", org: "GDG · AAU", note: "Taught web development to new engineers. Teaching made me a better engineer." },
  { period: "2023", title: "Problem Solving Track", org: "A2SV", note: "Africa to Silicon Valley: data structures, algorithms and a lot of LeetCode." },
  { period: "2022 — now", title: "BSc Computer Science & Engineering", org: "Addis Ababa University", note: "Addis Ababa Institute of Technology (AAiT)." },
];

export const now = [
  "Building my own NGINX from scratch in Rust",
  "Shipping Pazimo's new mobile apps",
  "Running Pazimo's servers and deploys",
];
