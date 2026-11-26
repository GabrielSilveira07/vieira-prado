"use client";

import { useEffect, useRef } from "react";
import { useConsult } from "@/components/consult/ConsultProvider";
import SplitWords from "@/components/ui/SplitWords";
import { contact } from "@/content/site";
import { prefersReduced } from "@/lib/motion";
import styles from "./Contact.module.css";

/** Fecho: frase, botão magnético que abre a consulta e os dados de contato. */
export default function Contact() {
  const { open } = useConsult();
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const b = btn.current;
    if (!b || prefersReduced() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const move = (e: PointerEvent) => { const r = b.getBoundingClientRect(); tx = (e.clientX - r.left - r.width / 2) * 0.3; ty = (e.clientY - r.top - r.height / 2) * 0.4; };
    const leave = () => { tx = 0; ty = 0; };
    const loop = () => { cx += (tx - cx) * 0.15; cy += (ty - cy) * 0.15; b.style.transform = `translate(${cx}px, ${cy}px)`; raf = requestAnimationFrame(loop); };
    b.addEventListener("pointermove", move); b.addEventListener("pointerleave", leave); raf = requestAnimationFrame(loop);
    return () => { b.removeEventListener("pointermove", move); b.removeEventListener("pointerleave", leave); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className={`${styles.contact} wrap g12`} id="contato">
      <SplitWords as="h2" className={styles.h} text={contact.title} emphasis={contact.emphasis} end={contact.end} />
      <div className={styles.cta}>
        <button ref={btn} type="button" className={styles.mag} onClick={() => open()} data-cursor="link">
          <span>{contact.cta}</span><span aria-hidden="true">→</span>
        </button>
      </div>
      <div className={`${styles.info} g12`} data-stagger>
        {contact.info.map((i) => (
          <div key={i.label}><span className="k">{i.label}</span><b>{i.value}</b><span>{i.note}</span></div>
        ))}
      </div>
    </section>
  );
}
