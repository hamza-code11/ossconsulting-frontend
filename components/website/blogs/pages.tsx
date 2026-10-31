"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowUpRight, BookOpen, Search, X } from "lucide-react";
import type { BlogPost, BlogsData } from "@/types/blogs";
import styles from "./blogs.module.css";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: i * 0.08 },
  }),
};

// UTC use kiya hai taake server aur browser me date same aaye
const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const formatDate = (iso: string) => dateFmt.format(new Date(iso));

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function PostImage({
  src,
  alt,
  sizes,
}: {
  src: string;
  alt: string;
  sizes: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className={styles.imgFallback}>
        <BookOpen size={40} />
      </span>
    );
  }

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

function Meta({ post, author }: { post: BlogPost; author: string }) {
  return (
    <div className={styles.meta}>
      <span className={styles.avatar} aria-hidden="true">
        {initials(author)}
      </span>
      <span className={styles.metaText}>
        <span className={styles.author}>{author}</span>
        <span className={styles.metaLine}>{formatDate(post.date)}</span>
      </span>
    </div>
  );
}

export default function BlogsPage({ data }: { data: BlogsData }) {
  const { hero, categories, posts, author } = data;
  const [active, setActive] = useState<string>("all");
  const [query, setQuery] = useState("");

  const labelOf = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c.label])),
    [categories]
  );

  const sorted = useMemo(
    () => [...posts].sort((a, b) => b.date.localeCompare(a.date)),
    [posts]
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: posts.length };
    posts.forEach((p) => {
      map[p.category] = (map[p.category] ?? 0) + 1;
    });
    return map;
  }, [posts]);

  const q = query.trim().toLowerCase();
  const filtering = active !== "all" || q !== "";

  const filtered = sorted.filter((p) => {
    const inCategory = active === "all" || p.category === active;
    const inSearch =
      q === "" ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q);
    return inCategory && inSearch;
  });

  // Featured sirf tab dikhao jab koi filter na laga ho
  const featured = !filtering
    ? (sorted.find((p) => p.featured) ?? null)
    : null;
  const list = featured
    ? filtered.filter((p) => p.slug !== featured.slug)
    : filtered;

  const reset = () => {
    setActive("all");
    setQuery("");
  };

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

      {/* ===== Featured ===== */}
      {featured && (
        <section className={styles.featuredSection}>
          <div className={styles.container}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
            >
              <Link
                href={`/blogs/${featured.slug}`}
                className={styles.featured}
              >
                <div className={styles.featuredMedia}>
                  <PostImage
                    src={featured.image}
                    alt={featured.title}
                    sizes="(max-width: 1024px) 92vw, 50vw"
                  />
                </div>
                <div className={styles.featuredBody}>
                  <div className={styles.badges}>
                    <span className={styles.badgeSolid}>
                      {data.featuredLabel}
                    </span>
                    <span className={styles.badge}>
                      {labelOf[featured.category]}
                    </span>
                  </div>
                  <h2 className={styles.featuredTitle}>{featured.title}</h2>
                  <p className={styles.featuredText}>{featured.excerpt}</p>
                  <Meta post={featured} author={author} />
                  <span className={styles.readMore}>
                    {data.readMoreLabel} <ArrowUpRight size={16} />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ===== Toolbar + Grid ===== */}
      <section className={styles.listing}>
        <div className={styles.container}>
          <div className={styles.toolbar}>
            <div
              className={styles.filters}
              role="tablist"
              aria-label="Filter articles"
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
                    {c.label}
                    <span className={styles.count}>{counts[c.id] ?? 0}</span>
                  </button>
                );
              })}
            </div>

            <div className={styles.search}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="search"
                className={styles.searchInput}
                placeholder={data.searchPlaceholder}
                aria-label={data.searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button
                  type="button"
                  className={styles.searchClear}
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className={styles.empty} role="status">
              <span className={styles.emptyIcon}>
                <Search size={28} />
              </span>
              <h3 className={styles.emptyTitle}>{data.emptyTitle}</h3>
              <p className={styles.emptyText}>{data.emptyText}</p>
              <button type="button" className={styles.ghostBtn} onClick={reset}>
                {data.emptyReset}
              </button>
            </div>
          ) : (
            <motion.ul className={styles.grid} layout>
              <AnimatePresence mode="popLayout">
                {list.map((p) => (
                  <motion.li
                    key={p.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.96, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <Link href={`/blogs/${p.slug}`} className={styles.card}>
                      <div className={styles.media}>
                        <PostImage
                          src={p.image}
                          alt={p.title}
                          sizes="(max-width: 640px) 92vw, (max-width: 1100px) 46vw, 30vw"
                        />
                        <span className={styles.tag}>
                          {labelOf[p.category]}
                        </span>
                      </div>

                      <div className={styles.body}>
                        <h3 className={styles.cardTitle}>{p.title}</h3>
                        <p className={styles.cardText}>{p.excerpt}</p>
                        <div className={styles.cardFoot}>
                          <Meta post={p} author={author} />
                          <span className={styles.arrow} aria-hidden="true">
                            <ArrowUpRight size={18} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </div>
      </section>
    </main>
  );
}
