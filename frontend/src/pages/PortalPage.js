import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lock, ArrowRight, Building2, Truck } from 'lucide-react';

const EGMG_LOGO = "/egmg-logo-transparent.png";

export default function PortalPage() {
  useEffect(() => { document.title = "Client & Partner Portals | Eurogulf Mobility Group"; }, []);

  return (
    <div data-testid="portal-page">
      {/* HERO */}
      <section data-testid="portal-hero" className="relative min-h-[45vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111_0%,#000_50%,#0a0a0a_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 pt-28 pb-12 text-center">
          <img src={EGMG_LOGO} alt="Eurogulf Mobility Group" className="h-12 w-auto mx-auto mb-6 opacity-90" />
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">
            Client & Partner Portals
          </h1>
          <p className="font-body text-base text-[#EEEDE7]/70 max-w-xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Secure access for corporate clients and driver/partner accounts.
          </p>
        </div>
      </section>

      {/* PORTAL CARDS */}
      <section className="bg-[#0a0a0a] py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Corporate Portal */}
            <div data-testid="corporate-portal-card" className="bg-[#111] border border-white/5 p-8 hover:border-[#EE5A01]/30 transition-all">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-[#EE5A01]/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-7 h-7 text-[#EE5A01]" />
                </div>
                <div className="flex-1">
                  <h2 className="font-heading font-black text-xl text-[#EEEDE7] uppercase tracking-tight mb-2">Corporate Client Portal</h2>
                  <p className="font-body text-sm text-[#999] leading-relaxed mb-4">
                    Access your corporate account dashboard, manage bookings, view invoices, track fleet utilisation, and download reports. Available to approved corporate account holders.
                  </p>
                  <div className="flex items-center gap-2 text-[#666] font-body text-xs mb-4">
                    <Lock className="w-3.5 h-3.5" /> Secure login required · Contact your account manager for access
                  </div>
                  <Link to="/contact" className="inline-flex items-center gap-2 text-[#EE5A01] font-heading text-sm font-bold hover:gap-3 transition-all">
                    Request Portal Access <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Driver/Partner Portal */}
            <div data-testid="driver-portal-card" className="bg-[#111] border border-white/5 p-8 hover:border-[#EE5A01]/30 transition-all">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-[#EE5A01]/10 flex items-center justify-center flex-shrink-0">
                  <Truck className="w-7 h-7 text-[#EE5A01]" />
                </div>
                <div className="flex-1">
                  <h2 className="font-heading font-black text-xl text-[#EEEDE7] uppercase tracking-tight mb-2">Driver / Partner Portal</h2>
                  <p className="font-body text-sm text-[#999] leading-relaxed mb-4">
                    Access driver schedules, trip assignments, compliance documentation, and operational resources. Available to registered drivers and transport partners within the Eurogulf Mobility Group network.
                  </p>
                  <div className="flex items-center gap-2 text-[#666] font-body text-xs mb-4">
                    <Lock className="w-3.5 h-3.5" /> Secure login required · Contact operations for access
                  </div>
                  <Link to="/contact" className="inline-flex items-center gap-2 text-[#EE5A01] font-heading text-sm font-bold hover:gap-3 transition-all">
                    Request Portal Access <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EE5A01] py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="font-body text-black/80 mb-4">Need help with portal access? Contact your account manager or reach out to our support team.</p>
          <Link to="/contact" className="bg-black text-[#EEEDE7] font-heading font-bold text-sm tracking-[0.05em] px-8 py-3.5 hover:bg-[#111] transition-colors inline-block">Contact Support</Link>
        </div>
      </section>
    </div>
  );
}
