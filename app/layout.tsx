
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PaheliJob - Find Your Dream Tech Job',
  description: 'Discover thousands of tech job opportunities in fullstack development, data science, and more. Your next career move starts here.',
  keywords: 'pahelijob, jobs, tech jobs, fullstack, data science, frontend, backend, careers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1168103626602127" crossOrigin="anonymous"></script>
          <Footer />
        </div>
      </body>
    </html>
  );
}
