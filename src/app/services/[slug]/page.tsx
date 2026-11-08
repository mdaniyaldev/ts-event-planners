import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import { byCategory, filterHref, photoRef } from "@/lib/photos";
import { services } from "@/lib/content";
import { site } from "@/lib/site";

type Params = { slug: string };

// Only the four known events exist; any other /services/<x>/ is a 404.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: `${service.summary} ${site.name}, ${site.city}.`,
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const cover = photoRef(service.photo.n, service.photo.alt);
  const more = byCategory[service.filter];
  const strip = more.filter((p) => p.id !== `p${String(service.photo.n).padStart(3, "0")}`).slice(0, 6);
  const others = services.filter((s) => s.slug !== slug);

  return (
    <>
      <article className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-14">
        <Link href="/services/" className="inline-flex min-h-11 items-center text-base font-semibold text-gold-deep hover:text-ink">
          All services
        </Link>

        <div className="mt-4 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <h1 className="font-display text-5xl leading-[1.05] sm:text-6xl">{service.title}</h1>
            <p className="mt-6 max-w-[34rem] text-lg text-ink-soft sm:text-xl">{service.summary}</p>

            <h2 className="mt-10 font-display text-2xl">What we set up</h2>
            <ul className="mt-4 space-y-2 text-base">
              {service.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.8em] h-0.5 w-3 shrink-0 bg-gold" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/contact/"
                className="gold-fill inline-flex min-h-12 items-center px-7 text-base font-semibold transition-colors hover:bg-gold-foil"
              >
                Plan your event
              </Link>
              <Link
                href={filterHref(service.filter)}
                className="inline-flex min-h-11 items-center text-base font-semibold text-gold-deep underline decoration-gold decoration-2 underline-offset-[6px] hover:text-ink"
              >
                See all {service.title.toLowerCase()} photos
              </Link>
            </div>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cover.src}
            alt={cover.alt}
            width={cover.w}
            height={cover.h}
            fetchPriority="high"
            className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
          />
        </div>
      </article>

      {strip.length > 0 && (
        <section className="border-t border-line bg-leaf py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <h2 className="font-display text-4xl leading-tight sm:text-5xl">From our events</h2>
              <Link
                href={filterHref(service.filter)}
                className="inline-flex min-h-11 items-center text-base font-semibold text-gold-deep underline decoration-gold decoration-2 underline-offset-[6px] hover:text-ink"
              >
                See all {more.length} photos
              </Link>
            </div>
            <div className="mt-12 gap-5 sm:mt-16 sm:columns-2 lg:columns-3 [&>*]:mb-5">
              {strip.map((p) => (
                <Link
                  key={p.id}
                  href={filterHref(service.filter)}
                  className="block break-inside-avoid overflow-hidden border border-line bg-white"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.thumb}
                    alt={p.alt}
                    width={p.w}
                    height={p.h}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-line bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-display text-3xl leading-tight">Other events we plan</h2>
          <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-2">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}/`}
                  className="inline-block py-2 text-lg font-semibold text-gold-deep underline decoration-gold decoration-2 underline-offset-[6px] hover:text-ink"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
