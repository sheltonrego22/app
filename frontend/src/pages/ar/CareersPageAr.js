import { useEffect } from 'react';
import { TrendingUp, Heart, Shield, Zap, Linkedin, Mail } from 'lucide-react';
import ar from '@/i18n/ar';
import { JobBoard } from '@/components/careers/JobBoard';
import { LinkedInFeed } from '@/components/LinkedInFeed';
import { cultureLinkedinPosts } from '@/data/linkedinPosts';
import { CAREERS_EMAIL, LINKEDIN_COMPANY_URL, applyMailto } from '@/data/jobs';

const t = ar.careers;
const icons = [TrendingUp, Heart, Shield, Zap];

export default function CareersPageAr() {
  useEffect(() => { document.title = "الوظائف | الوظائف الشاغرة في مجموعة يوروجلف للتنقل | دبي"; }, []);

  return (
    <div dir="rtl" data-testid="careers-page-ar" className="font-body">
      <section data-testid="ar-careers-hero" className="relative min-h-[60vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <span className="font-mono text-xs text-[#EE5A01] mb-4 block">نحن نوظّف</span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-[#EEEDE7] mb-4">{t.heroTitle}</h1>
          <p className="text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8">{t.heroSub}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#openings" data-testid="ar-careers-view-openings" className="btn-primary inline-block">{t.openPositions}</a>
            <a href={LINKEDIN_COMPANY_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost inline-flex items-center gap-2"><Linkedin className="w-4 h-4" /> تابعونا على لينكدإن</a>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7]">{t.whyTitle}</h2>
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

      <section id="openings" className="bg-black py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl text-[#EEEDE7]">{t.openPositions}</h2>
          </div>
          <JobBoard lang="ar" />
        </div>
      </section>

      <LinkedInFeed posts={cultureLinkedinPosts} lang="ar" eyebrow="الحياة في يوروجلف" title="ثقافتنا، التعلم، والتقدير" testId="ar-careers-culture-feed" />

      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-black mb-3">{t.spontaneous}</h2>
          <p className="text-sm text-black/70 mb-6">أرسل سيرتك الذاتية إلى {CAREERS_EMAIL} وسنضعك في الاعتبار للفرص المستقبلية في المجموعة.</p>
          <a href={applyMailto("General Application", 'ar')} data-testid="ar-careers-send-cv" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm px-8 py-4 hover:bg-[#111111] transition-colors inline-flex items-center gap-2">
            <Mail className="w-4 h-4" /> {t.sendCV}
          </a>
        </div>
      </section>
    </div>
  );
}
