import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./AboutContent.module.css";

export default function AboutContent() {
  return (
    <div className={styles.content}>
      <div className={styles.heading}>
        <p className={styles.eyebrow}>
          <span className={styles.line} aria-hidden="true" />
          About OSS Consulting
        </p>
        <h2 id="about-heading" className={styles.title}>
          Your Business. Our Expertise. <em>One Powerful Partner.</em>
        </h2>
      </div>

      <div className={styles.copy}>
        <p className={styles.lead}>
          OSS Consulting provides comprehensive business solutions across the
          United States, combining professional security surveillance, advanced
          technology, digital marketing and financial management services.
        </p>
        <p>
          From 24/7 remote camera monitoring to accounting, bookkeeping,
          payroll, taxation, web development and AI automation, we help
          businesses operate smarter and grow with confidence.
        </p>
      </div>

      <Link href="/services" className={styles.link}>
        Explore our services <ArrowRight size={16} />
      </Link>
    </div>
  );
}
