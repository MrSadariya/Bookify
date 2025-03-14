import React from "react";
import './cartboxstyle.css';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

 const Cartbox = (props)=>{

    const navigate=useNavigate();

    const handleIncrement=async()=>{
        
    //     const token=localStorage.getItem("token");
    //    const res=await axios.get(`http://localhost:8000/cart/incrementItem/${props.bookid}`,{
    //     headers:{Authorization:`Bearer ${token}`},withCredentials:true
    //     });
    //    if(res.status===200){

    //    }else{
    //     toast.error(res.data.message,{duration:4000});
    //    }
      return;
    };

    const handleRemove=async ()=>{
        const token=localStorage.getItem("token");
        const res=await axios.put(`http://localhost:8000/cart/removeitem`,{bookid:props.bookid,bookname:props.BookName},{
            headers:{Authorization:`Bearer ${token}`},withCredentials:true
        });
        if(res.status===200){
            navigate(0);
        }
        if(res.status!==200){
            toast.error(res.data.message,{duration:4000});
        }
    }

    return(<div className="cartbox">
        <Toaster position="top-center"/>
        <div className="book-image"></div>
        <div className="details">
           <h2>{props.BookName}</h2>
           <p>{props.AuthorName}</p>
           <p>Price: ${props.Price}</p>
           <p>Years Used:{props.YearsUsed}</p>
        </div>
        
        <div className="cart-counter"><div>{props.count}</div><button style={{display:"flex",alignItems:"center",justifyContent:"center"}} className="increment" onClick={handleIncrement}>+</button><button onClick={handleRemove} className="remove-btn">X</button></div>

    </div>);
}

export default Cartbox;
