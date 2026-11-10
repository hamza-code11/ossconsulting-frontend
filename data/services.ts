import type { ServicesData } from "@/types/services";

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

// Services, text aur images yahan se badlo. Component ko haath lagane ki zaroorat nahi.
export const servicesData: ServicesData = {
  hero: {
    eyebrow: "OUR SERVICES",
    title: "Every service your business needs,",
    accent: "under one roof.",
    description:
      "From strategy and software to marketing and day-to-day operations, OSS brings everything together so you work with one partner instead of many.",
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
      id: "business-consultancy",
      category: "consulting",
      icon: "briefcase",
      image: img("photo-1557804506-669a67965ba0"),
      title: "Business Consultancy",
      text: "Clear direction for where your business should go and how to get there.",
      features: ["Growth planning", "Business model review", "Goal and KPI setting"],
    },
    {
      id: "process-improvements",
      category: "consulting",
      icon: "workflow",
      image: img("photo-1552664730-d307ca884978"),
      title: "Business Process Improvements",
      text: "Find where your teams lose time and money, and fix it.",
      features: ["Workflow review", "Cost and risk analysis", "Improvement plan"],
    },
    {
      id: "trainings",
      category: "consulting",
      icon: "graduation",
      image: img("photo-1524178232363-1fb2b075b655"),
      title: "Trainings",
      text: "Practical training that builds skills and confidence across your teams.",
      features: ["Corporate workshops", "Skill development", "Custom programs"],
    },

    // ===== Technology =====
    {
      id: "enterprise-solutions",
      category: "technology",
      icon: "building",
      image: img("photo-1497366216548-37526070297c"),
      title: "Enterprise Solutions",
      text: "Scalable systems that connect and run large, complex organisations.",
      features: ["Custom software", "System integration", "Cloud and security"],
    },
    {
      id: "web-development",
      category: "technology",
      icon: "globe",
      image: img("photo-1498050108023-c5249f4df085"),
      title: "Web Development",
      text: "Fast, secure websites and web platforms built to convert and scale.",
      features: ["Business websites", "Web portals and dashboards", "E-commerce"],
    },
    {
      id: "mobile-app-development",
      category: "technology",
      icon: "smartphone",
      image: img("photo-1512941937669-90a1b58e7e9c"),
      title: "Mobile App Development",
      text: "Smooth iOS and Android apps designed around your users.",
      features: ["iOS and Android", "Cross-platform apps", "App maintenance"],
    },
    {
      id: "crm-solutions",
      category: "technology",
      icon: "database",
      image: img("photo-1551288049-bebda4e38f71"),
      title: "CRM Solutions",
      text: "Keep every customer, lead and conversation organised in one place.",
      features: ["CRM setup", "Sales pipeline tracking", "Automation and reports"],
    },
    {
      id: "camera-monitoring",
      category: "technology",
      icon: "camera",
      image: img("photo-1557597774-9d273605dfa9"),
      title: "Camera Monitoring",
      text: "Reliable surveillance that keeps your premises secure around the clock.",
      features: ["Remote live viewing", "Maintenance and support"],
    },

    // ===== Growth =====
    {
      id: "digital-marketing",
      category: "growth",
      icon: "megaphone",
      image: img("photo-1460925895917-afdab827c52f"),
      title: "Digital Marketing",
      text: "Campaigns that put your business in front of the right people.",
      features: ["Paid advertising", "Email campaigns", "Conversion tracking"],
    },
    {
      id: "social-media-management",
      category: "growth",
      icon: "share",
      image: img("photo-1611162617213-7d7a39e9b1d7"),
      title: "Social Media Management",
      text: "Consistent, engaging social presence that grows your audience.",
      features: ["Content calendar", "Community management", "Performance reports"],
    },
    {
      id: "seo",
      category: "growth",
      icon: "search",
      image: img("photo-1432888498266-38ffec3eaf0a"),
      title: "Search Engine Optimization (SEO)",
      text: "Rank higher and be found by customers already searching for you.",
      features: ["Technical SEO", "Keyword strategy", "Local search"],
    },
    {
      id: "content-writing",
      category: "growth",
      icon: "pen",
      image: img("photo-1455390582262-044cdead277a"),
      title: "Content Writing",
      text: "Clear, persuasive copy for your website, blog and campaigns.",
      features: ["Website copy", "Blogs and articles", "Product descriptions"],
    },
    {
      id: "branding-creative",
      category: "growth",
      icon: "palette",
      image: img("photo-1561070791-2526d30994b5"),
      title: "Branding and Creative",
      text: "A brand that looks professional and is easy to remember.",
      features: ["Logo and visual identity", "Brand guidelines", "Marketing creatives"],
    },

    // ===== Operations =====
    {
      id: "customer-services",
      category: "operations",
      icon: "headset",
      image: img("photo-1556745757-8d76bdb6984b"),
      title: "Customer Services",
      text: "A dedicated team that looks after your customers day to day.",
      features: ["Helpdesk support", "Call and chat handling", "Quality monitoring"],
    },
    {
      id: "hvac-duct-cleaning",
      category: "operations",
      icon: "wind",
      image: img("photo-1621905251189-08b45d6a269e"),
      title: "HVAC Duct Cleaning",
      text: "Professional duct cleaning for healthier air and efficient cooling.",
      features: ["Full duct inspection", "Deep cleaning and sanitising", "Residential and commercial"],
    },
    {
      id: "accounting",
      category: "operations",
      icon: "calculator",
      image: img("photo-1554224155-6726b3ff858f"),
      title: "Accounting Services",
      text: "Comprehensive accounting solutions to help businesses manage financial records, track expenses and maintain accurate financial reporting.",
      features: [
        "Bookkeeping and financial records",
        "Financial reporting",
        "Accounts management",
      ],
    },
    // ===== Technology =====
    {
      id: "ai-ml-chatbots",
      category: "technology",
      icon: "code",
      image: img("photo-1677442136019-21780ecad995"),
      title: "AI/ML & Chatbots",
      text: "Creating intelligent AI and machine learning solutions that automate workflows and enhance customer interactions.",
      features: [
        "Intelligent Chatbot Solutions",
        "Predictive Business Intelligence",
        "AI-Powered Automation",
      ],
    },
    {
      id: "web-based-software",
      category: "technology",
      icon: "database",
      image: img("photo-1461749280684-dccba630e2f6"),
      title: "Web-Based Software",
      text: "Scalable software solutions designed to handle complex business logic with intuitive and user-friendly interfaces.",
      features: [
        "SaaS Products",
        "Custom Dashboards",
        "ERP Systems",
      ],
    },
    {
      id: "ui-ux-design",
      category: "technology",
      icon: "palette",
      image: img("photo-1586717791821-3f44a563fa4c"),
      title: "UI/UX Design",
      text: "User-centered interface designs that create intuitive digital experiences and improve user engagement.",
      features: [
        "Wireframing",
        "Prototyping",
        "Usability Testing",
      ],
    },

    // ===== Growth =====
    {
      id: "graphic-designing",
      category: "growth",
      icon: "palette",
      image: img("photo-1626785774573-4b799315345d"),
      title: "Graphic Designing",
      text: "Creative visual content that tells your brand story and creates lasting impressions with your target audience.",
      features: [
        "Logo Design",
        "Brand Identity",
        "Social Media Graphics",
      ],
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