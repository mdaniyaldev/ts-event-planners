"use client";

import { useRef } from "react";
import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";
import { heroSlides } from "@/lib/photos";
import { site, whatsappHref } from "@/lib/site";
import { WhatsAppIcon } from "@/components/icons";
import { useIntroReady } from "@/components/intro";

const LAY = [0.22, 0.7, 0.2, 1] as const;

/**
 * The home hero: the client's night photos fill the screen and change slowly, one crossfading into the
 * next (CSS only, see .hero-slide in globals.css), with the gold tagline laid over them the way their logo
 * sits gold on black. Landscape screens get the wide photos, phones the tall ones. The header sits on top
 * of the photo (see header.tsx). The first slide is the only one that is not hidden when reduced motion is on.
 */
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
      className="relative isolate flex min-h-[max(34rem,min(100svh,58rem))] flex-col justify-end bg-ink text-white"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {heroSlides.map((s, i) => (
          <picture key={s.wide.src} className="hero-slide" style={{ "--i": i } as React.CSSProperties}>
            <source media="(min-width: 768px)" srcSet={s.wide.src} width={s.wide.w} height={s.wide.h} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.tall.src}
              // The slides are the same kind of picture; only the first one is described.
              alt={i === 0 ? s.wide.alt : ""}
              width={s.tall.w}
              height={s.tall.h}
              fetchPriority={i === 0 ? "high" : "auto"}
              className="h-full w-full object-cover object-[center_30%] md:object-center"
            />
          </picture>
        ))}
      </div>
      {/* Darkens the top (under the header) and the lower part so the gold headline and the white copy stay readable on any photo. */}
      <div aria-hidden="true" className="hero-shade absolute inset-0 -z-10" />

      <div className="mx-auto w-full max-w-7xl px-5 pb-12 pt-52 sm:px-8 sm:pb-16 sm:pt-48">
        {/* The wipe runs left to right, once, as the curtain opens (or straight away on later visits). */}
        <m.h1
          ref={headingRef}
          data-laid={ready}
          className="foil-text font-display text-[clamp(3.2rem,9.5vw,8.75rem)] font-semibold leading-[0.95] tracking-[-0.01em] pb-[0.08em]"
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
          className="mt-8 grid gap-7 md:grid-cols-[minmax(0,34rem)_auto] md:items-end md:justify-between"
        >
          <p className="max-w-[34rem] text-lg text-white/85 sm:text-xl">
            Weddings, mehndis, receptions and birthdays across {site.city}, set up before your guests arrive. Tell us
            the date and the guest count, and we take care of the rest.
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link
              href="/contact/"
              className="btn-gold inline-flex min-h-12 items-center px-7 text-base font-semibold"
            >
              Plan your event
            </Link>
            <a
              href={whatsappHref(`Salam, I would like to plan an event in ${site.city}.`)}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center gap-2 text-base font-semibold link-light"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Message on WhatsApp
            </a>
          </div>
        </m.div>
      </div>
    </section>
  );
}
