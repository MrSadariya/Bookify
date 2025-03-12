import React from "react";
import './profile1style.css';

const Profile1=(props)=>{

    return(<div className="profile-container">
        <h1>{props.FullName}</h1>
        <h2>{props.Email}</h2>
        <h2>{props.id}</h2>
    </div>)
}

export default Profile1;