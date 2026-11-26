import SplitWords from "@/components/ui/SplitWords";
import { manifesto } from "@/content/site";
import styles from "./Manifesto.module.css";

/** Declaração do escritório: as palavras acendem conforme a rolagem. */
export default function Manifesto() {
  return (
    <section className={`${styles.manifesto} wrap g12`} id="escritorio">
      <span className={`k ${styles.k}`}>{manifesto.label}</span>
      <SplitWords className={styles.p} text={manifesto.text} emphasis={manifesto.emphasis} end={manifesto.end} mode="light" />
    </section>
  );
}
