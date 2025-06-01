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
        url: '/logo.png', // Replace with your actual logo URL
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
    images: ['/logo.png'], // Replace with your actual logo URL
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
    shortcut: '/logo.png',
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
