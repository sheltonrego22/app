import { useEffect } from 'react';
import { Linkedin } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const HERO_IMG = "https://customer-assets.emergentagent.com/job_egmg-premium/artifacts/cmkxgqfh_image.png";

const owners = [
  { name: "Sharafuddin Sharaf", role: "Owner", initials: "SS" },
  { name: "Abdul Rahman Mohammed Taher", role: "Owner", initials: "AT" },
];

const leaders = [
  { name: "Essa Sharaf", role: "Group Director", initials: "ES", desc: "Essa is responsible for steering group-wide initiatives and supporting cross-functional leadership. He works closely with all teams to ensure strategic objectives are executed with discipline and purpose." },
  { name: "Marius Anton", role: "GM – Sales and Operations", initials: "MA", desc: "Marius leads the commercial operations of EGMG with a focus on revenue growth, market expansion, and customer-centric innovation. He plays a key role in integrating emerging technologies and optimizing business performance." },
  { name: "Rajesh Kuttinath", role: "Group Finance Controller", initials: "RK", desc: "Rajesh manages the financial health of the organization, overseeing reporting, compliance, and financial strategy. His role supports sound decision-making across all business units." },
  { name: "Jonathan Lavender", role: "Director of People, Process and Technology", initials: "JL", desc: "Jonathan oversees the integration of people strategy, operational processes, and technology solutions to drive organizational efficiency and digital transformation across the group." },
  { name: "Mohamad Ali Al Maazmi", role: "Director – Commercial & Government Affairs", initials: "MM", desc: "Mohamad manages commercial partnerships and government relations, ensuring EGMG maintains strong institutional relationships and regulatory compliance across all Emirates." },
  { name: "Omar Al Osaimi", role: "Director – Government & Employee Relations", initials: "OA", desc: "Omar leads government liaison and employee relations initiatives, fostering productive relationships with regulatory bodies and ensuring a positive workplace environment." },
  { name: "Mari Parian", role: "Director – People and Culture", initials: "MP", desc: "Mari drives the people agenda at EGMG, fostering a culture of inclusion, performance, and continuous learning. Her work ensures that talent development aligns with business objectives." },
];

function LeaderCard({ leader, index, isOwner }) {
  const [ref, visible] = useScrollAnimation();
  return (
    <div
      ref={ref}
      data-testid={`leader-card-${index}`}
      className={`group ${visible ? 'scroll-visible' : 'scroll-hidden'} stagger-${(index % 4) + 1}`}
    >
      <div className={`${isOwner ? 'bg-[#111111]' : 'bg-[#111111]'} border border-white/5 overflow-hidden hover:border-[#EE5A01]/30 transition-all duration-300`}>
        {/* Avatar */}
        <div className={`${isOwner ? 'h-64' : 'h-52'} bg-gradient-to-br from-[#EE5A01]/20 to-[#0a0a0a] flex items-center justify-center relative`}>
          <span className={`font-heading font-black ${isOwner ? 'text-6xl' : 'text-5xl'} text-[#EE5A01]/30 group-hover:text-[#EE5A01]/50 transition-colors`}>
            {leader.initials}
          </span>
          {isOwner && (
            <div className="absolute top-4 right-4">
              <span className="font-mono text-[10px] tracking-[0.15em] text-[#EE5A01] bg-[#EE5A01]/10 px-3 py-1 uppercase">Founder</span>
            </div>
          )}
        </div>
        {/* Info */}
        <div className="p-6">
          <h3 className="font-heading font-bold text-lg text-[#EEEDE7] mb-1">{leader.name}</h3>
          <p className="font-mono text-xs text-[#EE5A01] tracking-wider uppercase mb-3">{leader.role}</p>
          {leader.desc && (
            <p className="font-body text-sm text-[#666666] leading-relaxed">{leader.desc}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LeadershipPage() {
  const [heroRef, heroVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Leadership — EGMG | Eurogulf Mobility Group"; }, []);

  return (
    <div data-testid="leadership-page">
      {/* ═══ HERO ═══ */}
      <section data-testid="leadership-hero" className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="EGMG Leadership" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16 pt-32">
          <p className="font-mono text-xs tracking-[0.2em] text-[#EE5A01] uppercase mb-4 animate-fade-in">The People Behind the Movement</p>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight animate-fade-in-up">
            Leadership
          </h1>
        </div>
      </section>

      {/* ═══ OWNERS ═══ */}
      <section data-testid="owners-section" className="bg-black py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-4">
              Our Founders
            </h2>
            <p className="font-body text-[#666666] max-w-xl mx-auto">
              The visionary founders who established Eurogulf Mobility Group in 1976 and built it into one of the UAE's most trusted mobility conglomerates.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {owners.map((o, i) => (
              <LeaderCard key={o.name} leader={o} index={i} isOwner={true} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SENIOR LEADERSHIP ═══ */}
      <section data-testid="senior-leadership-section" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={heroRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${heroVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-4">
              Senior Leadership Team
            </h2>
            <p className="font-body text-[#666666] max-w-xl mx-auto">
              A diverse team of industry professionals driving EGMG's strategic vision, operational excellence, and continued growth across the UAE.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {leaders.map((l, i) => (
              <LeaderCard key={l.name} leader={l} index={i + 2} isOwner={false} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CULTURE CTA ═══ */}
      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-4">
            Join Our Team
          </h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">
            With over 1,200 professionals across 14 locations, EGMG offers careers that make an impact. Be part of the movement.
          </p>
          <a href="mailto:wemoveyou@eurogulf.ae" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111111] transition-colors inline-block">
            Explore Careers
          </a>
        </div>
      </section>
    </div>
  );
}
