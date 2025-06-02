import {  useEffect, useState } from "react";
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
import  { Toaster } from "react-hot-toast";
import BookAlone from "./BookAlone";
import "./Dashboard.css";
import RecommendedAloneBook from "./RecommendedBookAlone";


const DefaultHome=()=>{

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
        
    },[]);

    return(<div className="app">
        <Navbar/>
            <div className="content">
            <Dashboard/>
            <div className="component" >
                <Toaster position="top-center"/>
               <Routes>
                    <Route  path="/" element={<Home />}/>
                    <Route path="cart" element={<Cart/>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="sellbook" element={<SellBook/>}/>
                    <Route path="fictional" element={<FictionalPage/>}/>
                    <Route path="nonfictional" element={<NonFictionalPage/>}/>
                    <Route path="educational" element={<Educational/>}/>
                    <Route path="explore" element={<Explore/>}/>
                    <Route path="/book/:bookID" element={<BookAlone />} />
                    <Route path="/recommendedBook/:isbn13" element={<RecommendedAloneBook/>}/>
                </Routes>
            </div>
    </div></div>);
}

export default DefaultHome;
