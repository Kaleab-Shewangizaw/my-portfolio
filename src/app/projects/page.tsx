import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { BsGithub } from "react-icons/bs";
import { projects } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Kal_X",
  description:
    "A selection of projects built by Kaleab Shewangizaw — web apps, platforms, and tools.",
};

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <div className="h-[calc(100dvh-52px)] lg:h-screen overflow-y-auto">
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "48px 32px 96px" }}>

        {/* Page header */}
        <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "28px", marginBottom: "48px" }}>
          <p className="label-sm" style={{ color: "var(--muted-foreground)", marginBottom: "8px" }}>
            Work
          </p>
          <h1 style={{
            fontSize: "26px",
            fontWeight: 700,
            color: "var(--foreground)",
            fontFamily: "'Space Mono', monospace",
            letterSpacing: "-0.02em",
          }}>
            Projects
          </h1>
          <p style={{
            fontSize: "13px",
            color: "var(--muted-foreground)",
            marginTop: "10px",
            lineHeight: 1.75,
            fontFamily: "'Space Mono', monospace",
          }}>
            Things I&apos;ve built — from event platforms to social networks and developer tools.
          </p>
        </div>

        {/* Featured grid */}
        <section className="mb-16">
          <p className="label-sm" style={{ color: "var(--muted-foreground)", marginBottom: "28px" }}>
            Featured
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((project) => (
              <article
                key={project.slug}
                className="group"
                style={{ border: "1px solid var(--border)" }}
              >
                <div style={{ overflow: "hidden", aspectRatio: "16/9", backgroundColor: "var(--muted)" }}>
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={600}
                    height={340}
                    className="group-hover:scale-[1.03] transition-transform duration-500"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>

                <div style={{ padding: "20px" }}>
                  <div className="flex items-start justify-between gap-3" style={{ marginBottom: "10px" }}>
                    <div>
                      <h2 style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "var(--foreground)",
                        fontFamily: "'Space Mono', monospace",
                        marginBottom: "2px",
                      }}>
                        {project.name}
                      </h2>
                      <span style={{ fontSize: "10px", color: "var(--muted-foreground)", fontFamily: "'Space Mono', monospace" }}>
                        {project.year}
                      </span>
                    </div>

                    {/* Icon links — CSS class handles hover */}
                    <div className="flex gap-3 flex-shrink-0">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="link-icon"
                      >
                        <BsGithub size={15} />
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Live site"
                          className="link-icon"
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}
                    </div>
                  </div>

                  <p style={{
                    fontSize: "12px",
                    color: "var(--muted-foreground)",
                    lineHeight: 1.7,
                    marginBottom: "14px",
                    fontFamily: "'Space Mono', monospace",
                  }}>
                    {project.longDescription}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontSize: "9px",
                          letterSpacing: "0.07em",
                          textTransform: "uppercase",
                          padding: "2px 7px",
                          border: "1px solid var(--border)",
                          color: "var(--muted-foreground)",
                          fontFamily: "'Space Mono', monospace",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Other projects — compact list */}
        {others.length > 0 && (
          <section>
            <p className="label-sm" style={{ color: "var(--muted-foreground)", marginBottom: "28px" }}>
              Other Projects
            </p>

            <div>
              {others.map((project) => (
                <div
                  key={project.slug}
                  className="flex items-start justify-between gap-6"
                  style={{ borderBottom: "1px solid var(--border)", padding: "18px 0" }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "var(--foreground)",
                        fontFamily: "'Space Mono', monospace",
                      }}>
                        {project.name}
                      </h3>
                      <span style={{ fontSize: "10px", color: "var(--muted-foreground)", fontFamily: "'Space Mono', monospace" }}>
                        {project.year}
                      </span>
                    </div>
                    <p style={{
                      fontSize: "12px",
                      color: "var(--muted-foreground)",
                      marginBottom: "8px",
                      lineHeight: 1.6,
                      fontFamily: "'Space Mono', monospace",
                    }}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          style={{ fontSize: "10px", color: "var(--muted-foreground)", fontFamily: "'Space Mono', monospace" }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 flex-shrink-0 pt-1">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="link-icon"
                    >
                      <BsGithub size={15} />
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live site"
                        className="link-icon"
                      >
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
