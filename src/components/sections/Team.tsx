import Image from "next/image";
import SplitWords from "@/components/ui/SplitWords";
import { team } from "@/content/site";
import styles from "./Team.module.css";

export default function Team() {
  return (
    <section className={`${styles.team} wrap g12`} id="socios">
      <div className={styles.head}>
        <SplitWords as="h2" className="title" text={team.title} />
        <span className="k">{team.label}</span>
      </div>
      {team.members.map((m) => (
        <article className={styles.mem} key={m.name}>
          <div className={styles.bk} />
          <div className={styles.por} data-reveal data-cursor="big" data-label={team.cursor}>
            <Image src={m.image} alt={`Retrato de ${m.name}`} fill sizes="(max-width: 900px) 86vw, 38vw" />
          </div>
          <div className={styles.info}>
            <span className="k">{m.oab}</span>
            <h3>{m.name}</h3>
            <p>{m.text}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
