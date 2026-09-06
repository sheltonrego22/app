import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, MapPin } from 'lucide-react';
import ar from '@/i18n/ar';

const t = ar.europcar;

const locations = [
  "مطار دبي الدولي، المبنى ١",
  "مطار دبي الدولي، المبنى ٢",
  "مطار دبي الدولي، المبنى ٣",
  "أبراج الإمارات",
  "أتلانتس النخلة",
  "دبي هيلز مول",
  "مطار آل مكتوم الدولي",
  "مطار الشارقة الدولي",
  "مكتب الشارقة",
  "جبل علي",
  "رأس الخيمة",
  "الفجيرة",
  "أبوظبي",
];

export default function EuropcarPageAr() {
  useEffect(() => { document.title = "يوروبكار دبي | تأجير سيارات متميز | مجموعة يوروجلف للتنقل"; }, []);

  return (
    <div dir="rtl" data-testid="europcar-page-ar" className="font-body">
      <section className="relative min-h-[65vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#2d8c3c]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <img src="/europcar-logo.png" alt="يوروبكار" className="h-10 w-auto mx-auto mb-6 opacity-90" />
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-[#EEEDE7] tracking-tight mb-4">{t.heroTitle}</h1>
          <p className="text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8">{t.heroSub}</p>
          <a href="https://www.europcar.com/" target="_blank" rel="noopener noreferrer" className="btn-primary inline-block">{ar.common.bookNow}</a>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: t.shortTerm, desc: t.shortTermDesc },
            { title: t.monthlyTitle, desc: t.monthlyDesc },
            { title: t.longTerm, desc: t.longTermDesc },
          ].map((item) => (
            <div key={item.title} className="bg-[#111] border border-white/5 p-6">
              <h3 className="font-heading font-bold text-base text-[#EEEDE7] mb-2">{item.title}</h3>
              <p className="text-sm text-[#666] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="orange-accent-line mb-6 mr-auto ml-0" />
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] tracking-tight mb-8">{t.locations}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {locations.map((loc) => (
              <div key={loc} className="bg-[#111] border border-white/5 p-3 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#EE5A01] flex-shrink-0" />
                <span className="text-xs text-[#EEEDE7]">{loc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl text-[#EEEDE7] tracking-tight mb-4">{t.internationalTitle}</h2>
          <p className="text-[#999] leading-relaxed max-w-2xl mx-auto mb-8">{t.internationalDesc}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[{ val: "١٤٣", label: "دولة" }, { val: "+٦,٠٠٠", label: "موقع تأجير" }, { val: "+١,٠٠٠,٠٠٠", label: "مركبة" }, { val: "١٩٤٩", label: "تأسست" }].map((s) => (
              <div key={s.label} className="bg-[#111] border border-white/5 p-4 text-center">
                <p className="font-heading font-black text-2xl text-[#EE5A01]">{s.val}</p>
                <p className="text-xs text-[#666] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl text-black tracking-tight mb-4">{ar.common.bookNow}</h2>
          <a href="https://www.europcar.com/" target="_blank" rel="noopener noreferrer" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm px-8 py-4 hover:bg-[#111] transition-colors inline-block">{ar.common.bookNow}</a>
        </div>
      </section>
    </div>
  );
}
