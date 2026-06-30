export const profile = {
  name: "Kaleab Shewangizaw",
  alias: "[Kal_X]",
  role: "Full Stack Web Developer",
  location: "Addis Ababa, Ethiopia",
  bio: "I build fast, modern web applications — from backend APIs to clean, responsive UIs. CS student at AAU, currently working at Prime Software PLC.",
  email: "kaleab.stk@gmail.com",
  phone: "+251 988 680 987",
  availableForWork: true,
  cvPath: "/KALEAB SHEWANGIZAW CV2.pdf",
  socials: {
    github: "https://github.com/Kaleab-Shewangizaw",
    linkedin: "https://linkedin.com/in/kal-x",
    twitter: "https://x.com/Kal_abX",
    telegram: "https://t.me/kal_abX",
  },
};

export const cv = {
  experience: [
    {
      role: "Full Stack Developer",
      company: "Prime Software PLC",
      period: "2024 — Present",
      current: true,
    },
    {
      role: "Web Dev Bootcamp Instructor",
      company: "GDG — AAU",
      period: "2023 — 2024",
      current: false,
    },
  ],
  education: [
    {
      degree: "BSc Computer Science & Engineering",
      school: "Addis Ababa University (AAiT)",
      period: "2022 — Present",
    },
    {
      degree: "Frontend Career Path",
      school: "Scrimba",
      period: "2022 — 2023",
    },
    {
      degree: "Problem Solving Track",
      school: "A2SV (Africa to Silicon Valley)",
      period: "2023",
    },
  ],
  skills: [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST APIs"],
    },
    {
      category: "Tools",
      items: ["Git & GitHub", "Docker", "Figma", "VS Code"],
    },
  ],
};

export const projects = [
  {
    slug: "pazimo",
    name: "Pazimo",
    description:
      "Your one-stop destination for discovering and booking tickets for the best events in Ethiopia.",
    longDescription:
      "A full-featured event ticketing platform built for the Ethiopian market. Integrates with SantimPay and Chapa for local payment processing. Users can browse events, book seats, and manage their tickets.",
    tech: ["Next.js", "Node.js", "MongoDB", "SantimPay", "Chapa", "TypeScript", "Tailwind"],
    image: "/pazimo.png",
    github: "https://github.com/Kaleab-Shewangizaw/Pazimo",
    live: "https://pazimo.com",
    featured: true,
    year: "2024",
  },
  {
    slug: "qlink",
    name: "QLink",
    description:
      "Mini StackOverflow clone with Q&A, link sharing, and community voting features.",
    longDescription:
      "A community platform where developers ask questions, share links, and upvote/downvote content. Built with modern auth and full TypeScript type safety throughout the stack.",
    tech: ["Next.js", "Better-auth", "Shadcn UI", "MongoDB", "TypeScript"],
    image: "/QLink.png",
    github: "https://github.com/Kaleab-Shewangizaw/QLink",
    live: "https://qlink-one.vercel.app",
    featured: true,
    year: "2024",
  },
  {
    slug: "guava",
    name: "Guava Social Blog",
    description:
      "A social blogging platform with communities, posts, likes, and trending content discovery.",
    longDescription:
      "Full-featured social blog platform inspired by Medium and Reddit. Users create communities, write long-form posts, like, comment, and discover trending content.",
    tech: ["React", "Next.js", "Tailwind", "Node.js", "MongoDB"],
    image: "/Guava_logo.png",
    github: "https://github.com/Kaleab-Shewangizaw/Guava",
    live: null,
    featured: true,
    year: "2024",
  },
  {
    slug: "gymconnect",
    name: "GymConnect",
    description:
      "Platform connecting gym enthusiasts, trainers, and gyms. Share workout routines and diet plans.",
    longDescription:
      "A networking platform for the fitness community. Trainers list services, gyms showcase facilities, and enthusiasts find workout partners and routines.",
    tech: ["Next.js", "Better-auth", "Shadcn UI", "MongoDB", "TypeScript"],
    image: "/GymConnect.png",
    github: "https://github.com/Kaleab-Shewangizaw/Gym-connect",
    live: null,
    featured: true,
    year: "2023",
  },
  {
    slug: "summer-planner-v2",
    name: "Summer Planner V2",
    description:
      "A revamped trip and activity planner with payment integration and enhanced UI.",
    longDescription:
      "Second version of Summer Planner rebuilt with Next.js, Stripe payment integration, and a Sanity CMS backend for content management.",
    tech: ["Next.js", "Stripe", "Sanity", "Tailwind"],
    image: "/Summer_v2.png",
    github: "https://github.com/Kaleab-Shewangizaw/Summer_planner_v2",
    live: null,
    featured: false,
    year: "2023",
  },
  {
    slug: "summer-planner",
    name: "Summer Planner",
    description:
      "A web app to plan and organize your summer activities and trips.",
    longDescription:
      "My first full-stack MERN application. Users create and manage a list of summer activities with categories, priorities, and sharing features.",
    tech: ["React", "Express.js", "MongoDB", "Node.js"],
    image: "/Summer_v1.png",
    github: "https://github.com/Kaleab-Shewangizaw/Summer_Planner",
    live: null,
    featured: false,
    year: "2023",
  },
];

export const blogPosts = [
  {
    slug: "building-scalable-nextjs-apps",
    title: "Building Scalable Next.js Applications",
    subtitle: "Patterns and practices for production-grade Next.js",
    date: "2024-12-10",
    readTime: "6 min read",
    tags: ["Next.js", "Architecture", "Performance"],
    excerpt:
      "As Next.js has matured, so have the patterns for building large-scale applications. Here's what I've learned building real products with it.",
    content: `<p>Next.js has become the go-to framework for React applications, and for good reason. The combination of server-side rendering, static generation, and the new App Router makes it incredibly powerful for production applications.</p>

<h2>The App Router Mental Model</h2>
<p>The shift from Pages Router to App Router isn't just a technical change — it's a mental model change. Server Components change how you think about data fetching, state management, and component organization. The key insight: treat the server/client boundary as explicit, not implicit.</p>

<h2>Data Fetching at the Server</h2>
<p>In the App Router, data fetching happens on the server by default. You can fetch data directly in your components — no useEffect, no loading states for initial data. Use React's <code>cache()</code> function to deduplicate requests across components in the same request.</p>

<pre><code>// This runs on the server, cached per-request
import { cache } from 'react';

const getUser = cache(async (id: string) => {
  const user = await db.user.findUnique({ where: { id } });
  return user;
});</code></pre>

<h2>Client State Should Be Minimal</h2>
<p>With Server Components handling data, client state should be minimal. Only interactive UI state — dropdowns, modals, form inputs — needs client-side React. Everything else can live on the server and be streamed to the client.</p>

<h2>Performance Considerations</h2>
<p>Bundle size matters significantly. With Server Components, heavy dependencies (parsing libraries, DB clients, etc.) stay on the server and never ship to the browser. Use dynamic imports for client-heavy features not immediately needed:</p>

<pre><code>const Chart = dynamic(() => import('./Chart'), { ssr: false })</code></pre>

<p>The key question to ask about every component: "Does this need to be interactive?" If not, keep it as a Server Component. Your users' browsers will thank you.</p>`,
  },
  {
    slug: "mongodb-to-postgresql",
    title: "Why I Migrated from MongoDB to PostgreSQL",
    subtitle: "A developer's honest take on choosing the right database",
    date: "2024-11-22",
    readTime: "5 min read",
    tags: ["Database", "MongoDB", "PostgreSQL", "Backend"],
    excerpt:
      "I've used MongoDB for years. Then a project made me switch to PostgreSQL — and I haven't looked back. Here's what I learned.",
    content: `<p>I've used MongoDB since I started web development. The flexible schema, the JSON-like documents, the "just store whatever you want" philosophy — it all seemed perfect. Then came a ticketing platform that changed my mind.</p>

<h2>The Problem with Documents for Relational Data</h2>
<p>Building Pazimo, I had events, users, tickets, payments, venues, and organizers — all with complex relationships. MongoDB technically handles this, but the complexity grew fast. Aggregation pipelines for joins, inconsistent data due to lack of constraints, no easy transactions across collections.</p>

<h2>What PostgreSQL Gets Right</h2>
<p>Relations are first-class. Transactions are solid (ACID all the way). The query planner is incredibly smart. Foreign key constraints catch data integrity bugs at the database level. And with JSONB columns, you still get document storage when you genuinely need it.</p>

<p>The real revelation: SQL joins are not slow. Modern PostgreSQL with proper indexes handles joins on millions of rows in milliseconds. The "NoSQL is faster" argument only holds for specific write-heavy, schema-less use cases that most web apps don't have.</p>

<h2>When MongoDB Still Makes Sense</h2>
<p>MongoDB is still genuinely great for: highly nested documents with no need for joins, truly variable schemas where every document is different, and write-heavy workloads where you need horizontal sharding from day one.</p>

<p>For most web applications with related data? PostgreSQL. Choose based on your data shape, not industry trends.</p>`,
  },
  {
    slug: "typescript-patterns",
    title: "TypeScript Patterns I Wish I Knew Earlier",
    subtitle: "Practical tips that make your code safer and cleaner",
    date: "2024-10-15",
    readTime: "7 min read",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
    excerpt:
      "After years of TypeScript in production, here are the patterns that genuinely made my code safer, more readable, and easier to maintain.",
    content: `<p>TypeScript's type system is deep. Most developers (including past me) use 20% of it for 80% of the benefit. Here are the other 20% of features that are actually worth learning.</p>

<h2>Discriminated Unions for State Machines</h2>
<p>Instead of optional fields that may or may not exist, model state explicitly:</p>

<pre><code>// Bad: optional fields create ambiguous state
type State = {
  loading: boolean;
  data?: User;
  error?: string;
}

// Good: each state is unambiguous
type State =
  | { status: 'loading' }
  | { status: 'success'; data: User }
  | { status: 'error'; error: string }</code></pre>

<p>TypeScript narrows types automatically in each branch. No more <code>data?.thing ?? undefined</code> gymnastics throughout your component.</p>

<h2>The <code>satisfies</code> Operator</h2>
<p>Added in TS 4.9, <code>satisfies</code> validates that a value matches a type without widening the inferred type. Great for configuration objects where you want both type safety and precise autocomplete on the specific values.</p>

<h2>Branded Types</h2>
<p>Prevent accidentally mixing values of the same primitive type:</p>

<pre><code>type UserId = string & { readonly __brand: 'UserId' };
type OrderId = string & { readonly __brand: 'OrderId' };

// TypeScript catches you passing an OrderId where UserId is expected
function getUser(id: UserId) { ... }</code></pre>

<h2>Template Literal Types</h2>
<p>Build string patterns at the type level — great for event names, API routes, or CSS class combinations. These let you express constraints that would otherwise only be caught at runtime.</p>

<p>TypeScript's value is in making implicit contracts explicit. The more you embrace that philosophy, the fewer runtime bugs you ship.</p>`,
  },
];
