import { useEffect } from 'react';
import { Users, TrendingUp, Heart, Shield, Linkedin, Mail } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { JobBoard } from '@/components/careers/JobBoard';
import { LinkedInFeed } from '@/components/LinkedInFeed';
import { cultureLinkedinPosts } from '@/data/linkedinPosts';
import { CAREERS_EMAIL, LINKEDIN_COMPANY_URL, applyMailto } from '@/data/jobs';

const benefits = [
  { icon: TrendingUp, title: "Growth & Development", desc: "Structured career paths, the Leadership Development Programme, and cross-functional exposure across 6 business divisions." },
  { icon: Users, title: "Team of 1,200+", desc: "Join a diverse, professional team that has been moving the UAE forward since 1976." },
  { icon: Heart, title: "People-First Culture", desc: "Built on our F.A.I.R. values: Fearless, Accountable, Innovative, Respectful." },
  { icon: Shield, title: "Stability & Heritage", desc: "Nearly 50 years of operational excellence and a fleet of 12,000+ vehicles across the UAE." },
];

export default function CareersPage() {
  const [benefitsRef, benefitsVisible] = useScrollAnimation();
  const [listingsRef, listingsVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Careers | Open Roles at Eurogulf Mobility Group | Dubai, UAE"; }, []);

  return (
    <div data-testid="careers-page">
      <section data-testid="careers-hero" className="relative min-h-[60vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#EE5A01]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-[#EE5A01] uppercase mb-4 block animate-fade-in">We're Hiring</span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">Grow Your Career With Us</h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Join a group that keeps people, businesses and operations moving. From airport counters and workshops to data, finance and sales, our open roles span every part of the mobility business.
          </p>
          <div className="flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <a href="#openings" data-testid="careers-view-openings" className="btn-primary inline-block">View Open Positions</a>
            <a href={LINKEDIN_COMPANY_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost inline-flex items-center gap-2"><Linkedin className="w-4 h-4" /> Follow on LinkedIn</a>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={benefitsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${benefitsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-4">Why Eurogulf Mobility Group</h2>
            <p className="font-body text-[#666666] max-w-lg mx-auto">Be part of a legacy that has been shaping the UAE's mobility landscape for nearly five decades.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-[#111111] border border-white/5 p-7 hover:border-[#EE5A01]/30 transition-all">
                <b.icon className="w-8 h-8 text-[#EE5A01] mb-4" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-base text-[#EEEDE7] mb-2">{b.title}</h3>
                <p className="font-body text-sm text-[#666666] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="openings" data-testid="careers-listings" className="bg-black py-20 sm:py-28">
        <div ref={listingsRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-8 ${listingsVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-4">Open Positions</h2>
          </div>
          <JobBoard lang="en" />
        </div>
      </section>

      <LinkedInFeed posts={cultureLinkedinPosts} lang="en" eyebrow="Life at Eurogulf" title="Culture, Learning and Recognition" testId="careers-culture-feed" />

      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-4">Don't See Your Role?</h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">Send your CV to {CAREERS_EMAIL} and we will keep you in mind for future opportunities across the group.</p>
          <a href={applyMailto("General Application")} data-testid="careers-send-cv" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111111] transition-colors inline-flex items-center gap-2">
            <Mail className="w-4 h-4" /> Send Your CV
          </a>
        </div>
      </section>
    </div>
  );
}
