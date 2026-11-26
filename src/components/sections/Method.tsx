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
    const dist = () => Math.max(0, t.scrollWidth - innerWidth);
    const ctx = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${dist()}`, scrub: 1.2, pin: true, anticipatePin: 1, invalidateOnRefresh: true, refreshPriority: 5 } })
        .to({}, { duration: 0.12 })                                   /* respiro: a seção assenta antes de deslizar */
        .to(t, { x: () => -dist(), ease: "none", duration: 1 })
        .to(rail.current, { scaleX: 1, ease: "none", duration: 1 }, "<")
        .to({}, { duration: 0.08 });
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
