"use client";

import { motion, type Variants } from "framer-motion"; 
import { Layers, Workflow, Target, LifeBuoy } from "lucide-react";
import styles from "./WhyChooseUs.module.css";

const features = [
  {
    id: "01",
    title: "Diverse Expertise",
    description: "Access multiple business services through one partner, eliminating the need to manage multiple vendors.",
    icon: Layers,
  },
  {
    id: "02",
    title: "Connected Solutions",
    description: "Bring technology, marketing, and business operations together for a unified strategy and seamless execution.",
    icon: Workflow,
  },
  {
    id: "03",
    title: "Business-Focused Approach",
    description: "Solutions are shaped around your specific objectives and requirements, ensuring every effort drives measurable value.",
    icon: Target,
  },
  {
    id: "04",
    title: "Ongoing Support",
    description: "We don't just deliver and leave. We continue supporting your business needs as they evolve and scale.",
    icon: LifeBuoy,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }, // 'as const' lagaya
  },
};

export default function WhyChooseUs() {
  return (
    <section id="why-us" className={styles.section}>
      <div className={styles.container}>
        
        {/* Section Heading */}
        <div className={styles.header}>
          <div className={styles.headingLeft}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              WHY CHOOSE OSS
            </p>
            <h2 className={styles.title}>
              Different Business Needs. <br />
              <em>One Reliable</em> Partner.
            </h2>
          </div>
        </div>

        {/* Features Grid */}
        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.id} className={styles.card} variants={itemVariants}>
                <div className={styles.cardTop}>
                  <div className={styles.iconWrapper}>
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <span className={styles.number}>{feature.id}</span>
                </div>
                
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDescription}>{feature.description}</p>
                
                {/* Decorative line */}
                <div className={styles.cardLine} />
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
