import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, ChevronDown, ChevronUp, Send, TrendingUp, Heart, Shield, Zap } from 'lucide-react';
import ar from '@/i18n/ar';

const t = ar.careers;

const jobs = [
  { title: "سائق محترف", dept: "العمليات" },
  { title: "أخصائي تأجير", dept: "المبيعات" },
  { title: "محلل عمليات", dept: "الجودة" },
  { title: "مدير حسابات شركات", dept: "المبيعات" },
  { title: "فني سيارات", dept: "الورش" },
];

const departments = ["جميع الأقسام", "العمليات", "المبيعات", "الجودة", "الورش"];

export default function CareersPageAr() {
  const [expandedJob, setExpandedJob] = useState(null);
  const [activeDept, setActiveDept] = useState("جميع الأقسام");
  const [search, setSearch] = useState('');

  useEffect(() => { document.title = "الوظائف | مجموعة يوروجلف للتنقل"; }, []);

  const filtered = jobs.filter(j =>
    (activeDept === "جميع الأقسام" || j.dept === activeDept) &&
    (!search || j.title.includes(search) || j.dept.includes(search))
  );

  const icons = [TrendingUp, Heart, Shield, Zap];

  return (
    <div dir="rtl" data-testid="careers-page-ar" className="font-body">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-[#EEEDE7] tracking-tight mb-4">{t.heroTitle}</h1>
          <p className="text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto">{t.heroSub}</p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="bg-[#0a0a0a] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] tracking-tight">{t.whyTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.values.map((v, i) => {
              const Icon = icons[i];
              return (
                <div key={v.title} className="bg-[#111] border border-white/5 p-6">
                  <Icon className="w-7 h-7 text-[#EE5A01] mb-3" strokeWidth={1.5} />
                  <h3 className="font-heading font-bold text-sm text-[#EEEDE7] mb-2">{v.title}</h3>
                  <p className="text-xs text-[#666] leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-black py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl text-[#EEEDE7] tracking-tight">{t.openPositions}</h2>
          </div>

          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={ar.common.searchPlaceholder}
            className="w-full bg-[#111] border border-white/5 text-[#EEEDE7] placeholder:text-[#444] p-3 text-sm mb-4" />

          <div className="flex flex-wrap gap-2 mb-6">
            {departments.map(d => (
              <button key={d} onClick={() => setActiveDept(d)}
                className={`font-heading text-xs tracking-wider px-4 py-2 transition-all ${activeDept === d ? 'bg-[#EE5A01] text-black' : 'text-[#666] border border-white/5 hover:text-[#EEEDE7]'}`}>{d}</button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.length === 0 && <p className="text-center text-[#666] py-8">{t.noPositions}</p>}
            {filtered.map(job => (
              <div key={job.title} className="bg-[#111] border border-white/5">
                <button className="w-full flex items-center justify-between p-5 text-right" onClick={() => setExpandedJob(expandedJob === job.title ? null : job.title)}>
                  <div className="flex items-center gap-4">
                    <Briefcase className="w-5 h-5 text-[#EE5A01] flex-shrink-0" />
                    <div>
                      <h3 className="font-heading font-bold text-sm text-[#EEEDE7]">{job.title}</h3>
                      <span className="font-mono text-[10px] text-[#EE5A01] tracking-wider">{job.dept}</span>
                    </div>
                  </div>
                  {expandedJob === job.title ? <ChevronUp className="w-4 h-4 text-[#EE5A01]" /> : <ChevronDown className="w-4 h-4 text-[#666]" />}
                </button>
                {expandedJob === job.title && (
                  <div className="px-5 pb-5 border-t border-white/5 pt-4">
                    <a href="mailto:wemoveyou@eurogulf.ae" className="inline-flex items-center gap-2 bg-[#EE5A01] text-black font-heading font-bold text-xs px-5 py-2.5 hover:bg-[#F17B34] transition-colors">
                      <Send className="w-3 h-3" /> {t.applyViaEmail}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-2xl text-[#EEEDE7] tracking-tight mb-3">{t.spontaneous}</h2>
          <p className="text-sm text-[#666] mb-6">{t.spontaneousDesc}</p>
          <a href="mailto:wemoveyou@eurogulf.ae" className="btn-primary inline-block">{t.sendCV}</a>
        </div>
      </section>
    </div>
  );
}
