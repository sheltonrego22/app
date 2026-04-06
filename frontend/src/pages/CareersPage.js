import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, ChevronDown, ChevronUp, Send, Users, TrendingUp, Heart, Shield } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { SEO } from '@/components/SEO';

const jobListings = [
  { title: "Bus Driver", dept: "Operations" },
  { title: "Mobile Service Mechanic", dept: "Workshop" },
  { title: "SOP Administrator", dept: "Operations" },
  { title: "Technician", dept: "Workshop" },
  { title: "Car Wash Cleaner", dept: "Operations" },
  { title: "BDE / Client Solution Specialist", dept: "Sales" },
  { title: "Recovery Driver", dept: "Operations" },
  { title: "Drivers (Permanent)", dept: "Operations" },
  { title: "Accounts Assistant", dept: "Finance" },
  { title: "Senior Manager - Employee Relations", dept: "HR" },
  { title: "Rental Agent", dept: "Sales" },
  { title: "HSE Officer", dept: "Operations" },
  { title: "RAK Rental Agent", dept: "Sales" },
  { title: "Graphic Designer", dept: "Marketing" },
  { title: "National Sales Manager", dept: "Sales" },
  { title: "Mechanic - G3", dept: "Workshop" },
  { title: "Painter - G3", dept: "Workshop" },
  { title: "Wheel Service Technician", dept: "Workshop" },
  { title: "Airport Shift In-Charge", dept: "Operations" },
  { title: "Call Centre Agent", dept: "Sales" },
  { title: "Heavy Driver (DRC)", dept: "Operations" },
  { title: "Heavy Driver (EK)", dept: "Operations" },
  { title: "Light Driver (ET)", dept: "Operations" },
  { title: "Light Driver (Garage)", dept: "Operations" },
  { title: "Learning & Development Executive", dept: "HR" },
  { title: "PRO", dept: "Admin" },
];

const departments = ["All", ...new Set(jobListings.map(j => j.dept))];

const benefits = [
  { icon: TrendingUp, title: "Growth & Development", desc: "Structured career paths, training programs, and cross-functional exposure across 6 business divisions." },
  { icon: Users, title: "Team of 1,200+", desc: "Join a diverse, professional team that has been moving the UAE forward since 1976." },
  { icon: Heart, title: "People-First Culture", desc: "Built on our F.A.I.R. values — Fearless, Accountable, Innovative, Respectful." },
  { icon: Shield, title: "Stability & Heritage", desc: "Nearly 50 years of operational excellence and a fleet of 12,000+ vehicles across 14 locations." },
];

export default function CareersPage() {
  const [activeDept, setActiveDept] = useState("All");
  const [expandedJob, setExpandedJob] = useState(null);
  const [benefitsRef, benefitsVisible] = useScrollAnimation();
  const [listingsRef, listingsVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Careers — Join Our Team | EGMG"; }, []);

  const filtered = activeDept === "All" ? jobListings : jobListings.filter(j => j.dept === activeDept);

  return (
    <div data-testid="careers-page">
      <SEO title="Careers" description="Join EGMG — the UAE's most diversified mobility group. 26+ open positions across operations, sales, finance, HR, and more. 1,200+ employees, 14 locations." path="/careers" />
      {/* HERO */}
      <section data-testid="careers-hero" className="relative min-h-[60vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#EE5A01]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-[#EE5A01] uppercase mb-4 block animate-fade-in">We're Hiring</span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Grow Your Career With Us
          </h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Join the team behind the UAE's most diversified mobility group. With over 1,200 employees across 14 locations, EGMG offers a dynamic environment where your talent drives real impact.
          </p>
          <a href="#openings" className="btn-primary inline-block animate-fade-in" style={{ animationDelay: '0.4s' }}>
            View Open Positions
          </a>
        </div>
      </section>

      {/* WHY EGMG */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={benefitsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${benefitsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-4">
              Why EGMG
            </h2>
            <p className="font-body text-[#666666] max-w-lg mx-auto">Be part of a legacy that has been shaping the UAE's mobility landscape for nearly five decades.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div key={i} data-testid={`career-benefit-${i}`} className={`bg-[#111111] border border-white/5 p-7 hover:border-[#EE5A01]/30 transition-all ${benefitsVisible ? 'scroll-visible' : 'scroll-hidden'} stagger-${i + 1}`}>
                <b.icon className="w-8 h-8 text-[#EE5A01] mb-4" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-base text-[#EEEDE7] mb-2">{b.title}</h3>
                <p className="font-body text-sm text-[#666666] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOB LISTINGS */}
      <section id="openings" data-testid="careers-listings" className="bg-black py-20 sm:py-28">
        <div ref={listingsRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 ${listingsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-4">
              Open Positions
            </h2>
            <p className="font-body text-[#666666]">{jobListings.length} roles available across the group</p>
          </div>

          {/* Department filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {departments.map((d) => (
              <button
                key={d}
                data-testid={`dept-filter-${d}`}
                onClick={() => setActiveDept(d)}
                className={`font-heading font-bold text-xs tracking-[0.1em] uppercase px-4 py-2 transition-all ${
                  activeDept === d
                    ? "bg-[#EE5A01] text-black"
                    : "bg-[#111111] text-[#666666] border border-white/10 hover:border-[#EE5A01]/40 hover:text-[#EEEDE7]"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Job cards */}
          <div className="space-y-3">
            {filtered.map((job, i) => (
              <div
                key={i}
                data-testid={`job-card-${i}`}
                className="bg-[#111111] border border-white/5 hover:border-[#EE5A01]/20 transition-all"
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setExpandedJob(expandedJob === i ? null : i)}
                >
                  <div className="flex items-center gap-4">
                    <Briefcase className="w-5 h-5 text-[#EE5A01] flex-shrink-0" />
                    <div>
                      <h3 className="font-heading font-bold text-sm text-[#EEEDE7]">{job.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="font-mono text-[10px] text-[#EE5A01] tracking-wider uppercase">{job.dept}</span>
                        <span className="flex items-center gap-1 text-[#666666]">
                          <MapPin className="w-3 h-3" />
                          <span className="font-body text-[10px]">Dubai, UAE</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  {expandedJob === i ? <ChevronUp className="w-4 h-4 text-[#EE5A01]" /> : <ChevronDown className="w-4 h-4 text-[#666666]" />}
                </button>
                {expandedJob === i && (
                  <div className="px-5 pb-5 border-t border-white/5 pt-4">
                    <p className="font-body text-sm text-[#666666] mb-4">
                      We are looking for a talented {job.title} to join our {job.dept} team. If you are passionate about mobility and want to grow with the UAE's largest diversified transport group, apply today.
                    </p>
                    <a
                      href="mailto:wemoveyou@eurogulf.ae"
                      data-testid={`apply-btn-${i}`}
                      className="inline-flex items-center gap-2 bg-[#EE5A01] text-black font-heading font-bold text-xs tracking-[0.05em] px-5 py-2.5 hover:bg-[#F17B34] transition-colors"
                    >
                      <Send className="w-3 h-3" />
                      Apply via Email
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center font-body text-[#666666] py-12">No openings in this department right now.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-4">
            Don't See Your Role?
          </h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">
            Send us your CV and we will keep you in mind for future opportunities.
          </p>
          <a href="mailto:wemoveyou@eurogulf.ae" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111111] transition-colors inline-block">
            Send Your CV
          </a>
        </div>
      </section>
    </div>
  );
}
