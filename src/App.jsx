import { useMenuToggle } from './assets/hooks/useMenuToggle';
import { usePulseCTA } from './assets/hooks/usePulseCTA';
import { useReveal } from './assets/hooks/useReveal';
import { useSmoothScroll } from './assets/hooks/useSmoothScroll';

import About from './assets/components/About/about';
import Contact from './assets/components/Contact/contact';
import FAQ from './assets/components/FAQ/faq';
import Features from './assets/components/Features/features';
import Footer from './assets/components/Footer/footer';
import Gallery from './assets/components/Gallery/gallery';
import Header from './assets/components/Header/header';
import Hero from './assets/components/Hero/hero';
import Rates from './assets/components/Rates/rates';
import Testimonials from './assets/components/Testimonials/testimonials';

function App() {
	useMenuToggle();
	useReveal();
	useSmoothScroll();
	usePulseCTA();

	return (
		<>
			<Header />
			<Hero />
			<Features />
			<Rates />
			<Gallery />
			<Testimonials />
			<FAQ />
			<About />
			<Contact />
			<Footer />
		</>
	);
}

export default App;
