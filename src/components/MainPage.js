import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CarouselSlider.module.css';
import combo from '../assets/combo.jpg'
import cake from '../assets/cale.jpg'

const MainPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('');

  const categories = [
    {
      image: "https://bluebowlrecipes.com/wp-content/uploads/2023/08/chocolate-truffle-cake-8844.jpg",
      thumbnail: "https://bluebowlrecipes.com/wp-content/uploads/2023/08/chocolate-truffle-cake-8844.jpg",
      title: "cakes",
      description: "Explore the best cakes' products for all ages.",
      link: "/products/cakes"
    },
    {
      image: "https://avonbakers.com/wp-content/uploads/2020/08/product_wedding-theme-.jpg",
      thumbnail: "https://avonbakers.com/wp-content/uploads/2020/08/product_wedding-theme-.jpg",
      title: "Theme Cake",
      description: "Discover amazing ThemeCake deals for everyone.",
      link: "/products/ThemeCake"
    },

    {
      image: "https://ocakes.in/storage/app/public/images/item/item-65b240fe364ef.webp",
      thumbnail: "https://ocakes.in/storage/app/public/images/item/item-65b240fe364ef.webp",
      title: "Pastries",
      description: "Find cake  for every need.",
      link: "/products/pastries"
    }
  ];

  const handleNext = () => {
    setDirection('next');
    setCurrentIndex((prevIndex) => 
      prevIndex === categories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setDirection('prev');
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? categories.length - 1 : prevIndex - 1
    );
  };

  const handleSlideClick = (link) => {
    navigate(link);
  };

  const handleThumbnailClick = (index) => {
    setDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselWrapper}>
        {categories.map((category, index) => (
          <div
            key={index}
            className={`${styles.slide} ${index === currentIndex ? styles.active : ''} ${styles[direction]}`}
            onClick={() => handleSlideClick(category.link)}
          >
            <div className={styles.slideContent}>
              <img 
                src={category.image} 
                alt={category.title} 
                className={styles.slideImage}
              />
              <div className={styles.textOverlay}>
                <h2>{category.title}</h2>
                <p>{category.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.carouselControls}>
        <button className={styles.controlButton} onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}>
          ←
        </button>
        <button className={styles.controlButton} onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}>
          →
        </button>
      </div>

      <div className={styles.thumbnailContainer}>
        {categories.map((category, index) => (
          <div 
            key={index} 
            className={`${styles.thumbnail} ${index === currentIndex ? styles.activeThumbnail : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleThumbnailClick(index);
            }}
          >
            <img src={category.thumbnail} alt={`Thumbnail ${index + 1}`} />
            <div className={styles.thumbnailOverlay}>
              <span>{category.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
