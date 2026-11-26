"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import OpenConsult from "@/components/consult/OpenConsult";
import { hero, site } from "@/content/site";
import { INTRO_EVENT, isDesktop, motion, prefersReduced } from "@/lib/motion";
import styles from "./Hero.module.css";

/** Hero editorial: bloco oliva atrás, foto sobreposta. Na rolagem, o bloco se estreita até virar linha. */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReduced() || !root.current) return;
    const { gsap } = motion();
    const q = gsap.utils.selector(root);
    const ctx = gsap.context(() => {
      gsap.set(q("[data-block]"), { scaleY: 0 });
      gsap.set(q("[data-photo]"), { clipPath: "inset(0 100% 0 0)" });
      gsap.set(q("[data-photo] img"), { scale: 1.3 });
      gsap.set(q("[data-ch]"), { yPercent: 105 });
      gsap.set([...q("[data-fade]"), "[data-intro]"], { autoAlpha: 0, y: 16 });
      gsap.set("[data-cols] i", { scaleY: 0 });
    }, root);

    /* rolagem: criada já na montagem, com prioridade, para que as seções abaixo calculem a posição contando com esta trava */
    ctx.add(() => {
      if (isDesktop()) {
        const block = q("[data-block]")[0] as HTMLElement;
        const from0 = { xPercent: 0, yPercent: 0, y: 0, immediateRender: false };
        gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=110%", scrub: 1.2, pin: true, anticipatePin: 1, refreshPriority: 10 } })
          .fromTo(block, { scaleX: 1, immediateRender: false }, { scaleX: () => 1 / block.offsetWidth, ease: "none" }, 0)
          .fromTo(q("[data-photo]"), from0, { xPercent: 8, yPercent: -10, ease: "none" }, 0)
          .fromTo(q("[data-thumb]"), from0, { yPercent: -60, ease: "none" }, 0)
          .fromTo(q("[data-title]"), from0, { y: -60, ease: "none" }, 0)
          .fromTo(q("[data-out]"), { autoAlpha: 1, y: 0, immediateRender: false }, { autoAlpha: 0, y: -30, ease: "none" }, 0);
      } else {
        gsap.fromTo(q("[data-block]"), { scaleX: 1, immediateRender: false }, { scaleX: 0.02, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 } });
      }
    });

    /* entrada: só depois da abertura */
    const play = () => ctx.add(() => {
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .to("[data-cols] i", { scaleY: 1, duration: 1.6, stagger: 0.05, ease: "power3.inOut" })
        .to(q("[data-block]"), { scaleY: 1, duration: 1.4, ease: "power4.inOut" }, "<.1")
        .to(q("[data-photo]"), { clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "power4.inOut" }, "<.35")
        .to(q("[data-photo] img"), { scale: 1.06, duration: 2.2 }, "<")
        .to(q("[data-ch]"), { yPercent: 0, duration: 1.2, stagger: 0.045 }, "<.3")
        .to([...q("[data-fade]"), "[data-intro]"], { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, "<.4");
    });

    if ((window as unknown as { __vpIntro?: boolean }).__vpIntro) play();
    else window.addEventListener(INTRO_EVENT, play, { once: true });
    return () => { window.removeEventListener(INTRO_EVENT, play); ctx.revert(); };
  }, []);

  return (
    <section className={styles.hero} ref={root} id="top">
      <div className={styles.block} data-block />
      <div className={styles.photo} data-photo data-cursor="big" data-label={hero.image.label}>
        <Image src={hero.image.src} alt={hero.image.alt} fill priority sizes="(max-width: 900px) 80vw, 56vw" />
      </div>
      <div className={styles.cap} data-fade data-out>
        <span><b>{hero.caption.coords}</b> {hero.caption.coords2}</span><span>{hero.caption.place}</span><span>{hero.caption.motto}</span>
      </div>
      <div className={styles.thumb} data-fade data-thumb>
        <Image src={hero.thumb.src} alt={hero.thumb.alt} fill sizes="170px" />
      </div>
      <div className={styles.intro} data-fade data-out>
        <span className="k">{hero.since}</span>
        <p>{hero.intro}</p>
        <OpenConsult>{hero.cta}</OpenConsult>
      </div>
      <div className={styles.title} data-title>
        <h1 aria-label={site.name}>
          {[...site.name].map((c, i) => c === " " ? " " : <span className="mask" key={i} aria-hidden="true"><span data-ch>{c}</span></span>)}
        </h1>
        <span className="k" data-fade>{site.descriptor}</span>
      </div>
      <div className={`${styles.strip} wrap`} data-fade>
        <span>{hero.strip}</span><span>{site.oab}</span><span className={styles.scroll}>{hero.scroll}<i /></span>
      </div>
    </section>
  );
}
