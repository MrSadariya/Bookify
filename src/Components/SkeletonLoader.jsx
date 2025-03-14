import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = () => {
  return (
    <div className="skeleton-container">
      <div className="skeleton-header">
        <div className="skeleton-title pulse"></div>
      </div>
      
      <div className="skeleton-showcase">
        {Array(6).fill().map((_, index) => (
          <div key={index} className="skeleton-book-card pulse"></div>
        ))}
      </div>
      
      <div className="skeleton-book-grid">
        {Array(4).fill().map((_, index) => (
          <div key={index} className="skeleton-listing">
            <div className="skeleton-book-image pulse"></div>
            <div className="skeleton-book-details">
              <div className="skeleton-book-title pulse"></div>
              <div className="skeleton-book-author pulse"></div>
              <div className="skeleton-book-usage pulse"></div>
              <div className="skeleton-book-price pulse"></div>
            </div>
            <div className="skeleton-cart-button pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;