import Link from "next/link";
import { InstagramIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/reveal";
import { allPhotos } from "@/lib/photos";
import { site } from "@/lib/site";

// Nine photos in the style of the client's Instagram feed: floral stages, arches, lawns and hanging lights.
const featuredIds = [16, 153, 5, 136, 95, 147, 72, 165, 13].map((n) => `p${String(n).padStart(3, "0")}`);

/** Home page: a square grid of recent events, laid out like the client's Instagram. */
export function FeaturedWork() {
  const featured = featuredIds.flatMap((id) => allPhotos.filter((p) => p.id === id));

  return (
    <section className="border-t border-line bg-leaf py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">Recent events</h2>
          <Link
            href="/gallery/"
            className="inline-flex min-h-11 items-center text-base font-semibold link-gold"
          >
            See all photos and videos
          </Link>
        </Reveal>

        <ul className="mt-12 grid grid-cols-3 gap-1 sm:mt-16 sm:gap-2 lg:gap-3">
          {featured.map((p, i) => (
            // Tiles arrive one by one across each row.
            <RevealItem key={p.id} delay={(i % 3) * 0.08}>
              <Link href="/gallery/" className="img-zoom block bg-page">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.thumb}
                  alt={p.alt}
                  width={p.w}
                  height={p.h}
                  loading="lazy"
                  decoding="async"
                  className="block aspect-square h-auto w-full object-cover"
                />
              </Link>
            </RevealItem>
          ))}
        </ul>

        <a
          href={site.instagram}
          target="_blank"
          rel="noopener"
          className="mt-8 inline-flex min-h-11 items-center gap-2 text-base font-semibold link-gold"
        >
          <InstagramIcon className="h-5 w-5" />
          More on Instagram, {site.instagramHandle}
        </a>
      </div>
    </section>
  );
}
