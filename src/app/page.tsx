import { Hero } from "@/components/hero";
import { CurtainIntro } from "@/components/intro";
import { Highlights } from "@/components/highlights";
import { ServicesPreview } from "@/components/services-preview";
import { AboutPreview } from "@/components/about-preview";
import { Interlude } from "@/components/interlude";
import { VideosPreview } from "@/components/videos-preview";
import { FeaturedWork } from "@/components/featured-work";
import { Process } from "@/components/process";
import { Testimonials } from "@/components/testimonials";
import { CtaBand } from "@/components/cta-band";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";

export default function Home() {
  return (
    <PageTransition>
      <CurtainIntro />
      <Hero />

      {/* Round covers for each kind of event, as on the client's Instagram highlights. */}
      <section className="bg-page py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">Browse by event</h2>
          </Reveal>
          <div className="mt-8">
            <Highlights />
          </div>
        </div>
      </section>

      <ServicesPreview />
      <Interlude />
      <FeaturedWork />
      <VideosPreview />
      <AboutPreview />
      <Process />
      <Testimonials />
      <CtaBand />
    </PageTransition>
  );
}
