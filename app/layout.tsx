import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Loonahash',
  description: 'A modern hashing utility.',
  openGraph: {
    title: 'Loonahash',
    description: 'A modern hashing utility.',
    url: 'https://loonahash.com', // Replace with your actual domain
    siteName: 'Loonahash',
    images: [
      {
        url: '/placeholder-logo.png', // Replace with your actual logo URL
        width: 1200,
        height: 630,
        alt: 'Loonahash Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loonahash',
    description: 'A modern hashing utility.',
    // site: '@yourtwitterhandle', // Replace with your Twitter handle
    // creator: '@yourtwitterhandle', // Replace with your Twitter handle
    images: ['/placeholder-logo.png'], // Replace with your actual logo URL
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
  // Add more metadata as needed, e.g., icons, manifest
  // icons: {
  //   icon: '/favicon.ico',
  //   shortcut: '/favicon-16x16.png',
  //   apple: '/apple-touch-icon.png',
  // },
  // manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
