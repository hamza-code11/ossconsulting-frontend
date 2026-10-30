// components/website/layout/WebsiteLayout/WebsiteLayout.tsx
import Navbar from "@/components/website/layout/Navbar/Navbar";
import Footer from "@/components/website/layout/Footer/Footer";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />

      <main>
        {children}
      </main>

      <Footer />

    </>
  );
}
