export type VillaAlbum = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  images: string[];
};

export type VillaArchiveImage = {
  src: string;
  albumId: string;
  albumTitle: string;
  index: number;
};

const series = (base: string, count: number) =>
  Array.from({ length: count }, (_, index) => `${base}/${index + 1}.jpeg`);

export const villaImages = {
  drone: series("/Drone", 9),
  outdoor: series("/Outdoor/Outdoor", 25),
  balcony: series("/Balcony", 13),
  guest: series("/Guest", 16),
  kitchenFirst: series("/Kitchen/1st_Apartment_Kitchen", 5),
  kitchenSecond: series("/Kitchen/2nd_Apartment_open_kitchen", 5),
  firstApartmentRoom: series("/1st_Apartment_1_Bed_Room/Room%2002", 11),
  secondApartmentRoom: series("/2nd_Apartment_2_Beds_room/Room_01", 18),
};

export const villaAlbums: VillaAlbum[] = [
  {
    id: "drone",
    title: "Drone Arrival",
    eyebrow: "Approach",
    description: "Aerial day and night views of Fiona Villa wrapped by palms near the coast.",
    images: villaImages.drone,
  },
  {
    id: "outdoor",
    title: "Outdoor Villa Grounds",
    eyebrow: "Garden",
    description: "Facade, lawn, entrance, signage, veranda lights, and the warm evening exterior.",
    images: villaImages.outdoor,
  },
  {
    id: "balcony",
    title: "Balcony Living",
    eyebrow: "Upper Terrace",
    description: "Long shaded balconies, bar seating, garden views, and relaxed outdoor dining.",
    images: villaImages.balcony,
  },
  {
    id: "guest",
    title: "Guest Moments",
    eyebrow: "Lifestyle",
    description: "Reading, working, resting, and slow balcony mornings around the villa.",
    images: villaImages.guest,
  },
  {
    id: "kitchen-first",
    title: "First Apartment Kitchen",
    eyebrow: "Kitchen",
    description: "Compact private kitchen details for the first apartment.",
    images: villaImages.kitchenFirst,
  },
  {
    id: "kitchen-second",
    title: "Second Apartment Open Kitchen",
    eyebrow: "Open Kitchen",
    description: "Open balcony kitchen and bar counter connected to the upper terrace.",
    images: villaImages.kitchenSecond,
  },
  {
    id: "first-apartment-room",
    title: "First Apartment Bedroom",
    eyebrow: "One Bed",
    description: "Bright bedroom, work desk, seating corner, bath, and vanity details.",
    images: villaImages.firstApartmentRoom,
  },
  {
    id: "second-apartment-room",
    title: "Second Apartment Two Beds Room",
    eyebrow: "Two Beds",
    description: "Spacious room, balcony doors, two-bed layout moments, bath, and room details.",
    images: villaImages.secondApartmentRoom,
  },
];

export const allVillaImages: VillaArchiveImage[] = villaAlbums.flatMap((album) =>
  album.images.map((src, index) => ({
    src,
    albumId: album.id,
    albumTitle: album.title,
    index: index + 1,
  })),
);
