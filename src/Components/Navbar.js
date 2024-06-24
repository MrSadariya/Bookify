import React, { useContext, useEffect, useState } from "react";
import './navstyle.css';
import {Routes,Route,NavLink} from 'react-router-dom'
import {UserContext} from '../Contexts/UserContext';
import userEvent from "@testing-library/user-event";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBookOpen} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { faBars} from '@fortawesome/free-solid-svg-icons';
import { CurrentContext } from "../Contexts/CurrentContext";

const Navbar=()=>{

    const userdata=useContext(UserContext);
    const curr=useContext(CurrentContext);

    useEffect(()=>{

    },[userdata.id]);

    function handlelogout(){
        let defaultid="1";
        axios.get("http://localhost:8000/logout",{withCredentials:true}).then((res)=>userdata.setid(defaultid)).catch((err)=>console.log(err));
    }
    
    function handleClick(){
         console.log("Clicked");
    }

    const divstyle1= curr.current==="home"?{background:"linear-gradient(90deg,#DC98D0 ,#CC1C74 ,#8C0E44 )"}:{};
    const divstyle2= curr.current==="cart"?{background:"linear-gradient(90deg,#DC98D0 ,#CC1C74 ,#8C0E44 )"}:{};
    const divstyle3= curr.current==="profile"?{background:"linear-gradient(90deg,#DC98D0 ,#CC1C74 ,#8C0E44 )"}:{};

    return(<div className="navbar">
        {/* navbar top */}
        <div className="container">
        <div className="main"><FontAwesomeIcon icon={faBookOpen} style={{color: "white",}} /><h2>Bookify</h2></div>
        <div className="options">
            <div style={divstyle1}><NavLink className="link mainoptions" to="/home">Home</NavLink></div>
            <div style={divstyle2} className="main-cart"><NavLink className="link mainoptions" to="/home/cart">Cart</NavLink></div>
            <div style={divstyle3}>
            <NavLink className="link mainoptions" to="/home/profile">Profile</NavLink></div>
            {userdata.id==="1"?<div><NavLink className="link mainoptions" to="/login">Login</NavLink></div>:<div className="signout-div"><NavLink className="link mainoptions" to="/"><button className="logoutbtn" style={{fontWeight:"700"}} onClick={handlelogout} >Log Out</button></NavLink></div>}
        </div>
        </div>
        

        
    </div>);
}

export default Navbar;