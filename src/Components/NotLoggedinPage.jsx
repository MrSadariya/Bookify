import React from "react";
import {NavLink} from 'react-router-dom'

const NotLoggedinPage=()=>{
    return(<div style={{marginTop:"4rem",fontSize:"2rem",textAlign:"center",fontWeight:"800"}}>
       You're not logged in,<NavLink style={{color:"white"}} to="/login">Login</NavLink> to get the services.
    </div>);
}

export default NotLoggedinPage;