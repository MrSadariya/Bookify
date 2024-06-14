import React from "react";
import './navstyle.css';
import {NavLink} from 'react-router-dom';

const Dashboard=(props)=>{
    return(
        <div>
            <div className="dashboard">
            <div><NavLink className="link" to="/home/sellbook">Sell Book</NavLink></div>
            <div><NavLink className="link" to="/home/fictional">Fictional</NavLink></div>
            <div><NavLink className="link" to="/home/nonfictional">NonFictional</NavLink></div>
            <div><NavLink className="link" to="/home/educational">Educational</NavLink></div>
        </div>
        </div>
    );
}

export default Dashboard;