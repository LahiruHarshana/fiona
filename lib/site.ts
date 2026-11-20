export const brand = {
  name: "Fiona Green Serenity",
  alternativeName: "Villa FIONA",
  tagline: "A Little Paradise. A World of Serenity.",
  location: "Mihiripenna, Thalpe, Galle, Sri Lanka",
} as const;

export const contact = {
  email: "info@fionagreenserenity.com",
  phoneDisplay: "+94 74 384 2244",
  phoneE164: "+94743842244",
  telHref: "tel:+94743842244",
  mailtoHref: "mailto:info@fionagreenserenity.com",
  whatsapp: "https://wa.me/94743842244",
  instagram: "https://www.instagram.com/fiona_green_serenity/",
  instagramHandle: "@fiona_green_serenity",
  facebook: "https://www.facebook.com/share/1A9wDDBvgC/",
  facebookLabel: "Fiona Green Serenity",
} as const;

export const routes = {
  home: "/",
  apartments: "/apartments",
  experiences: "/experiences",
  exploreGalle: "/explore-galle",
  gallery: "/gallery",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy",
} as const;

export type SiteRoute = (typeof routes)[keyof typeof routes];

export type NavigationLink = {
  label: string;
  href: SiteRoute;
};

export const navigationItems: readonly NavigationLink[] = [
  { label: "Home", href: routes.home },
  { label: "Our Apartments", href: routes.apartments },
  { label: "Experiences", href: routes.experiences },
  { label: "Explore Galle", href: routes.exploreGalle },
  { label: "Gallery", href: routes.gallery },
  { label: "About Fiona", href: routes.about },
  { label: "Contact", href: routes.contact },
] as const;

export const footerNavigation: readonly NavigationLink[] = [
  { label: "Home", href: routes.home },
  { label: "Apartments", href: routes.apartments },
  { label: "Experiences", href: routes.experiences },
  { label: "Explore Galle", href: routes.exploreGalle },
  { label: "Gallery", href: routes.gallery },
  { label: "About", href: routes.about },
  { label: "Contact", href: routes.contact },
] as const;

export const apartmentIds = ["green-garden", "balcony-suite"] as const;

export type ApartmentId = (typeof apartmentIds)[number];

export const apartments = {
  greenGarden: {
    id: "green-garden" satisfies ApartmentId,
    name: "A/C Luxury Green Garden Apartment",
  },
  balconySuite: {
    id: "balcony-suite" satisfies ApartmentId,
    name: "Scenic Balcony 2-Bed Suite",
  },
} as const;

export const siteCopy = {
  defaultTitle: "Fiona Green Serenity | Stay Near Dalawella Beach, Galle",
  defaultDescription:
    "Discover Fiona Green Serenity, a peaceful tropical retreat in Mihiripenna, Galle. Enjoy private apartments, a lush garden and easy access to Dalawella Turtle Beach. Enquire directly.",
  copyright: "© 2026 Fiona Green Serenity. All Rights Reserved.",
} as const;
