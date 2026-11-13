/**
 * The brand mark: a gold "TS" in a gold ring on a dark disc, after the Instagram profile picture.
 * Sized by `className` (e.g. "h-9 w-9"); the letters scale with it.
 */
export function Mark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={`shrink-0 ${className}`}>
      <circle cx="32" cy="32" r="32" fill="#201c14" />
      <circle cx="32" cy="32" r="27.5" fill="none" stroke="#c9a24a" strokeWidth="1.5" />
      <text
        x="32"
        y="41"
        textAnchor="middle"
        fontFamily="var(--font-cormorant), Georgia, 'Times New Roman', serif"
        fontWeight="600"
        fontSize="28"
        fill="#e1c46c"
      >
        TS
      </text>
    </svg>
  );
}
