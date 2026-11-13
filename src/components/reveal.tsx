"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  /** Seconds to wait before starting, used to stagger items in a list. */
  delay?: number;
  className?: string;
};

// One observer for every revealed element on the page.
let observer: IntersectionObserver | null = null;
function observe(el: HTMLElement) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        (e.target as HTMLElement).dataset.reveal = "shown";
        observer?.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px" },
  );
  observer.observe(el);
}

/**
 * Content that is below the fold when the page opens fades and lifts into place the first time it
 * scrolls into view (see [data-reveal] in globals.css). Content already on screen when the page
 * opens is left alone: the page transition is its entrance, so it never animates twice.
 * Without JavaScript everything simply shows.
 */
function useReveal() {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // The same line the observer uses, so nothing sits in a gap between "on screen" and "watched".
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      el.dataset.reveal = "shown";
      return;
    }
    el.dataset.reveal = "hidden";
    // Observe on the next frame so the hidden state is painted before the transition to shown.
    const frame = requestAnimationFrame(() => observe(el));
    return () => {
      cancelAnimationFrame(frame);
      observer?.unobserve(el);
    };
  }, []);
  return ref;
}

export function Reveal({ children, delay = 0, className }: Props) {
  const ref = useReveal();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      data-reveal="pending"
      className={className}
      style={{ "--d": `${delay}s` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

/** The same, as a list item, so lists keep valid markup. */
export function RevealItem({ children, delay = 0, className }: Props) {
  const ref = useReveal();
  return (
    <li
      ref={ref as React.RefObject<HTMLLIElement>}
      data-reveal="pending"
      className={className}
      style={{ "--d": `${delay}s` } as React.CSSProperties}
    >
      {children}
    </li>
  );
}
