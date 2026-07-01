import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, DM_Sans, Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

// GA4 Measurement ID — set NEXT_PUBLIC_GA_ID in your environment to enable.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Enif IT Services Ltd. | Premium Technology Agency",
    template: "%s | Enif IT Services Ltd.",
  },
  description:
    "Enif IT Services Ltd. delivers premium web & app development, AI automation, business management solutions, and brand design for forward-thinking companies.",
  keywords: [
    "IT agency Bangladesh",
    "web development",
    "app development",
    "AI automation",
    "business management solutions",
    "brand design",
    "digital transformation",
    "Enif IT",
  ],
  authors: [{ name: "Enif IT Services Ltd." }],
  creator: "Enif IT Services Ltd.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://enifit.com",
    siteName: "Enif IT Services Ltd.",
    title: "Enif IT Services Ltd. | Premium Technology Agency",
    description:
      "Growth through smart tech solutions. We engineer digital transformation for ambitious businesses.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Enif IT Services Ltd.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enif IT Services Ltd.",
    description: "Growth through smart tech solutions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#04051B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${dmSans.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#04051B] text-white">
        {children}
      </body>
      {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
    </html>
  );
}
