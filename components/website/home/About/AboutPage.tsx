import AboutContent from "./AboutContent";
import AboutVisual from "./AboutVisual";
import styles from "./AboutPage.module.css";

export default function AboutPage() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={styles.container}>
        <div className={styles.left}>
          <AboutContent />
        </div>
        <div className={styles.right}>
          <AboutVisual />
        </div>
      </div>
    </section>
  );
}
