import { useEffect } from 'react';
import { AutocareHero, AutocareAbout, ServicesGrid, FeaturesGrid, InsurancePartners, ReceptionAndCta } from '@/components/autocare/AutocareSections';

export default function AutocarePage() {
  useEffect(() => { document.title = "Eurogulf Auto Garage | Vehicle Service, Repair & Workshop Support"; }, []);

  return (
    <div data-testid="autocare-page">
      <AutocareHero />
      <AutocareAbout />
      <ServicesGrid />
      <FeaturesGrid />
      <InsurancePartners />
      <ReceptionAndCta />
    </div>
  );
}
