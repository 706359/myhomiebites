import { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import About from "./assets/components/About/about";
import FAQ from "./assets/components/FAQ/faq";
import Features from "./assets/components/Features/features";
import Footer from "./assets/components/Footer/footer";
import Gallery from "./assets/components/Gallery/gallery";
import Header from "./assets/components/Header/header";
import Hero from "./assets/components/Hero/hero";
import LoginForm from "./assets/components/LoginForm/LoginForm";
import ChefRegistration from "./assets/components/RaavitoPartnerPage/RaavitoPartnerPage";
import Rates from "./assets/components/Rates/rates";
import RegisterForm from "./assets/components/RegisterForm/RegisterForm";
import Testimonials from "./assets/components/Testimonials/testimonials";
import HowItWorks from "./assets/components/HowItWorks/HowItWorks";
import WhyChooseUs from "./assets/components/WhyChooseUs/WhyChooseUs";
import AppFeatures from "./assets/components/AppFeatures/AppFeatures";
import PartnerWithUs from "./assets/components/PartnerWithUs/PartnerWithUs";
import Banner from "./assets/components/Banner/banner";
import AppDownload from "./assets/components/AppDownload/AppDownload";
import Contact from "./assets/components/Contact/Contact";

function App() {
  const [modal, setModal] = useState(null);

  return (
    <HashRouter>
      {modal === "register" && <RegisterForm onClose={() => setModal(null)} />}
      {modal === "login" && <LoginForm onClose={() => setModal(null)} />}

      <Routes>
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
              <Gallery />
              <Banner />
              <HowItWorks />
              <WhyChooseUs />
              <AppDownload />
              <PartnerWithUs />
              <Testimonials />
              <FAQ />
              {/* Removed <Contact /> from homepage */}
              <Footer />
            </>
          }
        />

        <Route path='/chef-registration' element={<ChefRegistration />} />

        <Route
          path='/contact'
          element={
            <>
              <Contact />
              <Footer />
            </>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
