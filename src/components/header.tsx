"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mark } from "@/components/mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";

const links = [
  { href: "/services/", label: "Services" },
  { href: "/gallery/", label: "Gallery" },
  // Four links do not fit beside the mark on the narrowest phones; the footer and the home page link to it too.
  { href: "/about/", label: "About", className: "max-[359px]:hidden" },
  { href: "/contact/", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  // On the home page the header floats over the hero photo (white text, no background); elsewhere it is a white bar.
  const overHero = pathname === "/";

  return (
    <header
      // The name pins the header in place while pages change (see "Page changes" in globals.css).
      style={{ viewTransitionName: "site-header", ...(overHero ? ({ "--nav-hover": "#fff" } as React.CSSProperties) : {}) }}
      className={
        overHero
          ? "absolute inset-x-0 top-0 z-20 border-b border-white/15 text-white"
          : "relative z-10 border-b border-line bg-page"
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        {/* On phones only the mark fits beside the four links; the name is still read out. */}
        <Link
          href="/"
          className={`inline-flex min-h-11 items-center gap-3 font-display text-xl sm:text-2xl ${overHero ? "text-white" : "text-ink"}`}
        >
          <Mark className="h-9 w-9 sm:h-10 sm:w-10" />
          <span className="sr-only min-[440px]:not-sr-only">{site.name}</span>
        </Link>
        <nav aria-label="Main" className="flex shrink-0 items-center gap-4 sm:gap-8">
          {links.map((l) => {
            const active = pathname.startsWith(l.href.slice(0, -1));
            const tone = overHero
              ? active
                ? "font-semibold text-white"
                : "text-white/85"
              : active
                ? "font-semibold text-ink"
                : "text-ink-soft";
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`nav-link inline-flex min-h-11 items-center text-[0.9375rem] min-[400px]:text-base ${tone} ${"className" in l ? l.className : ""}`}
              >
                {l.label}
              </Link>
            );
          })}
          {/* Below 768px there is no room beside the four links; the footer has the switch too. */}
          <ThemeToggle className="-mr-2 hidden h-11 w-11 rounded-full hover:bg-current/10 md:inline-flex" />
        </nav>
      </div>
    </header>
  );
}
