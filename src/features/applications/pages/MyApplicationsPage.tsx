import { useMyApplications } from '../hooks/useApplications';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, ExternalLink, Calendar, Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { formatEnumString } from '@/lib/utils';
import { Navbar } from '@/features/landing/components/Navbar';
import { Footer } from '@/features/landing/components/Footer';

export function MyApplicationsPage() {
  const { data, isLoading, isError } = useMyApplications();

  const applications = data?.data || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
      case 'reviewing':
        return 'bg-amber-100 text-amber-700 hover:bg-amber-200';
      case 'interview':
        return 'bg-purple-100 text-purple-700 hover:bg-purple-200';
      case 'accepted':
        return 'bg-green-100 text-green-700 hover:bg-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 hover:bg-red-200';
      default:
        return 'bg-slate-100 text-slate-700 hover:bg-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-24">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 md:px-8 max-w-5xl py-12 min-h-[calc(100vh-12rem)]">
        <div className="mb-8 flex items-center gap-4">
          <Link to="/">
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Applications</h1>
            <p className="text-slate-500 mt-1">Track the status of the jobs you've applied for.</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-brand-primary/50 mb-4" />
            <p className="text-slate-500">Loading your applications...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-red-100 shadow-sm">
            <p className="text-red-500 font-medium">Failed to load applications.</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Briefcase className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No applications yet</h3>
            <p className="text-slate-500 mb-6 max-w-sm">You haven't applied to any internal positions yet. Explore our open roles and find your next opportunity.</p>
            <Link to="/#jobs">
              <Button className="bg-brand-secondary text-white rounded-full px-6">
                Browse Jobs
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6 items-start sm:items-center hover:shadow-md transition-shadow">
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-900">
                      {app.jobOpening?.title || 'Unknown Role'}
                    </h3>
                    <Badge variant="secondary" className={getStatusColor(app.status)}>
                      {formatEnumString(app.status)}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
                    {app.jobOpening?.department?.name && (
                      <span className="font-medium text-slate-700">{app.jobOpening.department.name}</span>
                    )}
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" /> {app.jobOpening?.location || 'Remote'}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4" /> {formatEnumString(app.jobOpening?.employmentType) || 'Full Time'}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" /> Applied {new Date(app.createdAt || (app as any).applied_at || (app as any).appliedAt).toLocaleDateString(undefined, { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  
                  {app.feedback && (
                    <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-700 border border-slate-100">
                      <span className="font-semibold block mb-1">Feedback from HR:</span>
                      {app.feedback}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3 w-full sm:w-auto shrink-0">
                  {app.jobOpening?.id && (
                    <Link to={`/job/${app.jobOpening.id}`} className="w-full">
                      <Button variant="outline" className="w-full justify-between">
                        View Job <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                  {app.resume && (
                    <a href={app.resume} target="_blank" rel="noopener noreferrer" className="w-full">
                      <Button variant="secondary" className="w-full">
                        View My Resume
                      </Button>
                    </a>
                  )}
                </div>
                
              </div>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
