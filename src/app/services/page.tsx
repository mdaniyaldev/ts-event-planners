import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { Process } from "@/components/process";
import { RevealImage } from "@/components/reveal-image";
import { CtaBand } from "@/components/cta-band";
import { photoRef } from "@/lib/photos";
import { services } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Wedding, mehndi, reception and birthday planning in ${site.city}. See what we set up for each kind of event.`,
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro title="Services">
        Weddings, mehndis, receptions and birthdays in {site.city}. Choose an event to see what we set up for it.
      </PageIntro>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28">
        <ul>
          {services.map((s, i) => {
            const photo = photoRef(s.photo.n, s.photo.alt);
            return (
              <li
                key={s.slug}
                className="grid items-center gap-8 border-t border-gold/60 py-10 md:grid-cols-12 md:gap-12 md:py-14"
              >
                {/* Photo sides alternate down the page so the list has a rhythm. */}
                <div className={`md:col-span-6 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <RevealImage
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.w}
                    height={photo.h}
                    priority={i === 0}
                    className="aspect-[4/3] object-cover"
                  />
                </div>
                <div className="md:col-span-6">
                  <h2 className="font-display text-3xl leading-tight sm:text-4xl">{s.title}</h2>
                  <p className="mt-4 max-w-[34rem] text-ink-soft">{s.summary}</p>
                  <ul className="mt-6 grid gap-x-8 gap-y-2 text-base sm:grid-cols-2">
                    {s.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[0.8em] h-0.5 w-3 shrink-0 bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/services/${s.slug}/`}
                    className="mt-4 inline-flex min-h-11 items-center text-base font-semibold text-gold-deep underline decoration-gold decoration-2 underline-offset-[6px] hover:text-ink"
                  >
                    More about {s.title.toLowerCase()}
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <Process />
      <CtaBand />
    </>
  );
}
