import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ServicesPage from "@/pages/ServicesPage";
import ContactPage from "@/pages/ContactPage";
import LeadershipPage from "@/pages/LeadershipPage";
import SustainabilityPage from "@/pages/SustainabilityPage";
import MediaCenterPage from "@/pages/MediaCenterPage";
import EuropcarPage from "@/pages/EuropcarPage";
import GoldcarPage from "@/pages/GoldcarPage";
import RoyalLimousinePage from "@/pages/RoyalLimousinePage";
import EmiratesTaxiPage from "@/pages/EmiratesTaxiPage";
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
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
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
          <Route path="/royal-limousine" element={<RoyalLimousinePage />} />
          <Route path="/emirates-taxi" element={<EmiratesTaxiPage />} />
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
