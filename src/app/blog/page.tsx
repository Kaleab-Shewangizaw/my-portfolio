import Link from "next/link";
import { blogPosts } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Kal_X",
  description:
    "Writing about web development, engineering decisions, and things I've learned building software.",
};

export default function BlogPage() {
  return (
    <div className="h-[calc(100dvh-52px)] lg:h-screen overflow-y-auto">
      <div
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          padding: "48px 32px 96px",
        }}
      >
        {/* Page header */}
        <div
          style={{
            borderBottom: "1px solid var(--border)",
            paddingBottom: "28px",
            marginBottom: "0",
          }}
        >
          <p
            style={{
              fontSize: "10px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
              marginBottom: "8px",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            Writing
          </p>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 700,
              color: "var(--foreground)",
              fontFamily: "'Space Mono', monospace",
              letterSpacing: "-0.02em",
              marginBottom: "10px",
            }}
          >
            Blog
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: "var(--muted-foreground)",
              lineHeight: 1.75,
              fontFamily: "'Space Mono', monospace",
            }}
          >
            Thoughts on web development, engineering decisions, and things
            I&apos;ve learned building software.
          </p>
        </div>

        {/* Post list */}
        <div>
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{ display: "block", textDecoration: "none" }}
            >
              <article
                className="group"
                style={{
                  borderBottom: "1px solid var(--border)",
                  padding: "28px 0",
                }}
              >
                <div
                  className="flex items-start justify-between gap-6"
                  style={{ marginBottom: "10px" }}
                >
                  <h2
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "var(--foreground)",
                      lineHeight: 1.4,
                      fontFamily: "'Space Mono', monospace",
                      transition: "color 0.18s",
                    }}
                    className="group-hover:text-[oklch(0.43_0.075_180)] dark:group-hover:text-[oklch(0.655_0.075_188)]"
                  >
                    {post.title}
                  </h2>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "var(--muted-foreground)",
                      flexShrink: 0,
                      paddingTop: "3px",
                      fontFamily: "'Space Mono', monospace",
                    }}
                  >
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "12px",
                    color: "var(--muted-foreground)",
                    lineHeight: 1.8,
                    marginBottom: "14px",
                    fontFamily: "'Space Mono', monospace",
                  }}
                >
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "9px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--muted-foreground)",
                        border: "1px solid var(--border)",
                        padding: "2px 7px",
                        fontFamily: "'Space Mono', monospace",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  <span
                    style={{
                      fontSize: "11px",
                      color: "var(--muted-foreground)",
                      marginLeft: "auto",
                      fontFamily: "'Space Mono', monospace",
                    }}
                  >
                    {post.readTime}
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
