import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Isandith Perera - Software Developer & Video Editor",
  description: "Cyberpunk-themed portfolio showcasing projects in web development, video editing, and creative design. Isandith Perera's professional portfolio.",
  keywords: ["developer", "video editor", "portfolio", "cyberpunk", "next.js", "react"],
  authors: [{ name: "Isandith Perera" }],
  openGraph: {
    title: "Isandith Perera - Software Developer & Video Editor",
    description: "High-tech cyberpunk portfolio with live GitHub projects integration",
    type: "website",
    url: "https://isandith.dev",
    siteName: "Isandith Perera Portfolio"
  },
  icons: {
    icon: "/favicon.ico",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Analytics - Add your tracking here */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
        <script dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'YOUR_GA_ID');`
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Smooth scroll behavior */}
        <style>{`html { scroll-behavior: smooth; }`}</style>
        {children}
      </body>
    </html>
  );
}
