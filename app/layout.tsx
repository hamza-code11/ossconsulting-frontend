import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import Preloader from "@/components/Preloader/Preloader";
import AppToaster from "@/components/ui/AppToaster";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-serif-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-label",
  display: "swap",
});

// Updated Metadata with Open Graph
export const metadata: Metadata = {
  title: "OSS Consulting",
  description:
    "One Partner. Every Business Possibility. Business consulting, technology, digital growth and operational support under one roof.",
  
  // Favicon
  icons: {
    icon: "/logo/favicon.png",
  },

  // WhatsApp & Facebook sharing previews
  openGraph: {
    title: "OSS Consulting",
    description: "One Partner. Every Business Possibility.",
    url: "https://ossconsulting.vercel.app",
    siteName: "OSS Consulting",
    images: [
      {
        url: "/og-image.png", // Aapki 1200x630 image ka path
        width: 1200,
        height: 630,
        alt: "OSS Consulting - One Stop Shop for Business Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter sharing previews
  twitter: {
    card: "summary_large_image",
    title: "OSS Consulting",
    description: "One Partner. Every Business Possibility.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* FOUC Fix Script - Renders before page paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') ||
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                if (theme === 'dark') {
                  document.documentElement.setAttribute('data-theme', 'dark');
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Preloader />
          {children}
        </ThemeProvider>
        {/* Global toast notifications (bottom-right) */}
        <AppToaster />
      </body>
    </html>
  );
}