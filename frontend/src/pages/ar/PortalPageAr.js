import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Car, Lock, ArrowLeft } from 'lucide-react';

const portals = [
  { icon: Building2, title: "بوابة عملاء الشركات", desc: "إدارة أسطولك، ومتابعة الفواتير، واستعراض التقارير، وطلب مركبات إضافية من لوحة تحكم مركزية واحدة.", features: ["نظرة عامة على الأسطول ومدد العقود", "الفواتير وسجل المدفوعات", "طلب مركبات جديدة", "تحميل التقارير"] },
  { icon: Car, title: "بوابة السائقين والشركاء", desc: "الوصول إلى جداول المهام، ومتابعة الأداء، والتواصل مع فريق العمليات.", features: ["المهام اليومية والجداول", "مقاييس الأداء", "الوثائق والامتثال", "التواصل مع فريق الدعم"] },
];

export default function PortalPageAr() {
  useEffect(() => { document.title = "بوابات العملاء والشركاء | مجموعة يوروجلف للتنقل"; }, []);

  return (
    <div dir="rtl" data-testid="portal-page-ar" className="font-body">
      <section data-testid="ar-portal-hero" className="relative min-h-[50vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 pt-28 pb-12 text-center">
          <Lock className="w-10 h-10 text-[#EE5A01] mx-auto mb-4" strokeWidth={1.5} />
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[#EEEDE7] mb-4">بوابات العملاء والشركاء</h1>
          <p className="text-base text-[#EEEDE7]/70 max-w-xl mx-auto">بوابات آمنة لعملاء الشركات والسائقين والشركاء. الوصول عبر الإنترنت قادم قريباً، وفي الوقت الحالي يمكنكم التواصل مع مدير حسابكم للحصول على الكشوفات والتقارير والمهام.</p>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portals.map((p, i) => (
              <div key={p.title} data-testid={`ar-portal-card-${i}`} className="bg-[#111] border border-white/5 p-8 hover:border-[#EE5A01]/30 transition-all">
                <p.icon className="w-10 h-10 text-[#EE5A01] mb-5" strokeWidth={1.5} />
                <h2 className="font-heading font-black text-2xl text-[#EEEDE7] mb-3">{p.title}</h2>
                <p className="text-sm text-[#999] leading-relaxed mb-6">{p.desc}</p>
                <ul className="space-y-2 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#666]">
                      <span className="w-1.5 h-1.5 bg-[#EE5A01] flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="bg-black border border-[#EE5A01]/20 p-4">
                  <p className="font-mono text-[10px] text-[#EE5A01] mb-2">قريباً</p>
                  <p className="text-xs text-[#666] mb-3">الوصول الرقمي لهذه البوابة قيد التطوير. للحصول على المساعدة الآن، تواصل مع فريقنا مباشرة.</p>
                  <Link to="/ar/contact" data-testid={`ar-portal-contact-${i}`} className="text-[#EE5A01] font-heading text-xs font-bold hover:underline inline-flex items-center gap-1">
                    تواصل مع فريقنا <ArrowLeft className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EE5A01] py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-black/80 mb-4">هل تحتاج إلى وصول فوري إلى تقارير أسطولك أو جدول مهامك؟ اتصل على 800 364 أو راسلنا عبر البريد الإلكتروني.</p>
          <Link to="/ar/contact" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm px-8 py-3.5 hover:bg-[#111] transition-colors inline-block">اتصل بنا</Link>
        </div>
      </section>
    </div>
  );
}
