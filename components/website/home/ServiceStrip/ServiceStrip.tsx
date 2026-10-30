import { Briefcase, Cpu, TrendingUp, Settings } from "lucide-react";
import styles from "./ServiceStrip.module.css";

const services = [
  {
    id: "01",
    title: "Business Consulting",
    subtitle: "Strategy & structure",
    icon: <Briefcase size={22} strokeWidth={1.5} />,
  },
  {
    id: "02",
    title: "Technology Solutions",
    subtitle: "Systems & software",
    icon: <Cpu size={22} strokeWidth={1.5} />,
  },
  {
    id: "03",
    title: "Digital Growth",
    subtitle: "Marketing & brand",
    icon: <TrendingUp size={22} strokeWidth={1.5} />,
  },
  {
    id: "04",
    title: "Operational Support",
    subtitle: "Facility & service",
    icon: <Settings size={22} strokeWidth={1.5} />,
  },
];

export default function ServiceStrip() {
  return (
    <section className={styles.stripSection}>
      <div className={styles.container}>
        {services.map((service, index) => (
          <div key={service.id} className={styles.serviceItem}>
            {/* Icon Box */}
            <div className={styles.iconBox}>{service.icon}</div>
            
            {/* Text Content */}
            <div className={styles.textContent}>
              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.subtitle}>{service.subtitle}</p>
            </div>

            {/* Number (Right Aligned) */}
            <span className={styles.number}>{service.id}</span>

            {/* Vertical Divider (Sirf last item ke ilawa) */}
            {index !== services.length - 1 && (
              <div className={styles.divider} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
