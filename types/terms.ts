export type TermsBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export interface TermsSection {
  id: string; // URL anchor: chhote lowercase words aur "-"
  title: string;
  blocks: TermsBlock[];
}

export interface TermsData {
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
  };
  updatedLabel: string;
  lastUpdated: string; // ISO format: "2026-10-31"
  contentsLabel: string;
  sections: TermsSection[];
  contact: {
    title: string;
    text: string;
    buttonLabel: string;
  };
}
