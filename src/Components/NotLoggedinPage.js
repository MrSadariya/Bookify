import React from "react";
import {NavLink} from 'react-router-dom'

const NotLoggedinPage=()=>{
    return(<div style={{color:"white",height:"calc(100vh-60px)",position:"absolute",width:"90vw",display:"flex",alignItems:"center",justifyContent:"center",left:"0",top:"60px"}}>
       <h1>You're not logged in,<NavLink style={{color:"white"}} to="/login">Login</NavLink> to get the services.</h1>
    </div>);
}

export default NotLoggedinPage;