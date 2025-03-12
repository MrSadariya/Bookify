import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import Navbar from "./Navbar";
import Alert from "./Alert";

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

const DefaultHome=()=>{

    const userdata=useContext(UserContext);
    const [componentstyle,setcomponentstyle]=useState({width:"90vw"});

    useEffect(()=>{
        axios.get("http://localhost:8000/getuseremail",{ withCredentials:true}).then((res)=>{
            if(res.data.id){
                userdata.setid(res.data.id);
            }else{
                userdata.setid("1");
            }
            
        });
        
    },[userdata, userdata.id]);

    return(<div className="app">
        <Navbar/>
        <Alert/>
            <div className="content">
            <Dashboard/>
            {/* {userdata.id==="1"?<div></div>:<Dashboard/>} */}
            <div className="component" >
               <Routes>
                    <Route  path="/" element={<Home />}/>
                    <Route path="cart" element={userdata.id==='1'?<NotLoggedinPage/>:<Cart/>}/>
                    <Route path="profile" element={userdata.id==="1"?<NotLoggedinPage/>:<Profile/>}/>
                    <Route path="sellbook" element={userdata.id==="1"?<NotLoggedinPage/>:<SellBook/>}/>
                    <Route path="fictional" element={<FictionalPage/>}/>
                    <Route path="nonfictional" element={<NonFictionalPage/>}/>
                    <Route path="educational" element={<Educational/>}/>
                    <Route path="explore" element={userdata.id==='1'?<NotLoggedinPage/>:<Explore/>}/>
                </Routes>
            </div>
    </div></div>);
}

export default DefaultHome;
