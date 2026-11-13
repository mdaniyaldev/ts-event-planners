import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { about } from "@/lib/content";
import { photoRef } from "@/lib/photos";

/** Home page: a short "who we are" block that leads to the About page. */
export function AboutPreview() {
  const photo = photoRef(about.photo.n, about.photo.alt);

  return (
    <section className="border-t border-line bg-page py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">Who we are</h2>
          <p className="mt-5 max-w-[32rem] text-lg text-ink-soft">{about.short}</p>
          <p className="mt-4 max-w-[32rem] text-ink-soft">{about.story[1]}</p>
          <Link
            href="/about/"
            className="mt-6 inline-flex min-h-11 items-center text-base font-semibold link-gold"
          >
            More about us
          </Link>
        </Reveal>
        <Reveal delay={0.1}>
          {/* A mehrab (arch) frame: the shape of the entrances and stages we build. */}
          <div className="arch-frame mx-auto aspect-[4/5] w-full max-w-md lg:ml-auto lg:mr-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.src} alt={photo.alt} width={photo.w} height={photo.h} loading="lazy" decoding="async" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
