import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { JobListingsSection } from '../components/JobListingsSection';
import { Footer } from '../components/Footer';

export function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Small timeout ensures the DOM is fully painted before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-brand-secondary selection:bg-brand-primary selection:text-white">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <JobListingsSection />
      </main>
      <Footer />
    </div>
  );
}
