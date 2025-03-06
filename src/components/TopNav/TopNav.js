import React, { useContext, useEffect, useState } from 'react';
import { ShoppingCart, ChevronDown, X } from 'lucide-react';
import { CartContext } from '../../CartContext';
import { useNavigate } from 'react-router-dom';
import styles from './TopNav.module.css';
import logo from './logo.png'
const TopNav = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(totalItems);
  }, [cart]);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav className={styles.navContainer}>
        <div className={styles.logoSection}>
          <img 
            src={logo} 
            alt="Elfi Logo" 
            className={styles.logo}
          />
          <span className={styles.brandName}>Lavino</span>
        </div>

        <div className={styles.rightSection}>
          <button 
            className={styles.aboutButton}
            onClick={handleDropdownClick}
          >
            {isDropdownOpen ? <X size={20} /> : <ChevronDown size={20} />}
          </button>

          <button 
            onClick={() => navigate('/cart')}
            className={styles.cartButton}
          >
            <ShoppingCart className={styles.cartIcon} />
            {cartCount > 0 && (
              <span className={styles.cartCount}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {isDropdownOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownContent}>
            <h2 className={styles.dropdownTitle}>About Lavino</h2>
            <p className={styles.dropdownText}>
            Delight in our freshly baked, handcrafted cakes made with love. From classic favorites to custom creations, we bring sweetness to every occasion. Order now for a taste of heaven! below — or check out our Store
            </p>
            <div className={styles.dropdownLinks}>
              <a href="/about">About Us</a>
              <a href="tel:+919778253982">Contact</a>
              <a href="/terms">Terms & Conditions</a>
              <a href="/privacy">Privacy Policy</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNav;