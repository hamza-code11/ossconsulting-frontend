"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import styles from "./Hero.module.css";

const Hero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => (
    <Image
      src="/hero/sculpture.png"
      alt=""
      fill
      priority
      sizes="(max-width: 1024px) 90vw, 46vw"
      className={styles.sculptureImg}
    />
  ),
});

const audience = ["Startups", "SMEs", "Enterprises"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { damping: 30, stiffness: 120 };
  const smoothX = useSpring(mouseX, spring);
  const smoothY = useSpring(mouseY, spring);

  // Parallax sirf background shapes (disc + rings) par, 3D object ka apna tilt hai
  const farX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const farY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      className={styles.hero}
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Left vertical label */}
      <div className={styles.sideLabel} aria-hidden="true">
        <span className={styles.sideLine} />
        <span className={styles.sideText}>CONSULTING · TECHNOLOGY · GROWTH</span>
        <span className={styles.sideLine} />
      </div>

      {/* Text column */}
      <div className={styles.container}>
        <motion.div
          className={styles.textContent}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            ONE STOP SHOP FOR BUSINESS SERVICES
          </p>

          <h1 className={styles.heading}>
            One Partner.
            <br />
            Every Business
            <br />
            <span className={styles.headingAccent}>Possibility.</span>
          </h1>

          <p className={styles.description}>
            From business consulting and technology to marketing and operational
            support, OSS brings the services businesses need to move forward — all
            under one roof.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="#services" className={styles.primaryCta}>
              Explore Our Services <ArrowRight size={18} />
            </Link>
            <Link href="#contact" className={styles.secondaryCta}>
              Let&apos;s Talk Business <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className={styles.progress} aria-hidden="true">
            <span className={styles.progressDot} />
            <span className={styles.progressFill} />
          </div>

          <div className={styles.audience}>
            <span className={styles.audienceLabel}>FOR EVERY STAGE OF BUSINESS</span>
            <ul className={styles.chips}>
              {audience.map((item) => (
                <li key={item} className={styles.chip}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Visual column */}
      <motion.div
        className={styles.visual}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.15 }}
      >
        <div className={styles.glow} aria-hidden="true" />

        {/* Background: disc + rings */}
        <motion.div
          className={styles.layer}
          style={{ x: farX, y: farY }}
          aria-hidden="true"
        >
          {/* <div className={styles.disc} /> */}
          <div className={styles.ringSolid} />
          <div className={styles.ringDashed} />
        </motion.div>

        {/* 3D object */}
        <div className={styles.sculptureSlot}>
          <div
            className={styles.canvasWrap}
            role="img"
            aria-label="Abstract 3D knot orbited by four nodes, representing OSS's four practices"
          >
            <Hero3D />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
