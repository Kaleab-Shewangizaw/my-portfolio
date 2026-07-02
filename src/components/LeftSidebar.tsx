"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BiLogoGithub, BiLogoLinkedin, BiLogoTelegram } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import { profile } from "@/lib/data";
import ShaderCanvas from "@/components/ShaderCanvas";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const dark = resolvedTheme === "dark";

  // All sidebar colors in one place — swap entire palette with theme
  const c = {
    bg:           dark ? "#0D0D0D"              : "#F4F1EC",
    border:       dark ? "rgba(255,255,255,0.07)" : "#E0DDD8",
    alias:        dark ? "#FFFFFF"              : "#1A1A1A",
    name:         dark ? "rgba(255,255,255,0.42)" : "#5A5A5A",
    role:         dark ? "#5AAAA4"              : "#2D6A65",
    bio:          dark ? "rgba(255,255,255,0.55)" : "#3D3D3D",
    avail:        dark ? "rgba(255,255,255,0.6)"  : "#3D3D3D",
    navLabel:     dark ? "rgba(255,255,255,0.22)" : "#AAAAAA",
    navInactive:  dark ? "rgba(255,255,255,0.38)" : "#5A5A5A",
    navActive:    dark ? "#FFFFFF"              : "#1A1A1A",
    navHover:     dark ? "rgba(255,255,255,0.75)" : "#111111",
    navAccent:    dark ? "#5AAAA4"              : "#2D6A65",
    divider:      dark ? "rgba(255,255,255,0.07)" : "#E0DDD8",
    social:       dark ? "rgba(255,255,255,0.36)" : "#888888",
    socialHover:  dark ? "#FFFFFF"              : "#1A1A1A",
    themeBtn:     dark ? "rgba(255,255,255,0.28)" : "#888888",
    themeBtnHover:dark ? "rgba(255,255,255,0.68)" : "#1A1A1A",
  };

  return (
    <aside
      className="hidden lg:flex flex-col sticky top-0 h-screen flex-shrink-0"
      style={{
        width: "350px",
        borderRight: `1px solid ${c.border}`,
        zIndex: 10,
        position: "relative",
        overflow: "hidden",
        backgroundColor: c.bg,
        transition: "background-color 0.3s ease",
      }}
    >
      {/* WebGL marble shader — responds to theme */}
      <ShaderCanvas />

      <div className="flex flex-col h-full p-7 relative z-10">

        {/* Name / Logo */}
        <div className="mb-8">
          <Link href="/" style={{ textDecoration: "none" }}>
            <h1 style={{
              fontSize: "22px",
              fontWeight: 700,
              color: c.alias,
              lineHeight: 1.15,
              fontFamily: "'Space Mono', monospace",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: "5px",
            }}>
              {profile.alias}
            </h1>
            <p style={{
              fontSize: "12px",
              fontWeight: 400,
              color: c.name,
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontStyle: "italic",
              letterSpacing: "0.01em",
            }}>
              {profile.name}
            </p>
          </Link>
        </div>

        {/* Role */}
        <p style={{
          fontSize: "10px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: c.role,
          marginBottom: "12px",
          fontFamily: "'Space Mono', monospace",
          fontWeight: 700,
        }}>
          {profile.role}
        </p>

        {/* Bio */}
        <p style={{
          fontSize: "12px",
          lineHeight: 1.9,
          color: c.bio,
          fontFamily: "'Space Mono', monospace",
          marginBottom: "20px",
        }}>
          {profile.bio}
        </p>

        {/* Availability */}
        {profile.availableForWork && (
          <div
            className="inline-flex items-center gap-2 mb-8"
            style={{
              fontSize: "10px",
              color: c.avail,
              fontFamily: "'Space Mono', monospace",
              letterSpacing: "0.04em",
            }}
          >
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
            Available for work
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 min-h-0">
          <p style={{
            fontSize: "9px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: c.navLabel,
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
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: isActive ? 700 : 500,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: isActive ? c.navActive : c.navInactive,
                      textDecoration: "none",
                      padding: "8px 0 8px 14px",
                      borderLeft: isActive
                        ? `2px solid ${c.navAccent}`
                        : "2px solid transparent",
                      transition: "color 0.18s ease, border-color 0.18s ease",
                      fontFamily: "'Space Mono', monospace",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive)
                        (e.currentTarget as HTMLAnchorElement).style.color = c.navHover;
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive)
                        (e.currentTarget as HTMLAnchorElement).style.color = c.navInactive;
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom: social + theme toggle */}
        <div className="mt-auto pt-6" style={{ borderTop: `1px solid ${c.divider}` }}>
          <div className="flex gap-4 mb-5">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  color: c.social,
                  transition: "color 0.18s ease",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = c.socialHover;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = c.social;
                }}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>

          <button
            onClick={() => setTheme(dark ? "light" : "dark")}
            style={{
              fontSize: "9px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: c.themeBtn,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Space Mono', monospace",
              padding: 0,
              transition: "color 0.18s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = c.themeBtnHover;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = c.themeBtn;
            }}
          >
            {mounted ? (dark ? "☀ Light Mode" : "☾ Dark Mode") : "Theme"}
          </button>
        </div>

      </div>
    </aside>
  );
}
