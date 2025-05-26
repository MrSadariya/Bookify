import React,{useContext, useEffect,useState} from "react";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Bookbox from "../Components/Bookbox";
import { CurrentContext } from "../Contexts/CurrentContext";
import SkeletonLoader from "./SkeletonLoader";
import "./Home.css";
import { SidebarContext } from "../Contexts/SidebarContext";

const Home=()=>{

    const BASE_URL=process.env.REACT_APP_BASE_URL;
    
    const [bookdata,setbookdata]=useState([]);
    const curr=useContext(CurrentContext);
    const [loading,setLoading]=useState(true);
    const {isSideBar,setIsSideBar}=useContext(SidebarContext);

     useEffect(() => {
            const message = localStorage.getItem("toastMessage");
            if (message) {
                toast.success(message, { duration: 3000 });
                localStorage.removeItem("toastMessage"); 
            }
    }, []);

    useEffect(()=>{

        curr.setcurrent("home");
        setIsSideBar(false);
        setLoading(true);
        axios.get(`${BASE_URL}/Books/All`).then((res)=>{
            setbookdata(res.data);
            setLoading(false);
        })
        
    },[curr])

    if(loading){
        return <SkeletonLoader/>
    }

    return(
    <div className="home-books-container">
        <Toaster position="top-center"/>
        <div className="home-books-heading" >Buy Books of Your Choice & Category</div>
        <div className="bestsellers">
            
            <div className="best-container">
                <div ></div>
                <div></div>
                <div ></div>
                <div ></div>
                <div ></div>
                <div></div>
            </div>
        </div>
        
        <div className="books-contain">
        {bookdata.map((book) =><Bookbox bookid={book._id} key={book._id} BookName={book.BookName} AuthorName={book.AuthorName} Price={book.Price} YearsUsed={book.YearsUsed} {...(book.bookCoverURL && { bookCoverURL: book.bookCoverURL })}/>)}
        </div>
        <div className="book-thought-div">Every book is a new beginning - start yours today!</div>
        
    </div>);
}

export default Home;