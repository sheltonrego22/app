import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Search, Phone, Mail, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

const faqCategories = [
  {
    title: "عن مجموعة يوروجلف للتنقل",
    items: [
      { q: "ما الذي يميز مجموعة يوروجلف للتنقل؟", a: "من أبرز عوامل التميز: منظومة تنقل متعددة العلامات التجارية، وأحد أكبر مشغلي الأساطيل في الإمارات بنحو ١٢,٠٠٠ مركبة، وتنقل بري متكامل بزاوية ٣٦٠ درجة عبر خدمات مترابطة (التأجير قصير الأجل، والتأجير طويل الأجل، والنقل المُدار)، إضافة إلى حضور قوي في المطارات ومواقع المدن وفي جميع الإمارات السبع." },
      { q: "هل يمكن للعملاء الاستفادة من عدة خدمات عبر المجموعة؟", a: "نعم. تتيح مجموعة يوروجلف للتنقل للعملاء الانتقال بين التأجير ذاتي القيادة وخدمات السائق الخاص وحلول التأجير طويل الأجل بحسب احتياجاتهم." },
      { q: "أين تعملون؟", a: "نخدم العملاء في دبي والشارقة وعجمان ورأس الخيمة والفجيرة وأم القيوين. وتعمل خدمات السائق الخاص والنقل المُدار في جميع الإمارات السبع." },
      { q: "ما دور مركز الخدمة في يوروجلف؟", a: "يتولى مركز الخدمة صيانة الأسطول وخدمته، والإصلاحات الوقائية والتصحيحية، ودعم عمليات أساطيل التأجير قصير وطويل الأجل." },
    ],
  },
  {
    title: "خدماتنا",
    items: [
      { q: "ما الخدمات التي تقدمونها؟", a: "نقدم مجموعة كاملة من حلول التنقل، تشمل تأجير السيارات ذاتية القيادة (يومي وأسبوعي وشهري)، والتأجير طويل الأجل (للأفراد والشركات)، وخدمات السيارات مع سائق، وحلول نقل الموظفين والمجموعات." },
      { q: "ما الفرق بين يوروبكار وجولدكار؟", a: "يوروبكار هي علامة التأجير المتميزة كاملة الخدمات مع تشكيلة واسعة من المركبات، بينما جولدكار هي الخيار الاقتصادي للتأجير قصير الأجل." },
      { q: "هل توفرون سيارات مع سائق؟", a: "نعم. نقدم خدمات سائق خاص احترافية لنقل المطارات وسفر الأعمال والفعاليات والمناسبات الخاصة." },
      { q: "ما هي خدمات النقل المُدار؟", a: "هي حلول مجموعة يوروجلف للتنقل للنقل مع سائق والخدمات اللوجستية، وتغطي نقل المطارات ونقل الشركات ونقل الموظفين وتحركات الفعاليات والمجموعات." },
    ],
  },
  {
    title: "التأجير والحجز",
    items: [
      { q: "كيف أحجز سيارة للتأجير؟", a: "يمكنك الحجز عبر موقع يوروبكار دبي، أو بالاتصال على 800 EUROPCAR (800 387 67227)، أو بزيارة أي من مواقعنا الأربعة عشر في الإمارات. منصات المطارات في مبانى دبي ١ و٢ و٣ ومطار آل مكتوم ومطار الشارقة متاحة على مدار الساعة." },
      { q: "ما المستندات المطلوبة لتأجير سيارة؟", a: "ستحتاج إلى رخصة قيادة سارية (رخصة إماراتية أو رخصة قيادة دولية)، وجواز سفر أو هوية إماراتية سارية، وبطاقة ائتمان باسم المستأجر لمبلغ التأمين." },
      { q: "هل يمكنني تمديد فترة التأجير؟", a: "نعم. تواصل مع فريق خدمة العملاء عبر customer.service@europcar.ae أو اتصل على 800 364 لتمديد التأجير. يخضع التمديد لتوافر المركبات." },
      { q: "ما الذي يشمله التأجير الشهري؟", a: "يشمل التأجير الشهري تأمين تغطية الأضرار، والصيانة الدورية، والمساعدة على الطريق على مدار الساعة، ومركبة بديلة. تبدأ حزم المسافات من ٣,٠٠٠ كم شهرياً، مع توصيل واستلام مجاني حتى باب المنزل في دبي والشارقة وعجمان." },
    ],
  },
  {
    title: "التأجير طويل الأجل والأساطيل",
    items: [
      { q: "ما مدد التأجير طويل الأجل المتاحة؟", a: "تقدم يوروبكار حلول تأجير مصممة خصيصاً لمدة ١٢ إلى ٤٨ شهراً أو أكثر، مع خيارات مسافات مخصصة. أرسل استفسارك عبر نموذج التواصل وسيتابع معك أحد المختصين." },
      { q: "هل هناك دفعة أولى للتأجير طويل الأجل؟", a: "لا. لا تتطلب حلول التأجير من يوروبكار دفعة أولى. الأقساط الشهرية ثابتة ويمكن التنبؤ بها، وتغطي التسجيل والتأمين والصيانة." },
      { q: "كيف أستفسر عن حلول أساطيل الشركات؟", a: "لمتطلبات أساطيل الشركات أو التأجير طويل الأجل أو النقل المُدار، أرسل استفساراً عبر نموذج التواصل أو راسلنا على reservations@europcar.ae، وسيتم توجيهه إلى المختصين للمتابعة." },
    ],
  },
  {
    title: "السائق الخاص والنقل المُدار",
    items: [
      { q: "كيف أحجز خدمة سائق خاص؟", a: "تتم إدارة خدمات يوروجلف بريميوم شوفير عبر متابعة مختصة. أرسل طلب نقل عبر موقعنا أو اتصل على 800 364 وسيعود إليك فريقنا بالتوافر وتفاصيل الخدمة." },
      { q: "ما أنواع النقل التي تغطيها يوروجلف بريميوم شوفير؟", a: "نقل المطارات، ونقل الشركات وكبار الشخصيات، ونقل الموظفين والطواقم، ونقل الفعاليات والضيافة، والرحلات الفردية، وترتيبات التنقل المُدار طويلة الأمد." },
    ],
  },
  {
    title: "الدعم والطوارئ",
    items: [
      { q: "ماذا أفعل في حال وقوع حادث؟", a: "تأكد من سلامة الجميع، واتصل بخدمات الطوارئ إن لزم الأمر، واحصل على تقرير الشرطة، ثم اتصل على 800 364 أو 800 EUROPCAR (800 387 67227) للمساعدة على الطريق على مدار الساعة. سيرشدك فريقنا إلى الخطوات التالية." },
      { q: "كيف أبلغ عن مشكلة في المركبة أثناء التأجير؟", a: "اتصل على 800 364 للمساعدة على الطريق على مدار الساعة. نقدم دعماً فورياً يشمل استبدال المركبة عند الحاجة." },
      { q: "أين تقع مواقع الخدمة لديكم؟", a: "تعمل يوروبكار دبي في دبي والشارقة وعجمان ورأس الخيمة والفجيرة وأم القيوين. أما عمليات مدينة أبوظبي فتتم عبر امتياز منفصل. تفضل بزيارة صفحة اتصل بنا للاطلاع على القائمة الكاملة للمواقع." },
    ],
  },
];

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/5">
      <button data-testid={`ar-faq-item-${index}`} onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-right group">
        <span className="font-heading font-bold text-sm text-[#EEEDE7] group-hover:text-[#EE5A01] transition-colors pl-4">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-[#EE5A01] flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#666] flex-shrink-0" />}
      </button>
      {open && <div className="pb-5"><p className="text-sm text-[#999] leading-relaxed">{a}</p></div>}
    </div>
  );
}

export default function FAQPageAr() {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { document.title = "الأسئلة الشائعة ومركز المساعدة | مجموعة يوروجلف للتنقل"; }, []);

  const filtered = faqCategories
    .map((cat) => ({ ...cat, items: cat.items.filter((item) => !searchQuery || item.q.includes(searchQuery) || item.a.includes(searchQuery)) }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div dir="rtl" data-testid="faq-page-ar" className="font-body">
      <section data-testid="ar-faq-hero" className="relative min-h-[45vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 pt-28 pb-12 text-center">
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[#EEEDE7] mb-4">الأسئلة الشائعة ومركز المساعدة</h1>
          <p className="text-base text-[#EEEDE7]/70 max-w-xl mx-auto mb-8">اعثر على إجابات للأسئلة الشائعة حول التأجير والتأجير طويل الأجل وخدمات السائق الخاص والدعم.</p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]" />
            <Input
              data-testid="ar-faq-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في الأسئلة..."
              className="bg-[#111] border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-12 pr-11 text-sm"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.map((cat, ci) => (
            <div key={cat.title} className="mb-12">
              <h2 className="font-heading font-black text-xl text-[#EE5A01] mb-4">{cat.title}</h2>
              <div className="bg-[#111] border border-white/5 px-6">
                {cat.items.map((item, ii) => <FAQItem key={item.q} q={item.q} a={item.a} index={`${ci}-${ii}`} />)}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#666]">لم نجد أسئلة مطابقة. جرّب كلمة بحث مختلفة أو تواصل معنا مباشرة.</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#EE5A01] py-12">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-8">
          <span className="font-heading font-bold text-sm text-black">ما زلت بحاجة إلى مساعدة؟</span>
          <a href="tel:800364" dir="ltr" className="flex items-center gap-2 text-black font-heading font-bold text-sm"><Phone className="w-4 h-4" /> 800 364</a>
          <a href="mailto:customer.service@europcar.ae" dir="ltr" className="flex items-center gap-2 text-black font-heading font-bold text-sm"><Mail className="w-4 h-4" /> customer.service@europcar.ae</a>
          <a href="https://wa.me/971800364" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-black font-heading font-bold text-sm"><MessageCircle className="w-4 h-4" /> واتساب</a>
        </div>
      </section>
    </div>
  );
}
