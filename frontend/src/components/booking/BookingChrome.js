import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const HERO_IMG = "https://images.unsplash.com/photo-1607414851776-f2fcc379fb48?w=1400&h=800&fit=crop";
const TRUST_STATS = [{ stat: "24/7", label: "Availability" }, { stat: "7", label: "Emirates Covered" }, { stat: "500+", label: "Luxury Vehicles" }, { stat: "Since 1976", label: "Trusted Legacy" }];

export function BookingHero() {
  const [heroRef, heroVisible] = useScrollAnimation();
  return (
    <section data-testid="chauffeur-hero" className="relative min-h-[55vh] flex items-center overflow-hidden">
      <img src={HERO_IMG} alt="Luxury chauffeur service in Dubai" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-black/65" />
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#EE5A01]" />
      <div ref={heroRef} className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16 text-center ${heroVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
        <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-7xl text-[#EEEDE7] uppercase tracking-tight mb-4 animate-fade-in-up">Book Your Chauffeur</h1>
        <p className="font-body text-base sm:text-lg text-[#EEEDE7]/70 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Premium chauffeur service by Eurogulf Premium Chauffeur. Professional drivers, luxury fleet, available across all seven Emirates.
        </p>
      </div>
    </section>
  );
}

export function WizardNav({ step, submitting, onBack, onNext, onSubmit }) {
  return (
    <div className="flex items-center justify-between mt-10 sm:mt-14 max-w-2xl mx-auto">
      {step > 0 ? (
        <button type="button" data-testid="btn-prev-step" onClick={onBack} className="btn-ghost flex items-center gap-2 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      ) : <div />}
      {step < 3 ? (
        <button type="button" data-testid="btn-next-step" onClick={onNext} className="btn-primary flex items-center gap-2">
          Continue <ArrowRight className="w-4 h-4" />
        </button>
      ) : (
        <button type="button" data-testid="btn-submit-booking" onClick={onSubmit} disabled={submitting} className="btn-primary flex items-center gap-2 disabled:opacity-50">
          {submitting ? 'SUBMITTING...' : 'Confirm Booking'} {!submitting && <Check className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}

export function TrustBar() {
  return (
    <section className="bg-black py-12 border-t border-[#222]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {TRUST_STATS.map((item) => (
            <div key={item.label}>
              <p className="font-heading font-black text-2xl sm:text-3xl text-[#EE5A01]">{item.stat}</p>
              <p className="font-body text-xs text-[#666] mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
