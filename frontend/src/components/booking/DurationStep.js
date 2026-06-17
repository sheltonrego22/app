import { Clock } from 'lucide-react';

const DURATION_OPTIONS = [
  { value: '4h', title: 'Half Day', subtitle: '4 Hours', desc: 'Ideal for airport transfers, business meetings, or city tours', from: 850 },
  { value: '8h', title: 'Full Day', subtitle: '8 Hours', desc: 'Perfect for events, multi-stop itineraries, or all-day availability', from: 1500 },
];

export function DurationStep({ form, errors, set }) {
  return (
    <div data-testid="step-duration" className="animate-fade-in">
      <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#EEEDE7] uppercase tracking-tight mb-2 text-center">Select Your Duration</h2>
      <p className="font-body text-sm text-[#666] text-center mb-8 sm:mb-10">Choose between a half-day or full-day chauffeur experience</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
        {DURATION_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            data-testid={`duration-${opt.value}`}
            onClick={() => set('duration', opt.value)}
            className={`text-left p-6 sm:p-8 border transition-all duration-300 group ${
              form.duration === opt.value ? 'border-[#EE5A01] bg-[#EE5A01]/5' : 'border-[#222] bg-[#111111] hover:border-[#EE5A01]/40'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 flex items-center justify-center transition-colors ${form.duration === opt.value ? 'bg-[#EE5A01] text-black' : 'bg-white/5 text-[#666] group-hover:text-[#EE5A01]'}`}>
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-[#EEEDE7]">{opt.title}</h3>
                <p className="font-mono text-xs text-[#EE5A01]">{opt.subtitle}</p>
              </div>
            </div>
            <p className="font-body text-sm text-[#999] mb-4">{opt.desc}</p>
            <p className="font-heading text-sm text-[#666]">From <span className="font-black text-[#EE5A01] text-lg">AED {opt.from.toLocaleString()}</span></p>
          </button>
        ))}
      </div>
      {errors.duration && <p className="text-[#EE5A01] text-xs mt-4 font-body text-center">{errors.duration}</p>}
    </div>
  );
}
