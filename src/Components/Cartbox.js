import React, { useContext, useState } from "react";
import './cartboxstyle.css';
import {UserContext} from '../Contexts/UserContext';

import axios from 'axios';

 const Cartbox = (props)=>{

    const userdata=useContext(UserContext);


    function handleIncrement(){
        axios.get(`http://localhost:8000/cart/increment/${userdata.id}/${props.BookName}`).catch((err)=>console.log(err));
    };

    function handleRemove(){
        axios.get(`http://localhost:8000/cart/remove/${userdata.id}/${props.BookName}`)
        .catch((err)=>console.log(err));
    }

    return(<div className="cartbox">
        <div className="book-image"></div>
        <div className="details">
           <h2>{props.BookName}</h2>
           <p>{props.AuthorName}</p>
           <p>Price: ${props.Price}</p>
           <p>Years Used:{props.YearsUsed}</p>
        </div>
        
        <div className="cart-counter"><div>{props.count}</div><button className="increment" onClick={handleIncrement}>+</button><button onClick={handleRemove} className="remove-btn">X</button></div>

    </div>);
}

export default Cartbox;
