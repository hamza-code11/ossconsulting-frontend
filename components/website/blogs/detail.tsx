"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowUpRight, BookOpen } from "lucide-react";
import type { BlogBlock, BlogPost, BlogsData } from "@/types/blogs";
import styles from "./blogDetail.module.css";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: i * 0.1 },
  }),
};

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 className={styles.h2}>{block.text}</h2>;

    case "paragraph":
      return <p className={styles.p}>{block.text}</p>;

    case "list":
      return block.ordered ? (
        <ol className={`${styles.list} ${styles.ordered}`}>
          {block.items.map((item, i) => (
            <li key={i} className={styles.li}>
              {item}
            </li>
          ))}
        </ol>
      ) : (
        <ul className={`${styles.list} ${styles.bullets}`}>
          {block.items.map((item, i) => (
            <li key={i} className={styles.li}>
              {item}
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote className={styles.quote}>
          <p>{block.text}</p>
          {block.cite && <cite className={styles.cite}>{block.cite}</cite>}
        </blockquote>
      );

    default:
      return null;
  }
}

export default function BlogDetail({
  data,
  post,
}: {
  data: BlogsData;
  post: BlogPost;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  const labelOf = (id: string) =>
    data.categories.find((c) => c.id === id)?.label;

  const category = labelOf(post.category);

  // Latest 3 aur posts (is post ko chhor kar)
  const more = [...data.posts]
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* ===== Hero: header (left) + image (right) ===== */}
        <section className={styles.hero}>
          <motion.header
            className={styles.header}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <Link href="/blogs" className={styles.back}>
              <ArrowLeft size={16} /> {data.backLabel}
            </Link>

            {category && <span className={styles.badge}>{category}</span>}

            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.excerpt}>{post.excerpt}</p>

            <div className={styles.meta}>
              <span className={styles.avatar} aria-hidden="true">
                {initials(data.author)}
              </span>
              <span className={styles.metaText}>
                <span className={styles.author}>{data.author}</span>
                <time className={styles.date} dateTime={post.date}>
                  {dateFmt.format(new Date(post.date))}
                </time>
              </span>
            </div>
          </motion.header>

          <motion.div
            className={styles.cover}
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="show"
          >
            {imgFailed ? (
              <span className={styles.coverFallback}>
                <BookOpen size={56} />
              </span>
            ) : (
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 50vw"
                className={styles.coverImg}
                onError={() => setImgFailed(true)}
              />
            )}
          </motion.div>
        </section>

        {/* ===== Body: content (left) + sidebar (right) ===== */}
        <div className={styles.layout}>
          <motion.article
            className={styles.content}
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="show"
          >
            {post.content.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </motion.article>

          <aside className={styles.sidebar}>
            {more.length > 0 && (
              <div className={styles.sideCard}>
                <h2 className={styles.moreTitle}>{data.moreLabel}</h2>
                <ul className={styles.moreList}>
                  {more.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blogs/${p.slug}`}
                        className={styles.moreCard}
                      >
                        <span className={styles.moreTag}>
                          {labelOf(p.category)}
                        </span>
                        <span className={styles.moreHead}>{p.title}</span>
                        <span className={styles.moreArrow} aria-hidden="true">
                          <ArrowUpRight size={18} />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link href="/blogs" className={styles.sideBack}>
              <ArrowLeft size={16} /> {data.backLabel}
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
