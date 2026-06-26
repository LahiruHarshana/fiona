import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
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

export const metadata: Metadata = {
  title: "Villa FIONA | Purely Green Serenity in Galle",
  description:
    "A traditional-modern Sri Lankan luxury retreat in Mihiripanna, Galle, 80m from the ocean and close to Dalawella Turtle Beach.",
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
      </body>
    </html>
  );
}
