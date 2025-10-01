import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import CartDrawer from "../components/CartDrawer";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LenisProvider from "../components/LenisProvider";
import { ScrollToTop } from "../components/ScrollToTop";
import Providers from "../components/Providers";
import { defaultMetadata } from "../lib/metadata";
const neueMontreal = localFont({
  src: [
    {
      path: "../fonts/PP Neue Montreal-Variable.ttf",
      style: "normal",
      weight: "100 900",
    },
  ],
  variable: "--font-neue-montreal",
  display: "swap",
});

const neueMontrealMono = localFont({
  src: [
    {
      path: "../fonts/PPNeueMontrealMono-Book.otf",
      style: "normal",
      weight: "400",
    },
  ],
  variable: "--font-neue-montreal-mono",
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        suppressHydrationWarning
        className={` ${neueMontreal.variable} ${neueMontrealMono.variable} antialiased`}
      >
        <Providers>
          <LenisProvider>
            <ScrollToTop />
            <CartDrawer />
            <Navbar />
            {children}
            <Footer />
          </LenisProvider>
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
