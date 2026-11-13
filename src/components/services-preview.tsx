import Link from "next/link";
import { Reveal, RevealItem } from "@/components/reveal";
import { photoRef } from "@/lib/photos";
import { services } from "@/lib/content";

/** Home page: the four event types, each linking to its own page. */
export function ServicesPreview() {
  return (
    <section className="border-t border-line bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">What we plan</h2>
          <Link
            href="/services/"
            className="inline-flex min-h-11 items-center text-base font-semibold link-gold"
          >
            See all services
          </Link>
        </Reveal>

        <ul className="mt-12 grid gap-x-8 gap-y-14 sm:mt-16 md:grid-cols-2">
          {services.map((s, i) => {
            const photo = photoRef(s.photo.n, s.photo.alt);
            return (
              // The two items in a row arrive one after the other.
              <RevealItem key={s.slug} delay={(i % 2) * 0.12} className="group relative md:[&:nth-child(even)]:mt-16">
                {/* The whole card is the link, so hovering anywhere zooms the photo and underlines the title. */}
                <div className="overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.w}
                    height={photo.h}
                    loading="lazy"
                    decoding="async"
                    className="block aspect-[4/3] w-full object-cover transition-[scale] duration-700 ease-out group-hover:scale-[1.07] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
                <h3 className="mt-5 font-display text-3xl leading-tight">
                  {/* The link stretches over the whole item so the photo is clickable too. */}
                  <Link
                    href={`/services/${s.slug}/`}
                    className="underline decoration-transparent decoration-2 underline-offset-[6px] transition-[text-decoration-color,text-underline-offset] duration-300 after:absolute after:inset-0 group-hover:decoration-gold group-hover:underline-offset-8"
                  >
                    {s.title}
                  </Link>
                </h3>
                <p className="mt-2 max-w-[32rem] text-ink-soft">{s.summary}</p>
              </RevealItem>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
