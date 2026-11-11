import type { AboutData } from "@/types/about";

export const aboutData: AboutData = {
  hero: {
    eyebrow: "About OSS Consulting",
    title: "Your business. Our expertise.",
    accent: "One powerful partner.",
    description:
      "OSS Consulting provides comprehensive business solutions across the United States, combining professional security surveillance, advanced technology, digital marketing and financial management services.",
  },

  // Client ne numbers nahi diye. Inhe confirm karke replace karo.
  stats: [
    { value: 4, suffix: "", label: "Core service areas" },
    { value: 24, suffix: "/7", label: "Remote monitoring" },
    { value: 1, suffix: "", label: "Team for everything" },
    { value: 100, suffix: "%", label: "Client commitment" },
  ],

  story: {
    eyebrow: "OUR STORY",
    title: "Protect your business. Simplify your operations.",
    accent: "Accelerate your growth.",
    paragraphs: [
      "OSS Consulting is a US-based business solutions and technology company headquartered in Atlanta, Georgia, providing comprehensive services to businesses across the United States.",
      "From 24/7 remote camera monitoring to accounting, bookkeeping, payroll, taxation, web development and AI automation, we help businesses operate smarter and grow with confidence.",
      "Our professional team delivers practical solutions designed to help businesses improve efficiency, strengthen security, reduce operational complexity and achieve sustainable growth.",
      "With our US presence, dedicated team and international operational support, we provide reliable, scalable and cost-effective business solutions.",
    ],
    highlights: [
      "Comprehensive services under one roof",
      "Dedicated professional teams",
      "Customized business solutions",
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
      title: "Empower businesses",
      text: "To empower businesses through innovative technology, dependable security solutions and professional business support.",
    },
    {
      icon: "eye",
      label: "VISION",
      title: "A trusted partner, in the US and beyond",
      text: "To become a trusted business solutions partner for organizations across the United States and internationally.",
    },
  ],

  valuesHead: {
    eyebrow: "WHY CHOOSE US",
    title: "Why choose",
    accent: "OSS Consulting?",
    description:
      "One team that covers security, technology, growth and finance, built around what your business actually needs.",
  },
  values: [
    {
      icon: "settings",
      title: "Comprehensive services",
      text: "Comprehensive services under one roof.",
    },
    {
      icon: "users",
      title: "Dedicated teams",
      text: "Dedicated professional teams focused on your business.",
    },
    {
      icon: "compass",
      title: "Customized solutions",
      text: "Customized business solutions shaped around your needs.",
    },
    {
      icon: "target",
      title: "Cost-effective packages",
      text: "Cost-effective service packages for businesses of every size.",
    },
    {
      icon: "rocket",
      title: "Technology-driven",
      text: "Technology-driven operations that improve efficiency.",
    },
    {
      icon: "shield",
      title: "Quality commitment",
      text: "Commitment to quality and client satisfaction.",
    },
  ],
};