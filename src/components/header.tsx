"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

const links = [
  { href: "/services/", label: "Services" },
  { href: "/gallery/", label: "Gallery" },
  { href: "/contact/", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" className="inline-flex min-h-11 items-center font-display text-lg text-ink min-[400px]:text-xl sm:text-2xl">
          {site.name}
        </Link>
        <nav aria-label="Main" className="flex shrink-0 items-center gap-3 min-[400px]:gap-4 sm:gap-8">
          {links.map((l) => {
            const active = pathname.startsWith(l.href.slice(0, -1));
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 items-center border-b-2 text-[0.9375rem] min-[400px]:text-base ${
                  active ? "border-gold font-semibold text-ink" : "border-transparent text-ink-soft hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
