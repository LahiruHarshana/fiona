export default function LuxurySectionTransition({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-6 px-6 py-10" aria-hidden={label ? undefined : true}>
      <span className="h-px flex-1 bg-[#D7C5A7]/70" />
      {label ? (
        <span className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.28em] text-[#A3AA88]">{label}</span>
      ) : null}
      <span className="h-px flex-1 bg-[#D7C5A7]/70" />
    </div>
  );
}
