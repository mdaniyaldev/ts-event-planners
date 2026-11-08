import Link from "next/link";
import { RevealImage } from "@/components/reveal-image";
import { photoRef } from "@/lib/photos";
import { services } from "@/lib/content";

/** Home page: the four event types, each linking to its own page. */
export function ServicesPreview() {
  return (
    <section className="border-t border-line bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">What we plan</h2>
          <Link
            href="/services/"
            className="inline-flex min-h-11 items-center text-base font-semibold text-gold-deep underline decoration-gold decoration-2 underline-offset-[6px] hover:text-ink"
          >
            See all services
          </Link>
        </div>

        <ul className="mt-12 grid gap-x-8 gap-y-14 sm:mt-16 md:grid-cols-2">
          {services.map((s) => {
            const photo = photoRef(s.photo.n, s.photo.alt);
            return (
              <li key={s.slug} className="relative">
                <RevealImage
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.w}
                  height={photo.h}
                  className="aspect-[4/3] object-cover"
                />
                <h3 className="mt-5 font-display text-3xl leading-tight">
                  {/* The link stretches over the whole item so the photo is clickable too. */}
                  <Link href={`/services/${s.slug}/`} className="after:absolute after:inset-0 hover:underline hover:decoration-gold hover:decoration-2 hover:underline-offset-4">
                    {s.title}
                  </Link>
                </h3>
                <p className="mt-2 max-w-[32rem] text-ink-soft">{s.summary}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
