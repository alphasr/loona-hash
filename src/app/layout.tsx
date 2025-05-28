import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.scss';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteUrl = 'https://loonahash.com'; // Replace with your actual domain

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'LOONAHASH - Revolutionary Mining Simulation Game on Telegram',
  description:
    'Experience the next evolution in mining simulation with LoonaHash. Start for free, complete daily tasks, earn points, and watch your mining efforts pay off. Fun, competitive, with quarterly rewards.',
  keywords: [
    'LoonaHash',
    'mining simulation',
    'Telegram game',
    'crypto mining',
    'blockchain game',
    'play-to-earn',
    'P2E',
    'virtual mining',
    'leaderboard rewards',
  ],
  applicationName: 'LoonaHash',
  authors: [{ name: 'LoonaHash Team', url: siteUrl }],
  creator: 'LoonaHash Team',
  publisher: 'LoonaHash',
  alternates: {
    canonical: siteUrl,
  },
  category: 'games', // Added category for better classification
  verification: {
    // Added verification for search engines
    google: 'YOUR_GOOGLE_SITE_VERIFICATION_CODE', // Replace with your actual Google verification code
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'LOONAHASH - Revolutionary Mining Simulation Game',
    description:
      'Join LoonaHash for a unique mining simulation experience on Telegram. Compete, earn, and get rewarded!',
    siteName: 'LoonaHash',
    images: [
      {
        url: `${siteUrl}/assets/logo.png`, // Replace with a direct link to your OG image
        width: 1200,
        height: 630,
        alt: 'LoonaHash Logo',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@LoonaHash_Off', // Replace with your Twitter handle
    creator: '@LoonaHash_Off', // Replace with your Twitter handle
    title: 'LOONAHASH - Mining Simulation on Telegram',
    description:
      'Discover LoonaHash: the fun and competitive way to mine, earn points, and get rewards. Start your adventure today!',
    images: [`${siteUrl}/assets/logo.png`], // Replace with a direct link to your Twitter image
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  icons: {
    icon: '/favicon.ico', // Ensure favicon.ico is in the public folder
    apple: '/apple-touch-icon.png', // Add an apple touch icon for better iOS integration
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
  assets: [`${siteUrl}/assets`],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className='page-wrapper'>
          <main className='content-wrapper'>{children}</main>
        </div>
      </body>
    </html>
  );
}
