import { Wrench, Shield, Clock, CheckCircle, Phone, Mail, MessageSquare, Car, Zap, Sparkles, LifeBuoy, SprayCan } from 'lucide-react';
import { BrandHero, StatStrip, Prose, FeatureGrid, SplitSection, CheckList, CtaBand, SectionHeader } from '@/components/brand/BrandKit';

const stats = [{ value: "30+", label: "Years of fleet maintenance" }, { value: "3", label: "A-grade service centres" }, { value: "12,000+", label: "Vehicles maintained" }, { value: "24/7", label: "Recovery service" }];
const services = [
  { icon: Wrench, title: "Mechanical repairs", desc: "Comprehensive engine, transmission and drivetrain servicing for all makes and models." },
  { icon: Car, title: "Body repairs", desc: "Chassis alignment, panel beating and professional paint finishing to factory standards." },
  { icon: Zap, title: "Electrical repairs", desc: "Full diagnostics and repair for all vehicle electrical systems and components." },
  { icon: Sparkles, title: "Exterior & interior detailing", desc: "Professional detailing that restores your vehicle to showroom condition." },
  { icon: LifeBuoy, title: "24/7 recovery service", desc: "Round-the-clock vehicle recovery and roadside assistance across the UAE." },
  { icon: SprayCan, title: "Vehicle sterilisation", desc: "Complete interior sterilisation for fleet and individual vehicles." },
];
const features = [
  { icon: Shield, title: "A-grade insurance panel", desc: "Approved on the panels of the UAE's most reputed insurers: GIG, QIC, Oman Insurance, Tokio Marine and Noor Takaful." },
  { icon: Wrench, title: "3 service centres", desc: "Three fully equipped A-grade workshops supporting the group's fleet and external clients." },
  { icon: Clock, title: "ISO certified", desc: "ISO 9001:2015 certified technicians and quality management systems." },
  { icon: CheckCircle, title: "Collection & delivery", desc: "Vehicle pick-up and return for your convenience, or wait in our customer reception with refreshments." },
];
const insurers = ["GIG", "QIC", "Oman Insurance", "Tokio Marine", "Noor Takaful"];

export function AutocareHero() {
  return <BrandHero testid="autocare-hero" chip="Eurogulf Auto Garage" title="The workshops behind 12,000 vehicles, open to you." lead="A-grade service centres, ISO-certified technicians and 30 years of keeping one of the UAE's largest fleets on the road. Now available to individual owners and fleet operators." image="/brand/autocare-workshop.jpg" position="center 45%" ctas={[{ label: 'Book a Service', href: '/contact', testid: 'autocare-hero-cta' }, { label: 'Call 800 364', href: 'tel:800364', external: true, variant: 'outline' }]} />;
}

export function AutocareStats() { return <StatStrip stats={stats} testid="autocare-stats" />; }

export function AutocareAbout() {
  return <Prose chip="About Eurogulf Auto Garage" title="Three decades of quiet excellence." paragraphs={[
    "Eurogulf Auto Garage has been the silent engine behind Eurogulf Mobility Group's operational excellence for over three decades. As the in-house workshop infrastructure supporting one of the UAE's largest vehicle fleets, our service centres are built and operated to standards most retail garages cannot match.",
    "All three facilities hold A-grade status on the panels of the UAE's most reputed insurance companies, a recognition of our technical standards, safety practices and quality of output. The same world-class services are available to external clients and fleet operators seeking uncompromising maintenance quality.",
  ]} />;
}

export function ServicesGrid() { return <FeatureGrid chip="Our Services" title="Everything your vehicle needs, in one place." items={services} itemTestId="autocare-service" />; }

export function FeaturesGrid() { return <FeatureGrid bg="bg-[#FAFAFA]" chip="Why Eurogulf Auto Garage" title="Fleet-grade standards for every customer." items={features} cols={4} itemTestId="autocare-feature" />; }

export function InsurancePartners() {
  return (
    <SplitSection chip="Insurance Partners" title="Approved by the insurers you already trust." desc="Accident repairs are settled directly with your insurer through our A-grade panel approvals, so you get factory-standard repairs without the paperwork." image="/brand/rental-garage.jpg" imageAlt="Vehicles in the Eurogulf workshop" imageClass="h-64 sm:h-80">
      <div className="mt-6 flex flex-wrap gap-2">{insurers.map((p) => <span key={p} className="rounded-full border border-black/10 bg-white px-4 py-2 font-heading font-bold text-xs text-[#121212]">{p}</span>)}</div>
      <CheckList className="mt-6" items={["Direct insurer settlement", "Genuine OEM parts", "Digital service records for every job"]} />
    </SplitSection>
  );
}

export function ReceptionAndCta() {
  const link = "inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-2.5 font-heading font-bold text-sm text-[#121212] hover:border-[#EE5A01] hover:text-[#EE5A01] transition-colors";
  return (
    <>
      <section className="bg-[#EEEDE7] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader chip="Customer Reception" title="Comfortable while you wait, or we come to you." align="center" desc="Our service centres feature customer reception areas with refreshments. Alternatively, book vehicle collection and delivery for your convenience." />
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <a href="tel:800364" className={link}><Phone className="w-4 h-4 text-[#EE5A01]" /> 800 364</a>
            <a href="https://wa.me/971800364" target="_blank" rel="noopener noreferrer" className={link}><MessageSquare className="w-4 h-4 text-[#EE5A01]" /> WhatsApp</a>
            <a href="mailto:autocare@eurogulf.ae" className={link}><Mail className="w-4 h-4 text-[#EE5A01]" /> autocare@eurogulf.ae</a>
          </div>
        </div>
      </section>
      <CtaBand title="Book your vehicle service." desc="Routine maintenance or comprehensive repairs: Eurogulf Auto Garage delivers A-grade workshop quality." ctas={[{ label: 'Contact Us', href: '/contact', testid: 'autocare-cta' }]} />
    </>
  );
}
