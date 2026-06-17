import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const MONTHLY_URL = "https://www.europcardubai.ae";

const included = [
  "CDW insurance included", "Scheduled maintenance included", "24/7 roadside assistance",
  "Replacement vehicle provided", "Free delivery within Dubai, Sharjah, Ajman",
  "Mileage from 3,000 km/month", "No large deposit required", "Flexible contract terms",
];

export default function SEOMonthlyRental() {
  useEffect(() => { document.title = "Monthly Car Rental Dubai | Flexible Monthly Hire from Europcar | Eurogulf Mobility Group"; }, []);

  return (
    <div>
      <section className="relative min-h-[60vh] flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-16 text-center">
          <span className="font-mono text-xs tracking-[0.3em] text-[#EE5A01] uppercase block mb-4">Europcar Dubai · Monthly Solutions</span>
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4">Monthly Car Rental Dubai</h1>
          <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto mb-8">
            A flexible medium-term mobility option for residents, long-stay visitors, and businesses. Fixed monthly rate, insurance included, and free doorstep delivery. The smarter alternative to vehicle ownership.
          </p>
          <a href={MONTHLY_URL} target="_blank" rel="noopener noreferrer" className="bg-[#2d8c3c] text-white font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:opacity-90 transition-opacity inline-block">Book Your Monthly Rental</a>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#EEEDE7] uppercase tracking-tight mb-6">What's Included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {included.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-[#111] border border-white/5 p-4">
                <Check className="w-4 h-4 text-[#EE5A01] mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm text-[#EEEDE7]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EE5A01] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading font-black text-3xl text-black uppercase tracking-tight mb-4">Start Your Monthly Rental</h2>
          <p className="font-body text-black/70 mb-8">Browse available vehicles and book online. Free delivery within the operating area.</p>
          <a href={MONTHLY_URL} target="_blank" rel="noopener noreferrer" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-4 hover:bg-[#111] transition-colors inline-block">Book Now</a>
        </div>
      </section>
    </div>
  );
}
