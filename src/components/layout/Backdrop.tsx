import styles from "./Backdrop.module.css";

/** Grid de 12 colunas em traço fino e textura de papel, fixos atrás da página. */
export default function Backdrop() {
  return (
    <>
      <div className={`${styles.cols} wrap g12`} aria-hidden="true" data-cols>
        {Array.from({ length: 12 }, (_, i) => <i key={i} />)}
      </div>
      <div className={styles.grain} aria-hidden="true" />
    </>
  );
}
