/** Page-scoped Lenis smooth scrolling (reference page uses Lenis site-wide). */
import { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from 'framer-motion';

let activeLenis: Lenis | null = null;

/** Smooth wheel scrolling while the page is mounted; anchor links glide too. */
export function useLenis(anchorOffset = -140) {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: anchorOffset } });
    activeLenis = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      activeLenis = null;
      html.style.scrollBehavior = prevBehavior;
    };
  }, [reduce, anchorOffset]);
}

/** Pause / resume smooth scrolling (e.g. while a lightbox is open). */
export function setLenisPaused(paused: boolean) {
  if (!activeLenis) return;
  if (paused) activeLenis.stop();
  else activeLenis.start();
}
