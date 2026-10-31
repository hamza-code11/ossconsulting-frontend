"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { contactData } from "@/data/contact";
import type { PrivacyBlock, PrivacyData } from "@/types/privacy";
import styles from "./privacy.module.css";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: i * 0.08 },
  }),
};

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

// Email data/contact.ts se aati hai
const emailItem = contactData.info.find((i) => i.icon === "mail");

function Block({ block }: { block: PrivacyBlock }) {
  if (block.type === "list") {
    return (
      <ul className={styles.list}>
        {block.items.map((item, i) => (
          <li key={i} className={styles.li}>
            {item}
          </li>
        ))}
      </ul>
    );
  }
  return <p className={styles.p}>{block.text}</p>;
}

export default function PrivacyPage({ data }: { data: PrivacyData }) {
  const { hero, sections, contact } = data;
  const [active, setActive] = useState(sections[0]?.id ?? "");

  // Scroll karte waqt current section highlight
  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <main className={styles.page}>
      {/* ===== Hero ===== */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <motion.div
            className={styles.heroContent}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              {hero.eyebrow}
            </p>
            <h1 className={styles.heroTitle}>
              {hero.title}{" "}
              <span className={styles.accent}>{hero.accent}</span>
            </h1>
            <p className={styles.heroDesc}>{hero.description}</p>
            <p className={styles.updated}>
              {data.updatedLabel}:{" "}
              <time dateTime={data.lastUpdated}>
                {dateFmt.format(new Date(data.lastUpdated))}
              </time>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== Contents + Policy ===== */}
      <section className={styles.main}>
        <div className={`${styles.container} ${styles.layout}`}>
          <aside className={styles.toc}>
            <nav className={styles.tocCard} aria-label="Policy contents">
              <span className={styles.tocLabel}>{data.contentsLabel}</span>
              <ol className={styles.tocList}>
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`${styles.tocLink} ${active === s.id ? styles.tocActive : ""}`}
                      aria-current={active === s.id ? "true" : undefined}
                    >
                      <span className={styles.tocNum}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className={styles.policy}>
            {sections.map((s, i) => (
              <motion.section
                key={s.id}
                id={s.id}
                className={styles.section}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
              >
                <h2 className={styles.h2}>
                  <span className={styles.h2Num}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </h2>
                {s.blocks.map((b, j) => (
                  <Block key={j} block={b} />
                ))}
              </motion.section>
            ))}

            {/* Contact card */}
            <motion.div
              className={styles.contactCard}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              <span className={styles.contactIcon}>
                <Mail size={22} />
              </span>
              <div className={styles.contactText}>
                <h2 className={styles.contactTitle}>{contact.title}</h2>
                <p className={styles.p}>{contact.text}</p>
                {emailItem && (
                  <a
                    href={emailItem.href ?? `mailto:${emailItem.value}`}
                    className={styles.contactEmail}
                  >
                    {emailItem.value}
                  </a>
                )}
              </div>
              <Link href="/contact" className={styles.contactBtn}>
                {contact.buttonLabel} <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
