import { useEffect } from 'react';
import { StepIndicator, STEPS } from '@/components/booking/StepIndicator';
import { BookingConfirmation } from '@/components/booking/BookingConfirmation';
import { DurationStep } from '@/components/booking/DurationStep';
import { TripDetailsStep } from '@/components/booking/TripDetailsStep';
import { VehicleStep } from '@/components/booking/VehicleStep';
import { ConfirmStep } from '@/components/booking/ConfirmStep';
import { BookingHero, WizardNav, TrustBar } from '@/components/booking/BookingChrome';
import { useBookingWizard } from '@/hooks/useBookingWizard';

const STEP_COMPONENTS = [DurationStep, TripDetailsStep, VehicleStep, ConfirmStep];

export default function BookChauffeurPage() {
  const w = useBookingWizard();
  const Step = STEP_COMPONENTS[w.step];

  useEffect(() => { document.title = "Book Your Chauffeur | Eurogulf Mobility"; }, []);

  if (w.submitted) {
    return <BookingConfirmation form={w.form} bookingRef={w.bookingRef} getPrice={w.getPrice} onReset={w.reset} />;
  }

  return (
    <div data-testid="book-chauffeur-page">
      <BookingHero />
      <section data-testid="booking-wizard" className="bg-[#FAFAFA] py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <StepIndicator current={w.step} steps={STEPS} />
          <Step form={w.form} errors={w.errors} set={w.set} getPrice={w.getPrice} />
          {w.errors.submit && (
            <p data-testid="booking-submit-error" role="alert" className="mt-8 max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-600 font-body text-sm p-3 rounded-lg">{w.errors.submit}</p>
          )}
          <WizardNav step={w.step} submitting={w.submitting} onBack={w.back} onNext={w.next} onSubmit={w.submit} />
        </div>
      </section>
      <TrustBar />
    </div>
  );
}
