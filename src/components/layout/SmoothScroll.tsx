"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { motion, prefersReduced } from "@/lib/motion";

declare global { interface Window { __lenis?: Lenis } }

/** Rolagem suave sincronizada com o ScrollTrigger. */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReduced()) return;
    const { gsap, ScrollTrigger } = motion();
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href^='#']");
      if (!a) return;
      const id = a.getAttribute("href")!;
      const el = id.length > 1 ? document.querySelector(id) : document.body;
      if (el) { e.preventDefault(); lenis.scrollTo(el as HTMLElement, { offset: 0 }); }
    };
    document.addEventListener("click", onClick);
    return () => { document.removeEventListener("click", onClick); gsap.ticker.remove(raf); lenis.destroy(); delete window.__lenis; };
  }, []);
  return null;
}
