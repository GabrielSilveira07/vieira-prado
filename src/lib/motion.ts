"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Registra o GSAP uma vez e devolve os módulos. */
export function motion() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isDesktop = () => typeof window !== "undefined" && window.matchMedia("(min-width: 901px)").matches;

/** Evento disparado quando a abertura termina; o hero começa a entrar a partir dele. */
export const INTRO_EVENT = "vp:intro";
