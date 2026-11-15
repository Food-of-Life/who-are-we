import type { Metadata } from 'next';
import './style.css';

export const metadata: Metadata = {
  title: 'Food of Life | Baltimore Culinary Events',
  description: 'Food of Life curates intimate dining experiences in Baltimore around the traditions and occasions that bring people together.',
  openGraph: { type: 'website', title: 'Food of Life', images: ['/food/made-with-care.jpg'] },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
