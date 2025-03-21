import React from "react";
import './cartboxstyle.css';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import defaultBookPic from "../Static/productnotfound.png";

 const Cartbox = (props)=>{

    const BASE_URL=process.env.REACT_APP_BASE_URL;

    const navigate=useNavigate();

    const handleIncrement=async()=>{
      return;
    };

    const handleRemove=async ()=>{
        try{
            const token=localStorage.getItem("token");
            const res=await axios.put(`${BASE_URL}/cart/removeitem`,{bookid:props.bookid,bookname:props.BookName},{
                headers:{Authorization:`Bearer ${token}`},withCredentials:true
            });
            if(res.status===200){
                navigate(0);
            }
            if(res.status!==200){
                toast.error(res.data.message,{duration:4000});
            }

        }catch(err){
            if(err.res){
                toast.error(err.res.data.message,{duration:3000});
            }
        }
        
    }

    return(<div className="cartbox-maindiv">
        <Toaster position="top-center"/>
        <div className="cartbox-book-image">
            <img src={props.bookCoverURL?props.bookCoverURL:defaultBookPic} alt="Book-Pic"></img>
        </div>
        <div className="cartbox-details">
           <h2>{props.BookName}</h2>
           <p>{props.AuthorName}</p>
           <p>Price: ${props.Price}</p>
           <p>Years Used:{props.YearsUsed}</p>
        </div>
        
        <div className="cart-counter-div"><div className="cart-counter-value">{props.count}</div><button className="cart-counter-increment" onClick={handleIncrement}>+</button><button onClick={handleRemove} className="cart-counter-remove-btn">X</button></div>

    </div>);
}

export default Cartbox;
