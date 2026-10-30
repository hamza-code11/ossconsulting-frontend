import type { Metadata } from "next";
import ContactPage from "@/components/website/contact/pages";
import { contactData } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact Us — OSS Consulting",
  description:
    "Get in touch with OSS Consulting. Tell us about your business and we will reply within one working day.",
};

export default function Page() {
  return <ContactPage data={contactData} />;
}
