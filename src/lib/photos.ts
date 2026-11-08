import manifest from "./media-manifest.json";

export const categories = [
  "Weddings",
  "Mehndi and dholki",
  "Banquet halls",
  "Dinners and lounges",
  "Birthdays",
] as const;
export type PhotoCategory = (typeof categories)[number];

export const filters = ["All", ...categories, "Videos"] as const;
export type Filter = (typeof filters)[number];

/** URL segment for each gallery filter, e.g. /gallery/mehndi-and-dholki/ */
export const filterSlug: Record<Exclude<Filter, "All">, string> = {
  Weddings: "weddings",
  "Mehndi and dholki": "mehndi-and-dholki",
  "Banquet halls": "banquet-halls",
  "Dinners and lounges": "dinners-and-lounges",
  Birthdays: "birthdays",
  Videos: "videos",
};

export function filterFromSlug(slug: string): Exclude<Filter, "All"> | undefined {
  return (Object.keys(filterSlug) as Exclude<Filter, "All">[]).find((f) => filterSlug[f] === slug);
}

export function filterHref(f: Filter) {
  return f === "All" ? "/gallery/" : `/gallery/${filterSlug[f]}/`;
}

export type Photo = {
  id: string;
  category: PhotoCategory;
  w: number;
  h: number;
  thumb: string;
  large: string;
  alt: string;
};

export type Video = { id: string; src: string };

/** Which photo (by id number, e.g. 29 = p029) belongs to which category. Edit these lists to re-sort. */
const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

const assignment: Record<PhotoCategory, number[]> = {
  Weddings: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29, 39, 42, 43, 45, 49,
    52, 55, 72, 73, 75, 79, 115, 120, 122, 134, 136, 138, 140, 141, 147, 148, 153, 154, 155, 158, 160, 163, 164, 165,
  ],
  "Mehndi and dholki": [
    70, 76, 77, 78, ...range(80, 86), 89, 90, 91, ...range(93, 106), 108, 112, 113, 114, ...range(116, 119), 121,
    ...range(124, 133), 159, 161, 162,
  ],
  "Banquet halls": [24, ...range(30, 38), 40, 44, 47],
  "Dinners and lounges": [
    9, 11, 41, 46, 48, 50, 51, 53, 54, 56, ...range(57, 69), 71, 74, 92, 109, 110, 111, 123, 135, 139, ...range(142, 146),
    149, 150, 151, 152, 156, 157,
  ],
  Birthdays: range(166, 182),
};
// Left out on purpose: 18 (not an event photo) and 87, 88, 107, 137 (repeats of 85, 84, 103, 136).

const alt: Record<PhotoCategory, string> = {
  Weddings: "Wedding stage, entrance or marquee set up by TS Event Planners",
  "Mehndi and dholki": "Colourful mehndi or dholki setup by TS Event Planners",
  "Banquet halls": "Banquet hall layout with tables and stage by TS Event Planners",
  "Dinners and lounges": "Dinner table or lounge seating arranged by TS Event Planners",
  Birthdays: "Birthday party decor by TS Event Planners",
};

const photos = manifest.photos as Record<string, { w: number; h: number }>;

function build(category: PhotoCategory): Photo[] {
  return assignment[category].flatMap((n) => {
    const id = `p${String(n).padStart(3, "0")}`;
    const meta = photos[id];
    if (!meta) return [];
    return [
      {
        id,
        category,
        w: meta.w,
        h: meta.h,
        thumb: `/gallery/t/${id}.webp`,
        large: `/gallery/l/${id}.webp`,
        alt: alt[category],
      },
    ];
  });
}

export const byCategory = Object.fromEntries(categories.map((c) => [c, build(c)])) as Record<PhotoCategory, Photo[]>;

/** "All" mixes the categories one after another so the first screen isn't one event type. */
export const allPhotos: Photo[] = (() => {
  const lists = categories.map((c) => [...byCategory[c]]);
  const out: Photo[] = [];
  while (lists.some((l) => l.length)) for (const l of lists) if (l.length) out.push(l.shift()!);
  return out;
})();

export const videos: Video[] = Object.keys(manifest.videos).map((id) => ({ id, src: `/videos/${id}.mp4` }));

export function photosFor(filter: Exclude<Filter, "Videos">): Photo[] {
  return filter === "All" ? allPhotos : byCategory[filter];
}

/** Look up a gallery photo by its number (29 = p029) for use outside the gallery. */
export function photoRef(n: number, alt: string) {
  const id = `p${String(n).padStart(3, "0")}`;
  const meta = photos[id];
  if (!meta) throw new Error(`No photo ${id} in the media manifest. Run "npm run media" first.`);
  return { src: `/gallery/l/${id}.webp`, w: meta.w, h: meta.h, alt };
}

/** The photo used under the hero headline. */
export const heroPhoto = {
  src: "/gallery/l/p023.webp",
  w: photos.p023.w,
  h: photos.p023.h,
  alt: "A white aisle with gold stripes running through a lawn marquee with draped ceiling and chandeliers",
};
