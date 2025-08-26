import type { Metadata } from "next";
import { Montserrat, Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import ClientLayout from "./clientLayout";

const montserratSans = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
});

const MontserratMono = Montserrat({
  variable: "--font-montserrat-mono",
  subsets: ["latin"],
  weight: "400"
});

const MontSerrratAlternates = Montserrat_Alternates({
  variable: "--font-montserrat-alternates",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Planify",
  description: "Sua agenda na ponta dos dedos.",
  icons: {
    icon: "/favicon.ico",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <link rel="icon" href="/favicon.ico" />
      <body
        className={`${montserratSans.variable} ${MontserratMono.variable} ${MontSerrratAlternates.variable} antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
