import { footer, site } from "@/content/site";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={`${styles.ft} wrap`}>
      <div className="g12">
        <span>{site.legalName}</span><span>{site.oab}</span><span>{footer.note}</span><span>© {new Date().getFullYear()}</span>
        <p className={styles.legal}>{site.legal}</p>
      </div>
    </footer>
  );
}
