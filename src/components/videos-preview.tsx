import Link from "next/link";
import { Reveal, RevealItem } from "@/components/reveal";
import { filterHref } from "@/lib/photos";

// The three shorter vertical videos (v02 to v04, about 4 to 8 MB each). They only load their first frame
// until someone presses play (preload="metadata"), so the home page stays light.
const picks = ["v02", "v03", "v04"];

/** Home page: three event videos in the vertical shape they were filmed in, like Instagram reels. */
export function VideosPreview() {
  return (
    <section className="border-t border-line bg-page py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">Watch our events</h2>
          <Link
            href={filterHref("Videos")}
            className="inline-flex min-h-11 items-center text-base font-semibold link-gold"
          >
            See all videos
          </Link>
        </Reveal>

        {/* One row that scrolls sideways on phones, three side by side from tablets up. */}
        <ul className="no-scrollbar -mx-5 mt-12 flex snap-x gap-4 overflow-x-auto px-5 sm:mx-0 sm:mt-16 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0">
          {picks.map((id, i) => (
            <RevealItem key={id} delay={i * 0.1} className="w-[68vw] max-w-72 shrink-0 snap-start sm:w-auto sm:max-w-none">
              <video
                controls
                playsInline
                preload="metadata"
                // #t=1 makes browsers show a real frame as the cover instead of a black box.
                src={`/videos/${id}.mp4#t=1`}
                aria-label={`Event video ${i + 1}`}
                className="block aspect-[9/16] w-full bg-night object-cover"
              />
            </RevealItem>
          ))}
        </ul>
      </div>
    </section>
  );
}
