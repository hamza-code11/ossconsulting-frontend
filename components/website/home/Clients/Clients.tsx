"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./Clients.module.css";

type Brand = {
  name: string;
  logo: string; // /public/clients/ ka path ya image URL
};

// Apne asli brands yahan daalo. Logos: public/clients/ me rakho
const brands: Brand[] = [
  { name: "Brand One", logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=480&q=80" },
  { name: "Brand Two", logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=480&q=80" },
  { name: "Brand Three", logo: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=480&q=80" },
  { name: "Brand Four", logo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=480&q=80" },
  { name: "Brand Five", logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=480&q=80" },
  { name: "Brand Six", logo: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=480&q=80" },
  { name: "Brand Seven", logo: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=480&q=80" },
  { name: "Brand Eight", logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=480&q=80" },
];

const MIN_ITEMS_PER_HALF = 12; // kam brands hon tab bhi patti bhari rahe

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function BrandCard({ brand }: { brand: Brand }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={styles.card}>
      <span className={styles.imageBox}>
        {failed ? (
          <span className={styles.fallback}>{initials(brand.name)}</span>
        ) : (
          <Image
            src={brand.logo}
            alt={`${brand.name} logo`}
            width={360}
            height={240}
            className={styles.image}
            onError={() => setFailed(true)}
          />
        )}
      </span>
      <span className={styles.name}>{brand.name}</span>
    </div>
  );
}

function MarqueeRow({ items }: { items: Brand[] }) {
  const repeat = Math.max(1, Math.ceil(MIN_ITEMS_PER_HALF / items.length));
  const half = Array.from({ length: repeat }).flatMap(() => items);

  return (
    <div className={styles.row}>
      <div className={styles.track}>
        <div className={styles.half}>
          {half.map((b, i) => (
            <BrandCard key={`a-${i}`} brand={b} />
          ))}
        </div>
        {/* Duplicate half: seamless loop ke liye */}
        <div className={`${styles.half} ${styles.dup}`} aria-hidden="true">
          {half.map((b, i) => (
            <BrandCard key={`b-${i}`} brand={b} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Clients() {
  return (
    <section className={styles.section} id="clients">
      <div className={styles.container}>
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
              TRUSTED BY
            </p>
            <h2 className={styles.heading}>
              Brands that grow
              <br />
              <span className={styles.headingAccent}>with us.</span>
            </h2>
          </div>

          <div className={styles.side}>
            <p className={styles.description}>
              From startups to established enterprises, these are the
              businesses we have had the privilege to work with.
            </p>
            <div className={styles.count}>
              <strong className={styles.countValue}>{brands.length}+</strong>
              <span className={styles.countLabel}>Brands served</span>
            </div>
          </div>
        </motion.header>
      </div>

      <motion.div
        className={styles.rows}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <MarqueeRow items={brands} />
      </motion.div>
    </section>
  );
}
