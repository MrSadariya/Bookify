import React from "react";
// import './navstyle.css';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import "./Bookbox.css";
import { useNavigate } from 'react-router-dom';
import defaultBookPic from "../Static/productnotfound.png"

const Bookbox=(props)=>{

  const BASE_URL=process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`/home/book/${props.bookid}`);
  };

const handleAddItem = async () => {
  const token=localStorage.getItem("token");
  if(!token){
    toast.error("Please Login to Add items to cart.", { duration: 5000 });
    return;
  }
 
  try {
    const response = await axios.post(
      `${BASE_URL}/cart/additem`,
      {
        bookid: props.bookid,
        count: 0,
      },{
        headers:{Authorization:`Bearer ${token}`},withCredentials:true
      }
    );
   
    if(response.status===200){
      toast.success("Book Succesfully Added to Cart!!",{duration:5000});
      return;
    }else{
      toast.error(response.data.message,{duration:4000})
      return;
    }
  } catch (error) {
      if(error.response){
        toast.error(error.response.data.message,{duration:3000});
      }
  }
};


    return(<div className="bookbox" onClick={handleBookClick}>
      <div className="bookimgdiv">
        <img src={props.bookCoverURL?props.bookCoverURL:defaultBookPic} alt="Book-Pic"></img>
      </div>
      <div className="bookdetaildiv">
      <h2>{props.BookName}</h2>
      <h3>{props.AuthorName}</h3>
      <h3>Years Used:{props.YearsUsed}</h3>
      <h2>${props.Price}</h2>
      
      
      
      </div>

      <div className="imgbuybutton"><button onClick={handleAddItem}><FontAwesomeIcon icon={faCartShopping} style={{color: "#ffffff",}} /></button></div>
      
    </div>);
}

export default Bookbox;