import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/data";
import ShareButton from "@/components/ShareButton";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Kal_X`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;
  const nextPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;

  return (
    <div className="h-[calc(100dvh-52px)] lg:h-screen overflow-y-auto">
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 32px 96px" }}>

        {/* Back link — CSS class handles hover */}
        <Link
          href="/blog"
          className="nav-back label-sm"
          style={{ display: "inline-block", marginBottom: "36px" }}
        >
          ← Blog
        </Link>

        {/* Post header */}
        <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "28px", marginBottom: "40px" }}>
          {/* Date + read time + share */}
          <div className="flex items-center justify-between gap-4" style={{ marginBottom: "16px" }}>
            <div className="flex items-center gap-3">
              <span style={{ fontSize: "11px", color: "var(--muted-foreground)", fontFamily: "'Space Mono', monospace" }}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span style={{ color: "var(--border)", fontSize: "11px" }}>/</span>
              <span style={{ fontSize: "11px", color: "var(--muted-foreground)", fontFamily: "'Space Mono', monospace" }}>
                {post.readTime}
              </span>
            </div>
            <ShareButton
              title={post.title}
              url={`https://kal-x.vercel.app/blog/${post.slug}`}
            />
          </div>

          <h1 style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "var(--foreground)",
            lineHeight: 1.35,
            letterSpacing: "-0.02em",
            fontFamily: "'Space Mono', monospace",
            marginBottom: "10px",
          }}>
            {post.title}
          </h1>

          <p style={{
            fontSize: "14px",
            color: "var(--muted-foreground)",
            lineHeight: 1.65,
            fontFamily: "'Space Mono', monospace",
            marginBottom: "20px",
          }}>
            {post.subtitle}
          </p>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--muted-foreground)",
                  border: "1px solid var(--border)",
                  padding: "2px 8px",
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Post body */}
        <div
          className="prose-article"
          style={{ fontSize: "14px", fontFamily: "'Space Mono', monospace" }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Post navigation */}
        <div style={{
          marginTop: "56px",
          paddingTop: "28px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          gap: "24px",
        }}>
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="nav-back"
              style={{
                fontSize: "11px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily: "'Space Mono', monospace",
                maxWidth: "45%",
              }}
            >
              <span style={{ display: "block", marginBottom: "4px", color: "var(--muted-foreground)" }}>← Older</span>
              <span style={{ color: "var(--foreground)", fontWeight: 700 }}>{prevPost.title}</span>
            </Link>
          ) : (
            <span />
          )}

          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="nav-back"
              style={{
                fontSize: "11px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily: "'Space Mono', monospace",
                textAlign: "right",
                maxWidth: "45%",
              }}
            >
              <span style={{ display: "block", marginBottom: "4px", color: "var(--muted-foreground)" }}>Newer →</span>
              <span style={{ color: "var(--foreground)", fontWeight: 700 }}>{nextPost.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
}
