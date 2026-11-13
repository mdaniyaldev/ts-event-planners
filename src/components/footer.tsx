import Link from "next/link";
import { Mark } from "@/components/mark";
import { InstagramIcon, WhatsAppIcon, YouTubeIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { site, whatsappHref } from "@/lib/site";
import { services } from "@/lib/content";

const link = "foot-link inline-flex min-h-11 items-center gap-2";

export function Footer() {
  return (
    <footer className="border-t border-line bg-leaf">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Mark className="h-12 w-12" />
          <p className="mt-4 font-display text-2xl text-ink">{site.name}</p>
          <p className="mt-2 max-w-[22rem] text-ink-soft">
            {site.tagline}. Weddings, mehndis, receptions and birthdays in {site.city}, Pakistan.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-base font-semibold">Pages</p>
          <ul className="mt-3 space-y-1 text-base text-ink-soft">
            <li>
              <Link href="/services/" className={link}>
                Services
              </Link>
            </li>
            {services.map((s) => (
              <li key={s.slug} className="pl-4">
                <Link href={`/services/${s.slug}/`} className={link}>
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/gallery/" className={link}>
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/about/" className={link}>
                About us
              </Link>
            </li>
            <li>
              <Link href="/contact/" className={link}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-base font-semibold">Follow us</p>
          <ul className="mt-3 space-y-1 text-base text-ink-soft">
            <li>
              <a href={site.instagram} target="_blank" rel="noopener" className={link}>
                <InstagramIcon />
                Instagram
              </a>
            </li>
            <li>
              <a href={site.youtube} target="_blank" rel="noopener" className={link}>
                <YouTubeIcon />
                YouTube
              </a>
            </li>
            <li>
              <a href={whatsappHref()} target="_blank" rel="noopener" className={link}>
                <WhatsAppIcon />
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-base font-semibold">Get in touch</p>
          <ul className="mt-3 space-y-1 text-base text-ink-soft">
            {site.phones.map((p) => (
              <li key={p}>
                <a href={`tel:${p.replace(/\s/g, "")}`} className={link}>
                  {p}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className={link}>
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
      {/* The name once more, very large and only a shade darker than the page, like an embossed stamp. */}
      <div aria-hidden="true" className="select-none overflow-hidden">
        <p className="mx-auto max-w-7xl whitespace-nowrap px-5 font-display text-[clamp(2rem,10.5vw,9rem)] font-medium leading-[1.08] text-wash sm:px-8">
          {site.name}
        </p>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-1 px-5 py-3 text-base text-ink-soft sm:px-8">
          <p>
            Copyright {site.year} {site.name}
          </p>
          {/* Dark theme switch. The header has one too from 768px up; this is the one phones get. */}
          <ThemeToggle label="Dark mode" className="-mx-2 inline-flex px-2" />
        </div>
      </div>
    </footer>
  );
}
