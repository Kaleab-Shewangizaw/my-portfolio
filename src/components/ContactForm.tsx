"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { site } from "@/content/site";

const topics = ["Full-time role", "Contract", "Collaboration", "Just saying hi"];

export function ContactForm() {
  const [topic, setTopic] = useState(topics[0]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // No backend to maintain: compose the email in the visitor's own client.
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `${topic} — from ${name || "your portfolio"}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  };

  const field =
    "w-full rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-4 py-3.5 text-[15px] outline-none transition-colors placeholder:text-[var(--faint)] focus:border-[var(--accent)]";

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
          <input value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="Ada Lovelace" autoComplete="name" />
        </label>
        <label className="block">
          <span className="label mb-2 block">Message</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className={field + " resize-none"}
            placeholder="A few lines about the role, team or idea…"
          />
        </label>
        <button type="submit" className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--fg)] text-sm font-medium text-[var(--bg)]">
          Compose email
          <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </form>
    </div>
  );
}
