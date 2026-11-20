import { villaImages } from "@/lib/villaMedia";

export const aboutIntro = {
  h1: "Welcome to Fiona Green Serenity.",
  copy: "A peaceful tropical retreat inspired by nature, comfort and the beauty of Sri Lankan hospitality.",
} as const;

export const aboutStory = {
  heading: "Our Story",
  copy: "Fiona Green Serenity was created with a simple idea: to offer travellers a welcoming and comfortable place to experience the beauty of Sri Lanka's Southern Coast. Located in the peaceful surroundings of Mihiripenna, Thalpe, our property brings together tropical garden spaces, thoughtfully arranged apartments and convenient access to the coastline. We believe that a memorable holiday is built around more than accommodation. It is about the comfort of your surroundings, the freedom to enjoy your own space and the warmth of the people who welcome you.",
  photo: {
    src: villaImages.outdoor[0],
    alt: "Tropical garden and ground-floor veranda at Fiona Green Serenity",
  },
} as const;

export const aboutHospitality = {
  heading: "Our Hospitality",
  copy: "At Fiona, every guest is welcomed with personal attention and a genuine desire to make their stay enjoyable. Whether you need help discovering local attractions, finding nearby shops or arranging transportation, we are happy to assist.",
  photo: {
    src: villaImages.outdoor[7],
    alt: "Evening lights along the garden veranda at Fiona Green Serenity",
  },
} as const;

export const aboutPhilosophy = {
  heading: "Our Philosophy",
  subheading: "Comfort. Nature. Hospitality.",
  copy: "These are the values behind Fiona Green Serenity. We aim to create an environment where guests can feel relaxed, enjoy their independence and discover the beauty of Southern Sri Lanka at their own pace.",
} as const;

export const aboutClosing = {
  heading: "Come as a Guest. Leave with Beautiful Memories.",
  copy: "Send an enquiry to check apartment availability. The host confirms stays personally. This does not reserve a room until Fiona Green Serenity replies.",
  primaryLabel: "Enquire About Your Stay",
  primaryHref: "/contact",
  secondaryLabel: "Explore Our Apartments",
  secondaryHref: "/apartments",
} as const;

export const withheldAboutClaims = [
  "Founding year",
  "Owner or founder names",
  "Awards or ratings",
  "Complimentary airport pickup",
  "Complimentary breakfast or welcome drinks",
  "Guest reviews",
] as const;
