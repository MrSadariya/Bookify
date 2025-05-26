import { useContext, useEffect, useState } from "react";
import { CurrentContext } from "../Contexts/CurrentContext";
import axios from "axios";
import Bookbox from "./Bookbox";
import toast from "react-hot-toast";
import SkeletonLoader from "./SkeletonLoader";
import { SidebarContext } from "../Contexts/SidebarContext";

const NonFictionalPage=()=>{

    const BASE_URL=process.env.REACT_APP_BASE_URL;

    const [bookdata,setbookdata]=useState([]);
    const curr=useContext(CurrentContext);
    const [loading,setLoading]=useState(true);
    const {isSideBar,setIsSideBar}=useContext(SidebarContext);

    useEffect(()=>{
        curr.setcurrent("nonfictional");
        setIsSideBar(false);


        const fetchBooks=async ()=>{
            try{
                setLoading(true);
                const res=await axios.get(`${BASE_URL}/Books/NonFictional`);
                if(res.status===200){
                    setbookdata(res.data);
                }else{
                    toast.error(res.data.message,{duration:4000});
                }
            }catch(err){
                console.log(err);
            }finally{
                setLoading(false);
            }
            
        }
        fetchBooks();
    },[curr, setIsSideBar])

    if(loading){
        return <SkeletonLoader/>
    }

    return(
    <div className="home-books-container">
        <h2 className="book-thought-div fictional-thought">Empower your mind with real stories and facts - shop our non-fiction selection!</h2>
        
        <div className="books-contain books-contain-fictional">
        {bookdata.length!==0 && bookdata.map((book) =><Bookbox bookid={book._id} key={book._id} BookName={book.BookName} AuthorName={book.AuthorName} Price={book.Price} YearsUsed={book.YearsUsed} {...(book.bookCoverURL && { bookCoverURL: book.bookCoverURL })}/>)}
        </div>
    
    </div>);
}

export default NonFictionalPage;