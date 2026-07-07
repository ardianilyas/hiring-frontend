import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center bg-white pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 w-full max-w-7xl flex flex-col items-center text-center relative z-10 animate-in slide-in-from-bottom-8 duration-700 fade-in fill-mode-both">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-brand-secondary max-w-5xl mb-6 leading-tight">
          Grow Your Career <br className="hidden md:block"/> Within Our Company
        </h1>
        <p className="text-lg text-brand-gray max-w-3xl mb-10 leading-relaxed">
          Discover exclusive internal job openings, leverage your existing company knowledge, and take the next big step in your career journey with us.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 mb-20 items-center animate-in slide-in-from-bottom-4 duration-700 delay-200 fade-in fill-mode-both">
          
          <a href="#jobs" className="group">
            {/* 3-Layer Glassmorphism Border Container */}
            <div className="p-[2px] rounded-full bg-gradient-to-br from-slate-200 via-slate-100/50 to-white/40 backdrop-blur-xl shadow-md transition-all group-hover:shadow-lg group-hover:scale-105 duration-300">
              <div className="p-[2px] rounded-full bg-gradient-to-br from-white via-white/60 to-white/20 backdrop-blur-lg">
                <Button className="h-14 px-8 text-lg rounded-full bg-brand-primary/95 hover:bg-brand-primary backdrop-blur-md text-white font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] border border-transparent">
                  Browse Jobs
                </Button>
              </div>
            </div>
          </a>

          <Button variant="outline" className="h-14 px-8 text-lg rounded-full border-brand-border text-brand-secondary hover:bg-brand-light font-medium transition-all">
            Post a Job
          </Button>
        </div>

        {/* Testimonial Stack */}
        <div className="relative w-full max-w-3xl mx-auto mt-8 animate-in zoom-in-95 duration-1000 delay-300 fade-in fill-mode-both pb-12">
          
          {/* Card 1 (Bottom/Back) */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white rounded-3xl shadow-xl border border-brand-border p-8 scale-90 opacity-40 z-10 origin-bottom">
            <div className="flex gap-1 mb-4 text-brand-primary">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              ))}
            </div>
            <p className="text-brand-gray italic mb-6 text-left">
              "This portal made my internal career shift seamless. The hiring team was incredibly responsive."
            </p>
            <div className="flex items-center gap-4 text-left">
              <div className="w-10 h-10 rounded-full bg-brand-light border border-brand-border"></div>
              <div>
                <p className="font-semibold text-brand-secondary text-sm">Emily Rodriguez</p>
                <p className="text-xs text-brand-gray">UX Designer</p>
              </div>
            </div>
          </div>

          {/* Card 2 (Middle) */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white rounded-3xl shadow-xl border border-brand-border p-8 scale-95 opacity-70 z-20 origin-bottom">
            <div className="flex gap-1 mb-4 text-brand-primary">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              ))}
            </div>
            <p className="text-brand-gray italic mb-6 text-left">
              "It’s so refreshing to have full visibility into open positions across the entire organization. Highly recommend exploring."
            </p>
            <div className="flex items-center gap-4 text-left">
              <div className="w-10 h-10 rounded-full bg-brand-light border border-brand-border"></div>
              <div>
                <p className="font-semibold text-brand-secondary text-sm">Michael Chen</p>
                <p className="text-xs text-brand-gray">Senior Engineer</p>
              </div>
            </div>
          </div>

          {/* Card 3 (Top/Front) */}
          <div className="relative mx-auto w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-brand-border p-8 z-30 origin-bottom mt-12">
            <div className="flex gap-1 mb-4 text-brand-primary">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              ))}
            </div>
            <p className="text-brand-secondary font-medium text-lg italic mb-6 text-left leading-relaxed">
              "The easiest transition I've ever made. I applied on Tuesday and was in my new role by the next month, keeping all my benefits intact."
            </p>
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary font-bold">
                SJ
              </div>
              <div>
                <p className="font-semibold text-brand-secondary">Sarah Jenkins</p>
                <p className="text-sm text-brand-gray">Product Manager</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
