
'use client';

import { useState } from 'react';

interface SearchFiltersProps {
  onSearch: (filters: {
    query: string;
    category: string;
    location: string;
    type: string;
    experience: string;
  }) => void;
}

export default function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [filters, setFilters] = useState({
    query: '',
    category: '',
    location: '',
    type: '',
    experience: '',
  });

  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'All Categories',
    'Frontend Development',
    'Backend Development',
    'Full Stack Development',
    'Data Science',
    'Machine Learning',
    'DevOps',
    'Mobile Development',
    'UI/UX Design',
    'Product Management',
  ];

  const locations = [
    'All Locations',
    'Remote',
    'San Francisco, CA',
    'New York, NY',
    'Seattle, WA',
    'Austin, TX',
    'Boston, MA',
    'Chicago, IL',
    'Los Angeles, CA',
    'Denver, CO',
  ];

  const jobTypes = [
    'All Types',
    'Full-time',
    'Part-time',
    'Contract',
    'Freelance',
    'Internship',
  ];

  const experienceLevels = [
    'All Levels',
    'Entry Level',
    'Mid Level',
    'Senior Level',
    'Lead/Principal',
  ];

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      query: '',
      category: '',
      location: '',
      type: '',
      experience: '',
    };
    setFilters(clearedFilters);
    onSearch(clearedFilters);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Find Your Perfect Job
        </h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <i className="ri-filter-line w-5 h-5 flex items-center justify-center"></i>
        </button>
      </div>

      <div className="relative mb-4">
        <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 flex items-center justify-center"></i>
        <input
          type="text"
          placeholder="Search jobs, companies, or keywords..."
          value={filters.query}
          onChange={(e) => handleFilterChange('query', e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
        />
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
        <div className="relative">
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm appearance-none pr-8"
          >
            {categories.map((category) => (
              <option key={category} value={category === 'All Categories' ? '' : category}>
                {category}
              </option>
            ))}
          </select>
          <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 flex items-center justify-center pointer-events-none"></i>
        </div>

        <div className="relative">
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm appearance-none pr-8"
          >
            {locations.map((location) => (
              <option key={location} value={location === 'All Locations' ? '' : location}>
                {location}
              </option>
            ))}
          </select>
          <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 flex items-center justify-center pointer-events-none"></i>
        </div>

        <div className="relative">
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm appearance-none pr-8"
          >
            {jobTypes.map((type) => (
              <option key={type} value={type === 'All Types' ? '' : type}>
                {type}
              </option>
            ))}
          </select>
          <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 flex items-center justify-center pointer-events-none"></i>
        </div>

        <div className="relative">
          <select
            value={filters.experience}
            onChange={(e) => handleFilterChange('experience', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm appearance-none pr-8"
          >
            {experienceLevels.map((level) => (
              <option key={level} value={level === 'All Levels' ? '' : level}>
                {level}
              </option>
            ))}
          </select>
          <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 flex items-center justify-center pointer-events-none"></i>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={clearFilters}
          className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
