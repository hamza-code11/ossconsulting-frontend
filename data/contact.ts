import type { ContactData } from "@/types/contact";

// Email, phone, address aur text yahan se badlo. Component ko haath lagane ki zaroorat nahi.
export const contactData: ContactData = {
  hero: {
    eyebrow: "CONTACT US",
    title: "Let's talk about",
    accent: "your business.",
    description:
      "Tell us where your business is today and where you want it to go. Our team will get back to you within one working day.",
  },

  // Placeholder details: asli details se replace karo
  info: [
    {
      icon: "mail",
      label: "Email",
      value: "info@ossconsulting.us",
      note: "We reply within 24 hours",
      href: "mailto:info@ossconsulting.us",
    },
    {
      icon: "phone",
      label: "Phone",
      value: "+1(770) 652 2901",
      note: "Mon to Sat, 9am to 6pm",
      href: "tel:+1(770) 652 2901",
    },
    {
      icon: "map",
      label: "Office",
      value: "1943 Pleasant Hill Rd, Duluth, GA 30096, USA",
      note: "Visits by appointment",
    },
    {
      icon: "clock",
      label: "Working hours",
      value: "Mon to Sat: 9:00 AM to 6:00 PM",
      note: "Closed on Sundays",
    },
  ],

  socialLabel: "FOLLOW US",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "Facebook", href: "https://www.facebook.com" },
    { label: "Instagram", href: "https://www.instagram.com" },
  ],

  form: {
    title: "Send us a message",
    text: "Fill in the form and we will come back with the next steps.",
    labels: {
      name: "Full name",
      email: "Email address",
      phone: "Phone (optional)",
      service: "Service you need",
      message: "How can we help?",
    },
    placeholders: {
      name: "Your name",
      email: "you@company.com",
      phone: "+16462099461",
      service: "Select a service",
      message: "Tell us a little about your business and what you need...",
    },
    services: [
      "Business Consulting",
      "Technology",
      "Marketing and Growth",
      "Operational Support",
    ],
    submitLabel: "Send message",
    sendingLabel: "Sending...",
    successTitle: "Message sent",
    successText:
      "Thank you for reaching out. Our team will contact you within one working day.",
    successReset: "Send another message",
    errorText:
      "Something went wrong while sending. Please try again or email us directly.",
  },

  faqHead: {
    eyebrow: "FAQ",
    title: "Questions we hear",
    accent: "often.",
  },
  faqs: [
    {
      question: "How soon will you reply?",
      answer:
        "We reply to every enquiry within one working day, usually sooner.",
    },
    {
      question: "Do you work with small businesses and startups?",
      answer:
        "Yes. We work with startups, SMEs and enterprises, and shape the scope and budget to fit your stage.",
    },
    {
      question: "Can I use more than one of your services together?",
      answer:
        "Absolutely. Combining consulting, technology, growth and operations under one team is exactly what OSS is built for.",
    },
    {
      question: "How does pricing work?",
      answer:
        "After a short discovery call we share a clear scope, timeline and fixed or monthly pricing, with no hidden costs.",
    },
    {
      question: "Do you offer support after launch?",
      answer:
        "Yes. Our operations practice provides ongoing maintenance, monitoring and reporting after launch.",
    },
  ],
};
