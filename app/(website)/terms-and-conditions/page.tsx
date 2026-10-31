import type { Metadata } from "next";
import TermsPage from "@/components/website/terms/pages";
import { termsData } from "@/data/terms";

export const metadata: Metadata = {
  title: "Terms & Conditions — OSS Consulting",
  description:
    "The terms and conditions for using the OSS Consulting website and services.",
};

export default function Page() {
  return <TermsPage data={termsData} />;
}
