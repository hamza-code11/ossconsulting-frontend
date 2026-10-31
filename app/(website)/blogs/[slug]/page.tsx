import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetail from "@/components/website/blogs/detail";
import { blogsData } from "@/data/blogs";

type Props = { params: Promise<{ slug: string }> };

// Data ki har post ka page build time par ban jata hai
export function generateStaticParams() {
  return blogsData.posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogsData.posts.find((p) => p.slug === slug);
  if (!post) return { title: "Article not found — OSS Consulting" };

  return {
    title: `${post.title} — OSS Consulting`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = blogsData.posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return <BlogDetail data={blogsData} post={post} />;
}
