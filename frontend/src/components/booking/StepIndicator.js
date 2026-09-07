import { Check, Clock, MapPin, Car } from 'lucide-react';

export const STEPS = [
  { label: "Duration", icon: Clock },
  { label: "Trip Details", icon: MapPin },
  { label: "Vehicle", icon: Car },
  { label: "Confirm", icon: Check },
];

function getStepStyle(done, active) {
  if (done) return 'bg-[#EE5A01] text-white';
  if (active) return 'bg-[#EE5A01]/20 border-2 border-[#EE5A01] text-[#EE5A01]';
  return 'bg-white border border-black/15 text-[#666666]';
}

function getStepLabelStyle(done, active) {
  if (active) return 'text-[#EE5A01]';
  if (done) return 'text-[#121212]';
  return 'text-[#666666]';
}

export function StepIndicator({ current, steps }) {
  return (
    <div data-testid="step-indicator" className="flex items-center justify-center gap-0 w-full max-w-2xl mx-auto mb-10 sm:mb-14">
      {steps.map((s, i) => {
        const Icon = s.icon;
        const done = i < current;
        const active = i === current;
        return (
          <div key={s.label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2 relative">
              <div
                data-testid={`step-${i}-indicator`}
                className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-300 ${getStepStyle(done, active)}`}
              >
                {done ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              <span className={`text-[10px] sm:text-xs font-heading tracking-wider uppercase whitespace-nowrap ${getStepLabelStyle(done, active)}`}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-[2px] flex-1 mx-2 sm:mx-3 transition-colors duration-300 ${done ? 'bg-[#EE5A01]' : 'bg-[#222]'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
