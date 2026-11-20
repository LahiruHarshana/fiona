import { apartments as apartmentNames, type ApartmentId } from "@/lib/site";
import { villaImages } from "@/lib/villaMedia";

export type ApartmentFacility = {
  id: string;
  label: string;
  icon: ApartmentFacilityIcon;
};

export type ApartmentFacilityIcon =
  | "layers"
  | "building"
  | "wind"
  | "bed"
  | "beds"
  | "bath"
  | "chef"
  | "trees"
  | "panels"
  | "glass"
  | "leaf";

export type ApartmentPhoto = {
  src: string;
  alt: string;
};

export type ApartmentProfile = {
  id: ApartmentId;
  name: string;
  eyebrow: string;
  headline: string;
  floor: string;
  bedrooms: string;
  bathroom: string;
  kitchen: string;
  outdoor: string;
  description: string;
  idealFor: string;
  ctaLabel: string;
  enquiryHref: string;
  facilities: readonly ApartmentFacility[];
  photos: readonly ApartmentPhoto[];
  photoNote?: string;
};

export const apartmentsIntro = {
  h1: "Comfortable Stays, Surrounded by Nature.",
  copy: "Discover two unique apartment experiences at Fiona Green Serenity, where comfortable interiors, private facilities and tropical surroundings come together. Whether you prefer the convenience of a ground-floor garden apartment or the elevated atmosphere of a spacious two-bedroom balcony suite, each space offers a welcoming setting for your stay in Mihiripenna, Galle.",
} as const;

export const stayYourWay = {
  heading: "Stay Your Way",
  copy: "Whether you are planning a short beach holiday, a family visit or an extended stay in Southern Sri Lanka, our apartments provide a comfortable base for your journey. Contact us directly to discuss availability and the accommodation option that best suits your travel dates.",
  enquiryNote:
    "Guests send an enquiry. The host then confirms availability in person. This is not real-time booking and does not reserve a stay until Fiona Green Serenity replies.",
  ctaLabel: "Check Availability",
  ctaHref: "/contact",
} as const;

export const apartmentProfiles: readonly ApartmentProfile[] = [
  {
    id: apartmentNames.greenGarden.id,
    name: apartmentNames.greenGarden.name,
    eyebrow: "Apartment 01",
    headline: "Wake Up to a Little More Green.",
    floor: "Ground floor",
    bedrooms: "One air-conditioned bedroom",
    bathroom: "Private bathroom",
    kitchen: "Fully equipped private kitchen",
    outdoor: "Direct garden frontage",
    description:
      "Experience the peaceful atmosphere of Fiona's ground-floor Green Garden Apartment. Designed for travellers who appreciate privacy and convenient living, this apartment combines a comfortable air-conditioned bedroom with a private bathroom and a fully equipped kitchen. Its direct garden frontage creates a lovely connection to the surrounding tropical greenery, offering a relaxing place to return to after exploring the beaches, restaurants and attractions of Galle.",
    idealFor: "Couples and independent travellers seeking comfortable apartment-style accommodation.",
    ctaLabel: "Enquire About This Apartment",
    enquiryHref: "/contact?apartment=green-garden",
    facilities: [
      { id: "floor", label: "Ground-floor apartment", icon: "layers" },
      { id: "ac", label: "Air-conditioned bedroom", icon: "wind" },
      { id: "bed", label: "Comfortable bedroom", icon: "bed" },
      { id: "bath", label: "Private bathroom", icon: "bath" },
      { id: "kitchen", label: "Fully equipped private kitchen", icon: "chef" },
      { id: "garden", label: "Direct garden frontage", icon: "trees" },
    ],
    photos: [
      {
        src: villaImages.firstApartmentRoom[0],
        alt: "Air-conditioned bedroom in the Green Garden Apartment at Fiona Green Serenity",
      },
      {
        src: villaImages.firstApartmentRoom[2],
        alt: "Bedroom, writing desk and air conditioning in the Green Garden Apartment",
      },
      {
        src: villaImages.firstApartmentRoom[5],
        alt: "Green Garden Apartment bedroom opening toward the garden",
      },
      {
        src: villaImages.kitchenFirst[0],
        alt: "Fully equipped private kitchen in the Green Garden Apartment",
      },
      {
        src: villaImages.kitchenFirst[3],
        alt: "Cooktop in the Green Garden Apartment kitchen",
      },
      {
        src: villaImages.outdoor[0],
        alt: "Garden frontage and ground-floor veranda at Fiona Green Serenity",
      },
    ],
  },
  {
    id: apartmentNames.balconySuite.id,
    name: apartmentNames.balconySuite.name,
    eyebrow: "Apartment 02",
    headline: "Space to Relax. A Balcony to Enjoy.",
    floor: "Upper floor",
    bedrooms: "Two separate bedrooms",
    bathroom: "Private bathroom",
    kitchen: "Private kitchenette",
    outdoor: "Open balcony with bar counter, garden and treetop views",
    description:
      "Discover the comfort of our upper-floor Scenic Balcony 2-Bed Suite, a welcoming accommodation space designed for guests who appreciate additional room and a relaxed tropical setting. Featuring two separate bedrooms, full air conditioning, a modern private bathroom and an open balcony with a convenient bar counter, this apartment offers a pleasant environment for enjoying your holiday. The private kitchenette provides additional flexibility, while the elevated position offers views across the surrounding garden and treetops.",
    idealFor: "Families, friends and guests who prefer additional space.",
    ctaLabel: "Enquire About This Suite",
    enquiryHref: "/contact?apartment=balcony-suite",
    photoNote:
      "The suite photographs are stored in a single archive folder. The selection shows two distinct bedrooms — one opening to the balcony, and a second separate bedroom — plus the kitchenette and balcony. Dedicated bathroom stills are limited.",
    facilities: [
      { id: "floor", label: "Upper-floor suite", icon: "building" },
      { id: "beds", label: "Two separate bedrooms", icon: "beds" },
      { id: "ac", label: "Air conditioning", icon: "wind" },
      { id: "bath", label: "Private bathroom", icon: "bath" },
      { id: "kitchen", label: "Private kitchenette", icon: "chef" },
      { id: "balcony", label: "Open balcony", icon: "panels" },
      { id: "bar", label: "Balcony bar counter", icon: "glass" },
      { id: "views", label: "Garden and treetop views", icon: "leaf" },
    ],
    photos: [
      {
        src: villaImages.secondApartmentRoom[0],
        alt: "One of the two separate bedrooms in the Scenic Balcony 2-Bed Suite, opening to the balcony",
      },
      {
        src: villaImages.secondApartmentRoom[4],
        alt: "Second separate bedroom in the Scenic Balcony 2-Bed Suite",
      },
      {
        src: villaImages.secondApartmentRoom[9],
        alt: "Second separate bedroom, another view, in the Scenic Balcony 2-Bed Suite",
      },
      {
        src: villaImages.kitchenSecond[0],
        alt: "Private kitchenette and balcony bar counter in the Scenic Balcony 2-Bed Suite",
      },
      {
        src: villaImages.balcony[0],
        alt: "Open balcony with garden and treetop views at Fiona Green Serenity",
      },
      {
        src: villaImages.balcony[5],
        alt: "Shaded balcony and bar counter looking over the tropical garden",
      },
    ],
  },
];

export const withheldFacilities = [
  "Wi-Fi availability or speeds",
  "Free or secure parking",
  "Hot water",
  "Airport pickup included",
  "Complimentary breakfast",
  "Swimming pool",
  "Jacuzzi",
  "Spa",
  "Occupancy limits",
  "Bed sizes or extra beds",
] as const;
