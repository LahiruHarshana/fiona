import HomeApartments from "@/components/home/HomeApartments";
import HomeExperience from "@/components/home/HomeExperience";
import HomeGallery from "@/components/home/HomeGallery";
import HomeHospitality from "@/components/home/HomeHospitality";
import HomeSouthCoast from "@/components/home/HomeSouthCoast";
import HomeWelcome from "@/components/home/HomeWelcome";
import HomeWhyChoose from "@/components/home/HomeWhyChoose";
import Reveal from "@/components/Reveal";
import { homepageClosing } from "@/lib/homepage";

export default function HomepageBelowHero() {
  return (
    <div className="overflow-x-hidden bg-[#F4F0E7]">
      <HomeWelcome />
      <HomeWhyChoose />
      <HomeApartments />
      <HomeExperience />
      <HomeSouthCoast />
      <HomeGallery />
      <HomeHospitality />

      <section id="plan-your-stay" className="relative isolate bg-[#203C30] py-20 text-[#F4F0E7] lg:py-28">
        <div className="editorial-container max-w-3xl">
          <Reveal direction="up">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A3AA88]">Plan your stay</p>
            <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">{homepageClosing.heading}</h2>
            <p className="mt-6 text-base leading-8 text-[#F4F0E7]/85 font-light">{homepageClosing.copy}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={homepageClosing.primaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center border border-[#D7C5A7] bg-[#F4F0E7] px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#203C30] transition-colors hover:bg-transparent hover:text-[#F4F0E7] max-sm:w-full"
              >
                {homepageClosing.primaryLabel}
              </a>
              <a
                href={homepageClosing.secondaryHref}
                className="inline-flex min-h-11 items-center justify-center border border-[#D7C5A7] px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#F4F0E7] transition-colors hover:bg-[#F4F0E7] hover:text-[#203C30] max-sm:w-full"
              >
                {homepageClosing.secondaryLabel}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
