import React,{useContext, useEffect,useState} from "react";
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import Bookbox from "../Components/Bookbox";
import { CurrentContext } from "../Contexts/CurrentContext";
import SkeletonLoader from "./SkeletonLoader";

const Home=()=>{
    
    const [bookdata,setbookdata]=useState([]);
    const curr=useContext(CurrentContext);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{

        curr.setcurrent("home");
        setLoading(true);
        axios.get(`http://localhost:8000/Books/All`).then((res)=>{
            setbookdata(res.data);
        })
        setLoading(false);
    },[curr])

    if(loading){
        return <SkeletonLoader/>
    }

    return(
    <div className="books-container">
        <Toaster position="top-center"/>
        <h1 style={{marginTop:"2rem"}}>Buy Books of Your Choice & Category</h1>
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
        {bookdata.map((book) =><Bookbox bookid={book._id} key={book._id} BookName={book.BookName} AuthorName={book.AuthorName} Price={book.Price} YearsUsed={book.YearsUsed}/>)}
        
        <h2 style={{display:"block", marginTop:"5rem",marginBottom:"5rem"}}>Every book is a new beginning - start yours today!</h2>
    </div>);
}

export default Home;