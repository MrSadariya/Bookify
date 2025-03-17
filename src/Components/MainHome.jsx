import { faBookOpen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"
import Footer from "./Footer"
import "./MainHome.css";

const MainHome = () => {
    return (
        <div className="homepage-main">
            <div className="start">
                <div className="logo">
                    <FontAwesomeIcon icon={faBookOpen} size={"2x"} />
                    <h1>Bookify</h1>
                </div>

                <div className="intro">
                    <div className="heading">
                        <h1>Sell Books & Magazine Online</h1>
                    </div>
                    <div className="description">
                        Bookify is a indian online website for books, and magazines. We facilitate the sale of books, and magazines by connecting sellers with buyers all around the India. What are you waiting for? Sign up today and take the first steps to selling on Bookify!
                    </div>
                    <div>
                        <NavLink className="link" to="/signup">Sign Up</NavLink>
                    </div>
                </div>
            </div>

            <div className="detail-home">
                <div className="text-contain">
                    <div className="type-text">
                        Welcome to our book exchange platform, where book lovers unite to buy and sell their beloved stories! Whether you're looking to declutter your shelves or find a new adventure, you're in the right place. Sell your gently loved books to someone who will cherish them just as much as you did, or browse our diverse selection to discover your next literary obsession. Join our community today and let the stories continue to inspire and connect us all.
                    </div>
                    <div>
                        <div>
                            <NavLink className="link" to="/login">Login</NavLink>
                        </div>
                        <div>
                            <NavLink className="link" to="/signup">SignUp</NavLink>
                        </div>
                    </div>
                </div>
                
                <div className="types">
                    <div className="row">
                        <div className="fiction real-fiction">
                            <NavLink className="link" to="/home/fictional">Fiction</NavLink>
                        </div>
                        <div className="non-fiction real-nonfiction">
                            <NavLink className="link" to="/home/nonfictional">NonFictional</NavLink>
                        </div>
                    </div>

                    <div className="row">
                        <div className="educational real-educational">
                            <NavLink className="link" to="/home/educational">Educational</NavLink>
                        </div>
                        <div className="magazine real-magazine">
                            <NavLink className="link" to="/home">Books</NavLink>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default MainHome;