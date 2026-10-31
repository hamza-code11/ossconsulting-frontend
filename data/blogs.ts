import type { BlogsData } from "@/types/blogs";

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

// Posts, text aur images yahan se badlo. Component ko haath lagane ki zaroorat nahi.
//
// Nayi post add karne ke liye posts me ek object copy karo, slug unique rakho.
// content me blocks likho:
//   { type: "heading",   text: "..." }
//   { type: "paragraph", text: "..." }
//   { type: "list",      items: ["...", "..."], ordered: true }   // ordered optional
//   { type: "quote",     text: "...", cite: "..." }               // cite optional
export const blogsData: BlogsData = {
  hero: {
    eyebrow: "BLOG",
    title: "Ideas and insights for",
    accent: "growing businesses.",
    description:
      "Practical articles on strategy, technology, marketing and operations from the OSS team.",
  },

  author: "OSS Consulting",

  allLabel: "All articles",
  featuredLabel: "FEATURED",
  readMoreLabel: "Read article",
  backLabel: "Back to all articles",
  moreLabel: "More articles",
  searchPlaceholder: "Search articles...",
  emptyTitle: "No articles found",
  emptyText: "Try a different keyword or choose another category.",
  emptyReset: "Clear filters",

  categories: [
    { id: "business", label: "Business" },
    { id: "technology", label: "Technology" },
    { id: "marketing", label: "Marketing" },
    { id: "operations", label: "Operations" },
  ],

  // Placeholder posts: asli articles se replace karo
  posts: [
    {
      slug: "why-one-partner-beats-many-vendors",
      category: "business",
      title: "Why one partner beats juggling many vendors",
      excerpt:
        "Separate consultants, developers and marketers each work to their own priorities. Here is what changes when one team owns the whole result.",
      image: img("photo-1522071820081-009f0129c71c"),
      date: "2026-10-22",
      featured: true,
      content: [
        {
          type: "paragraph",
          text: "Most growing businesses end up with a consultant for strategy, a freelancer for the website, an agency for marketing and someone else for day-to-day support. Each one is good at their job, but nobody owns the full result.",
        },
        { type: "heading", text: "The hidden cost of handoffs" },
        {
          type: "paragraph",
          text: "Every time work moves between vendors, context is lost. Goals get re-explained, decisions are repeated and small gaps turn into delays. The cost rarely shows up on an invoice, but you pay for it in time and missed opportunities.",
        },
        {
          type: "list",
          items: [
            "Strategy that never reaches the people building the product",
            "Marketing that promises what the software cannot yet do",
            "Support teams that learn about changes after customers do",
          ],
        },
        { type: "heading", text: "What changes with one team" },
        {
          type: "paragraph",
          text: "When one team handles consulting, technology, growth and operations, the same people stay accountable from the first conversation to the day-to-day running of your systems. Decisions are faster and nothing falls between the cracks.",
        },
        {
          type: "quote",
          text: "The best partnerships feel like an extension of your own team, not an outside vendor.",
          cite: "OSS Consulting",
        },
        { type: "heading", text: "How to decide" },
        {
          type: "paragraph",
          text: "If you are managing more than two vendors for one business goal, it is worth asking whether a single partner could cover it. Start with one project, measure the result, and expand from there.",
        },
      ],
    },
    {
      slug: "choosing-the-right-crm-for-your-sme",
      category: "technology",
      title: "Choosing the right CRM for your SME",
      excerpt:
        "A CRM only helps if your team actually uses it. A simple checklist for picking one that fits your sales process.",
      image: img("photo-1551288049-bebda4e38f71"),
      date: "2026-10-12",
      content: [
        {
          type: "paragraph",
          text: "A CRM can be the backbone of your sales process or an expensive spreadsheet nobody opens. The difference is almost always how well it fits the way your team already works.",
        },
        { type: "heading", text: "Start with your process, not features" },
        {
          type: "paragraph",
          text: "Before comparing tools, write down how a lead becomes a customer in your business. Every stage, every handoff. The right CRM should mirror that flow with as little extra effort as possible.",
        },
        { type: "heading", text: "A simple checklist" },
        {
          type: "list",
          ordered: true,
          items: [
            "Can your team learn it in a day, without long training?",
            "Does it connect with your email, website forms and accounting tools?",
            "Can you see your pipeline and follow-ups at a glance?",
            "Will the price still make sense when your team doubles?",
          ],
        },
        { type: "heading", text: "Plan the rollout" },
        {
          type: "paragraph",
          text: "Import clean data, start with one team and agree on a few simple rules for updating records. Adoption matters more than the number of features you switch on.",
        },
      ],
    },
    {
      slug: "seo-basics-every-business-owner-should-know",
      category: "marketing",
      title: "SEO basics every business owner should know",
      excerpt:
        "You do not need to be technical to understand how customers find you on Google. Start with these fundamentals.",
      image: img("photo-1432888498266-38ffec3eaf0a"),
      date: "2026-09-30",
      content: [
        {
          type: "paragraph",
          text: "Search engine optimization sounds technical, but the idea is simple: make it easy for people who are already searching for what you offer to find you.",
        },
        { type: "heading", text: "1. Know what your customers search for" },
        {
          type: "paragraph",
          text: "Think in your customers' words, not your own. A client may search for a specific problem long before they know the name of your service. Build pages around those questions.",
        },
        { type: "heading", text: "2. Get the basics of your site right" },
        {
          type: "list",
          items: [
            "Fast loading pages that work well on mobile",
            "Clear page titles and descriptions for every page",
            "One main topic per page, with helpful headings",
            "Secure connection (HTTPS) across the whole site",
          ],
        },
        { type: "heading", text: "3. Be useful and be consistent" },
        {
          type: "paragraph",
          text: "Search engines reward websites that genuinely answer questions. Publish helpful content regularly, keep your business details accurate online, and results build up over time.",
        },
      ],
    },
    {
      slug: "find-where-your-team-loses-time",
      category: "operations",
      title: "How to find where your team loses time",
      excerpt:
        "A short process audit often reveals hours of repeated manual work. Here is how to run one in a week.",
      image: img("photo-1552664730-d307ca884978"),
      date: "2026-09-18",
      content: [
        {
          type: "paragraph",
          text: "Most teams do not realise how much time goes into repeated manual work until someone writes it down. A short audit can uncover hours every week that can be saved.",
        },
        { type: "heading", text: "Run a one-week audit" },
        {
          type: "list",
          ordered: true,
          items: [
            "Ask each team member to note tasks they repeat every day or week.",
            "Record roughly how long each task takes and who is involved.",
            "Mark tasks that involve copying data between tools or waiting for approvals.",
            "Rank them by time lost and by how easy they are to fix.",
          ],
        },
        { type: "heading", text: "Fix the easy wins first" },
        {
          type: "paragraph",
          text: "Often the biggest gains come from simple changes: a shared template, an automated reminder or a connection between two tools. Start there, then move on to larger improvements.",
        },
        {
          type: "quote",
          text: "You cannot improve a process that nobody has written down.",
        },
      ],
    },
    {
      slug: "website-that-converts",
      category: "technology",
      title: "What makes a business website actually convert",
      excerpt:
        "Speed, clarity and trust matter more than animations. The elements that turn visitors into enquiries.",
      image: img("photo-1498050108023-c5249f4df085"),
      date: "2026-09-05",
      content: [
        {
          type: "paragraph",
          text: "A good-looking website is not the same as a website that brings in customers. Conversion comes from removing doubt and making the next step obvious.",
        },
        { type: "heading", text: "Be clear in five seconds" },
        {
          type: "paragraph",
          text: "A visitor should understand what you do, who it is for and what to do next within a few seconds of landing. If they have to guess, most will leave.",
        },
        { type: "heading", text: "The elements that matter most" },
        {
          type: "list",
          items: [
            "A fast site that works smoothly on phones",
            "One clear call to action on every page",
            "Proof of trust: client names, results and real contact details",
            "A short, simple enquiry form",
          ],
        },
        { type: "heading", text: "Measure and improve" },
        {
          type: "paragraph",
          text: "Track where visitors drop off and test one change at a time. Small improvements to a headline or a form often make a bigger difference than a full redesign.",
        },
      ],
    },
    {
      slug: "building-a-brand-people-remember",
      category: "marketing",
      title: "Building a brand people remember",
      excerpt:
        "Logo is only the start. Consistent voice, visuals and promises are what make a brand stick.",
      image: img("photo-1561070791-2526d30994b5"),
      date: "2026-08-24",
      content: [
        {
          type: "paragraph",
          text: "A logo is only a small part of a brand. People remember how a business sounds, looks and behaves every time they meet it.",
        },
        { type: "heading", text: "Decide what you stand for" },
        {
          type: "paragraph",
          text: "Start with a clear promise: who you help, how, and why you are different. Everything else, from colours to tone of voice, should support that promise.",
        },
        { type: "heading", text: "Stay consistent" },
        {
          type: "list",
          items: [
            "Use the same colours, fonts and style across every channel",
            "Write the way you want your business to sound",
            "Keep your promise in every customer experience",
          ],
        },
        {
          type: "quote",
          text: "A brand is what people say about you when you are not in the room.",
        },
      ],
    },
    {
      slug: "setting-goals-that-teams-follow",
      category: "business",
      title: "Setting goals your team will actually follow",
      excerpt:
        "Clear goals and a few honest KPIs beat long strategy decks. A simple way to set them.",
      image: img("photo-1557804506-669a67965ba0"),
      date: "2026-08-10",
      content: [
        {
          type: "paragraph",
          text: "Long strategy documents are rarely read twice. Teams follow goals that are short, clear and connected to their daily work.",
        },
        { type: "heading", text: "Keep it small" },
        {
          type: "paragraph",
          text: "Pick three to five goals for the quarter. If everything is a priority, nothing is. Each goal should have one owner and one number that shows progress.",
        },
        { type: "heading", text: "A simple way to set them" },
        {
          type: "list",
          ordered: true,
          items: [
            "Write the outcome you want in one sentence.",
            "Choose one measurable KPI for it.",
            "Name an owner and a review date.",
            "Check progress in a short weekly meeting.",
          ],
        },
        { type: "heading", text: "Review honestly" },
        {
          type: "paragraph",
          text: "At the end of each period, look at what worked and what did not, then adjust. Goals are tools for learning, not a way to assign blame.",
        },
      ],
    },
  ],
};
