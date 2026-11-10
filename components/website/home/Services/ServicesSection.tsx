"use client";

import {
  ArrowUpRight,
  Briefcase,
  Building2,
  Camera,
  Code2,
  Compass,
  Database,
  Globe,
  GraduationCap,
  Headset,
  Megaphone,
  Palette,
  PenTool,
  SearchCheck,
  Settings2,
  Share2,
  Smartphone,
  Wind,
  Workflow,
  Calculator,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { servicesData } from "@/data/services";
import type { ServiceIcon } from "@/types/services";
import styles from "./ServicesSection.module.css";

const ICONS: Record<ServiceIcon, LucideIcon> = {
  compass: Compass,
  code: Code2,
  megaphone: Megaphone,
  settings: Settings2,
  briefcase: Briefcase,
  workflow: Workflow,
  graduation: GraduationCap,
  building: Building2,
  globe: Globe,
  smartphone: Smartphone,
  database: Database,
  camera: Camera,
  share: Share2,
  search: SearchCheck,
  pen: PenTool,
  palette: Palette,
  headset: Headset,
  wind: Wind,
  calculator: Calculator,
};

// Sab data data/services.ts se aata hai
const { services, categories } = servicesData;
const labelOf = Object.fromEntries(categories.map((c) => [c.id, c.label]));

export default function ServicesSection() {
  const infiniteServices = [...services, ...services];

  return (
    <section id="services" className={styles.section} aria-labelledby="services-heading">
      <div className={styles.container}>
        
        {/* Header Row */}
        <header className={styles.header}>
          <div className={styles.headingLeft}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              OUR SERVICES
            </p>
            <h2 id="services-heading" className={styles.title}>
              Everything Your Business Needs, <em>Connected</em>.
            </h2>
          </div>
          
          <a href="/services" className={styles.viewAllBtn}>
            View All Services <ArrowUpRight size={16} />
          </a>
        </header>
      </div>

      {/* Infinite Scrolling Marquee */}
      <div className={styles.marqueeWrapper}>
        <div className={styles.marquee}>
          {infiniteServices.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <div key={`${service.id}-${i}`} className={styles.card}>
                
                {/* Full Card Background Image */}
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  fill 
                  className={styles.cardImage}
                  sizes="(max-width: 768px) 280px, 320px"
                />
                
                {/* Dark Gradient Overlay for Text Readability */}
                <div className={styles.imageOverlay} />

                {/* Top Icons */}
                <div className={styles.cardTop}>
                  <span className={styles.icon} aria-hidden="true">
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <ArrowUpRight className={styles.arrow} size={20} aria-hidden="true" />
                </div>

                {/* Bottom Content */}
                <div className={styles.cardContent}>
                  <div className={styles.cardMeta}>
                    <span className={styles.number}>{String((i % services.length) + 1).padStart(2, "0")}</span>
                    <span className={styles.tag}>{labelOf[service.category]}</span>
                  </div>
                  <h3 className={styles.name}>{service.title}</h3>
                  <p className={styles.description}>{service.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
