"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useConsult } from "@/components/consult/ConsultProvider";
import SplitWords from "@/components/ui/SplitWords";
import { areas } from "@/content/site";
import { prefersReduced } from "@/lib/motion";
import styles from "./Areas.module.css";

const images = [...new Set(areas.items.map((a) => a.image))];

/** Lista de áreas: ao passar o mouse, uma imagem flutua junto ao cursor; o clique abre a consulta já com a área. */
export default function Areas() {
  const { open } = useConsult();
  const float = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (prefersReduced() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let x = 0, y = 0, fx = 0, fy = 0, raf = 0;
    const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY; };
    const loop = () => {
      fx += (x - fx) * 0.1; fy += (y - fy) * 0.1;
      const el = float.current;
      if (el) el.style.transform = `translate(${fx + 30}px, ${fy - el.offsetHeight / 2}px) rotate(${(x - fx) * 0.03}deg)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener("pointermove", move);
    raf = requestAnimationFrame(loop);
    return () => { removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className={`${styles.areas} wrap g12`} id="areas">
      <div className={styles.head}>
        <SplitWords as="h2" className="title" text={areas.title} />
        <span className="k">{areas.label}</span>
      </div>
      <div className={styles.list} data-stagger onPointerLeave={() => setActive(null)}>
        {areas.items.map((a) => (
          <button key={a.name} type="button" className={styles.row} onClick={() => open(a.name)} onPointerEnter={() => setActive(a.image)}
            data-cursor="big" data-label={areas.cursor}>
            <span className={styles.nm}>{a.name}</span>
            <span className={styles.ds}>{a.text}</span>
            <span className={styles.tg}>{a.kind}</span>
          </button>
        ))}
      </div>
      <div className={`${styles.float} ${active ? styles.on : ""}`} ref={float} aria-hidden="true">
        {images.map((src) => (
          <Image key={src} src={src} alt="" fill sizes="320px" className={src === active ? styles.show : ""} />
        ))}
      </div>
    </section>
  );
}
