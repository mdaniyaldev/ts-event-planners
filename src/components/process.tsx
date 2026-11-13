import { Reveal, RevealItem } from "@/components/reveal";
import { steps } from "@/lib/content";

export function Process() {
  return (
    <section className="border-t border-line bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">How it works</h2>
        </Reveal>

        {/* The steps happen in this order, so they are numbered and arrive in turn. Each gold line draws as its step scrolls in. */}
        <ol className="mt-12 grid gap-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, i) => (
            <RevealItem key={step.title} delay={i * 0.12}>
              <span
                aria-hidden="true"
                className="draw-line block h-0.5 bg-gold"
                style={{ "--s": `${i * 8}%`, "--e": `${70 + i * 8}%` } as React.CSSProperties}
              />
              <span className="mt-5 block font-display text-5xl leading-none text-gold-deep">{i + 1}</span>
              <h3 className="mt-4 font-display text-2xl leading-snug">{step.title}</h3>
              <p className="mt-3 max-w-[22rem] text-ink-soft">{step.text}</p>
            </RevealItem>
          ))}
        </ol>
      </div>
    </section>
  );
}
