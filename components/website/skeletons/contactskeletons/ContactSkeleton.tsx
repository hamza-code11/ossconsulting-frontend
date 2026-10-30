import styles from "./ContactSkeleton.module.css";

export default function ContactSkeleton() {
  return (
    <main
      className={styles.page}
      aria-busy="true"
      aria-label="Loading contact page"
    >
      <section className={styles.container}>
        <div className={`${styles.bone} ${styles.eyebrow}`} />
        <div className={`${styles.bone} ${styles.title}`} />
        <div className={`${styles.bone} ${styles.titleShort}`} />
        <div className={`${styles.bone} ${styles.line}`} />
        <div className={`${styles.bone} ${styles.lineShort}`} />
      </section>

      <section className={`${styles.container} ${styles.layout}`}>
        <div className={styles.infoCol}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`${styles.bone} ${styles.infoCard}`} />
          ))}
        </div>
        <div className={`${styles.bone} ${styles.form}`} />
      </section>
    </main>
  );
}
