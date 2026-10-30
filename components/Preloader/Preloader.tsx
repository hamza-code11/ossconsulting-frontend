"use client";

import { useEffect, useState } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";
import styles from "./Preloader.module.css";

const WORD = "OSS".split("");
const MAX_WAIT_MS = 6000; // load atak jaye to bhi site khul jaye

type Phase = "loading" | "exiting" | "done";

export default function Preloader() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let counterDone = false;
    let pageLoaded = document.readyState === "complete";
    let finished = false;

    const tryFinish = () => {
      if (finished || !counterDone || !pageLoaded) return;
      finished = true;
      setPhase("exiting");
    };

    // Counter 0 -> 100
    const controls = animate(0, 100, {
      duration: reduceMotion ? 0.6 : 2.2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setProgress(Math.round(v)),
      onComplete: () => {
        counterDone = true;
        tryFinish();
      },
    });

    // Page resources load
    const onLoad = () => {
      pageLoaded = true;
      tryFinish();
    };
    if (!pageLoaded) window.addEventListener("load", onLoad);

    // Safety fallback
    const fallback = setTimeout(() => {
      counterDone = true;
      pageLoaded = true;
      setProgress(100);
      tryFinish();
    }, MAX_WAIT_MS);

    return () => {
      controls.stop();
      window.removeEventListener("load", onLoad);
      clearTimeout(fallback);
    };
  }, [reduceMotion]);

  // Loading ke dauran scroll lock
  useEffect(() => {
    if (phase === "done") return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, [phase]);

  if (phase === "done") return null;

  const exiting = phase === "exiting";
  const curtainEase = [0.76, 0, 0.24, 1] as const;

  return (
    <div
      className={styles.preloader}
      role="status"
      aria-live="polite"
      aria-label="Loading OSS Consulting"
    >
      {/* Back layer: brand color curtain */}
      <motion.div
        className={styles.curtainBrand}
        initial={false}
        animate={
          reduceMotion
            ? { opacity: exiting ? 0 : 1 }
            : { y: exiting ? "-100%" : "0%" }
        }
        transition={{ duration: reduceMotion ? 0.3 : 0.9, delay: reduceMotion ? 0 : 0.12, ease: curtainEase }}
      />

      {/* Front layer: main content */}
      <motion.div
        className={styles.curtain}
        initial={false}
        animate={
          reduceMotion
            ? { opacity: exiting ? 0 : 1 }
            : { y: exiting ? "-100%" : "0%" }
        }
        transition={{ duration: reduceMotion ? 0.3 : 0.9, ease: curtainEase }}
        onAnimationComplete={() => {
          if (exiting) setPhase("done");
        }}
      >
        <div className={styles.grid} aria-hidden="true" />

        {/* Center logo */}
        <div className={styles.center}>
          <div className={styles.ringSolid} aria-hidden="true" />
          <div className={styles.ringDashed} aria-hidden="true" />

          <h1 className={styles.logo} aria-hidden="true">
            {WORD.map((ch, i) => (
              <span key={i} className={styles.letterMask}>
                <motion.span
                  className={styles.letter}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: reduceMotion ? 0.2 : 0.8,
                    delay: reduceMotion ? 0 : 0.15 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {ch}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className={styles.tagline}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.7 }}
          >
            One Partner. Every Business Possibility.
          </motion.p>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <span className={styles.label}>CONSULTING · TECHNOLOGY · GROWTH</span>
          <span className={styles.counter}>
            {String(progress).padStart(3, "0")}
          </span>
        </div>

        <div className={styles.bar} aria-hidden="true">
          <span
            className={styles.barFill}
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
      </motion.div>
    </div>
  );
}
