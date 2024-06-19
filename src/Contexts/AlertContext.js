import {React,createContext,useState} from "react";

export const AlertContext=createContext("none");

export const AlertContextProvider=(props)=>{

    const [showalert,setshowalert]=useState("none");

    return(<div>
        <AlertContext.Provider value={{showalert,setshowalert}}>;
            {props.children}
        </AlertContext.Provider>
    </div>)
}