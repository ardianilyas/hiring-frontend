import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { JobListingsSection } from '../components/JobListingsSection';
import { Footer } from '../components/Footer';

export function LandingPage() {
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
