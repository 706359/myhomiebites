import { useState } from 'react';
import Rates from './assets/components/Rates/rates';
import OrderButton from './assets/components/OrderButton/orderbutton';

const MenuPage = () => {
	const [cart, setCart] = useState({});

	const updateQty = (id, qty) => {
		setCart((prev) => {
			const next = { ...prev };
			if (Number(qty) > 0) next[id] = Number(qty);
			else delete next[id];
			return next;
		});
	};

	return (
		<section id='menu' className='container'>
			<h2 className='section-title reveal in'>Our Menu</h2>
			<Rates cart={cart} updateQty={updateQty} />
			<div className='flex justify-center mt-6'>
				<OrderButton cart={cart} updateQty={updateQty} />
			</div>
		</section>
	);
};

export default MenuPage;
