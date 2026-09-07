import { useEffect } from 'react';
import { Truck, Snowflake, Package, Settings, Wrench, ClipboardCheck } from 'lucide-react';
import { BrandHero, StatStrip, Prose, FeatureGrid, SplitSection, CheckList, LogoStrip, CtaBand } from '@/components/brand/BrandKit';

const clientLogos = [4, 3, 2, 9, 8, 11, 10, 7, 6, 5].map((n) => `https://egmg.ae/wp-content/uploads/2025/06/l-${n}.png`);
const stats = [{ value: "2021", label: "Launched within the group" }, { value: "12,000+", label: "Group fleet behind you" }, { value: "3", label: "A-grade workshops" }, { value: "24/7", label: "Recovery & support" }];
const capabilities = [
  { icon: Package, title: "Vans & light commercial", desc: "Panel vans and light commercial vehicles for deliveries, service teams and last-mile operations." },
  { icon: Truck, title: "Trucks & heavy vehicles", desc: "Configured business-use trucks supplied against confirmed technical and operational requirements." },
  { icon: Snowflake, title: "Chiller & specialist units", desc: "Temperature-controlled and specialist vehicles for F&B, pharma and cold-chain logistics." },
  { icon: Settings, title: "Fleet management & telematics", desc: "Live tracking, utilisation reporting and compliance support through the group's control room." },
  { icon: Wrench, title: "Workshop & maintenance", desc: "Preventive maintenance and repairs in Eurogulf Auto Garage's A-grade facilities, with replacement vehicles." },
  { icon: ClipboardCheck, title: "Registration, insurance & compliance", desc: "One monthly invoice covering registration, insurance, servicing and roadside recovery." },
];

export default function TrucklinePage() {
  useEffect(() => { document.title = "Truckline Transport | Commercial Vehicle Leasing & Fleet Management UAE"; }, []);

  return (
    <div data-testid="truckline-page">
      <BrandHero testid="truckline-hero" chip="Commercial Vehicle Leasing" title="Truckline Transport: commercial fleets built around your operation." lead="Vans, trucks and chiller units on flexible operational leases, with maintenance, telematics and 24/7 recovery managed by Eurogulf Mobility Group." image="/brand/truckline-truck.jpg" position="center 60%"
        ctas={[{ label: 'Request Fleet Consultation', href: '/contact', testid: 'truckline-hero-cta' }, { label: 'Call 800 364', href: 'tel:800364', external: true, variant: 'outline' }]} />
      <StatStrip stats={stats} testid="truckline-stats" />
      <Prose chip="About Truckline" title="Commercial mobility, not a one-size-fits-all lease." paragraphs={[
        "Truckline delivers commercial mobility solutions for businesses that rely on vehicles to support operations, logistics, service delivery and workforce movement. As part of the wider Eurogulf Mobility ecosystem, Truckline supports tailored fleet requirements rather than a fixed leasing proposition.",
        "Specialist body-builds, payloads and configurations are confirmed case by case against technical, commercial and operational requirements, so what you lease is exactly what your operation needs.",
      ]} />
      <FeatureGrid testid="truckline-capabilities" chip="Capabilities" title="Everything a working fleet needs." items={capabilities} itemTestId="truckline-capability" />
      <SplitSection bg="bg-[#FAFAFA]" reverse chip="Why Truckline" title="A whole mobility group behind every vehicle." desc="What strengthens Truckline is the platform behind it: 50 years of fleet expertise, in-house workshops, a 24/7 control room and a group that can support far more than vehicle supply." image="/brand/fleet-tech-map.jpg" imageAlt="Fleet telematics dashboard" imageClass="h-64 sm:h-80">
        <CheckList className="mt-6" items={["Operational leasing from 12 to 60 months", "Replacement vehicles to keep routes running", "Driver compliance and RTA support", "Single point of contact for the life of the contract"]} />
      </SplitSection>
      <LogoStrip title="Trusted by leading UAE businesses" logos={clientLogos} />
      <CtaBand title="Need a commercial fleet discussion?" desc="Share your requirement and our fleet specialists will come back with a tailored proposal." ctas={[{ label: 'Request Fleet Consultation', href: '/contact', testid: 'truckline-cta' }, { label: 'WhatsApp Us', href: 'https://wa.me/971800364', external: true, variant: 'outline' }]} />
    </div>
  );
}
