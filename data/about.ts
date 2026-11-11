import type { AboutData } from "@/types/about";

// Sab text, numbers aur images yahan se badlo. Component ko haath lagane ki zaroorat nahi.
export const aboutData: AboutData = {
  hero: {
    eyebrow: "About OSS Consulting",
    title: "One partner for every",
    accent: "business possibility.",
    description:
      "OSS Consulting is a one stop shop for business services. We bring consulting, technology, marketing and operational support together under one roof, so growing businesses never have to juggle multiple vendors.",
  },

  // Placeholder numbers: asli numbers se replace karo
  stats: [
    { value: 150, suffix: "+", label: "Projects delivered" },
    { value: 4, suffix: "", label: "Core practices" },
    { value: 98, suffix: "%", label: "Client satisfaction" },
    { value: 24, suffix: "/7", label: "Support coverage" },
  ],

  story: {
    eyebrow: "OUR STORY",
    title: "Built to remove the gaps between",
    accent: "strategy and execution.",
    paragraphs: [
      "OSS started with a simple observation: most businesses lose time and money moving between separate consultants, developers, marketers and operations teams, each with their own priorities.",
      "We built one team that covers all of it. From the first strategy conversation to the day-to-day running of your systems, the same people stay accountable for the result.",
    ],
    highlights: [
      "One team, one point of contact",
      "Practical advice, not theory",
      "Support that continues after launch",
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
        alt: "Team collaborating in a meeting",
      },
      {
        src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80",
        alt: "Modern office workspace",
      },
    ],
  },

  pillars: [
    {
      icon: "target",
      label: "MISSION",
      title: "Make business growth simple",
      text: "To give businesses of every size one reliable partner for the services they need to move forward, delivered with clarity and accountability.",
    },
    {
      icon: "eye",
      label: "VISION",
      title: "The most trusted business partner",
      text: "To be the first name companies think of when they want strategy, technology, growth and operations handled well and handled together.",
    },
  ],

  valuesHead: {
    eyebrow: "OUR VALUES",
    title: "The principles we",
    accent: "work by.",
    description:
      "These are the standards our team holds itself to on every project, big or small.",
  },
  values: [
    {
      icon: "shield",
      title: "Integrity",
      text: "Honest advice and transparent pricing, even when it is not the easy answer.",
    },
    {
      icon: "lightbulb",
      title: "Innovation",
      text: "We use modern tools and fresh thinking to solve problems properly.",
    },
    {
      icon: "users",
      title: "Partnership",
      text: "We work as an extension of your team, not as an outside vendor.",
    },
    {
      icon: "rocket",
      title: "Results",
      text: "Every decision is measured by the outcome it creates for your business.",
    },
  ],

};
