import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { ArrowLeft, MapPin, Briefcase, BadgeCheck, Bookmark, MoreHorizontal, Zap, Sparkles, CircleDollarSign, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useJobOpeningDetail } from '../hooks/useJobOpeningDetail';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSubmitApplication, useMyApplications } from '../../applications/hooks/useApplications';
import { useAuthStore } from '@/shared/store/authStore';

const applicationSchema = z.object({
  resume: z.string().url('Please enter a valid URL to your resume (e.g. LinkedIn, Google Drive, Personal Site)'),
  coverLetter: z.string().optional(),
});
type ApplicationFormValues = z.infer<typeof applicationSchema>;

export function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useJobOpeningDetail(id || null);
  const [open, setOpen] = useState(false);
  const submitApplication = useSubmitApplication();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const { data: myAppsData, isLoading: isLoadingApps } = useMyApplications(undefined, isAuthenticated);
  const hasApplied = myAppsData?.data?.some(app => app.jobOpeningId === id);

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      resume: '',
      coverLetter: '',
    }
  });

  const onSubmit = (values: ApplicationFormValues) => {
    if (!id) return;
    submitApplication.mutate(
      { jobOpeningId: id, ...values },
      {
        onSuccess: () => {
          setOpen(false);
          form.reset();
        },
        onError: (error: any) => {
          if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
            error.response.data.errors.forEach((err: any) => {
              if (err.field) {
                form.setError(err.field as any, {
                  type: 'server',
                  message: err.message,
                });
              }
            });
          }
        }
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-brand-gray text-lg animate-pulse">Loading job details...</p>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <p className="text-red-500 text-lg">Failed to load job details or job not found.</p>
        <Button onClick={() => navigate(-1)} variant="outline">Go Back</Button>
      </div>
    );
  }

  const job = data.data;

  // Extract first sentence for the short subtitle
  const firstSentence = job.description 
    ? job.description.split('.')[0] + '.' 
    : 'Join our team and help us build amazing experiences.';

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-32">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link to="/#jobs" />} className="flex items-center gap-2">
                <ArrowLeft className="w-3.5 h-3.5" />
                Openings
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{job.department?.name || 'Internal Team'}</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-gray-900">{job.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex gap-4 items-center">
            <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center shrink-0">
              {/* Mock Logo (like Spotify) */}
              <div className="w-8 h-8 bg-green-500 rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-gray-700 font-medium text-lg">{job.department?.name || 'Internal Team'}</span>
                <BadgeCheck className="w-5 h-5 text-blue-500 fill-blue-50" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                {job.title}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-gray-200">
              <Bookmark className="w-4 h-4 text-gray-600" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-gray-200">
              <MoreHorizontal className="w-4 h-4 text-gray-600" />
            </Button>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm mb-6">
          <div className="flex items-center gap-2"><Briefcase className="w-4 h-4" /> {job.employmentType || 'Full-time'}</div>
          <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {job.location || 'Remote'}</div>
          {job.salary && (
            <div className="flex items-center gap-2"><CircleDollarSign className="w-4 h-4" /> {job.salary}</div>
          )}
        </div>

        {/* Short Summary */}
        <p className="text-gray-600 mb-8 text-base">
          {firstSentence}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <Dialog open={open} onOpenChange={(newOpen) => {
            if (hasApplied) return;
            if (newOpen && !isAuthenticated) {
              navigate('/sign-in');
              return;
            }
            setOpen(newOpen);
          }}>
            <DialogTrigger render={<Button disabled={hasApplied || isLoadingApps} className="bg-[#2D68F0] hover:bg-[#2557c9] text-white rounded-full px-6 py-5 text-base font-medium flex items-center gap-2 disabled:bg-gray-300 disabled:text-gray-500" />}>
              <Zap className={`w-4 h-4 ${hasApplied ? 'fill-gray-500' : 'fill-white'}`} />
              {hasApplied ? 'Applied' : 'Easy apply'}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Apply for {job.title}</DialogTitle>
                <DialogDescription>
                  Submit your resume link and an optional cover letter below. Our hiring team will review your application shortly.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="resume">Resume Link <span className="text-red-500">*</span></Label>
                  <Input 
                    id="resume"
                    placeholder="https://linkedin.com/in/..." 
                    {...form.register('resume')} 
                  />
                  {form.formState.errors.resume && (
                    <p className="text-sm text-red-500">{form.formState.errors.resume.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
                  <Textarea 
                    id="coverLetter"
                    placeholder="Why are you a great fit for this role?" 
                    className="min-h-[120px]"
                    {...form.register('coverLetter')} 
                  />
                  {form.formState.errors.coverLetter && (
                    <p className="text-sm text-red-500">{form.formState.errors.coverLetter.message}</p>
                  )}
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={submitApplication.isPending}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#2D68F0] hover:bg-[#2557c9] text-white" disabled={submitApplication.isPending}>
                    {submitApplication.isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</> : 'Submit Application'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="rounded-full px-6 py-5 text-base font-medium flex items-center gap-2 border-gray-200">
            <Sparkles className="w-4 h-4 text-blue-500" />
            Create resume
          </Button>
        </div>

        {/* Stats Card */}
        <div className="border border-gray-200 rounded-2xl p-6 mb-12 overflow-x-auto">
          <div className="flex items-center min-w-[600px] justify-between">
            <div className="flex-1 pr-6 border-r border-gray-200">
              <p className="text-gray-500 text-sm mb-2">Experience Level</p>
              <p className="text-gray-900 font-medium text-lg">{job.experience || 'Not specified'}</p>
            </div>
            <div className="flex-1 px-6 border-r border-gray-200">
              <p className="text-gray-500 text-sm mb-2">Number of Applicants</p>
              <p className="text-gray-900 font-medium text-lg">50+ applicants</p>
            </div>
            <div className="flex-1 px-6 border-r border-gray-200">
              <p className="text-gray-500 text-sm mb-2">Matched Applicants</p>
              <p className="text-gray-900 font-medium text-lg">40+ matched</p>
            </div>
            <div className="flex-1 pl-6">
              <p className="text-gray-500 text-sm mb-2">Last Reviewed</p>
              <p className="text-gray-900 font-medium text-lg">1d ago</p>
            </div>
          </div>
        </div>

        {/* Details Content */}
        <div className="space-y-10 max-w-3xl">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">About the Role</h2>
            <div className="text-gray-600 leading-relaxed whitespace-pre-line text-[15px]">
              {job.description}
            </div>
          </section>

          {/* Render fallback sections for visual demonstration if they don't exist in the text */}
          {!job.description.toLowerCase().includes('responsibilities') && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Responsibilities</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 text-[15px]">
                <li>Collaborate with cross-functional teams to define goals.</li>
                <li>Ensure consistency across all internal platforms.</li>
                <li>Present and justify decisions based on data.</li>
              </ul>
            </section>
          )}

          {!job.description.toLowerCase().includes('requirements') && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 text-[15px]">
                <li>{job.experience || '3+ years'} of relevant experience.</li>
                <li>Strong communication and collaboration skills.</li>
                <li>Familiarity with our tech stack and tools.</li>
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
