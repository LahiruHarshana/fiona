"use client";

import {
  allVillaImages,
  villaAlbums,
  villaImages,
  type VillaAlbum,
} from "@/lib/villaMedia";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  BedDouble,
  ChefHat,
  Compass,
  DoorOpen,
  Images,
  Sparkles,
  Waves,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const fi = {
  logo: "/fiona-images/logo.png",
  heroDay: villaImages.drone[8],
  heroNight: villaImages.drone[2],
  aerialGreen: villaImages.drone[6],
  aerialCoast: villaImages.drone[5],
  outdoorDay: villaImages.outdoor[2],
  outdoorGarden: villaImages.outdoor[9],
  outdoorGlow: villaImages.outdoor[6],
  outdoorEntrance: villaImages.outdoor[16],
  outdoorNight: villaImages.outdoor[12],
  balconyWide: villaImages.balcony[1],
  balconyDining: villaImages.balcony[10],
  balconyNight: villaImages.balcony[4],
  guestBench: villaImages.guest[3],
  guestGarden: villaImages.guest[10],
  guestWork: villaImages.guest[11],
  kitchenFirst: villaImages.kitchenFirst[0],
  kitchenSecond: villaImages.kitchenSecond[2],
  roomFirst: villaImages.firstApartmentRoom[1],
  roomFirstBath: villaImages.firstApartmentRoom[3],
  roomSecond: villaImages.secondApartmentRoom[0],
  roomSecondBath: villaImages.secondApartmentRoom[11],
};

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const heroIntroStorageKey = "villa-fiona-hero-intro-played";
const bg = (src: string) => `url("${src}")`;

function hasHeroIntroPlayed() {
  try {
    return window.sessionStorage.getItem(heroIntroStorageKey) === "true";
  } catch {
    return false;
  }
}

function rememberHeroIntroPlayed() {
  try {
    window.sessionStorage.setItem(heroIntroStorageKey, "true");
  } catch {
    // Private browser modes can block storage; the intro can still finish normally.
  }
}

type CinemaScene = {
  kicker: string;
  title: string;
  copy: string;
  image: string;
  detailImage: string;
  position: string;
  metric: string;
};

const cinemaScenes: CinemaScene[] = [
  {
    kicker: "01 / Arrival",
    title: "First, the palms open.",
    copy: "The villa appears from above as a quiet house wrapped in coconut trees, with the ocean line close enough to feel like part of the address.",
    image: fi.heroDay,
    detailImage: fi.aerialCoast,
    position: "center center",
    metric: "Drone approach",
  },
  {
    kicker: "02 / Garden",
    title: "A warm house in a green pocket.",
    copy: "Courtyard paths, soft planting, shaded walls, and the glow of the veranda turn the exterior into the first room of the stay.",
    image: fi.outdoorDay,
    detailImage: fi.outdoorEntrance,
    position: "center center",
    metric: "Garden frontage",
  },
  {
    kicker: "03 / Night Lights",
    title: "The villa changes when evening arrives.",
    copy: "At night Fiona becomes lantern-like: balcony rails, garden edges, and warm interior light create a calm South Coast arrival.",
    image: fi.outdoorGlow,
    detailImage: fi.heroNight,
    position: "center center",
    metric: "Evening exterior",
  },
  {
    kicker: "04 / Balcony",
    title: "The long shaded edge.",
    copy: "The balcony is the villa's slowest place: bar stools, dining corners, garden views, and a roofline made for late conversations.",
    image: fi.balconyWide,
    detailImage: fi.balconyDining,
    position: "center center",
    metric: "Open terrace living",
  },
  {
    kicker: "05 / Guest Rhythm",
    title: "A stay with human scale.",
    copy: "Reading seats, work corners, morning tea, and balcony pauses show the villa as a place for real days, not only a photo moment.",
    image: fi.guestGarden,
    detailImage: fi.guestWork,
    position: "center center",
    metric: "Rest and work corners",
  },
  {
    kicker: "06 / Kitchens",
    title: "Private cooking, open-air ease.",
    copy: "One apartment keeps a compact private kitchen; the second opens its kitchen counter to the balcony for easy shared meals.",
    image: fi.kitchenSecond,
    detailImage: fi.kitchenFirst,
    position: "center center",
    metric: "Two kitchen styles",
  },
  {
    kicker: "07 / First Apartment",
    title: "A quiet one-bed apartment.",
    copy: "Soft linen, a writing desk, seating corner, and a clean bath make the first apartment feel simple, bright, and self-contained.",
    image: fi.roomFirst,
    detailImage: fi.roomFirstBath,
    position: "center center",
    metric: "One bedroom apartment",
  },
  {
    kicker: "08 / Second Apartment",
    title: "More room for a shared stay.",
    copy: "The second apartment room opens wide, with generous floor space, balcony doors, bath details, and flexible two-bed comfort.",
    image: fi.roomSecond,
    detailImage: fi.roomSecondBath,
    position: "center center",
    metric: "Two beds room",
  },
];

const stayAlbums = villaAlbums.filter((album) =>
  ["first-apartment-room", "second-apartment-room", "kitchen-first", "kitchen-second"].includes(album.id),
);

const reelRows = [
  {
    label: "Arrival and garden",
    images: [...villaImages.drone, ...villaImages.outdoor],
  },
  {
    label: "Balcony and guest rhythm",
    images: [...villaImages.balcony, ...villaImages.guest],
  },
  {
    label: "Kitchens and apartments",
    images: [
      ...villaImages.kitchenFirst,
      ...villaImages.kitchenSecond,
      ...villaImages.firstApartmentRoom,
      ...villaImages.secondApartmentRoom,
    ],
  },
];

function HeroLoader({
  isVisible,
  prefersReducedMotion,
}: {
  isVisible: boolean;
  prefersReducedMotion: boolean | null;
}) {
  const loaderDuration = prefersReducedMotion ? 0.25 : 2.05;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[80] isolate overflow-hidden bg-olive-900 text-ivory"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: prefersReducedMotion ? 0.2 : 0.85, ease },
          }}
          role="status"
          aria-label="Loading Villa FIONA"
        >
          <div className="absolute inset-0 bg-[#111709]" aria-hidden="true" />
          <motion.div
            className="absolute inset-[-12%] bg-cover bg-center"
            style={{ backgroundImage: bg(fi.heroDay) }}
            initial={{
              scale: prefersReducedMotion ? 1 : 0.42,
              opacity: prefersReducedMotion ? 0.55 : 0.18,
              filter: prefersReducedMotion ? "blur(0px) brightness(0.7)" : "blur(9px) brightness(0.42)",
            }}
            animate={{
              scale: prefersReducedMotion ? 1 : [0.42, 0.7, 1.08],
              opacity: prefersReducedMotion ? 0.55 : [0.18, 0.42, 0.82],
              filter: prefersReducedMotion
                ? "blur(0px) brightness(0.7)"
                : [
                    "blur(9px) brightness(0.42)",
                    "blur(3px) brightness(0.62)",
                    "blur(0px) brightness(0.78)",
                  ],
            }}
            transition={{ duration: loaderDuration, ease }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: bg(fi.heroNight) }}
            initial={{ opacity: 0, scale: 1.16 }}
            animate={{
              opacity: prefersReducedMotion ? 0 : [0, 0, 0.28],
              scale: prefersReducedMotion ? 1 : [1.16, 1.08, 1.02],
            }}
            transition={{ duration: loaderDuration, ease }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 48%, rgba(202,174,105,0.24), transparent 27%), " +
                "radial-gradient(circle at 50% 50%, transparent 0 20%, rgba(10,13,6,0.42) 46%, rgba(10,13,6,0.9) 100%), " +
                "linear-gradient(90deg, rgba(9,12,5,0.92), rgba(14,18,10,0.55) 48%, rgba(9,12,5,0.92))",
            }}
            aria-hidden="true"
          />
          {[0, 1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute left-1/2 top-1/2 aspect-square w-[42vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/25"
              initial={{ scale: 0.18, opacity: 0 }}
              animate={{
                scale: prefersReducedMotion ? 1 : [0.18, 1.08 + ring * 0.24, 2 + ring * 0.36],
                opacity: prefersReducedMotion ? 0.15 : [0, 0.35, 0],
              }}
              transition={{ duration: 1.65, delay: ring * 0.16, ease }}
              aria-hidden="true"
            />
          ))}
          <div className="film-grain absolute inset-0 opacity-25" aria-hidden="true" />

          <div className="pointer-events-none absolute inset-x-5 top-6 z-10 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0] text-gold/70 sm:inset-x-10">
            <span>Fiona Villa</span>
            <span>Mihiripanna, Galle</span>
          </div>

          <div className="relative z-10 flex min-h-screen items-center justify-center px-5">
            <div className="w-full max-w-3xl text-center">
              <motion.div
                className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full border border-gold/45 bg-olive-900/40 p-3 shadow-[0_0_90px_rgba(202,174,105,0.24)] backdrop-blur-md sm:h-36 sm:w-36"
                initial={{ opacity: 0, scale: 0.18, y: 76, rotate: -8 }}
                animate={{
                  opacity: 1,
                  scale: prefersReducedMotion ? 1 : [0.18, 0.58, 1],
                  y: prefersReducedMotion ? 0 : [76, 24, 0],
                  rotate: 0,
                }}
                transition={{ duration: prefersReducedMotion ? 0.2 : 1.08, delay: prefersReducedMotion ? 0 : 0.32, ease }}
              >
                <img src={fi.logo} alt="" className="h-full w-full rounded-full object-cover" aria-hidden="true" />
              </motion.div>

              <motion.p
                className="text-[10px] font-bold uppercase tracking-[0] text-gold sm:text-xs"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.48, delay: prefersReducedMotion ? 0 : 0.78, ease }}
              >
                Aerial approach
              </motion.p>

              <div className="mt-5 overflow-hidden">
                <motion.h2
                  className="font-display text-6xl font-light leading-none text-ivory sm:text-8xl lg:text-[8rem]"
                  initial={{ y: "125%", opacity: 0, scale: 0.82 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: prefersReducedMotion ? 0.2 : 0.82, delay: prefersReducedMotion ? 0 : 0.95, ease }}
                >
                  Villa <em>FIONA</em>
                </motion.h2>
              </div>
              <motion.p
                className="mx-auto mt-5 max-w-md text-xs uppercase tracking-[0] text-ivory/55"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 1.18, ease }}
              >
                From the palms to the veranda
              </motion.p>
            </div>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 h-1 w-full origin-left bg-gold"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 1.65, ease }}
            aria-hidden="true"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SceneLayer({
  scene,
  index,
  total,
  progress,
}: {
  scene: CinemaScene;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const mid = (index + 0.5) / total;
  const end = (index + 1) / total;
  const fadeInStart = Math.max(0, start - 0.035);
  const fadeInEnd = Math.min(1, start + 0.065);
  const fadeOutStart = Math.max(0, end - 0.065);
  const fadeOutEnd = Math.min(1, end + 0.035);
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const opacityRange = isFirst
    ? [0, fadeOutStart, fadeOutEnd]
    : isLast
      ? [fadeInStart, fadeInEnd, 1]
      : [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd];
  const opacityValues = isFirst
    ? [1, 1, 0]
    : isLast
      ? [0, 1, 1]
      : [0, 1, 1, 0];

  const opacity = useTransform(progress, opacityRange, opacityValues);
  const scale = useTransform(progress, [start, end], [1.12, 1.02]);
  const bgY = useTransform(progress, [start, end], ["-8%", "8%"]);
  const textY = useTransform(progress, [start, mid, end], [44, 0, -42]);
  const detailY = useTransform(progress, [start, end], [58, -72]);
  const detailTurn = useTransform(progress, [start, end], [-2.5, 2.5]);
  const indexY = useTransform(progress, [start, end], [70, -56]);
  const scanY = useTransform(progress, [start, end], ["-18%", "18%"]);

  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      <motion.div
        className="absolute inset-[-7%] bg-cover"
        style={{
          y: bgY,
          scale,
          backgroundImage: bg(scene.image),
          backgroundPosition: scene.position,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(14,18,10,0.88) 0%, rgba(14,18,10,0.58) 44%, rgba(14,18,10,0.2) 100%), " +
            "linear-gradient(180deg, rgba(14,18,10,0.42) 0%, rgba(14,18,10,0.05) 42%, rgba(14,18,10,0.8) 100%)",
        }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(115deg,transparent_0%,rgba(253,251,247,0.08)_45%,transparent_58%)]"
        style={{ y: scanY }}
        aria-hidden="true"
      />
      <motion.p
        className="pointer-events-none absolute right-4 top-16 hidden font-display text-[9rem] leading-none text-ivory/[0.055] lg:block xl:text-[13rem]"
        style={{ y: indexY }}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.p>
      <div className="absolute left-0 top-0 hidden h-full w-20 border-r border-ivory/10 bg-olive-900/20 backdrop-blur-[1px] lg:block" />
      <p className="absolute left-8 top-1/2 z-10 hidden -translate-y-1/2 -rotate-90 text-[9px] font-bold uppercase tracking-[0] text-gold/80 lg:block">
        Villa FIONA
      </p>

      <motion.div
        className="editorial-container relative z-10 grid h-full items-end gap-10 pb-32 max-sm:pb-28 sm:items-center sm:pb-0 lg:grid-cols-[minmax(0,0.95fr)_minmax(280px,0.48fr)]"
        style={{ y: textY }}
      >
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-3 border border-ivory/15 bg-ivory/[0.08] px-4 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 bg-gold" />
            <p className="text-[10px] font-bold uppercase tracking-[0] text-gold">{scene.kicker}</p>
          </div>
          <h2 className="mt-7 max-w-[12ch] font-display text-5xl italic font-light leading-[1.02] text-ivory max-sm:text-[2.85rem] sm:text-7xl lg:text-[6rem]">
            {scene.title}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-ivory/78 max-sm:text-sm max-sm:leading-7 sm:text-[1.05rem]">
            {scene.copy}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 max-sm:mt-6">
            <span className="inline-flex items-center gap-2 border border-gold/45 bg-gold/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0] text-gold backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {scene.metric}
            </span>
            <span className="inline-flex items-center gap-2 border border-ivory/15 bg-ivory/[0.07] px-4 py-2 text-[10px] font-bold uppercase tracking-[0] text-ivory/70 backdrop-blur-md max-sm:hidden">
              <Compass className="h-3.5 w-3.5" aria-hidden="true" />
              Mihiripanna, Galle
            </span>
          </div>
        </div>

        <motion.div
          className="relative hidden min-h-[420px] items-center justify-center lg:flex"
          style={{ y: detailY, rotate: detailTurn }}
          aria-hidden="true"
        >
          <div className="absolute inset-y-10 left-8 right-0 border border-ivory/15 bg-ivory/[0.055] backdrop-blur-md" />
          <div className="relative h-[58vh] max-h-[560px] min-h-[390px] w-[min(26vw,360px)] overflow-hidden border border-gold/35 shadow-[0_34px_120px_rgba(0,0,0,0.42)]">
            <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: bg(scene.detailImage) }} />
            <div className="absolute inset-0 bg-gradient-to-t from-olive-900/58 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0] text-gold">Scene</p>
                <p className="mt-1 font-display text-3xl leading-none text-ivory">
                  {String(index + 1).padStart(2, "0")}
                </p>
              </div>
              <div className="h-px flex-1 bg-ivory/30" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function CinematicHero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const introRunId = useRef(0);
  const prefersReducedMotion = useReducedMotion();
  const [introStarted, setIntroStarted] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: "/fiona-images/707902450_122124969795184570_1085409261198412845_n.png",
      title: "FIONA",
      kicker: "Discover Villa",
      desc: "A tropical sanctuary in Mihiripanna. Purely Green Serenity waiting to be discovered under the coastal palms.",
    },
    {
      image: "/Guest/4.jpeg",
      title: "GARDEN",
      kicker: "Unwind",
      desc: "Slow down in carefully curated spaces. Let the rhythm of the South Coast guide your mornings and evenings.",
    },
    {
      image: "/fiona-images/715202033_122125886307184570_8249085672172725017_n.jpg",
      title: "RETREAT",
      kicker: "Experience",
      desc: "Immerse yourself in authentic island luxury. Traditional warmth meets modern elegance in every corner.",
    },
  ];

  useEffect(() => {
    const runId = introRunId.current + 1;
    introRunId.current = runId;
    let active = true;

    if (hasHeroIntroPlayed()) {
      setIntroStarted(false);
      setHeroLoaded(true);
      return () => {
        active = false;
      };
    }

    setIntroStarted(true);
    setHeroLoaded(false);

    const minimumIntro = new Promise<void>((resolve) => {
      window.setTimeout(resolve, prefersReducedMotion ? 300 : 2150);
    });

    const preloadHeroImages = heroSlides.map((s) => s.image).concat(fi.logo).map(
      (src) =>
        new Promise<void>((resolve) => {
          const image = new window.Image();
          image.onload = () => resolve();
          image.onerror = () => resolve();
          image.src = src;
        }),
    );
    const imageWarmup = Promise.race([
      Promise.all(preloadHeroImages),
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, prefersReducedMotion ? 200 : 900);
      }),
    ]);

    Promise.all([imageWarmup, minimumIntro]).then(() => {
      if (active && introRunId.current === runId) {
        rememberHeroIntroPlayed();
        setHeroLoaded(true);
      }
    });

    return () => {
      active = false;
    };
  }, [prefersReducedMotion]);

  const introActive = introStarted && !heroLoaded;
  const heroContentVisible = !introStarted || heroLoaded;

  useEffect(() => {
    if (!introActive) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [introActive]);

  useEffect(() => {
    if (!heroContentVisible || prefersReducedMotion) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroContentVisible, prefersReducedMotion, heroSlides.length]);

  return (
    <section
      ref={heroRef}
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#111] font-sans max-sm:min-h-[100svh]"
    >
      <HeroLoader isVisible={introActive} prefersReducedMotion={prefersReducedMotion} />

      {/* Background Bases */}
      {heroSlides.map((slide, index) => (
        <motion.div
          key={`bg-${index}`}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed max-sm:bg-scroll"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), ${bg(slide.image)}`,
            zIndex: index === currentSlide ? 1 : 0,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentSlide && heroContentVisible ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          aria-hidden="true"
        />
      ))}

      {/* Left Blur Panel */}
      <div className="absolute inset-y-0 left-0 w-1/2 backdrop-blur-[14px] bg-black/10 z-10 border-r border-white/5" />
      
      {/* Dimming overlay on the right to make white text pop */}
      <div className="absolute inset-y-0 right-0 w-1/2 bg-black/20 z-10" />

      {/* Navigation Layer */}
      <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-10 py-8 text-[11px] font-bold uppercase tracking-widest text-white/90 max-sm:px-5 max-sm:py-6 max-sm:text-[10px]">
        <div className="flex items-center gap-6 z-20 max-sm:gap-3">
          <span>Follow Us</span>
          <div className="flex gap-4 max-sm:gap-2.5">
            <span className="h-4 w-4 rounded-full border border-white/50"></span>
            <span className="h-4 w-4 rounded-full border border-white/50"></span>
            <span className="h-4 w-4 rounded-full border border-white/50"></span>
            <span className="h-4 w-4 rounded-full border border-white/50"></span>
          </div>
        </div>
        <div className="hidden md:flex gap-12 z-20">
          <Link href="/villas" className="hover:text-gold transition-colors">Villas</Link>
          <Link href="/retreat" className="hover:text-gold transition-colors">Retreat</Link>
          <Link href="/gallery" className="hover:text-gold transition-colors">Gallery</Link>
          <Link href="/contact" className="hover:text-gold transition-colors">Contact</Link>
        </div>
      </div>

      {/* Main Text Container - Static right side, animated left side for bg transition */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        {/* Left Text: Cutout (Fading to crossfade the background image) */}
        {heroSlides.map((slide, index) => (
          <motion.div
            key={`left-text-${index}`}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide && heroContentVisible ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <h1
              className="text-[17vw] font-display font-medium leading-[0.8] tracking-normal bg-cover bg-center bg-no-repeat bg-fixed bg-clip-text text-transparent max-sm:-translate-y-12 max-sm:bg-scroll max-sm:text-[32vw]"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), ${bg(slide.image)}`,
                clipPath: "inset(0 50% 0 0)",
                WebkitBackgroundClip: "text",
              }}
            >
              Fiona
            </h1>
          </motion.div>
        ))}

        {/* Right Text: Solid White (Static) */}
        <motion.h1
          className="absolute text-[17vw] font-display font-medium leading-[0.8] tracking-normal text-white max-sm:-translate-y-12 max-sm:text-[32vw]"
          style={{ clipPath: "inset(0 0 0 50%)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: heroContentVisible ? 1 : 0 }}
          transition={{ duration: 1.5, delay: heroLoaded ? 0.3 : 0 }}
        >
          Fiona
        </motion.h1>
      </div>

      {/* Bottom Content Left */}
      <div className="absolute bottom-16 left-16 z-30 max-w-sm text-white max-sm:inset-x-5 max-sm:bottom-8 max-sm:max-w-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="pointer-events-auto"
          >
            <div className="flex items-center gap-4 mb-4 max-sm:gap-3">
              <div className="flex flex-col items-center justify-center text-xl font-light max-sm:text-lg">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                  className="text-[10px] leading-none mb-1 opacity-50 hover:opacity-100 transition-opacity p-1"
                  aria-label="Previous slide"
                >
                  ▲
                </button>
                <span>{String(currentSlide + 1).padStart(2, "0")}</span>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                  className="text-[10px] leading-none mt-1 opacity-50 hover:opacity-100 transition-opacity p-1"
                  aria-label="Next slide"
                >
                  ▼
                </button>
              </div>
              <h2 className="text-xl font-bold tracking-wider ml-2 uppercase max-sm:ml-0 max-sm:text-base">
                {heroSlides[currentSlide].kicker}
              </h2>
            </div>
            <div className="flex items-center gap-2 mb-6 ml-14 max-sm:ml-12 max-sm:mb-4">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    idx === currentSlide ? "bg-white" : "border border-white/50 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <p className="text-xs text-white/70 leading-relaxed mb-8 ml-14 max-sm:mb-6 max-sm:ml-12 max-sm:max-w-[18rem]">
              {heroSlides[currentSlide].desc}
            </p>
            <Link
              href="/villas"
              className="ml-14 inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] hover:text-white/80 transition-colors max-sm:ml-12 max-sm:tracking-[0.14em]"
            >
              Explore Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Vertical Text Right */}
      <motion.div
        className="absolute right-12 top-1/2 -translate-y-1/2 z-30 pointer-events-none max-sm:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: heroContentVisible ? 1 : 0 }}
        transition={{ duration: 1, delay: heroLoaded ? 0.8 : 0 }}
      >
        <p className="text-white/40 text-[10px] font-bold tracking-[0.8em] [writing-mode:vertical-rl] rotate-180 uppercase">
          Mihiripanna
        </p>
      </motion.div>
    </section>
  );
}

function IntroSection() {
  const ref = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const smallY = useTransform(scrollYProgress, [0, 1], ["8%", "-12%"]);

  return (
    <section ref={ref} id="island-beauty" className="relative overflow-hidden bg-ivory py-24 max-sm:py-18 lg:py-36">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />

      <div className="editorial-container grid gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0] text-gold-deep">
            Organized by the new photo story
          </p>
          <h2 className="mt-5 font-display text-5xl font-light leading-tight text-olive-900 max-sm:text-[2.65rem] sm:text-6xl">
            Fiona reads like a private tropical house, not a hotel corridor.
          </h2>
          <p className="mt-7 text-base leading-8 text-olive-700">
            The images show a clear journey: arrive through the palms, enter the garden frontage,
            live along the balcony, pause in guest corners, cook privately, then retreat into the
            first apartment or the larger second apartment room.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-gold/20 pt-10 sm:grid-cols-4">
            {[
              [`${allVillaImages.length}`, "new photos"],
              ["2", "apartment stays"],
              ["2", "kitchen settings"],
              ["1", "green villa story"],
            ].map(([num, label]) => (
              <div key={label}>
                <p className="font-display text-4xl text-olive-900">{num}</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0] text-olive-500">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/gallery"
            className="mt-10 inline-flex items-center gap-3 bg-olive-900 px-6 py-4 text-xs font-bold uppercase tracking-[0] text-gold transition-colors duration-300 hover:bg-gold hover:text-ivory"
          >
            View the Gallery
            <Images className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>

        <motion.div
          className="relative min-h-[560px] max-sm:min-h-[430px]"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          <div className="absolute left-0 top-0 h-[72%] w-[78%] overflow-hidden border border-gold/25 bg-sand">
            <motion.div
              className="h-full w-full bg-cover bg-center"
              style={{
                y: prefersReducedMotion ? 0 : imgY,
                backgroundImage: bg(fi.outdoorGarden),
              }}
            />
          </div>
          <motion.div
            className="absolute bottom-0 right-0 h-[48%] w-[52%] overflow-hidden border border-ivory bg-[#6F8FA3]/15 shadow-botanical"
            style={{ y: prefersReducedMotion ? 0 : smallY }}
          >
            <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: bg(fi.balconyDining) }} />
          </motion.div>
          <div className="absolute bottom-8 left-6 border border-gold bg-ivory px-7 py-5 shadow-botanical max-sm:left-4 max-sm:right-4 max-sm:px-5">
            <p className="font-display text-xl text-olive-900">Garden to balcony</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0] text-gold-deep">
              The daily flow of the villa
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ScrollCinema() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 58, damping: 20, mass: 0.35 });
  const progressScale = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section id="scroll-film" ref={sectionRef} className="relative h-[760vh] bg-olive-900 max-sm:h-[680vh]">
      <div className="sticky top-0 h-screen overflow-hidden max-sm:h-[100svh]">
        <AnimatePresence>
          {cinemaScenes.map((scene, i) => (
            <SceneLayer
              key={scene.kicker}
              scene={scene}
              index={i}
              total={cinemaScenes.length}
              progress={progress}
            />
          ))}
        </AnimatePresence>

        <div className="absolute bottom-8 left-0 right-0 z-40">
          <div className="editorial-container">
            <div className="h-px overflow-hidden bg-ivory/20">
              <motion.div
                className="h-full origin-left bg-gold"
                style={{ scaleX: prefersReducedMotion ? 1 : progressScale }}
              />
            </div>
            <div className="mt-4 flex justify-between text-[9px] font-bold uppercase tracking-[0] text-ivory/45 max-sm:grid max-sm:grid-cols-4 max-sm:gap-2 max-sm:[&>span:nth-child(even)]:hidden">
              {cinemaScenes.map((s) => (
                <span key={s.kicker}>{s.kicker.split(" / ")[0]}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhotoStrip({
  label,
  images,
  x,
  frozen,
}: {
  label: string;
  images: string[];
  x: MotionValue<string>;
  frozen: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="editorial-container flex items-center justify-between text-ivory/55">
        <p className="text-[10px] font-bold uppercase tracking-[0]">{label}</p>
        <p className="text-[10px] font-bold uppercase tracking-[0]">{images.length} photos</p>
      </div>
      <div className="overflow-hidden">
        <motion.div className="flex w-max gap-4 px-5 sm:px-8 lg:px-10" style={{ x: frozen ? 0 : x }}>
          {images.map((image, index) => (
            <figure
              key={`${label}-${image}-${index}`}
              className="group relative h-44 w-64 shrink-0 overflow-hidden border border-ivory/15 bg-olive-700/30 max-sm:h-36 max-sm:w-56 sm:h-52 sm:w-80"
            >
              <img
                src={image}
                alt={`${label} photo ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </figure>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function PhotoReelSection() {
  const ref = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const spring = useSpring(scrollYProgress, { stiffness: 54, damping: 22, mass: 0.4 });
  const rowOneX = useTransform(spring, [0, 1], ["4%", "-26%"]);
  const rowTwoX = useTransform(spring, [0, 1], ["-20%", "4%"]);
  const rowThreeX = useTransform(spring, [0, 1], ["3%", "-34%"]);
  const copyY = useTransform(spring, [0, 1], [0, -80]);

  return (
    <section ref={ref} className="relative h-[280vh] bg-olive-900 text-ivory max-sm:h-[240vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-20 max-sm:h-[100svh] max-sm:py-14">
        <motion.div className="editorial-container mb-10 max-sm:mb-7" style={{ y: prefersReducedMotion ? 0 : copyY }}>
          <p className="text-[11px] font-bold uppercase tracking-[0] text-gold">Scrolling photo reel</p>
          <h2 className="mt-4 max-w-4xl font-display text-5xl font-light leading-tight max-sm:text-[2.55rem] sm:text-6xl">
            The page now moves through the villa like a continuous visual reel.
          </h2>
        </motion.div>

        <div className="space-y-8 max-sm:space-y-5">
          <PhotoStrip
            label={reelRows[0].label}
            images={reelRows[0].images}
            x={rowOneX}
            frozen={Boolean(prefersReducedMotion)}
          />
          <PhotoStrip
            label={reelRows[1].label}
            images={reelRows[1].images}
            x={rowTwoX}
            frozen={Boolean(prefersReducedMotion)}
          />
          <PhotoStrip
            label={reelRows[2].label}
            images={reelRows[2].images}
            x={rowThreeX}
            frozen={Boolean(prefersReducedMotion)}
          />
        </div>
      </div>
    </section>
  );
}

function StayAlbumCard({ album, index }: { album: VillaAlbum; index: number }) {
  const icons = [BedDouble, BedDouble, ChefHat, DoorOpen];
  const Icon = icons[index] ?? Sparkles;
  const featured = album.images[0];
  const sample = album.images.slice(1, 5);

  return (
    <motion.article
      className="grid overflow-hidden border border-gold/25 bg-paper shadow-modern lg:grid-cols-[1.04fr_0.96fr]"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, delay: index * 0.05, ease }}
    >
      <div className={`relative min-h-[360px] overflow-hidden max-sm:min-h-[280px] ${index % 2 === 1 ? "lg:order-2" : ""}`}>
        <img
          src={featured}
          alt={`${album.title} featured photo`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-olive-900/55 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5 flex h-11 w-11 items-center justify-center border border-gold/55 bg-olive-900/55 text-gold backdrop-blur-sm">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
        <p className="text-[11px] font-bold uppercase tracking-[0] text-gold-deep">{album.eyebrow}</p>
        <h3 className="mt-4 font-display text-4xl font-light leading-tight text-olive-900 max-sm:text-[2.35rem] sm:text-5xl">
          {album.title}
        </h3>
        <p className="mt-5 text-[15px] leading-8 text-olive-700">{album.description}</p>
        <div className="mt-8 grid grid-cols-4 gap-2">
          {sample.map((image, sampleIndex) => (
            <img
              key={image}
              src={image}
              alt={`${album.title} detail ${sampleIndex + 1}`}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover"
            />
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function ApartmentStory() {
  return (
    <section id="rooms" className="bg-ivory py-24 max-sm:py-18 lg:py-32">
      <div className="editorial-container">
        <div className="mb-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0] text-gold-deep">Stay and cook</p>
            <h2 className="mt-4 max-w-3xl font-display text-5xl font-light leading-tight text-olive-900 max-sm:text-[2.55rem] sm:text-6xl">
              Two apartment experiences, two kitchen moods, one green villa.
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex w-fit items-center gap-2 border border-gold/40 px-5 py-3 text-xs font-bold uppercase tracking-[0] text-olive-900 transition-colors hover:border-gold hover:text-gold-deep"
          >
            Enquire
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-8">
          {stayAlbums.map((album, index) => (
            <StayAlbumCard key={album.id} album={album} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OutdoorLivingBand() {
  const ref = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={ref}
      id="wellness"
      className="relative isolate overflow-hidden bg-olive-900 py-28 text-ivory lg:py-40"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-35 lg:hidden"
        style={{ backgroundImage: bg(fi.balconyNight) }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-olive-900/72 lg:hidden" aria-hidden="true" />
      <motion.div className="absolute inset-y-0 right-0 hidden w-[58%] overflow-hidden lg:block" aria-hidden="true">
        <motion.div
          className="h-full w-full bg-cover bg-center"
          style={{
            y: prefersReducedMotion ? 0 : imgY,
            backgroundImage: bg(fi.balconyNight),
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-olive-900 via-olive-900/45 to-transparent" />
      </motion.div>

      <div className="editorial-container relative z-10">
        <motion.div className="max-w-xl" style={{ y: prefersReducedMotion ? 0 : copyY }}>
          <p className="text-[11px] font-bold uppercase tracking-[0] text-gold">
            Balcony, garden, coast
          </p>
          <h2 className="mt-5 font-display text-5xl font-light leading-tight max-sm:text-[2.55rem] sm:text-6xl">
            The best scenes are the ones between rooms.
          </h2>
          <p className="mt-7 max-w-md text-base leading-8 text-ivory/72">
            Fiona's strongest character is its threshold space: balcony dining, shaded seats,
            small work corners, evening garden light, and the feeling that the outdoors is always nearby.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            {[
              "Long balcony seating",
              "Open kitchen counter",
              "Garden-front veranda",
              "Night-lit arrival",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6F8FA3]" />
                <p className="text-sm leading-6 text-ivory/75">{item}</p>
              </div>
            ))}
          </div>

          <Link
            href="/experiences"
            className="mt-10 inline-flex items-center gap-3 border border-gold px-7 py-4 text-xs font-bold uppercase tracking-[0] text-gold transition-colors duration-300 hover:bg-gold hover:text-olive-900"
          >
            Explore Experiences
            <Waves className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  const ref = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} id="arrival" className="relative isolate overflow-hidden bg-olive-900 py-32 lg:py-48">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          y: prefersReducedMotion ? 0 : bgY,
          backgroundImage: bg(fi.outdoorNight),
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,12,5,0.55) 0%, rgba(8,12,5,0.74) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="editorial-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0] text-gold">
            Reserve Your Sanctuary
          </p>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-5xl font-light leading-tight text-ivory max-sm:text-[2.75rem] sm:text-7xl">
            Ready to step into Fiona's green calm?
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-ivory/72 sm:text-lg">
            Choose the apartment style that fits your stay, then let the villa hold the rest:
            garden light, balcony air, quiet rooms, and the South Coast nearby.
          </p>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-gold px-9 py-4 text-xs font-bold uppercase tracking-[0] text-olive-900 transition-all duration-300 hover:bg-ivory"
            >
              Book Now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-3 border border-ivory/40 px-9 py-4 text-xs font-bold uppercase tracking-[0] text-ivory/85 transition-all duration-300 hover:border-gold hover:text-gold"
            >
              Open Gallery
              <Images className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export const LiyaVelaBorder = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
    <rect width="1200" height="120" fill="#FDFBF7" />
    <path d="M0 18H1200M0 102H1200" stroke="#CAAE69" strokeWidth="4" />
    <path d="M0 32H1200M0 88H1200" stroke="#EFE8D6" strokeWidth="2" opacity="0.82" />
    {Array.from({ length: 12 }).map((_, i) => {
      const x = i * 100;
      return (
        <g key={x} transform={`translate(${x} 0)`}>
          <path d="M14 62c20-44 52-44 72 0M20 62c14 28 46 28 60 0" fill="none" stroke="#CAAE69" strokeWidth="6" strokeLinecap="round" />
          <path d="M50 33c-8 15-8 39 0 54c8-15 8-39 0-54Z" fill="#EFE8D6" stroke="#CAAE69" strokeWidth="3" />
          <circle cx="50" cy="60" r="9" fill="#393D30" />
          <path d="M5 60c16-12 28-12 45 0c17 12 29 12 45 0" fill="none" stroke="#393D30" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
        </g>
      );
    })}
  </svg>
);

export const HeritageRosette = ({ className = "" }: { className?: string }) => {
  const petals = Array.from({ length: 16 });
  const rays = Array.from({ length: 32 });
  return (
    <svg className={className} viewBox="0 0 260 260" aria-hidden="true">
      <circle cx="130" cy="130" r="118" fill="#CAAE69" opacity="0.1" />
      <circle cx="130" cy="130" r="104" fill="none" stroke="#CAAE69" strokeWidth="3" />
      <circle cx="130" cy="130" r="82" fill="#EFE8D6" opacity="0.9" />
      {rays.map((_, i) => (
        <path key={`r${i}`} d="M130 24l5 24h-10Z" fill={i % 2 ? "#CAAE69" : "#393D30"} opacity="0.2" transform={`rotate(${i * 11.25} 130 130)`} />
      ))}
      {petals.map((_, i) => (
        <path key={`p${i}`} d="M130 48c18 24 18 48 0 72c-18-24-18-48 0-72Z" fill="#FFFFFF" opacity="0.88" transform={`rotate(${i * 22.5} 130 130)`} />
      ))}
      <circle cx="130" cy="130" r="43" fill="#CAAE69" opacity="0.4" />
      <circle cx="130" cy="130" r="23" fill="#393D30" />
      <circle cx="130" cy="130" r="11" fill="#FDFBF7" />
      <circle cx="130" cy="130" r="118" fill="none" stroke="#CAAE69" strokeWidth="3" />
    </svg>
  );
};

export const MakaraLineArt = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 320 160" aria-hidden="true">
    <path d="M53 111c22-60 78-82 132-48c26 17 47 17 74 2c-17 32-43 50-77 48c-20-1-39-9-56-23c-18 23-43 34-73 21Z" fill="none" stroke="#CAAE69" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M174 54c-13-17-25-17-38 0M194 65c-15-18-29-18-44 0" fill="none" stroke="#CAAE69" strokeWidth="4" strokeLinecap="round" />
    <circle cx="120" cy="80" r="5" fill="#393D30" />
    <path d="M55 113c20 20 45 20 65 0" fill="none" stroke="#393D30" strokeWidth="3" strokeLinecap="round" opacity="0.25" />
  </svg>
);

export default function SriLankanCinematicHome() {
  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.slice(1);

      if (!id) return;
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "auto" });
      });
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);

    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return (
    <main>
      <CinematicHero />
      <IntroSection />
      <ScrollCinema />
      <PhotoReelSection />
      <ApartmentStory />
      <OutdoorLivingBand />
      <ClosingCTA />
    </main>
  );
}
