import { testimonials } from "@/lib/data";

export default function TestimonialsPage() {
  return (
    <div className="h-[calc(100dvh-52px)] lg:h-screen overflow-y-auto">
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "48px 32px 96px" }}>

        {/* Header */}
        <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "28px", marginBottom: "48px" }}>
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
          <div
            style={{
              borderTop: "1px solid var(--border)",
              paddingTop: "48px",
              textAlign: "center",
            }}
          >
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
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {testimonials.map((t, i) => (
              <div
                key={i}
                style={{
                  borderBottom: "1px solid var(--border)",
                  padding: "40px 0",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--foreground)",
                    lineHeight: 2,
                    fontFamily: "'Space Mono', monospace",
                    marginBottom: "28px",
                  }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "var(--muted)",
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--muted-foreground)",
                      flexShrink: 0,
                    }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "var(--foreground)",
                        fontFamily: "'Space Mono', monospace",
                        marginBottom: "2px",
                      }}
                    >
                      {t.name}
                    </p>
                    <p
                      style={{
                        fontSize: "10px",
                        color: "var(--muted-foreground)",
                        fontFamily: "'Space Mono', monospace",
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
