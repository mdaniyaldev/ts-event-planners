"use client";

import { useRef } from "react";
import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";
import { heroPhoto } from "@/lib/photos";
import { useIntroReady } from "@/components/intro";

const LAY = [0.22, 0.7, 0.2, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const ready = useIntroReady();
  const headingRef = useRef<HTMLHeadingElement>(null);

  // The highlight follows the pointer by writing two CSS variables directly,
  // so moving the mouse never re-renders React.
  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    const el = headingRef.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <section
      onPointerMove={onPointerMove}
      className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:pt-28"
    >
      {/* The wipe runs left to right, once, as the curtain opens (or straight away on later visits). */}
      <m.h1
        ref={headingRef}
        data-laid={ready}
        className="foil-text font-display text-[clamp(2.9rem,10vw,9.5rem)] leading-[0.98] tracking-[-0.01em] pb-[0.08em]"
        initial={reduce ? false : { clipPath: "inset(-10% 100% -10% -2%)" }}
        animate={{ clipPath: ready ? "inset(-10% -2% -10% -2%)" : "inset(-10% 100% -10% -2%)" }}
        transition={{ duration: 1.3, ease: LAY }}
      >
        We manage,
        <br />
        you celebrate.
      </m.h1>

      <m.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8, delay: ready ? 1.1 : 0 }}
      >
        <div className="mt-10 grid gap-8 sm:mt-14 md:grid-cols-[minmax(0,36rem)_auto] md:items-end md:justify-between">
          <p className="max-w-[36rem] text-lg text-ink-soft sm:text-xl">
            TS Event Planners designs and runs weddings, mehndis, receptions and birthdays in Karachi. Tell us the date
            and the guest count, and we take care of the rest.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/contact/"
              className="gold-fill inline-flex min-h-12 items-center px-7 text-base font-semibold transition-colors hover:bg-gold-foil"
            >
              Plan your event
            </Link>
            <Link
              href="/gallery/"
              className="inline-flex min-h-11 items-center text-base font-semibold text-gold-deep underline decoration-gold decoration-2 underline-offset-[6px] hover:text-ink"
            >
              See our events
            </Link>
          </div>
        </div>

        {/* stage-open: CSS scroll animation that widens the photo from the middle as it scrolls in. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroPhoto.src}
          alt={heroPhoto.alt}
          width={heroPhoto.w}
          height={heroPhoto.h}
          fetchPriority="high"
          className="stage-open mt-14 aspect-[4/3] w-full object-cover sm:mt-20 md:aspect-[16/9]"
        />
      </m.div>
    </section>
  );
}
