import { Linkedin, ArrowUpRight } from 'lucide-react';
import { LINKEDIN_POSTS_URL } from '@/data/jobs';

const COPY = {
  en: { eyebrow: "Latest from LinkedIn", title: "News from Eurogulf Mobility Group", follow: "FOLLOW ON LINKEDIN", read: "Read on LinkedIn" },
  ar: { eyebrow: "آخر المستجدات على لينكدإن", title: "أخبار مجموعة يوروجلف للتنقل", follow: "تابعونا على لينكدإن", read: "اقرأ على لينكدإن" },
};

export function LinkedInFeed({ posts, lang = 'en', title, eyebrow, className = "bg-[#0a0a0a]", testId = "linkedin-feed" }) {
  const c = COPY[lang];
  const isAr = lang === 'ar';
  return (
    <section data-testid={testId} className={`${className} py-20 sm:py-28`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="orange-accent-line mx-auto mb-6" />
          <span className={`font-mono text-xs text-[#EE5A01] mb-3 block ${isAr ? '' : 'tracking-[0.2em] uppercase'}`}>{eyebrow || c.eyebrow}</span>
          <h2 className={`font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] ${isAr ? '' : 'uppercase tracking-tight'}`}>{title || c.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((p) => (
            <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" data-testid={`linkedin-post-${p.id}`}
              className="bg-[#111] border border-white/5 p-6 flex flex-col hover:border-[#EE5A01]/30 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <span className={`font-mono text-[10px] text-[#EE5A01] ${isAr ? '' : 'tracking-wider uppercase'}`}>{p.tag[lang]}</span>
                <Linkedin className="w-4 h-4 text-[#0A66C2]" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#EEEDE7] mb-2 leading-snug group-hover:text-[#EE5A01] transition-colors">{p[lang].title}</h3>
              <p className="font-body text-sm text-[#666] leading-relaxed flex-1">{p[lang].text}</p>
              <span className={`inline-flex items-center gap-1 mt-4 font-heading text-xs text-[#EE5A01] ${isAr ? '' : 'tracking-wider uppercase'}`}>
                {c.read} <ArrowUpRight className="w-3 h-3" />
              </span>
            </a>
          ))}
        </div>
        <div className="text-center mt-10">
          <a href={LINKEDIN_POSTS_URL} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 font-heading font-bold text-xs text-[#EE5A01] border border-[#EE5A01]/40 px-5 py-2.5 hover:bg-[#EE5A01] hover:text-black transition-all ${isAr ? '' : 'tracking-[0.1em]'}`}>
            <Linkedin className="w-3.5 h-3.5" /> {c.follow}
          </a>
        </div>
      </div>
    </section>
  );
}
