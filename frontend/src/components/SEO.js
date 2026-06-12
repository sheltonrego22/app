import { Helmet } from 'react-helmet-async';

const seoData = {
  '/': {
    title: 'Eurogulf Mobility — UAE\'s Trusted Mobility Group Since 1976',
    description: 'Car rental, corporate leasing, premium chauffeur services, bus transportation, commercial fleet management, and used vehicle sales. Nearly 50 years. 10,000+ vehicles. 1,200+ professionals across the UAE.',
    keywords: 'car rental Dubai, corporate leasing UAE, chauffeur service Dubai, fleet management, Europcar Dubai, luxury transport UAE, Eurogulf Mobility',
  },
  '/about': {
    title: 'About Eurogulf Mobility — Our Story, Values & Heritage',
    description: 'Established in 1976, Eurogulf Mobility has grown from a single car rental counter to the UAE\'s most diversified mobility group. Discover our 50-year journey, F.A.I.R. values, and vision for the future.',
    keywords: 'Eurogulf Mobility history, UAE mobility group, car rental heritage, Dubai transport company',
  },
  '/services': {
    title: 'Mobility Solutions — Car Rental, Leasing, Chauffeur & Fleet | Eurogulf Mobility',
    description: 'Comprehensive mobility solutions: short-term car rental, monthly leasing, premium chauffeur services, commercial fleet leasing, luxury coaches, and certified used vehicles across the UAE.',
    keywords: 'mobility solutions UAE, car rental services Dubai, fleet leasing, chauffeur service',
  },
  '/europcar': {
    title: 'Europcar Dubai — Premium Car Rental & Vehicle Leasing',
    description: 'Europcar Dubai by Eurogulf Mobility. No.1 in Europe, No.3 worldwide. Daily, weekly, monthly rentals and 12-48 month leasing. 14 UAE locations including all Dubai Airport terminals. Book online.',
    keywords: 'Europcar Dubai, car rental Dubai airport, monthly car rental UAE, vehicle leasing Dubai',
  },
  '/goldcar': {
    title: 'Goldcar Dubai — Affordable Car Hire at the Best Price',
    description: 'Goldcar Dubai offers smart, value-for-money car rental. 35 years of low-cost rental excellence. Available at Europcar outlets across Dubai and exclusively at Sharjah International Airport.',
    keywords: 'cheap car rental Dubai, budget car hire, Goldcar Dubai, affordable rental Sharjah',
  },
  '/chauffeur-service': {
    title: 'Chauffeur Service Dubai — Airport & City Transfers | Eurogulf Mobility',
    description: 'Premium chauffeur service by Eurogulf Mobility. Airport transfers, one-way trips, half-day and full-day disposal. Fixed fares, 800+ RTA-approved drivers, ISO 9001 certified. Book online.',
    keywords: 'chauffeur service Dubai, airport transfer Dubai, luxury car service, VIP transport UAE',
  },
  '/book-chauffeur': {
    title: 'Book Your Chauffeur — Eurogulf Mobility',
    description: 'Book a premium chauffeur in Dubai. Choose from luxury sedans, SUVs, and executive vans. Fixed fares, professional drivers, available across all seven Emirates.',
    keywords: 'book chauffeur Dubai, luxury car booking, airport pickup Dubai',
  },
  '/leasing': {
    title: 'Corporate & Personal Car Leasing Dubai — Eurogulf Mobility',
    description: 'Operational car leasing for businesses and individuals. 12-48 month terms. Insurance, maintenance, and roadside assistance included. Trusted by 280+ UAE corporates. From AED 1,750/month.',
    keywords: 'car leasing Dubai, corporate fleet leasing, operational lease UAE, monthly car lease',
  },
  '/truckline': {
    title: 'Truckline — Commercial Vehicle Leasing & Fleet Management | Eurogulf Mobility',
    description: 'Commercial fleet leasing across the UAE. Vans, trucks, refrigerated units. Full operational lease with maintenance, telematics, and 24/7 support. Five dedicated workshops.',
    keywords: 'truck leasing Dubai, commercial fleet UAE, van rental, chiller truck hire',
  },
  '/used-cars': {
    title: 'Eurogulf Used Cars — Weekly Silent Auction of Ex-Europcar Fleet',
    description: 'Buy quality pre-owned vehicles from the Europcar Dubai managed fleet. Weekly silent auction, 110-point inspection, full service history, single-owner provenance.',
    keywords: 'used cars Dubai, ex fleet vehicles, car auction UAE, pre-owned cars',
  },
  '/contact': {
    title: 'Contact Eurogulf Mobility — Get in Touch',
    description: 'Contact the Eurogulf Mobility team. Available 24/7 at 800 364 (toll-free). Visit our HQ in Al Quoz Industrial Area 3, Dubai. Enquiries for rental, leasing, chauffeur, and fleet services.',
    keywords: 'contact Eurogulf Mobility, car rental enquiry Dubai, fleet quote UAE',
  },
  '/partners': {
    title: 'Our Partners & Clients — Eurogulf Mobility',
    description: 'Trusted by Emirates, Etihad, Dubai Municipality, Emaar, Atlantis, and hundreds of leading UAE organisations. Strategic partnerships with Esaad, Fazaa, and leading insurers.',
    keywords: 'Eurogulf Mobility clients, corporate partners UAE, fleet customers Dubai',
  },
  '/dubai-municipality': {
    title: 'Dubai Municipality Partnership — Eurogulf Mobility',
    description: 'Full fleet management for Dubai Municipality. Over 1,500 vehicles leased, maintained, and managed by Eurogulf Mobility. 98.5% fleet uptime. 24/7 support.',
    keywords: 'Dubai Municipality fleet, government fleet management UAE',
  },
  '/media': {
    title: 'Insights & News — Eurogulf Mobility',
    description: 'The latest from Eurogulf Mobility — press releases, industry insights, fleet updates, awards, mobility technology news, and UAE transport developments.',
    keywords: 'Eurogulf Mobility news, UAE mobility updates, transport industry insights',
  },
  '/mobility-technology': {
    title: 'Mobility Technology & Innovation — Eurogulf Mobility',
    description: 'How Eurogulf Mobility is investing in GPS telematics, AI-driven fleet operations, predictive maintenance, and electric vehicle integration to shape the future of UAE transport.',
    keywords: 'fleet technology UAE, smart mobility Dubai, AI transport, electric vehicles UAE',
  },
  '/leadership': {
    title: 'Leadership — Eurogulf Mobility',
    description: 'Meet the leadership team driving Eurogulf Mobility\'s vision, operational excellence, and continued growth across the UAE.',
    keywords: 'Eurogulf Mobility leadership, management team',
  },
  '/sustainability': {
    title: 'Sustainability — Driving a Greener Future | Eurogulf Mobility',
    description: 'Eurogulf Mobility\'s commitment to sustainable mobility — electric vehicle integration, emissions reduction, and alignment with the UAE Net Zero 2050 strategy.',
    keywords: 'sustainable mobility UAE, electric fleet Dubai, green transport',
  },
  '/careers': {
    title: 'Careers — Join the Eurogulf Mobility Team',
    description: 'Join the UAE\'s most diversified mobility group. Over 1,200 professionals. Explore opportunities in fleet management, customer service, operations, and more.',
    keywords: 'jobs Eurogulf Mobility, careers Dubai transport, fleet management jobs UAE',
  },
  '/businesses': {
    title: 'Our Brands — Eurogulf Mobility',
    description: 'Explore the Eurogulf Mobility family of brands: Europcar, Goldcar, Eurogulf Premium Chauffeur, Truckline, Eurogulf Used Cars, and Eurogulf Auto Garage.',
    keywords: 'Eurogulf Mobility brands, Europcar Dubai, Goldcar, Royal Limousine',
  },
};

export default function SEO({ pathname }) {
  const data = seoData[pathname] || seoData['/'];
  const url = `https://egmg-premium.emergent.host${pathname}`;

  return (
    <Helmet>
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
      <meta name="keywords" content={data.keywords} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Eurogulf Mobility" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={data.title} />
      <meta name="twitter:description" content={data.description} />
    </Helmet>
  );
}
