"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Compass,
  Eye,
  Lightbulb,
  Megaphone,
  Rocket,
  Settings2,
  ShieldCheck,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { AboutData, AboutIcon, AboutSectionHead } from "@/types/about";
import styles from "./about.module.css";

const ICONS: Record<AboutIcon, LucideIcon> = {
  target: Target,
  eye: Eye,
  shield: ShieldCheck,
  lightbulb: Lightbulb,
  users: Users,
  rocket: Rocket,
  compass: Compass,
  code: Code2,
  megaphone: Megaphone,
  settings: Settings2,
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: i * 0.08 },
  }),
};

const viewport = { once: true, margin: "-70px" } as const;

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setVal(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduceMotion]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

function SafeImage({
  src,
  alt,
  fallback,
  sizes,
}: {
  src: string;
  alt: string;
  fallback: string;
  sizes: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className={styles.imgFallback}>{fallback}</span>;
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={styles.img}
      onError={() => setFailed(true)}
    />
  );
}

function SectionHead({ head }: { head: AboutSectionHead }) {
  return (
    <motion.header
      className={styles.sectionHead}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      <div>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowLine} />
          {head.eyebrow}
        </p>
        <h2 className={styles.heading}>
          {head.title} <span className={styles.accent}>{head.accent}</span>
        </h2>
      </div>
      {head.description && (
        <p className={styles.sectionDesc}>{head.description}</p>
      )}
    </motion.header>
  );
}

export default function AboutPage({ data }: { data: AboutData }) {
  const { hero, stats, story, pillars, values } =
    data;

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
          </motion.div>

          <ul className={styles.stats}>
            {stats.map((s, i) => (
              <motion.li
                key={s.label}
                className={styles.stat}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
              >
                <strong className={styles.statValue}>
                  <Counter to={s.value} suffix={s.suffix} />
                </strong>
                <span className={styles.statLabel}>{s.label}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== Story ===== */}
      <section className={styles.section}>
        <div className={`${styles.container} ${styles.story}`}>
          <motion.div
            className={styles.storyImages}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            {story.images.map((img, i) => (
              <div
                key={img.src}
                className={`${styles.storyImg} ${i === 0 ? styles.storyImgA : styles.storyImgB}`}
              >
                <SafeImage
                  src={img.src}
                  alt={img.alt}
                  fallback="OSS"
                  sizes="(max-width: 1024px) 60vw, 28vw"
                />
              </div>
            ))}
          </motion.div>

          <motion.div
            className={styles.storyText}
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              {story.eyebrow}
            </p>
            <h2 className={styles.heading}>
              {story.title}{" "}
              <span className={styles.accent}>{story.accent}</span>
            </h2>
            {story.paragraphs.map((p) => (
              <p key={p} className={styles.paragraph}>
                {p}
              </p>
            ))}
            <ul className={styles.highlights}>
              {story.highlights.map((h) => (
                <li key={h} className={styles.highlight}>
                  <span className={styles.check}>
                    <Check size={14} strokeWidth={3} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ===== Mission / Vision ===== */}
      <section className={styles.sectionTight}>
        <div className={`${styles.container} ${styles.pillars}`}>
          {pillars.map((p, i) => {
            const Icon = ICONS[p.icon];
            return (
              <motion.article
                key={p.label}
                className={styles.pillar}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
              >
                <span className={styles.iconBox}>
                  <Icon size={24} />
                </span>
                <span className={styles.label}>{p.label}</span>
                <h3 className={styles.cardTitleLg}>{p.title}</h3>
                <p className={styles.cardText}>{p.text}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ===== Values ===== */}
      <section className={styles.section}>
        <div className={styles.container}>
          <SectionHead head={data.valuesHead} />
          <ul className={styles.grid4}>
            {values.map((v, i) => {
              const Icon = ICONS[v.icon];
              return (
                <motion.li
                  key={v.title}
                  className={styles.card}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                >
                  <span className={styles.iconBox}>
                    <Icon size={22} />
                  </span>
                  <h3 className={styles.cardTitle}>{v.title}</h3>
                  <p className={styles.cardText}>{v.text}</p>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}
