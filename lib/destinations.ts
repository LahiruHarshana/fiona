export const destinationCategories = [
  { id: "beaches", label: "Beaches & Coastal Destinations", href: "#beaches" },
  { id: "culture", label: "Culture & Heritage", href: "#culture" },
  { id: "nature", label: "Nature & Local Experiences", href: "#nature" },
  { id: "adventure", label: "Adventure & Activities", href: "#adventure" },
] as const;

export type DestinationCategoryId = (typeof destinationCategories)[number]["id"];

export type Destination = {
  id: string;
  name: string;
  slug: string;
  category: DestinationCategoryId;
  description: string;
  image?: string;
  imageAlt?: string;
  mapUrl?: string;
  officialUrl?: string;
  seasonal?: boolean;
  independentlyOperated?: boolean;
};

export const exploreGalleIntro = {
  h1: "Discover the Magic of Sri Lanka's Southern Coast.",
  copy: "Fiona Green Serenity is a peaceful base for guests who want to discover the natural beauty, coastal lifestyle and cultural heritage of Southern Sri Lanka. Located in Mihiripenna, Thalpe, Galle, Sri Lanka, our property offers access to beautiful beaches, historic attractions, nature experiences and local coastal communities.",
  pace: "Explore the coast at your own pace. Spend time by the sea, discover the heritage of Galle, visit local cultural attractions or enjoy a nature excursion. Our host can help with local recommendations and information to support your plans.",
  accommodationNote:
    "The photograph on this page shows Fiona Green Serenity, the accommodation. It is not a picture of Galle Fort, Dalawella Beach or any other attraction.",
} as const;

export const destinations: readonly Destination[] = [
  {
    id: "dalawella-turtle-beach",
    name: "Dalawella Turtle Beach",
    slug: "dalawella-turtle-beach",
    category: "beaches",
    description:
      "A beautiful coastal destination known for tropical scenery, reef areas and sea turtles. Always observe local swimming conditions and respect marine wildlife. Turtle sightings are not guaranteed.",
  },
  {
    id: "unawatuna-beach",
    name: "Unawatuna Beach",
    slug: "unawatuna-beach",
    category: "beaches",
    description:
      "A popular coastal destination with restaurants, cafés, beach activities and diving opportunities. Sea conditions vary. Confirm activities with local operators.",
    independentlyOperated: true,
  },
  {
    id: "jungle-beach-rumassala",
    name: "Jungle Beach — Rumassala",
    slug: "jungle-beach-rumassala",
    category: "beaches",
    description:
      "A coastal cove surrounded by greenery, popular with visitors interested in nature, snorkelling and beach scenery.",
  },
  {
    id: "koggala-beach",
    name: "Koggala Beach",
    slug: "koggala-beach",
    category: "beaches",
    description: "A coastal destination with sandy shores, traditional fishing culture and ocean scenery.",
  },
  {
    id: "weligama-beach",
    name: "Weligama Beach",
    slug: "weligama-beach",
    category: "beaches",
    description: "A wide sandy bay known for its surfing atmosphere and coastal lifestyle.",
  },
  {
    id: "mirissa-beach",
    name: "Mirissa Beach",
    slug: "mirissa-beach",
    category: "beaches",
    description:
      "Known for tropical coastal scenery, beachside restaurants and seasonal whale-watching excursions.",
    seasonal: true,
    independentlyOperated: true,
  },
  {
    id: "hikkaduwa-beach",
    name: "Hikkaduwa Beach",
    slug: "hikkaduwa-beach",
    category: "beaches",
    description: "Known for coral reef areas, marine life, snorkelling and surfing opportunities.",
    independentlyOperated: true,
  },
  {
    id: "galle-fort",
    name: "Galle Fort",
    slug: "galle-fort",
    category: "culture",
    description:
      "A UNESCO World Heritage destination featuring historic streets, colonial architecture, museums, cafés and the iconic lighthouse.",
    officialUrl: "https://whc.unesco.org/en/list/451/",
  },
  {
    id: "old-dutch-hospital",
    name: "Old Dutch Hospital",
    slug: "old-dutch-hospital",
    category: "culture",
    description:
      "A restored colonial-era building inside Galle Fort, now home to restaurants and retail spaces.",
  },
  {
    id: "japanese-peace-pagoda",
    name: "Japanese Peace Pagoda — Rumassala",
    slug: "japanese-peace-pagoda-rumassala",
    category: "culture",
    description:
      "A white Buddhist stupa overlooking the coastline, offering a peaceful cultural experience and coastal views.",
  },
  {
    id: "martin-wickramasinghe-folk-museum",
    name: "Martin Wickramasinghe Folk Museum",
    slug: "martin-wickramasinghe-folk-museum",
    category: "culture",
    description:
      "Discover traditional Sri Lankan village life, folk culture, artefacts and literary heritage in Koggala.",
  },
  {
    id: "koggala-lake-madol-duwa",
    name: "Koggala Lake & Madol Duwa",
    slug: "koggala-lake-madol-duwa",
    category: "nature",
    description:
      "A scenic lake environment where visitors may enjoy boat excursions, island scenery and nature experiences. Confirm local operator and availability.",
    independentlyOperated: true,
  },
  {
    id: "traditional-stilt-fishing",
    name: "Traditional Stilt Fishing",
    slug: "traditional-stilt-fishing",
    category: "nature",
    description:
      "Discover a distinctive traditional fishing practice along parts of the Southern Coast. It is not performed on demand.",
    independentlyOperated: true,
  },
  {
    id: "handunugoda-tea-estate",
    name: "Handunugoda Tea Estate",
    slug: "handunugoda-tea-estate",
    category: "nature",
    description:
      "Discover Ceylon tea culture, plantation landscapes and tea production. Confirm visitor access and tour arrangements.",
    independentlyOperated: true,
  },
  {
    id: "rumassala-nature-area",
    name: "Rumassala Nature Area",
    slug: "rumassala-nature-area",
    category: "nature",
    description: "Explore tropical greenery, nature and coastal viewpoints around the Rumassala headland.",
  },
];

export const adventureActivities: readonly Destination[] = [
  {
    id: "surfing",
    name: "Surfing",
    slug: "surfing",
    category: "adventure",
    description:
      "Southern beaches such as Weligama and Hikkaduwa are known for a surfing atmosphere. Confirm conditions and instruction with local operators.",
    independentlyOperated: true,
    seasonal: true,
  },
  {
    id: "snorkelling",
    name: "Snorkelling",
    slug: "snorkelling",
    category: "adventure",
    description:
      "Reef and cove areas are part of the local coastline. Confirm conditions, equipment and availability with local operators.",
    independentlyOperated: true,
  },
  {
    id: "diving",
    name: "Diving",
    slug: "diving",
    category: "adventure",
    description:
      "Diving is available through independent operators in the region. Confirm conditions, equipment and availability locally.",
    independentlyOperated: true,
  },
  {
    id: "whale-watching",
    name: "Seasonal whale watching",
    slug: "whale-watching",
    category: "adventure",
    description:
      "Whale-watching excursions are seasonal and operator-dependent. Sightings are not guaranteed.",
    independentlyOperated: true,
    seasonal: true,
  },
  {
    id: "boat-excursions",
    name: "Boat excursions",
    slug: "boat-excursions",
    category: "adventure",
    description:
      "Boat trips on the coast or lakes are independently arranged. Confirm safety, operating status and pricing with the operator before you book.",
    independentlyOperated: true,
  },
];

export const adventureDisclaimer =
  "Activities are independently operated and subject to local weather, sea conditions, seasonal availability and operator arrangements. Fiona Green Serenity does not operate these activities.";

export const exploreGalleClosing = {
  heading: "Make Fiona Your Base for Exploring the South Coast.",
  copy: "From the beaches around Unawatuna and Weligama to the coastal atmosphere of Ahangama and Mirissa, Southern Sri Lanka offers a wide range of places to explore. Fiona Green Serenity provides a comfortable place to return to after a day of discovering the region.",
  primaryLabel: "Explore Our Apartments",
  primaryHref: "/apartments",
  secondaryLabel: "Contact Fiona on WhatsApp",
  secondaryHref: "https://wa.me/94743842244",
} as const;

export const destinationsByCategory = (category: DestinationCategoryId) =>
  destinations.filter((item) => item.category === category);
