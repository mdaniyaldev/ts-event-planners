import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { site, whatsappHref } from "@/lib/site";

const SWAG_WIDTH = 120;
// Enough swags to cross a 2400px-wide screen; the row is clipped, so extra ones are harmless.
const SWAGS = Array.from({ length: 20 }, (_, i) => i);

/** A string of fairy lights along the top edge. Each bulb twinkles on its own delay (see .bulb in globals.css). */
function FairyLights() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 flex h-12 overflow-hidden">
      {SWAGS.map((i) => (
        <svg
          key={i}
          width={SWAG_WIDTH}
          height="48"
          viewBox={`0 0 ${SWAG_WIDTH} 48`}
          className="shrink-0"
        >
          <path d={`M0 3 Q${SWAG_WIDTH / 2} 31 ${SWAG_WIDTH} 3`} fill="none" stroke="#201c14" strokeOpacity="0.55" strokeWidth="1.5" />
          <g className="bulb" style={{ "--d": `${((i * 7) % 11) * 0.23}s` } as React.CSSProperties}>
            <rect x={SWAG_WIDTH / 2 - 1.5} y="17" width="3" height="6" fill="#201c14" fillOpacity="0.6" />
            <circle cx={SWAG_WIDTH / 2} cy="29" r="6" fill="#fff3c4" />
          </g>
        </svg>
      ))}
    </div>
  );
}

/** The one flat gold block on each page: a closing call to action under a string of fairy lights. */
export function CtaBand({ heading = `Planning an event in ${site.city}?` }: { heading?: string }) {
  return (
    <section className="gold-fill relative">
      <FairyLights />
      <Reveal className="mx-auto flex max-w-7xl flex-col gap-8 px-5 pb-16 pt-24 sm:px-8 sm:pb-20 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">{heading}</h2>
          <p className="mt-3 max-w-[32rem] text-lg">
            Tell us the date and the guest count. We reply within {site.quoteWithin}.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-x-7 gap-y-4">
          <Link
            href="/contact/"
            className="inline-flex min-h-12 items-center btn-ink px-8 text-base font-semibold"
          >
            Plan your event
          </Link>
          <a
            href={whatsappHref(`Salam, I would like to plan an event in ${site.city}.`)}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-11 items-center gap-2 text-base font-semibold link-dark"
          >
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp
          </a>
        </div>
      </Reveal>
    </section>
  );
}
