const words = ["Weddings", "Mehndi", "Dholki", "Barat", "Nikkah", "Valima", "Receptions", "Birthdays"];

/**
 * A slow band of event types between the hero and the services. Pure CSS: two identical groups
 * slide left by half the track so the loop never jumps. It pauses on hover and stops for
 * people who ask for reduced motion. It repeats words found elsewhere, so screen readers skip it.
 */
export function Ticker() {
  return (
    <div
      aria-hidden="true"
      className="ticker-wrap overflow-hidden border-y border-gold/60 bg-white py-5 sm:py-6"
    >
      <div className="ticker flex w-max">
        {[0, 1].map((group) => (
          <ul key={group} className="flex shrink-0 items-center">
            {words.map((w) => (
              <li key={w} className="flex items-center font-display text-3xl text-ink sm:text-5xl">
                <span className="px-6 sm:px-10">{w}</span>
                <span className="h-2 w-2 rotate-45 bg-gold sm:h-2.5 sm:w-2.5" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
