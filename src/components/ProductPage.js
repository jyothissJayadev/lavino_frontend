// ProductGrid.js
import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../CartContext';
import { Plus, X } from 'lucide-react';
import { useParams } from 'react-router-dom';
import styles from './ProductPage.module.css';
import confirmStyles from './Confirmation.module.css';
import TopNav from './TopNav/TopNav';
import BottomNav from './bottomnav/BottomNav';
import { products } from './data/productData';  // Import product data

const ConfirmationModal = ({ product, onConfirm, onCancel }) => (
  <div className={confirmStyles.modalOverlay}>
    <div className={confirmStyles.modalContent}>
      <div className={confirmStyles.productPreview}>
        <img 
          src={product.image} 
          alt={product.name}
          className={confirmStyles.previewImage}
        />
        <div className={confirmStyles.previewInfo}>
          <div className={confirmStyles.previewName}>{product.name}</div>
          <div className={confirmStyles.previewPrice}>${product.price}</div>
        </div>
      </div>
      
      <div className={confirmStyles.buttonGroup}>
        <button 
          className={confirmStyles.cancelButton}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          className={confirmStyles.confirmButton}
          onClick={onConfirm}
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

const ProductDetailModal = ({ product, onClose, onAddToCart }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  
  return (
    <div className={styles.detailOverlay}>
      <div className={styles.detailContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className={styles.mainImageContainer}>
          <img 
            src={product.images[selectedImage]} 
            alt={product.name} 
            className={styles.mainImage}
          />
        </div>

        <div className={styles.thumbnailContainer}>
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.name} view ${index + 1}`}
              className={`${styles.thumbnail} ${selectedImage === index ? styles.activeThumbnail : ''}`}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>

        <div className={styles.detailInfo}>
          <h2 className={styles.detailName}>{product.name}</h2>
          <p className={styles.detailPrice}>${product.price}</p>
          <div className={styles.packageInfo}>
            <h3 className={styles.packageTitle}>What's in the package:</h3>
            <ul className={styles.packageList}>
              {product.packageItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
          <button 
            className={styles.detailAddButton}
            onClick={() => onAddToCart(product)}
          >
            <Plus size={20} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductGrid = () => {
  const { addToCart } = useContext(CartContext);
  const { category } = useParams(); // Get category from the URL
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const filteredProducts = products.filter(product => product.category === category);  // Filter products based on the category

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setShowDetail(true);
  };

  const handleAddToCart = (product) => {
    setShowDetail(false);
    setSelectedProduct(product);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    addToCart(selectedProduct);
    setShowConfirmation(false);
    setSelectedProduct(null);
  };

  return (
    <div className={styles.mainContainer}>
      <TopNav />
      <div className={styles.productGrid}>
        <div className={styles.gridContainer}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div 
                  className={styles.imageContainer}
                  onClick={() => handleImageClick(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.productImage}
                  />
                  <div className={styles.overlay} />
                </div>

                <div className={styles.productInfo}>
                  <div className={styles.productHeader}>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <span className={styles.productPrice}>₹{product.price}</span>
                  </div>

                  <div className={styles.actionContainer}>
                    <button 
                      onClick={() => handleAddToCart(product)} 
                      className={styles.addButton}
                    >
                      <Plus size={12} />
                      <span>Add to cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      </div>

      {showDetail && selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setShowDetail(false)}
          onAddToCart={handleAddToCart}
        />
      )}

      {showConfirmation && selectedProduct && (
        <ConfirmationModal
          product={selectedProduct}
          onConfirm={handleConfirm}
          onCancel={() => {
            setShowConfirmation(false);
            setSelectedProduct(null);
          }}
        />
      )}
      
      <BottomNav />
    </div>
  );
};

export default ProductGrid;
