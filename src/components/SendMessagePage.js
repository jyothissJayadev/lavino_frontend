import React, { useEffect, useState } from 'react';
import styles from './SendMessagePage.module.css';

function SendMessagePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      const formatDate = () => {
        const date = new Date();
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
      };

      const orderDetails = cart.map(item => 
        `• ${item.name}\n   Quantity: ${item.quantity}\n   Price: $${(item.price * item.quantity).toFixed(2)}`
      ).join('\n\n');

      const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

      const whatsappMessage = 
`🛍️ *New Order*
📅 ${formatDate()}

*Order Details:*
${orderDetails}

-------------------
📦 *Total Items:* ${totalItems}
💰 *Total Amount:* $${total.toFixed(2)}

Thank you for your order! We will get back to you soon`;

      const whatsappUrl = `https://wa.me/9778253982?text=${encodeURIComponent(whatsappMessage)}`;

      // Short delay for animation
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        setIsLoading(false);
      }, 2000);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.loader}></div>
        <h1 className={styles.title}>
          {isLoading ? 'Preparing Your Order...' : 'Order Ready!'}
        </h1>
        <p className={styles.message}>
          {isLoading 
            ? 'Getting everything ready to send to WhatsApp...' 
            : 'WhatsApp has been opened in a new tab'}
        </p>
        {!isLoading && (
          <button 
            className={styles.backButton}
            onClick={() => window.history.back()}
          >
            Return to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default SendMessagePage;