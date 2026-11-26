"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { INTRO_EVENT, motion, prefersReduced } from "@/lib/motion";
import styles from "./Loader.module.css";

/** Abertura: o nome sobe letra a letra, a linha carrega e a tela sobe como cortina. */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const finish = () => { setDone(true); window.dispatchEvent(new Event(INTRO_EVENT)); (window as unknown as { __vpIntro?: boolean }).__vpIntro = true; };
    if (prefersReduced() || !root.current) { finish(); return; }
    const { gsap } = motion();
    const q = gsap.utils.selector(root);
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } })
      .to(q("[data-ch]"), { y: 0, duration: 1, stagger: 0.04 })
      .to(q("[data-bar]"), { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, "<.1")
      .to(q("[data-ch]"), { y: "-110%", duration: 0.7, stagger: 0.02, ease: "power3.in" }, "+=.15")
      .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "power4.inOut" }, "-=.25")
      .add(() => { window.dispatchEvent(new Event(INTRO_EVENT)); }, "-=.55")
      .add(() => { setDone(true); (window as unknown as { __vpIntro?: boolean }).__vpIntro = true; });
    return () => { tl.kill(); };
  }, []);

  if (done) return null;
  return (
    <div className={styles.loader} ref={root} aria-hidden="true">
      <div className={styles.nm}>
        {[...site.name].map((c, i) => <span key={i} data-ch>{c === " " ? " " : c}</span>)}
      </div>
      <div className={styles.bar}><i data-bar /></div>
      <span className={`k ${styles.yr}`}>{site.descriptor} · {site.city} · Desde {site.since}</span>
    </div>
  );
}
