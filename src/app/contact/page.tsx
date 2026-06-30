"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Calendar } from "lucide-react";
import { BiLogoGithub, BiLogoLinkedin, BiLogoTelegram } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import { profile } from "@/lib/data";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s+/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: profile.location,
    href: "#",
  },
  {
    icon: Calendar,
    label: "Book a Call",
    value: "Schedule via Calendly",
    href: "https://calendly.com/kal_x",
  },
];

const socialLinks = [
  { icon: BiLogoGithub, label: "GitHub", href: profile.socials.github },
  { icon: BsTwitterX, label: "Twitter / X", href: profile.socials.twitter },
  { icon: BiLogoLinkedin, label: "LinkedIn", href: profile.socials.linkedin },
  { icon: BiLogoTelegram, label: "Telegram", href: profile.socials.telegram },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  fontSize: "13px",
  fontFamily: "'Space Mono', monospace",
  background: "transparent",
  border: "1px solid var(--border)",
  color: "var(--foreground)",
  outline: "none",
  transition: "border-color 0.18s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "9px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--muted-foreground)",
  marginBottom: "7px",
  fontFamily: "'Space Mono', monospace",
};

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzzjvdyq";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    const form = e.currentTarget;
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100dvh-52px)] lg:h-screen overflow-y-auto">
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "48px 32px 96px",
        }}
      >
        {/* Page header */}
        <div
          style={{
            borderBottom: "1px solid var(--border)",
            paddingBottom: "28px",
            marginBottom: "48px",
          }}
        >
          <p
            style={{
              fontSize: "10px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
              marginBottom: "8px",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            Get In Touch
          </p>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 700,
              color: "var(--foreground)",
              fontFamily: "'Space Mono', monospace",
              letterSpacing: "-0.02em",
              marginBottom: "10px",
            }}
          >
            Contact
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: "var(--muted-foreground)",
              lineHeight: 1.75,
              fontFamily: "'Space Mono', monospace",
            }}
          >
            I&apos;m always open to new projects, collaborations, or a
            conversation about tech. Reach out however works best for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: contact info + socials */}
          <div>
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--muted-foreground)",
                marginBottom: "20px",
                fontFamily: "'Space Mono', monospace",
              }}
            >
              Direct Contact
            </p>

            <div style={{ marginBottom: "36px" }}>
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    textDecoration: "none",
                    padding: "14px 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <Icon
                    size={13}
                    style={{
                      color: "var(--muted-foreground)",
                      marginTop: "2px",
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <p
                      style={{
                        fontSize: "9px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--muted-foreground)",
                        marginBottom: "3px",
                        fontFamily: "'Space Mono', monospace",
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--foreground)",
                        fontFamily: "'Space Mono', monospace",
                      }}
                    >
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--muted-foreground)",
                marginBottom: "16px",
                fontFamily: "'Space Mono', monospace",
              }}
            >
              Social
            </p>

            <div className="space-y-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                  style={{
                    textDecoration: "none",
                    fontSize: "13px",
                    color: "var(--foreground)",
                    fontFamily: "'Space Mono', monospace",
                    transition: "color 0.18s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "var(--muted-foreground)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "var(--foreground)";
                  }}
                >
                  <Icon size={15} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: message form */}
          <div>
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--muted-foreground)",
                marginBottom: "20px",
                fontFamily: "'Space Mono', monospace",
              }}
            >
              Send a Message
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" style={labelStyle}>
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                  style={inputStyle}
                  onFocus={(e) =>
                    ((e.currentTarget as HTMLInputElement).style.borderColor =
                      "var(--foreground)")
                  }
                  onBlur={(e) =>
                    ((e.currentTarget as HTMLInputElement).style.borderColor =
                      "var(--border)")
                  }
                />
              </div>

              <div>
                <label htmlFor="email" style={labelStyle}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  style={inputStyle}
                  onFocus={(e) =>
                    ((e.currentTarget as HTMLInputElement).style.borderColor =
                      "var(--foreground)")
                  }
                  onBlur={(e) =>
                    ((e.currentTarget as HTMLInputElement).style.borderColor =
                      "var(--border)")
                  }
                />
              </div>

              <div>
                <label htmlFor="message" style={labelStyle}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  required
                  rows={6}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) =>
                    ((e.currentTarget as HTMLTextAreaElement).style.borderColor =
                      "var(--foreground)")
                  }
                  onBlur={(e) =>
                    ((e.currentTarget as HTMLTextAreaElement).style.borderColor =
                      "var(--border)")
                  }
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2"
                style={{
                  padding: "10px 22px",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontFamily: "'Space Mono', monospace",
                  background: "var(--foreground)",
                  color: "var(--background)",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.65 : 1,
                  transition: "opacity 0.18s",
                }}
              >
                <Send size={11} />
                {loading ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "#4ade80",
                    fontFamily: "'Space Mono', monospace",
                  }}
                >
                  Message sent! I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "#f87171",
                    fontFamily: "'Space Mono', monospace",
                  }}
                >
                  Failed to send. Try emailing directly at{" "}
                  <a
                    href={`mailto:${profile.email}`}
                    style={{ textDecoration: "underline" }}
                  >
                    {profile.email}
                  </a>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
