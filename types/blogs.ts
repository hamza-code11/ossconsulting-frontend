export interface BlogsHero {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
}

export interface BlogCategory {
  id: string;
  label: string;
}

/** Article ke andar ke blocks. Data me jis tarah likhoge, usi tarah page par dikhenge. */
export type BlogBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string; cite?: string };

export interface BlogPost {
  slug: string;
  category: string; // BlogCategory.id
  title: string;
  excerpt: string;
  image: string; // image URL ya /public ka path
  date: string; // ISO format: "2026-10-20"
  featured?: boolean;
  content: BlogBlock[];
}

export interface BlogsData {
  hero: BlogsHero;
  author: string; // sab posts ka author
  allLabel: string;
  featuredLabel: string;
  readMoreLabel: string;
  backLabel: string;
  moreLabel: string;
  searchPlaceholder: string;
  emptyTitle: string;
  emptyText: string;
  emptyReset: string;
  categories: BlogCategory[];
  posts: BlogPost[];
}
