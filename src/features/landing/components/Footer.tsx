import { Layers } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  return (
    <footer id="contact" className="bg-brand-secondary text-white py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-primary text-white">
                <Layers className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight">HireFlow</span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              Internal Hiring Platform built for modern companies.
            </p>
          </div>
          
          {/* Middle */}
          <div>
            <h4 className="font-semibold mb-6">Navigation</h4>
            <div className="flex flex-col gap-4 text-sm text-gray-400">
              <Link to="/#jobs" className="hover:text-white transition-colors">Jobs</Link>
            </div>
          </div>
          
          {/* Right */}
          <div>
            <h4 className="font-semibold mb-6">Contact</h4>
            <div className="flex flex-col gap-4 text-sm text-gray-400">
              <a href="mailto:hello@hireflow.com" className="hover:text-white transition-colors">hello@hireflow.com</a>
              <a href="tel:+1234567890" className="hover:text-white transition-colors">+1 (555) 123-4567</a>
              <span className="hover:text-white transition-colors">123 Tech Avenue, San Francisco, CA</span>
            </div>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800 text-sm text-gray-500 text-center md:text-left">
          Copyright &copy; 2026 HireFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
