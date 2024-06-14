import React, { useContext, useEffect, useState } from "react";
import './navstyle.css';
import {Routes,Route,NavLink} from 'react-router-dom'
import {UserContext} from '../Contexts/UserContext';
import userEvent from "@testing-library/user-event";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBookOpen} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { faBars} from '@fortawesome/free-solid-svg-icons';

const Navbar=()=>{

    const userdata=useContext(UserContext);

    useEffect(()=>{

    },[userdata.id]);

    function handlelogout(){
        let defaultid="1";
        axios.get("http://localhost:8000/logout",{withCredentials:true}).then((res)=>userdata.setid(defaultid)).catch((err)=>console.log(err));
    }
    
    function handleClick(){
         console.log("Clicked");
    }

    return(<div className="navbar">
        {/* navbar top */}
        <div className="container">
        <div className="main"><FontAwesomeIcon icon={faBookOpen} style={{color: "white",}} /><h2>Bookify</h2></div>
        <div className="options">
            <div><NavLink className="link mainoptions" to="/home">Home</NavLink></div>
            <div className="main-cart"><NavLink className="link mainoptions" to="/home/cart">Cart</NavLink></div>
            <div>
            <NavLink className="link mainoptions" to="/home/profile">Profile</NavLink></div>
            {userdata.id==="1"?<div><NavLink className="link mainoptions" to="/login">Login</NavLink></div>:<div className="signout-div"><NavLink className="link mainoptions" to="/"><button  onClick={handlelogout} >Log Out</button></NavLink></div>}
        </div>
        </div>
        

        
    </div>);
}

export default Navbar;