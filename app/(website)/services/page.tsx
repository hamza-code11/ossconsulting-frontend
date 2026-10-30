import type { Metadata } from "next";
import ServicesPage from "@/components/website/services/pages";
import { servicesData } from "@/data/services";

export const metadata: Metadata = {
  title: "Services — OSS Consulting",
  description:
    "Business consulting, technology, digital growth and operational support. Explore every OSS Consulting service in one place.",
};

export default function Page() {
  return <ServicesPage data={servicesData} />;
}
