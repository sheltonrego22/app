import { useEffect } from 'react';
import { LeadershipSection } from '@/components/LeadershipSection';
import { AboutHero, WhoWeAre, Timeline, VisionValues, BrandsGrid, AwardsGrid } from '@/components/about/AboutSections';

export default function AboutPage() {
  useEffect(() => { document.title = "About Eurogulf Mobility Group | Integrated Mobility Ecosystem UAE"; }, []);

  return (
    <div data-testid="about-page">
      <AboutHero />
      <WhoWeAre />
      <Timeline />
      <VisionValues />
      <LeadershipSection lang="en" />
      <BrandsGrid />
      <AwardsGrid />
    </div>
  );
}
