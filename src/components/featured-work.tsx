import Link from "next/link";
import { allPhotos } from "@/lib/photos";

// Photo numbers picked to show a mix of events on the home page.
const featuredIds = [0, 103, 57, 171, 5, 86].map((n) => `p${String(n).padStart(3, "0")}`);

export function FeaturedWork() {
  const featured = featuredIds.flatMap((id) => allPhotos.filter((p) => p.id === id));

  return (
    <section className="border-t border-line bg-leaf py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">Recent events</h2>
          <Link
            href="/gallery/"
            className="inline-flex min-h-11 items-center text-base font-semibold text-gold-deep underline decoration-gold decoration-2 underline-offset-[6px] hover:text-ink"
          >
            See all photos and videos
          </Link>
        </div>

        <div className="mt-12 gap-5 sm:mt-16 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {featured.map((p) => (
            <Link
              key={p.id}
              href="/gallery/"
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
  );
}
