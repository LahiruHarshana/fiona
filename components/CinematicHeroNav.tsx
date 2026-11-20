"use client";

import { getFocusableElements, trapTabKey } from "@/lib/focusTrap";
import { footerNavigation } from "@/lib/site";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const cinematicLinks = footerNavigation;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function SocialDots() {
  return (
    <div className="flex gap-4 max-sm:gap-2.5" aria-hidden="true">
      <span className="h-4 w-4 rounded-full border border-white/50"></span>
      <span className="h-4 w-4 rounded-full border border-white/50"></span>
      <span className="h-4 w-4 rounded-full border border-white/50"></span>
      <span className="h-4 w-4 rounded-full border border-white/50"></span>
    </div>
  );
}

export default function CinematicHeroNav() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [compact, setCompact] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const followRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const wasOpen = useRef(false);

  useLayoutEffect(() => {
    const bar = barRef.current;
    const follow = followRef.current;
    const measure = measureRef.current;

    if (!bar || !follow || !measure) {
      return;
    }

    const update = () => {
      const styles = getComputedStyle(bar);
      const horizontalPad = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
      const available = bar.clientWidth - follow.offsetWidth - horizontalPad;
      const measuredOverflow = measure.scrollWidth > available;
      setCompact(window.innerWidth < 1180 || measuredOverflow);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(bar);
    observer.observe(measure);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!compact) {
      setMenuOpen(false);
    }
  }, [compact]);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      wasOpen.current = true;
      const frame = window.requestAnimationFrame(() => {
        const first = panelRef.current ? getFocusableElements(panelRef.current)[0] : undefined;
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
    if (!menuOpen) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }

      if (panelRef.current) {
        trapTabKey(event, panelRef.current);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div
        ref={barRef}
        className={`absolute inset-x-0 top-0 flex items-center justify-between px-10 py-8 text-[11px] font-bold uppercase tracking-widest text-white/90 max-sm:px-5 max-sm:py-6 max-sm:text-[10px] ${menuOpen ? "z-[72]" : "z-30"}`}
      >
        <div ref={followRef} className="flex items-center gap-6 z-20 max-sm:gap-3">
          <span className="max-[340px]:sr-only">Follow Us</span>
          <div className="max-[400px]:hidden">
            <SocialDots />
          </div>
        </div>

        <nav
          ref={measureRef}
          className="pointer-events-none invisible absolute -z-10 flex gap-12 whitespace-nowrap"
          aria-hidden="true"
        >
          {cinematicLinks.map((item) => (
            <span key={item.href}>{item.label}</span>
          ))}
        </nav>

        {!compact ? (
          <nav className="flex gap-12 z-20" aria-label="Cinematic navigation">
            {cinematicLinks.map((item) => {
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
        ) : (
          <button
            ref={menuButtonRef}
            type="button"
            className="z-20 inline-flex min-h-11 min-w-11 items-center justify-end gap-2 text-white/90 transition-colors hover:text-gold"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="cinematic-hero-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span>Menu</span>
            {menuOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
          </button>
        )}
      </div>

      <AnimatePresence>
        {menuOpen && compact ? (
          <>
            <motion.div
              aria-hidden="true"
              className="fixed inset-0 z-[70] bg-black/55 backdrop-blur-[2px]"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
              onClick={closeMenu}
            />
            <motion.aside
              ref={panelRef}
              id="cinematic-hero-menu"
              tabIndex={-1}
              aria-label="Site menu"
              className="fixed bottom-0 right-0 top-0 z-[71] flex w-[min(88vw,360px)] flex-col overflow-y-auto border-l border-white/10 bg-[#111]/92 px-8 pb-10 pt-8 text-[11px] font-bold uppercase tracking-widest text-white/90 backdrop-blur-md max-sm:px-5"
              initial={prefersReducedMotion ? { x: 0 } : { x: "100%" }}
              animate={{ x: 0 }}
              exit={prefersReducedMotion ? { x: 0 } : { x: "100%" }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={closeMenu}
                className="mb-10 inline-flex min-h-11 items-center justify-end gap-2 self-end text-white/90 transition-colors hover:text-gold"
              >
                Close
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
              <div className="mb-10 flex items-center gap-6 max-sm:gap-3">
                <span>Follow Us</span>
                <SocialDots />
              </div>
              <nav aria-label="Cinematic navigation">
                <ul className="space-y-1">
                  {cinematicLinks.map((item) => {
                    const active = isActive(pathname, item.href);

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          aria-current={active ? "page" : undefined}
                          className={`inline-flex min-h-11 items-center whitespace-nowrap transition-colors hover:text-gold ${active ? "text-gold" : ""}`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
