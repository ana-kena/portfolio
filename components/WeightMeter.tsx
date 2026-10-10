import { pageWeight } from "@/content";

/**
 * Shows what this page costs to download, against a fixed budget.
 * Pure HTML and CSS: it works before (and without) any JavaScript.
 */
export function WeightMeter() {
  const { budgetKB, readableKB, totalKB } = pageWeight;
  const pct = (kb: number) => `${Math.min(100, (kb / budgetKB) * 100)}%`;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(f * budgetKB));
  // Rough 3G download time: 400 kbit/s effective throughput plus one 300 ms round trip.
  const seconds3G = (kb: number) => (kb * 8) / 400 + 0.3;

  return (
    <figure className="mt-10 max-w-[44rem]" aria-labelledby="meter-caption">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p className="font-display text-2xl leading-none">
          This page weighs {totalKB} KB
        </p>
        <p className="text-sm text-muted tabular-nums">
          readable in about {seconds3G(readableKB).toFixed(1)} s on a 3G connection
        </p>
      </div>

      <div
        className="relative mt-4 h-5 border border-ink/70 bg-paper"
        role="img"
        aria-label={`${totalKB} kilobytes used of a ${budgetKB} kilobyte budget. Readable after ${readableKB} kilobytes.`}
      >
        <div
          className="meter-fill absolute inset-y-0 left-0 bg-signal"
          style={{ width: pct(totalKB) }}
        />
        <div
          className="absolute inset-y-[-6px] w-0.5 bg-ink"
          style={{ left: pct(readableKB) }}
          aria-hidden="true"
        />
      </div>

      <div className="relative mt-1 h-5 text-xs text-muted tabular-nums" aria-hidden="true">
        {ticks.map((t, i) => (
          <span
            key={t}
            className="absolute whitespace-nowrap"
            style={{
              left: `${(t / budgetKB) * 100}%`,
              transform: i === 0 ? "none" : i === ticks.length - 1 ? "translateX(-100%)" : "translateX(-50%)",
            }}
          >
            {t === budgetKB ? `${t} KB budget` : t}
          </span>
        ))}
      </div>

      <figcaption id="meter-caption" className="mt-3 max-w-[38rem] text-sm text-muted">
        The black line marks {readableKB} KB: the point where the text is on screen and readable. A typical
        site with a photo slider and tracking scripts can cost ten times this budget on a phone that pays for
        every megabyte.
      </figcaption>
    </figure>
  );
}
