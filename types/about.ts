export type AboutIcon =
  | "target"
  | "eye"
  | "shield"
  | "lightbulb"
  | "users"
  | "rocket"
  | "compass"
  | "code"
  | "megaphone"
  | "settings";

export interface AboutHeroData {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
}

export interface AboutStat {
  value: number;
  suffix: string;
  label: string;
}

export interface AboutStory {
  eyebrow: string;
  title: string;
  accent: string;
  paragraphs: string[];
  highlights: string[];
  images: { src: string; alt: string }[];
}

export interface AboutPillar {
  icon: AboutIcon;
  label: string;
  title: string;
  text: string;
}

export interface AboutValue {
  icon: AboutIcon;
  title: string;
  text: string;
}

export interface AboutPractice {
  icon: AboutIcon;
  tag: string;
  title: string;
  text: string;
}


export interface AboutSectionHead {
  eyebrow: string;
  title: string;
  accent: string;
  description?: string;
}

export interface AboutData {
  hero: AboutHeroData;
  stats: AboutStat[];
  story: AboutStory;
  pillars: AboutPillar[];
  valuesHead: AboutSectionHead;
  values: AboutValue[];
}
