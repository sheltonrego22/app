import { Helmet } from 'react-helmet-async';

const SITE_NAME = "EGMG — Eurogulf Mobility Group";
const SITE_URL = "https://egmg.ae";
const DEFAULT_IMAGE = "https://egmg.ae/wp-content/webp-express/webp-images/uploads/2025/06/Screenshot-2024-08-15-at-3.54.03%E2%80%AFPM-2-1-1024x311.png.webp";

export function SEO({ title, description, path = "/", image }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const url = `${SITE_URL}${path}`;
  const img = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
    </Helmet>
  );
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Eurogulf Mobility Group",
    "alternateName": "EGMG",
    "url": SITE_URL,
    "logo": DEFAULT_IMAGE,
    "foundingDate": "1976",
    "description": "The UAE's most diversified mobility group operating Europcar, Goldcar, Royal Limousine, Emirates Taxi, Truckline, and Eurogulf Used Car Trading across 14 locations.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Street 6, Al Quoz Industrial Area",
      "addressLocality": "Dubai",
      "addressCountry": "AE",
      "postalCode": "P.O. Box 2533"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+971-800-364",
        "contactType": "customer service",
        "areaServed": "AE",
        "availableLanguage": "English"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/people/Eurogulf-Mobility-Group/61567335605176/",
      "https://www.instagram.com/eurogulfmobility",
      "https://www.linkedin.com/company/105403528/",
      "https://www.youtube.com/@EurogulfMobilityGroup-x1n"
    ],
    "numberOfEmployees": { "@type": "QuantitativeValue", "value": 1200 },
    "award": [
      "World Travel Awards — Best Car Rental Company MENA (2005-2024)",
      "ISO 9001:2015 Certified",
      "ISO 45001:2018 Certified"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Europcar Dubai — EGMG",
    "image": DEFAULT_IMAGE,
    "url": SITE_URL,
    "telephone": "+971-800-364",
    "email": "wemoveyou@eurogulf.ae",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Street 6, Al Quoz Industrial Area",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "addressCountry": "AE"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday","Monday","Tuesday","Wednesday","Thursday"],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "$$"
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
