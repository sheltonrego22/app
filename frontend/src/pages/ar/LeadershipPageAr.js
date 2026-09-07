import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LeaderCard } from '@/components/LeadershipSection';
import { founders, leaders } from '@/data/leadership';

const HERO_IMG = "https://customer-assets.emergentagent.com/job_egmg-premium/artifacts/cmkxgqfh_image.png";

export default function LeadershipPageAr() {
  useEffect(() => { document.title = "القيادة | مجموعة يوروجلف للتنقل"; }, []);

  return (
    <div dir="rtl" data-testid="leadership-page-ar" className="font-body">
      <section data-testid="ar-leadership-hero" className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="قيادة مجموعة يوروجلف للتنقل" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16 pt-32">
          <p className="font-mono text-xs text-[#EE5A01] mb-4">الأشخاص خلف الحركة</p>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7]">القيادة</h1>
        </div>
      </section>

      <section className="bg-black py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] mb-4">مؤسسونا</h2>
            <p className="text-[#666666] max-w-xl mx-auto">المؤسسون أصحاب الرؤية الذين أنشأوا مجموعة يوروجلف للتنقل عام ١٩٧٦ وبنوها لتصبح واحدة من أكثر مجموعات التنقل ثقةً في الإمارات.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {founders.map((o, i) => <LeaderCard key={o.id} person={o} lang="ar" isFounder index={i} prefix="ar-" />)}
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] mb-4">فريق القيادة العليا</h2>
            <p className="text-[#666666] max-w-xl mx-auto">فريق متنوع من محترفي القطاع يقود الرؤية الاستراتيجية لمجموعة يوروجلف للتنقل وتميزها التشغيلي ونموها المستمر في الإمارات.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {leaders.map((l, i) => <LeaderCard key={l.id} person={l} lang="ar" isFounder={false} index={i + 2} prefix="ar-" />)}
          </div>
        </div>
      </section>

      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black mb-4">انضم إلى فريقنا</h2>
          <p className="text-black/70 mb-8 max-w-lg mx-auto">مع أكثر من ١,٢٠٠ محترف، تقدم مجموعة يوروجلف للتنقل مسارات مهنية ذات أثر. كن جزءاً من الحركة.</p>
          <Link to="/ar/careers" data-testid="ar-leadership-careers-cta" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm px-8 py-4 hover:bg-[#111111] transition-colors inline-block">استكشف الوظائف</Link>
        </div>
      </section>
    </div>
  );
}
