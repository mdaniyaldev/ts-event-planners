import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GalleryView } from "@/components/gallery";
import { CtaBand } from "@/components/cta-band";
import { PageTransition } from "@/components/page-transition";
import { filterFromSlug, filterSlug } from "@/lib/photos";
import { site } from "@/lib/site";

type Params = { category: string };

// Only the known categories exist; any other /gallery/<x>/ is a 404.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return Object.values(filterSlug).map((category) => ({ category }));
}

const intros: Record<string, string> = {
  Weddings: "Stages, entrances and marquees for barat, nikkah and valima.",
  "Mehndi and dholki": "Colourful floor seating, dance floors and flower decor.",
  "Banquet halls": "Hall layouts with stages, lounges and tables ready for guests.",
  "Dinners and lounges": "Table settings, centrepieces and lounge corners for evenings and receptions.",
  Birthdays: "Themed decor, balloons and dessert stands for birthdays and parties.",
  "Stage designs": "Sofas, floral backdrops, drapes and lights for the stage where the couple sits.",
  Videos: "Short videos from events we have set up.",
};

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params;
  const filter = filterFromSlug(category);
  if (!filter) return {};
  return {
    title: `${filter} gallery`,
    description: `${intros[filter]} Set up by ${site.name} in ${site.city}.`,
  };
}

export default async function GalleryCategoryPage({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  const filter = filterFromSlug(category);
  if (!filter) notFound();

  return (
    <PageTransition>
      <GalleryView filter={filter} intro={intros[filter]} />
      <CtaBand />
    </PageTransition>
  );
}
