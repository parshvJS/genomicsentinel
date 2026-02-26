import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Early Access — Genomic Sentinel',
  description:
    'Join 100 genetics researchers getting early access to Genomic Sentinel — 200 clinical-grade genomic analyses in one intelligent platform.',
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'https://genomicsentinel.com'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Early Access — Genomic Sentinel',
    description:
      '200 Clinical-Grade Genomic Analyses. One Intelligent Platform. Apply for early access today.',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Early Access — Genomic Sentinel',
    description: '200 Clinical-Grade Genomic Analyses. One Intelligent Platform.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
