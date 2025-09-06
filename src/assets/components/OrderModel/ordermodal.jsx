import React, { useContext } from 'react';
import styles from './Styles/style.module.css';
import { Context } from '../../../store/store';

const OrderModal = ({ closeModal }) => {
	const { itemsSelected, setItemsSelected } = useContext(Context);
	const getTotal = () => {
		let total = 0;
		itemsSelected.forEach((item) => {
			total += (item.price || 0) * item.qty;
		});
		return total;
	};

	function updateQty(name, qty, price) {
		setItemsSelected((prev) => {
			if (qty == 0) {
				// Remove
				let obj = prev.filter((item) => item.name !== name);
				return obj;
			} else {
				// Add - Update
				let old = prev.filter((item) => item.name !== name);
				let obj = [...old, { name, qty, price }];
				return obj;
			}
		});
	}
	const sendWhatsApp = () => {
		if (itemsSelected.length === 0) return;
		let message = 'Order Details:%0A';
		itemsSelected.forEach((item) => {
			message += `${item.name} x ${item.qty} = ₹${item.qty * item.price}%0A`;
		});
		message += `Total: ₹${getTotal()}`;
		window.open(`https://wa.me/919958983578?text=${message}`, '_blank');
	};

	// const cartItems = getCartItems();

	return (
		<div className={styles.modalOverlay} onClick={closeModal}>
			<div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
				<button className={styles.closeBtn} onClick={closeModal}>
					×
				</button>
				<h2>Order Cart</h2>

				<div className={styles.cartList}>
					{itemsSelected.length === 0 ? (
						<p className={styles.emptyCart}>Your cart is empty.</p>
					) : (
						itemsSelected.map((item) => (
							<div className={styles.cartItem} key={item.name}>
								<span>{item.name}</span>
								<div className={styles.qtyControls}>
									<span>{item.qty}</span>
								</div>
								<span>₹{item.price}</span>
								<span>₹{item.qty * item.price}</span>
								<div className='qtySelect'>
									<select value={item.qty} onChange={(e) => updateQty(item.name, parseInt(e.target.value, 10), item.price)}>
										{[...Array(11)].map((_, i) => (
											<option key={i} value={i}>
												{i}
											</option>
										))}
									</select>
								</div>
							</div>
						))
					)}
					<input type='text' id='customerName' name='customerName' placeholder='Please enter your name' className='form-input' required />

					<label htmlFor='deliveryAddress'>
						Delivery Address <span className='required'>*</span>
					</label>
					<input type='text' id='deliveryAddress' name='deliveryAddress' placeholder='Please enter your delivery address' className='form-input' required />
				</div>

				<div className={styles.grandTotal}>Grand Total: ₹{getTotal()}</div>
				<button className={`${styles.btn} ${styles.primary}`} disabled={getTotal() === 0} title={getTotal() === 0 ? 'Add items to enable' : 'Send via WhatsApp'} onClick={sendWhatsApp}>
					Send via WhatsApp
				</button>
			</div>
		</div>
	);
};

export default OrderModal;
