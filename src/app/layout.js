import { Inter } from "next/font/google";
import "./globals.css";
import TransitionProvider from "@/components/transitionProvider";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: "Shubham Tiwari - Full Stack Developer | Portfolio",
  description: "Full Stack Developer specializing in React, Next.js, and Node.js. Explore my portfolio of 30+ projects including e-commerce platforms, dashboards, and web applications.",
  keywords: ["Full Stack Developer", "React Developer", "Next.js", "Node.js", "Web Development", "Portfolio", "Shubham Tiwari"],
  authors: [{ name: "Shubham Tiwari" }],
  creator: "Shubham Tiwari",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shubham-dev-tiwari.vercel.app",
    title: "Shubham Tiwari - Web Developer",
    description: "Full Stack Developer crafting exceptional digital experiences with modern technologies",
    siteName: "Shubham Tiwari Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubham Tiwari - Full Stack Developer",
    description: "Full Stack Developer crafting exceptional digital experiences",
    creator: "@shubhamtiwari",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body 
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
