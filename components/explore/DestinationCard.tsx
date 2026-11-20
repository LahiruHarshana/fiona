import type { Destination } from "@/lib/destinations";

export default function DestinationCard({
  destination,
  index,
}: {
  destination: Destination;
  index?: number;
}) {
  const marker = typeof index === "number" ? String(index + 1).padStart(2, "0") : null;

  return (
    <article id={destination.slug} className="flex h-full flex-col border-t border-[#D7C5A7]/80 py-8">
      {marker ? (
        <p className="font-sans text-[0.65rem] font-semibold tabular-nums tracking-[0.28em] text-[#244D39]">{marker}</p>
      ) : null}
      <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-[#244D39]">
        {destination.independentlyOperated ? "Independently operated" : "Visitor destination"}
        {destination.seasonal ? " · Seasonal" : ""}
      </p>
      <h3 className="mt-3 font-display text-2xl leading-tight text-[#203C30] sm:text-3xl">{destination.name}</h3>
      <p className="mt-4 flex-1 text-sm leading-7 text-[#203C30] font-light">{destination.description}</p>
      {destination.officialUrl ? (
        <a
          href={destination.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-fit items-center border-b border-[#244D39] pb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#244D39]"
        >
          Official visitor information
        </a>
      ) : null}
    </article>
  );
}
