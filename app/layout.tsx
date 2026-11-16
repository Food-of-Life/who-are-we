import type { Metadata } from 'next';
import './style.css';

const siteUrl = process.env.SITE_URL;
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

const previewImage = {
  url: '/food/landing-preview.jpg',
  width: 1200,
  height: 630,
  alt: 'Food of Life landing page',
};

export const metadata: Metadata = {
  title: 'Food of Life | Baltimore Culinary Events',
  description: 'Food of Life curates intimate dining experiences in Baltimore around the traditions and occasions that bring people together.',
  metadataBase: siteUrl ? new URL(siteUrl) : productionHost ? new URL('https://' + productionHost) : undefined,
  openGraph: { type: 'website', title: 'Food of Life', images: [previewImage] },
  twitter: { card: 'summary_large_image', title: 'Food of Life', images: [previewImage] },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
