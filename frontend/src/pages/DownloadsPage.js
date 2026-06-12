import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, FileText, BookOpen, CreditCard } from 'lucide-react';

const EGMG_LOGO = "/egmg-logo-transparent.png";

const downloads = [
  { icon: BookOpen, title: "EGMG Corporate Brochure", desc: "Overview of Eurogulf Mobility Group, our brands, and service capabilities.", format: "PDF", size: "4.2 MB" },
  { icon: FileText, title: "Europcar Fleet Guide", desc: "Complete vehicle range across short-term, monthly, and leasing categories.", format: "PDF", size: "2.8 MB", href: "https://egmg.ae/wp-content/uploads/2026/01/5-Pages-Fleet.pdf" },
  { icon: CreditCard, title: "Europcar Rate Card", desc: "Current rental rates for daily, weekly, and monthly hire across the UAE.", format: "PDF", size: "1.1 MB" },
  { icon: FileText, title: "Truckline Commercial Fleet Guide", desc: "Commercial vehicle categories, leasing terms, and fleet support overview.", format: "PDF", size: "1.8 MB" },
  { icon: FileText, title: "Rental Terms & Conditions", desc: "Standard rental agreement terms for Europcar Dubai and Northern Emirates.", format: "PDF", size: "320 KB" },
  { icon: FileText, title: "Leasing Terms & Conditions", desc: "Long-term leasing agreement framework and general commercial terms.", format: "PDF", size: "410 KB" },
];

export default function DownloadsPage() {
  useEffect(() => { document.title = "Download Center — Eurogulf Mobility Group"; }, []);

  return (
    <div data-testid="downloads-page">
      {/* HERO */}
      <section className="relative min-h-[45vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 pt-28 pb-12 text-center">
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Download Center
          </h1>
          <p className="font-body text-base text-[#EEEDE7]/70 max-w-xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Access brochures, rate cards, fleet guides, and terms & conditions.
          </p>
        </div>
      </section>

      {/* DOWNLOADS GRID */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {downloads.map((d, i) => (
              <div key={d.title} data-testid={`download-${i}`} className="bg-[#111] border border-white/5 p-6 hover:border-[#EE5A01]/30 transition-all group">
                <d.icon className="w-8 h-8 text-[#EE5A01] mb-4" strokeWidth={1.5} />
                <h3 className="font-heading font-bold text-sm text-[#EEEDE7] mb-2">{d.title}</h3>
                <p className="font-body text-xs text-[#666] leading-relaxed mb-4">{d.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#666] tracking-wider">{d.format} · {d.size}</span>
                  {d.href ? (
                    <a href={d.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#EE5A01] font-heading text-xs font-bold hover:gap-2 transition-all">
                      <Download className="w-3.5 h-3.5" /> Download
                    </a>
                  ) : (
                    <span className="flex items-center gap-1.5 text-[#666] font-heading text-xs">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EE5A01] py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="font-body text-black/80 mb-4">Need a document not listed here? Contact our team and we'll send it to you directly.</p>
          <Link to="/contact" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-3.5 hover:bg-[#111] transition-colors inline-block">Contact Us</Link>
        </div>
      </section>
    </div>
  );
}
