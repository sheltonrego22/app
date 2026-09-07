import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getNavData } from '@/i18n/navData';
import { PATHS, STEPS } from '@/data/home';

export function SectionHeader({ chip, title, desc, align = 'left', dark = false }) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <span className="chip-orange">{chip}</span>
      <h2 className={`mt-4 font-heading font-black text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight ${dark ? 'text-white' : 'text-[#121212]'}`}>{title}</h2>
      {desc && <p className={`mt-4 font-body text-base leading-relaxed ${dark ? 'text-white/70' : 'text-[#666666]'}`}>{desc}</p>}
    </div>
  );
}

export function BrandsGrid() {
  const { brandsLinks } = getNavData(false);
  return (
    <section data-testid="brands-section" className="bg-[#FAFAFA] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <SectionHeader chip="Our Brands" title="Seven brands. One group. Every journey covered." desc="From an airport rental to a 200-coach staff operation, each brand is built for a specific need and backed by the same 50-year-old promise." />
          <Link to="/businesses" data-testid="brands-view-all" className="btn-outline w-fit">All brands <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {brandsLinks.map((b, i) => (
            <Link key={b.id} to={b.href} data-testid={`brand-card-${b.id}`} className={`card-light group relative overflow-hidden ${i === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}`}>
              <div className={`relative overflow-hidden ${i === 0 ? 'h-56 lg:h-[calc(100%-116px)]' : 'h-40'}`}>
                <img src={b.img} alt={b.label} loading="lazy" className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${i === 0 ? 'object-[center_75%]' : ''}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {b.logo && <img src={b.logo} alt="" className="absolute left-4 bottom-4 h-7 w-auto rounded bg-white/95 px-2 py-1" />}
              </div>
              <div className="p-5">
                <h3 className="font-heading font-bold text-base text-[#121212] group-hover:text-[#EE5A01] transition-colors">{b.label}</h3>
                <p className="mt-1 font-body text-sm text-[#666666]">{b.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 font-heading font-bold text-xs text-[#EE5A01] group-hover:gap-2 transition-all">Discover <ArrowRight className="w-3.5 h-3.5" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function PathCard({ p, testid, reverse }) {
  return (
    <div data-testid={testid} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
      <div className="relative">
        <div className={`absolute -inset-3 rounded-3xl bg-[#EE5A01]/10 ${reverse ? '-rotate-2' : 'rotate-2'}`} aria-hidden="true" />
        <img src={p.img} alt={p.title} loading="lazy" className="relative h-72 sm:h-96 w-full rounded-2xl object-cover shadow-[0_24px_60px_rgba(0,0,0,0.12)]" />
      </div>
      <div>
        <SectionHeader chip={p.chip} title={p.title} desc={p.desc} />
        <div className="mt-6 flex flex-wrap gap-2">
          {p.chips.map((c) => (
            <Link key={c.href + c.label} to={c.href} className="rounded-full border border-black/10 bg-white px-4 py-2 font-heading font-semibold text-xs text-[#121212] hover:border-[#EE5A01] hover:text-[#EE5A01] transition-colors">{c.label}</Link>
          ))}
        </div>
        <Link to={p.cta.href} className="mt-8 btn-primary w-fit">{p.cta.label} <ArrowRight className="w-4 h-4" /></Link>
      </div>
    </div>
  );
}

export function PathSplit() {
  return (
    <section data-testid="paths-section" className="bg-white py-20 sm:py-28 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        <PathCard p={PATHS.personal} testid="path-personal" />
        <PathCard p={PATHS.business} testid="path-business" reverse />
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section data-testid="steps-section" className="relative bg-[#EEEDE7] py-20 sm:py-28 overflow-hidden">
      <div className="absolute -left-20 -top-20 h-72 w-72 rotate-12 rounded-3xl bg-[#EE5A01]/10" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader chip="How It Works" title="From first call to first kilometre in four steps." align="center" />
        <ol className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((s) => (
            <li key={s.num} data-testid={`step-${s.num}`} className="card-light p-6">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-[#EE5A01] font-heading font-black text-lg text-white">{s.num}</span>
              <h3 className="mt-5 font-heading font-bold text-lg text-[#121212]">{s.title}</h3>
              <p className="mt-2 font-body text-sm text-[#666666] leading-relaxed">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
