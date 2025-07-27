'use client';

import { useState, useEffect } from 'react';
import JobCard from '@/components/JobCard';
import SearchFilters from '@/components/SearchFilters';
import AdSenseAd from '@/components/AdSenseAd';
import { getAllJobs } from '@/lib/jobsData';

// Job type based on JobCard and jobsData 
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
  companyLogo?: string;
}

interface SearchFiltersType {
  query: string;
  category: string;
  location: string;
  type: string;
  experience: string;
}

export default function FindJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const jobsPerPage = 20;

  useEffect(() => {
    const allJobs = getAllJobs();
    setJobs(allJobs);
    setFilteredJobs(allJobs);
    setLoading(false);
  }, []);

  const handleSearch = (filters: SearchFiltersType) => {
    let filtered = [...jobs];

    if (filters.query) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.query.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.query.toLowerCase()) ||
        job.skills.some((skill: string) => skill.toLowerCase().includes(filters.query.toLowerCase()))
      );
    }

    if (filters.category) {
      filtered = filtered.filter(job => job.category === filters.category);
    }

    if (filters.location) {
      filtered = filtered.filter(job => job.location === filters.location);
    }

    if (filters.type) {
      filtered = filtered.filter(job => job.type === filters.type);
    }

    if (filters.experience) {
      filtered = filtered.filter(job => job.experience === filters.experience);
    }

    setFilteredJobs(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading amazing job opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
     
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-gray-900">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <SearchFilters onSearch={handleSearch} />
            
            <div className="mt-6 flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-400">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredJobs.length)} of {filteredJobs.length.toLocaleString()} jobs
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <i className="ri-arrow-left-line w-4 h-4 flex items-center justify-center"></i>
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center"></i>
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {currentJobs.map((job, index) => (
                <div key={job.id}>
                  <JobCard job={job} />
                  {(index + 1) % 5 === 0 && (
                    <div className="my-6">
                      <AdSenseAd slot="inline-jobs" format="rectangle" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(currentPage - 2 + i, totalPages - 4 + i));
                  if (pageNum < 1 || pageNum > totalPages) return null;
                  return (
                    <button
                     
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }).filter(Boolean)}
                
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <AdSenseAd slot="sidebar-top" format="rectangle" />
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Job Categories
                </h3>
                <div className="space-y-2">
                  {[
                    'Frontend Development',
                    'Backend Development', 
                    'Full Stack Development',
                    'Data Science',
                    'Machine Learning',
                    'DevOps',
                    'Mobile Development',
                    'UI/UX Design'
                  ].map(category => (
                    <button
                      key={category}
                      onClick={() => handleSearch({ query: '', category, location: '', type: '', experience: '' })}
                      className="block w-full text-left px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <AdSenseAd slot="sidebar-bottom" format="rectangle" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 


 {/* Hero Section */}

      
    {/* <section className="relative py-20 text-white isolate overflow-hidden">

  <div className="absolute inset-0 z-0">
    <img
      src="/assets/bg3.png"
      alt="Background"
      className="w-full h-full object-cover object-center opacity-20"
    />
  </div>


  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 className="text-4xl md:text-6xl font-bold mb-6">
      Find Your Dream Tech Job
    </h1>
    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
      Discover thousands of opportunities in fullstack development, data science, and more. Your next career move starts here.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
        <div className="text-3xl font-bold">{jobs.length.toLocaleString()}+</div>
        <div className="text-blue-100">Active Jobs</div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
        <div className="text-3xl font-bold">500+</div>
        <div className="text-blue-100">Top Companies</div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
        <div className="text-3xl font-bold">10+</div>
        <div className="text-blue-100">Tech Categories</div>
      </div>
    </div>
  </div>

</section> */}