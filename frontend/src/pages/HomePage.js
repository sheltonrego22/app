import { useEffect } from 'react';
import { HeroSection, StatsBand } from '@/components/home/HeroSection';
import { BrandsGrid, PathSplit, HowItWorks } from '@/components/home/CoreSections';
import { WhyEurogulf, TrustedBy, LatestNews, SustainabilityTeaser, FinalCta } from '@/components/home/TrustSectionsV2';

export default function HomePage() {
  useEffect(() => { document.title = "Eurogulf Mobility Group | We Move You! | Car Rental, Leasing, Chauffeur & Fleet Solutions UAE"; }, []);

  return (
    <div data-testid="home-page">
      <HeroSection />
      <StatsBand />
      <BrandsGrid />
      <PathSplit />
      <HowItWorks />
      <WhyEurogulf />
      <TrustedBy />
      <LatestNews />
      <SustainabilityTeaser />
      <FinalCta />
    </div>
  );
}
