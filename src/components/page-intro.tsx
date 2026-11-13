import { Reveal } from "@/components/reveal";

export function PageIntro({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <header className="mx-auto max-w-7xl px-5 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20">
      <Reveal>
        <h1 className="font-display text-5xl leading-[1.05] sm:text-6xl">{title}</h1>
        {children && <p className="mt-5 max-w-[40rem] text-lg text-ink-soft sm:text-xl">{children}</p>}
      </Reveal>
    </header>
  );
}
