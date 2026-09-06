import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, Clock, Shield, MapPin } from 'lucide-react';

const HERO_IMG = "https://images.unsplash.com/photo-1546412414-c2658fffe7d9?w=1400&h=700&fit=crop";
const BOOKING_URL = "https://www.goldcar.com/en-gb/car-rental/locations/dubai/";

const strengths = [
  { icon: Shield, title: "معايير جودة عالية", desc: "بخبرة تتجاوز ٣٥ عاماً في القطاع، تقدم جولدكار خدمة موثوقة تستند إلى تميز تشغيلي مُثبت ومعايير مجموعة يوروبكار للتنقل." },
  { icon: Clock, title: "خدمة عملاء على مدار الساعة", desc: "مساعدة على الطريق طوال اليوم تضمن ألا تبقى عالقاً أبداً. فريق الدعم لدينا على بُعد مكالمة واحدة، ليلاً أو نهاراً." },
  { icon: Star, title: "أسطول مركبات بخمس نجوم", desc: "تشكيلة واسعة من المركبات القياسية والمدمجة حديثة الطراز ومصانة بعناية، بدعم من مشغّل معتمد عالمياً وحاصل على شهادة الأيزو." },
];

const whatMakesDifferent = [
  "أفضل أسعار التأجير في السوق مع تسعير شفاف",
  "الوصول إلى كامل شبكة فروع ومطارات يوروبكار دبي",
  "أسطول حديث ومصان بعناية من المركبات القياسية والمدمجة",
  "دعم من مشغّل معتمد عالمياً وحاصل على شهادة الأيزو",
  "حجز بسيط وسريع: عبر الإنترنت أو الهاتف أو في المطار",
];

const stats = [
  { val: "+٣٥", label: "عاماً من الخبرة" },
  { val: "+٦٠,٠٠٠", label: "مركبة حول العالم" },
  { val: "+١٠٠", label: "مكتب حول العالم" },
  { val: "#١", label: "التأجير الاقتصادي في أوروبا" },
];

export default function GoldcarPageAr() {
  useEffect(() => { document.title = "جولدكار دبي | تأجير سيارات اقتصادي قصير الأجل | مجموعة يوروجلف للتنقل"; }, []);

  return (
    <div dir="rtl" data-testid="goldcar-page-ar" className="font-body">
      <section data-testid="ar-goldcar-hero" className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="جولدكار للتأجير" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <img src="/goldcar-logo.png" alt="جولدكار من مجموعة يوروجلف للتنقل" className="h-10 w-auto mx-auto mb-6 opacity-90" loading="lazy" />
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] mb-4">السفر الذكي يبدأ من هنا.</h1>
          <p className="text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8">خدمة تنقل ذاتية القيادة تركز على القيمة، مصممة للعملاء الباحثين عن حلول تأجير عملية وميسورة بأبسط الإجراءات.</p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-testid="ar-goldcar-book-btn" className="btn-primary inline-block">احجز بأفضل الأسعار</a>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="orange-accent-line mb-6 mr-0 ml-auto" />
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] mb-6">العلامة التي أعادت ابتكار تأجير السيارات الاقتصادي</h2>
          <div className="space-y-4 text-[#999] leading-relaxed">
            <p>جولدكار هي أكبر علامة لتأجير السيارات الاقتصادي في أوروبا، بخبرة تتجاوز ٣٥ عاماً في تقديم تجارب سفر ذكية وعادلة وذات قيمة لملايين العملاء عبر القارة. تدير العلامة أسطولاً يزيد على ٦٠,٠٠٠ مركبة من خلال شبكة تضم ١٠٠ مكتب في إسبانيا والبرتغال وإيطاليا وفرنسا واليونان وكرواتيا وتركيا ومالطا وغيرها.</p>
            <p>جولدكار إحدى علامات مجموعة يوروبكار للتنقل، المؤسسة العالمية نفسها التي تقدم معايير يوروبكار المتميزة في أكثر من ١٤٣ دولة. وبفضل هذا الانتماء، يستفيد عملاء جولدكار من البنية التشغيلية للمجموعة ومعايير السلامة وقدرات خدمة العملاء، مع التمتع بأكثر أسعار التأجير تنافسية في السوق.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {stats.map((s) => (
              <div key={s.label} className="bg-[#111] border border-white/5 p-4 text-center">
                <p className="font-heading font-black text-xl text-[#EE5A01]">{s.val}</p>
                <p className="text-xs text-[#666] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] mb-4">تأجير سيارات ميسور. بخبرة احترافية.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {strengths.map((s) => (
              <div key={s.title} className="bg-[#111111] border border-white/5 p-8 hover:border-[#EE5A01]/30 transition-all">
                <s.icon className="w-10 h-10 text-[#EE5A01] mb-5" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-lg text-[#EEEDE7] mb-3">{s.title}</h3>
                <p className="text-sm text-[#666666] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="font-mono text-xs text-[#EE5A01]">جولدكار في الإمارات</span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] mt-3 mb-4">ما الذي يميز جولدكار</h2>
              <p className="text-[#999] leading-relaxed mb-6">في الإمارات، تتوفر خدمات جولدكار عبر جميع منافذ يوروبكار دبي في دبي والإمارات الشمالية، مع منصة خدمة مخصصة وحصرية في مطار الشارقة الدولي، ما يجعل جولدكار الخيار الذكي للمسافرين الباحثين عن القيمة والقادمين عبر أحد أسرع مراكز الطيران نمواً في المنطقة.</p>
              <ul className="space-y-3 mb-8">
                {whatMakesDifferent.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-[#EE5A01]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#EE5A01]" />
                    </div>
                    <span className="text-sm text-[#EEEDE7]">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-[#111] border border-[#EE5A01]/20 p-5 mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-[#EE5A01]" />
                  <span className="font-heading font-bold text-sm text-[#EEEDE7]">موقع حصري</span>
                </div>
                <p className="text-sm text-[#999]">منصة في مطار الشارقة الدولي بخدمة جولدكار مخصصة لجميع القادمين إلى الشارقة.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-block text-center">احجز جولدكار في مطار الشارقة</a>
                <Link to="/ar/europcar" className="btn-ghost inline-block text-center">ابحث عن موقع</Link>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1631603995254-a4d858b652c4?w=800&h=500&fit=crop" alt="أسطول جولدكار في دبي" className="w-full h-[420px] object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black mb-4">سافر بذكاء. ادفع أقل.</h2>
          <p className="text-black/70 mb-8 max-w-lg mx-auto">استكشف الإمارات على طريقتك مع جولدكار. أسعار ميسورة، عروض حصرية عبر الإنترنت، وخدمة سريعة.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm px-8 py-4 hover:bg-[#111111] transition-colors text-center">احجز جولدكار</a>
            <Link to="/ar/contact" className="bg-transparent text-black font-heading font-bold text-sm px-8 py-4 border-2 border-black hover:bg-black hover:text-[#EEEDE7] transition-all text-center">اتصل بنا</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
