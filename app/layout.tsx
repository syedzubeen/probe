import type { Metadata } from "next";
import "./globals.css";
import { DM_Mono, Space_Grotesk, Inter, Bebas_Neue } from 'next/font/google';

const dmMono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-mono',
});

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const bebasNeue = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-bebas-neue',
});

export const metadata: Metadata = {
  title: "PRobe - Deep scan. Smart review. Ship with confidence",
  description: "AI-powered GitHub Pull Request analysis dashboard for repo maintainers and tech leads",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmMono.variable} ${spaceGrotesk.variable} ${inter.variable} ${bebasNeue.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

// Made with Bob
