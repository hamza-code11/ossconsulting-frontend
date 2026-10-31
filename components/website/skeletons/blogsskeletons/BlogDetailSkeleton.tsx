import styles from "./BlogDetailSkeleton.module.css";

export default function BlogDetailSkeleton() {
  return (
    <main
      className={styles.page}
      aria-busy="true"
      aria-label="Loading article"
    >
      <div className={styles.container}>
        <div className={`${styles.bone} ${styles.badge}`} />
        <div className={`${styles.bone} ${styles.title}`} />
        <div className={`${styles.bone} ${styles.titleShort}`} />
        <div className={`${styles.bone} ${styles.line}`} />
        <div className={`${styles.bone} ${styles.cover}`} />
        <div className={`${styles.bone} ${styles.line}`} />
        <div className={`${styles.bone} ${styles.line}`} />
        <div className={`${styles.bone} ${styles.lineShort}`} />
      </div>
    </main>
  );
}
