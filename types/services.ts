export type ServiceIcon =
  | "compass"
  | "code"
  | "megaphone"
  | "settings"
  | "briefcase"
  | "trending"
  | "search"
  | "map"
  | "globe"
  | "smartphone"
  | "cloud"
  | "plug"
  | "palette"
  | "mail"
  | "target"
  | "workflow"
  | "headset"
  | "chart"
  | "shield";

export interface ServicesHero {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
}

export interface ServiceCategory {
  id: string;
  label: string;
  icon: ServiceIcon;
}

export interface ServiceItem {
  id: string;
  category: string; // ServiceCategory.id
  icon: ServiceIcon;
  title: string;
  text: string;
  features: string[];
}

export interface DeliveryStep {
  title: string;
  text: string;
}


export interface ServicesData {
  hero: ServicesHero;
  allLabel: string;
  categories: ServiceCategory[];
  services: ServiceItem[];
  deliveryHead: { eyebrow: string; title: string; accent: string };
  delivery: DeliveryStep[];
}
