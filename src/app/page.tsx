import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { BsGithub } from "react-icons/bs";
import { projects, blogPosts, cv, profile } from "@/lib/data";

export default function HomePage() {
  const selectedProjects = projects.slice(0, 5);
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <div
      className="flex h-[calc(100dvh-52px)] lg:h-screen"
    >
      {/* ── Middle column ── */}
      <div
        className="flex-1 overflow-y-auto min-w-0"
        style={{ borderRight: "1px solid var(--border)" }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "52px 36px 96px" }}>

          {/* ── Hero ── */}
          <section style={{ marginBottom: "56px" }}>
            <p style={{
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--accent)",
              fontFamily: "'Space Mono', monospace",
              marginBottom: "20px",
            }}>
              Addis Ababa, Ethiopia
            </p>

            <h1 style={{
              fontSize: "clamp(26px, 4vw, 38px)",
              fontWeight: 700,
              color: "var(--foreground)",
              lineHeight: 1.2,
              letterSpacing: "-0.025em",
              fontFamily: "'Space Mono', monospace",
              marginBottom: "24px",
            }}>
              I turn ideas into<br />
              production-grade<br />
              web products.
            </h1>

            <p style={{
              fontSize: "13px",
              color: "var(--muted-foreground)",
              lineHeight: 2.1,
              fontFamily: "'Space Mono', monospace",
              marginBottom: "32px",
              maxWidth: "480px",
            }}>
              From event ticketing platforms serving thousands of users across Ethiopia,
              to social networks and developer tools — I build full-stack applications
              that are fast, maintainable, and built to last. Currently at{" "}
              <span style={{ color: "var(--foreground)", fontWeight: 700 }}>Prime Software PLC</span>,
              studying CS at{" "}
              <span style={{ color: "var(--foreground)", fontWeight: 700 }}>AAU</span>.
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
                  transition: "background 0.18s, color 0.18s",
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
                  color: "var(--muted-foreground)",
                  textDecoration: "none",
                  fontFamily: "'Space Mono', monospace",
                }}
                className="nav-back"
              >
                Say Hello →
              </Link>
            </div>
          </section>

          {/* ── Divider with label ── */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}>
            <p style={{
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
              fontFamily: "'Space Mono', monospace",
              flexShrink: 0,
            }}>
              Selected Work
            </p>
            <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border)" }} />
            <Link
              href="/projects"
              className="nav-back"
              style={{
                fontSize: "9px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "'Space Mono', monospace",
                flexShrink: 0,
              }}
            >
              All Projects →
            </Link>
          </div>

          {/* ── Numbered project list ── */}
          <section style={{ marginBottom: "56px" }}>
            {selectedProjects.map((project, i) => (
              <div
                key={project.slug}
                style={{
                  display: "grid",
                  gridTemplateColumns: "28px 1fr auto",
                  gap: "0 20px",
                  alignItems: "start",
                  borderBottom: "1px solid var(--border)",
                  padding: "22px 0",
                }}
              >
                {/* Index */}
                <span style={{
                  fontSize: "10px",
                  color: "var(--muted-foreground)",
                  fontFamily: "'Space Mono', monospace",
                  paddingTop: "2px",
                  opacity: 0.5,
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div>
                  <div className="flex items-baseline gap-3" style={{ marginBottom: "6px" }}>
                    <h2 style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "var(--foreground)",
                      fontFamily: "'Space Mono', monospace",
                    }}>
                      {project.name}
                    </h2>
                    {project.featured && (
                      <span style={{
                        fontSize: "8px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                        fontFamily: "'Space Mono', monospace",
                      }}>
                        Featured
                      </span>
                    )}
                    <span style={{
                      fontSize: "10px",
                      color: "var(--muted-foreground)",
                      fontFamily: "'Space Mono', monospace",
                      marginLeft: "auto",
                    }}>
                      {project.year}
                    </span>
                  </div>

                  <p style={{
                    fontSize: "12px",
                    color: "var(--muted-foreground)",
                    lineHeight: 1.75,
                    marginBottom: "10px",
                    fontFamily: "'Space Mono', monospace",
                  }}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontSize: "9px",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--muted-foreground)",
                          fontFamily: "'Space Mono', monospace",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-3 pt-1">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="link-icon"
                  >
                    <BsGithub size={14} />
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Live"
                      className="link-icon"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </section>

          {/* ── Writing ── */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}>
            <p style={{
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
              fontFamily: "'Space Mono', monospace",
              flexShrink: 0,
            }}>
              Latest Writing
            </p>
            <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border)" }} />
            <Link
              href="/blog"
              className="nav-back"
              style={{
                fontSize: "9px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "'Space Mono', monospace",
                flexShrink: 0,
              }}
            >
              All Posts →
            </Link>
          </div>

          <section>
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ display: "block", textDecoration: "none" }}
              >
                <article style={{ borderBottom: "1px solid var(--border)", padding: "20px 0" }}>
                  <div className="flex items-start justify-between gap-6 mb-2">
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
                      fontSize: "10px",
                      color: "var(--muted-foreground)",
                      flexShrink: 0,
                      paddingTop: "3px",
                      fontFamily: "'Space Mono', monospace",
                    }}>
                      {new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <p style={{
                    fontSize: "12px",
                    color: "var(--muted-foreground)",
                    lineHeight: 1.85,
                    marginBottom: "10px",
                    fontFamily: "'Space Mono', monospace",
                  }}>
                    {post.excerpt}
                  </p>
                  <span style={{
                    fontSize: "9px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--muted-foreground)",
                    fontFamily: "'Space Mono', monospace",
                  }}>
                    {post.readTime}
                  </span>
                </article>
              </Link>
            ))}
          </section>

        </div>
      </div>

      {/* ── Right column: professional timeline ── */}
      <div
        className="hidden lg:flex flex-col overflow-y-auto flex-shrink-0"
        style={{ width: "350px", borderLeft: "1px solid var(--border)" }}
      >
        <div style={{ padding: "52px 28px 80px" }}>

          {/* Status */}
          <div style={{ marginBottom: "32px", paddingBottom: "28px", borderBottom: "1px solid var(--border)" }}>
            <p style={{
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
              fontFamily: "'Space Mono', monospace",
              marginBottom: "14px",
            }}>
              Status
            </p>

            {profile.availableForWork && (
              <div className="flex items-center gap-2" style={{ marginBottom: "10px" }}>
                <span
                  className="animate-pulse"
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "#4ade80",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span style={{
                  fontSize: "11px",
                  color: "var(--foreground)",
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 700,
                }}>
                  Open to Work
                </span>
              </div>
            )}
            <p style={{
              fontSize: "11px",
              color: "var(--muted-foreground)",
              lineHeight: 1.75,
              fontFamily: "'Space Mono', monospace",
            }}>
              Available for full-stack roles, freelance projects, and interesting collaborations.
            </p>
          </div>

          {/* Experience */}
          <div style={{ marginBottom: "32px", paddingBottom: "28px", borderBottom: "1px solid var(--border)" }}>
            <p style={{
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
              fontFamily: "'Space Mono', monospace",
              marginBottom: "18px",
            }}>
              Experience
            </p>

            {cv.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: i < cv.experience.length - 1 ? "20px" : 0 }}>
                <div className="flex items-start justify-between gap-2" style={{ marginBottom: "2px" }}>
                  <p style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--foreground)",
                    fontFamily: "'Space Mono', monospace",
                    lineHeight: 1.4,
                  }}>
                    {exp.role}
                  </p>
                  {exp.current && (
                    <span style={{
                      fontSize: "7px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#4ade80",
                      border: "1px solid #4ade80",
                      padding: "2px 5px",
                      fontFamily: "'Space Mono', monospace",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}>
                      Now
                    </span>
                  )}
                </div>
                <p style={{ fontSize: "11px", color: "var(--muted-foreground)", fontFamily: "'Space Mono', monospace" }}>
                  {exp.company}
                </p>
                <p style={{ fontSize: "10px", color: "var(--muted-foreground)", fontFamily: "'Space Mono', monospace", opacity: 0.7, marginTop: "2px" }}>
                  {exp.period}
                </p>
              </div>
            ))}
          </div>

          {/* Education */}
          <div style={{ marginBottom: "32px", paddingBottom: "28px", borderBottom: "1px solid var(--border)" }}>
            <p style={{
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
              fontFamily: "'Space Mono', monospace",
              marginBottom: "18px",
            }}>
              Education
            </p>

            {cv.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: i < cv.education.length - 1 ? "16px" : 0 }}>
                <p style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "var(--foreground)",
                  fontFamily: "'Space Mono', monospace",
                  lineHeight: 1.4,
                  marginBottom: "2px",
                }}>
                  {edu.degree}
                </p>
                <p style={{ fontSize: "11px", color: "var(--muted-foreground)", fontFamily: "'Space Mono', monospace" }}>
                  {edu.school}
                </p>
                <p style={{ fontSize: "10px", color: "var(--muted-foreground)", fontFamily: "'Space Mono', monospace", opacity: 0.7, marginTop: "2px" }}>
                  {edu.period}
                </p>
              </div>
            ))}
          </div>

          {/* Tech snapshot */}
          <div style={{ marginBottom: "32px", paddingBottom: "28px", borderBottom: "1px solid var(--border)" }}>
            <p style={{
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
              fontFamily: "'Space Mono', monospace",
              marginBottom: "14px",
            }}>
              Stack
            </p>

            {cv.skills.map((group) => (
              <div key={group.category} style={{ marginBottom: "10px" }}>
                <p style={{
                  fontSize: "9px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--foreground)",
                  fontFamily: "'Space Mono', monospace",
                  marginBottom: "3px",
                }}>
                  {group.category}
                </p>
                <p style={{
                  fontSize: "11px",
                  color: "var(--muted-foreground)",
                  lineHeight: 1.8,
                  fontFamily: "'Space Mono', monospace",
                }}>
                  {group.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>

          {/* CV download */}
          <a
            href={profile.cvPath}
            download
            style={{
              display: "block",
              fontSize: "9px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              fontFamily: "'Space Mono', monospace",
              marginBottom: "12px",
            }}
          >
            Download CV →
          </a>

          <p style={{
            fontSize: "9px",
            color: "var(--muted-foreground)",
            fontFamily: "'Space Mono', monospace",
            opacity: 0.5,
          }}>
            Updated Jun 2025
          </p>
        </div>
      </div>
    </div>
  );
}
