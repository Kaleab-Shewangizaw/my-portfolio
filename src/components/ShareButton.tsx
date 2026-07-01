"use client";

import { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";

export default function ShareButton({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user dismissed — no-op
      }
      return;
    }
    // Fallback: copy to clipboard
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleShare}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "9px",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: copied ? "var(--accent)" : "var(--muted-foreground)",
        background: "none",
        border: "1px solid var(--border)",
        padding: "6px 12px",
        cursor: "pointer",
        fontFamily: "'Space Mono', monospace",
        transition: "color 0.18s, border-color 0.18s",
      }}
      aria-label="Share post"
    >
      {copied ? <Check size={11} /> : navigator?.share ? <Share2 size={11} /> : <Copy size={11} />}
      {copied ? "Copied!" : "Share"}
    </button>
  );
}
