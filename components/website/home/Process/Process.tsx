"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Compass,
  Megaphone,
  Settings2,
  Target,
} from "lucide-react";
import Link from "next/link";
import styles from "./Process.module.css";

const steps = [
  {
    icon: Compass,
    tag: "Consulting",
    title: "Discover",
    summary: "Understand the business, find the gaps",
    text: "We study how your business runs today, identify where it is losing time or money, and shape a clear roadmap before any work begins.",
    points: [
      "Business and process audit",
      "Market and competitor research",
      "Prioritised roadmap and strategy",
    ],
    outcome: "A clear plan your whole team understands and agrees on.",
  },
  {
    icon: Code2,
    tag: "Technology",
    title: "Build",
    summary: "Software and systems that fit your teams",
    text: "Our engineers design and build custom software, integrations and infrastructure around the way your teams actually work.",
    points: [
      "Web and mobile applications",
      "System integration and APIs",
      "Cloud setup and security",
    ],
    outcome: "Reliable systems that replace manual work and scale with you.",
  },
  {
    icon: Megaphone,
    tag: "Growth",
    title: "Grow",
    summary: "Put your business in front of customers",
    text: "Marketing and brand strategy that turns what we build into visibility, leads and long-term customer relationships.",
    points: [
      "Brand identity and positioning",
      "Digital marketing campaigns",
      "Lead generation and tracking",
    ],
    outcome: "A stronger brand and a steady flow of qualified leads.",
  },
  {
    icon: Settings2,
    tag: "Operations",
    title: "Run",
    summary: "Ongoing support after launch",
    text: "We stay involved after launch with operational support, monitoring and reporting, so you can focus on the business itself.",
    points: [
      "Process automation",
      "Managed support and maintenance",
      "Reporting and insights",
    ],
    outcome: "Smooth day-to-day operations with a team you can rely on.",
  },
];

// Asli numbers yahan daalo
const stats = [
  { value: 150, suffix: "+", label: "Projects delivered" },
  { value: 4, suffix: "", label: "Core practices" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
  { value: 24, suffix: "/7", label: "Support coverage" },
];

const AUTOPLAY_MS = 6000;

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

export default function Process() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = setTimeout(
      () => setActive((a) => (a + 1) % steps.length),
      AUTOPLAY_MS
    );
    return () => clearTimeout(id);
  }, [active, paused, reduceMotion]);

  const current = steps[active];
  const CurrentIcon = current.icon;

  return (
    <section className={styles.section} id="process">
      <div className={styles.container}>
        {/* Header */}
        <motion.header
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              HOW WE WORK
            </p>
            <h2 className={styles.heading}>
              From first idea to
              <br />
              <span className={styles.headingAccent}>everyday results.</span>
            </h2>
          </div>
          <p className={styles.description}>
            One team, one process, four practices. No handoffs between vendors
            and no gaps between strategy and execution.
          </p>
        </motion.header>

        {/* Workspace */}
        <motion.div
          className={styles.workspace}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* Left: step list */}
          <div className={styles.tabs} role="tablist" aria-label="Our process">
            {steps.map((step, i) => {
              const isActive = i === active;
              return (
                <button
                  key={step.title}
                  type="button"
                  role="tab"
                  id={`process-tab-${i}`}
                  aria-selected={isActive}
                  aria-controls="process-panel"
                  tabIndex={isActive ? 0 : -1}
                  className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                  onClick={() => setActive(i)}
                >
                  <span className={styles.tabNum}>0{i + 1}</span>
                  <span className={styles.tabText}>
                    <span className={styles.tabTitle}>{step.title}</span>
                    <span className={styles.tabSummary}>{step.summary}</span>
                  </span>
                  <ArrowRight size={18} className={styles.tabArrow} />
                </button>
              );
            })}
          </div>

          {/* Right: detail panel */}
          <div
            className={styles.panel}
            role="tabpanel"
            id="process-panel"
            aria-labelledby={`process-tab-${active}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className={styles.panelInner}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className={styles.panelTop}>
                  <span className={styles.panelIcon}>
                    <CurrentIcon size={24} />
                  </span>
                  <span className={styles.panelStep}>
                    {current.tag} · Step 0{active + 1} / 0{steps.length}
                  </span>
                </div>

                <h3 className={styles.panelTitle}>{current.title}</h3>
                <p className={styles.panelText}>{current.text}</p>

                <div className={styles.panelGrid}>
                  <div>
                    <h4 className={styles.subTitle}>What you get</h4>
                    <ul className={styles.checks}>
                      {current.points.map((p) => (
                        <li key={p} className={styles.check}>
                          <span className={styles.checkIcon}>
                            <Check size={14} strokeWidth={3} />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.outcome}>
                    <span className={styles.outcomeIcon}>
                      <Target size={18} />
                    </span>
                    <h4 className={styles.subTitle}>Expected outcome</h4>
                    <p className={styles.outcomeText}>{current.outcome}</p>
                  </div>
                </div>

                <Link href="#contact" className={styles.cta}>
                  Talk to our team <ArrowUpRight size={16} />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Stats */}
        <ul className={styles.stats}>
          {stats.map((s, i) => (
            <motion.li
              key={s.label}
              className={styles.stat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
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
  );
}
