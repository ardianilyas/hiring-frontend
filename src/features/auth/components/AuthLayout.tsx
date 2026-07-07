import { Layers, Star } from 'lucide-react';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex bg-slate-50 dark:bg-slate-950">
      {/* Left side - Forms */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-12">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 mb-auto">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white">
            <Layers className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white">AcmeCorp Hiring</span>
        </div>

        {/* Form Container with Card Style */}
        <div className="w-full max-w-md mx-auto my-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 sm:p-10">
          {children}
        </div>

        <div className="mt-auto text-sm text-slate-500 dark:text-slate-400 text-center">
          &copy; {new Date().getFullYear()} AcmeCorp. All rights reserved.
        </div>
      </div>

      {/* Right side - Presentation */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#4461f2] p-12 lg:p-24 text-white flex-col justify-center relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-400 opacity-20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="relative z-10 max-w-xl flex flex-col h-full justify-center">
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-medium leading-tight mb-6">
              Streamline our internal hiring process
            </h1>
            <p className="text-blue-100 text-lg">
              Manage job postings, review applications, and find the perfect fit for our open roles seamlessly.
            </p>
          </div>

          {/* Testimonial Card (Glassmorphism) */}
          <div className="mt-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 lg:p-8">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-lg font-medium leading-relaxed mb-6">
              "This internal tool has completely transformed how quickly we fill roles across departments. The unified pipeline is a game changer for our HR team."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-300 flex items-center justify-center text-blue-900 font-bold text-lg">
                SJ
              </div>
              <div>
                <h4 className="font-semibold text-white">Sarah Jenkins</h4>
                <p className="text-sm text-blue-200">Head of Talent Acquisition</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
