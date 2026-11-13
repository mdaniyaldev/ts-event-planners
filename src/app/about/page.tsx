import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { InstagramIcon, YouTubeIcon } from "@/components/icons";
import { PageIntro } from "@/components/page-intro";
import { PageTransition } from "@/components/page-transition";
import { Reveal, RevealItem } from "@/components/reveal";
import { about, team } from "@/lib/content";
import { photoRef } from "@/lib/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description: `${about.lead} ${site.tagline}.`,
};

const textLink =
  "inline-flex min-h-11 items-center gap-2 text-base font-semibold link-gold";

export default function AboutPage() {
  const photo = photoRef(about.photo.n, about.photo.alt);

  return (
    <PageTransition>
      <PageIntro title="About us">{about.lead}</PageIntro>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            {/* A mehrab (arch) frame: the shape of the entrances and stages we build. */}
            <div className="arch-frame mx-auto aspect-[4/5] w-full max-w-md lg:ml-0 lg:mr-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src} alt={photo.alt} width={photo.w} height={photo.h} fetchPriority="high" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">Who we are</h2>
            <div className="mt-5 max-w-[34rem] space-y-4 text-lg text-ink-soft">
              {about.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-1">
              <a href={site.instagram} target="_blank" rel="noopener" className={textLink}>
                <InstagramIcon />
                {site.instagramHandle}
              </a>
              <a href={site.youtube} target="_blank" rel="noopener" className={textLink}>
                <YouTubeIcon />
                YouTube
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-leaf py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">How we work</h2>
          </Reveal>
          {/* Not numbered: these are habits, not steps. */}
          <ul className="mt-12 grid gap-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {about.principles.map((p, i) => (
              <RevealItem key={p.title} delay={(i % 4) * 0.1} className="border-t-2 border-gold pt-5">
                <h3 className="font-display text-2xl leading-snug">{p.title}</h3>
                <p className="mt-3 max-w-[22rem] text-ink-soft">{p.text}</p>
              </RevealItem>
            ))}
          </ul>
        </div>
      </section>

      {team.length > 0 && (
        <section className="border-t border-line bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal>
              <h2 className="font-display text-4xl leading-tight sm:text-5xl">The team</h2>
            </Reveal>
            <ul className="mt-12 grid gap-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((t, i) => {
                const img = t.photo ? photoRef(t.photo.n, t.photo.alt) : null;
                return (
                  <RevealItem key={t.name} delay={(i % 3) * 0.1}>
                    {img && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={img.src}
                        alt={img.alt}
                        width={img.w}
                        height={img.h}
                        loading="lazy"
                        decoding="async"
                        className="mb-5 block aspect-[4/5] w-full object-cover"
                      />
                    )}
                    <p className="font-display text-2xl leading-snug">{t.name}</p>
                    <p className="text-base text-ink-soft">{t.role}</p>
                  </RevealItem>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      <CtaBand />
    </PageTransition>
  );
}
