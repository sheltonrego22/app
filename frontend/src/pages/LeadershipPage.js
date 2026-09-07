import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { LeaderCard } from '@/components/LeadershipSection';
import { founders, leaders } from '@/data/leadership';

const HERO_IMG = "https://customer-assets.emergentagent.com/job_egmg-premium/artifacts/cmkxgqfh_image.png";

export default function LeadershipPage() {
  const [ownersRef, ownersVisible] = useScrollAnimation();
  const [leadersRef, leadersVisible] = useScrollAnimation();

  useEffect(() => { document.title = "Leadership | Eurogulf Mobility Group"; }, []);

  return (
    <div data-testid="leadership-page">
      <section data-testid="leadership-hero" className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Eurogulf Mobility Group Leadership" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16 pt-32">
          <p className="font-mono text-xs tracking-[0.3em] text-[#EE5A01] uppercase mb-4 animate-fade-in">The People Behind the Movement</p>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight animate-fade-in-up">Leadership</h1>
        </div>
      </section>

      <section className="bg-black py-20 sm:py-28">
        <div ref={ownersRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${ownersVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-4">Our Founders</h2>
            <p className="font-body text-[#666666] max-w-xl mx-auto">The visionary founders who established Eurogulf Mobility Group in 1976 and built it into one of the UAE's most trusted mobility conglomerates.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {founders.map((o, i) => <LeaderCard key={o.id} person={o} lang="en" isFounder index={i} />)}
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div ref={leadersRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${leadersVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-4">Senior Leadership Team</h2>
            <p className="font-body text-[#666666] max-w-xl mx-auto">A diverse team of industry professionals driving Eurogulf Mobility Group's strategic vision, operational excellence, and continued growth across the UAE.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {leaders.map((l, i) => <LeaderCard key={l.id} person={l} lang="en" isFounder={false} index={i + 2} />)}
          </div>
        </div>
      </section>

      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-4">Join Our Team</h2>
          <p className="font-body text-black/70 mb-8 max-w-lg mx-auto">With 1,200+ professionals, Eurogulf Mobility Group offers career paths that make a difference. Be part of the movement.</p>
          <Link to="/careers" data-testid="leadership-careers-cta" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111111] transition-colors inline-block">Explore Careers</Link>
        </div>
      </section>
    </div>
  );
}
