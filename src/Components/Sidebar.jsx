import {React,useContext, useEffect, useState} from "react";
// import './navstyle.css';
import {NavLink, useNavigate} from 'react-router-dom';
import { CurrentContext } from "../Contexts/CurrentContext";
import {SidebarContext} from "../Contexts/SidebarContext";

import "./Dashboard.css";

const Sidebar=(props)=>{

  const curr=useContext(CurrentContext);
  const {isSideBar,setIsSideBar}=useContext(SidebarContext);
  const navigate=useNavigate();
  const [isAuthenticated,setisAuthenticated]=useState(true);

  function handlelogout(){
    localStorage.removeItem('token');
    navigate("/");
  }

  useEffect(()=>{
    const token=localStorage.getItem("token");
        if(!token){
            setisAuthenticated(false);
            return;
        }
  },[])

  const divstyle6= curr.current==="home"?{background:"linear-gradient(90deg,#DC98D0 ,#CC1C74 ,#8C0E44 )"}:{};
  const divstyle7= curr.current==="cart"?{background:"linear-gradient(90deg,#DC98D0 ,#CC1C74 ,#8C0E44 )"}:{};
  const divstyle8= curr.current==="profile"?{background:"linear-gradient(90deg,#DC98D0 ,#CC1C74 ,#8C0E44 )"}:{};

  const divstyle1= curr.current==="sellbook"?{background:"linear-gradient(90deg,#DC98D0 ,#CC1C74 ,#8C0E44 )"}:{};
  const divstyle2= curr.current==="fictional"?{background:"linear-gradient(90deg,#DC98D0 ,#CC1C74 ,#8C0E44 )"}:{};
  const divstyle3= curr.current==="nonfictional"?{background:"linear-gradient(90deg,#DC98D0 ,#CC1C74 ,#8C0E44 )"}:{};
  const divstyle4= curr.current==="educational"?{background:"linear-gradient(90deg,#DC98D0 ,#CC1C74 ,#8C0E44 )"}:{};
  const divstyle5= curr.current==="explore"?{background:"linear-gradient(90deg,#DC98D0 ,#CC1C74 ,#8C0E44 )"}:{};

    return(
        <div>
          <div className={`sidebar ${isSideBar ? 'active' : ''}`}>
            <div className="link-sidebar" style={{textDecoration:"underline",fontSize:"1.3rem"}}>Options </div>
            <div style={divstyle6}><NavLink className="link-sidebar" to="/home/">Home</NavLink></div>
            <div style={divstyle7}><NavLink className="link-sidebar" to="/home/cart">Cart</NavLink></div>
            <div style={divstyle8}><NavLink className="link-sidebar" to="/home/profile">Profile</NavLink></div>
            <div style={divstyle1}><NavLink className="link-sidebar" to="/home/sellbook">Sell Book</NavLink></div>
            <div style={divstyle2}><NavLink className="link-sidebar" to="/home/fictional">Fictional</NavLink></div>
            <div style={divstyle3}><NavLink className="link-sidebar" to="/home/nonfictional">NonFictional</NavLink></div>
            <div style={divstyle4}><NavLink className="link-sidebar" to="/home/educational">Educational</NavLink></div>
            <div style={divstyle5}><NavLink className="link-sidebar" to="/home/explore">Explore</NavLink></div>
            {!isAuthenticated?<div><NavLink className="link-sidebar" to="/login">Login</NavLink></div>:<div className="signout-div"><NavLink className="link-sidebar" to="/"><button className="logoutbtn" style={{fontWeight:"700"}} onClick={handlelogout} >Log Out</button></NavLink></div>}
          </div>
        </div>
    );
}

export default Sidebar;