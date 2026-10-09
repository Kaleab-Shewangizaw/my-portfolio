import type { Project } from "@/content/site";
import { cn } from "@/lib/utils";

/* Flat, illustrative UI mockups drawn with divs. No screenshots to go stale. */

function QR({ size = 64, seed = 7 }: { size?: number; seed?: number }) {
  const n = 11;
  const cells: boolean[] = [];
  let s = seed;
  for (let i = 0; i < n * n; i++) {
    s = (s * 9301 + 49297) % 233280;
    cells.push(s / 233280 > 0.5);
  }
  const finder = (r: number, c: number) => (r < 3 && c < 3) || (r < 3 && c > n - 4) || (r > n - 4 && c < 3);
  return (
    <div className="grid rounded-md bg-[#fafafa] p-1.5" style={{ width: size, height: size, gridTemplateColumns: `repeat(${n},1fr)` }}>
      {cells.map((on, i) => {
        const r = Math.floor(i / n);
        const c = i % n;
        return <span key={i} className={finder(r, c) || on ? "bg-black" : ""} />;
      })}
    </div>
  );
}

function Phone({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative mx-auto aspect-[9/19] w-[190px] rounded-[34px] border-[6px] border-[#18181b] bg-black p-0 shadow-[0_20px_50px_-20px_rgba(0,0,0,.6)]", className)}>
      <div className="absolute left-1/2 top-2 z-10 h-[18px] w-[64px] -translate-x-1/2 rounded-full bg-[#18181b]" />
      <div className="relative h-full overflow-hidden rounded-[28px] bg-[#0a0a0a] text-[#fafafa]">{children}</div>
    </div>
  );
}

function AttendeeScreen() {
  return (
    <div className="flex h-full flex-col px-3 pb-3 pt-9 text-[9px]">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold">Discover</span>
        <span className="size-5 rounded-full bg-[#e4e4e7]" />
      </div>
      <div className="mt-2 flex gap-1">
        {["All", "Music", "Cinema", "Tech"].map((t, i) => (
          <span key={t} className={"rounded-full px-2 py-0.5 " + (i === 0 ? "bg-[#fafafa] text-black" : "bg-[#18181b] text-[#a1a1aa]")}>{t}</span>
        ))}
      </div>
      <div className="mt-2.5 rounded-xl bg-[#e4e4e7] p-2.5 text-black">
        <div className="h-12 rounded-lg bg-black/15" />
        <p className="mt-1.5 text-[10px] font-semibold">Addis Jazz Night</p>
        <p className="opacity-70">Sat · 8:00 PM · from 500 ETB</p>
      </div>
      <div className="mt-2 space-y-1.5">
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg bg-[#18181b] p-1.5">
            <span className="size-7 shrink-0 rounded-md bg-[#27272a]" />
            <span className="flex-1 space-y-1">
              <span className="block h-1.5 w-3/4 rounded-full bg-[#fafafa]/70" />
              <span className="block h-1.5 w-1/2 rounded-full bg-[#a1a1aa]/50" />
            </span>
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-center gap-2 rounded-xl bg-[#fafafa] p-2 text-black">
        <QR size={40} seed={3} />
        <span>
          <span className="block text-[10px] font-semibold">Your ticket</span>
          <span className="opacity-60">Row C · Seat 12</span>
        </span>
      </div>
    </div>
  );
}

function OrganizerScreen() {
  return (
    <div className="flex h-full flex-col px-3 pb-3 pt-9 text-[9px]">
      <span className="text-[#a1a1aa]">Usher · Addis Jazz Night</span>
      <span className="text-[11px] font-semibold">Scan tickets</span>
      <div className="relative mt-2.5 grid aspect-square place-items-center rounded-xl bg-[#18181b]">
        <div className="relative size-[70%]">
          {["left-0 top-0 border-l-2 border-t-2", "right-0 top-0 border-r-2 border-t-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((c) => (
            <span key={c} className={"absolute size-5 rounded-sm border-[#e4e4e7] " + c} />
          ))}
          <div className="absolute inset-3 grid place-items-center opacity-90"><QR size={70} seed={11} /></div>
        </div>
      </div>
      <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-[#e4e4e7] p-2 text-black">
        <span className="grid size-5 place-items-center rounded-full bg-black text-[10px] text-[#e4e4e7]">✓</span>
        <span><span className="block font-semibold">Valid · VIP</span><span className="opacity-70">Checked in 21:04</span></span>
      </div>
      <div className="mt-auto grid grid-cols-2 gap-1.5">
        <div className="rounded-lg bg-[#18181b] p-2"><p className="text-[#a1a1aa]">Checked in</p><p className="text-[12px] font-semibold">412</p></div>
        <div className="rounded-lg bg-[#18181b] p-2"><p className="text-[#a1a1aa]">Sold</p><p className="text-[12px] font-semibold">530</p></div>
      </div>
    </div>
  );
}

function OweMeScreen() {
  const people: [string, number][] = [["Abel", -500], ["Hana", 1200], ["Dawit", -250]];
  return (
    <div className="flex h-full flex-col px-3 pb-3 pt-9 text-[9px]">
      <span className="text-[#a1a1aa]">OweMe</span>
      <span className="text-[11px] font-semibold">Balances</span>
      <div className="mt-2.5 rounded-xl bg-[#e4e4e7] p-2.5 text-black">
        <p className="opacity-70">Net</p>
        <p className="text-[14px] font-semibold">+450 ETB</p>
        <p className="opacity-70">You&apos;re owed more than you owe</p>
      </div>
      <div className="mt-2 space-y-1.5">
        {people.map(([name, amt]) => (
          <div key={name} className="flex items-center gap-2 rounded-lg bg-[#18181b] p-1.5">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#27272a] text-[9px] font-semibold">{name[0]}</span>
            <span className="flex-1">{name}</span>
            <span className={"mono " + (amt < 0 ? "text-[#a1a1aa]" : "text-[#e4e4e7]")}>{amt > 0 ? "+" : ""}{amt} ETB</span>
          </div>
        ))}
      </div>
      <div className="mt-auto grid grid-cols-2 gap-1.5">
        <span className="rounded-full bg-[#fafafa] py-1.5 text-center font-semibold text-black">I lent</span>
        <span className="rounded-full bg-[#18181b] py-1.5 text-center">I borrowed</span>
      </div>
    </div>
  );
}

function Browser({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-[#27272a] bg-[#0a0a0a] text-[#fafafa] shadow-[0_20px_50px_-20px_rgba(0,0,0,.6)]", className)}>
      <div className="flex items-center gap-1.5 border-b border-[#27272a] bg-[#111113] px-3 py-2">
        <span className="size-2 rounded-full bg-[#e4e4e7]" />
        <span className="size-2 rounded-full bg-[#52525b]" />
        <span className="size-2 rounded-full bg-[#27272a]" />
        <span className="mono ml-3 rounded bg-[#18181b] px-2 py-0.5 text-[9px] text-[#a1a1aa]">pazimo.com/organizer</span>
      </div>
      {children}
    </div>
  );
}

function DashboardScreen() {
  const bars = [30, 52, 41, 68, 59, 84, 72, 95, 80, 64, 88, 76];
  return (
    <div className="grid grid-cols-[70px_1fr] text-[9px]">
      <div className="space-y-1.5 border-r border-[#27272a] p-2.5">
        {["Overview", "Events", "Tickets", "RSVPs", "Payouts"].map((t, i) => (
          <div key={t} className={"rounded px-1.5 py-1 " + (i === 0 ? "bg-[#fafafa] text-black" : "text-[#a1a1aa]")}>{t}</div>
        ))}
      </div>
      <div className="p-3">
        <div className="grid grid-cols-3 gap-1.5">
          {[["Revenue", "184,200"], ["Tickets", "2,931"], ["Check-ins", "88%"]].map(([k, v], i) => (
            <div key={k} className={"rounded-lg p-2 " + (i === 0 ? "bg-[#e4e4e7] text-black" : "bg-[#18181b]")}>
              <p className="opacity-70">{k}</p>
              <p className="text-[12px] font-semibold">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-2 flex h-20 items-end gap-1 rounded-lg bg-[#18181b] p-2">
          {bars.map((h, i) => (
            <span key={i} className={"flex-1 rounded-sm " + (i === 7 ? "bg-[#e4e4e7]" : "bg-[#fafafa]/25")} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="mt-2 space-y-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between rounded bg-[#18181b] px-2 py-1">
              <span className="h-1.5 w-20 rounded-full bg-[#fafafa]/50" />
              <span className="mono text-[#a1a1aa]">+{(i + 2) * 350} ETB</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CodeScreen({ project }: { project: Project }) {
  const lines: Record<string, string[]> = {
    "creator-workspace": ["const doc = await local.open(id)", "doc.cues.add({ at: 42, cue: 'pause' })", "await voice.preview(doc)", "await git.commit('draft 3')"],
    yoinker: ["chrome.action.onClicked(save)", "const job = await extract(page)", "// { role, company, salary }", "await board.add(job, 'saved')"],
    "rust-proxy": ["let cfg = Config::load(\"proxy.conf\")?;", "let pool = Registry::from(&cfg.backends);", "// round-robin over healthy backends", "let up = pool.next().expect(\"no backend\");"],
  };
  const code = lines[project.slug] ?? ["// todo"];
  return (
    <div className="mono h-full w-full min-w-0 overflow-hidden rounded-xl border border-[#27272a] bg-[#0a0a0a] p-4 text-[11px] leading-[1.8] text-[#a1a1aa]">
      {code.map((l, i) => (
        <div key={i} className="whitespace-pre">
          <span className="mr-3 text-[#52525b]">{i + 1}</span>
          <span className={l.startsWith("//") ? "text-[#52525b]" : i === 0 ? "text-[#fafafa]" : ""}>{l}</span>
        </div>
      ))}
      
    </div>
  );
}

function ChopScreen() {
  const inputs = [
    ["PDF", "pitch-deck.pdf"],
    ["DOCX", "notes.docx"],
    ["IMG", "whiteboard.png"],
  ];
  const outputs = [
    ["X", "1/ Most ideas die in a notes app. Here's how…"],
    ["in", "Three things I learned shipping a ticketing…"],
    ["r/", "We built a local-first writing tool. AMA"],
    ["▶", "Intro: hook in 5s, then the problem…"],
  ];
  return (
    <div className="grid w-full max-w-[460px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1.35fr)] items-center gap-2 sm:gap-3 text-[10px] text-[#fafafa]">
      <div className="space-y-1.5">
        <p className="mono text-[9px] text-[#a1a1aa]">raw input</p>
        {inputs.map(([t, n]) => (
          <div key={n} className="flex items-center gap-2 rounded-lg border border-[#27272a] bg-[#0a0a0a] px-2 py-1.5">
            <span className="mono rounded bg-[#18181b] px-1 text-[8px] text-[#a1a1aa]">{t}</span>
            <span className="truncate">{n}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="grid size-8 place-items-center rounded-full bg-[#e4e4e7] text-[11px] font-bold text-black">AI</span>
        <span className="mono text-[8px] text-[#a1a1aa]">chop.</span>
      </div>
      <div className="space-y-1.5">
        <p className="mono text-[9px] text-[#a1a1aa]">ready to post</p>
        {outputs.map(([p, t], i) => (
          <div key={p} className={"flex items-center gap-2 rounded-lg px-2 py-1.5 " + (i === 0 ? "bg-[#fafafa] text-black" : "border border-[#27272a] bg-[#0a0a0a]")}>
            <span className={"grid size-4 shrink-0 place-items-center rounded text-[8px] font-bold " + (i === 0 ? "bg-black text-[#fafafa]" : "bg-[#18181b] text-[#e4e4e7]")}>{p}</span>
            <span className="truncate">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


export function Mockup({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={cn("grid min-w-0 place-items-center overflow-hidden rounded-2xl bg-[var(--surface-2)] p-4 sm:p-6", className)}>
      {project.slug === "pazimo" && (
        <Browser className="w-full max-w-[460px]">
          <DashboardScreen />
        </Browser>
      )}
      {project.slug === "pazimo-mobile" && (
        <Phone>
          <AttendeeScreen />
        </Phone>
      )}
      {project.slug === "pazimo-organizer" && (
        <Phone>
          <OrganizerScreen />
        </Phone>
      )}
      {project.slug === "oweme" && (
        <Phone>
          <OweMeScreen />
        </Phone>
      )}
      {project.slug === "chop" && <ChopScreen />}
      {project.platform === "tool" && !["oweme", "chop"].includes(project.slug) && <CodeScreen project={project} />}
    </div>
  );
}
