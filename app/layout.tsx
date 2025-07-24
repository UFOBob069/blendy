import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Blendy - AI Chat Assistant",
    template: "%s | Blendy"
  },
  description: "Blendy is your intelligent AI chat assistant. Have natural conversations, get answers, and explore ideas with our advanced AI technology.",
  keywords: [
    "AI chat",
    "chatbot",
    "AI assistant",
    "conversational AI",
    "Blendy",
    "artificial intelligence",
    "chat interface",
    "AI conversation"
  ],
  authors: [{ name: "Blendy" }],
  creator: "Blendy",
  publisher: "Blendy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://blendy.ai'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Blendy - AI Chat Assistant',
    description: 'Blendy is your intelligent AI chat assistant. Have natural conversations, get answers, and explore ideas with our advanced AI technology.',
    url: 'https://blendy.ai',
    siteName: 'Blendy',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Blendy - AI Chat Assistant',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blendy - AI Chat Assistant',
    description: 'Blendy is your intelligent AI chat assistant. Have natural conversations, get answers, and explore ideas.',
    images: ['/twitter-image.jpg'],
    creator: '@blendy_ai',
    site: '@blendy_ai',
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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#1E40AF', // Blue color matching our theme
      },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'your-google-site-verification',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-white">
      <head>
        <meta name="theme-color" content="#1E40AF" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#1E40AF" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={`${inter.className} h-full`}>{children}</body>
    </html>
  );
}
