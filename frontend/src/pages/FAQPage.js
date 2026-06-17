import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Search, Phone, Mail, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

const EGMG_LOGO = "/egmg-logo-transparent.png";

const faqCategories = [
  {
    title: "About Eurogulf Mobility Group",
    items: [
      { q: "What makes Eurogulf Mobility unique?", a: "Key differentiators include: a multi-brand mobility ecosystem, one of the largest fleet operators in the UAE with approximately 12,000 vehicles, 360-degree land-based mobility through integrated services (rental, leasing, and managed transport), and a strong presence at airports, city locations, and across all seven Emirates." },
      { q: "Can customers use multiple services across the group?", a: "Yes. Eurogulf Mobility Group enables customers to transition between self-drive rental, chauffeur services, and leasing solutions depending on their needs." },
      { q: "Where do you operate?", a: "We serve customers across Dubai, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain. Our chauffeur and managed transport services operate across all seven Emirates." },
      { q: "What does the Eurogulf service centre do?", a: "The service centre handles fleet maintenance and servicing, preventive and corrective repairs, and support for rental and leasing fleet operations." },
    ],
  },
  {
    title: "Our Services",
    items: [
      { q: "What services do you offer?", a: "We provide a full range of mobility solutions, including self-drive car rental (daily, weekly, monthly), long-term leasing (personal and corporate), chauffeur-driven car services, and staff and group transport solutions." },
      { q: "What is the difference between Europcar and Goldcar?", a: "Europcar is the premium, full-service rental brand with a wide vehicle selection. Goldcar is the budget-friendly option for short-term rentals." },
      { q: "Do you provide chauffeur-driven cars?", a: "Yes. We offer professional chauffeur services for airport transfers, corporate travel, events, and special occasions." },
      { q: "What is Managed Transport Services (MTS)?", a: "MTS is Eurogulf Mobility Group's chauffeur-driven and logistics solution, covering airport transfers, corporate transport, staff transport, and events and group movements." },
    ],
  },
  {
    title: "Rental & Booking",
    items: [
      { q: "How do I book a rental car?", a: "You can book through Europcar Dubai's website, by calling 800 EUROPCAR (800 387 67227), or by visiting any of our 14 UAE locations. Airport counters at DXB T1, T2, T3, DWC, and Sharjah Airport are available 24/7." },
      { q: "What documents do I need to rent a car?", a: "You will need a valid driving licence (UAE licence or international driving permit), a valid passport or Emirates ID, and a credit card in the renter's name for the security deposit." },
      { q: "Can I extend my rental?", a: "Yes. Contact our customer service team at customer.service@europcar.ae or call 800 364 to extend your rental. Extensions are subject to vehicle availability." },
      { q: "What is included in a monthly rental?", a: "Monthly rentals include CDW insurance, scheduled maintenance, 24/7 roadside assistance, and a replacement vehicle. Mileage packages start from 3,000 km/month. Free doorstep delivery and collection within Dubai, Sharjah, and Ajman." },
    ],
  },
  {
    title: "Leasing & Fleet",
    items: [
      { q: "What lease terms are available?", a: "Europcar offers tailor-made leasing solutions for 12 to 48 months or more, with customised mileage options. Submit an enquiry through our contact form and a specialist will follow up." },
      { q: "Is there a down payment for leasing?", a: "No. Europcar leasing solutions do not require a down payment. Monthly payments are fixed and predictable, covering registration, insurance, and maintenance." },
      { q: "How do I enquire about corporate fleet solutions?", a: "For corporate fleet, long-term leasing, or managed transport requirements, submit an enquiry through the contact form or email reservations@europcar.ae. These are routed to specialist follow-up." },
    ],
  },
  {
    title: "Chauffeur & Managed Transport",
    items: [
      { q: "How do I book a chauffeur service?", a: "Eurogulf Premium Chauffeur services are handled through specialist follow-up. Submit a transport enquiry through our website or call 800 364 and our team will come back with availability and service details." },
      { q: "What types of transport does Eurogulf Premium Chauffeur cover?", a: "Airport transfers, corporate and VIP transport, staff and crew shuttles, event and hospitality transport, one-off journeys, and longer-term managed mobility arrangements." },
    ],
  },
  {
    title: "Support & Emergencies",
    items: [
      { q: "What do I do in case of an accident?", a: "Ensure everyone is safe, contact emergency services if required, obtain a police report, then call 800 364 or 800 EUROPCAR (800 387 67227) for 24/7 roadside assistance. Our team will guide you through the next steps." },
      { q: "How do I report a vehicle issue during my rental?", a: "Call 800 364 for 24/7 roadside assistance. We provide immediate support including vehicle replacement where necessary." },
      { q: "Where are your service locations?", a: "Europcar Dubai operates across Dubai, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain. Abu Dhabi city operations are under a separate franchise. Visit our Contact page for the full location list." },
    ],
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/5">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="font-heading font-bold text-sm text-[#EEEDE7] group-hover:text-[#EE5A01] transition-colors pr-4">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-[#EE5A01] flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#666] flex-shrink-0" />}
      </button>
      {open && (
        <div className="pb-5">
          <p className="font-body text-sm text-[#999] leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { document.title = "FAQ & Help Center — Eurogulf Mobility Group"; }, []);

  const filteredCategories = faqCategories.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      !searchQuery || item.q.toLowerCase().includes(searchQuery.toLowerCase()) || item.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(cat => cat.items.length > 0);

  return (
    <div data-testid="faq-page">
      {/* HERO */}
      <section className="relative min-h-[45vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 pt-28 pb-12 text-center">
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            FAQ & Help Center
          </h1>
          <p className="font-body text-base text-[#EEEDE7]/70 max-w-xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Find answers to common questions about rental, leasing, chauffeur services, and support.
          </p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]" />
            <Input
              data-testid="faq-search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className="bg-[#111] border-[#333] text-[#EEEDE7] placeholder:text-[#444] rounded-none h-12 pl-11 text-sm"
            />
          </div>
        </div>
      </section>

      {/* FAQ CONTENT */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCategories.map((cat) => (
            <div key={cat.title} className="mb-12">
              <h2 className="font-heading font-black text-xl text-[#EE5A01] uppercase tracking-wider mb-4">{cat.title}</h2>
              <div className="bg-[#111] border border-white/5 px-6">
                {cat.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="font-body text-[#666]">No matching questions found. Try a different search term or contact us directly.</p>
            </div>
          )}
        </div>
      </section>

      {/* STILL NEED HELP */}
      <section className="bg-[#EE5A01] py-12">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-8">
          <span className="font-heading font-bold text-sm text-black">Still need help?</span>
          <a href="tel:800364" className="flex items-center gap-2 text-black font-heading font-bold text-sm"><Phone className="w-4 h-4" /> 800 364</a>
          <a href="mailto:customer.service@europcar.ae" className="flex items-center gap-2 text-black font-heading font-bold text-sm"><Mail className="w-4 h-4" /> customer.service@europcar.ae</a>
          <a href="https://wa.me/971800364" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-black font-heading font-bold text-sm"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
        </div>
      </section>
    </div>
  );
}
