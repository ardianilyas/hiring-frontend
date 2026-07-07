import { Button } from '@/components/ui/button';
import { MapPin, Clock, Briefcase } from 'lucide-react';

const jobs = [
  {
    id: 1,
    title: "Senior Backend Engineer",
    department: "Engineering",
    location: "Jakarta",
    type: "Full Time",
    experience: "3+ Years",
    description: "Build scalable backend services and APIs for internal platforms.",
    salary: "Competitive"
  },
  {
    id: 2,
    title: "Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full Time",
    experience: "2+ Years",
    description: "Develop modern and responsive web applications using React.",
    salary: "Competitive"
  },
  {
    id: 3,
    title: "Product Manager",
    department: "Product",
    location: "Bandung",
    type: "Full Time",
    experience: "4+ Years",
    description: "Collaborate with engineering and business teams to deliver product value.",
    salary: "Competitive"
  },
  {
    id: 4,
    title: "QA Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full Time",
    experience: "2+ Years",
    description: "Ensure quality across all product releases through automated testing.",
    salary: "Competitive"
  },
  {
    id: 5,
    title: "UI/UX Designer",
    department: "Design",
    location: "Jakarta",
    type: "Full Time",
    experience: "3+ Years",
    description: "Design intuitive interfaces and user experiences for our core products.",
    salary: "Competitive"
  },
  {
    id: 6,
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Remote",
    type: "Full Time",
    experience: "4+ Years",
    description: "Maintain and scale our cloud infrastructure and deployment pipelines.",
    salary: "Competitive"
  }
];

export function JobListingsSection() {
  return (
    <section id="jobs" className="py-24 bg-brand-light">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="text-center mb-16 animate-in slide-in-from-bottom-8 duration-700 fade-in fill-mode-both view-in">
          <h2 className="text-4xl font-bold text-brand-secondary mb-4">Open Positions</h2>
          <p className="text-lg text-brand-gray">Explore current internal opportunities across departments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job, index) => (
            <div 
              key={job.id} 
              className="group bg-white p-6 rounded-2xl border border-brand-border shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-brand-primary transition-all duration-300 flex flex-col h-full animate-in slide-in-from-bottom-8 fade-in fill-mode-both view-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-primary/10 text-brand-primary mb-4">
                  {job.department}
                </span>
                <h3 className="text-xl font-bold text-brand-secondary mb-2">{job.title}</h3>
                <p className="text-brand-gray text-sm line-clamp-2">{job.description}</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-brand-gray mb-6 flex-grow">
                <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</div>
                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {job.type}</div>
                <div className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {job.experience}</div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-brand-border mt-auto">
                <span className="text-sm font-medium text-brand-secondary">{job.salary}</span>
                <Button variant="outline" className="rounded-xl border-brand-border group-hover:border-brand-primary group-hover:text-brand-primary transition-colors">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
