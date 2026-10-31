import styles from "./BlogsSkeleton.module.css";

export default function BlogsSkeleton() {
  return (
    <main
      className={styles.page}
      aria-busy="true"
      aria-label="Loading blog page"
    >
      <section className={styles.container}>
        <div className={`${styles.bone} ${styles.eyebrow}`} />
        <div className={`${styles.bone} ${styles.title}`} />
        <div className={`${styles.bone} ${styles.titleShort}`} />
        <div className={`${styles.bone} ${styles.line}`} />
      </section>

      <section className={styles.container}>
        <div className={`${styles.bone} ${styles.featured}`} />
      </section>

      <section className={styles.container}>
        <div className={styles.toolbar}>
          {Array.from({ length: 4 }).map((_, i) => (
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
