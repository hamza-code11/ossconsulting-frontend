import type { Metadata } from "next";
import BlogsPage from "@/components/website/blogs/pages";
import { blogsData } from "@/data/blogs";

export const metadata: Metadata = {
  title: "Blog — OSS Consulting",
  description:
    "Articles on business strategy, technology, marketing and operations from the OSS Consulting team.",
};

export default function Page() {
  return <BlogsPage data={blogsData} />;
}
