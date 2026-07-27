import type { Metadata } from "next";
import { Ubuntu, Ubuntu_Mono } from "next/font/google";
import { EnvBadge } from "@/components/EnvBadge";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Snowfall } from "@/components/Snowfall";
import { ValentinesHearts } from "@/components/ValentinesHearts";
import { NewYearConfetti } from "@/components/NewYearConfetti";
import { FallingLeaves } from "@/components/FallingLeaves";
import { Raindrops } from "@/components/Raindrops";
import "./globals.css";

const ubuntuSans = Ubuntu({
  variable: "--font-ubuntu-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const ubuntuMono = Ubuntu_Mono({
  variable: "--font-ubuntu-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Insure PH — Trusted Insurance for Every Filipino Family",
  description:
    "Insure PH is a Pasig-based insurance agency offering auto, property, life, HMO, and memorial plans, plus dedicated claims assistance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ubuntuSans.variable} ${ubuntuMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Snowfall />
        <ValentinesHearts />
        <NewYearConfetti />
        <FallingLeaves />
        <Raindrops />
        <SiteHeader />
        {children}
        <SiteFooter />
        <EnvBadge />
      </body>
    </html>
  );
}
