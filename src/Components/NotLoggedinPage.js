import React from "react";
import {NavLink} from 'react-router-dom'

const NotLoggedinPage=()=>{
    return(<div style={{color:"black",height:"calc(100vh-60px)",width:"100vw",display:"flex",alignItems:"center",justifyContent:"center"}}>
       <h1>You're not logged in,<NavLink style={{color:"black"}} to="/login">Login</NavLink> to get the services.</h1>
    </div>);
}

export default NotLoggedinPage;