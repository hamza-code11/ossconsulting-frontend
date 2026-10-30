import styles from "./ServicesSkeleton.module.css";

export default function ServicesSkeleton() {
  return (
    <main
      className={styles.page}
      aria-busy="true"
      aria-label="Loading services page"
    >
      <section className={styles.container}>
        <div className={`${styles.bone} ${styles.eyebrow}`} />
        <div className={`${styles.bone} ${styles.title}`} />
        <div className={`${styles.bone} ${styles.titleShort}`} />
        <div className={`${styles.bone} ${styles.line}`} />
        <div className={`${styles.bone} ${styles.lineShort}`} />
      </section>

      <section className={styles.container}>
        <div className={styles.filters}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`${styles.bone} ${styles.pill}`} />
          ))}
        </div>

        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`${styles.bone} ${styles.card}`} />
          ))}
        </div>
      </section>
    </main>
  );
}
