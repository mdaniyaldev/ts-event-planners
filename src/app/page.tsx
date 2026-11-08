import { Hero } from "@/components/hero";
import { CurtainIntro } from "@/components/intro";
import { Ticker } from "@/components/ticker";
import { ServicesPreview } from "@/components/services-preview";
import { FeaturedWork } from "@/components/featured-work";
import { Process } from "@/components/process";
import { Testimonials } from "@/components/testimonials";
import { CtaBand } from "@/components/cta-band";

export default function Home() {
  return (
    <>
      <CurtainIntro />
      <Hero />
      <Ticker />
      <ServicesPreview />
      <FeaturedWork />
      <Process />
      <Testimonials />
      <CtaBand />
    </>
  );
}
