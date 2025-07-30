'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllJobs } from '@/lib/jobsData';

import JobApplicationModal from '@/components/JobApplicationModal';

interface JobDetailProps {
  jobId: string;
}

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

// Company logos array
const companyLogos = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiK2i3U6IFCskhHepeoPbOxGb5yMeUWnVOkg&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY_AbrYwEx9Ry2kegwjaiU12tXdBZEx6eZGg&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTDYrQMTTrvfJNGoYBeAXsjwRIdGpCD3AvVw&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgwKGHwVlsDYqdbOaRyrlKl_YHauQ5TLnYHA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGG4DvDkY2YEkM7mRlJhBGz86080vUXWimiQ&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTAWrtAuF2VNfNTN3qD8l2dPMwAVG5ds5QaA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThWhQGaeEIZJI8fxD9xbgGAZZ3ObvKO-kenw&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6K9EjJeMAq_VbYAEe87u_h2p1V5z2Seua1Q&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoFSTRKQ_P4UQCC2NWcJw7zy5fH5M3jnC-xg&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh9IjNbgKJ8xqMxjM2lH49NgLRdQ44EjsyDA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyWN150bkFW7HuP4a7uuf9yb8fIIM7CXEv9g&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1G8XM5TyDrInT4X3O5K1jw2NGOQJQ9MEzgA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvxrJNmw8JgtVdVBhz7AfwHSH_HwWF5SLYJQ&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS55Dgt5GHFYIqcS5M0IPvsXr84rdp76w4m1g&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkiDfeTlsagVKoRWx4fka4Ki1RPcuZKzAVeA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTDYrQMTTrvfJNGoYBeAXsjwRIdGpCD3AvVw&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuhB8g9-qyuI9z7Pvf3D6OTucfftg1AvKAg&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTAWrtAuF2VNfNTN3qD8l2dPMwAVG5ds5QaA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQy8bVhD9a2wtsrrJ3wJaRxZi1PCbeuQnUKw&s'
];

// Function to get a random logo based on company name (consistent for same company)
const getCompanyLogo = (companyName: string): string => {
  const hash = companyName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return companyLogos[hash % companyLogos.length];
};

export default function JobDetail({ jobId }: JobDetailProps) {
  const [job, setJob] = useState<Job | null>(null);
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const allJobs = getAllJobs();
    const currentJob = allJobs.find(j => j.id === jobId);

    if (currentJob) {
      setJob(currentJob);
      const related = allJobs
        .filter(j => j.id !== jobId && j.category === currentJob.category)
        .slice(0, 3);
      setRelatedJobs(related);
    }
    setLoading(false);
  }, [jobId]);

  const shareJob = () => {
    if (navigator.share) {
      navigator.share({
        title: `${job?.title} at ${job?.company}`,
        text: `Check out this job opportunity: ${job?.title} at ${job?.company}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Job link copied to clipboard!');
    }
  };

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
  };

  const handleApplyNow = () => {
    setIsApplicationModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Job Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The job you're looking for doesn't exist.</p>
          <Link href="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors whitespace-nowrap">
            Browse All Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
            <i className="ri-arrow-left-line w-4 h-4 flex items-center justify-center inline mr-2"></i>
            Back to Jobs
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                      src={getCompanyLogo(job.company)} 
                      alt={`${job.company} logo`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to gradient with company initial if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.className = 'w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl';
                          parent.textContent = job.company.charAt(0).toUpperCase();
                        }
                      }}
                    />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {job.title}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
                      {job.company}
                    </p>
                  </div>
                </div>
                <button
                  onClick={shareJob}
                  className="p-3 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <i className="ri-share-line w-5 h-5 flex items-center justify-center"></i>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <i className="ri-map-pin-line text-gray-400 w-5 h-5 flex items-center justify-center"></i>
                  <span className="text-gray-600 dark:text-gray-400">{job.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="ri-briefcase-line text-gray-400 w-5 h-5 flex items-center justify-center"></i>
                  <span className="text-gray-600 dark:text-gray-400">{job.type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="ri-time-line text-gray-400 w-5 h-5 flex items-center justify-center"></i>
                  <span className="text-gray-600 dark:text-gray-400">{job.postedDate}</span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Job Description
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Requirements
                </h2>
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <i className="ri-check-line text-green-500 w-5 h-5 flex items-center justify-center mt-0.5"></i>
                      <span className="text-gray-700 dark:text-gray-300">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Skills Required
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Benefits
                </h2>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <i className="ri-star-line text-yellow-500 w-5 h-5 flex items-center justify-center mt-0.5"></i>
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  About {job.company}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {job.companyDescription}
                </p>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {job.salary}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {job.experience} • {job.type}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <button 
                      onClick={handleSaveJob}
                      className={`px-6 py-3 border rounded-lg transition-colors whitespace-nowrap ${
                        isSaved 
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <i className={`${isSaved ? 'ri-bookmark-fill' : 'ri-bookmark-line'} w-4 h-4 flex items-center justify-center inline mr-2`}></i>
                      {isSaved ? 'Saved' : 'Save Job'}
                    </button>
                    <button 
                      onClick={handleApplyNow}
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors whitespace-nowrap"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
            

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Similar Jobs
                </h3>
                <div className="space-y-4">
                  {relatedJobs.map((relatedJob) => (
                    <Link
                      key={relatedJob.id}
                      href={`/job/${relatedJob.id}`}
                      className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                        {relatedJob.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {relatedJob.company}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                        {relatedJob.salary}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

            
            </div>
          </div>
        </div>
      </div>

      <JobApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        job={job}
      />
    </div>
  );
}