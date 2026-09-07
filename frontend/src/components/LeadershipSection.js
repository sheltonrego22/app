import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { founders, leaders } from '@/data/leadership';

const COPY = {
  en: { eyebrow: "The People Behind the Movement", title: "Our Leadership", intro: "Founded in 1976 by Sharafuddin Sharaf and Abdul Rahman Mohammed Taher, Eurogulf Mobility Group is guided today by a senior team that combines decades of UAE mobility experience with a focus on people, technology and service excellence.", founder: "Founder", cta: "Meet the Full Leadership Team", href: "/leadership" },
  ar: { eyebrow: "الأشخاص خلف الحركة", title: "قيادتنا", intro: "أسس شرف الدين شرف وعبد الرحمن محمد طاهر مجموعة يوروجلف للتنقل عام ١٩٧٦، ويقودها اليوم فريق قيادي يجمع بين عقود من الخبرة في قطاع التنقل الإماراتي والتركيز على الأفراد والتقنية والتميز في الخدمة.", founder: "مؤسس", cta: "تعرّف على فريق القيادة الكامل", href: "/ar/leadership" },
};

export function LeaderCard({ person, lang, isFounder, index, prefix = "" }) {
  const p = person[lang];
  const founderLabel = COPY[lang].founder;
  return (
    <div data-testid={`${prefix}leader-card-${index}`} className="bg-[#111111] border border-white/5 overflow-hidden hover:border-[#EE5A01]/30 transition-all duration-300 group">
      <div className={`${isFounder ? 'h-72' : 'h-60'} bg-[#0a0a0a] relative overflow-hidden`}>
        <img src={person.img} alt={p.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        {isFounder && (
          <div className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'}`}>
            <span className={`font-mono text-[10px] text-[#EEEDE7] bg-[#EE5A01] px-3 py-1 ${lang === 'ar' ? '' : 'tracking-wider uppercase'}`}>{founderLabel}</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-heading font-bold text-lg text-[#EEEDE7] mb-1">{p.name}</h3>
        <p className={`font-mono text-xs text-[#EE5A01] mb-3 ${lang === 'ar' ? '' : 'tracking-wider uppercase'}`}>{p.role}</p>
        {p.desc && <p className="font-body text-sm text-[#666666] leading-relaxed">{p.desc}</p>}
      </div>
    </div>
  );
}

export function LeadershipSection({ lang = 'en', compact = true }) {
  const c = COPY[lang];
  const isAr = lang === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const team = compact ? leaders.slice(0, 4) : leaders;
  return (
    <section data-testid={`${isAr ? 'ar-' : ''}about-leadership`} className="bg-[#0a0a0a] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="orange-accent-line mx-auto mb-6" />
          <span className={`font-mono text-xs text-[#EE5A01] mb-3 block ${isAr ? '' : 'tracking-[0.2em] uppercase'}`}>{c.eyebrow}</span>
          <h2 className={`font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#EEEDE7] mb-4 ${isAr ? '' : 'uppercase tracking-tight'}`}>{c.title}</h2>
          <p className="font-body text-[#666666] max-w-2xl mx-auto leading-relaxed">{c.intro}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
          {founders.map((f, i) => <LeaderCard key={f.id} person={f} lang={lang} isFounder index={i} prefix={isAr ? 'ar-about-' : 'about-'} />)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((l, i) => <LeaderCard key={l.id} person={l} lang={lang} isFounder={false} index={i + 2} prefix={isAr ? 'ar-about-' : 'about-'} />)}
        </div>
        <div className="text-center mt-12">
          <Link to={c.href} data-testid={`${isAr ? 'ar-' : ''}about-leadership-cta`} className="inline-flex items-center gap-2 btn-primary">
            {c.cta} <Arrow className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
