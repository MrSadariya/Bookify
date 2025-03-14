import { useContext, useEffect, useState } from "react";
import { CurrentContext } from "../Contexts/CurrentContext";
import axios from "axios";
import Bookbox from "./Bookbox";
import toast, { Toaster } from "react-hot-toast";

const FictionalPage=()=>{

    const [bookdata,setbookdata]=useState([]);
    const curr=useContext(CurrentContext);

    useEffect(()=>{
        curr.setcurrent("fictional");

        const fetchBooks=async ()=>{
            const res=await axios.get("http://localhost:8000/Books/Fictional");
            if(res.status===200){
                setbookdata(res.data);
            }else{
                toast.error(res.data.message,{duration:4000});
            }
        }

        fetchBooks();

    },[curr])

    return(
    <div style={{minHeight:"calc(100vh - 60px)",width:"90vw",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <Toaster position="top-center"/>
        <h2 style={{marginTop:"3rem",marginBottom:"3rem"}}>Escape reality-immerse yourself in our gripping fiction tales!</h2>
        <div className="books-container">
        
    {bookdata.length!==0 && bookdata.map((book) =><Bookbox bookid={book._id} key={book._id} BookName={book.BookName} AuthorName={book.AuthorName} Price={book.Price} YearsUsed={book.YearsUsed}/>)}

</div></div>);
}

export default FictionalPage;