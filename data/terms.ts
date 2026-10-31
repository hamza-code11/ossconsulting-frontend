import type { TermsData } from "@/types/terms";

// Terms ka text yahan se badlo. Component ko haath lagane ki zaroorat nahi.
// Section add karne ke liye sections me ek object daalo, id unique rakho.
// Blocks: { type: "paragraph", text } ya { type: "list", items: [...] }
export const termsData: TermsData = {
  hero: {
    eyebrow: "LEGAL",
    title: "Terms &",
    accent: "Conditions.",
    description:
      "Please read these terms carefully before using the OSS Consulting website or engaging our services.",
  },

  updatedLabel: "Last updated",
  lastUpdated: "2026-10-31",
  contentsLabel: "CONTENTS",

  sections: [
    {
      id: "acceptance",
      title: "Acceptance of terms",
      blocks: [
        {
          type: "paragraph",
          text: "By accessing or using this website, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, please do not use the website.",
        },
      ],
    },
    {
      id: "about-us",
      title: "About OSS Consulting",
      blocks: [
        {
          type: "paragraph",
          text: "OSS Consulting (\"we\", \"our\", \"us\") is a one stop shop for business services, including business consulting, technology, marketing and operational support. This website provides information about our services and a way to contact us.",
        },
      ],
    },
    {
      id: "use-of-website",
      title: "Use of the website",
      blocks: [
        { type: "paragraph", text: "You agree to use this website only for lawful purposes. You must not:" },
        {
          type: "list",
          items: [
            "Use the website in a way that breaks any applicable law or regulation.",
            "Try to gain unauthorised access to the website, our servers or related systems.",
            "Send spam, viruses or any harmful or malicious code.",
            "Copy, scrape or collect content from the website by automated means without our permission.",
            "Impersonate any person or misrepresent your connection with a person or business.",
          ],
        },
      ],
    },
    {
      id: "services",
      title: "Our services",
      blocks: [
        {
          type: "paragraph",
          text: "Information about our services on this website is for general guidance and does not form an offer or contract. The scope, timeline, fees and deliverables of any project are agreed separately in a written proposal or service agreement.",
        },
        {
          type: "paragraph",
          text: "If there is a difference between these terms and a signed service agreement, the signed agreement applies to that project.",
        },
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual property",
      blocks: [
        {
          type: "paragraph",
          text: "All content on this website, including text, graphics, logos, images and design, belongs to OSS Consulting or its licensors and is protected by intellectual property laws. You may view and print pages for your own personal, non-commercial use, but you may not reproduce, distribute or modify the content without our written permission.",
        },
      ],
    },
    {
      id: "your-submissions",
      title: "Information you send us",
      blocks: [
        {
          type: "paragraph",
          text: "When you send us an enquiry or message, you confirm that the information you provide is accurate and that you have the right to share it. We will use it as described in our Privacy Policy.",
        },
      ],
    },
    {
      id: "third-party-links",
      title: "Third-party links",
      blocks: [
        {
          type: "paragraph",
          text: "This website may contain links to other websites, such as our social media pages. These links are provided for convenience. We do not control those sites and are not responsible for their content or practices.",
        },
      ],
    },
    {
      id: "disclaimer",
      title: "Disclaimer",
      blocks: [
        {
          type: "paragraph",
          text: "The website and its content are provided \"as is\" and \"as available\". We try to keep information accurate and up to date, but we do not guarantee that it is complete, error-free or always available. Nothing on this website is legal, financial or professional advice for your specific situation.",
        },
      ],
    },
    {
      id: "limitation-of-liability",
      title: "Limitation of liability",
      blocks: [
        {
          type: "paragraph",
          text: "To the fullest extent permitted by law, OSS Consulting will not be liable for any indirect, incidental or consequential loss arising from your use of, or inability to use, this website. Nothing in these terms limits liability that cannot be excluded by law.",
        },
      ],
    },
    {
      id: "termination",
      title: "Suspension and termination",
      blocks: [
        {
          type: "paragraph",
          text: "We may restrict or block access to the website at any time, without notice, if we believe these terms have been broken or the website is being misused.",
        },
      ],
    },
    {
      id: "governing-law",
      title: "Governing law",
      blocks: [
        {
          type: "paragraph",
          text: "These terms are governed by the laws of Pakistan. Any dispute arising from them will be handled by the courts of Karachi, Sindh, unless a signed service agreement says otherwise.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      blocks: [
        {
          type: "paragraph",
          text: "We may update these terms from time to time. When we do, we will change the \"Last updated\" date at the top of this page. By continuing to use the website after changes are posted, you accept the updated terms.",
        },
      ],
    },
  ],

  contact: {
    title: "Questions about these terms?",
    text: "If anything here is unclear, write to us and we will reply within one working day.",
    buttonLabel: "Contact us",
  },
};
