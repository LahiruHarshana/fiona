"use client";

import { getFocusableElements, trapTabKey } from "@/lib/focusTrap";
import { brand, contact, footerNavigation, navigationItems, type NavigationLink } from "@/lib/site";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { Leaf, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

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

const followUsLinks = [
  { label: `Instagram ${contact.instagramHandle}`, href: contact.instagram, external: true },
  { label: `Facebook ${contact.facebookLabel}`, href: contact.facebook, external: true },
  { label: "WhatsApp", href: contact.whatsapp, external: true },
  { label: "Email Fiona Green Serenity", href: contact.mailtoHref, external: false },
] as const;

function isActive(pathname: string, href: NavigationLink["href"]) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function NavigationMenuItem({
  item,
  pathname,
  closeMenu,
}: {
  item: NavigationLink;
  pathname: string;
  closeMenu: () => void;
}) {
  const active = isActive(pathname, item.href);

  return (
    <motion.li variants={itemVariants}>
      <Link
        href={item.href}
        onClick={closeMenu}
        aria-current={active ? "page" : undefined}
        className={`group inline-flex min-h-11 items-center gap-3 font-sans text-[15px] font-light transition-colors duration-300 ${
          active ? "text-gold-deep" : "text-olive-700 hover:text-gold-deep"
        }`}
      >
        <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-6" />
        {item.label}
      </Link>
    </motion.li>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const wasOpen = useRef(false);
  const prefersReducedMotion = useReducedMotion();
  const isHome = pathname === "/";

  const hideForHero = isHome && !scrolled && !menuOpen;

  const headerClass = useMemo(() => {
    if (hideForHero) {
      return "pointer-events-none -translate-y-full border-transparent opacity-0";
    }

    const tone = scrolled || menuOpen
      ? "border-b border-gold/30 bg-olive-900 shadow-[0_12px_50px_rgba(35,39,25,0.2)]"
      : "border-transparent bg-olive-900/60 backdrop-blur-sm";
    const position = hidden && !menuOpen ? "-translate-y-full" : "translate-y-0";

    return `${tone} ${position}`;
  }, [hidden, hideForHero, menuOpen, scrolled]);

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
    if (menuOpen) {
      wasOpen.current = true;
      const frame = window.requestAnimationFrame(() => {
        const first = drawerRef.current ? getFocusableElements(drawerRef.current)[0] : undefined;
        first?.focus();
      });

      return () => window.cancelAnimationFrame(frame);
    }

    if (wasOpen.current) {
      menuButtonRef.current?.focus();
      wasOpen.current = false;
    }

    return undefined;
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }

      if (menuOpen && drawerRef.current) {
        trapTabKey(event, drawerRef.current);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 ${menuOpen ? "z-[60]" : "z-50"} transition-all duration-300 ${headerClass}`}
        aria-hidden={hideForHero}
        inert={hideForHero ? true : undefined}
      >
        <div className="flex h-20 items-center justify-between px-10 text-[11px] font-bold uppercase tracking-widest text-white/90 max-sm:h-[4.5rem] max-sm:px-5 max-sm:text-[10px] sm:h-24">
          <div className="flex items-center gap-6 max-sm:gap-3">
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="site-navigation-drawer"
              onClick={() => setMenuOpen((current) => !current)}
              className="flex h-11 w-11 shrink-0 items-center justify-center text-white/90 transition-colors duration-300 hover:text-gold xl:hidden"
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

            <p>Follow Us</p>
            <div className="flex items-center gap-4 max-sm:gap-2.5" aria-label="Follow us">
              {followUsLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.label}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex h-11 w-11 items-center justify-center text-white/90 hover:text-gold"
                >
                  <span className="h-4 w-4 rounded-full border border-current" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          <nav className="hidden items-center gap-8 xl:flex 2xl:gap-12" aria-label="Primary">
            {footerNavigation.map((item) => {
              const active = isActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap transition-colors hover:text-gold ${active ? "text-gold" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
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
              ref={drawerRef}
              id="site-navigation-drawer"
              tabIndex={-1}
              aria-label="Site menu"
              className="fixed bottom-0 left-0 top-0 z-[55] flex w-[min(88vw,380px)] flex-col overflow-x-hidden overflow-y-auto border-r border-sand bg-paper px-8 pb-8 pt-24 text-olive-500 shadow-botanical max-sm:w-[min(100vw,380px)] max-sm:px-5 max-sm:pb-6 sm:px-10 sm:pt-28"
              variants={prefersReducedMotion ? undefined : panelVariants}
              initial={prefersReducedMotion ? { x: 0 } : "closed"}
              animate={prefersReducedMotion ? { x: 0 } : "open"}
              exit={prefersReducedMotion ? { x: "-100%" } : "closed"}
            >
              <button
                type="button"
                className="sr-only"
                onClick={closeMenu}
              >
                Close menu
              </button>
              <div>
                <p className="font-display font-light text-2xl text-olive-900">
                  {brand.name}
                </p>
                <p className="mt-1 max-w-[16rem] text-[10px] uppercase leading-4 tracking-[0.22em] text-gold-deep">
                  {brand.location}
                </p>
              </div>

              <nav className="mt-20 max-sm:mt-12" aria-label="Primary navigation">
                <motion.ul className="space-y-4" variants={prefersReducedMotion ? undefined : itemVariants}>
                  {navigationItems.map((item) => (
                    <NavigationMenuItem
                      key={item.href}
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
                  href={contact.telHref}
                  className="group flex items-center gap-4 text-olive-700"
                >
                  <span className="flex h-12 w-12 items-center justify-center border border-gold-soft text-gold-deep transition-colors duration-300 group-hover:border-gold">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm text-gold-deep">Phone / WhatsApp</span>
                    <span className="block text-lg font-light text-olive-900">
                      {contact.phoneDisplay}
                    </span>
                  </span>
                </Link>
                <p className="mt-8 flex items-center gap-2 text-sm leading-6 text-olive-300">
                  <Leaf className="h-4 w-4 text-sage" aria-hidden="true" />
                  {brand.tagline}
                </p>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
