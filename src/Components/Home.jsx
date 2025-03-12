import React,{useContext, useEffect,useState} from "react";
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import Bookbox from "../Components/Bookbox";
import {UserContext} from '../Contexts/UserContext';
import { CurrentContext } from "../Contexts/CurrentContext";

const Home=()=>{
    
    const userdata=useContext(UserContext);
    const [bookdata,setbookdata]=useState([]);
    const curr=useContext(CurrentContext);

    useEffect(()=>{
        curr.setcurrent("home");
        axios.get(`http://localhost:8000`).then((res)=>{
            setbookdata(res.data);
        })
    },[curr])

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
        
        <h2 style={{marginTop:"5rem",marginBottom:"5rem"}}>Every book is a new beginning - start yours today!</h2>
    </div>);
}

export default Home;