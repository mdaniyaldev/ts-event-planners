import type { Metadata } from "next";
import { GalleryView } from "@/components/gallery";
import { CtaBand } from "@/components/cta-band";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Photos and videos of weddings, mehndis, receptions and birthdays set up by ${site.name} in ${site.city}.`,
};

export default function GalleryPage() {
  return (
    <>
      <GalleryView
        filter="All"
        intro="Weddings, mehndis, receptions and birthdays we have set up. Pick an event type, or open any photo to see it larger."
      />
      <CtaBand />
    </>
  );
}
