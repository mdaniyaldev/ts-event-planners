import Link from "next/link";
import { Mark } from "@/components/mark";
import { PlayIcon } from "@/components/icons";
import { RevealItem } from "@/components/reveal";
import { filterHref, filters, highlightCover, photoRef, type Filter } from "@/lib/photos";

const shortLabel: Record<Filter, string> = {
  All: "All",
  Weddings: "Weddings",
  "Mehndi and dholki": "Mehndi",
  "Banquet halls": "Halls",
  "Dinners and lounges": "Dinners",
  Birthdays: "Birthdays",
  "Stage designs": "Stages",
  Videos: "Videos",
};

/**
 * Round covers for each kind of event, the way the client's Instagram shows its highlights.
 * On phones the row scrolls sideways; on wider screens it fits in one line.
 * `active` marks the current gallery page; `withAll` adds the "All" cover (gallery only).
 */
export function Highlights({ active, withAll = false }: { active?: Filter; withAll?: boolean }) {
  const list = withAll ? filters : filters.filter((f) => f !== "All");

  return (
    <nav aria-label="Event types" className="-mx-5 sm:mx-0">
      <ul className="no-scrollbar flex snap-x gap-5 overflow-x-auto px-5 py-1 sm:flex-wrap sm:gap-8 sm:px-0 lg:gap-10">
        {list.map((f, i) => {
          const current = active === f;
          return (
            <RevealItem key={f} delay={i * 0.06} className="snap-start">
              <Link
                href={filterHref(f)}
                aria-current={current ? "page" : undefined}
                className="group flex w-[5.5rem] flex-col items-center gap-2 sm:w-28 lg:w-32"
              >
                {/* On hover the circle lifts, the ring darkens and the photo zooms inside it. */}
                <span
                  className={`rounded-full border-2 p-[3px] transition-[border-color,translate,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_10px_20px_rgb(125_95_23/0.28)] motion-reduce:group-hover:translate-y-0 ${
                    current ? "border-ink" : "border-gold group-hover:border-gold-deep"
                  }`}
                >
                  <span className="img-zoom block rounded-full">
                    <Cover filter={f} />
                  </span>
                </span>
                <span
                  className={`inline-flex min-h-11 items-start text-center text-sm leading-tight sm:text-base ${
                    current ? "font-semibold text-ink" : "text-ink-soft group-hover:text-ink"
                  }`}
                >
                  {shortLabel[f]}
                </span>
              </Link>
            </RevealItem>
          );
        })}
      </ul>
    </nav>
  );
}

function Cover({ filter }: { filter: Filter }) {
  const size = "h-[4.5rem] w-[4.5rem] sm:h-24 sm:w-24 lg:h-28 lg:w-28";
  if (filter === "All") return <Mark className={size} />;
  if (filter === "Videos") {
    return (
      <span className={`grid place-items-center rounded-full bg-ink text-gold-foil ${size}`}>
        <PlayIcon className="h-8 w-8 translate-x-0.5" />
      </span>
    );
  }
  const photo = photoRef(highlightCover[filter], "");
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photo.src.replace("/l/", "/t/")}
      alt=""
      width={photo.w}
      height={photo.h}
      loading="lazy"
      decoding="async"
      className={`rounded-full object-cover ${size}`}
    />
  );
}
