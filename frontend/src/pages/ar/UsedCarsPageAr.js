import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Check, Eye, FileText, ArrowLeft } from 'lucide-react';
import { AuctionTimer } from '@/pages/UsedCarsPage';

const EGMG_LOGO = "/egmg-logo-transparent.png";
const HERO_IMG = "https://images.unsplash.com/photo-1669485971006-d1f811a22700?w=1400&h=700&fit=crop";

const advantages = [
  { icon: Shield, title: "مالك واحد وتاريخ موثق", desc: "كل مركبة جاءت مباشرة من أسطول التأجير التشغيلي ليوروبكار دبي. لا مركبات مستبدلة من أطراف ثالثة ولا تاريخ مخفي." },
  { icon: FileText, title: "صيانة معتمدة من المصنّع", desc: "صيانة حصرية في ورش مملوكة لمجموعة يوروجلف للتنقل بقطع غيار أصلية، مع سجل خدمة رقمي كامل عند البيع." },
  { icon: Check, title: "تقرير فحص من ١١٠ نقاط", desc: "كل مركبة معروضة تحمل شهادة الفحص المعتمدة لدينا وتغطي الهيكل والميكانيك والكهرباء والمطابقة." },
  { icon: Eye, title: "سجل نظيف لدى هيئة الطرق وخلوّ من الحوادث", desc: "سجل موثق، فحص ساري من هيئة الطرق والمواصلات، ولا أضرار مسجلة في الشاسيه." },
];

const auctionSteps = [
  { num: "١", title: "تحديث المخزون", desc: "تُنشر دفعة جديدة من ٦ إلى ١٠ مركبات سابقة في الأسطول كل يوم ثلاثاء في الساعة ١٥:٠٠ بتوقيت الخليج." },
  { num: "٢", title: "افحص وقرر", desc: "استعرض المواصفات الكاملة، ٤ إلى ٥ صور لكل مركبة، درجة الفحص وسجل الصيانة الكامل." },
  { num: "٣", title: "مزايدة سرية", desc: "قدّم عرضاً مختوماً بزيادات قدرها ٥٠٠ درهم. ترى عروضك فقط، ولا ترى عروض الآخرين أبداً." },
  { num: "٤", title: "إغلاق الدورة", desc: "يُغلق المزاد كل يوم اثنين في الساعة ١٢:٠٠ بتوقيت الخليج. يُبلَّغ الفائزون خلال ساعتين." },
];

const sampleVehicles = [
  { name: "تويوتا كامري 2.5 SE", year: "٢٠٢٢", type: "سيدان", km: "٤٩ ألف كم", color: "أبيض لؤلؤي", grade: "A", bid: "اتصل لمعرفة السعر" },
  { name: "هيونداي توسان 1.6T", year: "٢٠٢٣", type: "دفع رباعي", km: "٣٢ ألف كم", color: "فضي معدني", grade: "A", bid: "اتصل لمعرفة السعر" },
  { name: "نيسان باترول بلاتينيوم", year: "٢٠٢١", type: "دفع رباعي كبير", km: "٧٢ ألف كم", color: "أسود أونيكس", grade: "A", bid: "١٤٥,٠٠٠ درهم" },
  { name: "تويوتا كورولا 2.0 SE", year: "٢٠٢٣", type: "سيدان", km: "٢٨ ألف كم", color: "أبيض جليدي", grade: "A+", bid: "اتصل لمعرفة السعر" },
  { name: "كيا سبورتاج 2.0", year: "٢٠٢٢", type: "دفع رباعي مدمج", km: "٤١ ألف كم", color: "رمادي فولاذي", grade: "A", bid: "اتصل لمعرفة السعر" },
  { name: "نيسان إكس تريل 2.5 SV", year: "٢٠٢٢", type: "دفع رباعي متوسط", km: "٥٥ ألف كم", color: "أسود ماسي", grade: "A", bid: "اتصل لمعرفة السعر" },
];

const buyOptions = [
  { title: "استعرض عبر الإنترنت", desc: "المخزون الكامل، ٤ إلى ٥ صور، المواصفات ودرجة الفحص." },
  { title: "فحص شخصي", desc: "احجز معاينة لمدة ٣٠ دقيقة في أي فرع من فروع مجموعة يوروجلف للتنقل." },
  { title: "تصفّح كزائر", desc: "استعرض المخزون الكامل دون حساب. سجّل الدخول فقط للمزايدة." },
];

export default function UsedCarsPageAr() {
  useEffect(() => { document.title = "يوروجلف للسيارات المستعملة | مركبات معتمدة سابقة في الأسطول في دبي | مجموعة يوروجلف للتنقل"; }, []);

  return (
    <div dir="rtl" data-testid="used-cars-page-ar" className="font-body">
      <section data-testid="ar-used-cars-hero" className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="مركبات مستعملة في دبي" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <img src={EGMG_LOGO} alt="مجموعة يوروجلف للتنقل" className="h-12 w-auto mx-auto mb-6 opacity-90" />
          <span className="font-mono text-xs text-[#EE5A01] mb-4 block">قسم المركبات المستعملة في مجموعة يوروجلف للتنقل</span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl text-[#EEEDE7] mb-4">مركبات مستعملة تثق بها. بدعم ٥٠ عاماً من خبرة الأساطيل.</h1>
          <p className="text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8">كل مركبة تبيعها يوروجلف للسيارات المستعملة تمت صيانتها وفق أعلى معايير الأساطيل في ورش مجموعة يوروجلف للتنقل من الفئة A. مسافات قليلة. سجل كامل. تسعير شفاف.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ar/contact" data-testid="ar-used-cars-view-btn" className="btn-primary">استعرض المركبات المعروضة للبيع</Link>
            <a href="#how-it-works" className="btn-ghost">كيف يعمل المزاد</a>
          </div>
        </div>
      </section>

      <section className="bg-[#111] border-y border-white/5 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-6 text-center sm:text-right">
              <div>
                <p className="font-heading text-[10px] text-[#666]">نشر المخزون</p>
                <p className="font-heading font-bold text-sm text-[#EEEDE7]">الثلاثاء · ١٥:٠٠ بتوقيت الخليج</p>
              </div>
              <div className="w-px h-8 bg-white/10 hidden sm:block" />
              <div>
                <p className="font-heading text-[10px] text-[#666]">إغلاق المزايدة</p>
                <p className="font-heading font-bold text-sm text-[#EEEDE7]">الاثنين · ١٢:٠٠ بتوقيت الخليج</p>
              </div>
              <div className="w-px h-8 bg-white/10 hidden sm:block" />
              <div>
                <p className="font-heading text-[10px] text-[#666]">يُغلق المزاد خلال</p>
                <div dir="ltr"><AuctionTimer labels={["ي", "س", "د", "ث"]} /></div>
              </div>
            </div>
            <p className="font-mono text-[10px] text-[#666]">مزاد سري · زيادات ٥٠٠ درهم</p>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] mb-3">مخزون هذا الأسبوع</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sampleVehicles.map((v) => (
              <div key={v.name} className="bg-[#111] border border-white/5 p-5 hover:border-[#EE5A01]/30 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="font-mono text-[10px] text-[#666]">{v.year} · {v.type}</span>
                    <h3 className="font-heading font-bold text-base text-[#EEEDE7]">{v.name}</h3>
                  </div>
                  <span className="bg-[#EE5A01]/10 text-[#EE5A01] font-mono text-[10px] px-2 py-0.5">الفئة {v.grade}</span>
                </div>
                <p className="text-xs text-[#666] mb-3">{v.km} · أوتوماتيك · {v.color}</p>
                <div className="border-t border-white/5 pt-3 flex items-center justify-between">
                  <div>
                    <p className="font-heading text-[10px] text-[#666]">العرض الابتدائي</p>
                    <p className="font-heading font-bold text-sm text-[#EE5A01]">{v.bid}</p>
                  </div>
                  <Link to="/ar/contact" className="text-[#EE5A01] font-heading text-xs hover:underline flex items-center gap-1">
                    استفسر <ArrowLeft className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] mb-3">ليست مستعملة فحسب. بل كانت تحت إدارة يوروجلف.</h2>
            <p className="text-[#666] max-w-xl mx-auto">كل مركبة في المزاد السري جاءت مباشرة من أسطول التأجير التشغيلي ليوروبكار دبي. نعرف كل كيلومتر وكل صيانة وكل مالك منذ اليوم الأول.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {advantages.map((a) => (
              <div key={a.title} className="bg-[#111] border border-white/5 p-7 hover:border-[#EE5A01]/30 transition-all">
                <a.icon className="w-8 h-8 text-[#EE5A01] mb-4" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-base text-[#EEEDE7] mb-2">{a.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="orange-accent-line mx-auto mb-6" />
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] mb-3">كيف يعمل المزاد</h2>
            <p className="text-[#666]">دقة بمستوى الجملة. بساطة بمستوى التجزئة.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {auctionSteps.map((s) => (
              <div key={s.num} className="text-center">
                <div className="w-12 h-12 bg-[#EE5A01] flex items-center justify-center mx-auto mb-4">
                  <span className="font-heading font-black text-lg text-black">{s.num}</span>
                </div>
                <h3 className="font-heading font-bold text-sm text-[#EEEDE7] mb-2">{s.title}</h3>
                <p className="text-xs text-[#666] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            {buyOptions.map((item) => (
              <div key={item.title} className="bg-[#111] border border-white/5 p-5 text-center">
                <h4 className="font-heading font-bold text-sm text-[#EEEDE7] mb-1">{item.title}</h4>
                <p className="text-xs text-[#666]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-black mb-4">استعرض مخزون هذا الأسبوع</h2>
          <p className="text-black/70 mb-8 max-w-lg mx-auto">مركبات جديدة تُضاف كل يوم ثلاثاء. يُغلق المزاد السري كل يوم اثنين في الساعة ١٢:٠٠ بتوقيت الخليج.</p>
          <Link to="/ar/contact" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm px-8 py-4 hover:bg-[#111] transition-colors inline-block">تواصل مع قسم المركبات المستعملة</Link>
        </div>
      </section>
    </div>
  );
}
