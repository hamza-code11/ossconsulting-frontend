"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  Camera,
  Check,
  Code2,
  Compass,
  Database,
  Globe,
  GraduationCap,
  Headset,
  Megaphone,
  Palette,
  PenTool,
  SearchCheck,
  Settings2,
  Share2,
  Smartphone,
  Wind,
  Workflow,
  Calculator,
  MonitorCog,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIcon, ServicesData } from "@/types/services";
import styles from "./services.module.css";

const ICONS: Record<ServiceIcon, LucideIcon> = {
  compass: Compass,
  code: Code2,
  megaphone: Megaphone,
  settings: Settings2,
  briefcase: Briefcase,
  workflow: Workflow,
  graduation: GraduationCap,
  building: Building2,
  globe: Globe,
  smartphone: Smartphone,
  database: Database,
  camera: Camera,
  share: Share2,
  search: SearchCheck,
  pen: PenTool,
  palette: Palette,
  headset: Headset,
  wind: Wind,
  calculator: Calculator,
  "monitor-cog": MonitorCog,
  "clipboard-list": ClipboardList,
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

function ServiceImage({
  src,
  alt,
  Icon,
}: {
  src: string;
  alt: string;
  Icon: LucideIcon;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className={styles.imgFallback}>
        <Icon size={44} />
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 92vw, (max-width: 1100px) 46vw, 30vw"
      className={styles.img}
      onError={() => setFailed(true)}
    />
  );
}

export default function ServicesPage({ data }: { data: ServicesData }) {
  const { hero, categories, services, delivery } = data;
  const [active, setActive] = useState<string>("all");

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: services.length };
    services.forEach((s) => {
      map[s.category] = (map[s.category] ?? 0) + 1;
    });
    return map;
  }, [services]);

  const labelOf = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c.label])),
    [categories]
  );

  const visible =
    active === "all" ? services : services.filter((s) => s.category === active);

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
        </div>
      </section>

      {/* ===== Filter + Grid ===== */}
      <section className={styles.listing}>
        <div className={styles.container}>
          <div
            className={styles.filters}
            role="tablist"
            aria-label="Filter services"
          >
            <button
              type="button"
              role="tab"
              aria-selected={active === "all"}
              className={`${styles.filter} ${active === "all" ? styles.filterActive : ""}`}
              onClick={() => setActive("all")}
            >
              {data.allLabel}
              <span className={styles.count}>{counts.all}</span>
            </button>

            {categories.map((c) => {
              const Icon = ICONS[c.icon];
              const isActive = active === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.filter} ${isActive ? styles.filterActive : ""}`}
                  onClick={() => setActive(c.id)}
                >
                  <Icon size={16} />
                  {c.label}
                  <span className={styles.count}>{counts[c.id] ?? 0}</span>
                </button>
              );
            })}
          </div>

          <motion.ul className={styles.grid} layout>
            <AnimatePresence mode="popLayout">
              {visible.map((s) => {
                const Icon = ICONS[s.icon];
                return (
                  <motion.li
                    key={s.id}
                    layout
                    className={styles.card}
                    initial={{ opacity: 0, scale: 0.96, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <div className={styles.mediaWrap}>
                      <div className={styles.media}>
                        <ServiceImage src={s.image} alt={s.title} Icon={Icon} />
                        <span className={styles.tag}>{labelOf[s.category]}</span>
                      </div>
                      <span className={styles.iconBox}>
                        <Icon size={22} />
                      </span>
                    </div>

                    <div className={styles.body}>
                      <h3 className={styles.cardTitle}>{s.title}</h3>
                      <p className={styles.cardText}>{s.text}</p>

                      <ul className={styles.features}>
                        {s.features.map((f) => (
                          <li key={f} className={styles.feature}>
                            <span className={styles.check}>
                              <Check size={12} strokeWidth={3} />
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>

                      <Link href="/contact" className={styles.cardLink}>
                        Get started <ArrowUpRight size={15} />
                      </Link>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        </div>
      </section>

      {/* ===== How we deliver ===== */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.header
            className={styles.sectionHead}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              {data.deliveryHead.eyebrow}
            </p>
            <h2 className={styles.heading}>
              {data.deliveryHead.title}{" "}
              <span className={styles.accent}>{data.deliveryHead.accent}</span>
            </h2>
          </motion.header>

          <ol className={styles.steps}>
            {delivery.map((d, i) => (
              <motion.li
                key={d.title}
                className={styles.step}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
              >
                <span className={styles.stepNum}>0{i + 1}</span>
                <h3 className={styles.stepTitle}>{d.title}</h3>
                <p className={styles.cardText}>{d.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}