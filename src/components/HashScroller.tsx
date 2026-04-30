import { useEffect } from "react";

/**
 * Scroller til seksjonen som matcher window.location.hash etter at siden
 * (inkludert bilder/fonter) har lastet, slik at posisjonen er korrekt og
 * vi kompenserer for fixed navbar.
 */
const NAVBAR_OFFSET = 80;

const scrollToHash = () => {
  const hash = window.location.hash;
  if (!hash || hash.length < 2) return;
  const id = decodeURIComponent(hash.slice(1));
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
};

const HashScroller = () => {
  useEffect(() => {
    if (!window.location.hash) return;

    // Første forsøk når DOM er klar
    const t1 = window.setTimeout(scrollToHash, 100);
    // Andre forsøk etter at bilder/fonter trolig har lastet og layouten er stabil
    const t2 = window.setTimeout(scrollToHash, 600);

    const onLoad = () => scrollToHash();
    window.addEventListener("load", onLoad);

    const onHashChange = () => scrollToHash();
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return null;
};

export default HashScroller;