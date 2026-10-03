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
    <div className="grid rounded-md bg-[#ede9e1] p-1.5" style={{ width: size, height: size, gridTemplateColumns: `repeat(${n},1fr)` }}>
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
    <div className={cn("relative mx-auto aspect-[9/19] w-[190px] rounded-[34px] border-[6px] border-[#1d1d1b] bg-black p-0 shadow-[0_20px_50px_-20px_rgba(0,0,0,.6)]", className)}>
      <div className="absolute left-1/2 top-2 z-10 h-[18px] w-[64px] -translate-x-1/2 rounded-full bg-[#1d1d1b]" />
      <div className="relative h-full overflow-hidden rounded-[28px] bg-[#0d0d0c] text-[#ede9e1]">{children}</div>
    </div>
  );
}

function AttendeeScreen() {
  return (
    <div className="flex h-full flex-col px-3 pb-3 pt-9 text-[9px]">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold">Discover</span>
        <span className="size-5 rounded-full bg-[#d97e3a]" />
      </div>
      <div className="mt-2 flex gap-1">
        {["All", "Music", "Cinema", "Tech"].map((t, i) => (
          <span key={t} className={"rounded-full px-2 py-0.5 " + (i === 0 ? "bg-[#ede9e1] text-black" : "bg-[#1d1d1b] text-[#8f8a81]")}>{t}</span>
        ))}
      </div>
      <div className="mt-2.5 rounded-xl bg-[#d97e3a] p-2.5 text-black">
        <div className="h-12 rounded-lg bg-black/15" />
        <p className="mt-1.5 text-[10px] font-semibold">Addis Jazz Night</p>
        <p className="opacity-70">Sat · 8:00 PM · from 500 ETB</p>
      </div>
      <div className="mt-2 space-y-1.5">
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg bg-[#1d1d1b] p-1.5">
            <span className="size-7 shrink-0 rounded-md bg-[#2a2a27]" />
            <span className="flex-1 space-y-1">
              <span className="block h-1.5 w-3/4 rounded-full bg-[#ede9e1]/70" />
              <span className="block h-1.5 w-1/2 rounded-full bg-[#8f8a81]/50" />
            </span>
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-center gap-2 rounded-xl bg-[#ede9e1] p-2 text-black">
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
      <span className="text-[#8f8a81]">Usher · Addis Jazz Night</span>
      <span className="text-[11px] font-semibold">Scan tickets</span>
      <div className="relative mt-2.5 grid aspect-square place-items-center rounded-xl bg-[#1d1d1b]">
        <div className="relative size-[70%]">
          {["left-0 top-0 border-l-2 border-t-2", "right-0 top-0 border-r-2 border-t-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((c) => (
            <span key={c} className={"absolute size-5 rounded-sm border-[#d97e3a] " + c} />
          ))}
          <div className="absolute inset-3 grid place-items-center opacity-90"><QR size={70} seed={11} /></div>
          <span className="scanline absolute inset-x-1 h-0.5 bg-[#d97e3a]" />
        </div>
      </div>
      <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-[#d97e3a] p-2 text-black">
        <span className="grid size-5 place-items-center rounded-full bg-black text-[10px] text-[#d97e3a]">✓</span>
        <span><span className="block font-semibold">Valid · VIP</span><span className="opacity-70">Checked in 21:04</span></span>
      </div>
      <div className="mt-auto grid grid-cols-2 gap-1.5">
        <div className="rounded-lg bg-[#1d1d1b] p-2"><p className="text-[#8f8a81]">Checked in</p><p className="text-[12px] font-semibold">412</p></div>
        <div className="rounded-lg bg-[#1d1d1b] p-2"><p className="text-[#8f8a81]">Sold</p><p className="text-[12px] font-semibold">530</p></div>
      </div>
    </div>
  );
}

function Browser({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-[#2a2a27] bg-[#0d0d0c] text-[#ede9e1] shadow-[0_20px_50px_-20px_rgba(0,0,0,.6)]", className)}>
      <div className="flex items-center gap-1.5 border-b border-[#2a2a27] bg-[#151514] px-3 py-2">
        <span className="size-2 rounded-full bg-[#d97e3a]" />
        <span className="size-2 rounded-full bg-[#57534d]" />
        <span className="size-2 rounded-full bg-[#2a2a27]" />
        <span className="mono ml-3 rounded bg-[#1d1d1b] px-2 py-0.5 text-[9px] text-[#8f8a81]">pazimo.com/organizer</span>
      </div>
      {children}
    </div>
  );
}

function DashboardScreen() {
  const bars = [30, 52, 41, 68, 59, 84, 72, 95, 80, 64, 88, 76];
  return (
    <div className="grid grid-cols-[70px_1fr] text-[9px]">
      <div className="space-y-1.5 border-r border-[#2a2a27] p-2.5">
        {["Overview", "Events", "Tickets", "RSVPs", "Payouts"].map((t, i) => (
          <div key={t} className={"rounded px-1.5 py-1 " + (i === 0 ? "bg-[#ede9e1] text-black" : "text-[#8f8a81]")}>{t}</div>
        ))}
      </div>
      <div className="p-3">
        <div className="grid grid-cols-3 gap-1.5">
          {[["Revenue", "184,200"], ["Tickets", "2,931"], ["Check-ins", "88%"]].map(([k, v], i) => (
            <div key={k} className={"rounded-lg p-2 " + (i === 0 ? "bg-[#d97e3a] text-black" : "bg-[#1d1d1b]")}>
              <p className="opacity-70">{k}</p>
              <p className="text-[12px] font-semibold">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-2 flex h-20 items-end gap-1 rounded-lg bg-[#1d1d1b] p-2">
          {bars.map((h, i) => (
            <span key={i} className={"flex-1 rounded-sm " + (i === 7 ? "bg-[#d97e3a]" : "bg-[#ede9e1]/25")} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="mt-2 space-y-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between rounded bg-[#1d1d1b] px-2 py-1">
              <span className="h-1.5 w-20 rounded-full bg-[#ede9e1]/50" />
              <span className="mono text-[#8f8a81]">+{(i + 2) * 350} ETB</span>
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
    oweme: ["ledger.append({", "  from: 'abel', amount: 500,", "})", "balance('abel') // → -500 ETB"],
  };
  const code = lines[project.slug] ?? ["// todo"];
  return (
    <div className="mono h-full rounded-xl border border-[#2a2a27] bg-[#0d0d0c] p-4 text-[11px] leading-[1.8] text-[#8f8a81]">
      {code.map((l, i) => (
        <div key={i} className="whitespace-pre">
          <span className="mr-3 text-[#57534d]">{i + 1}</span>
          <span className={l.startsWith("//") ? "text-[#57534d]" : i === 0 ? "text-[#ede9e1]" : ""}>{l}</span>
        </div>
      ))}
      <span className="caret mt-1" />
    </div>
  );
}

export function Mockup({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={cn("grid place-items-center overflow-hidden rounded-2xl bg-[var(--surface-2)] p-6", className)}>
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
      {project.platform === "tool" && <CodeScreen project={project} />}
    </div>
  );
}
