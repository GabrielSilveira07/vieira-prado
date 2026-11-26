import Image from "next/image";
import SplitWords from "@/components/ui/SplitWords";
import { office } from "@/content/site";
import styles from "./Office.module.css";

export default function Office() {
  return (
    <section className={`${styles.office} wrap g12`}>
      <div className={styles.pic}>
        <div className={styles.bk} data-slide />
        <div className={styles.im} data-reveal data-cursor="big" data-label={office.image.label}>
          <Image src={office.image.src} alt={office.image.alt} fill sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
      </div>
      <div className={styles.txt}>
        <span className="k">{office.label}</span>
        <SplitWords as="h2" className="title" text={office.title} />
        {office.paragraphs.map((p) => <p key={p}>{p}</p>)}
      </div>
    </section>
  );
}
