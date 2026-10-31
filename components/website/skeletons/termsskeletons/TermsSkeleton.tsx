import styles from "../privacyskeletons/PrivacySkeleton.module.css";

export default function TermsSkeleton() {
  return (
    <main
      className={styles.page}
      aria-busy="true"
      aria-label="Loading terms and conditions"
    >
      <section className={styles.container}>
        <div className={`${styles.bone} ${styles.eyebrow}`} />
        <div className={`${styles.bone} ${styles.title}`} />
        <div className={`${styles.bone} ${styles.line}`} />
        <div className={`${styles.bone} ${styles.lineShort}`} />
      </section>

      <section className={`${styles.container} ${styles.layout}`}>
        <div className={`${styles.bone} ${styles.toc}`} />
        <div className={styles.content}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={styles.block}>
              <div className={`${styles.bone} ${styles.h2}`} />
              <div className={`${styles.bone} ${styles.line}`} />
              <div className={`${styles.bone} ${styles.line}`} />
              <div className={`${styles.bone} ${styles.lineShort}`} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
