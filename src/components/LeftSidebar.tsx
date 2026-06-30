"use client";

import Link from "next/link";
import Image from "next/image";
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

  return (
    <aside
      className="hidden lg:flex flex-col sticky top-0 h-screen flex-shrink-0"
      style={{
        width: "260px",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        zIndex: 10,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#0D0D0D",
      }}
    >
      {/* WebGL marble shader background — always dark so white text stays visible */}
      <ShaderCanvas forceDark />

      <div className="flex flex-col h-full p-7 relative z-10">

        {/* Name / Logo */}
        <div className="mb-7">
          <Link href="/" style={{ textDecoration: "none" }}>
            <p style={{
              fontSize: "10px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.38)",
              marginBottom: "5px",
              fontFamily: "'Space Mono', monospace",
            }}>
              Portfolio
            </p>
            <h1 style={{
              fontSize: "17px",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.25,
              fontFamily: "'Space Mono', monospace",
              letterSpacing: "-0.01em",
            }}>
              {profile.name}
            </h1>
            <p style={{
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.38)",
              marginTop: "3px",
              fontFamily: "'Space Mono', monospace",
            }}>
              {profile.alias}
            </p>
          </Link>
        </div>

        {/* Profile Photo */}
        <div
          className="mb-7"
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
            overflow: "hidden",
            aspectRatio: "1 / 1",
            width: "100%",
          }}
        >
          <Image
            src="/my.png"
            alt={profile.name}
            width={220}
            height={220}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            priority
          />
        </div>

        {/* Role */}
        <p style={{
          fontSize: "10px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#5AAAA4",
          marginBottom: "10px",
          fontFamily: "'Space Mono', monospace",
        }}>
          {profile.role}
        </p>

        {/* Bio */}
        <p style={{
          fontSize: "12px",
          lineHeight: 1.85,
          color: "rgba(255,255,255,0.58)",
          fontFamily: "'Space Mono', monospace",
          marginBottom: "20px",
        }}>
          {profile.bio}
        </p>

        {/* Availability */}
        {profile.availableForWork && (
          <div
            className="inline-flex items-center gap-2 mb-7"
            style={{
              fontSize: "10px",
              color: "rgba(255,255,255,0.6)",
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
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
            marginBottom: "10px",
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
                      fontWeight: isActive ? 700 : 400,
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.4)",
                      textDecoration: "none",
                      padding: "7px 0 7px 12px",
                      borderLeft: isActive
                        ? "2px solid #5AAAA4"
                        : "2px solid transparent",
                      transition: "color 0.18s ease, border-color 0.18s ease",
                      fontFamily: "'Space Mono', monospace",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.72)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)";
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom: social + theme */}
        <div className="mt-auto pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          {/* Social icons */}
          <div className="flex gap-4 mb-5">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  color: "rgba(255,255,255,0.38)",
                  transition: "color 0.18s ease",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.38)";
                }}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            style={{
              fontSize: "9px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Space Mono', monospace",
              padding: 0,
              transition: "color 0.18s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.65)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.3)";
            }}
          >
            {mounted ? (resolvedTheme === "dark" ? "Light Mode" : "Dark Mode") : "Theme"}
          </button>
        </div>

      </div>
    </aside>
  );
}
