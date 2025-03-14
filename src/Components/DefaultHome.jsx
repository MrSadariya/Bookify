import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import Navbar from "./Navbar";

import Dashboard from "./Dashboard";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import NotLoggedinPage from "./NotLoggedinPage";
import FictionalPage from "./FictionalPage";
import NonFictionalPage from "./NonFictionalPage";
import Educational from "./Educational";
import Explore from "./Explore";
import SellBook from "./SellBook";
import Cart from "./Cart";
import Profile from "./Profile";
import { jwtDecode } from "jwt-decode";


const DefaultHome=()=>{

    const userdata=useContext(UserContext);
    const [isAuthenticated,setisAuthenticated]=useState(true);

    
    useEffect(()=>{

        const token=localStorage.getItem("token");
        if(!token){
            setisAuthenticated(false);
            return;
        }
        const decoded=jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if(currentTime>decoded.exp){
            setisAuthenticated(false);
            localStorage.removeItem("token");
            return;
        }
        
    },[userdata]);

    return(<div className="app">
        <Navbar/>
            <div className="content">
            <Dashboard/>
            <div className="component" >
               <Routes>
                    <Route  path="/" element={<Home />}/>
                    <Route path="cart" element={!isAuthenticated?<NotLoggedinPage/>:<Cart/>}/>
                    <Route path="profile" element={!isAuthenticated?<NotLoggedinPage/>:<Profile/>}/>
                    <Route path="sellbook" element={!isAuthenticated?<NotLoggedinPage/>:<SellBook/>}/>
                    <Route path="fictional" element={<FictionalPage/>}/>
                    <Route path="nonfictional" element={<NonFictionalPage/>}/>
                    <Route path="educational" element={<Educational/>}/>
                    <Route path="explore" element={!isAuthenticated?<NotLoggedinPage/>:<Explore/>}/>
                </Routes>
            </div>
    </div></div>);
}

export default DefaultHome;
