import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/hooks/useTheme";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import MobileContactBar from "@/components/MobileContactBar";
import RouteAnalytics from "@/components/RouteAnalytics";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ServicesPage from "@/pages/ServicesPage";
import ContactPage from "@/pages/ContactPage";
import LeadershipPage from "@/pages/LeadershipPage";
import SustainabilityPage from "@/pages/SustainabilityPage";
import MediaCenterPage from "@/pages/MediaCenterPage";
import EuropcarPage from "@/pages/EuropcarPage";
import GoldcarPage from "@/pages/GoldcarPage";
import TrucklinePage from "@/pages/TrucklinePage";
import UsedCarsPage from "@/pages/UsedCarsPage";
import CareersPage from "@/pages/CareersPage";
import BusinessesPage from "@/pages/BusinessesPage";
import BookChauffeurPage from "@/pages/BookChauffeurPage";
import LeasingPage from "@/pages/LeasingPage";
import ChauffeurServicePage from "@/pages/ChauffeurServicePage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import PartnersClientsPage from "@/pages/PartnersClientsPage";
import DubaiMunicipalityPage from "@/pages/DubaiMunicipalityPage";
import MobilityTechPage from "@/pages/MobilityTechPage";
import AutocarePage from "@/pages/AutocarePage";
import PartnerWithUsPage from "@/pages/PartnerWithUsPage";
import FAQPage from "@/pages/FAQPage";
import DownloadsPage from "@/pages/DownloadsPage";
import PortalPage from "@/pages/PortalPage";
import SEOCarRentalDubai from "@/pages/seo/SEOCarRentalDubai";
import SEOMonthlyRental from "@/pages/seo/SEOMonthlyRental";
import SEOChauffeurDubai from "@/pages/seo/SEOChauffeurDubai";
import SEOCommercialLeasing from "@/pages/seo/SEOCommercialLeasing";
import SEOCarLeasingDubai from "@/pages/seo/SEOCarLeasingDubai";
import HomePageAr from "@/pages/ar/HomePageAr";
import AboutPageAr from "@/pages/ar/AboutPageAr";
import ContactPageAr from "@/pages/ar/ContactPageAr";
import ServicesPageAr from "@/pages/ar/ServicesPageAr";
import EuropcarPageAr from "@/pages/ar/EuropcarPageAr";
import ChauffeurPageAr from "@/pages/ar/ChauffeurPageAr";
import LeasingPageAr from "@/pages/ar/LeasingPageAr";
import CareersPageAr from "@/pages/ar/CareersPageAr";
import PartnerPageAr from "@/pages/ar/PartnerPageAr";
import GoldcarPageAr from "@/pages/ar/GoldcarPageAr";
import TrucklinePageAr from "@/pages/ar/TrucklinePageAr";
import AutocarePageAr from "@/pages/ar/AutocarePageAr";
import UsedCarsPageAr from "@/pages/ar/UsedCarsPageAr";
import SustainabilityPageAr from "@/pages/ar/SustainabilityPageAr";
import MediaCenterPageAr from "@/pages/ar/MediaCenterPageAr";
import LeadershipPageAr from "@/pages/ar/LeadershipPageAr";
import FAQPageAr from "@/pages/ar/FAQPageAr";
import DownloadsPageAr from "@/pages/ar/DownloadsPageAr";
import BusinessesPageAr from "@/pages/ar/BusinessesPageAr";
import PortalPageAr from "@/pages/ar/PortalPageAr";
import NotFoundPage from "@/pages/NotFoundPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout({ children }) {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-brand-black">
      <SEO pathname={pathname} />
      <Navigation />
      <ScrollToTop />
      <RouteAnalytics />
      <main className="pb-14 md:pb-0">{children}</main>
      <Footer />
      <MobileContactBar />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
      <BrowserRouter>
        <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/leadership" element={<LeadershipPage />} />
          <Route path="/sustainability" element={<SustainabilityPage />} />
          <Route path="/media" element={<MediaCenterPage />} />
          <Route path="/europcar" element={<EuropcarPage />} />
          <Route path="/goldcar" element={<GoldcarPage />} />
          <Route path="/royal-limousine" element={<ChauffeurServicePage />} />
          <Route path="/emirates-taxi" element={<ChauffeurServicePage />} />
          <Route path="/truckline" element={<TrucklinePage />} />
          <Route path="/used-cars" element={<UsedCarsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/businesses" element={<BusinessesPage />} />
          <Route path="/book-chauffeur" element={<BookChauffeurPage />} />
          <Route path="/leasing" element={<LeasingPage />} />
          <Route path="/chauffeur-service" element={<ChauffeurServicePage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/partners" element={<PartnersClientsPage />} />
          <Route path="/dubai-municipality" element={<DubaiMunicipalityPage />} />
          <Route path="/mobility-technology" element={<MobilityTechPage />} />
          <Route path="/autocare" element={<AutocarePage />} />
          <Route path="/partner" element={<PartnerWithUsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/downloads" element={<DownloadsPage />} />
          <Route path="/portal/corporate" element={<PortalPage />} />
          <Route path="/portal/driver" element={<PortalPage />} />
          <Route path="/car-rental-dubai" element={<SEOCarRentalDubai />} />
          <Route path="/monthly-car-rental-dubai" element={<SEOMonthlyRental />} />
          <Route path="/chauffeur-service-dubai" element={<SEOChauffeurDubai />} />
          <Route path="/commercial-vehicle-leasing-uae" element={<SEOCommercialLeasing />} />
          <Route path="/car-leasing-dubai" element={<SEOCarLeasingDubai />} />
          <Route path="/ar" element={<HomePageAr />} />
          <Route path="/ar/about" element={<AboutPageAr />} />
          <Route path="/ar/contact" element={<ContactPageAr />} />
          <Route path="/ar/services" element={<ServicesPageAr />} />
          <Route path="/ar/europcar" element={<EuropcarPageAr />} />
          <Route path="/ar/chauffeur-service" element={<ChauffeurPageAr />} />
          <Route path="/ar/leasing" element={<LeasingPageAr />} />
          <Route path="/ar/careers" element={<CareersPageAr />} />
          <Route path="/ar/partner" element={<PartnerPageAr />} />
          <Route path="/ar/goldcar" element={<GoldcarPageAr />} />
          <Route path="/ar/truckline" element={<TrucklinePageAr />} />
          <Route path="/ar/autocare" element={<AutocarePageAr />} />
          <Route path="/ar/used-cars" element={<UsedCarsPageAr />} />
          <Route path="/ar/sustainability" element={<SustainabilityPageAr />} />
          <Route path="/ar/media" element={<MediaCenterPageAr />} />
          <Route path="/ar/leadership" element={<LeadershipPageAr />} />
          <Route path="/ar/faq" element={<FAQPageAr />} />
          <Route path="/ar/downloads" element={<DownloadsPageAr />} />
          <Route path="/ar/businesses" element={<BusinessesPageAr />} />
          <Route path="/ar/portal/corporate" element={<PortalPageAr />} />
          <Route path="/ar/portal/driver" element={<PortalPageAr />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
    </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
