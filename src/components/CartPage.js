import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.css';

function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleBack = () => {
    window.history.back();
  };

  const handleCheckout = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/send-message');
  };

  return (
    <div className={styles.cartContainer}>
      <div className={styles.header}>
        <button onClick={handleBack} className={styles.backButton}>
          ←
        </button>
        <h1>Cart ({totalItems})</h1>
      </div>

      {cart.length === 0 ? (
        <p className={styles.emptyCart}>Your cart is empty</p>
      ) : (
        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemInfo}>
                  <h3>{item.name}</h3>
                  <p>₹{item.price.toFixed(2)}</p>
                </div>
                <div className={styles.quantityControls}>
                  <button 
                    onClick={() => decreaseQuantity(item.id)}
                    className={styles.quantityButton}
                  >
                    −
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button 
                    onClick={() => increaseQuantity(item.id)}
                    className={styles.quantityButton}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.footer}>
            <div className={styles.totalInfo}>
              <div className={styles.totalItems}>
                Total Items: {totalItems}
              </div>
              <div className={styles.total}>
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button 
              className={styles.checkoutButton}
              onClick={handleCheckout}
            >
              CHECKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;