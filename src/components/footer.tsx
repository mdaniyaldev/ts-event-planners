import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line bg-leaf">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl text-ink">{site.name}</p>
          <p className="mt-2 max-w-[22rem] text-ink-soft">
            {site.tagline}. Weddings, mehndis, receptions and birthdays in {site.city}, Pakistan.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-base font-semibold">Pages</p>
          <ul className="mt-3 space-y-1 text-base text-ink-soft">
            <li>
              <Link href="/services/" className="inline-flex min-h-11 items-center hover:text-ink">
                Services
              </Link>
            </li>
            {services.map((s) => (
              <li key={s.slug} className="pl-4">
                <Link href={`/services/${s.slug}/`} className="inline-flex min-h-11 items-center hover:text-ink">
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/gallery/" className="inline-flex min-h-11 items-center hover:text-ink">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/contact/" className="inline-flex min-h-11 items-center hover:text-ink">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-base font-semibold">Get in touch</p>
          <ul className="mt-3 space-y-1 text-base text-ink-soft">
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="inline-flex min-h-11 items-center hover:text-ink">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center hover:text-ink">
                {site.email}
              </a>
            </li>
            <li className="pt-1">
              {site.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </li>
            <li className="pt-1">{site.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-5 py-5 text-base text-ink-soft sm:px-8">
          Copyright {site.year} {site.name}
        </p>
      </div>
    </footer>
  );
}
