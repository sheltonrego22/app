import { useEffect } from 'react';
import { UsedCarsHero, AuctionCycleBar, StockGrid, WhyBuy, HowItWorks, UsedCarsCta } from '@/components/usedcars/UsedCarsSections';


export default function UsedCarsPage() {
  useEffect(() => { document.title = "Eurogulf Used Cars | Certified Pre-Owned Vehicles Dubai | Ex-Fleet, Low Mileage, Verified"; }, []);

  return (
    <div data-testid="used-cars-page">
      <UsedCarsHero />
      <AuctionCycleBar />
      <StockGrid />
      <WhyBuy />
      <HowItWorks />
      <UsedCarsCta />
    </div>
  );
}
