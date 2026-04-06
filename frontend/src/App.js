import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { OrganizationSchema, LocalBusinessSchema } from "@/components/SEO";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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
import NotFoundPage from "@/pages/NotFoundPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-brand-black">
      <Navigation />
      <ScrollToTop />
      <OrganizationSchema />
      <LocalBusinessSchema />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
