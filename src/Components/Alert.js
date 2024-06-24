import React, { useContext } from "react";
import './alertstyle.css';
import { AlertContext } from "../Contexts/AlertContext";

const Alert=(props)=>{

    const alert=useContext(AlertContext);

    function handleCancel(){
        alert.setshowalert("none");
    }

    return(<div className="alert-back" style={{display:`${alert.showalert}`}}>
    <div className="alert-box">
        <h1>Hurray!!</h1>
          <h2>{alert.msg}</h2>
          <button onClick={handleCancel}>X</button>
    </div>
    </div>
    );

}

export default Alert;