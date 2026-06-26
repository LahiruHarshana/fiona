"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { CalendarDays, ChevronDown, Leaf, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type NavigationItem = {
  label: string;
  href?: string;
  children?: {
    label: string;
    href: string;
  }[];
};

const navigationItems: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "The Retreat", href: "/retreat" },
  {
    label: "Stay",
    children: [
      { label: "Garden Villas", href: "/villas" },
      { label: "Wellness Hideaway", href: "/wellness" },
      { label: "Private Dining", href: "/experiences" },
    ],
  },
  { label: "Experiences", href: "/experiences" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const panelEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

const panelVariants: Variants = {
  closed: {
    x: "-100%",
    transition: { duration: 0.34, ease: panelEase },
  },
  open: {
    x: 0,
    transition: {
      duration: 0.42,
      ease: smoothEase,
      when: "beforeChildren",
      staggerChildren: 0.055,
      delayChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  closed: { opacity: 0, x: -18 },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.34, ease: smoothEase },
  },
};

function isActive(pathname: string, item: NavigationItem) {
  if (item.href) {
    return item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
  }

  return item.children?.some((child) => pathname.startsWith(child.href)) ?? false;
}

function NavigationMenuItem({
  item,
  pathname,
  closeMenu,
}: {
  item: NavigationItem;
  pathname: string;
  closeMenu: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const active = isActive(pathname, item);
  const hasChildren = Boolean(item.children?.length);

  useEffect(() => {
    if (active && hasChildren) {
      setIsOpen(true);
    }
  }, [active, hasChildren]);

  if (!hasChildren && item.href) {
    return (
      <motion.li variants={itemVariants}>
        <Link
          href={item.href}
          onClick={closeMenu}
          className={`group inline-flex items-center gap-3 font-sans text-[15px] font-light transition-colors duration-300 ${
            active ? "text-gold-deep" : "text-olive-700 hover:text-gold-deep"
          }`}
        >
          <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-6" />
          {item.label}
        </Link>
      </motion.li>
    );
  }

  return (
    <motion.li variants={itemVariants}>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={`group inline-flex items-center gap-3 font-sans text-[15px] font-light transition-colors duration-300 ${
          active || isOpen ? "text-gold-deep" : "text-olive-700 hover:text-gold-deep"
        }`}
        aria-expanded={isOpen}
      >
        <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-6" />
        {item.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-gold" : "text-olive-300"
          }`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden pl-5"
          >
            {item.children?.map((child) => {
              const childActive = pathname.startsWith(child.href);

              return (
                <li key={child.href} className="pt-3">
                  <Link
                    href={child.href}
                    onClick={closeMenu}
                    className={`text-[15px] font-light transition-colors duration-300 ${
                      childActive ? "text-gold-deep" : "text-olive-500 hover:text-gold-deep"
                    }`}
                  >
                    {child.label}
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const prefersReducedMotion = useReducedMotion();
  const isHome = pathname === "/";

  const headerClass = useMemo(() => {
    if (isHome && !scrolled && !menuOpen) {
      return "pointer-events-none -translate-y-full border-transparent opacity-0";
    }

    const tone = scrolled || menuOpen
      ? "border-b border-gold/30 bg-olive-900 shadow-[0_12px_50px_rgba(35,39,25,0.2)]"
      : "border-transparent bg-olive-900/60 backdrop-blur-sm";
    const position = hidden && !menuOpen ? "-translate-y-full" : "translate-y-0";

    return `${tone} ${position}`;
  }, [hidden, isHome, menuOpen, scrolled]);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      setScrolled(currentY > 72);
      setHidden(currentY > 420 && currentY > lastScrollY.current && !menuOpen);
      lastScrollY.current = currentY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${headerClass}`}
      >
        <div className="editorial-container grid h-20 grid-cols-[auto_1fr_auto] items-center gap-4 max-sm:h-18 sm:h-24">
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
            className="flex h-11 w-11 items-center justify-center border border-gold/50 bg-olive-900 text-gold transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-olive-900"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <Link href="/" className="justify-self-center flex flex-col items-center" onClick={closeMenu}>
            <img src="/images/logo.png" alt="Fiona Villa Logo" className="h-16 w-auto object-contain mix-blend-screen max-sm:h-14 sm:h-20" />
          </Link>

          <Link
            href="/contact"
            className="hidden items-center gap-2 border border-gold bg-gold px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-olive-900 transition-colors duration-300 hover:bg-ivory hover:border-ivory sm:inline-flex"
          >
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Reserve
          </Link>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation overlay"
              className="fixed inset-0 z-40 bg-olive-900/20 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMenu}
            />

            <motion.aside
              className="fixed bottom-0 left-0 top-0 z-50 flex w-[min(88vw,380px)] flex-col overflow-y-auto border-r border-sand bg-paper px-8 py-8 text-olive-500 shadow-botanical max-sm:w-[min(100vw,380px)] max-sm:px-5 max-sm:py-6 sm:px-10"
              variants={prefersReducedMotion ? undefined : panelVariants}
              initial={prefersReducedMotion ? { x: 0 } : "closed"}
              animate={prefersReducedMotion ? { x: 0 } : "open"}
              exit={prefersReducedMotion ? { x: "-100%" } : "closed"}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display font-light text-2xl text-olive-900">
                    Villa <em>FIONA</em>
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-gold-deep">
                    Mihiripanna, Galle
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={closeMenu}
                  className="flex h-10 w-10 items-center justify-center border border-sand text-olive-700 transition-colors duration-300 hover:border-gold hover:text-gold-deep"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <nav className="mt-20 max-sm:mt-12" aria-label="Primary navigation">
                <motion.ul className="space-y-4" variants={prefersReducedMotion ? undefined : itemVariants}>
                  {navigationItems.map((item) => (
                    <NavigationMenuItem
                      key={item.href ?? item.label}
                      item={item}
                      pathname={pathname}
                      closeMenu={closeMenu}
                    />
                  ))}
                </motion.ul>
              </nav>

              <motion.div
                variants={prefersReducedMotion ? undefined : itemVariants}
                className="mt-auto pt-20 max-sm:pt-14"
              >
                <div className="mb-6 h-px w-16 bg-gold" />
                <Link
                  href="tel:+94771234567"
                  className="group flex items-center gap-4 text-olive-700"
                >
                  <span className="flex h-12 w-12 items-center justify-center border border-gold-soft text-gold-deep transition-colors duration-300 group-hover:border-gold">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm text-gold-deep">Reservation</span>
                    <span className="block text-lg font-light text-olive-900">
                      +94 77 123 4567
                    </span>
                  </span>
                </Link>
                <p className="mt-8 flex items-center gap-2 text-sm leading-6 text-olive-300">
                  <Leaf className="h-4 w-4 text-sage" aria-hidden="true" />
                  Purely green serenity, 80m from the ocean.
                </p>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
