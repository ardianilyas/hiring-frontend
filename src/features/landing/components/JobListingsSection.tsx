import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Clock, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useJobOpenings } from '../hooks/useJobOpenings';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function JobListingsSection() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useJobOpenings(page);

  const jobs = data?.data || [];
  const meta = data?.meta;

  const handleNextPage = () => {
    if (meta?.nextUrl) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (meta?.prevUrl) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <section id="jobs" className="py-24 bg-brand-light">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="text-center mb-16 animate-in slide-in-from-bottom-8 duration-700 fade-in fill-mode-both view-in">
          <h2 className="text-4xl font-bold text-brand-secondary mb-4">Open Positions</h2>
          <p className="text-lg text-brand-gray">Explore current internal opportunities across departments.</p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-brand-border h-[260px] flex flex-col">
                <Skeleton className="w-24 h-6 rounded-full mb-4" />
                <Skeleton className="w-3/4 h-7 mb-2" />
                <Skeleton className="w-full h-4 mb-1" />
                <Skeleton className="w-2/3 h-4 mb-6" />
                <div className="flex gap-4 mt-auto mb-4">
                  <Skeleton className="w-16 h-4" />
                  <Skeleton className="w-20 h-4" />
                </div>
                <div className="pt-4 border-t border-brand-border flex justify-between items-center">
                  <Skeleton className="w-24 h-5" />
                  <Skeleton className="w-28 h-10 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-12">
            <p className="text-red-500">Failed to load job openings.</p>
          </div>
        )}

        {!isLoading && !isError && jobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-brand-gray">No job openings found at the moment.</p>
          </div>
        )}

        {!isLoading && !isError && jobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job: any, index: number) => (
              <div 
                key={job.id} 
                className="group bg-white p-6 rounded-2xl border border-brand-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full animate-in slide-in-from-bottom-8 fade-in fill-mode-both view-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4">
                  {job.department?.name && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-primary/10 text-brand-primary mb-4">
                      {job.department.name}
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-brand-secondary mb-2">{job.title}</h3>
                  <p className="text-brand-gray text-sm line-clamp-2">{job.description}</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-brand-gray mb-6 flex-grow">
                  <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location || 'N/A'}</div>
                  <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {job.employmentType || 'Full Time'}</div>
                  {job.experience && (
                    <div className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {job.experience}</div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-brand-border mt-auto">
                  <span className="text-sm font-medium text-brand-secondary">{job.salary || 'Competitive'}</span>
                  <Button onClick={() => navigate(`/job/${job.id}`)}>
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {meta && (meta.prevUrl || meta.nextUrl) && (
          <div className="mt-12 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={handlePrevPage} 
                    className={!meta?.prevUrl ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext 
                    onClick={handleNextPage}
                    className={!meta?.nextUrl ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </section>
  );
}
