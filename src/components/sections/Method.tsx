"use client";

import { useEffect, useRef } from "react";
import SplitWords from "@/components/ui/SplitWords";
import { method } from "@/content/site";
import { isDesktop, motion, prefersReduced } from "@/lib/motion";
import styles from "./Method.module.css";

/** Método em rolagem horizontal; a linha mede o avanço pelas quatro etapas. */
export default function Method() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReduced() || !isDesktop() || !track.current) return;
    const { gsap } = motion();
    const t = track.current;
    const dist = () => t.scrollWidth - innerWidth + innerWidth * 0.1;
    const ctx = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${dist()}`, scrub: 1, pin: true, invalidateOnRefresh: true } })
        .to(t, { x: () => -dist(), ease: "none" }, 0)
        .to(rail.current, { scaleX: 1, ease: "none" }, 0);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.method} ref={root} id="metodo">
      <div className={`${styles.top} wrap`}>
        <SplitWords as="h2" className="title" text={method.title} />
        <span className="k">{method.label}</span>
      </div>
      <div className={styles.rail}><i ref={rail} /></div>
      <div className={`${styles.track} wrap`} ref={track}>
        {method.steps.map((s, i) => (
          <div className={styles.step} key={s.title}>
            <span className={styles.dot} />
            <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
