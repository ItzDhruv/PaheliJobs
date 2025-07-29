
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import JobCard from '@/components/JobCard';

import { getAllJobs } from '@/lib/jobsData';

// Define the Job type based on jobsData
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedDate: string;
  description: string;
  skills: string[];
  category: string;
  experience: string;
  requirements: string[];
  benefits: string[];
  companyDescription: string;
}

export default function CategoriesPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<{ name: string; count: number; icon: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryJobs, setCategoryJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const jobsPerPage = 10;

  const categoryIcons: { [key: string]: string } = {
    'Frontend Development': 'ri-code-line',
    'Backend Development': 'ri-server-line',
    'Full Stack Development': 'ri-stack-line',
    'Data Science': 'ri-bar-chart-line',
    'Machine Learning': 'ri-brain-line',
    'DevOps': 'ri-settings-3-line',
    'Mobile Development': 'ri-smartphone-line',
    'UI/UX Design': 'ri-paint-brush-line',
    'Cloud Engineering': 'ri-cloud-line',
    'Cybersecurity': 'ri-shield-check-line'
  };

  useEffect(() => {
    const allJobs = getAllJobs();
    setJobs(allJobs);
    
    // Get unique categories with job counts
    const categoryMap = new Map();
    allJobs.forEach(job => {
      if (categoryMap.has(job.category)) {
        categoryMap.set(job.category, categoryMap.get(job.category) + 1);
      } else {
        categoryMap.set(job.category, 1);
      }
    });
    
    const categoriesArray = Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      count,
      icon: categoryIcons[name] || 'ri-code-line'
    })).sort((a, b) => b.count - a.count);
    
    setCategories(categoriesArray);
    setLoading(false);
  }, []);

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    const filtered = jobs.filter(job => job.category === categoryName);
    setCategoryJobs(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(categoryJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = categoryJobs.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
    <section className="relative text-white py-20">
  {/* Background Image with Opacity */}
  <img
    src="/assets/bg.png"
    alt="Background"
    className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
  />

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 className="text-4xl md:text-6xl font-bold mb-6">
      Job Categories
    </h1>
    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
      Explore opportunities across different tech specializations. Find jobs that match your skills and interests.
    </p>
  </div>
</section>



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedCategory ? (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
              Browse by Category
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategorySelect(category.name)}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 text-left hover:border-blue-300 dark:hover:border-blue-600"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                      <i className={`${category.icon} w-6 h-6 flex items-center justify-center`}></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {category.count.toLocaleString()} jobs available
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="text-center">
            
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Categories
                  </h2>
                  <button
                    onClick={() => setSelectedCategory('')}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => handleCategorySelect(category.name)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedCategory === category.name
                            ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <i className={`${category.icon} w-5 h-5 flex items-center justify-center`}></i>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{category.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{category.count} jobs</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                 
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {selectedCategory}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {categoryJobs.length} job openings available
                </p>
              </div>

              <div className="space-y-4">
                {currentJobs.map((job, index) => (
                  <div key={job.id}>
                    <JobCard job={job} />
                    {(index + 1) % 3 === 0 && (
                      <div className="my-6">
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
                    >
                      Previous
                    </button>
                    
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Page {currentPage} of {totalPages}
                    </span>
                    
                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
