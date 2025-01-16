import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Molina",
  description: "Experience fine dining at its best",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="en">
     <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
     <div className="min-h-screen flex flex-col">
       <Navigation/>
       <div className="flex-grow">{children}</div>
       <Footer/>
     </div>
     </body>
     </html>
  );
}