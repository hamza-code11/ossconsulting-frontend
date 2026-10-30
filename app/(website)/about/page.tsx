import type { Metadata } from "next";
import AboutPage from "@/components/website/about/pages";
import { aboutData } from "@/data/about";

export const metadata: Metadata = {
  title: "About Us — OSS Consulting",
  description:
    "Learn who we are, what we believe in and how OSS Consulting brings consulting, technology, growth and operations under one roof.",
};

export default function Page() {
  return <AboutPage data={aboutData} />;
}
