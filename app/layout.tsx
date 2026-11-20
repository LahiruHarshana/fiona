import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import StructuredData from "@/components/StructuredData";
import { getSiteOrigin, pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const origin = getSiteOrigin();

export const metadata: Metadata = {
  ...pageMetadata("home"),
  metadataBase: origin ? new URL(origin) : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-ivory font-sans text-olive-500 antialiased">
        <LoadingScreen />
        <Navigation />
        {children}
        <Footer />
        <StructuredData />
      </body>
    </html>
  );
}
