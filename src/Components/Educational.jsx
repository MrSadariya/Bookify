import { useContext, useEffect, useState } from "react";
import { CurrentContext } from "../Contexts/CurrentContext";
import axios from "axios";
import Bookbox from "./Bookbox";
import toast from "react-hot-toast";
import SkeletonLoader from "./SkeletonLoader";

const Educational=()=>{

    const [bookdata,setbookdata]=useState([]);
    const curr=useContext(CurrentContext);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        curr.setcurrent("educational");

        const fetchBooks=async ()=>{
            const res=await axios.get("http://localhost:8000/Books/Educational");
            if(res.status===200){
                setbookdata(res.data);
            }else{
                toast.error(res.data.message,{duration:4000});
            }
        }
        setLoading(true);
        fetchBooks();
        setLoading(false);

    },[curr])

    if(loading){
        return <SkeletonLoader/>
    }

    return(<div style={{minHeight:"calc(100vh - 60px)",width:"90vw",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <h2 style={{marginTop:"3rem",marginBottom:"3rem"}}>Ignite your curiosity - unlock knowledge with our educational books!</h2>
    
    <div className="books-container">
    {bookdata.length!==0 && bookdata.map((book) =><Bookbox bookid={book._id} key={book._id} BookName={book.BookName} AuthorName={book.AuthorName} Price={book.Price} YearsUsed={book.YearsUsed}/>)}
</div></div>);
}

export default Educational;