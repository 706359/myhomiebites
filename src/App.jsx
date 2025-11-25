import { useState, useEffect } from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";

import About from "./assets/components/About/about";
import FAQ from "./assets/components/FAQ/faq";
import Footer from "./assets/components/Footer/footer";
import Gallery from "./assets/components/Gallery/gallery";
import Offers from "./assets/components/Offers/Offers";
import LoginForm from "./assets/components/LoginForm/LoginForm";
import RaavitoPartnerPage from "./assets/components/RaavitoPartnerPage/RaavitoPartnerPage";
import PartnerRegister from "./assets/components/PartnerRegister/PartnerRegister";
import PartnerDashboard from "./assets/components/PartnerDashboard/PartnerDashboard";
import RegisterForm from "./assets/components/RegisterForm/RegisterForm";
import Testimonials from "./assets/components/Testimonials/testimonials";
import HowItWorks from "./assets/components/HowItWorks/HowItWorks";
import WhyChooseUs from "./assets/components/WhyChooseUs/WhyChooseUs";
import AppFeatures from "./assets/components/AppFeatures/AppFeatures";
import PartnerWithUs from "./assets/components/PartnerWithUs/PartnerWithUs";
import Banner from "./assets/components/Banner/banner";
import AppDownload from "./assets/components/AppDownload/AppDownload";
import Contact from "./assets/components/Contact/Contact";
import Hero from "./assets/components/Hero/hero";
import AdminDashboard from "./assets/components/AdminDashboard/Admindashboard";
import AdminLogin from "./assets/components/AdminLogin/AdminLogin";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";

function App() {
  const [modal, setModal] = useState(null);
  const [isPartnerLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  // Check if admin is logged in on mount and when localStorage changes
  useEffect(() => {
    const checkAdminSession = () => {
      const token = localStorage.getItem('adminToken');
      const user = localStorage.getItem('adminUser');
      if (!token || !user) {
        setIsAdminLoggedIn(false);
        setAdminUser(null);
        return;
      }
      try {
        const userData = JSON.parse(user);
        if (userData.role === 'admin') {
          setIsAdminLoggedIn(true);
          setAdminUser(userData);
        } else {
          setIsAdminLoggedIn(false);
          setAdminUser(null);
        }
      } catch {
        setIsAdminLoggedIn(false);
        setAdminUser(null);
      }
    };

    checkAdminSession();

    // Listen for storage changes (when login happens in another tab/window)
    const handleStorageChange = (e) => {
      if (e.key === 'adminToken' || e.key === 'adminUser') {
        checkAdminSession();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically in case of same-tab updates
    const interval = setInterval(checkAdminSession, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <HashRouter>
      {modal === "register" && <RegisterForm onClose={() => setModal(null)} />}
      {modal === "login" && <LoginForm onClose={() => setModal(null)} />}

      <Routes>
        {/* Homepage */}
        <Route
          path='/'
          element={
            <>
              {/* <Header
                onRegisterClick={() => setModal("register")}
                onLoginClick={() => setModal("login")}
              /> */}
              <Hero />
              <About />
              <AppFeatures />
              <Offers />
              <Gallery />
              <Banner />
              <HowItWorks />
              <WhyChooseUs />
              <AppDownload />
              <PartnerWithUs />
              <Testimonials />
              <FAQ />
              <Footer />
            </>
          }
        />

        {/* Partner Routes */}
        <Route path='/partner' element={<RaavitoPartnerPage />} />
        <Route
          path='/partner/register'
          element={<PartnerRegister setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path='/partner/dashboard'
          element={isPartnerLoggedIn ? <PartnerDashboard /> : <Navigate to='/partner' replace />}
        />

        {/* Contact Page */}
        <Route
          path='/contact'
          element={
            <>
              <Contact />
              <Footer />
            </>
          }
        />
        {/* Admin Routes */}
        <Route
          path='/admin/login'
          element={<AdminLogin onLoginSuccess={() => {
            setIsAdminLoggedIn(true);
            const user = localStorage.getItem('adminUser');
            if (user) {
              try {
                setAdminUser(JSON.parse(user));
              } catch {}
            }
          }} />}
        />
        <Route
          path='/admindashboard'
          element={
            isAdminLoggedIn ? (
              <AdminDashboard adminUser={adminUser} onLogout={() => {
                setIsAdminLoggedIn(false);
                setAdminUser(null);
              }} />
            ) : (
              <Navigate to='/admin/login' replace />
            )
          }
        />

        {/* Privacy & Terms Routes */}
        <Route
          path='/privacy'
          element={
            <>
              <PrivacyPolicy />
            </>
          }
        />
        <Route
          path='/terms'
          element={
            <>
              <TermsConditions />
            </>
          }
        />

        {/* Redirect old route to new */}
        <Route path='/chef-registration' element={<Navigate to='/partner' replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
