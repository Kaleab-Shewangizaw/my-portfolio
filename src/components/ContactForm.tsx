"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";
import { site } from "@/content/site";

const topics = ["A project", "Collaboration", "A question", "Just saying hi"];

export function ContactForm() {
  const [topic, setTopic] = useState(topics[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, name, email, message, website: new FormData(e.currentTarget).get("website") ?? "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong sending that.");
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong sending that.");
      setStatus("error");
    }
  };

  const field =
    "w-full rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-4 py-3.5 text-[15px] outline-none transition-colors placeholder:text-[var(--faint)] focus:border-[var(--accent)]";

  if (status === "sent") {
    return (
      <div className="card flex flex-col items-center gap-4 p-10 text-center sm:p-12" role="status">
        <span className="grid size-12 place-items-center rounded-full bg-[var(--fg)] text-[var(--bg)]">
          <Check size={20} />
        </span>
        <p className="text-lg font-medium">Message sent</p>
        <p className="text-[15px] text-[var(--muted)]">Thanks for reaching out — I&apos;ll get back to you soon.</p>
        <button type="button" onClick={() => setStatus("idle")} className="text-sm text-[var(--muted)] underline underline-offset-4 hover:text-[var(--fg)]">
          Send another
        </button>
      </div>
    );
  }

  return (
    <div className="card p-6 sm:p-8">
      <form onSubmit={submit} className="space-y-6">
        <fieldset>
          <legend className="label mb-3">What&apos;s this about?</legend>
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setTopic(t)}
                aria-pressed={topic === t}
                className={
                  "rounded-full border px-4 py-2 text-sm transition-colors " +
                  (topic === t ? "border-transparent bg-[var(--fg)] text-[var(--bg)]" : "border-[var(--line)] text-[var(--muted)] hover:text-[var(--fg)]")
                }
              >
                {t}
              </button>
            ))}
          </div>
        </fieldset>
        <label className="block">
          <span className="label mb-2 block">Your name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} required minLength={2} className={field} placeholder="Ada Lovelace" autoComplete="name" />
        </label>
        <label className="block">
          <span className="label mb-2 block">Your email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={field}
            placeholder="ada@example.com"
            autoComplete="email"
          />
        </label>
        {/* Honeypot: hidden from people, filled in by bots. */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <label className="block">
          <span className="label mb-2 block">Message</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            minLength={10}
            rows={5}
            className={field + " resize-none"}
            placeholder="A few lines about the role, team or idea…"
          />
        </label>
        {status === "error" && (
          <p className="text-sm text-red-500" role="alert">
            {error} You can also email me at {site.email}.
          </p>
        )}
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--fg)] text-sm font-medium text-[var(--bg)] disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
          <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </form>
    </div>
  );
}
