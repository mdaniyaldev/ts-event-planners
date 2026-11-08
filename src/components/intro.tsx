"use client";

import { useLayoutEffect, useState } from "react";
import { site } from "@/lib/site";

const PLAYED_KEY = "ts-intro-played";
const OPEN_EVENT = "ts:intro-open";

function shouldPlay() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return !sessionStorage.getItem(PLAYED_KEY);
  } catch {
    return false; // storage blocked: skip the intro rather than replay it on every page
  }
}

/**
 * Gold stage curtains that part on the first visit of a session.
 * Render it on the home page next to <Hero />, which waits for `useIntroReady`.
 */
export function CurtainIntro() {
  const [playing, setPlaying] = useState(false);

  useLayoutEffect(() => {
    if (!shouldPlay()) return;
    setPlaying(true);

    // The panels start sliding at 0.7s; let the headline begin as they do.
    const open = setTimeout(() => {
      try {
        sessionStorage.setItem(PLAYED_KEY, "1");
      } catch {}
      window.dispatchEvent(new Event(OPEN_EVENT));
    }, 700);
    const done = setTimeout(() => setPlaying(false), 1900);
    return () => {
      clearTimeout(open);
      clearTimeout(done);
    };
  }, []);

  if (!playing) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <div className="curtain curtain-l absolute inset-y-0 left-0 w-1/2" />
      <div className="curtain curtain-r absolute inset-y-0 right-0 w-1/2" />
      <p className="curtain-mark absolute inset-0 grid place-items-center font-display text-4xl text-ink sm:text-6xl">
        {site.name}
      </p>
    </div>
  );
}

/** True once the hero may start animating: right away, or after the curtain opens. */
export function useIntroReady() {
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    if (!shouldPlay()) {
      setReady(true);
      return;
    }
    const go = () => setReady(true);
    window.addEventListener(OPEN_EVENT, go, { once: true });
    const failsafe = setTimeout(go, 3000); // never leave the headline hidden
    return () => {
      window.removeEventListener(OPEN_EVENT, go);
      clearTimeout(failsafe);
    };
  }, []);

  return ready;
}
