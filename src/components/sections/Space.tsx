import Image from "next/image";
import SplitWords from "@/components/ui/SplitWords";
import { space } from "@/content/site";
import styles from "./Space.module.css";

/** Foto do escritório em largura total; ela se afasta (zoom-out) com a rolagem. */
export default function Space() {
  return (
    <section className={styles.space} data-zoom>
      <Image src={space.image.src} alt={space.image.alt} fill sizes="100vw" />
      <div className={`${styles.ov} wrap`}>
        <span className="k">{space.label}</span>
        <SplitWords as="h2" className={styles.h} text={space.title} />
      </div>
    </section>
  );
}
