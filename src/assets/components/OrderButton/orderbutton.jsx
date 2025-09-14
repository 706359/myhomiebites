// import { useState, useEffect, useRef } from 'react';
// import OrderModal from '../OrderModel/ordermodal';
// import styles from './orderbutton.module.css';

// const calcCount = (cart) => {
// 	if (!cart) return 0;
// 	return Object.values(cart).reduce((s, v) => s + (Number(v) || 0), 0);
// };

// export default function OrderButton({ cart = {}, updateQty }) {
// 	const [open, setOpen] = useState(false);
// 	const [count, setCount] = useState(() => calcCount(cart));
// 	const prev = useRef(count);

// 	return (
// 		<>
// 			<button type='button' onClick={() => setOpen(true)} className={styles.cartButton} aria-label={`Open cart (${count} items)`} title='Open cart'>
// 				<svg className={styles.cartIcon} viewBox='0 0 24 24' aria-hidden='true'>
// 					<path d='M7 4h13l-1.2 6.4a3 3 0 0 1-2.95 2.36H9.4l-.4 2H18v2H8a1 1 0 0 1-.98-.8L5 4H3V2h4a1 1 0 0 1 .98.8L8 4h-1z' fill='currentColor' />
// 				</svg>

// 				{count > 0 && <span className={styles.badge}>{count > 99 ? '99+' : count}</span>}
// 			</button>

// 			{open && <OrderModal closeModal={() => setOpen(false)} cart={cart} updateQty={updateQty} />}
// 		</>
// 	);
// }

import { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../../store/store';
import OrderModal from '../OrderModel/ordermodal';
import styles from './orderbutton.module.css';

const calcCount = (cart) => {
  if (!cart) return 0;
  if (Array.isArray(cart)) return cart.reduce((s, v) => s + (Number(v.qty) || 0), 0);
  if (typeof cart === 'object')
    return Object.values(cart).reduce((s, v) => s + (Number(v) || 0), 0);
  return 0;
};

export default function OrderButton({ updateQty }) {
  const { itemsSelected } = useContext(Context); // <--- use context
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(() => calcCount(itemsSelected));
  const prev = useRef(count);

  useEffect(() => {
    const newCount = calcCount(itemsSelected);
    setCount(newCount);
    prev.current = newCount;
  }, [itemsSelected]);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={styles.cartButton}
        aria-label={`Open cart (${count} items)`}
        title='Open cart'>
        <img className={styles.cartIcon} src='images/cart.png' />
        {count > 0 && (
          <span id='cart-badge' className={styles.badge}>
            {count > 99 ? '99+' : count}
          </span>
        )}
      </div>

      {open && (
        <OrderModal closeModal={() => setOpen(false)} cart={itemsSelected} updateQty={updateQty} />
      )}
    </>
  );
}
