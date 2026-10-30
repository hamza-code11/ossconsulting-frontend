"use client";

import {
  ArrowUpRight,
  Briefcase,
  Building2,
  Globe,
  GraduationCap,
  Headset,
  Megaphone,
  Palette,
  PenLine,
  Search,
  Share2,
  Smartphone,
  Users,
  Video,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import styles from "./ServicesSection.module.css";

interface Service {
  name: string;
  description: string;
  image: string;
  icon: LucideIcon;
  category: string;
}

const services: Service[] = [
  { name: "Enterprise Solutions", description: "Scalable infrastructure for growing organizations.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop", icon: Building2, category: "Business" },
  { name: "Business Consultancy", description: "Strategic guidance to navigate complex challenges.", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=600&auto=format&fit=crop", icon: Briefcase, category: "Business" },
  { name: "Process Improvements", description: "Optimize workflows and increase operational efficiency.", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop", icon: Workflow, category: "Business" },
  { name: "Trainings", description: "Empower your team with expert-led skill development.", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop", icon: GraduationCap, category: "Business" },
  { name: "Customer Services", description: "Build lasting relationships with dedicated support.", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop", icon: Headset, category: "Business" },
  { name: "Web Development", description: "High-performance websites tailored to your brand.", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop", icon: Globe, category: "Technology" },
  { name: "Mobile App Development", description: "Native and cross-platform apps for iOS and Android.", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop", icon: Smartphone, category: "Technology" },
  { name: "CRM Solutions", description: "Manage customer data and interactions seamlessly.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop", icon: Users, category: "Technology" },
  { name: "Digital Marketing", description: "Data-driven campaigns to accelerate your growth.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop", icon: Megaphone, category: "Marketing" },
  { name: "Content Writing", description: "Engaging copy that tells your brand's story.", image: "https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=600&auto=format&fit=crop", icon: PenLine, category: "Marketing" },
  { name: "Social Media Management", description: "Strategic social presence across all platforms.", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop", icon: Share2, category: "Marketing" },
  { name: "SEO Optimization", description: "Rank higher and drive organic traffic to your site.", image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=600&auto=format&fit=crop", icon: Search, category: "Marketing" },
  { name: "Branding & Creative", description: "Memorable visual identities and creative assets.", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop", icon: Palette, category: "Marketing" },
  { name: "Camera Monitoring", description: "Advanced security and surveillance systems.", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600&auto=format&fit=crop", icon: Video, category: "Facility" },
];

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
          
          <a href="#all-services" className={styles.viewAllBtn}>
            View All Services <ArrowUpRight size={16} />
          </a>
        </header>
      </div>

      {/* Infinite Scrolling Marquee */}
      <div className={styles.marqueeWrapper}>
        <div className={styles.marquee}>
          {infiniteServices.map(({ name, description, image, icon: Icon, category }, i) => (
            <div key={`${name}-${i}`} className={styles.card}>
              
              {/* Full Card Background Image */}
              <Image 
                src={image} 
                alt={name} 
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
                  <span className={styles.tag}>{category}</span>
                </div>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.description}>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
