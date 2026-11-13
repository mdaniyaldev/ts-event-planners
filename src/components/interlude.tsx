import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { interludePhoto } from "@/lib/photos";

/**
 * A full-width photo band between sections, with one line over it. The photo is taller than the band and drifts
 * as it scrolls past (.parallax in globals.css; it simply stays still where that is not supported).
 */
export function Interlude() {
  return (
    <section className="relative isolate flex min-h-[26rem] items-center overflow-hidden bg-night text-white sm:min-h-[34rem]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={interludePhoto.src}
        alt={interludePhoto.alt}
        width={interludePhoto.w}
        height={interludePhoto.h}
        loading="lazy"
        decoding="async"
        className="parallax absolute inset-x-0 -top-[15%] -z-10 h-[130%] w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-night/55" />
      <Reveal className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
        <p className="max-w-[20ch] font-display text-[clamp(2.4rem,6.5vw,5.5rem)] font-medium italic leading-[1.02]">
          Set up before your guests arrive.
        </p>
        <Link
          href="/gallery/"
          className="mt-8 inline-flex min-h-11 items-center text-base font-semibold link-light"
        >
          See our events
        </Link>
      </Reveal>
    </section>
  );
}
