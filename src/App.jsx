import { useState } from 'react';
import Banner from './assets/Banner/banner';
import About from './assets/components/About/about';
import Contact from './assets/components/Contact/contact';
import FAQ from './assets/components/FAQ/faq';
import Features from './assets/components/Features/features';
import Footer from './assets/components/Footer/footer';
import Gallery from './assets/components/Gallery/gallery';
import Header from './assets/components/Header/header';
import Hero from './assets/components/Hero/hero';
import LoginForm from './assets/components/LoginForm/LoginForm';
import Rates from './assets/components/Rates/rates';
import RegisterForm from './assets/components/RegisterForm/RegisterForm';
import Testimonials from './assets/components/Testimonials/testimonials';

function App() {
  const [cart, setCart] = useState({});
  const [modal, setModal] = useState(null); // 'login' | 'register' | null

  const setQty = (id, qty) => setCart((prev) => ({ ...prev, [id]: Math.max(0, Number(qty) || 0) }));

  return (
    <>
      {modal === 'register' && <RegisterForm onClose={() => setModal(null)} />}
      {modal === 'login' && <LoginForm onClose={() => setModal(null)} />}

      <Header onRegisterClick={() => setModal('register')} onLoginClick={() => setModal('login')} />
      <Hero />
      <Features />
      <Rates cart={cart} setQty={setQty} />
      <Gallery />
      <Banner />
      <Testimonials />
      <FAQ />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
