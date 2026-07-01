import { mkdirSync } from "fs";

// Pre-create every directory Turbopack races against during cold startup.
// Without these, Turbopack wins the mkdir race on some machines and emits
// harmless-but-noisy ENOENT errors for _buildManifest temp files.
const dirs = [
  ".next/static/development",
  ".next/server/app/page",
  ".next/server/app/_not-found",
  ".next/server/app/blog",
  ".next/server/app/projects",
  ".next/server/app/contact",
  ".next/server/pages",
  ".next/cache",
];

for (const dir of dirs) {
  mkdirSync(dir, { recursive: true });
}
