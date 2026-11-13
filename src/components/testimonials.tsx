import { InstagramIcon } from "@/components/icons";
import { Reveal, RevealItem } from "@/components/reveal";
import { testimonials } from "@/lib/content";
import { site } from "@/lib/site";

// Shows real reviews once they are added to `testimonials` in src/lib/content.ts. Until then it points to the
// "Client Reviews" highlight the client already keeps on Instagram, so no review text is invented here.
export function Testimonials() {
  if (testimonials.length === 0) {
    return (
      <section id="reviews" className="border-t border-line bg-leaf py-16 sm:py-20">
        <Reveal className="mx-auto flex max-w-7xl flex-col gap-4 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">What our clients say</h2>
            <p className="mt-3 max-w-[34rem] text-ink-soft">
              Our clients share their feedback in the Client Reviews highlight on our Instagram page.
            </p>
          </div>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 text-base font-semibold link-gold"
          >
            <InstagramIcon />
            Read them on Instagram
          </a>
        </Reveal>
      </section>
    );
  }

  return (
    <section id="reviews" className="border-t border-line bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">What our clients say</h2>
        </Reveal>
        <ul className="mt-12 grid gap-10 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <RevealItem key={t.name} delay={(i % 3) * 0.1} className="border-t-2 border-gold pt-5">
              <blockquote className="font-display text-2xl leading-snug">{t.quote}</blockquote>
              <p className="mt-5 text-base font-semibold">{t.name}</p>
              <p className="text-base text-ink-soft">{t.event}</p>
            </RevealItem>
          ))}
        </ul>
      </div>
    </section>
  );
}
