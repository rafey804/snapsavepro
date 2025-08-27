import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from './../components/layout/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free YouTube Video Downloader - Download 4K HD Videos & MP3 Audio Online",
  description: "Download YouTube videos in 4K, 1080p HD quality for FREE! Convert YouTube to MP4, extract MP3 audio. Fast, secure, no registration required. Support for all video qualities.",
  keywords: [
    "youtube downloader",
    "download youtube videos", 
    "youtube to mp4",
    "youtube mp3 converter",
    "free youtube downloader",
    "4k video download",
    "hd video downloader", 
    "youtube video download",
    "youtube converter",
    "save youtube videos",
    "youtube audio download",
    "online video downloader",
    "youtube to mp3",
    "video downloader online",
    "youtube downloader free",
    "download youtube hd",
    "youtube mp4 download",
    "youtube music download"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}