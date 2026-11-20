import { privacyDraft } from "@/lib/privacy";
import { contact } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Privacy notice (draft) | Fiona Green Serenity" },
  description:
    "Draft privacy notice for Fiona Green Serenity. This page is awaiting owner approval and is not a finished legal policy.",
  robots: { index: false, follow: false, nocache: true },
};

export default function PrivacyPage() {
  const draft = privacyDraft;

  return (
    <main className="overflow-x-hidden bg-[#F4F0E7] pb-20">
      <header className="border-b border-[#D7C5A7]/70 bg-[#F4F0E7] pt-28 pb-12 max-sm:pt-24">
        <div className="editorial-container max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A3AA88]">Privacy · Draft</p>
          <h1 className="mt-5 font-display text-4xl leading-tight text-[#203C30] sm:text-5xl">{draft.h1}</h1>
          <p className="mt-6 text-base leading-8 text-[#203C30]/80 font-light">{draft.intro}</p>
        </div>
      </header>

      <article className="editorial-container max-w-3xl space-y-10 py-12 text-sm leading-7 text-[#203C30]/85 lg:py-16">
        <p className="border-l-2 border-[#D7C5A7] bg-transparent px-4 py-3 text-[#203C30]">{draft.lastReviewedNote}</p>

        <section>
          <h2 className="font-display text-3xl text-[#203C30]">Who this notice is about</h2>
          <p className="mt-4">{draft.controllerUnknown}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Trading name used on this website: {draft.property.tradingName}</li>
            <li>Location shown on this website: {draft.property.location}</li>
            <li>
              Email:{" "}
              <a className="underline underline-offset-4" href={contact.mailtoHref}>
                {draft.property.email}
              </a>
            </li>
            <li>Phone / WhatsApp: {draft.property.phone}</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[#203C30]">What this website currently does</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            {draft.whatThisSiteDoes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[#203C30]">What this draft does not invent</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            {draft.whatThisSiteDoesNotClaim.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[#203C30]">If website-side collection is added later</h2>
          <p className="mt-4">{draft.ifFormEnabledLater}</p>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[#203C30]">Rights</h2>
          <p className="mt-4">{draft.rights}</p>
        </section>

        <section>
          <h2 className="font-display text-3xl text-[#203C30]">Contact</h2>
          <p className="mt-4">{draft.contactPrompt}</p>
          <p className="mt-4">
            <Link href="/contact" className="underline underline-offset-4">
              Contact Fiona Green Serenity
            </Link>
          </p>
        </section>
      </article>
    </main>
  );
}
