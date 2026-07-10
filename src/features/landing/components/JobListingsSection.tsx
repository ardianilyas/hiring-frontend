import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Clock, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatEnumString } from '@/lib/utils';
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
                className="group relative bg-white/50 backdrop-blur-xl p-7 rounded-[2rem] border border-brand-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full animate-in slide-in-from-bottom-8 fade-in fill-mode-both view-in overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Subtle gradient blob on hover */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-primary/5 rounded-full blur-3xl group-hover:bg-brand-primary/10 transition-colors duration-500 pointer-events-none" />

                <div className="relative z-10 mb-6">
                  <div className="flex items-start justify-between mb-4 gap-2">
                    {job.department?.name && (
                      <Badge variant="secondary" className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 border-0 rounded-full px-3">
                        {job.department.name}
                      </Badge>
                    )}
                    <span className="text-xs font-semibold text-slate-500 px-3 py-1.5 bg-slate-100 rounded-full shrink-0">
                      {job.salary || 'Competitive'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-brand-secondary mb-3 group-hover:text-brand-primary transition-colors line-clamp-2">{job.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{job.description}</p>
                </div>
                
                <div className="relative z-10 flex flex-wrap items-center gap-3 text-sm text-slate-600 mb-8 flex-grow">
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100/50"><MapPin className="w-4 h-4 text-brand-primary/70" /> {job.location || 'N/A'}</div>
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100/50"><Clock className="w-4 h-4 text-brand-primary/70" /> {formatEnumString(job.employmentType) || 'Full Time'}</div>
                  {job.experience && (
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100/50"><Briefcase className="w-4 h-4 text-brand-primary/70" /> {job.experience}</div>
                  )}
                </div>

                <div className="relative z-10 pt-5 border-t border-slate-100 mt-auto flex justify-end">
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
