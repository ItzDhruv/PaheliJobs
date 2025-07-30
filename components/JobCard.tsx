'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { fetchCompanyLogoWithFallback, getCachedLogo } from '@/lib/logoService';

interface JobCardProps {
  job: {
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
    companyLogo?: string;
  };
}

export default function JobCard({ job }: JobCardProps) {
  const [companyLogo, setCompanyLogo] = useState<string>(job.company.charAt(0).toUpperCase());
  const [logoLoading, setLogoLoading] = useState(true);

  useEffect(() => {
    const loadLogo = async () => {
      try {
        // Check if logo is already cached
        const cachedLogo = getCachedLogo(job.company);
        if (cachedLogo) {
          setCompanyLogo(cachedLogo);
          setLogoLoading(false);
          return;
        }

        // Fetch logo using Google Search API
        const logo = await fetchCompanyLogoWithFallback(job.company);
        setCompanyLogo(logo);
      } catch (error) {
        console.warn(`Failed to load logo for ${job.company}:`, error);
        setCompanyLogo(job.company.charAt(0).toUpperCase());
      } finally {
        setLogoLoading(false);
      }
    };

    loadLogo();
  }, [job.company]);

  const shareJob = () => {
    if (navigator.share) {
      navigator.share({
        title: `${job.title} at ${job.company}`,
        text: `Check out this job opportunity: ${job.title} at ${job.company}`,
        url: `${window.location.origin}/job/${job.id}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/job/${job.id}`);
      alert('Job link copied to clipboard!');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200 p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold relative overflow-hidden">
              {logoLoading ? (
                <div className="animate-pulse w-8 h-8 bg-gray-300 rounded"></div>
              ) : companyLogo.startsWith('http') ? (
                <img
                  src={companyLogo}
                  alt={`${job.company} logo`}
                  className="w-12 h-12 rounded-lg object-contain bg-white p-1"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<span class="text-white font-semibold">${job.company.charAt(0).toUpperCase()}</span>`;
                    }
                  }}
                />
              ) : (
                <span className="text-lg">{companyLogo}</span>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {job.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {job.company}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <div className="flex items-center space-x-1">
              <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center"></i>
              <span>{job.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <i className="ri-briefcase-line w-4 h-4 flex items-center justify-center"></i>
              <span>{job.type}</span>
            </div>
            <div className="flex items-center space-x-1">
              <i className="ri-time-line w-4 h-4 flex items-center justify-center"></i>
              <span>{job.postedDate}</span>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
            {job.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {job.skills.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 4 && (
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                +{job.skills.length - 4} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                {job.salary}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {job.experience}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={shareJob}
                className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <i className="ri-share-line w-4 h-4 flex items-center justify-center"></i>
              </button>
              <Link
                href={`/job/${job.id}`}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors whitespace-nowrap"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
