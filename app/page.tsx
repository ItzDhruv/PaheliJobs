
'use client';

import Link from 'next/link';

import Image from "next/image";
import bg from "@/public/assets/bg.png"
export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/assets/bg-2.png"
          alt="Office Work Background"
          className="w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      {/* Hero Section */}
      <section className="py-24 px-4 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Welcome to <span className="text-yellow-300">PaheliJob</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-medium text-white/90">
            Your gateway to thousands of tech jobs, top companies, and exciting career opportunities. Start your journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/findjobs" className="px-8 py-4 rounded-lg bg-white text-blue-700 font-bold text-lg shadow-lg hover:bg-blue-100 transition-colors">
              Find Jobs
            </Link>
            <Link href="/companies" className="px-8 py-4 rounded-lg bg-white text-purple-700 font-bold text-lg shadow-lg hover:bg-purple-100 transition-colors">
              Companies
            </Link>
            <Link href="/categories" className="px-8 py-4 rounded-lg bg-white text-pink-700 font-bold text-lg shadow-lg hover:bg-pink-100 transition-colors">
              Categories
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Why PaheliJob?</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          We connect talented professionals with the best tech companies. Whether you're a developer, designer, data scientist, or engineer, you'll find opportunities that match your skills and ambitions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center">
            <i className="ri-briefcase-4-line text-4xl text-blue-600 mb-4"></i>
            <h3 className="font-semibold text-lg mb-2">Thousands of Jobs</h3>
            <p className="text-gray-600 dark:text-gray-400">Explore a wide range of tech jobs in development, data, design, and more.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center">
            <i className="ri-building-4-line text-4xl text-purple-600 mb-4"></i>
            <h3 className="font-semibold text-lg mb-2">Top Companies</h3>
            <p className="text-gray-600 dark:text-gray-400">Discover opportunities at leading tech companies and innovative startups.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center">
            <i className="ri-compass-3-line text-4xl text-pink-600 mb-4"></i>
            <h3 className="font-semibold text-lg mb-2">Easy Navigation</h3>
            <p className="text-gray-600 dark:text-gray-400">Quickly browse jobs by category, company, or skill to find your perfect fit.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
