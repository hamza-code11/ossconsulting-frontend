"use client";

import { useState } from "react";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
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

export default function ContactCTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", service: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    }, 1500);
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
            Whatever stage your business is at, OSS Consulting can help you explore 
            the services and solutions that fit your needs. One partner, every 
            business possibility.
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
            <p className={styles.formSubtitle}>Fill out the form below and our team will reach out.</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Your Name</label>
                <input 
                  type="text" name="name" required 
                  value={formData.name} onChange={handleChange} 
                  className={styles.input} placeholder="John Doe" 
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Email Address</label>
                <input 
                  type="email" name="email" required 
                  value={formData.email} onChange={handleChange} 
                  className={styles.input} placeholder="john@company.com" 
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Service of Interest</label>
              <select 
                name="service" required 
                value={formData.service} onChange={handleChange} 
                className={styles.select}
              >
                <option value="" disabled>Select a service...</option>
                <option value="Business">Business Consulting</option>
                <option value="Technology">Technology</option>
                <option value="Marketing">Marketing and Growth</option>
                <option value="support">Operational Support</option> 
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Tell us about your project</label>
              <textarea 
                name="message" required rows={3}
                value={formData.message} onChange={handleChange} 
                className={styles.textarea} placeholder="Briefly describe your goals..."
              />
            </div>

            <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
              {isSubmitting ? "Sending..." : submitted ? "Inquiry Sent!" : "Submit Inquiry"}
              {!isSubmitting && !submitted && <ArrowRight size={18} />}
            </button>
            
            {submitted && (
              <p className={styles.successMsg}>Thank you! Our team will contact you shortly.</p>
            )}
          </form>
        </div>

      </div>
    </section>
  );
}
