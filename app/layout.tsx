
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
      <head>
        <link rel="icon" href="/favicon.ico"/>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1168103626602127" crossOrigin="anonymous"></script>
        <meta name="google-site-verification" content="fUVjDK069ImDkI0uFWu1-uy_GYeCM_cvET7ztuLuYFc" />
        <meta property="og:title" content="PaheliJob - Find Your Dream Tech Job" />
        <meta property="og:description" content="Discover thousands of tech job opportunities in fullstack development, data science, and more. Your next career move starts here." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://paheli-jobs.vercel.app/" />
        <meta property="og:image" content="/assets/bg4.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PaheliJob - Find Your Dream Tech Job" />
        <meta name="twitter:description" content="Discover thousands of tech job opportunities in fullstack development, data science, and more. Your next career move starts here." />
        <link rel="canonical" href="https://paheli-jobs.vercel.app/" />
      </head>
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          {/* AdSense script moved to <head> */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
