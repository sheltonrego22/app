import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const EGMG_LOGO = "/egmg-logo-transparent.png";
const EGMG_LOGO_LIGHT = "/egmg-logo-dark-text.png";

const divisions = [
  { name: "يوروبكار", subtitle: "تأجير سيارات متميز وتأجير طويل الأجل", logo: "/europcar-logo.png", href: "/ar/europcar",
    desc: "تخدم يوروبكار دبي والإمارات الشمالية عبر التأجير ذاتي القيادة المتميز، وحلول التأجير الشهري، ودعم التأجير طويل الأجل. ويغطي الإطار التشغيلي المعتمد استفسارات التأجير اليومي والأسبوعي والشهري، بينما تُوجّه احتياجات التأجير طويل الأجل والأساطيل الأكثر تعقيداً إلى متابعة مختصة." },
  { name: "جولدكار", subtitle: "تأجير اقتصادي قصير الأجل", logo: "/goldcar-logo.png", href: "/ar/goldcar",
    desc: "عرض تأجير ذاتي القيادة يركز على القيمة ضمن محفظة مجموعة يوروجلف للتنقل الأوسع." },
  { name: "تراكلاين ترانسبورت", subtitle: "تأجير المركبات التجارية وحلول إدارة الأساطيل", logo: EGMG_LOGO, href: "/ar/truckline",
    desc: "تدعم تراكلاين تأجير المركبات التجارية، ومناقشات الأساطيل المتخصصة، ومتطلبات التنقل التشغيلي الأوسع لعملاء الشركات، بنهج قائم على الحلول والقدرات." },
  { name: "يوروجلف بريميوم شوفير", subtitle: "النقل المُدار والخدمات مع سائق", logo: EGMG_LOGO, href: "/ar/chauffeur-service",
    desc: "خدمات سائق خاص ونقل مُدار متميزة لنقل المطارات، ونقل كبار الشخصيات، وحركة الموظفين، وتنقل الفعاليات، وغيرها من متطلبات نقل الأعمال والضيافة، مع متابعة مختصة لخدمات النقل المُدار." },
  { name: "يوروجلف أوتو جراج", subtitle: "الورش والصيانة", logo: EGMG_LOGO, href: "/ar/autocare",
    desc: "خدمة المركبات وإصلاحها ودعم الورش وقدرات الصيانة ضمن مجموعة التنقل الأوسع." },
  { name: "يوروجلف للسيارات المستعملة", subtitle: "المركبات المستعملة", logo: EGMG_LOGO, href: "/ar/used-cars",
    desc: "بيع مركبات مستعملة معتمدة ضمن منظومة يوروجلف الأوسع." },
];

export default function BusinessesPageAr() {
  const { theme } = useTheme();
  const logoFor = (d) => (d.logo === EGMG_LOGO && theme === 'light' ? EGMG_LOGO_LIGHT : d.logo);
  useEffect(() => { document.title = "علاماتنا التجارية | مجموعة يوروجلف للتنقل"; }, []);

  return (
    <div dir="rtl" data-testid="businesses-page-ar" className="font-body">
      <section data-testid="ar-businesses-hero" className="relative min-h-[50vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute top-20 left-20 w-80 h-80 bg-[#EE5A01]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] mb-4">علامات متخصصة لكل احتياجات التنقل</h1>
          <p className="text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto">صُممت محفظة المجموعة بحيث يصل العملاء إلى الحل المناسب عبر العلامة المتخصصة المناسبة، مع الاستفادة من منصة تشغيلية مترابطة ومعايير خدمة مشتركة.</p>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-12 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#999] leading-relaxed">تعكس محفظة علامات مجموعة يوروجلف للتنقل اتساع ما تقدمه من خدمات التنقل والدعم للمركبات في الإمارات. وتؤدي كل علامة دوراً مميزاً داخل المجموعة، لتساعد العملاء والشركاء على الوصول إلى الخدمة أو المركبة أو نموذج التنقل المناسب لاحتياجاتهم.</p>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {divisions.map((d, i) => (
              <Link key={d.name} to={d.href} data-testid={`ar-business-card-${i}`} className="block bg-[#111111] border border-white/5 hover:border-[#EE5A01]/30 transition-all group">
                <div className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8">
                  <div className="w-full md:w-48 flex-shrink-0 flex items-center justify-center bg-white/5 p-4 min-h-[80px]">
                    <img src={logoFor(d)} alt={d.name} className="h-12 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity" loading="lazy" />
                  </div>
                  <div className="flex-1 text-center md:text-right">
                    <h2 className="font-heading font-black text-xl text-[#EEEDE7] mb-1">{d.name}</h2>
                    <span className="font-mono text-[10px] text-[#EE5A01]">{d.subtitle}</span>
                    <p className="text-sm text-[#666666] leading-relaxed mt-2 max-w-2xl">{d.desc}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-[#EE5A01]/10 flex items-center justify-center group-hover:bg-[#EE5A01] transition-colors">
                      <ArrowLeft className="w-5 h-5 text-[#EE5A01] group-hover:text-black transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black mb-4">هل تحتاج إلى حل للتنقل؟</h2>
          <p className="text-black/70 mb-8 max-w-lg mx-auto">سواء كانت سيارة تأجير واحدة أو مناقشة أسطول للشركات، لدى مجموعة يوروجلف للتنقل العلامة المناسبة لك.</p>
          <Link to="/ar/contact" data-testid="ar-businesses-contact-cta" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm px-8 py-4 hover:bg-[#111111] transition-colors inline-block">اتصل بنا</Link>
        </div>
      </section>
    </div>
  );
}
