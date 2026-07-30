import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { BsGithub } from "react-icons/bs";
import { projects, blogPosts, cv, profile, funFacts } from "@/lib/data";
import GitHubStreak from "@/components/GitHubStreak";

const LABEL: React.CSSProperties = {
  fontSize: "10px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--muted-foreground)",
  fontFamily: "'Space Mono', monospace",
  flexShrink: 0,
};

const DIVIDER = (label: string, href?: string) => (
  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
    <p style={LABEL}>{label}</p>
    <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border)" }} />
    {href && (
      <Link href={href} className="nav-back" style={{ ...LABEL, flexShrink: 0 }}>
        All →
      </Link>
    )}
  </div>
);

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <div className="flex h-[calc(100dvh-52px)] lg:h-screen">

      {/* ── Middle column ── */}
      <div
        className="flex-1 overflow-y-auto min-w-0"
        style={{ borderRight: "1px solid var(--border)" }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "52px 36px 96px" }}>

          {/* ── Hero ── */}
          <section style={{ marginBottom: "60px" }}>
            <div className="flex items-center gap-5" style={{ marginBottom: "32px" }}>
              <div style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid var(--border)",
                flexShrink: 0,
                backgroundColor: "var(--muted)",
              }}>
                <Image
                  src="/brand/kalx-avatar-black.svg"
                  alt={profile.name}
                  width={80}
                  height={80}
                  priority
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <div>
                <p style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "var(--foreground)",
                  fontFamily: "'Space Mono', monospace",
                  marginBottom: "3px",
                }}>
                  {profile.name}
                </p>
                <p style={{
                  fontSize: "12px",
                  color: "var(--muted-foreground)",
                  fontFamily: "'Space Mono', monospace",
                }}>
                  {profile.role} · {profile.location}
                </p>
              </div>
            </div>

            <h1 style={{
              fontSize: "clamp(22px, 3.5vw, 32px)",
              fontWeight: 700,
              color: "var(--foreground)",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              fontFamily: "'Space Mono', monospace",
              marginBottom: "20px",
            }}>
              I build products.
            </h1>

            <p style={{
              fontSize: "15px",
              color: "var(--muted-foreground)",
              lineHeight: 2,
              fontFamily: "'Space Mono', monospace",
              marginBottom: "32px",
              maxWidth: "460px",
            }}>
              CTO at{" "}
              <span style={{ color: "var(--foreground)" }}>Pazimo</span>,
              Addis Ababa. Web, mobile, and the systems behind them.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/projects"
                style={{
                  display: "inline-block",
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--foreground)",
                  border: "1px solid var(--foreground)",
                  padding: "10px 20px",
                  textDecoration: "none",
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                View My Work
              </Link>
              <Link
                href="/contact"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  fontFamily: "'Space Mono', monospace",
                }}
                className="nav-back"
              >
                Say Hello →
              </Link>
            </div>
          </section>

          {/* ── Experience ── */}
          {DIVIDER("Experience")}
          <section style={{ marginBottom: "52px" }}>
            {cv.experience.map((exp, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "0 16px",
                  borderBottom: "1px solid var(--border)",
                  padding: "20px 0",
                  alignItems: "start",
                }}
              >
                <div>
                  <div className="flex items-center gap-3" style={{ marginBottom: "4px" }}>
                    <p style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "var(--foreground)",
                      fontFamily: "'Space Mono', monospace",
                    }}>
                      {exp.role}
                    </p>
                    {exp.current && (
                      <span style={{
                        fontSize: "8px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                        border: "1px solid var(--accent)",
                        padding: "2px 6px",
                        fontFamily: "'Space Mono', monospace",
                      }}>
                        Now
                      </span>
                    )}
                  </div>
                  <p style={{
                    fontSize: "13px",
                    color: "var(--muted-foreground)",
                    fontFamily: "'Space Mono', monospace",
                  }}>
                    {exp.company}
                  </p>
                </div>
                <p style={{
                  fontSize: "12px",
                  color: "var(--muted-foreground)",
                  fontFamily: "'Space Mono', monospace",
                  opacity: 0.7,
                  paddingTop: "3px",
                  whiteSpace: "nowrap",
                }}>
                  {exp.period}
                </p>
              </div>
            ))}
          </section>

          {/* ── Education ── */}
          {DIVIDER("Education")}
          <section style={{ marginBottom: "52px" }}>
            {cv.education.map((edu, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "0 16px",
                  borderBottom: "1px solid var(--border)",
                  padding: "18px 0",
                  alignItems: "start",
                }}
              >
                <div>
                  <p style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "var(--foreground)",
                    fontFamily: "'Space Mono', monospace",
                    marginBottom: "4px",
                    lineHeight: 1.4,
                  }}>
                    {edu.degree}
                  </p>
                  <p style={{
                    fontSize: "13px",
                    color: "var(--muted-foreground)",
                    fontFamily: "'Space Mono', monospace",
                  }}>
                    {edu.school}
                  </p>
                </div>
                <p style={{
                  fontSize: "12px",
                  color: "var(--muted-foreground)",
                  fontFamily: "'Space Mono', monospace",
                  opacity: 0.7,
                  paddingTop: "3px",
                  whiteSpace: "nowrap",
                }}>
                  {edu.period}
                </p>
              </div>
            ))}
          </section>

          {/* ── Stack ── */}
          {DIVIDER("Stack")}
          <section style={{ marginBottom: "52px" }}>
            {cv.skills.map((group, i) => (
              <div
                key={group.category}
                style={{
                  borderBottom: "1px solid var(--border)",
                  padding: "16px 0",
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  gap: "0 20px",
                  alignItems: "start",
                }}
              >
                <p style={{
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--foreground)",
                  fontFamily: "'Space Mono', monospace",
                  paddingTop: "2px",
                }}>
                  {group.category}
                </p>
                <p style={{
                  fontSize: "13px",
                  color: "var(--muted-foreground)",
                  lineHeight: 1.8,
                  fontFamily: "'Space Mono', monospace",
                }}>
                  {group.items.join(" · ")}
                </p>
              </div>
            ))}
          </section>

          {/* ── Latest Writing ── */}
          {DIVIDER("Latest Writing", "/blog")}
          <section>
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ display: "block", textDecoration: "none" }}
              >
                <article style={{ borderBottom: "1px solid var(--border)", padding: "20px 0" }}>
                  <div className="flex items-start justify-between gap-6" style={{ marginBottom: "10px" }}>
                    <h3
                      className="post-link-title"
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "var(--foreground)",
                        lineHeight: 1.4,
                        fontFamily: "'Space Mono', monospace",
                      }}
                    >
                      {post.title}
                    </h3>
                    <span style={{
                      fontSize: "11px",
                      color: "var(--muted-foreground)",
                      flexShrink: 0,
                      paddingTop: "3px",
                      fontFamily: "'Space Mono', monospace",
                    }}>
                      {new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <p style={{
                    fontSize: "13px",
                    color: "var(--muted-foreground)",
                    lineHeight: 1.85,
                    marginBottom: "10px",
                    fontFamily: "'Space Mono', monospace",
                  }}>
                    {post.excerpt}
                  </p>
                  <span style={{
                    fontSize: "10px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--muted-foreground)",
                    fontFamily: "'Space Mono', monospace",
                    opacity: 0.7,
                  }}>
                    {post.readTime}
                  </span>
                </article>
              </Link>
            ))}
          </section>

        </div>
      </div>

      {/* ── Right column ── */}
      <div
        className="hidden lg:flex flex-col overflow-y-auto flex-shrink-0"
        style={{ width: "350px" }}
      >
        <div style={{ padding: "52px 28px 80px" }}>

          {/* GitHub streak */}
          <div style={{ marginBottom: "36px", paddingBottom: "32px", borderBottom: "1px solid var(--border)" }}>
            <p style={{ ...LABEL, marginBottom: "14px" }}>GitHub</p>
            <GitHubStreak />
          </div>

          {/* Featured projects */}
          <div style={{ marginBottom: "36px" }}>
            <p style={{ ...LABEL, marginBottom: "20px" }}>Featured Builds</p>

            {featuredProjects.map((project, i) => (
              <div
                key={project.slug}
                style={{
                  marginBottom: i < featuredProjects.length - 1 ? "28px" : 0,
                  paddingBottom: i < featuredProjects.length - 1 ? "28px" : 0,
                  borderBottom: i < featuredProjects.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <div className="flex items-start justify-between gap-2" style={{ marginBottom: "8px" }}>
                  <h3 style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "var(--foreground)",
                    fontFamily: "'Space Mono', monospace",
                  }}>
                    {project.name}
                  </h3>
                  <span style={{
                    fontSize: "10px",
                    color: "var(--muted-foreground)",
                    fontFamily: "'Space Mono', monospace",
                    paddingTop: "2px",
                    flexShrink: 0,
                  }}>
                    {project.year}
                  </span>
                </div>

                <p style={{
                  fontSize: "12px",
                  color: "var(--muted-foreground)",
                  lineHeight: 1.75,
                  fontFamily: "'Space Mono', monospace",
                  marginBottom: "12px",
                }}>
                  {project.longDescription ?? project.description}
                </p>

                <div className="flex flex-wrap gap-x-2 gap-y-1" style={{ marginBottom: "12px" }}>
                  {project.tech.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: "9px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--muted-foreground)",
                        fontFamily: "'Space Mono', monospace",
                        border: "1px solid var(--border)",
                        padding: "2px 6px",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-icon"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontFamily: "'Space Mono', monospace",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      textDecoration: "none",
                    }}
                  >
                    <BsGithub size={12} /> Code
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-icon"
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontFamily: "'Space Mono', monospace",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        textDecoration: "none",
                      }}
                    >
                      <ExternalLink size={12} /> Live
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Fun facts */}
          <div style={{ marginBottom: "36px", paddingTop: "32px", borderTop: "1px solid var(--border)" }}>
            <p style={{ ...LABEL, marginBottom: "18px" }}>Quick Facts</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 8px" }}>
              {funFacts.map((fact) => (
                <div key={fact.label}>
                  <p style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "var(--foreground)",
                    fontFamily: "'Space Mono', monospace",
                    marginBottom: "3px",
                  }}>
                    {fact.value}
                  </p>
                  <p style={{
                    fontSize: "10px",
                    color: "var(--muted-foreground)",
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: "0.04em",
                  }}>
                    {fact.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CV download */}
          <div style={{ paddingTop: "24px", borderTop: "1px solid var(--border)" }}>
            <a
              href={profile.cvPath}
              download
              style={{
                display: "block",
                fontSize: "10px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--muted-foreground)",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                fontFamily: "'Space Mono', monospace",
                marginBottom: "10px",
              }}
            >
              Download CV →
            </a>
            <p style={{
              fontSize: "10px",
              color: "var(--muted-foreground)",
              fontFamily: "'Space Mono', monospace",
              opacity: 0.5,
            }}>
              Updated Jun 2025
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
