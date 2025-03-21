import React, { useContext, useEffect, useState } from "react";
// import './navstyle.css';
import {NavLink, useNavigate} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBookOpen,faBars} from '@fortawesome/free-solid-svg-icons';
import { SidebarContext } from "../Contexts/SidebarContext";
import "./Dashboard.css";

import { CurrentContext } from "../Contexts/CurrentContext";
import Sidebar from "./Sidebar";

const Navbar=()=>{

    const navigate=useNavigate();

    const curr=useContext(CurrentContext);
    const [isAuthenticated,setisAuthenticated]=useState(true);
    const {isSideBar,setIsSideBar}=useContext(SidebarContext);

    useEffect(()=>{
        const token=localStorage.getItem("token");
        if(!token){
            setisAuthenticated(false);
            return;
        }

    },[]);

    function handlelogout(){
        localStorage.removeItem('token');
        navigate("/");
    }
    
    const divstyle1= curr.current==="home"?{background:"linear-gradient(90deg,#DC98D0 ,#CC1C74 ,#8C0E44 )"}:{};
    const divstyle2= curr.current==="cart"?{background:"linear-gradient(90deg,#DC98D0 ,#CC1C74 ,#8C0E44 )"}:{};
    const divstyle3= curr.current==="profile"?{background:"linear-gradient(90deg,#DC98D0 ,#CC1C74 ,#8C0E44 )"}:{};

    const handleToggle=()=>{
        setIsSideBar(!isSideBar);
    }

    return(<div className="navbar">
        {isSideBar && <Sidebar/>}
        
        <div className="container">
        <div className="main"><FontAwesomeIcon icon={faBookOpen} style={{color: "white",}} /><h2>Bookify</h2><FontAwesomeIcon className="toggle-bars" icon={faBars} onClick={handleToggle} /></div>
       
        <div className="options">
            
            <div style={divstyle1}><NavLink className="link-navbar" to="/home">Home</NavLink></div>
            <div style={divstyle2} className="main-cart"><NavLink className="link-navbar" to="/home/cart">Cart</NavLink></div>
            <div style={divstyle3}>
            <NavLink className="link-navbar" to="/home/profile">Profile</NavLink></div>
            {!isAuthenticated?<div><NavLink className="link-navbar" to="/login">Login</NavLink></div>:<div className="signout-div"><NavLink className="link-navbar" to="/"><button className="logoutbtn" style={{fontWeight:"700"}} onClick={handlelogout} >Log Out</button></NavLink></div>}
        </div>
        
        
        </div>
        

        
    </div>);
}

export default Navbar;