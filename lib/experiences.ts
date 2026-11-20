import { villaImages } from "@/lib/villaMedia";

export type ExperiencePhoto = {
  src: string;
  alt: string;
};

export type ExperienceItem = {
  id: string;
  number: string;
  name: string;
  headline: string;
  description: string;
  setting: "on-property" | "independent";
  settingLabel: string;
  photo?: ExperiencePhoto;
  href?: string;
  hrefLabel?: string;
};

export const experiencesIntro = {
  h1: "Experience the Beauty of Staying at Fiona.",
  copy: "A stay at Fiona Green Serenity is about enjoying the simple pleasures of a tropical holiday. From relaxing in peaceful surroundings to discovering beautiful beaches, enjoying local flavours and exploring the heritage of Galle, there is something special about every day on Sri Lanka's South Coast.",
} as const;

export const experienceItems: readonly ExperienceItem[] = [
  {
    id: "tropical-garden-living",
    number: "01",
    name: "Tropical Garden Living",
    headline: "Find Your Peace in the Green.",
    description:
      "Surrounded by tropical greenery, Fiona offers a peaceful atmosphere where you can slow down, enjoy the surroundings and take a break from everyday routines.",
    setting: "on-property",
    settingLabel: "At Fiona",
    photo: {
      src: villaImages.outdoor[0],
      alt: "Garden frontage and tropical planting at Fiona Green Serenity",
    },
  },
  {
    id: "balcony-moments",
    number: "02",
    name: "Balcony Moments",
    headline: "Slow Mornings and Beautiful Evenings.",
    description:
      "Enjoy a relaxing morning coffee, spend time on the open balcony or simply take in the garden and treetop views.",
    setting: "on-property",
    settingLabel: "At Fiona",
    photo: {
      src: villaImages.balcony[0],
      alt: "Open balcony with garden and treetop views at Fiona Green Serenity",
    },
  },
  {
    id: "beachside-adventures",
    number: "03",
    name: "Beachside Adventures",
    headline: "Discover the Beauty of Dalawella.",
    description:
      "Just a short walk from Fiona, Dalawella Turtle Beach is one of the highlights of the surrounding coastline. Enjoy the beautiful ocean scenery, coastal atmosphere and nearby beach experiences. Always observe local swimming conditions and respect marine wildlife.",
    setting: "independent",
    settingLabel: "Independent coastal visit",
  },
  {
    id: "local-food-culture",
    number: "04",
    name: "Local Food & Culture",
    headline: "Taste the Flavours of Sri Lanka.",
    description:
      "Discover local restaurants, traditional Sri Lankan dishes, fresh tropical fruits and the welcoming food culture of the Southern Province. Our host can help you discover nearby places to eat.",
    setting: "independent",
    settingLabel: "Independently operated dining",
  },
  {
    id: "explore-south-coast",
    number: "05",
    name: "Explore the South Coast",
    headline: "Make Every Day an Adventure.",
    description:
      "Explore historic Galle Fort, visit the beautiful beaches of Unawatuna and discover the charming coastal communities surrounding Mihiripenna.",
    setting: "independent",
    settingLabel: "Independent exploration",
    href: "/explore-galle",
    hrefLabel: "Explore Galle",
  },
  {
    id: "personal-guest-hospitality",
    number: "06",
    name: "Personal Guest Hospitality",
    headline: "A Warm Welcome, the Sri Lankan Way.",
    description:
      "Enjoy a thoughtful welcome and personal local guidance during your stay. We are happy to help with local shopping recommendations and travel arrangements.",
    setting: "on-property",
    settingLabel: "At Fiona",
    photo: {
      src: villaImages.drone[4],
      alt: "Evening lights across the garden veranda and balcony at Fiona Green Serenity",
    },
  },
];

export const experiencesClosing = {
  heading: "Your South Coast Experience Starts at Fiona.",
  copy: "Stay in a peaceful apartment at Fiona Green Serenity and use it as a calm base for exploring Southern Sri Lanka at your own pace. Send an enquiry and the host will confirm availability personally. This does not reserve a stay until Fiona Green Serenity replies.",
  primaryLabel: "Enquire About Your Stay",
  primaryHref: "/contact",
  secondaryLabel: "Explore Galle",
  secondaryHref: "/explore-galle",
} as const;

export const withheldExperienceClaims = [
  "Spa treatments",
  "Yoga classes",
  "Guided tours operated by Fiona",
  "Complimentary meals or restaurant service",
  "Horse riding",
  "Jacuzzi",
  "Swimming pool",
  "Airport pickup as an included service",
  "Guaranteed wildlife encounters",
  "Guaranteed beach safety",
  "Complimentary welcome drinks",
  "Licensed destination photographs of Dalawella, Unawatuna or Galle Fort",
] as const;
