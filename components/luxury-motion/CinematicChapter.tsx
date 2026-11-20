import type { ReactNode } from "react";

export default function CinematicChapter({
  id,
  tone = "ivory",
  children,
}: {
  id?: string;
  tone?: "ivory" | "sage" | "forest" | "night";
  children: ReactNode;
}) {
  const surface =
    tone === "forest" || tone === "night"
      ? "bg-[#203C30] text-[#F4F0E7]"
      : "bg-[#F4F0E7] text-[#203C30]";
  const divider = tone === "sage" ? "border-t border-[#D7C5A7]/55" : "";

  return (
    <section id={id} className={`${surface} ${divider} overflow-x-hidden`}>
      {children}
    </section>
  );
}
