"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { HiMenu, HiX } from "react-icons/hi";
import { BiLogoGithub, BiLogoLinkedin, BiLogoTelegram } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/lib/data";

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

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top bar — mobile only */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5"
        style={{
          height: "52px",
          backgroundColor: "#111111",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "#FFFFFF",
            textDecoration: "none",
            fontFamily: "'Space Mono', monospace",
            letterSpacing: "-0.01em",
          }}
        >
          [Kal_X]
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          style={{
            color: "rgba(255,255,255,0.65)",
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: "4px",
          }}
        >
          {isOpen ? <HiX size={22} /> : <HiMenu size={22} />}
        </button>
      </div>

      {/* Push content down on mobile */}
      <div className="lg:hidden h-[52px]" />

      {/* Slide-in drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -290 }}
            animate={{ x: 0 }}
            exit={{ x: -290 }}
            transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
            className="lg:hidden fixed top-[52px] left-0 bottom-0 z-40 flex flex-col"
            style={{
              width: "280px",
              backgroundColor: "#111111",
              borderRight: "1px solid rgba(255,255,255,0.07)",
              padding: "28px 24px 36px",
            }}
          >
            {/* Name */}
            <div className="mb-8">
              <p style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#FFFFFF",
                fontFamily: "'Space Mono', monospace",
                marginBottom: "2px",
              }}>
                {profile.name}
              </p>
              <p style={{
                fontSize: "10px",
                color: "rgba(255,255,255,0.38)",
                fontFamily: "'Space Mono', monospace",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}>
                {profile.role}
              </p>
            </div>

            {/* Nav links */}
            <nav className="flex-1">
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
                          fontSize: "13px",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.48)",
                          textDecoration: "none",
                          padding: "12px 0",
                          borderBottom: "1px solid rgba(255,255,255,0.06)",
                          fontFamily: "'Space Mono', monospace",
                          fontWeight: isActive ? 700 : 400,
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Bottom: socials + theme */}
            <div style={{ paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex gap-4 mb-5">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>

              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.32)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Space Mono', monospace",
                  padding: 0,
                }}
              >
                {mounted ? (resolvedTheme === "dark" ? "Light Mode" : "Dark Mode") : "Theme"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="lg:hidden fixed inset-0 z-30"
            style={{ backgroundColor: "rgba(0,0,0,0.55)", top: "52px" }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
