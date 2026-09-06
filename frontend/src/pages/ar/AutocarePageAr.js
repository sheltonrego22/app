import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Shield, Clock, CheckCircle, Phone, Mail, MessageSquare } from 'lucide-react';

const EGMG_LOGO = "/egmg-logo-transparent.png";

const services = [
  { title: "الإصلاحات الميكانيكية", desc: "خدمة شاملة للمحرك وناقل الحركة ومنظومة الدفع لجميع أنواع المركبات وطرازاتها." },
  { title: "إصلاحات الهيكل", desc: "تشمل ضبط الشاسيه وسمكرة الألواح والطلاء الاحترافي بمعايير المصنع." },
  { title: "الإصلاحات الكهربائية", desc: "خدمات تشخيص وإصلاح كاملة لجميع الأنظمة والمكونات الكهربائية في المركبة." },
  { title: "تلميع داخلي وخارجي", desc: "خدمات تلميع احترافية تعيد مركبتك إلى حالة المعرض." },
  { title: "خدمة سحب على مدار الساعة", desc: "سحب المركبات والمساعدة على الطريق طوال اليوم في جميع أنحاء الإمارات." },
  { title: "تعقيم المركبات", desc: "خدمة تعقيم داخلي كاملة للأساطيل والمركبات الفردية." },
];

const insurancePartners = ["GIG", "QIC", "Oman Insurance", "Tokio Marine", "Noor Takaful"];

const features = [
  { icon: Shield, title: "معتمد لدى شركات التأمين من الفئة A", desc: "معتمدون ضمن قوائم أبرز شركات التأمين في الإمارات." },
  { icon: Wrench, title: "٣ مراكز خدمة", desc: "ثلاث ورش متكاملة التجهيز من الفئة A تدعم أسطول المجموعة البالغ ١٠,٠٠٠ مركبة." },
  { icon: Clock, title: "حاصل على شهادة الأيزو", desc: "فنيون وأنظمة إدارة جودة معتمدة وفق ISO 9001:2015." },
  { icon: CheckCircle, title: "خبرة تتجاوز ٣٠ عاماً", desc: "أكثر من ثلاثة عقود بوصفنا العمود الفقري لعمليات صيانة أسطول مجموعة يوروجلف للتنقل." },
];

export default function AutocarePageAr() {
  useEffect(() => { document.title = "يوروجلف أوتو جراج | خدمة وصيانة وإصلاح المركبات | مجموعة يوروجلف للتنقل"; }, []);

  return (
    <div dir="rtl" data-testid="autocare-page-ar" className="font-body">
      <section data-testid="ar-autocare-hero" className="relative min-h-[70vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-black" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <img src={EGMG_LOGO} alt="مجموعة يوروجلف للتنقل" className="h-12 w-auto mx-auto mb-6 opacity-90" />
          <span className="font-mono text-xs text-[#EE5A01] mb-4 block">يوروجلف أوتو جراج</span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] mb-4">يوروجلف أوتو جراج</h1>
          <p className="text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8">قدرات دعم فني وخدمة للمركبات ضمن منظومة مجموعة يوروجلف للتنقل الأوسع: صيانة المركبات وإصلاحها ودعم الورش والعناية الدورية.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/ar/contact" data-testid="ar-autocare-book-btn" className="btn-primary">احجز خدمة</Link>
            <a href="tel:800364" dir="ltr" className="btn-ghost">800 364</a>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="orange-accent-line mb-6 mr-0 ml-auto" />
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] mb-6">عن يوروجلف أوتو جراج</h2>
          <div className="space-y-4 text-[#999] leading-relaxed">
            <p>كانت يوروجلف أوتو جراج المحرك الصامت خلف التميز التشغيلي لمجموعة يوروجلف للتنقل لأكثر من ثلاثة عقود. وبوصفها البنية الداخلية للورش التي تدعم أحد أكبر أساطيل المركبات في الإمارات، بُنيت مراكز الخدمة لدينا وتُدار وفق معايير يعجز معظم ورش التجزئة عن مجاراتها.</p>
            <p>تحمل جميع منشآت يوروجلف أوتو جراج الثلاث تصنيف الفئة A ضمن قوائم أبرز شركات التأمين في الإمارات، اعترافاً بمعاييرنا الفنية وممارسات السلامة وجودة المخرجات. واليوم، أصبحت هذه الخدمات ذات المستوى العالمي متاحة للعملاء الخارجيين ومشغلي الأساطيل الباحثين عن جودة صيانة لا تقبل المساومة.</p>
          </div>
        </div>
      </section>

      <section className="bg-black py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7]">خدماتنا</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div key={s.title} data-testid={`ar-autocare-service-${i}`} className="bg-[#111] border border-white/5 p-7 hover:border-[#EE5A01]/30 transition-all">
                <Wrench className="w-7 h-7 text-[#EE5A01] mb-4" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-base text-[#EEEDE7] mb-2">{s.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7]">لماذا يوروجلف أوتو جراج</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div key={f.title} className="bg-[#111] border border-white/5 p-6 text-center">
                <f.icon className="w-8 h-8 text-[#EE5A01] mx-auto mb-4" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-sm text-[#EEEDE7] mb-2">{f.title}</h3>
                <p className="text-xs text-[#666] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h3 className="font-heading font-bold text-lg text-[#EEEDE7] mb-6">شركاء التأمين</h3>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {insurancePartners.map((p) => (
              <div key={p} className="bg-[#111] border border-white/5 px-6 py-3">
                <span className="font-heading font-bold text-sm text-[#EEEDE7]">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f2ec] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-heading font-black text-2xl sm:text-3xl text-black mb-4">استقبال العملاء</h3>
          <p className="text-[#666] mb-6">تضم مراكز الخدمة لدينا صالات استقبال مريحة مع مشروبات منعشة أثناء الانتظار. كما نوفر خدمة استلام المركبة وتسليمها لراحتك.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="tel:800364" dir="ltr" className="flex items-center gap-2 text-sm text-[#666] hover:text-[#EE5A01] transition-colors"><Phone className="w-4 h-4" /> 800 364</a>
            <a href="https://wa.me/97145063030" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#666] hover:text-[#EE5A01] transition-colors"><MessageSquare className="w-4 h-4" /> واتساب</a>
            <a href="mailto:autocare@eurogulf.ae" className="flex items-center gap-2 text-sm text-[#666] hover:text-[#EE5A01] transition-colors"><Mail className="w-4 h-4" /> البريد الإلكتروني</a>
          </div>
        </div>
      </section>

      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black mb-4">احجز خدمة مركبتك</h2>
          <p className="text-black/70 mb-8 max-w-lg mx-auto">سواء كنت بحاجة إلى صيانة دورية أو إصلاحات شاملة، تقدم يوروجلف أوتو جراج جودة ورش من الفئة A.</p>
          <Link to="/ar/contact" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm px-8 py-4 hover:bg-[#111] transition-colors inline-block">اتصل بنا</Link>
        </div>
      </section>
    </div>
  );
}
