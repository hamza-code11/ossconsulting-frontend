import type { PrivacyData } from "@/types/privacy";

// Policy ka text yahan se badlo. Component ko haath lagane ki zaroorat nahi.
// Section add karne ke liye sections me ek object daalo, id unique rakho.
// Blocks: { type: "paragraph", text } ya { type: "list", items: [...] }
export const privacyData: PrivacyData = {
  hero: {
    eyebrow: "LEGAL",
    title: "Privacy",
    accent: "Policy.",
    description:
      "Your privacy matters to us. This policy explains what information OSS Consulting collects, how we use it and the choices you have.",
  },

  updatedLabel: "Last updated",
  lastUpdated: "2026-10-31",
  contentsLabel: "CONTENTS",

  sections: [
    {
      id: "introduction",
      title: "Introduction",
      blocks: [
        {
          type: "paragraph",
          text: "OSS Consulting (\"we\", \"our\", \"us\") provides business consulting, technology, marketing and operational support services. This Privacy Policy applies to this website and describes how we handle personal information when you visit it or contact us.",
        },
        {
          type: "paragraph",
          text: "By using our website, you agree to the practices described in this policy. If you do not agree, please do not use the website.",
        },
      ],
    },
    {
      id: "information-we-collect",
      title: "Information we collect",
      blocks: [
        {
          type: "paragraph",
          text: "We collect only the information needed to respond to you and to run our website.",
        },
        {
          type: "list",
          items: [
            "Information you give us: name, email address, phone number, selected service and the message you send through our contact forms.",
            "Usage information: pages visited, time spent, links clicked and referring website.",
            "Device information: browser type, operating system, screen size and approximate location based on IP address.",
          ],
        },
      ],
    },
    {
      id: "how-we-use-information",
      title: "How we use your information",
      blocks: [
        { type: "paragraph", text: "We use your information to:" },
        {
          type: "list",
          items: [
            "Reply to enquiries and provide the services you request.",
            "Send project updates, proposals and important notices.",
            "Understand how the website is used and improve it.",
            "Protect the website against spam, fraud and misuse.",
            "Meet our legal and regulatory obligations.",
          ],
        },
        {
          type: "paragraph",
          text: "We do not sell your personal information.",
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies and similar technologies",
      blocks: [
        {
          type: "paragraph",
          text: "Our website may use cookies and similar technologies to remember your preferences (such as light or dark theme) and to understand website traffic. You can block or delete cookies in your browser settings, but some parts of the website may then work less smoothly.",
        },
      ],
    },
    {
      id: "sharing-information",
      title: "Sharing your information",
      blocks: [
        {
          type: "paragraph",
          text: "We share personal information only when it is necessary and only with:",
        },
        {
          type: "list",
          items: [
            "Service providers who help us run the website, send email or analyse traffic, and who are bound to keep information secure.",
            "Professional advisers, such as lawyers and accountants, where needed.",
            "Authorities, when we are required to do so by law.",
          ],
        },
      ],
    },
    {
      id: "data-security",
      title: "Data security",
      blocks: [
        {
          type: "paragraph",
          text: "We use reasonable technical and organisational measures to protect your information from loss, misuse and unauthorised access. No method of transmission over the internet is completely secure, so we cannot guarantee absolute security.",
        },
      ],
    },
    {
      id: "data-retention",
      title: "Data retention",
      blocks: [
        {
          type: "paragraph",
          text: "We keep personal information only as long as needed for the purposes described in this policy, or as required by law. When it is no longer needed, we delete it or make it anonymous.",
        },
      ],
    },
    {
      id: "your-rights",
      title: "Your rights and choices",
      blocks: [
        { type: "paragraph", text: "You can ask us to:" },
        {
          type: "list",
          items: [
            "Tell you what personal information we hold about you.",
            "Correct information that is inaccurate or incomplete.",
            "Delete your information, where we are not required to keep it.",
            "Stop sending you updates or marketing messages.",
          ],
        },
        {
          type: "paragraph",
          text: "To make a request, contact us using the details at the end of this page.",
        },
      ],
    },
    {
      id: "third-party-links",
      title: "Third-party links",
      blocks: [
        {
          type: "paragraph",
          text: "Our website may link to other websites, such as our social media pages. We are not responsible for the privacy practices or content of those sites, so please read their policies before sharing information.",
        },
      ],
    },
    {
      id: "policy-changes",
      title: "Changes to this policy",
      blocks: [
        {
          type: "paragraph",
          text: "We may update this policy from time to time. When we do, we will change the \"Last updated\" date at the top of this page. Please check back regularly to stay informed.",
        },
      ],
    },
  ],

  contact: {
    title: "Questions about this policy?",
    text: "If you have any questions or requests about your privacy, write to us and we will reply within one working day.",
    buttonLabel: "Contact us",
  },
};
