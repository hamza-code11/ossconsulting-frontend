"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowUpRight,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  Phone,
  Plus,
  Send,
  type LucideIcon,
} from "lucide-react";
import type { ContactData, ContactIcon } from "@/types/contact";
import styles from "./contact.module.css";

const ICONS: Record<ContactIcon, LucideIcon> = {
  mail: Mail,
  phone: Phone,
  map: MapPin,
  clock: Clock,
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
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "sending";
type Values = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  website: string; // honeypot
};
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMPTY: Values = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  website: "",
};

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email";
  if (v.message.trim().length < 10)
    e.message = "Please write at least 10 characters";
  return e;
}

export default function ContactPage({ data }: { data: ContactData }) {
  const { hero, info, social, form, faqs } = data;

  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const set =
    (key: keyof Values) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setValues((p) => ({ ...p, [key]: e.target.value }));
      if (key in errors) setErrors((p) => ({ ...p, [key]: undefined }));
    };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error("Please check the highlighted fields.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");

      setValues(EMPTY);
      toast.success(form.successTitle, {
        description: form.successText,
      });
    } catch {
      toast.error("Message not sent", {
        description: form.errorText,
      });
    } finally {
      setStatus("idle");
    }
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

      {/* ===== Info + Form ===== */}
      <section className={styles.main}>
        <div className={`${styles.container} ${styles.layout}`}>
          {/* Left: info */}
          <motion.aside
            className={styles.info}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <ul className={styles.infoList}>
              {info.map((item) => {
                const Icon = ICONS[item.icon];
                const body = (
                  <>
                    <span className={styles.iconBox}>
                      <Icon size={20} />
                    </span>
                    <span className={styles.infoText}>
                      <span className={styles.infoLabel}>{item.label}</span>
                      <span className={styles.infoValue}>{item.value}</span>
                      {item.note && (
                        <span className={styles.infoNote}>{item.note}</span>
                      )}
                    </span>
                  </>
                );
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a href={item.href} className={styles.infoCard}>
                        {body}
                      </a>
                    ) : (
                      <div className={styles.infoCard}>{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className={styles.social}>
              <span className={styles.infoLabel}>{data.socialLabel}</span>
              <ul className={styles.socialList}>
                {social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                    >
                      {s.label} <ArrowUpRight size={14} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>

          {/* Right: form */}
          <motion.div
            className={styles.formCard}
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <form onSubmit={onSubmit} noValidate>
              <h2 className={styles.formTitle}>{form.title}</h2>
              <p className={styles.formText}>{form.text}</p>

              <div className={styles.fields}>
                <div className={styles.field}>
                  <label htmlFor="c-name" className={styles.label}>
                    {form.labels.name}
                  </label>
                  <input
                    id="c-name"
                    type="text"
                    autoComplete="name"
                    className={`${styles.input} ${errors.name ? styles.invalid : ""}`}
                    placeholder={form.placeholders.name}
                    value={values.name}
                    onChange={set("name")}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "c-name-err" : undefined}
                  />
                  {errors.name && (
                    <span id="c-name-err" className={styles.error}>
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="c-email" className={styles.label}>
                    {form.labels.email}
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    autoComplete="email"
                    className={`${styles.input} ${errors.email ? styles.invalid : ""}`}
                    placeholder={form.placeholders.email}
                    value={values.email}
                    onChange={set("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "c-email-err" : undefined}
                  />
                  {errors.email && (
                    <span id="c-email-err" className={styles.error}>
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="c-phone" className={styles.label}>
                    {form.labels.phone}
                  </label>
                  <input
                    id="c-phone"
                    type="tel"
                    autoComplete="tel"
                    className={styles.input}
                    placeholder={form.placeholders.phone}
                    value={values.phone}
                    onChange={set("phone")}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="c-service" className={styles.label}>
                    {form.labels.service}
                  </label>
                  <div className={styles.selectWrap}>
                    <select
                      id="c-service"
                      className={`${styles.input} ${styles.select}`}
                      value={values.service}
                      onChange={set("service")}
                    >
                      <option value="">{form.placeholders.service}</option>
                      {form.services.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={18} className={styles.selectIcon} />
                  </div>
                </div>

                <div className={`${styles.field} ${styles.full}`}>
                  <label htmlFor="c-message" className={styles.label}>
                    {form.labels.message}
                  </label>
                  <textarea
                    id="c-message"
                    rows={5}
                    className={`${styles.input} ${styles.textarea} ${errors.message ? styles.invalid : ""}`}
                    placeholder={form.placeholders.message}
                    value={values.message}
                    onChange={set("message")}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "c-message-err" : undefined}
                  />
                  {errors.message && (
                    <span id="c-message-err" className={styles.error}>
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Honeypot: insaan ko nahi dikhta, bots bhar dete hain */}
                <div className={styles.hp} aria-hidden="true">
                  <label htmlFor="c-website">Website</label>
                  <input
                    id="c-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.website}
                    onChange={set("website")}
                  />
                </div>
              </div>

              <button
                type="submit"
                className={styles.submit}
                disabled={status === "sending"}
              >
                {status === "sending" ? form.sendingLabel : form.submitLabel}
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className={styles.section}>
        <div className={`${styles.container} ${styles.faqLayout}`}>
          <motion.header
            className={styles.faqHead}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              {data.faqHead.eyebrow}
            </p>
            <h2 className={styles.heading}>
              {data.faqHead.title}{" "}
              <span className={styles.accent}>{data.faqHead.accent}</span>
            </h2>
          </motion.header>

          <ul className={styles.faqList}>
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <motion.li
                  key={f.question}
                  className={`${styles.faq} ${open ? styles.faqOpen : ""}`}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                >
                  <button
                    type="button"
                    className={styles.faqBtn}
                    aria-expanded={open}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpenFaq(open ? null : i)}
                  >
                    <span>{f.question}</span>
                    <span className={styles.faqIcon}>
                      <Plus size={18} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`faq-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={styles.faqBody}
                      >
                        <p className={styles.faqAnswer}>{f.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}

