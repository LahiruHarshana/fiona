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
    tone === "forest"
      ? "bg-[#244D39] text-[#F4F0E7]"
      : tone === "night"
        ? "bg-[#203C30] text-[#F4F0E7]"
        : tone === "sage"
          ? "bg-[#A3AA88]/18 text-[#203C30]"
          : "bg-[#F4F0E7] text-[#203C30]";

  return (
    <section id={id} className={`${surface} overflow-x-hidden`}>
      {children}
    </section>
  );
}
