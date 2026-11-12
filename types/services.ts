export type ServiceIcon =
  | "compass"
  | "code"
  | "megaphone"
  | "settings"
  | "briefcase"
  | "workflow"
  | "graduation"
  | "building"
  | "globe"
  | "smartphone"
  | "database"
  | "camera"
  | "share"
  | "search"
  | "pen"
  | "palette"
  | "headset"
  | "wind"
  | "monitor-cog"
  | "clipboard-list"
  | "calculator";

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
  image: string; // image URL ya /public ka path
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