import type { Metadata } from "next";
import PrivacyPage from "@/components/website/privacy/pages";
import { privacyData } from "@/data/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy — OSS Consulting",
  description:
    "How OSS Consulting collects, uses and protects your personal information.",
};

export default function Page() {
  return <PrivacyPage data={privacyData} />;
}
