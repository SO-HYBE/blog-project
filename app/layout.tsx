import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import SmoothScroll from "./components/SmoothScroll";
import headerStyle from "./styles/header.scss";
import mouseStyle from "./styles/mouseEffect.scss";

const oswald : NextFontWithVariable = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
})

export const metadata: Metadata = {
  title: "BnW",
  description: "Your local blogs website for the latest exclusive blogs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico?" sizes="any" />
      <body className={`${oswald.variable} ${headerStyle} ${mouseStyle} font-sans`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>  
      </body>
    </html>
  );
}
