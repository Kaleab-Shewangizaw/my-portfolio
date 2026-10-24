"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";

const INTERVAL = 4500;

/** Screenshots that advance on their own; pauses on hover, focus or a hidden tab. Swipe or use the arrows to browse, tap to see full size. */
export function Slideshow({ images, name, className }: { images: string[]; name: string; className?: string }) {
  const reduce = useReducedMotion();
  const [[i, dir], setState] = useState([0, 1]);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(false);
  const many = images.length > 1;

  const go = useCallback((by: number) => setState(([n]) => [(n + by + images.length) % images.length, by]), [images.length]);

  useEffect(() => {
    if (!many || paused || open || reduce) return;
    const t = setInterval(() => !document.hidden && go(1), INTERVAL);
    return () => clearInterval(t);
  }, [many, paused, open, reduce, go, i]);

  // While full size is open: keys browse or close it, and the page behind doesn't scroll.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, go]);

  return (
    <div
      className={cn("group relative overflow-hidden rounded-2xl bg-[var(--surface-2)]", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        // Keys inside the full-size view bubble here through the portal; that view handles its own.
        if (open) return;
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${name} screenshots`}
    >
      <AnimatePresence initial={false} custom={dir}>
        <motion.img
          key={i}
          src={images[i]}
          alt={`${name} screenshot ${i + 1} of ${images.length}`}
          custom={dir}
          variants={{
            enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * 40 }),
            center: { opacity: 1, x: 0 },
            exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * -40 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          drag={many ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onTap={() => setOpen(true)}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50) go(1);
            else if (info.offset.x > 50) go(-1);
          }}
          draggable={false}
          className="absolute inset-0 size-full cursor-zoom-in select-none object-cover object-top"
        />
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="See full size"
        className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition-opacity hover:bg-black/60 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
      >
        <Maximize2 size={15} />
      </button>

      {many && (
        <>
          {[-1, 1].map((by) => (
            <button
              key={by}
              type="button"
              onClick={() => go(by)}
              aria-label={by < 0 ? "Previous screenshot" : "Next screenshot"}
              className={cn(
                "absolute top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition-opacity hover:bg-black/60 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100",
                by < 0 ? "left-3" : "right-3",
              )}
            >
              {by < 0 ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          ))}
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {images.map((_, n) => (
              <button
                key={n}
                type="button"
                onClick={() => setState([n, n > i ? 1 : -1])}
                aria-label={`Show screenshot ${n + 1}`}
                aria-current={n === i}
                className={cn("h-1.5 rounded-full bg-white shadow transition-all", n === i ? "w-5 opacity-100" : "w-1.5 opacity-55 hover:opacity-80")}
              />
            ))}
          </div>
        </>
      )}

      {open &&
        createPortal(
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${name} screenshot ${i + 1} of ${images.length}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={i} src={images[i]} alt={`${name} screenshot ${i + 1} of ${images.length}`} className="max-h-full max-w-full rounded-lg object-contain" onClick={(e) => e.stopPropagation()} />
            <button
              type="button"
              autoFocus
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X size={18} />
            </button>
            {many && (
              <>
                {[-1, 1].map((by) => (
                  <button
                    key={by}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      go(by);
                    }}
                    aria-label={by < 0 ? "Previous screenshot" : "Next screenshot"}
                    className={cn("absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20", by < 0 ? "left-4" : "right-4")}
                  >
                    {by < 0 ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                  </button>
                ))}
                <span className="mono absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/70">
                  {i + 1} / {images.length}
                </span>
              </>
            )}
          </motion.div>,
          document.body,
        )}
    </div>
  );
}
