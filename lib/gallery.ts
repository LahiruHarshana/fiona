import { villaImages } from "@/lib/villaMedia";

export const galleryIntro = {
  h1: "A Visual Journey Through Fiona Green Serenity.",
  copy: "Every corner of Fiona tells a story. From our tropical garden and welcoming outdoor spaces to the comfortable interiors of our apartments, explore the details that make your stay special.",
} as const;

export const galleryClosing = {
  heading: "Discover Your Own Little Paradise.",
  copy: "The photographs on this page show Fiona Green Serenity. Contact Fiona directly to discuss availability. This website does not take instant bookings.",
  primaryLabel: "Explore Our Apartments",
  primaryHref: "/apartments",
  secondaryLabel: "Contact Fiona on WhatsApp",
  secondaryHref: "https://wa.me/94743842244",
} as const;

export const galleryFilters = [
  { id: "all", shortLabel: "All Photos", label: "All Photos" },
  { id: "exterior", shortLabel: "Exterior", label: "Villa Exterior & Architecture" },
  { id: "garden", shortLabel: "Garden", label: "Tropical Garden & Surroundings" },
  { id: "green-garden", shortLabel: "Green Garden Apartment", label: "A/C Luxury Green Garden Apartment" },
  { id: "balcony-suite", shortLabel: "Balcony Suite", label: "Scenic Balcony 2-Bed Suite — Both Bedrooms" },
  { id: "kitchens", shortLabel: "Kitchens", label: "Kitchens & Dining Spaces" },
  { id: "balcony", shortLabel: "Balcony", label: "Balcony & Outdoor Living" },
  { id: "details", shortLabel: "Guest Comfort", label: "Details & Guest Comfort" },
] as const;

export type GalleryFilterId = (typeof galleryFilters)[number]["id"];
export type GalleryCategoryId = Exclude<GalleryFilterId, "all">;

export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategoryId;
  title: string;
  description?: string;
  width: number;
  height: number;
};

export const galleryPhotos: readonly GalleryPhoto[] = [
  {
    id: "exterior-aerial",
    src: villaImages.drone[0],
    alt: "Aerial view of Fiona Green Serenity among coconut palms in Mihiripenna",
    category: "exterior",
    title: "Villa from above",
    description: "The two-storey house, garden lawn and upper balcony, photographed from the air.",
    width: 1200,
    height: 1600,
  },
  {
    id: "exterior-front",
    src: villaImages.outdoor[9],
    alt: "Front elevation of Fiona Green Serenity with garden planting and upper balcony",
    category: "exterior",
    title: "Garden frontage",
    width: 1600,
    height: 1067,
  },
  {
    id: "exterior-night-facade",
    src: villaImages.drone[4],
    alt: "Fiona Green Serenity at night with lit balcony and ground-floor veranda",
    category: "exterior",
    title: "Evening architecture",
    width: 1600,
    height: 900,
  },
  {
    id: "exterior-night-street",
    src: villaImages.outdoor[14],
    alt: "Street-side night view of Fiona Green Serenity with balcony lights and planting",
    category: "exterior",
    title: "Night elevation",
    width: 1067,
    height: 1600,
  },
  {
    id: "garden-veranda",
    src: villaImages.outdoor[0],
    alt: "Tropical garden lawn and ground-floor veranda at Fiona Green Serenity",
    category: "garden",
    title: "Garden and veranda",
    width: 1600,
    height: 1067,
  },
  {
    id: "garden-courtyard",
    src: villaImages.outdoor[3],
    alt: "Courtyard garden with planting beside the ground-floor sitting area",
    category: "garden",
    title: "Courtyard greenery",
    width: 1600,
    height: 1067,
  },
  {
    id: "garden-evening",
    src: villaImages.outdoor[7],
    alt: "Evening garden path and veranda at Fiona Green Serenity",
    category: "garden",
    title: "Garden at night",
    description: "The open doors show the ground-floor apartment. This is the garden, not a separate villa.",
    width: 1600,
    height: 1067,
  },
  {
    id: "green-garden-bedroom",
    src: villaImages.firstApartmentRoom[0],
    alt: "Air-conditioned bedroom in the A/C Luxury Green Garden Apartment at Fiona Green Serenity",
    category: "green-garden",
    title: "Green Garden bedroom",
    width: 1600,
    height: 1067,
  },
  {
    id: "green-garden-desk",
    src: villaImages.firstApartmentRoom[2],
    alt: "Bedroom, writing desk and air conditioning in the Green Garden Apartment",
    category: "green-garden",
    title: "Bedroom and writing desk",
    width: 1600,
    height: 1067,
  },
  {
    id: "green-garden-garden-doors",
    src: villaImages.firstApartmentRoom[5],
    alt: "Green Garden Apartment bedroom opening toward the garden",
    category: "green-garden",
    title: "Garden doors",
    width: 1600,
    height: 1067,
  },
  {
    id: "suite-bedroom-balcony",
    src: villaImages.secondApartmentRoom[0],
    alt: "One of two separate bedrooms in the Scenic Balcony 2-Bed Suite, opening to the balcony",
    category: "balcony-suite",
    title: "Suite bedroom toward the balcony",
    description: "The first of two separate bedrooms in the upper suite.",
    width: 1600,
    height: 1067,
  },
  {
    id: "suite-bedroom-balcony-angle",
    src: villaImages.secondApartmentRoom[1],
    alt: "Scenic Balcony 2-Bed Suite bedroom with air conditioning and balcony doors",
    category: "balcony-suite",
    title: "Suite bedroom, another view",
    width: 1600,
    height: 1067,
  },
  {
    id: "suite-second-bedroom",
    src: villaImages.secondApartmentRoom[4],
    alt: "Second separate bedroom in the Scenic Balcony 2-Bed Suite at Fiona Green Serenity",
    category: "balcony-suite",
    title: "Second suite bedroom",
    description: "A visually distinct second bedroom in the same suite archive.",
    width: 1600,
    height: 1067,
  },
  {
    id: "suite-second-bedroom-tall",
    src: villaImages.secondApartmentRoom[9],
    alt: "Second separate bedroom in the Scenic Balcony 2-Bed Suite, looking toward the high ceiling",
    category: "balcony-suite",
    title: "Second suite bedroom, tall view",
    width: 1067,
    height: 1600,
  },
  {
    id: "kitchen-green-garden",
    src: villaImages.kitchenFirst[0],
    alt: "Private kitchen in the A/C Luxury Green Garden Apartment at Fiona Green Serenity",
    category: "kitchens",
    title: "Green Garden kitchen",
    description: "A kitchen belonging to the Green Garden Apartment, not a separate unit.",
    width: 1600,
    height: 1067,
  },
  {
    id: "kitchen-cooktop",
    src: villaImages.kitchenFirst[3],
    alt: "Cooktop in the Green Garden Apartment kitchen",
    category: "kitchens",
    title: "Kitchen cooktop",
    width: 1067,
    height: 1600,
  },
  {
    id: "kitchen-suite-bar",
    src: villaImages.kitchenSecond[0],
    alt: "Private kitchenette and balcony bar counter in the Scenic Balcony 2-Bed Suite",
    category: "kitchens",
    title: "Suite kitchenette",
    description: "The upper-suite kitchenette. It is not a third apartment.",
    width: 1067,
    height: 1600,
  },
  {
    id: "balcony-long",
    src: villaImages.balcony[0],
    alt: "Open balcony with garden and treetop views at Fiona Green Serenity",
    category: "balcony",
    title: "Upper balcony",
    width: 1600,
    height: 1066,
  },
  {
    id: "balcony-dining",
    src: villaImages.balcony[2],
    alt: "Outdoor dining table on the upper balcony overlooking tropical trees",
    category: "balcony",
    title: "Balcony dining",
    width: 1600,
    height: 1067,
  },
  {
    id: "balcony-bar",
    src: villaImages.balcony[5],
    alt: "Shaded balcony and bar counter looking over the tropical garden",
    category: "balcony",
    title: "Balcony bar seating",
    width: 1600,
    height: 1066,
  },
  {
    id: "balcony-evening",
    src: villaImages.kitchenSecond[2],
    alt: "Evening view of the upper balcony and bar counter at Fiona Green Serenity",
    category: "balcony",
    title: "Balcony in the evening",
    width: 1600,
    height: 1067,
  },
  {
    id: "details-balcony-seat",
    src: villaImages.guest[0],
    alt: "Guest relaxing on the balcony daybed at Fiona Green Serenity",
    category: "details",
    title: "Balcony daybed",
    width: 1067,
    height: 1600,
  },
  {
    id: "details-reading",
    src: villaImages.guest[7],
    alt: "Guest reading in a sitting corner at Fiona Green Serenity",
    category: "details",
    title: "A quiet sitting corner",
    width: 1067,
    height: 1600,
  },
  {
    id: "details-bathroom",
    src: villaImages.secondApartmentRoom[11],
    alt: "Private bathroom with shower at Fiona Green Serenity",
    category: "details",
    title: "Bathroom",
    description: "Bathroom still from the upper-suite archive. It is not a separate apartment.",
    width: 1600,
    height: 1067,
  },
  {
    id: "details-tea-tray",
    src: villaImages.secondApartmentRoom[13],
    alt: "Tea and coffee tray in a guest room at Fiona Green Serenity",
    category: "details",
    title: "Tea tray",
    width: 1067,
    height: 1600,
  },
];

export const galleryPhotosByCategory = (filter: GalleryFilterId): readonly GalleryPhoto[] => {
  if (filter === "all") {
    return galleryPhotos;
  }

  return galleryPhotos.filter((photo) => photo.category === filter);
};

export const pendingPhotoVerification = [
  "Some files in `2nd_Apartment_2_Beds_room/Room_01` appear to show the Green Garden bedroom (for example Room_01/3.jpeg). They are omitted from the suite gallery until the owner confirms the room.",
  "Dedicated bathroom stills for the Green Garden Apartment are limited in the archive.",
  "Guest lifestyle photographs may include people; image-release confirmation remains an owner item.",
  "Hero-protected files `/Guest/4.jpeg`, `/Drone/3.jpeg` and `/Drone/9.jpeg` are not used in this gallery.",
] as const;
