import PageHero from "@/components/PageHero";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import { BriefcaseBusiness, ChefHat, Moon, TreePalm } from "lucide-react";
import { MakaraLineArt, LiyaVelaBorder } from "@/components/SriLankanCinematicHome";
import { villaImages } from "@/lib/villaMedia";

const experiences = [
  {
    icon: ChefHat,
    title: "Balcony Breakfast",
    copy: "Use the open kitchen counter and shaded balcony as the first scene of the day.",
  },
  {
    icon: TreePalm,
    title: "Garden Arrival",
    copy: "Let the villa's front garden, planting, and veranda set a quieter pace.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Work and Rest Stay",
    copy: "Move between desk corners, balcony seats, and the room when a longer stay needs balance.",
  },
  {
    icon: Moon,
    title: "Night-Lit Villa",
    copy: "Return after the coast to the warm exterior lights and quiet upper balcony.",
  },
];

export default function ExperiencesPage() {
  return (
    <main className="bg-ivory pb-20">
      <PageHero
        eyebrow="Experiences"
        title="Gentle days arranged around the actual villa spaces."
        copy="The experience is in the flow of the house: garden arrival, balcony meals, work corners, private kitchens, and warm night returns."
        image={villaImages.balcony[10]}
      />

      <section className="editorial-container py-24 max-sm:py-16 lg:py-32 relative isolate">
        <div className="absolute top-24 left-10 opacity-[0.04] pointer-events-none mix-blend-multiply max-sm:-left-32">
          <MakaraLineArt className="h-[400px] w-[400px] text-olive-900 max-sm:h-[260px] max-sm:w-[260px]" />
        </div>

        <Stagger className="grid gap-5 md:grid-cols-2 relative z-10">
          {experiences.map((experience) => (
            <StaggerItem key={experience.title} direction="up">
              <article className="group border border-gold/20 bg-paper p-8 max-sm:p-6 lg:p-10 transition-all duration-500 hover:shadow-xl hover:border-gold/50">
                <experience.icon className="h-8 w-8 text-gold" aria-hidden="true" />
                <h2 className="mt-8 font-display text-4xl text-olive-900 max-sm:mt-6 max-sm:text-[2.25rem]">{experience.title}</h2>
                <p className="mt-4 leading-8 text-olive-900/70 font-light">{experience.copy}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <Reveal direction="none">
        <div className="w-full mt-10">
          <LiyaVelaBorder className="w-full h-auto text-gold opacity-80" />
        </div>
      </Reveal>
    </main>
  );
}
