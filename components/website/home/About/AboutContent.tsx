import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./AboutContent.module.css";

export default function AboutContent() {
  return (
    <div className={styles.content}>
      <div className={styles.heading}>
        <p className={styles.eyebrow}>
          <span className={styles.line} aria-hidden="true" />
          ABOUT OSS
        </p>
        <h2 id="about-heading" className={styles.title}>
          More Than Services. <em>A Partner</em> in Your Business Journey.
        </h2>
      </div>

      <div className={styles.copy}>
        <p className={styles.lead}>
          Every business has different goals, challenges, and opportunities. OSS
          brings together a diverse range of professional services to help
          businesses navigate their needs, improve operations, and pursue growth.
        </p>
        <p>
          Whether you&apos;re building something new or looking to take an
          established business further, we&apos;re here to help you find the right
          solutions.
        </p>
      </div>

      <Link href="#services" className={styles.link}>
        Explore our services <ArrowRight size={16} />
      </Link>
    </div>
  );
}
