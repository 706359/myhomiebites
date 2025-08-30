import { useState } from 'react';
import './Styles/style.module.css';

const menuItems = [
	{
		id: 1,
		name: 'Full Tiffin',
		desc: 'Gravy Sabji + Dry Sabji + 4 Rotis + Rice (4 Rotis with Rice / 6 Rotis without Rice)',
		price: 120,
	},
	{ id: 2, name: 'Mix & Match Tiffin', desc: '2 Sabji + 6 Rotis', price: 120 },
	{ id: 3, name: '1 Sabji + 4 Rotis + Rice', desc: '', price: 100 },
	{ id: 4, name: '1 Sabji + 6 Rotis', desc: '', price: 100 },
	{ id: 5, name: '1 Sabji + 4 Rotis', desc: '', price: 80 },
	{ id: 6, name: 'Only 1 Sabji', desc: '', price: 40 },
	{ id: 7, name: 'Khichdi Meal', desc: 'Full Tiffin (4 bowls)', price: 120 },
	{ id: 8, name: 'Plain Roti', desc: '', price: 10 },
	{ id: 9, name: 'Stuffed Paratha (Aloo/Gobhi/Muli/Methi)', desc: '', price: 35 },
	{ id: 10, name: '3 Stuffed Parathas', desc: '', price: 100 },
	{ id: 11, name: 'Homemade Curd (1 Bowl)', desc: '', price: 25 },
	{ id: 12, name: 'Parathas + Curd Combo', desc: '', price: 100 },
	{ id: 13, name: 'Self-Pickup (A1 Tower)', desc: '', price: 100 },
];

const OrderModal = ({ closeModal }) => {
	const [cart, setCart] = useState({});

	const updateQty = (id, qty) => {
		setCart((prev) => ({
			...prev,
			[id]: qty > 0 ? qty : 0,
		}));
	};

	const total = menuItems.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);

	const sendWhatsApp = () => {
		let message = 'Order Details:%0A';
		menuItems.forEach((item) => {
			const qty = cart[item.id];
			if (qty > 0) {
				message += `${item.name} x ${qty} = ₹${item.price * qty}%0A`;
			}
		});
		message += `Total: ₹${total}`;
		const whatsappURL = `https://wa.me/919999999999?text=${message}`;
		window.open(whatsappURL, '_blank');
	};

	return (
		<div className='modal-overlay' onClick={closeModal}>
			<div className='modal-content' onClick={(e) => e.stopPropagation()}>
				<button className='close-btn' onClick={closeModal}>
					×
				</button>
				<h2 className='text-xl font-bold mb-4'>Order Menu</h2>
				<div className='order-list'>
					{menuItems.map((item) => (
						<div key={item.id} className='order-item'>
							<div className='order-info'>
								<span className='item-name'>{item.name}</span>
								{item.desc && <span className='item-desc'>{item.desc}</span>}
								<span className='item-price'>₹{item.price}</span>
							</div>
							<input
								type='number'
								min='0'
								value={cart[item.id] || ''}
								onChange={(e) => updateQty(item.id, parseInt(e.target.value) || 0)}
							/>
						</div>
					))}
				</div>
				<div className='order-total'>Total: ₹{total}</div>
				<button className='btn primary mt-2' disabled={total === 0} onClick={sendWhatsApp}>
					Send via WhatsApp
				</button>
			</div>
		</div>
	);
};

export default OrderModal;
