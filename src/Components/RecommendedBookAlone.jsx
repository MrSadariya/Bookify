import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RecommendedBookAlone.css';

const RecommendedAloneBook = () => {
    const { isbn13 } = useParams();
    const navigate = useNavigate();
    const [bookData, setBookData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(true);
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const RECOMMENDER_SERVICE=process.env.REACT_APP_RECOMMENDER_SERVICE_URL;

    useEffect(() => {
        setLoading(true);
        axios.get(`${RECOMMENDER_SERVICE}/getRecommendBook/${isbn13}`)
            .then((res) => {
                setBookData(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error loading recommended book details:', error);
                setLoading(false);
            });
    }, [isbn13]);

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    const handleImageError = (e) => {
        e.target.src = '/default-book-cover.jpg';
        setImageLoading(false);
    };

    const handleBackToHome = () => {
        navigate('/home');
    };

    if (loading) {
        return (
            <div className="rec-alone-book-alone-container">
                <div className="rec-alone-book-alone-loading">
                    <div className="rec-alone-loading-spinner"></div>
                    <span>Loading book details...</span>
                </div>
            </div>
        );
    }

    if (!bookData) {
        return (
            <div className="rec-alone-book-alone-container">
                <div className="rec-alone-book-alone-error">
                    <div className="rec-alone-error-icon">📚</div>
                    <h2>Book Not Found</h2>
                    <p>The recommended book data is not available.</p>
                    <button 
                        className="rec-alone-back-btn"
                        onClick={handleBackToHome}
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="rec-alone-book-alone-container">
            <div className="rec-alone-book-alone-content">
                <div className="rec-alone-book-image-section">
                    <div className="rec-alone-image-container">
                        {imageLoading && (
                            <div className="rec-alone-image-loading">
                                <div className="rec-alone-image-skeleton"></div>
                            </div>
                        )}
                        <img 
                            src={bookData.thumbnail || '/default-book-cover.jpg'} 
                            alt={bookData.title_subtitle}
                            className={`rec-alone-book-alone-image ${imageLoading ? 'rec-alone-hidden' : 'rec-alone-visible'}`}
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                        />
                    </div>
                </div>

                <div className="rec-alone-book-details-section">
                    <div className="rec-alone-book-header">
                        <h1 className="rec-alone-book-title">{bookData.title_subtitle}</h1>
                        <div className="rec-alone-book-author">by {bookData.authors}</div>
                    </div>

                    <div className="rec-alone-book-info">
                        <div className="rec-alone-info-grid">
                            <div className="rec-alone-info-card">
                                <span className="rec-alone-info-label">Average Rating</span>
                                <span className="rec-alone-info-value rec-alone-rating">⭐ {bookData.average_rating}</span>
                            </div>
                            <div className="rec-alone-info-card">
                                <span className="rec-alone-info-label">Categories</span>
                                <span className="rec-alone-info-value">{bookData.categories}</span>
                            </div>
                            <div className="rec-alone-info-card">
                                <span className="rec-alone-info-label">ISBN-13</span>
                                <span className="rec-alone-info-value">{bookData.isbn13}</span>
                            </div>
                            <div className="rec-alone-info-card">
                                <span className="rec-alone-info-label">ISBN-10</span>
                                <span className="rec-alone-info-value">{bookData.isbn10 || 'N/A'}</span>
                            </div>
                        </div>

                        {bookData.description && (
                            <div className="rec-alone-book-description">
                                <h3 className="rec-alone-description-title">Description</h3>
                                <p className="rec-alone-description-text">{bookData.description}</p>
                            </div>
                        )}

                        {bookData.published_year && (
                            <div className="rec-alone-book-description">
                                <h3 className="rec-alone-description-title">Publication Info</h3>
                                <p className="rec-alone-description-text">
                                    Published in {bookData.published_year}
                                    {bookData.num_pages && ` • ${bookData.num_pages} pages`}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="rec-alone-action-section">
                        <button 
                            className="rec-alone-back-btn"
                            onClick={handleBackToHome}
                        >
                            <span className="rec-alone-btn-icon">🏠</span>
                            <span className="rec-alone-btn-text">Back to Home</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecommendedAloneBook;