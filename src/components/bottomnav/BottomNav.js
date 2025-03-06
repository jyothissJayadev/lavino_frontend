import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../../CartContext';
import { Cake, Donut, ShoppingCart ,CakeSlice} from 'lucide-react';
import styles from './BottomNav.module.css';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useContext(CartContext);

  // Calculate the total items in the cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Define the navigation items
  const navItems = [
    {
      id: 'Cake',
      icon: CakeSlice,
      label: 'Cake',
      path: '/products/cakes',  // Path for Kids category
    },
    {
      id: 'ThemeCake',
      icon: Cake,
      label: 'ThemeCake',
      path: '/products/ThemeCake',  // Path for Combo category
    },
    {
      id: 'Pastries',
      icon: Donut,
      label: 'Pastries',  // Label for Cake category
      path: '/products/pastries',  // Path for Cake category
    },
    {
      id: 'cart',
      icon: ShoppingCart,
      label: 'Cart',
      path: '/cart',  // Path for Cart page
      badge: cartItemCount.toString(),  // Badge to show the number of items in the cart
    }
  ];

  // Function to handle tab change navigation
  const handleTabChange = (path) => {
    navigate(path);
  };

  // Function to check if the current tab is active
  const isActiveTab = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={styles.navContainer}>
      <div className={styles.navBackground}>
        <div className={styles.blurEffect} />
      </div>
      
      <nav className={styles.bottomNav}>
        {navItems.map(({ id, icon: Icon, label, path, badge }) => (
          <button
            key={id}
            className={`${styles.navItem} ${isActiveTab(path) ? styles.active : ''}`}
            onClick={() => handleTabChange(path)}
          >
            <div className={styles.iconWrapper}>
              <Icon
                className={styles.icon}
                size={24}
                strokeWidth={isActiveTab(path) ? 2.5 : 2}  // Different stroke width for active state
              />
              {badge && (
                <span className={styles.badge}>
                  {badge}
                </span>
              )}
            </div>
            <span className={styles.label}>{label}</span>
            {isActiveTab(path) && (
              <div className={styles.activeIndicator}>
                <div className={styles.indicatorDot} />
              </div>
            )}
            <div className={styles.rippleEffect} />
          </button>
        ))}
      </nav>
    </div>
  );
};

export default BottomNav;
