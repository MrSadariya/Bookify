import React,{useState,useEffect,useContext} from "react";
import './navstyle.css';
import {UserContext} from'../Contexts/UserContext';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { AlertContext } from "../Contexts/AlertContext";
import { Toaster, toast } from 'react-hot-toast';

const Bookbox=(props)=>{

  const userdata=useContext(UserContext);
  const alert=useContext(AlertContext);

//  const  handleAddItem = async()=>{
  
//   if(userdata.id==="1"){
//     return(<div>
//       <h1>Please Login to Add items to cart.</h1>
//     </div>)
//   }else{
//     const response=await axios.post(`http://localhost:8000/additem/${userdata.id}`,{
//       id:userdata.id,bookid:props.bookid,count:0
//     });
    
//     console.log(response.data);
//     if(response.data.error){
//       toast.error("You are selling this book , You can't buy it!!",{duration:5000});
//     }else{
//       alert.setshowalert("block");
//       alert.setmsg("Book is added to your cart.");
//     }

//   }
 

//  }

const handleAddItem = async () => {
  if (userdata.id === "1") {
    toast.error("Please Login to Add items to cart.", { duration: 5000 });
    return;
  }

  try {
    const response = await axios.post(
      `http://localhost:8000/additem/${userdata.id}`,
      {
        id: userdata.id,
        bookid: props.bookid,
        count: 0,
      }
    );
    console.log('Response:', response); 
    console.log('Response Data:', response.data); 

    if (response.data.error) {
      toast.error("You are selling this book, You can't buy it!!", {
        duration: 5000,
      });
    } else if(response.data.success){
      toast.success("Book Succesfully Added to Cart!!",{duration:5000});
      // alert.setshowalert("block");
      // alert.setmsg("Book is added to your cart.");
    }
  } catch (error) {
    toast.error("An error occurred while adding the item!", { duration: 5000 });
    console.error(error);
  }
};


    return(<div className="bookbox">
      <div className="bookimgdiv"></div>
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