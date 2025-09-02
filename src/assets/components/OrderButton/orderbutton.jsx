import { useState } from 'react';
import OrderModal from '../OrderModel/ordermodal';

const OrderButton = () => {
	const [showOrder, setShowOrder] = useState(false);

	return (
		<>
			<button onClick={() => setShowOrder(true)} className='btn btn-ghost'>
				<i className='fa-brands fa-whatsapp'></i> WhatsApp Order
			</button>

			{showOrder && <OrderModal closeModal={() => setShowOrder(false)} />}
		</>
	);
};

export default OrderButton;
