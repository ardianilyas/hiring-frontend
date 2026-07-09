import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 animate-in fade-in duration-700">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-400">
          404
        </h1>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-brand-secondary dark:text-slate-100">
            Page not found
          </h2>
          <p className="text-brand-gray dark:text-slate-400 max-w-md mx-auto text-lg">
            Sorry, we couldn't find the page you're looking for. It might have been removed, renamed, or did not exist in the first place.
          </p>
        </div>
        <div className="pt-8">
          <Button render={<Link to="/" />}>
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Home
          </Button>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none w-full max-w-3xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-3xl mix-blend-multiply" />
      </div>
    </div>
  );
}
