import { useContext, useEffect, useState } from "react";
import { CurrentContext } from "../Contexts/CurrentContext";
import axios from "axios";
import Bookbox from "./Bookbox";
import toast, { Toaster } from "react-hot-toast";
import SkeletonLoader from "./SkeletonLoader";
import { SidebarContext } from "../Contexts/SidebarContext";

const FictionalPage=()=>{

    const BASE_URL=process.env.REACT_APP_BASE_URL;

    const [bookdata,setbookdata]=useState([]);
    const curr=useContext(CurrentContext);
    const [loading,setLoading]=useState(true);
    const {isSideBar,setIsSideBar}=useContext(SidebarContext);

    useEffect(()=>{
        curr.setcurrent("fictional");
        setIsSideBar(false);

        const fetchBooks=async ()=>{
            const res=await axios.get(`${BASE_URL}/Books/Fictional`);
            if(res.status===200){
                setbookdata(res.data);
            }else{
                toast.error(res.data.message,{duration:4000});
            }
        }
        setLoading(true);
        fetchBooks();
        setLoading(false);

    },[ curr, setIsSideBar])

    if(loading){
        return <SkeletonLoader/>
    }

    return(
    <div className="home-books-container">
        <Toaster position="top-center"/>
        
        <h2 className="book-thought-div fictional-thought" >Escape reality-immerse yourself in our gripping fiction tales!</h2>

        <div className="books-contain books-contain-fictional">
        {bookdata.length!==0 && bookdata.map((book) =><Bookbox bookid={book._id} key={book._id} BookName={book.BookName} AuthorName={book.AuthorName} Price={book.Price} YearsUsed={book.YearsUsed} {...(book.bookCoverURL && { bookCoverURL: book.bookCoverURL })}/>)}
        </div>

        
    </div>);
}

export default FictionalPage;