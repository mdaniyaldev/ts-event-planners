import { testimonials } from "@/lib/content";

// Shows only when real reviews have been added to `testimonials` in src/lib/content.ts.
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section id="reviews" className="border-t border-line bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="font-display text-4xl leading-tight sm:text-5xl">What our clients say</h2>
        <ul className="mt-12 grid gap-10 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name} className="border-t-2 border-gold pt-5">
              <blockquote className="font-display text-2xl leading-snug">{t.quote}</blockquote>
              <p className="mt-5 text-base font-semibold">{t.name}</p>
              <p className="text-base text-ink-soft">{t.event}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
