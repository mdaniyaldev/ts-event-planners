import { site } from "./site";
import type { PhotoCategory } from "./photos";

// Draft copy for TS Event Planners. Written from what the photos show; confirm the details with the team.

export type Service = {
  /** URL segment: /services/<slug>/ */
  slug: string;
  title: string;
  summary: string;
  items: string[];
  /** Gallery photo number (p029 = 29) and a description of it, used as the cover image. */
  photo: { n: number; alt: string };
  /** Which gallery category the "See photos" link opens. */
  filter: PhotoCategory;
};

export const services: Service[] = [
  {
    slug: "weddings",
    title: "Weddings",
    summary:
      "For barat, nikkah and valima we design the whole setting, from the entrance to the stage, and set it up before your guests arrive.",
    items: [
      "Stages and floral backdrops",
      "Entrance arches and walkways",
      "Draping, lighting and chandeliers",
      "Guest tables, chairs and sofas",
    ],
    photo: { n: 12, alt: "A wedding stage with a cane sofa under an arch of white roses, greenery and chandeliers" },
    filter: "Weddings",
  },
  {
    slug: "mehndi-and-dholki",
    title: "Mehndi and dholki",
    summary: "Colourful, comfortable and made for dancing, with space for the family to sit together on the floor.",
    items: [
      "Floor seating and lounge corners",
      "Printed dance floors and stages",
      "Marigold and flower decor",
      "Signs and props for photos",
    ],
    photo: { n: 101, alt: "A mehndi stage framed in yellow and orange flowers with a bright patchwork floor" },
    filter: "Mehndi and dholki",
  },
  {
    slug: "receptions-and-dinners",
    title: "Receptions and dinners",
    summary:
      "Banquet halls, lawns and rooftops laid out so your guests can eat, talk and move around without queues or crowding.",
    items: [
      "Round and long table layouts",
      "Centrepieces and table runners",
      "Lounge seating",
      "Buffet and service counters",
    ],
    photo: { n: 146, alt: "A long white dinner table with a striped runner, folded napkins and greenery behind" },
    filter: "Dinners and lounges",
  },
  {
    slug: "birthdays-and-parties",
    title: "Birthdays and parties",
    summary: "Themed decor planned around your colours, for children and grown-ups alike.",
    items: [
      "Themed backdrops and entrances",
      "Balloon decor",
      "Dessert and snack stands",
      "Seating and tables for guests",
    ],
    photo: { n: 171, alt: "A pink and white draped canopy over an aisle leading to a party stage" },
    filter: "Birthdays",
  },
];

/**
 * About page and the "Who we are" block on the home page. Draft copy written only from facts the client
 * has published (the Instagram bio: weddings, corporate events and private celebrations in Karachi; the
 * tagline; the event types in the gallery). No founding year, team size or event counts: add those
 * once the client confirms them.
 */
export const about = {
  lead: `${site.name} plans and runs weddings, mehndis, receptions, birthdays, corporate events and private celebrations across ${site.city}.`,
  story: [
    "We design the whole setting: the entrance, the stage, the lighting and the tables where your guests sit. Our team sets it up at your venue before anyone arrives, and stays on to run the day.",
    "That is the idea behind our name for it: we manage, you celebrate. You decide the date, the colours and the mood. We handle the rest, so the family can enjoy the event instead of organising it.",
  ],
  /** Short version for the home page. */
  short: `A ${site.city} team that designs, sets up and runs your event, from the first idea to the last guest leaving.`,
  principles: [
    {
      title: "One team from start to finish",
      text: "The people who plan your event are the people who set it up and run it on the day.",
    },
    {
      title: "Planned around your venue",
      text: "Halls, lawns, rooftops and homes all work differently, so we plan the layout around yours and visit if needed.",
    },
    {
      title: "Your colours and your theme",
      text: "We build the decor from what you like, whether that is soft white florals or a bright mehndi floor.",
    },
    {
      title: "Ready before guests arrive",
      text: "Stage, lights and seating are finished and checked before the first guest walks in.",
    },
  ],
  photo: { n: 23, alt: "A white aisle with gold stripes running through a lawn marquee with draped ceiling and chandeliers" },
};

export type TeamMember = { name: string; role: string; photo?: { n: number; alt: string } };

/**
 * Add the real people here, with their permission. While this list is empty the team section
 * does not appear on the About page.
 */
export const team: TeamMember[] = [];

export const steps = [
  { title: "Tell us", text: "Send the form or call us with your date, guest count and venue." },
  { title: "Get a plan", text: `We reply within ${site.quoteWithin} with decor ideas and a price.` },
  { title: "Confirm the design", text: "We agree the colours, layout and details with you, and visit the venue if needed." },
  { title: "Celebrate", text: "Our team sets up before your guests arrive and runs the day, so you can enjoy it." },
];

export const faqs = [
  {
    q: "How do I get a quote?",
    a: `Fill in the form below or call us. Give us your date, guest count and venue, and we reply within ${site.quoteWithin} with ideas and a price.`,
  },
  {
    q: "What should I tell you first?",
    a: "The date, how many guests you expect, where the event will be, and any colours or theme you like. If you are not sure about some of these, tell us anyway and we will help you decide.",
  },
  {
    q: "Which venues do you work in?",
    a: `We set up in banquet halls, lawns, rooftops and private homes across ${site.city}. Tell us your venue and we will plan around it.`,
  },
  {
    q: "Can I see more of your work?",
    a: "Yes. Browse the photos and videos above, or contact us and we will share more from events like yours.",
  },
];

export type Testimonial = { quote: string; name: string; event: string };

/**
 * Add real client reviews here, with the client's permission. While this list is empty
 * the Testimonials section does not appear on the page.
 */
export const testimonials: Testimonial[] = [];
