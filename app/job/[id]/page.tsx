
import { getAllJobs } from '@/lib/jobsData';
import JobDetail from './JobDetail';

export async function generateStaticParams() {
  const jobs = getAllJobs();
  return jobs.map((job) => ({
    id: job.id,
  }));
}

export default function JobPage({ params }: any) {
  return <JobDetail jobId={params.id} />;
}
