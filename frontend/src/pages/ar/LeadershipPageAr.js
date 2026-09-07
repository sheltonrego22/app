import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const HERO_IMG = "https://customer-assets.emergentagent.com/job_egmg-premium/artifacts/cmkxgqfh_image.png";

const owners = [
  { name: "شرف الدين شرف", role: "المالك", img: "https://egmg.ae/wp-content/uploads/2026/01/Mr-Sharaf-e1769774515761.png" },
  { name: "عبد الرحمن محمد طاهر", role: "المالك", img: "https://egmg.ae/wp-content/uploads/2026/01/Mr.Abdul-Rahman-Mohammed-Taher-e1769774566699.png" },
];

const leaders = [
  { name: "عيسى شرف", role: "مدير المجموعة", img: "https://egmg.ae/wp-content/uploads/2025/06/Resize-image-project-8.png", desc: "يتولى عيسى قيادة المبادرات على مستوى المجموعة ودعم القيادة عبر الوظائف المختلفة. ويعمل عن قرب مع جميع الفرق لضمان تنفيذ الأهداف الاستراتيجية بانضباط ووضوح في الغاية." },
  { name: "ماريوس أنطون", role: "المدير العام للمبيعات والعمليات", img: "https://egmg.ae/wp-content/uploads/2026/01/Mr.-Marius-e1769774473388.png", desc: "يقود ماريوس العمليات التجارية لمجموعة يوروجلف للتنقل مع التركيز على نمو الإيرادات والتوسع في السوق والابتكار المتمحور حول العميل. ويؤدي دوراً رئيسياً في دمج التقنيات الناشئة وتحسين أداء الأعمال." },
  { name: "راجيش كوتيناث", role: "المراقب المالي للمجموعة", img: "https://egmg.ae/wp-content/uploads/2026/01/Mr-Rajesh-e1769672050584.png", desc: "يدير راجيش الصحة المالية للمؤسسة، ويشرف على التقارير والامتثال والاستراتيجية المالية. ويدعم دوره اتخاذ قرارات سليمة في جميع وحدات الأعمال." },
  { name: "جوناثان لافندر", role: "مدير الموارد البشرية والعمليات والتقنية", img: "https://egmg.ae/wp-content/uploads/2026/01/Mr.-Jonathan-Lavender-e1769671995601.png", desc: "يشرف جوناثان على تكامل استراتيجية الموارد البشرية والعمليات التشغيلية والحلول التقنية لتعزيز الكفاءة المؤسسية والتحول الرقمي في المجموعة." },
  { name: "محمد علي المازمي", role: "مدير الشؤون التجارية والحكومية", img: "https://egmg.ae/wp-content/uploads/2026/01/Mr.-Mohamad-Ali-Al-Maazmi-e1769759322881.png", desc: "يدير محمد الشراكات التجارية والعلاقات الحكومية، ويضمن حفاظ مجموعة يوروجلف للتنقل على علاقات مؤسسية قوية والامتثال التنظيمي في جميع الإمارات." },
  { name: "عمر العصيمي", role: "مدير العلاقات الحكومية وعلاقات الموظفين", img: "https://egmg.ae/wp-content/uploads/2026/02/Omar-Al-Osaimi-e1771246920822.webp", desc: "يقود عمر مبادرات التواصل الحكومي وعلاقات الموظفين، ويعزز علاقات مثمرة مع الجهات التنظيمية ويضمن بيئة عمل إيجابية." },
  { name: "ماري باريان", role: "مديرة الموارد البشرية والثقافة المؤسسية", img: "https://egmg.ae/wp-content/uploads/2026/01/Ms.-Mari-e1769774792891.png", desc: "تقود ماري أجندة الموارد البشرية في مجموعة يوروجلف للتنقل، وتعزز ثقافة الشمول والأداء والتعلم المستمر. ويضمن عملها مواءمة تطوير المواهب مع أهداف الأعمال." },
];

function LeaderCard({ leader, index, isOwner }) {
  return (
    <div data-testid={`ar-leader-card-${index}`} className="bg-[#111111] border border-white/5 overflow-hidden hover:border-[#EE5A01]/30 transition-all duration-300 group">
      <div className={`${isOwner ? 'h-72' : 'h-60'} bg-[#0a0a0a] relative overflow-hidden`}>
        <img src={leader.img} alt={leader.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        {isOwner && (
          <div className="absolute top-4 left-4">
            <span className="font-mono text-[10px] text-[#EEEDE7] bg-[#EE5A01] px-3 py-1">مؤسس</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-heading font-bold text-lg text-[#EEEDE7] mb-1">{leader.name}</h3>
        <p className="font-mono text-xs text-[#EE5A01] mb-3">{leader.role}</p>
        {leader.desc && <p className="text-sm text-[#666666] leading-relaxed">{leader.desc}</p>}
      </div>
    </div>
  );
}

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
            {owners.map((o, i) => <LeaderCard key={o.name} leader={o} index={i} isOwner />)}
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
            {leaders.map((l, i) => <LeaderCard key={l.name} leader={l} index={i + 2} isOwner={false} />)}
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
