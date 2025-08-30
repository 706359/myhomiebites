import React, { useState } from 'react';
import styles from './Styles/style.module.css';

const menuItems = [
	{
		id: 1,
		name: 'Full Tiffin',
		price: 120,
		sub: [
			{ id: 101, name: 'Roti', price: 10 },
			{ id: 102, name: 'Rice', price: 20 },
		],
	},
	{ id: 2, name: 'Roti with Ghee', price: 12 },
	{ id: 3, name: 'Khichdi Meal', price: 120 },
];

const OrderModal = ({ closeModal }) => {
	const [cart, setCart] = useState({});

	const updateQty = (id, change) => {
		setCart((prev) => {
			const current = prev[id] || 0;
			const next = current + change;
			return { ...prev, [id]: next > 0 ? next : 0 };
		});
	};

	const getTotal = () => {
		let total = 0;
		menuItems.forEach((item) => {
			total += (cart[item.id] || 0) * item.price;
			if (item.sub) {
				item.sub.forEach((sub) => (total += (cart[sub.id] || 0) * sub.price));
			}
		});
		return total;
	};

	const sendWhatsApp = () => {
		let message = 'Order Details:%0A';
		menuItems.forEach((item) => {
			const qty = cart[item.id];
			if (qty > 0) message += `${item.name} x ${qty} = ₹${qty * item.price}%0A`;
			if (item.sub) {
				item.sub.forEach((sub) => {
					const sqty = cart[sub.id];
					if (sqty > 0) message += `  ${sub.name} x ${sqty} = ₹${sqty * sub.price}%0A`;
				});
			}
		});
		message += `Total: ₹${getTotal()}`;
		window.open(`https://wa.me/919958983578?text=${message}`, '_blank');
	};

	return (
		<div className={styles.modalOverlay} onClick={closeModal}>
			<div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
				<button className={styles.closeBtn} onClick={closeModal}>
					×
				</button>
				<h2>Order Cart</h2>

				<div className={styles.cartList}>
					{menuItems.map((item) => (
						<React.Fragment key={item.id}>
							<div className={styles.cartItem}>
								<span>{item.name}</span>
								<div className={styles.qtyControls}>
									<button onClick={() => updateQty(item.id, -1)}>-</button>
									<span>{cart[item.id] || 0}</span>
									<button onClick={() => updateQty(item.id, 1)}>+</button>
								</div>
								<span>₹{item.price}</span>
								<span>₹{(cart[item.id] || 0) * item.price}</span>
							</div>

							{item.sub &&
								item.sub.map((sub) => (
									<div className={styles.cartSubitem} key={sub.id}>
										<span>{sub.name}</span>
										<div className={styles.qtyControls}>
											<button onClick={() => updateQty(sub.id, -1)}>-</button>
											<span>{cart[sub.id] || 0}</span>
											<button onClick={() => updateQty(sub.id, 1)}>+</button>
										</div>
										<span>₹{sub.price}</span>
										<span>₹{(cart[sub.id] || 0) * sub.price}</span>
									</div>
								))}
						</React.Fragment>
					))}
				</div>

				<div className={styles.grandTotal}>Grand Total: ₹{getTotal()}</div>
				<button
					className={`${styles.btn} ${styles.primary}`}
					disabled={getTotal() === 0}
					title={getTotal() === 0 ? 'Add items to enable' : 'Send via WhatsApp'}
					onClick={sendWhatsApp}>
					Send via WhatsApp
				</button>
			</div>
		</div>
	);
};

export default OrderModal;
