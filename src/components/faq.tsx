import { Reveal } from "@/components/reveal";
import { faqs } from "@/lib/content";

export function Faq() {
  return (
    <section id="faq" className="border-t border-line bg-leaf py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-24">
        <Reveal>
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">Questions we hear often</h2>
        </Reveal>

        {/* Native <details> gives keyboard and screen reader support without any script. */}
        <Reveal delay={0.1} className="border-b border-gold/60">
          {faqs.map((f) => (
            <details key={f.q} className="group border-t border-gold/60">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-xl sm:text-2xl [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden="true"
                  className="relative h-4 w-4 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-0.5 before:w-full before:-translate-y-1/2 before:bg-gold-deep after:absolute after:left-1/2 after:top-0 after:h-full after:w-0.5 after:-translate-x-1/2 after:bg-gold-deep group-open:after:hidden"
                />
              </summary>
              <p className="max-w-[40rem] pb-6 text-ink-soft">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
