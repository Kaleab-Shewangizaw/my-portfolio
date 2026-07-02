"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { BiLogoGithub, BiLogoLinkedin, BiLogoTelegram } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/lib/data";

const navItems = [
  { label: "Home",         href: "/" },
  { label: "Projects",     href: "/projects" },
  { label: "Blog",         href: "/blog" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact",      href: "/contact" },
];

const socialLinks = [
  { icon: BiLogoGithub,  href: profile.socials.github,   label: "GitHub" },
  { icon: BsTwitterX,    href: profile.socials.twitter,  label: "Twitter" },
  { icon: BiLogoLinkedin,href: profile.socials.linkedin, label: "LinkedIn" },
  { icon: BiLogoTelegram,href: profile.socials.telegram, label: "Telegram" },
];

const itemVariants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0  },
};

export default function MobileHeader() {
  const [isOpen, setIsOpen]     = useState(false);
  const [mounted, setMounted]   = useState(false);
  const pathname                = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  // Close on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* ── Top bar ── */}
      <header
        className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5"
        style={{
          height: "52px",
          backgroundColor: "var(--sb-bg)",
          borderBottom: "1px solid var(--sb-border-color)",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "var(--sb-alias)",
            fontFamily: "'Space Mono', monospace",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>
            {profile.alias}
          </span>
        </Link>

        {/* Right: availability dot + text toggle */}
        <div className="flex items-center gap-3">
         
          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            style={{
              fontSize: "9px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--sb-alias)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Space Mono', monospace",
              padding: "4px 0",
              minWidth: "38px",
              textAlign: "right",
            }}
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      {/* Spacer so content isn't hidden under bar */}
      <div className="lg:hidden h-[52px]" />

      {/* ── Full-screen overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
            className="lg:hidden fixed top-[52px] left-0 right-0 bottom-0 z-40 flex flex-col overflow-y-auto"
            style={{
              backgroundColor: "var(--sb-bg)",
              borderTop: "1px solid var(--sb-border-color)",
            }}
          >
            <div style={{ padding: "36px 28px 52px", display: "flex", flexDirection: "column", minHeight: "100%" }}>

              {/* Identity strip */}
              <div
                style={{
                  marginBottom: "40px",
                  paddingBottom: "24px",
                  borderBottom: "1px solid var(--sb-divider)",
                }}
              >
                <p style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "var(--sb-alias)",
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: "-0.01em",
                  marginBottom: "4px",
                }}>
                  {profile.name}
                </p>
                <div className="flex items-center gap-2">
                  <span style={{
                    fontSize: "10px",
                    color: "var(--sb-role)",
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: "0.06em",
                  }}>
                    {profile.role}
                  </span>
                  <span style={{ color: "var(--sb-divider)", fontSize: "10px" }}>·</span>
                  <span style={{
                    fontSize: "10px",
                    color: "var(--sb-nav-label)",
                    fontFamily: "'Space Mono', monospace",
                  }}>
                    {profile.location}
                  </span>
                </div>
              </div>

              {/* Nav — large, numbered, editorial */}
              <nav style={{ flex: 1 }}>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {navItems.map((item, i) => {
                    const isActive =
                      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                    return (
                      <motion.li
                        key={item.href}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.05 * i, duration: 0.22, ease: "easeOut" }}
                      >
                        <Link
                          href={item.href}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            padding: "20px 0",
                            borderBottom: "1px solid var(--sb-divider)",
                            textDecoration: "none",
                          }}
                        >
                          {/* Number */}
                          <span style={{
                            fontSize: "9px",
                            letterSpacing: "0.12em",
                            color: isActive ? "var(--sb-nav-accent)" : "var(--sb-nav-label)",
                            fontFamily: "'Space Mono', monospace",
                            minWidth: "20px",
                            flexShrink: 0,
                          }}>
                            {String(i + 1).padStart(2, "0")}
                          </span>

                          {/* Label */}
                          <span style={{
                            fontSize: "28px",
                            fontWeight: isActive ? 700 : 400,
                            color: isActive ? "var(--sb-nav-active)" : "var(--sb-nav-inactive)",
                            fontFamily: "'Space Mono', monospace",
                            letterSpacing: "-0.02em",
                            lineHeight: 1,
                            flex: 1,
                          }}>
                            {item.label}
                          </span>

                          {/* Active dot */}
                          {isActive && (
                            <span style={{
                              fontSize: "7px",
                              color: "var(--sb-nav-accent)",
                              flexShrink: 0,
                            }}>
                              ●
                            </span>
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Bottom: socials + theme + email */}
              <div style={{ paddingTop: "40px" }}>

                {/* Social icons */}
                <div className="flex gap-5" style={{ marginBottom: "24px" }}>
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      style={{ color: "var(--sb-social)" }}
                    >
                      <Icon size={19} />
                    </a>
                  ))}
                </div>

                {/* Theme toggle + email */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--sb-theme-btn)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'Space Mono', monospace",
                      padding: 0,
                    }}
                  >
                    {mounted
                      ? resolvedTheme === "dark" ? "☀ Light Mode" : "☾ Dark Mode"
                      : "Theme"}
                  </button>

                  <a
                    href={`mailto:${profile.email}`}
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.06em",
                      color: "var(--sb-nav-label)",
                      fontFamily: "'Space Mono', monospace",
                      textDecoration: "none",
                    }}
                  >
                    {profile.email}
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
