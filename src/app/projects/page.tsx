"use client";

import Image from "next/image";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { BsGithub } from "react-icons/bs";
import { projects } from "@/lib/data";

const tabs = [
  { key: "all",    label: "All" },
  { key: "web",    label: "Web" },
  { key: "mobile", label: "Mobile" },
  { key: "api",    label: "API" },
  { key: "tool",   label: "Tool" },
  { key: "fun",    label: "Fun" },
] as const;

type Tab = (typeof tabs)[number]["key"];

export default function ProjectsPage() {
  const [active, setActive] = useState<Tab>("all");

  const visible =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="h-[calc(100dvh-52px)] lg:h-screen overflow-y-auto">
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "48px 32px 96px" }}>

        {/* Header */}
        <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "28px", marginBottom: "36px" }}>
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
            A collection of things I&apos;ve built.
          </p>
        </div>

        {/* Tabs */}
        <div
          className="flex items-center gap-1"
          style={{ marginBottom: "40px", overflowX: "auto", paddingBottom: "2px" }}
          role="tablist"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={active === tab.key}
              onClick={() => setActive(tab.key)}
              style={{
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "'Space Mono', monospace",
                padding: "6px 16px",
                border: "1px solid var(--border)",
                background: active === tab.key ? "var(--foreground)" : "transparent",
                color: active === tab.key ? "var(--background)" : "var(--muted-foreground)",
                cursor: "pointer",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {visible.length === 0 ? (
          <p style={{
            fontSize: "13px",
            color: "var(--muted-foreground)",
            fontFamily: "'Space Mono', monospace",
            paddingTop: "24px",
          }}>
            Nothing here yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {visible.map((project) => (
              <article
                key={project.slug}
                className="group"
                style={{ border: "1px solid var(--border)" }}
              >
                {/* Thumbnail */}
                <div style={{
                  overflow: "hidden",
                  aspectRatio: "16/9",
                  backgroundColor: "var(--muted)",
                }}>
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
                  {/* Title row */}
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
                      <span style={{
                        fontSize: "9px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--muted-foreground)",
                        fontFamily: "'Space Mono', monospace",
                      }}>
                        {project.year}
                      </span>
                    </div>

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
                    lineHeight: 1.75,
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
        )}
      </div>
    </div>
  );
}
