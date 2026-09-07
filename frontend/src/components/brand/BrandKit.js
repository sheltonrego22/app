import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { SectionHeader } from '@/components/home/CoreSections';

export { SectionHeader };

export const INPUT_CLS = "bg-white border-black/15 text-[#121212] placeholder:text-[#999] focus:border-[#EE5A01] focus-visible:ring-[#EE5A01]/30 rounded-lg h-12";
export const SELECT_CONTENT_CLS = "bg-white border-black/10 rounded-lg shadow-xl";
export const SELECT_ITEM_CLS = "text-[#121212] focus:bg-[#FFF4ED] focus:text-[#EE5A01] rounded-md";
export const LABEL_CLS = "font-heading font-bold text-[11px] tracking-[0.12em] text-[#121212] uppercase mb-2 block";
export const ERROR_CLS = "font-body text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3";

const ctaClass = (variant) => ({ primary: 'btn-primary', secondary: 'btn-secondary', outline: 'btn-outline !border-white !text-white hover:!bg-white hover:!text-[#121212]' }[variant || 'primary']);

export function Cta({ cta, className = '' }) {
  const cls = `${cta.className || ctaClass(cta.variant)} ${className}`;
  if (cta.onClick) return <button type="button" onClick={cta.onClick} data-testid={cta.testid} className={cls}>{cta.label}</button>;
  if (cta.external) return <a href={cta.href} target="_blank" rel="noopener noreferrer" data-testid={cta.testid} className={cls}>{cta.label}</a>;
  return <Link to={cta.href} data-testid={cta.testid} className={cls}>{cta.label}</Link>;
}

export function BrandHero({ chip, title, lead, image, imageAlt, logo, ctas = [], testid, position = 'center', children }) {
  return (
    <section data-testid={testid} className="relative overflow-hidden bg-[#121212] text-white">
      <img src={image} alt={imageAlt || title} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: position }} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        {logo && <img src={logo} alt="" className="h-9 w-auto mb-6 rounded-md bg-white/95 px-3 py-1.5" />}
        {chip && <span className="chip-orange">{chip}</span>}
        <h1 className="mt-5 font-heading font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.03] tracking-tight text-white max-w-3xl">{title}</h1>
        {lead && <p className="mt-6 font-body text-base sm:text-lg text-white/80 max-w-xl leading-relaxed">{lead}</p>}
        {ctas.length > 0 && <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">{ctas.map((c) => <Cta key={c.label} cta={c} />)}</div>}
        {children}
      </div>
    </section>
  );
}

export function StatStrip({ stats, testid }) {
  return (
    <section data-testid={testid} className="bg-white border-b border-black/5">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 ${stats.length > 4 ? 'lg:grid-cols-6 sm:grid-cols-3' : 'lg:grid-cols-4'} divide-x divide-black/5`}>
        {stats.map((s) => (
          <div key={s.label} className="py-7 px-3 text-center">
            <p className="font-heading font-black text-2xl lg:text-3xl text-[#EE5A01] tracking-tight">{s.value}</p>
            <p className="mt-1 font-body text-xs lg:text-sm text-[#666666]">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Prose({ chip, title, paragraphs, bg = 'bg-[#FAFAFA]', children }) {
  return (
    <section className={`${bg} py-16 sm:py-24`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader chip={chip} title={title} />
        <div className="mt-6 space-y-4 font-body text-base text-[#555555] leading-relaxed">{paragraphs.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}</div>
        {children}
      </div>
    </section>
  );
}

export function FeatureGrid({ chip, title, desc, items, cols = 3, bg = 'bg-white', testid, align = 'center', itemTestId }) {
  const colCls = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[cols];
  return (
    <section data-testid={testid} className={`${bg} py-16 sm:py-24`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && <SectionHeader chip={chip} title={title} desc={desc} align={align} />}
        <div className={`${title ? 'mt-12' : ''} grid grid-cols-1 ${colCls} gap-5`}>
          {items.map((f, i) => (
            <div key={f.title} data-testid={itemTestId ? `${itemTestId}-${i}` : undefined} className="card-light p-6">
              {f.icon && <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#EE5A01] text-white"><f.icon className="w-5 h-5" /></span>}
              <h3 className="mt-4 font-heading font-bold text-base text-[#121212]">{f.title}</h3>
              <p className="mt-2 font-body text-sm text-[#666666] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SplitSection({ chip, title, desc, image, imageAlt, reverse = false, bg = 'bg-white', testid, children, imageClass = 'h-72 sm:h-[420px]' }) {
  return (
    <section data-testid={testid} className={`${bg} py-16 sm:py-24 overflow-x-hidden`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div className="relative">
          <div className={`absolute -inset-3 rounded-3xl bg-[#EE5A01]/10 ${reverse ? '-rotate-2' : 'rotate-2'}`} aria-hidden="true" />
          <img src={image} alt={imageAlt || title} loading="lazy" className={`relative ${imageClass} w-full rounded-2xl object-cover shadow-[0_24px_60px_rgba(0,0,0,0.12)]`} />
        </div>
        <div>
          <SectionHeader chip={chip} title={title} desc={desc} />
          {children}
        </div>
      </div>
    </section>
  );
}

export function CheckList({ items, className = '' }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3 font-body text-sm text-[#121212]">
          <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-md bg-[#FFF4ED] text-[#EE5A01] flex-shrink-0"><Check className="w-3 h-3" /></span>{t}
        </li>
      ))}
    </ul>
  );
}

export function CompareTable({ columns, rows, highlight, accent = '#EE5A01', testid }) {
  return (
    <div data-testid={testid} className="overflow-hidden rounded-xl border border-black/10 bg-white text-xs sm:text-sm">
      <div className="grid bg-[#F5F5F3]" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
        {columns.map((c, i) => (
          <div key={c || 'feature'} className={`p-3 font-heading font-bold uppercase tracking-wider text-[10px] sm:text-[11px] ${i === 0 ? 'text-[#666666]' : 'text-center'}`} style={i !== 0 && i === highlight ? { color: accent } : undefined}>{c}</div>
        ))}
      </div>
      {rows.map((row) => (
        <div key={row[0]} className="grid border-t border-black/5" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
          {row.map((cell, i) => (
            <div key={`${row[0]}-${i}`} className={`p-3 font-body ${i === 0 ? 'font-semibold text-[#121212]' : 'text-center text-[#555555]'} ${i === highlight ? 'bg-[#FFF4ED]/60 text-[#121212]' : ''}`}>{cell}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function LogoStrip({ title, logos, className = '' }) {
  return (
    <section className={`bg-white py-14 border-y border-black/5 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center font-heading font-bold text-[11px] tracking-[0.2em] uppercase text-[#666666]">{title}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {logos.map((l, i) => typeof l === 'string' && l.startsWith('http') || (typeof l === 'string' && l.startsWith('/'))
            ? <img key={l} src={l} alt={`Client ${i + 1}`} loading="lazy" className="h-9 sm:h-11 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
            : <span key={l} className="font-heading font-bold text-sm text-[#999] hover:text-[#121212] uppercase tracking-wider transition-colors">{l}</span>)}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({ eyebrow = 'We Move You!', title, desc, ctas = [], testid }) {
  return (
    <section data-testid={testid} className="relative overflow-hidden bg-[#EE5A01] py-16 sm:py-20">
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[#F17B34] [clip-path:polygon(30%_0,100%_0,100%_100%,0_100%)]" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div className="max-w-2xl">
          <p className="font-heading font-black text-sm tracking-[0.2em] uppercase text-white/80">{eyebrow}</p>
          <h2 className="mt-3 font-heading font-black text-3xl sm:text-4xl text-white leading-[1.05] tracking-tight">{title}</h2>
          {desc && <p className="mt-4 font-body text-base text-white/85 max-w-lg">{desc}</p>}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          {ctas.map((c) => <Cta key={c.label} cta={{ ...c, variant: c.variant || 'secondary' }} />)}
        </div>
      </div>
    </section>
  );
}

export function InlineLink({ to, children }) {
  return <Link to={to} className="inline-flex items-center gap-1 font-heading font-bold text-sm text-[#EE5A01] hover:gap-2 transition-all">{children} <ArrowRight className="w-4 h-4" /></Link>;
}
