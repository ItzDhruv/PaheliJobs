'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import JobCard from '@/components/JobCard';
import AdSenseAd from '@/components/AdSenseAd';
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

export default function CompaniesPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [companies, setCompanies] = useState<{ name: string; count: number; logo: string }[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<{ name: string; count: number; logo: string }[]>([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [companyJobs, setCompanyJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const jobsPerPage = 10;

  useEffect(() => {
    const allJobs = getAllJobs();
    setJobs(allJobs);
    
    // Get unique companies with job counts
    const companyMap = new Map();
    allJobs.forEach(job => {
      if (companyMap.has(job.company)) {
        companyMap.set(job.company, companyMap.get(job.company) + 1);
      } else {
        companyMap.set(job.company, 1);
      }
    });
    
    const companiesArray = Array.from(companyMap.entries()).map(([name, count]) => ({
      name,
      count,
      logo: name.charAt(0).toUpperCase()
    })).sort((a, b) => b.count - a.count);
    
    setCompanies(companiesArray);
    setFilteredCompanies(companiesArray);
    setLoading(false);
  }, []);

  // Filter companies based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCompanies(companies);
    } else {
      const filtered = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  }, [searchTerm, companies]);

  const handleCompanySelect = (companyName: string) => {
    setSelectedCompany(companyName);
    const filtered = jobs.filter(job => job.company === companyName);
    setCompanyJobs(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(companyJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = companyJobs.slice(startIndex, endIndex);

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

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedCompany('');
    setCompanyJobs([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading companies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section with Background Image */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="assets/bg4.jpg"
            alt="Office Background"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-9000/90"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Top Tech Companies
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
            Explore job opportunities at leading technology companies. Find your perfect match among industry leaders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
              <div className="text-3xl font-bold text-white">{companies.length.toLocaleString()}+</div>
              <div className="text-white/80">Companies</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
              <div className="text-3xl font-bold text-white">{jobs.length.toLocaleString()}+</div>
              <div className="text-white/80">Job Openings</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-white/80">Industries</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Companies List */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Browse Companies
              </h2>
              
              {/* Search Input */}
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-search-line text-gray-400 w-5 h-5 flex items-center justify-center"></i>
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search companies..."
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                  />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <i className="ri-close-line text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 w-5 h-5 flex items-center justify-center"></i>
                    </button>
                  )}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredCompanies.length > 0 ? (
                    filteredCompanies.map((company, index) => (
                      <button
                        key={index}
                        onClick={() => handleCompanySelect(company.name)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedCompany === company.name
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                            {company.logo}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{company.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{company.count} jobs</p>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <i className="ri-search-line text-gray-400 text-2xl mb-2 w-6 h-6 flex items-center justify-center mx-auto"></i>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">No companies found</p>
                      <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Try a different search term</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <AdSenseAd slot="companies-sidebar" format="rectangle" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedCompany ? (
              <div>
                <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                        {selectedCompany.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                          {selectedCompany}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                          {companyJobs.length} job openings available
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCompany('');
                        setCompanyJobs([]);
                      }}
                      className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    >
                      <i className="ri-close-line w-5 h-5 flex items-center justify-center"></i>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {currentJobs.map((job, index) => (
                    <div key={job.id}>
                      <JobCard job={job} />
                      {(index + 1) % 3 === 0 && (
                        <div className="my-6">
                          <AdSenseAd slot="companies-inline" format="rectangle" />
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
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-building-line text-white text-3xl w-8 h-8 flex items-center justify-center"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Select a Company
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Choose a company from the list to explore their job openings and learn more about opportunities available.
                </p>
                <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                  <p>💡 Tip: Use the search box to quickly find specific companies</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}