import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const EGMG_LOGO = "/egmg-logo-transparent.png";
const HERO_IMG = "https://images.unsplash.com/photo-1698348186158-253ce97914f9?w=1400&h=700&fit=crop";

const clientLogos = [
  "https://egmg.ae/wp-content/uploads/2025/06/l-4.png",
  "https://egmg.ae/wp-content/uploads/2025/06/l-3.png",
  "https://egmg.ae/wp-content/uploads/2025/06/l-2.png",
  "https://egmg.ae/wp-content/uploads/2025/06/l-9.png",
  "https://egmg.ae/wp-content/uploads/2025/06/l-8.png",
  "https://egmg.ae/wp-content/uploads/2025/06/l-11.png",
  "https://egmg.ae/wp-content/uploads/2025/06/l-10.png",
  "https://egmg.ae/wp-content/uploads/2025/06/l-7.png",
  "https://egmg.ae/wp-content/uploads/2025/06/l-6.png",
  "https://egmg.ae/wp-content/uploads/2025/06/l-5.png",
];

const sections = [
  { title: "عن تراكلاين", bg: "bg-[#0a0a0a]", text: "تقدم تراكلاين حلول تنقل تجارية للشركات التي تعتمد على المركبات لدعم عملياتها وخدماتها اللوجستية وتقديم خدماتها وحركة القوى العاملة لديها. وبوصفها جزءاً من منظومة يوروجلف للتنقل الأوسع، تتموضع تراكلاين لدعم متطلبات الأساطيل المصممة خصيصاً بدلاً من عرض تأجير ثابت يُفرض على الجميع." },
  { title: "دعم الأساطيل التجارية", bg: "bg-black", text: "يمكن لتراكلاين دعم مناقشات تأجير المركبات التجارية، والمتطلبات التشغيلية المتخصصة، واحتياجات المركبات المهيأة للاستخدام التجاري، وذلك رهناً بالتأكيد الفني والتجاري والتشغيلي. ونلتزم بلغة قائمة على القدرات دون التعهد بتجهيزات هيكل أو حمولات أو تكوينات مقاعد محددة ما لم يتم اعتمادها على نحو منفصل." },
  { title: "لماذا تراكلاين مختلفة", bg: "bg-[#0a0a0a]", text: "ما يعزز تراكلاين هو المنصة الأوسع التي تقف خلفها: خبرة في التنقل، وقدرة دعم على مستوى المجموعة، وبنية ورش صيانة متكاملة، ومنظومة أشمل قادرة على تقديم ما يتجاوز توفير المركبات. وهذا يخلق عرضاً أقوى للعملاء الباحثين عن الموثوقية والمساءلة والقيمة التشغيلية طويلة الأمد." },
];

export default function TrucklinePageAr() {
  useEffect(() => { document.title = "تراكلاين ترانسبورت | تأجير المركبات التجارية وإدارة الأساطيل في الإمارات | مجموعة يوروجلف للتنقل"; }, []);

  return (
    <div dir="rtl" data-testid="truckline-page-ar" className="font-body">
      <section data-testid="ar-truckline-hero" className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="أسطول تجاري" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <img src={EGMG_LOGO} alt="مجموعة يوروجلف للتنقل" className="h-12 w-auto mx-auto mb-6 opacity-90" loading="lazy" />
          <span className="font-mono text-xs text-[#EE5A01] mb-4 block">تراكلاين · بدعم من مجموعة يوروجلف للتنقل</span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] mb-4">تراكلاين ترانسبورت: حلول تأجير المركبات التجارية وإدارة الأساطيل</h1>
          <p className="text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8">حلول تنقل تجارية مبنية على الحاجة التشغيلية وكفاءة الأعمال والجدوى طويلة الأمد للأسطول.</p>
          <Link to="/ar/contact" data-testid="ar-truckline-cta" className="btn-primary inline-block">اطلب استشارة للأسطول</Link>
        </div>
      </section>

      {sections.map((s) => (
        <section key={s.title} className={`${s.bg} py-20 sm:py-28`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="orange-accent-line mb-6 mr-0 ml-auto" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] mb-6">{s.title}</h2>
            <p className="text-[#999] leading-relaxed">{s.text}</p>
          </div>
        </section>
      ))}

      <section className="bg-black py-14 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-mono text-xs text-[#666] text-center mb-8">شركاء يثقون بنا</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {clientLogos.map((logo, idx) => (
              <img key={logo} src={logo} alt={`عميل ${idx + 1}`} className="h-10 sm:h-12 w-auto object-contain brightness-0 invert opacity-50 hover:opacity-100 transition-opacity" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black mb-4">هل تحتاج إلى مناقشة أسطول تجاري؟</h2>
          <p className="text-black/70 mb-8 max-w-lg mx-auto">شاركنا متطلباتك وسيقوم فريقنا بمراجعتها والعودة إليك بالخطوات المناسبة.</p>
          <Link to="/ar/contact" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm px-8 py-4 hover:bg-[#111] transition-colors inline-block">اطلب استشارة للأسطول</Link>
        </div>
      </section>
    </div>
  );
}
