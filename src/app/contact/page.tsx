import type { Metadata } from "next";
import { Contact } from "@/components/contact";
import { Faq } from "@/components/faq";
import { PageTransition } from "@/components/page-transition";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Tell ${site.name} the date, guest count and venue for your event in ${site.city}. We reply within ${site.quoteWithin}.`,
};

export default function ContactPage() {
  return (
    <PageTransition>
      <Contact />
      <Faq />
    </PageTransition>
  );
}
