import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import './BookAlone.css';

const BookAlone = () => {
    const { bookID } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [recommendationsLoading, setRecommendationsLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(true);
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const RECOMMENDER_SERVICE=process.env.REACT_APP_RECOMMENDER_SERVICE_URL;

    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/Books/book/${bookID}`)
            .then((res) => {
                setBook(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error loading book details:', error);
                toast.error('Error loading book details');
                setLoading(false);
            });
    }, [bookID, BASE_URL]);

    useEffect(() => {
        if (book) {
            setRecommendationsLoading(true);
            axios.post(`${RECOMMENDER_SERVICE}/recommend`,{"query":book.BookDescription || book.BookName+" "+book.BookType,"top_n":5})
                .then((res) => {
                    setRecommendations(res.data.recommendations); 
                    setRecommendationsLoading(false);
                })
                .catch((error) => {
                    console.error('Error loading recommendations:', error);
                    setRecommendationsLoading(false);
                });
        }
    }, [book, bookID, BASE_URL]);

const handleAddToCart = async () => {
  const token=localStorage.getItem("token");
  if(!token){
    toast.error("Please Login to Add items to cart.", { duration: 5000 });
    return;
  }
 
  try {
    const response = await axios.post(
      `${BASE_URL}/cart/additem`,
      {
        bookid: book._id,
        count: 0,
      },{
        headers:{Authorization:`Bearer ${token}`},withCredentials:true
      }
    );
   
    if(response.status===200){
      toast.success("Book Succesfully Added to Cart!!",{duration:5000});
      return;
    }else{
      toast.error(response.data.message,{duration:4000})
      return;
    }
  } catch (error) {
      if(error.response){
        toast.error(error.response.data.message,{duration:3000});
      }
  }
};

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    const handleImageError = (e) => {
        e.target.src = '/default-book-cover.jpg';
        setImageLoading(false);
    };

    const handleRecommendationClick = (isbn13) => {
        navigate(`/home/recommendedBook/${isbn13}`);
    };

    if (loading) {
        return (
            <div className="alone-book-alone-container">
                <div className="alone-book-alone-loading">
                    <div className="alone-loading-spinner"></div>
                    <span>Loading book details...</span>
                </div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="alone-book-alone-container">
                <div className="alone-book-alone-error">
                    <div className="alone-error-icon">📚</div>
                    <h2>Book Not Found</h2>
                    <p>The book you're looking for doesn't exist or has been removed.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="alone-book-alone-container">
            <Toaster 
                position="top-center"
                
            />
            
            <div className="alone-book-alone-content">
                <div className="alone-book-image-section">
                    <div className="alone-image-container">
                        {imageLoading && (
                            <div className="alone-image-loading">
                                <div className="alone-image-skeleton"></div>
                            </div>
                        )}
                        <img 
                            src={book.bookCoverURL || '/default-book-cover.jpg'} 
                            alt={book.BookName}
                            className={`alone-book-alone-image ${imageLoading ? 'alone-hidden' : 'alone-visible'}`}
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                        />
                    </div>
                </div>

                <div className="alone-book-details-section">
                    <div className="alone-book-header">
                        <h1 className="alone-book-title">{book.BookName}</h1>
                        <div className="alone-book-author">by {book.AuthorName}</div>
                    </div>

                    <div className="alone-book-info">
                        <div className="alone-info-grid">
                            <div className="alone-info-card">
                                <span className="alone-info-label">Price</span>
                                <span className="alone-info-value alone-price">${book.Price}</span>
                            </div>
                            <div className="alone-info-card">
                                <span className="alone-info-label">Years Used</span>
                                <span className="alone-info-value">{book.YearsUsed} years</span>
                            </div>
                            <div className="alone-info-card">
                                <span className="alone-info-label">Book Type</span>
                                <span className="alone-info-value">{book.BookType}</span>
                            </div>
                        </div>

                        {book.BookDescription && (
                            <div className="alone-book-description">
                                <h3 className="alone-description-title">Description</h3>
                                <p className="alone-description-text">{book.BookDescription}</p>
                            </div>
                        )}
                    </div>

                    <div className="alone-action-section">
                        <button 
                            className="alone-buy-btn"
                            onClick={handleAddToCart}
                        >
                            <span className="alone-btn-icon">🛒</span>
                            <span className="alone-btn-text">Add to Cart</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Recommendations Section */}
            <div className="alone-recommendations-section">
                <h2 className="alone-recommendations-title">You Might Also Like</h2>
                
                {recommendationsLoading ? (
                    <div className="alone-recommendations-loading">
                        <div className="alone-loading-spinner"></div>
                        <span>Loading recommendations...</span>
                    </div>
                ) : (
                    <div className="alone-recommendations-container">
                        <div className="alone-recommendations-scroll">
                            {recommendations.map((recBook) => (
                                <div 
                                    key={recBook.isbn13} 
                                    className="alone-recommendation-card"
                                    onClick={() => handleRecommendationClick(recBook.isbn13)}
                                >
                                    <div className="alone-rec-image-container">
                                        <img 
                                            src={recBook.thumbnail || '/default-book-cover.jpg'} 
                                            alt={recBook.title_subtitle}
                                            className="alone-rec-image"
                                            onError={(e) => {
                                                e.target.src = '/default-book-cover.jpg';
                                            }}
                                        />
                                    </div>
                                    <div className="alone-rec-details">
                                        <h4 className="alone-rec-title">{recBook.title_subtitle}</h4>
                                        <p className="alone-rec-author">by {recBook.authors}</p>
                                        <p className="alone-rec-category">{recBook.categories}</p>
                                        <p className="alone-rec-price">{recBook.average_rating}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookAlone;