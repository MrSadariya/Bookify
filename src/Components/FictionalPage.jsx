import { useContext, useEffect, useState } from "react";
import { CurrentContext } from "../Contexts/CurrentContext";
import axios from "axios";
import Bookbox from "./Bookbox";

const FictionalPage=()=>{

    const [bookdata,setbookdata]=useState([]);
    const curr=useContext(CurrentContext);

    useEffect(()=>{
        curr.setcurrent("fictional");
        axios.get("http://localhost:8000/Books/Fictional").then((res)=>setbookdata(res.data)).catch((err)=>console.log(err));
    },[curr])

    return(
    <div style={{minHeight:"calc(100vh - 60px)",width:"90vw",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <h2 style={{marginTop:"3rem",marginBottom:"3rem"}}>Escape reality-immerse yourself in our gripping fiction tales!</h2>
        <div className="books-container">
        
    {bookdata.map((book) =><Bookbox bookid={book._id} key={book._id} BookName={book.BookName} AuthorName={book.AuthorName} Price={book.Price} YearsUsed={book.YearsUsed}/>)}

</div></div>);
}

export default FictionalPage;