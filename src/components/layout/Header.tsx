"use client";

import { useEffect, useState } from "react";
import OpenConsult from "@/components/consult/OpenConsult";
import { nav, site } from "@/content/site";
import styles from "./Header.module.css";

export default function Header() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(scrollY > innerHeight * 0.9);
    on(); addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`${styles.hd} wrap ${solid ? styles.solid : ""}`} data-intro>
      <a className={styles.logo} href="#top">{site.name}</a>
      <nav className={styles.nav} aria-label="Principal">
        {nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
      </nav>
      <div className={styles.ct}><OpenConsult>Consulta</OpenConsult></div>
    </header>
  );
}
