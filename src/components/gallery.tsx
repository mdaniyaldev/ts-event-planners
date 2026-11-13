"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { Highlights } from "@/components/highlights";
import { Reveal } from "@/components/reveal";
import { photosFor, videos, type Filter, type Photo } from "@/lib/photos";

const PAGE = 12;

/** One page of the gallery. Each category has its own URL, so `filter` comes from the route. */
export function GalleryView({ filter, intro }: { filter: Filter; intro: string }) {
  const [count, setCount] = useState(PAGE);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const list = filter === "Videos" ? [] : photosFor(filter);
  const shown = list.slice(0, count);

  const close = useCallback(() => {
    setOpenIndex(null);
    lastTrigger.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div>
      <header className="mx-auto max-w-7xl px-5 pb-10 pt-14 sm:px-8 sm:pb-12 sm:pt-20">
        <Reveal>
          <h1 className="font-display text-5xl leading-[1.05] sm:text-6xl">{filter === "All" ? "Our events" : filter}</h1>
          <p className="mt-5 max-w-[40rem] text-lg text-ink-soft sm:text-xl">{intro}</p>
        </Reveal>

        <div className="mt-10">
          <Highlights active={filter} withAll />
        </div>
      </header>

      <section className="border-t border-line bg-leaf py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
            {filter === "Videos"
              ? videos.map((v, i) => (
                  <Reveal key={v.id} delay={(i % 3) * 0.08} className="break-inside-avoid border border-line bg-white">
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      // #t=1 makes browsers show a real frame as the cover instead of a black box.
                      src={`${v.src}#t=1`}
                      aria-label={`Event video ${i + 1}`}
                      className="block h-auto w-full bg-ink"
                    />
                  </Reveal>
                ))
              : shown.map((p, i) => (
                  // Photos fade up as they scroll into view, including the ones "Show more" adds.
                  <Reveal key={p.id} delay={(i % 3) * 0.08} className="break-inside-avoid">
                    <button
                      type="button"
                      aria-haspopup="dialog"
                      aria-label={`Open photo ${i + 1} of ${list.length}`}
                      onClick={(e) => {
                        lastTrigger.current = e.currentTarget;
                        setOpenIndex(i);
                      }}
                      className="img-zoom block w-full cursor-zoom-in border border-line bg-white"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.thumb}
                        alt={p.alt}
                        width={p.w}
                        height={p.h}
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-full"
                      />
                    </button>
                  </Reveal>
                ))}
          </div>

          {filter !== "Videos" && (
            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
              {count < list.length && (
                <button
                  type="button"
                  onClick={() => setCount((c) => c + PAGE)}
                  className="btn-gold inline-flex min-h-12 items-center px-7 text-base font-semibold"
                >
                  Show {Math.min(PAGE, list.length - count)} more photos
                </button>
              )}
              <p role="status" className="text-base text-ink-soft">
                Showing {shown.length} of {list.length} photos
              </p>
            </div>
          )}
        </div>
      </section>

      {openIndex !== null && list[openIndex] && (
        <Lightbox
          photos={list}
          index={openIndex}
          onIndex={(i) => {
            setOpenIndex(i);
            // keep the grid long enough that closing lands on the photo you were looking at
            setCount((c) => Math.max(c, i + 1));
          }}
          onClose={close}
        />
      )}
    </div>
  );
}

function Lightbox({
  photos,
  index,
  onIndex,
  onClose,
}: {
  photos: Photo[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const photo = photos[index];
  const hasPrev = index > 0;
  const hasNext = index < photos.length - 1;

  // -1 when going back, 1 when going forward, 0 for the photo that was opened first.
  const lastIndex = useRef(index);
  const direction = Math.sign(index - lastIndex.current);
  useEffect(() => {
    lastIndex.current = index;
  }, [index]);

  useEffect(() => {
    closeBtn.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") return onClose();
      if (e.key === "ArrowLeft" && hasPrev) return onIndex(index - 1);
      if (e.key === "ArrowRight" && hasNext) return onIndex(index + 1);
      if (e.key !== "Tab" || !panel.current) return;
      // Keep Tab inside the dialog.
      const focusable = panel.current.querySelectorAll<HTMLElement>("button:not([disabled])");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, hasPrev, hasNext, onIndex, onClose]);

  const nav =
    "min-h-11 px-4 text-base font-semibold text-white transition-colors hover:text-gold-foil focus-visible:text-gold-foil disabled:cursor-not-allowed disabled:opacity-30";

  return (
    <m.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={`${photo.category}, photo ${index + 1} of ${photos.length}`}
        className="flex h-full w-full max-w-6xl flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between text-white">
          <p className="px-4 text-base">
            {photo.category}
            <span className="text-white/70">
              {" "}
              ({index + 1} of {photos.length})
            </span>
          </p>
          <button ref={closeBtn} type="button" onClick={onClose} className={nav}>
            Close
          </button>
        </div>

        <div className="relative min-h-0 flex-1">
          {/* The new photo slides in from the side you are heading towards; the first one just fades in. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <m.img
            key={photo.id}
            src={photo.large}
            alt={photo.alt}
            initial={{ opacity: 0, x: direction * 56 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 0.7, 0.2, 1] }}
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>

        <div className="flex items-center justify-between">
          <button type="button" className={nav} disabled={!hasPrev} onClick={() => onIndex(index - 1)}>
            Previous
          </button>
          <button type="button" className={nav} disabled={!hasNext} onClick={() => onIndex(index + 1)}>
            Next
          </button>
        </div>
      </div>
    </m.div>
  );
}
