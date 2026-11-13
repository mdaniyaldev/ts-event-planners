import { WhatsAppIcon } from "@/components/icons";
import { site, whatsappHref } from "@/lib/site";

/**
 * A fixed WhatsApp button in the bottom corner, since the client takes bookings there.
 * It sits under the gallery lightbox (z-50) so it never covers the photo controls.
 */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappHref(`Salam, I would like to plan an event in ${site.city}.`)}
      target="_blank"
      rel="noopener"
      aria-label="Message us on WhatsApp"
      className="wa-button fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full border-2 border-gold bg-night text-white shadow-[0_6px_20px_rgb(32_28_20/0.35)] print:hidden sm:bottom-7 sm:right-7"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
