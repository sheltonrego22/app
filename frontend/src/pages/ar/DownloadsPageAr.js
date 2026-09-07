import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, FileText, BookOpen, CreditCard } from 'lucide-react';

const downloads = [
  { icon: BookOpen, title: "الملف التعريفي لمجموعة يوروجلف للتنقل", desc: "نظرة عامة على مجموعة يوروجلف للتنقل وعلاماتها التجارية وقدراتها الخدمية.", format: "PDF", size: "4.2 MB" },
  { icon: FileText, title: "دليل أسطول يوروبكار", desc: "التشكيلة الكاملة للمركبات عبر فئات التأجير قصير الأجل والشهري وطويل الأجل.", format: "PDF", size: "2.8 MB", href: "https://egmg.ae/wp-content/uploads/2026/01/5-Pages-Fleet.pdf" },
  { icon: CreditCard, title: "قائمة أسعار يوروبكار", desc: "أسعار التأجير الحالية اليومية والأسبوعية والشهرية في جميع أنحاء الإمارات.", format: "PDF", size: "1.1 MB" },
  { icon: FileText, title: "دليل الأسطول التجاري لتراكلاين", desc: "فئات المركبات التجارية وشروط التأجير ونظرة عامة على دعم الأساطيل.", format: "PDF", size: "1.8 MB" },
  { icon: FileText, title: "شروط وأحكام التأجير", desc: "الشروط القياسية لعقد التأجير في يوروبكار دبي والإمارات الشمالية.", format: "PDF", size: "320 KB" },
  { icon: FileText, title: "شروط وأحكام التأجير طويل الأجل", desc: "الإطار العام لعقود التأجير طويل الأجل والشروط التجارية العامة.", format: "PDF", size: "410 KB" },
];

export default function DownloadsPageAr() {
  useEffect(() => { document.title = "مركز التحميل | مجموعة يوروجلف للتنقل"; }, []);

  return (
    <div dir="rtl" data-testid="downloads-page-ar" className="font-body">
      <section data-testid="ar-downloads-hero" className="relative min-h-[45vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 pt-28 pb-12 text-center">
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[#EEEDE7] mb-4">مركز التحميل</h1>
          <p className="text-base text-[#EEEDE7]/70 max-w-xl mx-auto">احصل على الملفات التعريفية وقوائم الأسعار وأدلة الأسطول والشروط والأحكام.</p>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {downloads.map((d, i) => (
              <div key={d.title} data-testid={`ar-download-${i}`} className="bg-[#111] border border-white/5 p-6 hover:border-[#EE5A01]/30 transition-all group">
                <d.icon className="w-8 h-8 text-[#EE5A01] mb-4" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-sm text-[#EEEDE7] mb-2">{d.title}</h3>
                <p className="text-xs text-[#666] leading-relaxed mb-4">{d.desc}</p>
                <div className="flex items-center justify-between">
                  <span dir="ltr" className="font-mono text-[10px] text-[#666]">{d.format} · {d.size}</span>
                  {d.href ? (
                    <a href={d.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#EE5A01] font-heading text-xs font-bold hover:gap-2 transition-all">
                      <Download className="w-3.5 h-3.5" /> تحميل
                    </a>
                  ) : (
                    <span className="flex items-center gap-1.5 text-[#666] font-heading text-xs">قريباً</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EE5A01] py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-black/80 mb-4">هل تحتاج إلى مستند غير مدرج هنا؟ تواصل مع فريقنا وسنرسله إليك مباشرة.</p>
          <Link to="/ar/contact" data-testid="ar-downloads-contact-cta" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm px-8 py-3.5 hover:bg-[#111] transition-colors inline-block">اتصل بنا</Link>
        </div>
      </section>
    </div>
  );
}
