import React,{useState,useEffect,useContext} from "react";
import './navstyle.css';
import {UserContext} from'../Contexts/UserContext';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';

const Bookbox=(props)=>{

  const userdata=useContext(UserContext);

 function handleAddItem(){
  
  if(userdata.id===null){
    return(<div>
      <h1>Please Login to Add items to cart.</h1>
    </div>)
  }else{
    axios.post(`http://localhost:8000/additem/${userdata.id}`,{
      id:userdata.id,bookid:props.bookid,count:0
    });

  }

 }

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