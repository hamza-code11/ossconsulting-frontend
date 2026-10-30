import type { ServicesData } from "@/types/services";

// Services, text aur links yahan se badlo. Component ko haath lagane ki zaroorat nahi.
export const servicesData: ServicesData = {
  hero: {
    eyebrow: "OUR SERVICES",
    title: "Every service your business needs,",
    accent: "under one roof.",
    description:
      "From strategy and software to marketing and day-to-day operations, OSS brings four practices together so you work with one partner instead of many.",
  },

  allLabel: "All services",

  categories: [
    { id: "consulting", label: "Consulting", icon: "compass" },
    { id: "technology", label: "Technology", icon: "code" },
    { id: "growth", label: "Growth", icon: "megaphone" },
    { id: "operations", label: "Operations", icon: "settings" },
  ],

  services: [
    // ===== Consulting =====
    {
      id: "business-strategy",
      category: "consulting",
      icon: "briefcase",
      title: "Business Strategy",
      text: "Clear direction for where your business should go and how to get there.",
      features: ["Growth planning", "Business model review", "Goal and KPI setting"],
    },
    {
      id: "market-research",
      category: "consulting",
      icon: "search",
      title: "Market Research",
      text: "Real data on your customers, competitors and market opportunities.",
      features: ["Competitor analysis", "Customer insights", "Opportunity mapping"],
    },
    {
      id: "process-audit",
      category: "consulting",
      icon: "trending",
      title: "Process Audit",
      text: "Find where your teams lose time and money, and fix it.",
      features: ["Workflow review", "Cost and risk analysis", "Improvement plan"],
    },
    {
      id: "digital-roadmap",
      category: "consulting",
      icon: "map",
      title: "Digital Roadmap",
      text: "A prioritised plan for the technology your business should adopt next.",
      features: ["Tech assessment", "Phased roadmap", "Budget planning"],
    },

    // ===== Technology =====
    {
      id: "web-development",
      category: "technology",
      icon: "globe",
      title: "Web Development",
      text: "Fast, secure websites and web platforms built to convert and scale.",
      features: ["Business websites", "Web portals and dashboards", "E-commerce"],
    },
    {
      id: "mobile-apps",
      category: "technology",
      icon: "smartphone",
      title: "Mobile Apps",
      text: "Smooth iOS and Android apps designed around your users.",
      features: ["iOS and Android", "Cross-platform apps", "App maintenance"],
    },
    {
      id: "cloud-security",
      category: "technology",
      icon: "cloud",
      title: "Cloud and Security",
      text: "Reliable infrastructure that stays fast, available and protected.",
      features: ["Cloud setup and migration", "Security hardening", "Backup and recovery"],
    },
    {
      id: "system-integration",
      category: "technology",
      icon: "plug",
      title: "System Integration",
      text: "Connect your tools so data flows without manual work.",
      features: ["API development", "Third-party integrations", "Custom software"],
    },

    // ===== Growth =====
    {
      id: "brand-identity",
      category: "growth",
      icon: "palette",
      title: "Brand Identity",
      text: "A brand that looks professional and is easy to remember.",
      features: ["Logo and visual identity", "Brand guidelines", "Positioning and messaging"],
    },
    {
      id: "digital-marketing",
      category: "growth",
      icon: "megaphone",
      title: "Digital Marketing",
      text: "Campaigns that put your business in front of the right people.",
      features: ["Social media", "Paid advertising", "Content creation"],
    },
    {
      id: "seo",
      category: "growth",
      icon: "target",
      title: "SEO and Visibility",
      text: "Rank higher and be found by customers already searching for you.",
      features: ["Technical SEO", "Keyword strategy", "Local search"],
    },
    {
      id: "lead-generation",
      category: "growth",
      icon: "mail",
      title: "Lead Generation",
      text: "A steady flow of qualified leads with tracking you can trust.",
      features: ["Email campaigns", "Landing pages", "Conversion tracking"],
    },

    // ===== Operations =====
    {
      id: "process-automation",
      category: "operations",
      icon: "workflow",
      title: "Process Automation",
      text: "Replace repetitive manual tasks with reliable automated workflows.",
      features: ["Workflow automation", "Document handling", "Approval flows"],
    },
    {
      id: "managed-support",
      category: "operations",
      icon: "headset",
      title: "Managed Support",
      text: "A dedicated team that keeps your systems running day to day.",
      features: ["Helpdesk support", "Monitoring", "Maintenance and updates"],
    },
    {
      id: "reporting",
      category: "operations",
      icon: "chart",
      title: "Reporting and Insights",
      text: "Dashboards that turn your business data into clear decisions.",
      features: ["Custom dashboards", "Performance reports", "Data analysis"],
    },
    {
      id: "compliance",
      category: "operations",
      icon: "shield",
      title: "Compliance and Risk",
      text: "Keep your operations safe, documented and audit-ready.",
      features: ["Policy documentation", "Risk assessment", "Access control"],
    },
  ],

  deliveryHead: {
    eyebrow: "HOW WE DELIVER",
    title: "A simple process,",
    accent: "every time.",
  },
  delivery: [
    { title: "Discover", text: "We learn your business and agree on clear goals." },
    { title: "Plan", text: "We shape scope, timeline and budget before starting." },
    { title: "Deliver", text: "We build and launch, with regular progress updates." },
    { title: "Support", text: "We stay involved to keep results improving." },
  ],

};
