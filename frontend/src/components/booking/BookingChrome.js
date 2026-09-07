import { ArrowRight, ArrowLeft, Check, ShieldCheck, Clock, Star } from 'lucide-react';

const HERO_IMG = "/brand/chauffeur-door.jpg";
const TRUST = [{ icon: Clock, stat: "24/7", label: "Dispatch & flight monitoring" }, { icon: ShieldCheck, stat: "7", label: "Emirates licensed" }, { icon: Star, stat: "500+", label: "Premium vehicles" }, { icon: Check, stat: "Since 1990", label: "Chauffeur expertise" }];

export function BookingHero() {
  return (
    <section data-testid="chauffeur-hero" className="relative overflow-hidden bg-[#121212] text-white">
      <img src={HERO_IMG} alt="Eurogulf Premium Chauffeur opening a car door in Dubai" className="absolute inset-0 h-full w-full object-cover object-[center_30%]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <span className="chip-orange">Eurogulf Premium Chauffeur</span>
        <h1 className="mt-4 font-heading font-black text-3xl sm:text-5xl lg:text-6xl leading-[1.03] tracking-tight text-white max-w-3xl">Book your chauffeur in four steps.</h1>
        <p className="mt-4 font-body text-base sm:text-lg text-white/80 max-w-xl">Professional drivers, a luxury fleet and instant confirmation, available across all seven Emirates.</p>
      </div>
    </section>
  );
}

export function WizardNav({ step, submitting, onBack, onNext, onSubmit }) {
  return (
    <div className="flex items-center justify-between mt-10 sm:mt-14 max-w-2xl mx-auto">
      {step > 0 ? (
        <button type="button" data-testid="btn-prev-step" onClick={onBack} className="btn-ghost"><ArrowLeft className="w-4 h-4" /> Back</button>
      ) : <div />}
      {step < 3 ? (
        <button type="button" data-testid="btn-next-step" onClick={onNext} className="btn-primary">Continue <ArrowRight className="w-4 h-4" /></button>
      ) : (
        <button type="button" data-testid="btn-submit-booking" onClick={onSubmit} disabled={submitting} className="btn-primary disabled:opacity-50">
          {submitting ? 'Submitting...' : 'Confirm Booking'} {!submitting && <Check className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}

export function TrustBar() {
  return (
    <section className="bg-white py-12 border-t border-black/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {TRUST.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#FFF4ED] text-[#EE5A01] flex-shrink-0"><item.icon className="w-5 h-5" /></span>
            <div><p className="font-heading font-black text-lg text-[#121212] leading-none">{item.stat}</p><p className="mt-1 font-body text-xs text-[#666666]">{item.label}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}
