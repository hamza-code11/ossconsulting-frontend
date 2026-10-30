export type ContactIcon = "mail" | "phone" | "map" | "clock";

export interface ContactHero {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
}

export interface ContactInfoItem {
  icon: ContactIcon;
  label: string;
  value: string;
  note?: string;
  href?: string;
}

export interface SocialLink {
  label: string;
  href: string;
}
 
export interface ContactFormConfig {
  title: string;
  text: string;
  labels: {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
  };
  placeholders: {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
  };
  services: string[];
  submitLabel: string;
  sendingLabel: string;
  successTitle: string;
  successText: string;
  successReset: string;
  errorText: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}


export interface ContactData {
  hero: ContactHero;
  info: ContactInfoItem[];
  socialLabel: string;
  social: SocialLink[];
  form: ContactFormConfig;
  faqHead: { eyebrow: string; title: string; accent: string };
  faqs: FaqItem[];
}
