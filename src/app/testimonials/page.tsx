import Image from "next/image";
import { testimonials } from "@/lib/data";

export default function TestimonialsPage() {
  return (
    <div className="h-[calc(100dvh-52px)] lg:h-screen overflow-y-auto">
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 32px 96px" }}>

        {/* Header */}
        <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "28px", marginBottom: "8px" }}>
          <p
            style={{
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
              fontFamily: "'Space Mono', monospace",
              marginBottom: "8px",
            }}
          >
            From People I&apos;ve Worked With
          </p>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 700,
              color: "var(--foreground)",
              fontFamily: "'Space Mono', monospace",
              letterSpacing: "-0.02em",
            }}
          >
            Testimonials
          </h1>
        </div>

        {testimonials.length === 0 ? (
          <div style={{ paddingTop: "64px", textAlign: "center" }}>
            <p
              style={{
                fontSize: "12px",
                color: "var(--muted-foreground)",
                fontFamily: "'Space Mono', monospace",
                lineHeight: 1.9,
              }}
            >
              None collected yet. Check back soon.
            </p>
          </div>
        ) : (
          <div>
            {testimonials.map((t, i) => (
              <div
                key={i}
                style={{
                  borderBottom: "1px solid var(--border)",
                  padding: "48px 0",
                }}
              >
                {/* Typographic opening quote */}
                <p
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "72px",
                    lineHeight: "0.6",
                    color: "var(--accent)",
                    marginBottom: "24px",
                    opacity: 0.5,
                    userSelect: "none",
                  }}
                  aria-hidden
                >
                  &ldquo;
                </p>

                {/* Quote text */}
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--foreground)",
                    lineHeight: 2.1,
                    fontFamily: "'Space Mono', monospace",
                    marginBottom: "36px",
                  }}
                >
                  {t.text}
                </p>

                {/* Author row */}
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  {t.avatar ? (
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={44}
                      height={44}
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "1px solid var(--border)",
                        flexShrink: 0,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        backgroundColor: "var(--muted)",
                        border: "1px solid var(--border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "var(--muted-foreground)",
                        flexShrink: 0,
                      }}
                    >
                      {t.name.charAt(0)}
                    </div>
                  )}

                  <div>
                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "var(--foreground)",
                        fontFamily: "'Space Mono', monospace",
                        marginBottom: "3px",
                      }}
                    >
                      {t.name}
                    </p>
                    <p
                      style={{
                        fontSize: "10px",
                        color: "var(--muted-foreground)",
                        fontFamily: "'Space Mono', monospace",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
