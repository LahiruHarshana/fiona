import { contact } from "@/lib/site";
import { villaImages } from "@/lib/villaMedia";

export const homepageWelcome = {
  heading: "Where Tropical Nature Meets the Comfort of Home.",
  copy: "Welcome to Fiona Green Serenity, a charming tropical accommodation nestled in the peaceful surroundings of Mihiripenna, Thalpe, Galle. Surrounded by beautiful greenery and located close to the shores of Dalawella Turtle Beach, Fiona offers a relaxing setting for travellers looking to experience the natural beauty of Sri Lanka. Whether you are travelling as a couple, with family or enjoying a longer coastal getaway, our two thoughtfully arranged apartments provide comfort, privacy and independence. Here, mornings begin with tropical surroundings, days are filled with coastal discoveries, and evenings invite you to unwind in the peaceful atmosphere of our green retreat.",
  ctaLabel: "Discover Our Story",
  ctaHref: "/about",
  photo: {
    src: villaImages.outdoor[0],
    alt: "Garden frontage and tropical planting at Fiona Green Serenity",
  },
} as const;

export const homepageWhyChoose = [
  {
    id: "dalawella",
    title: "Near Dalawella Beach",
    copy: "Enjoy a short walk to the beautiful Dalawella coastline.",
  },
  {
    id: "apartments",
    title: "Private Apartments",
    copy: "Choose accommodation suited to your travel needs.",
  },
  {
    id: "air-conditioning",
    title: "Air-Conditioned Comfort",
    copy: "Relax in comfortable indoor spaces.",
  },
  {
    id: "kitchen",
    title: "Private Kitchen Facilities",
    copy: "Enjoy the flexibility of preparing your own meals.",
  },
  {
    id: "garden",
    title: "Tropical Garden Setting",
    copy: "Experience a peaceful atmosphere surrounded by greenery.",
  },
  {
    id: "host",
    title: "Personal Host Support",
    copy: "Enjoy helpful local guidance and attentive host support.",
  },
] as const;

export const homepageApartments = {
  heading: "Find Your Perfect Space at Fiona.",
  intro:
    "Every traveller has a different idea of the perfect holiday. At Fiona Green Serenity, we offer two distinct apartment experiences, each designed to provide comfort, privacy and a connection to the surrounding tropical environment.",
  ctaLabel: "Explore Our Apartments",
  ctaHref: "/apartments",
  units: [
    {
      id: "green-garden",
      name: "A/C Luxury Green Garden Apartment",
      copy: "Wake up to the beauty of tropical greenery in our ground-floor apartment. Featuring a comfortable air-conditioned bedroom, private bathroom and fully equipped kitchen, this apartment offers a peaceful and independent stay with direct garden frontage.",
      highlights: ["Air conditioning", "Private bathroom", "Private kitchen", "Garden frontage"],
      href: "/apartments#green-garden",
      ctaLabel: "Explore Apartment",
      photo: {
        src: villaImages.firstApartmentRoom[0],
        alt: "Air-conditioned bedroom in the Green Garden Apartment at Fiona Green Serenity",
      },
    },
    {
      id: "balcony-suite",
      name: "Scenic Balcony 2-Bed Suite",
      copy: "Enjoy an elevated stay with two separate bedrooms, a private bathroom, air conditioning, a convenient kitchenette and an open balcony with a bar counter. The suite offers a welcoming setting for families and small groups, with views across the surrounding garden and treetops.",
      highlights: [
        "Two separate bedrooms",
        "Air conditioning",
        "Private bathroom",
        "Kitchenette",
        "Balcony",
        "Garden and treetop views",
      ],
      href: "/apartments#balcony-suite",
      ctaLabel: "Explore Suite",
      photo: {
        src: villaImages.secondApartmentRoom[0],
        alt: "One of the two separate bedrooms in the Scenic Balcony 2-Bed Suite, opening to the balcony",
      },
    },
  ],
} as const;

export const homepageExperience = {
  heading: "More Than a Place to Stay. A Place to Feel at Home.",
  copy: "At Fiona, we believe that a memorable holiday is created through the little moments. Relax in the garden, prepare your favourite meals in your private kitchen or spend a peaceful evening on the balcony. Our personal hosting approach helps you discover the surrounding area, find local shops and make the most of your time in Southern Sri Lanka.",
  photo: {
    src: villaImages.balcony[0],
    alt: "Open balcony looking over the tropical garden at Fiona Green Serenity",
  },
} as const;

export const homepageSouthCoast = {
  heading: "Your Gateway to the Beauty of Sri Lanka's South Coast.",
  copy: "From the peaceful shores of Dalawella to the vibrant atmosphere of Unawatuna and the historic streets of Galle Fort, Fiona Green Serenity places you within reach of memorable destinations. Explore beaches, heritage, nature and local experiences during your stay.",
  note: "Destination photographs of Dalawella, Unawatuna and Galle Fort are not in the current archive. Distances and travel times are not listed until the property location is verified.",
  ctaLabel: "Explore Southern Sri Lanka",
  ctaHref: "/explore-galle",
} as const;

export const homepageGallery = {
  heading: "Take a Glimpse Into Your Next Escape.",
  copy: "Explore the spaces, surroundings and little details that make Fiona Green Serenity special.",
  ctaLabel: "View Our Gallery",
  ctaHref: "/gallery",
  photos: [
    { src: villaImages.outdoor[0], alt: "Garden and veranda at Fiona Green Serenity" },
    { src: villaImages.balcony[5], alt: "Shaded balcony and bar counter at Fiona Green Serenity" },
    { src: villaImages.kitchenFirst[0], alt: "Private kitchen in the Green Garden Apartment" },
    { src: villaImages.firstApartmentRoom[2], alt: "Bedroom in the Green Garden Apartment" },
    { src: villaImages.kitchenSecond[0], alt: "Kitchenette and balcony bar in the Scenic Balcony 2-Bed Suite" },
    { src: villaImages.outdoor[7], alt: "Evening lights along the garden veranda" },
  ],
} as const;

export const homepageHospitality = {
  heading: "Warm Welcomes. Thoughtful Hospitality.",
  copy: "We believe that the best holidays are not only about beautiful places, but also about how you feel during your stay. We are here to help you discover local shops, restaurants and attractions, and to make your Sri Lankan experience comfortable and enjoyable.",
  photo: {
    src: villaImages.drone[4],
    alt: "Evening lights across the garden veranda and balcony at Fiona Green Serenity",
  },
} as const;

export const homepageClosing = {
  heading: "Your Tropical Escape Awaits.",
  copy: "Make your next visit to Sri Lanka a little more special. Discover Fiona Green Serenity and enjoy a peaceful stay near the beautiful South Coast. Contact Fiona directly by WhatsApp or email. This website does not take instant bookings or send online enquiries.",
  primaryLabel: "Contact Fiona on WhatsApp",
  primaryHref: contact.whatsapp,
  secondaryLabel: "Email Fiona",
  secondaryHref: contact.mailtoHref,
} as const;
