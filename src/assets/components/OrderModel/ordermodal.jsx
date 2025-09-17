import { useContext, useEffect, useState } from 'react';
import { Context } from '../../../store/store';
import styles from './Styles/style.module.css';

const OrderModal = ({ closeModal }) => {
  const { itemsSelected, setItemsSelected } = useContext(Context);
  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const isDuplicate =
    typeof document !== 'undefined' && !!document.querySelector('[data-order-modal]');
  const showModal = !isDuplicate;

  useEffect(() => {
    if (!showModal) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal]);

  if (!showModal) {
    return null;
  }

  const getTotal = () =>
    itemsSelected.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 0), 0);

  function updateQty(name, qty, price) {
    setItemsSelected((prev) => {
      if (qty === 0) return prev.filter((it) => it.name !== name);

      let found = false;
      const updated = prev.map((it) => {
        if (it.name === name) {
          found = true;
          return { ...it, qty, price: price ?? it.price };
        }
        return it;
      });
      if (!found) updated.push({ name, qty, price });
      return updated;
    });
  }

  const isAddressValid = (addr) => addr && addr.trim().length >= 5;

  const sendWhatsApp = () => {
    if (itemsSelected.length === 0 || !customerName || !isAddressValid(deliveryAddress)) return;

    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const total = getTotal();

    let message = `*📄 Order Details*%0A`;
    message += `*Date:* ${dateStr}%0A`;
    message += `%0A*👤 Customer Details*%0A`;
    message += `Name: ${customerName}%0A`;
    message += `Address: ${deliveryAddress}%0A`;
    message += `%0A*🛍️ Order Summary*%0A`;
    message += `----------------------------%0A`;
    message += `Item | Qty | Price | Total%0A`;
    message += `----------------------------%0A`;

    itemsSelected.forEach((item) => {
      const qty = item.qty || 0;
      const price = item.price || 0;
      message += `${item.name} | ${qty} | ₹${price} | ₹${qty * price}%0A`;
    });

    message += `----------------------------%0A`;
    message += `*Grand Total:* ₹${total}%0A`;
    message += `%0A✅ Thank you for your order!`;

    window.open(`https://wa.me/916395559255?text=${message}`, '_blank');
  };

  const canSend =
    itemsSelected.length > 0 &&
    getTotal() > 0 &&
    customerName.trim().length > 0 &&
    isAddressValid(deliveryAddress);

  return (
    <div
      className={styles.modalOverlay}
      data-order-modal
      onClick={closeModal}
      role='dialog'
      aria-modal='true'>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={closeModal} aria-label='Close order modal'>
          ×
        </button>

        <h2>Order Cart</h2>

        <div className={styles.cartList}>
          {itemsSelected.length === 0 ? (
            <p className={styles.emptyCart}>
              Looks like your cart’s waiting—pick something delicious to get started.
            </p>
          ) : (
            <>
              <div className={styles.cartHeader}>
                <div className={styles.headerCell}>Item</div>
                <div className={styles.headerCell}>Qty</div>
                <div className={styles.headerCell}>Price</div>
                <div className={styles.headerCell}>Total</div>
              </div>

              {itemsSelected.map((item, idx) => {
                const key = item.id ?? `${item.name}-${idx}`;
                const qtyVal = item.qty ?? 0;
                return (
                  <div className={styles.cartItem} key={key}>
                    <div className={styles.itemName}>{item.name}</div>

                    <div className={styles.qty}>
                      <select
                        className={`${styles.qtySelect} ${qtyVal > 0 ? styles.qtySelectActive : ''}`}
                        value={qtyVal}
                        onChange={(e) =>
                          updateQty(item.name, parseInt(e.target.value, 10), item.price)
                        }>
                        {[...Array(11)].map((_, i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.price}>₹{item.price ?? 0}</div>
                    <div className={styles.total}>₹{(item.qty ?? 0) * (item.price ?? 0)}</div>
                  </div>
                );
              })}

              <input
                type='text'
                id='customerName'
                name='customerName'
                placeholder='Please enter your name'
                className={styles.formInput}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />

              <label htmlFor='deliveryAddress' className={styles.formLabel}>
                Delivery Address <span className={styles.required}>*</span>
              </label>
              <input
                type='text'
                id='deliveryAddress'
                name='deliveryAddress'
                placeholder='Please enter your delivery address (e.g., A1-405)'
                className={styles.formInput}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                minLength={5}
                required
              />
            </>
          )}
        </div>

        {itemsSelected.length > 0 && (
          <div className={styles.grandTotal}>Grand Total: ₹{getTotal()}</div>
        )}

        {itemsSelected.length > 0 && (
          <button
            className={`${styles.btn} ${styles.primary}`}
            disabled={!canSend}
            title={
              !canSend
                ? !isAddressValid(deliveryAddress)
                  ? 'Address must be at least 5 characters'
                  : !customerName.trim()
                    ? 'Enter customer name'
                    : 'Add items to enable'
                : 'Send via WhatsApp'
            }
            onClick={sendWhatsApp}>
            Send via WhatsApp
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderModal;
