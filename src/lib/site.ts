// Details for a Karachi, Pakistan business (the name and tagline come from the photos' own watermark).
// The phone numbers come from the client's Instagram bio. Email, address and hours are still placeholders.
// Replace them in one place and the whole page updates.
export const site = {
  name: "TS Event Planners",
  tagline: "We manage, you celebrate",
  city: "Karachi",
  description:
    "TS Event Planners designs and runs weddings, mehndis, receptions and birthdays in Karachi, Pakistan. We manage, you celebrate.",
  email: "hello@tseventplanners.example",
  // Both numbers are from the bio on instagram.com/tseventplanners ("For bookings WhatsApp or DM us").
  phones: ["+92 321 4863628", "+92 335 9256699"],
  phone: "+92 321 4863628",
  /** WhatsApp number for the chat button and links. Digits only are taken from it for the wa.me link. */
  whatsapp: "+92 321 4863628",
  instagram: "https://www.instagram.com/tseventplanners/",
  instagramHandle: "@tseventplanners",
  youtube: "https://www.youtube.com/@TSeventplanners",
  address: ["Office address line", "Karachi, Pakistan"],
  hours: "Mon to Sat, 11:00 to 19:00. Visits by appointment.",
  quoteWithin: "two working days",
  year: 2026,
} as const;

/** A wa.me link that opens a chat with the business, optionally with a first message filled in. */
export function whatsappHref(message?: string) {
  const digits = site.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}
