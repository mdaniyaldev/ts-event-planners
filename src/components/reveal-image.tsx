type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Tailwind classes for the <img> (aspect ratio, object-fit...). */
  className?: string;
  priority?: boolean;
};

/**
 * A photo that is uncovered top to bottom as it scrolls into view, then settles from a slight zoom.
 * The effect is CSS only (.reveal-img in globals.css), so it needs no JavaScript. Use `priority`
 * for photos at the top of a page so they are never hidden while loading.
 */
export function RevealImage({ src, alt, width, height, className = "", priority }: Props) {
  return (
    <div className={`overflow-hidden ${priority ? "" : "reveal-img"}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`block w-full ${className}`}
      />
    </div>
  );
}
