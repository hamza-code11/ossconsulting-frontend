"use client";

import { useState } from "react";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { contactData } from "@/data/contact";
import styles from "./ContactCTA.module.css";

// Email, phone aur office data/contact.ts ke `info` se aate hain
const contactItems = [
  { key: "mail", Icon: Mail },
  { key: "phone", Icon: Phone },
  { key: "map", Icon: MapPin },
]
  .map(({ key, Icon }) => {
    const item = contactData.info.find((i) => i.icon === key);
    return item ? { Icon, value: item.value, href: item.href } : null;
  })
  .filter((x): x is NonNullable<typeof x> => x !== null);

const { form } = contactData;

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  website: "", // honeypot
};

export default function ContactCTA() {
  const [formData, setFormData] = useState(EMPTY);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Request failed");

      setFormData(EMPTY);
      toast.success(form.successTitle, {
        description: form.successText,
      });
    } catch {
      toast.error("Message not sent", {
        description: form.errorText,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={styles.section}>
      {/* Background Layers */}
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.container}>
        {/* Left Side: Editorial Content */}
        <div className={styles.content}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            START A CONVERSATION
          </div>

          <h2 className={styles.title}>
            Let's Discuss Your <br />
            <span className={styles.titleAccent}>Business Needs.</span>
          </h2>

          <p className={styles.description}>
            Whatever stage your business is at, OSS Consulting can help you
            explore the services and solutions that fit your needs. One partner,
            every business possibility.
          </p>

          {/* Minimal Contact Info (data/contact.ts se) */}
          <div className={styles.contactInfo}>
            {contactItems.map(({ Icon, value, href }) => (
              <div key={value} className={styles.contactRow}>
                <Icon size={18} className={styles.contactIcon} />
                {href ? <a href={href}>{value}</a> : <span>{value}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Overlapping Form Card */}
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h3 className={styles.formTitle}>Project Inquiry</h3>
            <p className={styles.formSubtitle}>
              Fill out the form below and our team will reach out.
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="cta-name" className={styles.label}>
                  Your Name
                </label>
                <input
                  id="cta-name"
                  type="text"
                  name="name"
                  required
                  minLength={2}
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="John Doe"
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="cta-email" className={styles.label}>
                  Email Address
                </label>
                <input
                  id="cta-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="cta-phone" className={styles.label}>
                  Phone Number
                </label>
                <input
                  id="cta-phone"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder={form.placeholders.phone}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="cta-service" className={styles.label}>
                  Service of Interest
                </label>
                <select
                  id="cta-service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="" disabled>
                    Select a service...
                  </option>
                  {form.services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="cta-message" className={styles.label}>
                Tell us about your project
              </label>
              <textarea
                id="cta-message"
                name="message"
                required
                minLength={10}
                rows={3}
                value={formData.message}
                onChange={handleChange}
                className={styles.textarea}
                placeholder="Briefly describe your goals..."
              />
            </div>

            {/* Honeypot: insaan ko nahi dikhta, bots bhar dete hain */}
            <div className={styles.hp} aria-hidden="true">
              <label htmlFor="cta-website">Website</label>
              <input
                id="cta-website"
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitBtn}
            >
              {isSubmitting ? "Sending..." : "Submit Inquiry"}
              {!isSubmitting && <ArrowRight size={18} />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}