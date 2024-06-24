import {React,createContext,useState} from "react";

export const AlertContext=createContext("none");

export const AlertContextProvider=(props)=>{

    const [showalert,setshowalert]=useState("none");
    const [msg,setmsg]=useState("");

    return(<div>
        <AlertContext.Provider value={{showalert,setshowalert,msg,setmsg}}>
            {props.children}
        </AlertContext.Provider>
    </div>)
}