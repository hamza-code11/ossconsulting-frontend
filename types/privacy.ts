export type PrivacyBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export interface PrivacySection {
  id: string; // URL anchor: chhote lowercase words aur "-"
  title: string;
  blocks: PrivacyBlock[];
}

export interface PrivacyData {
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
  };
  updatedLabel: string;
  lastUpdated: string; // ISO format: "2026-10-31"
  contentsLabel: string;
  sections: PrivacySection[];
  contact: {
    title: string;
    text: string;
    buttonLabel: string;
  };
}
