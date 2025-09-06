import { useState } from 'react';
import OrderModal from '../OrderModel/ordermodal';

const OrderButton = ({ cart, updateQty }) => {
	const [showOrder, setShowOrder] = useState(false);

	return (
		<>
			{/* <button onClick={() => setShowOrder(true)} className='btn btn-ghost'>
        <i className='fa-brands fa-whatsapp'></i> WhatsApp Order
      </button> */}

			<button onClick={() => setShowOrder(true)} className='carticon'>
				<img src='/images/cart.png' alt='Cart' />
			</button>

			{showOrder && <OrderModal closeModal={() => setShowOrder(false)} cart={cart} updateQty={updateQty} />}
		</>
	);
};

export default OrderButton;
