import styles from "./AboutSkeleton.module.css";

export default function AboutSkeleton() {
  return (
    <main
      className={styles.page}
      aria-busy="true"
      aria-label="Loading about page"
    >
      {/* Hero */}
      <section className={styles.container}>
        <div className={`${styles.bone} ${styles.eyebrow}`} />
        <div className={`${styles.bone} ${styles.title}`} />
        <div className={`${styles.bone} ${styles.titleShort}`} />
        <div className={`${styles.bone} ${styles.line}`} />
        <div className={`${styles.bone} ${styles.lineShort}`} />

        <div className={styles.stats}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`${styles.bone} ${styles.stat}`} />
          ))}
        </div>
      </section>

      {/* Story */}
      <section className={`${styles.container} ${styles.story}`}>
        <div className={`${styles.bone} ${styles.storyImg}`} />
        <div className={styles.storyText}>
          <div className={`${styles.bone} ${styles.eyebrow}`} />
          <div className={`${styles.bone} ${styles.h2}`} />
          <div className={`${styles.bone} ${styles.h2Short}`} />
          <div className={`${styles.bone} ${styles.line}`} />
          <div className={`${styles.bone} ${styles.line}`} />
          <div className={`${styles.bone} ${styles.lineShort}`} />
        </div>
      </section>

      {/* Cards */}
      <section className={styles.container}>
        <div className={`${styles.bone} ${styles.h2}`} />
        <div className={styles.grid}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`${styles.bone} ${styles.card}`} />
          ))}
        </div>
      </section>
    </main>
  );
}
