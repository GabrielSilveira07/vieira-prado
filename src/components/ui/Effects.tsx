"use client";

import { useEffect } from "react";
import { motion, prefersReduced } from "@/lib/motion";

/** Efeitos genéricos de rolagem: títulos que sobem, palavras que acendem, imagens com cortina e parallax, zoom-out. */
export default function Effects() {
  useEffect(() => {
    if (prefersReduced()) {
      document.querySelectorAll<HTMLElement>("[data-split='light'] .w").forEach((w) => (w.style.opacity = "1"));
      return;
    }
    const { gsap, ScrollTrigger } = motion();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-split='rise']").forEach((el) =>
        gsap.from(el.querySelectorAll(".mask > span"), { yPercent: 110, duration: 1.1, stagger: 0.05, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" } }),
      );
      gsap.utils.toArray<HTMLElement>("[data-split='light']").forEach((el) =>
        gsap.fromTo(el.querySelectorAll(".w"), { opacity: 0.14 }, { opacity: 1, stagger: 0.05, ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 1 } }),
      );
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(el, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.5, ease: "power4.inOut", scrollTrigger: { trigger: el, start: "top 82%" } });
        const img = el.querySelector("img");
        if (img) gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) =>
        gsap.from(el.children, { autoAlpha: 0, y: 28, duration: 1, stagger: 0.07, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" } }),
      );
      gsap.utils.toArray<HTMLElement>("[data-zoom]").forEach((el) => {
        const img = el.querySelector("img");
        if (img) gsap.fromTo(img, { scale: 1.28 }, { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-slide]").forEach((el) =>
        gsap.from(el, { xPercent: -30, autoAlpha: 0, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 80%" } }),
      );
    });
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => { window.removeEventListener("load", onLoad); ctx.revert(); };
  }, []);
  return null;
}
