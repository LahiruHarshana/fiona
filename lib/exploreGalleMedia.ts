import { optimizedPublicSrc } from "@/lib/webpAdoptedPaths";

export type ExplorePhoto = {
  src: string;
  alt: string;
  objectPosition?: string;
};

export const exploreHeroPhoto: ExplorePhoto = {
  src: optimizedPublicSrc("/explore-galle/dalawella-beach.webp"),
  alt: "Palm-lined sandy beach and shallow turquoise water on Sri Lanka's southern coast",
  objectPosition: "center 42%",
};

/**
 * Visual inspection notes (TASK 27):
 * - koggala-beach.jpeg shows stilt fishermen on the coast at dusk. It is the owner file for Koggala Beach
 *   (traditional fishing culture). Traditional Stilt Fishing uses the dedicated sunset photograph.
 * - tes-estate.jpg is a tea plantation with pickers; it is not labelled as Handunugoda specifically.
 * - koggala-lake.jpeg is a forested lake island; it is not labelled as Madol Duwa.
 * - hikkaduwa-beach.avif could not be decoded for visual review in the local inspector; it is served as the owner-named Hikkaduwa file.
 * - Rumassala Nature Area has no dedicated photograph.
 */
export const destinationPhotos: Record<string, ExplorePhoto | undefined> = {
  "dalawella-turtle-beach": {
    src: optimizedPublicSrc("/explore-galle/dalawella-beach.webp"),
    alt: "Palm-lined southern beach with shallow water, used to illustrate Dalawella Turtle Beach",
    objectPosition: "center 55%",
  },
  "unawatuna-beach": {
    src: optimizedPublicSrc("/explore-galle/unawatuna-beach.jpg"),
    alt: "Aerial view of a palm-fringed bay and turquoise surf, used to illustrate Unawatuna Beach",
    objectPosition: "center 40%",
  },
  "jungle-beach-rumassala": {
    src: optimizedPublicSrc("/explore-galle/jungle-beach.jpg"),
    alt: "Forested headland and sheltered turquoise cove, used to illustrate Jungle Beach at Rumassala",
    objectPosition: "center 55%",
  },
  "koggala-beach": {
    src: optimizedPublicSrc("/explore-galle/koggala-beach.jpeg"),
    alt: "Stilt fishermen on the Koggala coast at dusk, illustrating the beach's traditional fishing culture",
    objectPosition: "center 48%",
  },
  "weligama-beach": {
    src: optimizedPublicSrc("/explore-galle/weligama.webp"),
    alt: "Aerial view of a long sandy bay and small island, used to illustrate Weligama Beach",
    objectPosition: "center 45%",
  },
  "mirissa-beach": {
    src: optimizedPublicSrc("/explore-galle/Mirissa-beach.jpg"),
    alt: "Aerial view of a rocky cove and palm forest, used to illustrate Mirissa Beach",
    objectPosition: "center 40%",
  },
  "hikkaduwa-beach": {
    src: optimizedPublicSrc("/explore-galle/hikkaduwa-beach.avif"),
    alt: "Owner-supplied coastal photograph for Hikkaduwa Beach",
    objectPosition: "center 45%",
  },
  "galle-fort": {
    src: optimizedPublicSrc("/explore-galle/galle-fort.webp"),
    alt: "Galle Fort ramparts, lighthouse and red-tiled roofs beside the Indian Ocean",
    objectPosition: "center 40%",
  },
  "old-dutch-hospital": {
    src: optimizedPublicSrc("/explore-galle/old-dutch-hospital.jpg"),
    alt: "White-arched courtyard of the Old Dutch Hospital in Galle Fort",
    objectPosition: "center 40%",
  },
  "japanese-peace-pagoda": {
    src: optimizedPublicSrc("/explore-galle/pagoda-rumassala.jpeg"),
    alt: "White Japanese Peace Pagoda on the forested Rumassala headland above the sea",
    objectPosition: "center 40%",
  },
  "martin-wickramasinghe-folk-museum": {
    src: optimizedPublicSrc("/explore-galle/martin-folk.jpg"),
    alt: "White tiled-roof vernacular house in a garden setting, used to illustrate the Martin Wickramasinghe Folk Museum",
    objectPosition: "center 45%",
  },
  "koggala-lake-madol-duwa": {
    src: optimizedPublicSrc("/explore-galle/koggala-lake.jpeg"),
    alt: "Forested island reflected in still lake water near Koggala",
    objectPosition: "center 50%",
  },
  "traditional-stilt-fishing": {
    src: optimizedPublicSrc("/explore-galle/traditional-stilt-fishing-in-sri-lanka-2021-08-26-22-38-59-utc-min-1-scaled.jpg"),
    alt: "Stilt fishermen silhouetted at sunset on the southern Sri Lankan coast",
    objectPosition: "center 45%",
  },
  "handunugoda-tea-estate": {
    src: optimizedPublicSrc("/explore-galle/tes-estate.jpg"),
    alt: "Tea pickers working a hillside Ceylon tea plantation",
    objectPosition: "center 45%",
  },
  surfing: {
    src: optimizedPublicSrc("/explore-galle/surfing.jpeg"),
    alt: "Surfer riding a breaking wave along a palm-lined southern shore",
    objectPosition: "center 45%",
  },
  snorkelling: {
    src: optimizedPublicSrc("/explore-galle/snorkelling.jpeg"),
    alt: "Sea turtles swimming over a shallow reef",
    objectPosition: "center 40%",
  },
  diving: {
    src: optimizedPublicSrc("/explore-galle/diving.webp"),
    alt: "Scuba divers above a coral reef with colourful fish",
    objectPosition: "center 40%",
  },
  "whale-watching": {
    src: optimizedPublicSrc("/explore-galle/whale-watching.jpg"),
    alt: "Whale-watching boat near a breaching whale. Sightings are seasonal and not guaranteed",
    objectPosition: "center 45%",
  },
  "boat-excursions": {
    src: optimizedPublicSrc("/explore-galle/boat-excursions.jpg"),
    alt: "Small passenger boat on a mangrove-lined waterway",
    objectPosition: "center 45%",
  },
};
