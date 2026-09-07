import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, ShieldCheck, Handshake, Headphones, Map, Award, Leaf, Phone } from 'lucide-react';
import { SectionHeader } from '@/components/home/CoreSections';
import { WHY, CLIENTS, AWARDS } from '@/data/home';
import { logError } from '@/utils/logger';

const API = process.env.REACT_APP_BACKEND_URL;
const ICONS = [ShieldCheck, Handshake, Headphones, Map];

export function WhyEurogulf() {
  return (
    <section data-testid="why-section" className="bg-[#121212] py-20 sm:py-28 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <SectionHeader chip="Why Eurogulf" title="Half a century of trust, renewed every day." desc="Leadership in mobility is earned through consistency. These are the standards every brand in the group is held to." dark />
          <div className="mt-8 flex flex-wrap gap-2">
            {AWARDS.map((a) => (
              <span key={a} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 font-body text-xs text-white/75"><Award className="w-3.5 h-3.5 text-[#EE5A01]" /> {a}</span>
            ))}
          </div>
        </div>
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {WHY.map((w, i) => {
            const Icon = ICONS[i];
            return (
              <div key={w.title} data-testid={`why-card-${i}`} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:border-[#EE5A01]/60 hover:bg-white/[0.07] transition-colors">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#EE5A01] text-white"><Icon className="w-5 h-5" /></span>
                <h3 className="mt-4 font-heading font-bold text-base text-white">{w.title}</h3>
                <p className="mt-2 font-body text-sm text-white/65 leading-relaxed">{w.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function TrustedBy() {
  return (
    <section data-testid="clients-section" className="bg-white py-14 border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center font-heading font-bold text-[11px] tracking-[0.2em] uppercase text-[#666666]">Trusted by the UAE's leading organisations</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {CLIENTS.map((c) => (
            <img key={c.name} src={c.url} alt={c.name} title={c.name} loading="lazy" className="h-8 sm:h-10 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function LatestNews() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    axios.get(`${API}/api/articles?limit=3`).then(({ data }) => setArticles(data.articles || [])).catch((err) => logError('Home news', err));
  }, []);
  if (articles.length === 0) return null;
  return (
    <section data-testid="news-section" className="bg-[#FAFAFA] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <SectionHeader chip="Media Center" title="Latest from the group." />
          <Link to="/media" data-testid="news-view-all" className="btn-outline w-fit">All news <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {articles.map((a) => (
            <Link key={a.id} to={`/media/${a.id}`} data-testid={`news-card-${a.id}`} className="card-light group overflow-hidden">
              <div className="h-44 overflow-hidden bg-[#EEEDE7]">
                {a.image_url ? <img src={a.image_url} alt={a.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /> : <div className="h-full w-full bg-gradient-to-br from-[#EE5A01] to-[#F17B34]" />}
              </div>
              <div className="p-5">
                <span className="chip-outline">{a.category}</span>
                <h3 className="mt-3 font-heading font-bold text-base text-[#121212] leading-snug group-hover:text-[#EE5A01] transition-colors line-clamp-2">{a.title}</h3>
                <p className="mt-2 font-body text-xs text-[#666666]">{new Date(a.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SustainabilityTeaser() {
  return (
    <section data-testid="sustainability-teaser" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/sustainability" className="group flex flex-col md:flex-row items-start md:items-center gap-6 rounded-2xl border border-black/5 bg-[#F5F5F3] p-6 md:p-8 hover:border-[#EE5A01]/40 transition-colors">
          <span className="grid h-14 w-14 place-items-center rounded-xl bg-[#121212] text-[#EE5A01] flex-shrink-0"><Leaf className="w-6 h-6" /></span>
          <div className="flex-1">
            <h3 className="font-heading font-bold text-lg text-[#121212]">Moving towards a greener UAE</h3>
            <p className="mt-1 font-body text-sm text-[#666666]">Hybrid and electric fleet growth, telematics-driven efficiency and responsible vehicle life-cycles, aligned with UAE Net Zero 2050.</p>
          </div>
          <span className="inline-flex items-center gap-1 font-heading font-bold text-sm text-[#EE5A01] group-hover:gap-2 transition-all">Our roadmap <ArrowRight className="w-4 h-4" /></span>
        </Link>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section data-testid="final-cta" className="relative overflow-hidden bg-[#EE5A01] py-20 sm:py-24">
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[#F17B34] [clip-path:polygon(30%_0,100%_0,100%_100%,0_100%)]" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div className="max-w-2xl">
          <p className="font-heading font-black text-sm tracking-[0.2em] uppercase text-white/80">We Move You!</p>
          <h2 className="mt-3 font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.05] tracking-tight">Let us move you forward.</h2>
          <p className="mt-4 font-body text-base text-white/85 max-w-lg">Tell us about your journey or your fleet. A specialist will get back to you within one working day.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/contact" data-testid="final-cta-quote" className="btn-secondary">Get a Quote <ArrowRight className="w-4 h-4" /></Link>
          <a href="tel:800364" dir="ltr" data-testid="final-cta-call" className="btn-outline !border-white !text-white hover:!bg-white hover:!text-[#EE5A01]"><Phone className="w-4 h-4" /> 800 364</a>
        </div>
      </div>
    </section>
  );
}
