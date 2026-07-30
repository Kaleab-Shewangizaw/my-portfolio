"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { BiLogoGithub, BiLogoLinkedin, BiLogoTelegram } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import { profile } from "@/lib/data";
import ShaderCanvas from "@/components/ShaderCanvas";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { icon: BiLogoGithub, href: profile.socials.github, label: "GitHub" },
  { icon: BsTwitterX, href: profile.socials.twitter, label: "Twitter" },
  { icon: BiLogoLinkedin, href: profile.socials.linkedin, label: "LinkedIn" },
  { icon: BiLogoTelegram, href: profile.socials.telegram, label: "Telegram" },
];

export default function LeftSidebar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  // mounted only to decide toggle button label — not for colors
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <aside
      className="hidden lg:flex flex-col sticky top-0 h-screen flex-shrink-0"
      style={{
        width: "350px",
        borderRight: "1px solid var(--sb-border-color)",
        zIndex: 10,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--sb-bg)",
      }}
    >
      {/* WebGL marble shader — responds to theme */}
      <ShaderCanvas />

      <div className="flex flex-col h-full p-7 relative z-10">

        {/* Name / Logo + Theme Toggle */}
        <div className="mb-8 flex items-start justify-between gap-3">
          <Link href="/" style={{ textDecoration: "none", minWidth: 0 }}>
            <h1 style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "var(--sb-alias)",
              lineHeight: 1.15,
              fontFamily: "'Space Mono', monospace",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: "5px",
            }}>
              {profile.alias}
            </h1>
            <p style={{
              fontSize: "13px",
              color: "var(--sb-name)",
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontStyle: "italic",
              letterSpacing: "0.01em",
            }}>
              {profile.name}
            </p>
          </Link>

          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="sb-theme-btn"
              style={{
                background: "none",
                border: "1px solid var(--sb-divider)",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "4px",
                flexShrink: 0,
                marginTop: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.18s, color 0.18s",
              }}
            >
              {resolvedTheme === "dark"
                ? <Sun size={15} strokeWidth={1.5} />
                : <Moon size={15} strokeWidth={1.5} />}
            </button>
          )}
        </div>

          <p style={{
          fontSize: "12px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--sb-role)",
          marginBottom: "12px",
          fontFamily: "'Space Mono', monospace",
          fontWeight: 700,
        }}>
          {profile.role}
        </p>

        {/* Bio */}
        <p style={{
          fontSize: "13px",
          lineHeight: 1.9,
          color: "var(--sb-bio)",
          fontFamily: "'Space Mono', monospace",
          marginBottom: "28px",
        }}>
          {profile.bio}
        </p>

        {/* Navigation */}
        <nav className="flex-1 min-h-0">
          <p style={{
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--sb-nav-label)",
            marginBottom: "12px",
            fontFamily: "'Space Mono', monospace",
          }}>
            Navigate
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {navItems.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`sb-nav-link${isActive ? " sb-active" : ""}`}
                    style={{
                      display: "block",
                      fontSize: "13px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      padding: "9px 0 9px 14px",
                      fontFamily: "'Space Mono', monospace",
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom: social icons */}
        <div className="mt-auto pt-6" style={{ borderTop: "1px solid var(--sb-divider)" }}>
          <div className="flex gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="sb-social-icon"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </aside>
  );
}
