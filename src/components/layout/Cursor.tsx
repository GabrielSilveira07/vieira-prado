"use client";

import { useEffect, useRef } from "react";
import { prefersReduced } from "@/lib/motion";
import styles from "./Cursor.module.css";

/** Cursor próprio: ponto + anel. Sobre [data-cursor="big"] vira círculo oliva com rótulo; sobre links, cresce. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReduced() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add(styles.on);
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf = 0;
    const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY; };
    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor],a,button");
      const kind = t?.dataset.cursor ?? (t ? "link" : "");
      ring.current?.classList.toggle(styles.big, kind === "big");
      ring.current?.classList.toggle(styles.link, kind === "link");
      if (label.current) label.current.textContent = kind === "big" ? t?.dataset.label ?? "" : "";
    };
    const loop = () => {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    raf = requestAnimationFrame(loop);
    return () => { removeEventListener("pointermove", move); document.removeEventListener("pointerover", over); cancelAnimationFrame(raf); document.documentElement.classList.remove(styles.on); };
  }, []);

  return (
    <>
      <div className={styles.dot} ref={dot} aria-hidden="true" />
      <div className={styles.ring} ref={ring} aria-hidden="true"><b ref={label} /></div>
    </>
  );
}
