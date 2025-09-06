import { useState } from 'react';
import Header from './assets/components/Header/header';
import Hero from './assets/components/Hero/hero';
import Features from './assets/components/Features/features';
import Rates from './assets/components/Rates/rates';
import Gallery from './assets/components/Gallery/gallery';
import Banner from './assets/Banner/banner';
import Testimonials from './assets/components/Testimonials/testimonials';
import FAQ from './assets/components/FAQ/faq';
import About from './assets/components/About/about';
import Contact from './assets/components/Contact/contact';
import Footer from './assets/components/Footer/footer';
import OrderButton from './assets/components/OrderButton/orderbutton';

function App() {
	const [cart, setCart] = useState({});
	const setQty = (id, qty) => setCart((p) => ({ ...p, [id]: Math.max(0, Number(qty) || 0) }));
	const changeQty = (id, delta) => setCart((p) => ({ ...p, [id]: Math.max(0, (p[id] || 0) + delta) }));

	return (
		<>
			<Header />
			<Hero />
			<Features />
			<Rates cart={cart} setQty={setQty} />
			<OrderButton cart={cart} setQty={setQty} changeQty={changeQty} />
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
