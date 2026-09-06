import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Fuel, Zap, Users, Leaf, Sun, Battery, Recycle } from 'lucide-react';

const EV_IMG = "https://images.unsplash.com/photo-1590250509584-efadf48e7a3c?w=1200&h=600&fit=crop";
const SOLAR_IMG = "https://images.unsplash.com/photo-1775644125504-ab20f983e905?w=1200&h=600&fit=crop";

const pillars = [
  { icon: Fuel, title: "كفاءة استهلاك الوقود", desc: "تقوم ورشنا الثلاث من الفئة A بصيانة أكثر من ١٢,٠٠٠ مركبة وتحسين كفاءتها في استهلاك الوقود، ما يقلل الاستهلاك والانبعاثات عبر عملياتنا في الإمارات السبع.", stat: "٣", statLabel: "ورش من الفئة A" },
  { icon: Sun, title: "عمليات صديقة للبيئة", desc: "صُممت مكاتبنا وورشنا في ١٤ موقعاً في الإمارات لتحقيق كفاءة الطاقة، مع تطبيق برامج لتقليل النفايات وإعادة التدوير تتماشى مع رؤية الإمارات للاستدامة.", stat: "١٤", statLabel: "موقعاً في الإمارات" },
  { icon: Zap, title: "المركبات الكهربائية", desc: "تسرّع مجموعة يوروجلف للتنقل التحول نحو التنقل الكهربائي بمركبات تسلا والهايبرد في أسطول السائق الخاص، دعماً لاستراتيجية دبي للطاقة النظيفة ومبادرة الإمارات للحياد المناخي ٢٠٥٠.", stat: "EV", statLabel: "توسّع الأسطول جارٍ" },
  { icon: Users, title: "رفاه الموظفين", desc: "معايير صحة وسلامة مهنية معتمدة وفق ISO 45001:2018 لأكثر من ١,٢٠٠ موظف. وتضمن قيم F.A.I.R. بيئة عمل محترمة وشاملة في جميع الأقسام.", stat: "+١,٢٠٠", statLabel: "عضو في الفريق" },
];

const initiatives = [
  { icon: Leaf, title: "أسطول منخفض الكربون", desc: "دمج المركبات الهايبرد والكهربائية في أقسام السائق الخاص وأساطيل الشركات" },
  { icon: Battery, title: "الجاهزية للمركبات الكهربائية", desc: "تجهيز البنية التحتية في مواقع رئيسية بالإمارات لشحن المركبات الكهربائية ودعمها" },
  { icon: Recycle, title: "تقليل النفايات", desc: "تطبيق برامج إعادة التدوير وتقليل المواد أحادية الاستخدام في جميع الورش" },
  { icon: Sun, title: "الحياد المناخي للإمارات ٢٠٥٠", desc: "مواءمة العمليات مع الاستراتيجية الوطنية للإمارات لتحقيق الحياد الكربوني بحلول ٢٠٥٠" },
];

export default function SustainabilityPageAr() {
  useEffect(() => { document.title = "الاستدامة | مجموعة يوروجلف للتنقل | نقود نحو مستقبل أكثر اخضراراً"; }, []);

  return (
    <div dir="rtl" data-testid="sustainability-page-ar" className="font-body">
      <section data-testid="ar-sustainability-hero" className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={EV_IMG} alt="شحن مركبة كهربائية" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-[#EE5A01] to-green-500" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-24">
          <p className="font-mono text-xs text-green-400 mb-4">المسؤولية البيئية</p>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] mb-6">نقود نحو مستقبل أكثر اخضراراً</h1>
          <p className="text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto">في مجموعة يوروجلف للتنقل، رحلتنا نحو الاستدامة تتجاوز كونها هدفاً. إنها التزام بصياغة مستقبل أنظف وأذكى وأكثر مسؤولية للتنقل.</p>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="orange-accent-line mx-auto mb-8" />
          <p className="text-lg text-[#EEEDE7]/80 leading-relaxed">نؤمن بأن النقل لا ينبغي أن يحرّك الناس فحسب، بل أن يحمي البيئة أيضاً. لهذا نعمل بنشاط على دمج الممارسات الواعية بيئياً في عملياتنا، من مبادرات الأسطول منخفض الكربون والمنشآت التي تعمل بالطاقة الشمسية إلى الإدخال التدريجي للمركبات الكهربائية في خدماتنا.</p>
        </div>
      </section>

      <section className="bg-black py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#EEEDE7] mb-4">ركائزنا الأربع</h2>
            <p className="text-[#666666] max-w-lg mx-auto">نهج شامل للتنقل المستدام عبر كل بعد من أبعاد عملياتنا.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((p, i) => (
              <div key={p.title} data-testid={`ar-pillar-card-${i}`} className="bg-[#111111] border border-white/5 p-8 hover:border-green-500/30 transition-all duration-300 group">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                    <p.icon className="w-7 h-7 text-green-400" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-xl text-[#EEEDE7] mb-2">{p.title}</h3>
                    <p className="text-sm text-[#666666] leading-relaxed mb-4">{p.desc}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading text-2xl font-bold text-[#EE5A01]">{p.stat}</span>
                      <span className="text-xs text-[#666666]">{p.statLabel}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative h-[40vh] overflow-hidden">
        <img src={SOLAR_IMG} alt="منشآت تعمل بالطاقة الشمسية" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <p className="font-heading font-black text-3xl sm:text-5xl text-[#EEEDE7] text-center">مستدامون بالتصميم</p>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7]">المبادرات الرئيسية</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {initiatives.map((init) => (
              <div key={init.title} className="bg-[#111111] border border-white/5 p-6 text-center hover:border-green-500/20 transition-all">
                <init.icon className="w-8 h-8 text-green-400 mx-auto mb-4" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-sm text-[#EEEDE7] mb-2">{init.title}</h3>
                <p className="text-xs text-[#666666] leading-relaxed">{init.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-l from-green-900 to-[#0a0a0a] py-16 border-t border-green-500/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] mb-4">شاركنا في بناء مستقبل أكثر اخضراراً</h2>
          <p className="text-[#EEEDE7]/60 mb-8 max-w-lg mx-auto">انضم إلى مجموعة يوروجلف للتنقل في بناء حلول تنقل مستدامة. تواصل معنا لتعرف كيف نجعل كل رحلة أكثر مسؤولية.</p>
          <Link to="/ar/contact" data-testid="ar-sustainability-cta" className="btn-primary inline-block">تواصل معنا</Link>
        </div>
      </section>
    </div>
  );
}
